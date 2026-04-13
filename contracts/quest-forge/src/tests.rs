#[cfg(test)]
mod tests {
    use soroban_sdk::{testutils::Address as _, Address, Env, String};

    use crate::{QuestForgeContract, QuestForgeContractClient, QuestStatus};

    fn setup() -> (Env, QuestForgeContractClient<'static>) {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register_contract(None, QuestForgeContract);
        let client = QuestForgeContractClient::new(&env, &contract_id);
        (env, client)
    }

    #[test]
    fn test_register_and_get_quest() {
        let (env, client) = setup();
        let verifier = Address::generate(&env);

        client.register_quest(
            &String::from_str(&env, "Q-001"),
            &String::from_str(&env, "XLM"),
            &100,
            &verifier,
        );

        let quest = client.get_quest(&String::from_str(&env, "Q-001"));
        assert_eq!(quest.reward_amount, 100);
        assert_eq!(quest.status, QuestStatus::Open);
    }

    #[test]
    fn test_user_stats_default() {
        let (env, client) = setup();
        let user = Address::generate(&env);
        let stats = client.get_user_stats(&user);
        assert_eq!(stats.xp, 0);
        assert_eq!(stats.quests_completed, 0);
    }

    #[test]
    #[should_panic(expected = "Quest already exists")]
    fn test_duplicate_quest_panics() {
        let (env, client) = setup();
        let verifier = Address::generate(&env);

        client.register_quest(
            &String::from_str(&env, "Q-DUP"),
            &String::from_str(&env, "XLM"),
            &50,
            &verifier,
        );
        client.register_quest(
            &String::from_str(&env, "Q-DUP"),
            &String::from_str(&env, "XLM"),
            &50,
            &verifier,
        );
    }
}
