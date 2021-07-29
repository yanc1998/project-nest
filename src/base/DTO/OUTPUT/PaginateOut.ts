export class PaginateOut<T>{
    page: number;
    total: number;
    pages: number;
    data: T[]
}