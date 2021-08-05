import { Injectable } from "@nestjs/common";
import { PaginateIn } from "src/base/DTO/INPUT/PaginateIn";
import { PaginateOut } from "src/base/DTO/OUTPUT/PaginateOut";
import { DeleteFileDto } from "../DTO/DeleteFIleDto";
import { DeleteFileFilterDto } from "../DTO/DeleteFileFilterDto";
import { FileDto } from "../DTO/FileDto";
import { GetFileDto } from "../DTO/GetFileDto";
import { GetFileFilterDto } from "../DTO/GetFileFilterDto";
import { UpdateFileDto } from "../DTO/UpdateFIlteDto";
import { File } from "../Entity/File";
import { FileRepository } from "../Repository/FileRepository";
import { unlinkSync } from 'fs'
import { Constants } from "src/base/constants/constants";

@Injectable()
export class FileService {
    constructor(private readonly fileRepository: FileRepository) {
    }

    async GetById(getfile: GetFileDto): Promise<File> {
        return await this.fileRepository.getbyId(getfile.id);
    }
    async GetByFilter(getfilter: GetFileFilterDto): Promise<File> {
        return await this.fileRepository.getByfitler(getfilter.filter);
    }
    async GetMany(getfilter: GetFileFilterDto): Promise<File[]> {
        return await this.fileRepository.getMany(getfilter.filter);
    }

    async Add(file: FileDto): Promise<File> {
        let _file: File = {
            url: file.url,
            date: new Date()
        }
        return await this.fileRepository.add(_file);
    }

    async DeleteById(deleteFile: DeleteFileDto): Promise<File> {
        return await this.fileRepository.deleteById(deleteFile.id);
    }
    async DeleteMany(deleteMany: DeleteFileFilterDto): Promise<any> {
        return await this.fileRepository.deleteMany(deleteMany.filter);
    }

    async Paginate(paginate: PaginateIn): Promise<PaginateOut<File>> {
        return await this.fileRepository.paginate(paginate);
    }

    async Update(updateFile: UpdateFileDto): Promise<File> {
        let file: File = await this.fileRepository.getbyId(updateFile.id);
        if (file) {
            //borrar la foto de la carpeta ./public
            try {
                unlinkSync(Constants.BASE_PATH_FILE + file.url)
            }
            catch (error) {
                //retornar el error
            }
            return await this.fileRepository.UpdateProp({ _id: updateFile.id }, updateFile.dato);

        }
        //retornar el error cuando ponga la clase error_file
    }

}