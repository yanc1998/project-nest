import { IsEmail, MinLength } from "class-validator";

export class ForgetPasswordDto {
    @MinLength(8)
    newpassword: string;
    @IsEmail()
    email: string
}