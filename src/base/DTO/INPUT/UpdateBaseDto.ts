import { IsMongoId } from "class-validator";

export class UpdateBaseDto<T>{
    @IsMongoId()
    id: string
    
    dato: T
}