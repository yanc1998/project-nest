import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Constants } from 'src/base/constants/constants';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/controller';
import { AuthService } from './Service/AuthService';
import { JwtStrategy } from './Strategies/JwtStrategy';
import { LocalStrategy } from './Strategies/LocalStrategy';

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: Constants.jwt_scret,
        signOptions: { expiresIn: Constants.expiration_time },
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
