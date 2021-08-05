export interface IResultError {
    name: string;
    message: string
    throw(): void;
    pretty(): string;
}