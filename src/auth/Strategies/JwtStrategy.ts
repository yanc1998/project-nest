import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Constants } from "src/base/constants/constants";
import { UserService } from "src/users/Service/UserService";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Constants.jwt_scret,
        });
    }
    async validate(payload: any) {

        const user = await this.userService.GetByFilter({ email: payload.email });

        if (!user) {
            throw new UnauthorizedException()

        }
        return user;
    }
}