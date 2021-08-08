import { hashSync } from "bcrypt";
import { IsEmail, IsIn, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Constants } from "src/base/constants/constants";
import { User, UserRole } from "../Entity/User";
import { UserDtoRegister } from "./UserDtoRegister";

export class UserDto {

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;


    @IsIn(['user', 'admin', 'manager'])
    role: UserRole;

    public static UserToDto(user: User): UserDto {
        return {
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
        } as UserDto
    }

    public static DtoToUser(userDto: UserDto, is_confirm: boolean): User {
        return {
            username: userDto.username,
            email: userDto.email,
            password: hashSync(userDto.password, Constants.ROUNDS_BYCRIPT),
            role: userDto.role,
            date: new Date(),
            is_register_confirm: is_confirm
        } as User
    }


    public static RegisterToDto(user: UserDtoRegister, role: UserRole): UserDto {
        return {
            username: user.username,
            email: user.email,
            password: user.password,
            role: role,
        } as UserDto
    }

}