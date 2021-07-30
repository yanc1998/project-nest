import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BaseModule } from 'src/base/base.module';
import { BaseRepository } from 'src/base/Repository/BaseRepository';
import { UserController } from './Controller/UserController';
import { User } from './Entity/User';
import { UserRepository } from './Repository/UserRepository';
import { UserService } from './Service/UserService';

@Module({
    imports: [TypegooseModule.forFeature([User])],
    controllers: [UserController],
    exports: [UserService, UserRepository],
    providers: [UserService, UserRepository],
})
export class UsersModule { }
