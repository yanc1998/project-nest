import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/Service/UserService";
import { compareSync } from 'bcrypt'
import { User } from "src/users/Entity/User";
import { UserDto } from "src/users/DTO/UserDto";
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {

    }
    async validate(username: string, password: string): Promise<any> {
        const user = await this.userService.GetByFilter({ email: username })
        if (user && compareSync(password, user.password)) {
    
            return user
        }
        return null;

    }
    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async Register(user: UserDto): Promise<User> {
        const _user: User = await this.userService.GetByFilter({ email: user.email });
        if (!_user) {
            return await this.userService.Add(user);
        }
        return null
    }
}