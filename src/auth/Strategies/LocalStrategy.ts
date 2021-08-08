import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from 'passport-local'
import { AuthService } from "../Service/AuthService";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: "email" });
    }
    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validate(email, password);
        if (!user || !user.is_register_confirm) {
            throw new UnauthorizedException('user not register');
        }

        return user;
    }
}