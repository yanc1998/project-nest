
import { ResultGenericDto } from "../DTO/OUTPUT/ResultGenericDto";
import { BaseError } from "./BaseError";

export namespace AppError {
    const _context = 'AppError'
    export class UnexpectedError extends BaseError {
        private readonly _brand?: UnexpectedError;
        public constructor(error?: Error) {
            super('UnexpectedError', error ? `An unexpected error ocurred:${error.message}` : 'An unexpected error ocurred', _context)
        }
    }

    export type UnexpectedErrorResult<T> = ResultGenericDto<T, UnexpectedError>;

    export class ValidationError extends BaseError {
        private readonly _brand?: ValidationError;
        public constructor(message: string) {
            super('ValidationError', message, _context);
        }
    }

    export type ValidationErrorResult<T> = ResultGenericDto<T, ValidationError>;

    export class InsufficientPermitisError extends BaseError {
        private readonly _brand?: InsufficientPermitisError;
        public constructor(message: string = 'Unauthorized') {
            super('InsufficientPermits', message, _context);
        }
    }

    export type InsufficientPermitisErrorResult<T> = ResultGenericDto<T, InsufficientPermitisError>;
}