import { IsEmail, IsIn, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { UserRole } from "../Entity/User";

export class UserDto {

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;


    @IsIn(['user','admin','manager'])
    role: UserRole;
}