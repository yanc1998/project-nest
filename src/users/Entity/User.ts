
import { BaseEntity } from "../../base/Entity/baseEntity";
import { prop } from "@typegoose/typegoose";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER='manager'
}
export class User extends BaseEntity {
    @prop({ required: true })
    username: string;
    @prop({ required: true })
    email: string;
    @prop({ required: true })
    password: string;
    @prop()
    role: UserRole
}
