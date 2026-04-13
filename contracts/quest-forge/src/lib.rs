#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short,
    Address, Env, String, Symbol,
};

const QUEST: Symbol = symbol_short!("QUEST");
const SUBMISSION: Symbol = symbol_short!("SUB");
const USER: Symbol = symbol_short!("USER");

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum QuestStatus {
    Open,
    InReview,
    Completed,
    Cancelled,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Quest {
    pub id: String,
    pub reward_asset: String,
    pub reward_amount: i128,
    pub verifier: Address,
    pub status: QuestStatus,
}

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub enum SubmissionStatus {
    Pending,
    Approved,
    Rejected,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Submission {
    pub quest_id: String,
    pub submitter: Address,
    pub proof_ref: String,
    pub status: SubmissionStatus,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct UserStats {
    pub xp: u32,
    pub quests_completed: u32,
    pub badges: soroban_sdk::Vec<String>,
}

#[contract]
pub struct QuestForgeContract;

#[contractimpl]
impl QuestForgeContract {
    /// Register a new quest. Only callable by the verifier address.
    pub fn register_quest(
        env: Env,
        id: String,
        reward_asset: String,
        reward_amount: i128,
        verifier: Address,
    ) {
        verifier.require_auth();
        let key = (QUEST, id.clone());
        assert!(!env.storage().persistent().has(&key), "Quest already exists");
        env.storage().persistent().set(&key, &Quest {
            id,
            reward_asset,
            reward_amount,
            verifier,
            status: QuestStatus::Open,
        });
    }

    /// Submit proof of completion for a quest.
    pub fn submit_proof(env: Env, quest_id: String, submitter: Address, proof_ref: String) {
        submitter.require_auth();
        let quest: Quest = env
            .storage()
            .persistent()
            .get(&(QUEST, quest_id.clone()))
            .expect("Quest not found");
        assert!(quest.status == QuestStatus::Open, "Quest is not open");
        env.storage().persistent().set(
            &(SUBMISSION, quest_id.clone()),
            &Submission { quest_id, submitter, proof_ref, status: SubmissionStatus::Pending },
        );
    }

    /// Approve a submission. Only callable by the quest verifier.
    pub fn approve(env: Env, quest_id: String, submitter: Address) {
        let quest_key = (QUEST, quest_id.clone());
        let mut quest: Quest = env
            .storage()
            .persistent()
            .get(&quest_key)
            .expect("Quest not found");
        quest.verifier.require_auth();

        let sub_key = (SUBMISSION, quest_id.clone());
        let mut submission: Submission = env
            .storage()
            .persistent()
            .get(&sub_key)
            .expect("Submission not found");
        assert!(submission.submitter == submitter, "Submitter mismatch");
        assert!(submission.status == SubmissionStatus::Pending, "Submission already processed");

        submission.status = SubmissionStatus::Approved;
        quest.status = QuestStatus::InReview;
        env.storage().persistent().set(&sub_key, &submission);
        env.storage().persistent().set(&quest_key, &quest);

        let user_key = (USER, submitter.clone());
        let mut stats: UserStats = env.storage().persistent().get(&user_key).unwrap_or(UserStats {
            xp: 0,
            quests_completed: 0,
            badges: soroban_sdk::Vec::new(&env),
        });
        stats.xp += 100;
        stats.quests_completed += 1;
        env.storage().persistent().set(&user_key, &stats);
    }

    /// Claim reward for an approved submission.
    pub fn claim_reward(env: Env, quest_id: String, claimant: Address) {
        claimant.require_auth();
        let sub_key = (SUBMISSION, quest_id.clone());
        let submission: Submission = env
            .storage()
            .persistent()
            .get(&sub_key)
            .expect("Submission not found");
        assert!(submission.submitter == claimant, "Not the submitter");
        assert!(submission.status == SubmissionStatus::Approved, "Submission not approved");

        let quest_key = (QUEST, quest_id);
        let mut quest: Quest = env.storage().persistent().get(&quest_key).expect("Quest not found");
        quest.status = QuestStatus::Completed;
        env.storage().persistent().set(&quest_key, &quest);

        env.events().publish((symbol_short!("claimed"), claimant), quest.reward_amount);
    }

    /// Fetch quest details.
    pub fn get_quest(env: Env, quest_id: String) -> Quest {
        env.storage()
            .persistent()
            .get(&(QUEST, quest_id))
            .expect("Quest not found")
    }

    /// Fetch user stats.
    pub fn get_user_stats(env: Env, user: Address) -> UserStats {
        env.storage().persistent().get(&(USER, user)).unwrap_or(UserStats {
            xp: 0,
            quests_completed: 0,
            badges: soroban_sdk::Vec::new(&env),
        })
    }
}

mod tests;
