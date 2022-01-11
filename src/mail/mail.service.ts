/*
https://docs.nestjs.com/providers#services
*/

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class MailService {
    constructor(
        @InjectQueue('send-email')
        private mailQueue: Queue
    ) { }

    /** Send email confirmation link to new user account. */
    async sendConfirmationEmail(user: UserEntity, code: string): Promise<boolean> {
        try {
            await this.mailQueue.add('confirmation', {
                user,
                code,
            })
            return true
        } catch (error) {
            // this.logger.error(`Error queueing confirmation email to user ${user.email}`)
            return false
        }
    }
}
