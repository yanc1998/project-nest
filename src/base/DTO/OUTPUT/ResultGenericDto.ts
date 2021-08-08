import { isInstance } from "class-validator";
import { BaseEntity } from "src/base/Entity/baseEntity";
import { AppError } from "src/base/errors/app.error";
import { IResultError } from "src/base/Interfaces/IResultError";

export class ResultGenericDto<R, E extends IResultError = IResultError> {
    private readonly data?: R;
    public error?: E;
    public isOk: boolean;

    constructor(isOk: boolean = false, error?: E, data?: R) {
        if (isOk && error) {
            throw new Error(
                'invalid oparation, isOk and error cant be activate bouth'
            )
        }
        if (!isOk && !error) {
            throw new Error('invalid operation, ')
        }

        this.isOk = isOk;
        this.data = data;
        this.error = error;
        Object.freeze(this);
    }

    public getData(): R {
        if (!this.isOk) {
            throw new Error("Can't get value with error result")
        }
        return this.data;
    }

    public getError(): E {
        if (this.isOk) {
            return undefined;
        }
        return this.error;
    }

    public static Fail<U, E extends IResultError = IResultError>(error: E): ResultGenericDto<U, E> {
        return new ResultGenericDto<U, E>(false, error);
    }

    public static OK<U, E extends IResultError = IResultError>(value?: U): ResultGenericDto<U, E> {
        return new ResultGenericDto<U, E>(true, null, value);
    }

    public static combine(result: ResultGenericDto<unknown>[]): ResultGenericDto<unknown> {
        for (let res of result) {
            if (!res.isOk)
                return res;
        }
        return ResultGenericDto.OK();
    }

    public mapAsync<T>(func: (a: R) => T): ResultGenericDto<T> {
        return this.isOk
            ? ResultGenericDto.OK(func(this.data))
            : ResultGenericDto.Fail(this.error);
    }


    public static AddResult<U>(res: any, result: ResultGenericDto<U>): U | IResultError {
        if (result.isOk) {
            console.log('1')
            res.status(201)
            console.log('2')
            return result.data
        }
        if (isInstance(result.error, AppError.UnexpectedError)) {
            res.status(300).json(result.error)
            return result.error
        }
        if (isInstance(result.error, AppError.ValidationError) || isInstance(result.error, AppError.InsufficientPermitisError)) {
            res.status(401).json(result.error)
            return result.error
        }


    }

}