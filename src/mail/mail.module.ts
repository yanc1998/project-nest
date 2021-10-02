import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { Constants } from 'src/base/constants/constants';
import { MailService } from './service/MailService';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport:{
                    host:"smtp.gmail.com",
                    secure:true,
                    auth:{
                        user:"onlineshoptest2021@gmail.com",
                        pass:"onlineShop@gmail"
                    }
                },
                defaults: {
                    from: `"nest-modules" <${Constants.email_from}>`
                },
            })
        })
    ], providers: [MailService],
    exports: [MailService]
})
export class MailModule { }
