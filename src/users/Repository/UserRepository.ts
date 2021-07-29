import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { BaseRepository } from "src/base/Repository/BaseRepository";
import { User } from "../Entity/User";

@Injectable()
export class UserRepository extends BaseRepository<User>{
    constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
        super(userModel)
    }

}