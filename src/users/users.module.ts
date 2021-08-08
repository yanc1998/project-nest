import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from 'src/auth/auth.module';
import { BaseModule } from 'src/base/base.module';
import { BaseRepository } from 'src/base/Repository/BaseRepository';
import { MailModule } from 'src/mail/mail.module';
import { UserController } from './Controller/UserController';
import { User } from './Entity/User';
import { UserRepository } from './Repository/UserRepository';
import { UserService } from './Service/UserService';

@Module({
    imports: [MailModule, TypegooseModule.forFeature([User])],
    controllers: [UserController],
    exports: [UserService, UserRepository],
    providers: [UserService, UserRepository],
})
export class UsersModule { }
