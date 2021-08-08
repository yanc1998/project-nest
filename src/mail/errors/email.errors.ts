import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { BaseError } from "src/base/errors/BaseError";

export namespace MailError {
    export class EmailSendError extends BaseError {
        private readonly _brand?: EmailSendError;
        constructor(message: string) {
            super('EmailSendError', message)
        }
    }
    export type EmailSendErrorResult<T> = ResultGenericDto<T, EmailSendError>;
}