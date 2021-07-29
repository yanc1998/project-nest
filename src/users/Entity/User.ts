
import { BaseEntity } from "src/base/Entity/baseEntity";
import { prop } from "@typegoose/typegoose";

export class User extends BaseEntity<string>{
    @prop({required:true})
    username: string;
    @prop({required:true})
    email: string;
    @prop({required:true})
    password: string;
}
