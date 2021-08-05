import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { BaseRepository } from "src/base/Repository/BaseRepository";
import { File } from "../Entity/File";

@Injectable()
export class FileRepository extends BaseRepository<File>{
    constructor(@InjectModel(File) private readonly fileModel: ReturnModelType<typeof File>) {
        super(fileModel)
    }

}