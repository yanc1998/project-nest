import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BaseRepository } from 'src/base/Repository/BaseRepository';
import { UserController } from './Controller/UserController';
import { User } from './Entity/User';
import { UserRepository } from './Repository/UserRepository';
import { UserService } from './Service/UserService';

@Module({
    imports: [TypegooseModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService,UserRepository],
})
export class UsersModule {}
