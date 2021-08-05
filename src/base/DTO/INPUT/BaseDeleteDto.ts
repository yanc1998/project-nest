import { IsMongoId } from "class-validator";

export class BaseDeleteDto {
    @IsMongoId()
    id: string;
}