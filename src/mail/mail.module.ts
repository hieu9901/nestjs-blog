import { MailService } from './mail.service';
import { Module } from '@nestjs/common'
import { MailProcessor } from './mail.processor'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { BullModule } from '@nestjs/bull'

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    tls: { ciphers: 'SSLv3', }, // gmail
                    auth: {
                        user: 'hieu.tranminh.vt.vp@gmail.com',
                        pass: 'matkhau9xno2',
                    },
                },
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>',
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
        BullModule.registerQueueAsync({
            name: 'send-email',
            useFactory: () => ({
                redis: {
                    host: 'localhost',
                    port: 5003,
                },
            }),
        }),
    ],
    controllers: [],
    providers: [
        MailService,
        MailProcessor,
    ],
    exports: [
        MailService,
    ],
})
export class MailModule { }