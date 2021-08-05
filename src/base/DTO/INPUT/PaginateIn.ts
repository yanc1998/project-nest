import { IsPositive, Min } from 'class-validator'

export class PaginateIn {
    @IsPositive()
    @Min(1)
    page: number;

    @IsPositive()
    @Min(1)
    limit: number;
    
    filter: {}
}