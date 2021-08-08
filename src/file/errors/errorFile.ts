import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { BaseError } from "src/base/errors/BaseError";

export namespace FileError {
    export class FileExtensionError extends BaseError {
        private readonly _brand?: FileExtensionError;
        public constructor(message: string) {
            super('FileExtensionError', message)
        }
    }
    export type FileExtensionErrorResult<T> = ResultGenericDto<T, FileExtensionError>;

}