import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../users/Service/UserService";
import { compareSync } from 'bcrypt'
import { User, UserRole } from "../../users/Entity/User";
import { UserDto } from "../../users/DTO/UserDto";
import { UserDtoRegister } from "../../users/DTO/UserDtoRegister";
import { ReturnLoginDTo } from "../DTO/ReturnLoginDto";
import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { AppError } from "src/base/errors/app.error";
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {

    }
    async validate(username: string, password: string): Promise<User> {
        const result = await this.userService.GetByFilter({ filter: { email: username } })
        if (result.isOk && result.getData()) {
            if (compareSync(password, result.getData().password)) {
                return result.getData()
            }
            return null;
        }
        return null;

    }
    async login(user: User): Promise<ResultGenericDto<ReturnLoginDTo>> {

        const payload = { email: user.email, sub: user._id, role: user.role };

        console.log(payload, 'login')
        return new ResultGenericDto<ReturnLoginDTo>(true, null, {
            acces_token: await this.jwtService.signAsync(payload),
        })

    }

    async Register(user: UserDtoRegister): Promise<ResultGenericDto<User> | AppError.ValidationErrorResult<User>> {
        const result: ResultGenericDto<User> | AppError.UnexpectedErrorResult<User> = await this.userService.GetByFilter({ filter: { email: user.email } });
        if (result.isOk) {
            let new_data: User = result.getData();
            if (!new_data) {
                const u: UserDto = {
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: UserRole.USER
                }
                return await this.userService.Add(u);
            }
            //cambiar esto por El Ok
            return ResultGenericDto.Fail(new AppError.ValidationError('user alredy exist'))
        }
        return result;

    }
}