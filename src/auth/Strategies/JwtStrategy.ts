import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AppError } from "src/base/errors/app.error";
import { User } from "src/users/Entity/User";
import { Constants } from "../../base/constants/constants";
import { UserService } from "../../users/Service/UserService";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Constants.jwt_scret,
        });
    }
    async validate(payload: any): Promise<User> {

        const result = await this.userService.GetByFilter({ filter: { email: payload.email } });

        if (!result.isOk) {
            throw new UnauthorizedException('not permits');

        }
        return result.getData();
    }
}