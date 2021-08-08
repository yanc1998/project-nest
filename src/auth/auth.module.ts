import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { Constants } from '../base/constants/constants';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/controller';
import { AuthService } from './Service/AuthService';
import { JwtStrategy } from './Strategies/JwtStrategy';
import { LocalStrategy } from './Strategies/LocalStrategy';

@Module({
    imports: [MailModule, UsersModule, PassportModule, JwtModule.register({
        secret: Constants.jwt_scret,
        signOptions: { expiresIn: Constants.expiration_time },
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
