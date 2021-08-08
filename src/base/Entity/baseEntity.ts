import { prop } from "@typegoose/typegoose"

export class BaseEntity {
    _id?: string

    @prop({ default: new Date() })
    date: Date

}