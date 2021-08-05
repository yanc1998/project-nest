import { IsMongoId } from "class-validator";

export class BaseGetDto {
    @IsMongoId()
    id: string;
}