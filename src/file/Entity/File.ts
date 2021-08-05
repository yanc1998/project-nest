import { prop } from "@typegoose/typegoose";
import { BaseEntity } from "src/base/Entity/baseEntity"

export class File extends BaseEntity {
    @prop()
    url: string;
}