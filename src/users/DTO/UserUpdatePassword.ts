import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { BaseGetDto } from "src/base/DTO/INPUT/BaseGetDto";
import { UpdateBaseDto } from "src/base/DTO/INPUT/UpdateBaseDto";

export class UserUpdatePasswordDto {
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    old_password: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    new_password: string;
}