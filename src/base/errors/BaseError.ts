import { IResultError } from "../Interfaces/IResultError";

export abstract class BaseError extends Error implements IResultError {
    name: string;
    constructor(name: string, message: string, context?: string) {
        super(message);
        this.name = name;
    }

    throw(): void {
        throw this;
    }
    pretty(): string {
        throw `[${this.name}]:${this.message}`
    }

}