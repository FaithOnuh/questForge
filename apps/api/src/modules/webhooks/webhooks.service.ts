import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  handleGithub(event: string, signature: string, payload: unknown) {
    this.logger.log(`GitHub webhook received: ${event}`);
    // TODO: verify HMAC signature, parse PR/issue events, trigger quest verification
    return { received: true };
  }
}
