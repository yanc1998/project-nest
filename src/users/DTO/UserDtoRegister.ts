import {IsEmail,IsNotEmpty, MaxLength, MinLength} from 'class-validator'

export class UserDtoRegister {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}