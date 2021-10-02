import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { MailError } from "../errors/email.errors";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {

    }
    async SendEmail(to: string, data: string): Promise<ResultGenericDto<any> | MailError.EmailSendErrorResult<any>> {
        try {
            await this.mailerService.sendMail({ to: to, html: data });
            return ResultGenericDto.OK()
        }
        catch (error) {
            
            return ResultGenericDto.Fail(new MailError.EmailSendError('error to send email, try egain'))
        }
    }
}