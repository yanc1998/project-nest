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
import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { AppError } from "src/base/errors/app.error";

@Injectable()
export class FileService {
    constructor(private readonly fileRepository: FileRepository) {
    }

    async GetById(getfile: GetFileDto): Promise<ResultGenericDto<File> | AppError.UnexpectedErrorResult<File>> {
        try {

            let file: File = await this.fileRepository.getbyId(getfile.id);
            return ResultGenericDto.OK(file);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }
    async GetByFilter(getfilter: GetFileFilterDto): Promise<ResultGenericDto<File> | AppError.UnexpectedErrorResult<File>> {

        try {

            let file: File = await this.fileRepository.getByfitler(getfilter.filter);
            return ResultGenericDto.OK(file);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }

    }
    async GetMany(getfilter: GetFileFilterDto): Promise<ResultGenericDto<File[]> | AppError.UnexpectedErrorResult<File[]>> {
        try {

            let files: File[] = await this.fileRepository.getMany(getfilter.filter);
            return ResultGenericDto.OK(files);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }

    }

    async Add(file: FileDto): Promise<ResultGenericDto<File> | AppError.UnexpectedErrorResult<File>> {
        try {

            let filetoAdd: File = {
                url: file.url,
                date: new Date()
            }

            let newfile: File = await this.fileRepository.add(filetoAdd);
            return ResultGenericDto.OK(newfile);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }

    }

    async DeleteById(deleteFile: DeleteFileDto): Promise<ResultGenericDto<File> | AppError.UnexpectedErrorResult<File>> {
        try {

            let file: File = await this.fileRepository.deleteById(deleteFile.id);
            return ResultGenericDto.OK(file);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }

    }
    async DeleteMany(deleteMany: DeleteFileFilterDto): Promise<ResultGenericDto<any> | AppError.UnexpectedErrorResult<any>> {
        try {

            let file: File = await this.fileRepository.deleteMany(deleteMany.filter);
            return ResultGenericDto.OK(file);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }

    async Paginate(paginate: PaginateIn): Promise<PaginateOut<ResultGenericDto<PaginateOut<File>>> | AppError.UnexpectedErrorResult<PaginateOut<File>>> {
        try {

            let paginateresult: PaginateOut<File> = await this.fileRepository.paginate(paginate);
            return ResultGenericDto.OK(paginateresult);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }

    }

    async Update(updateFile: UpdateFileDto): Promise<ResultGenericDto<File> | AppError.UnexpectedErrorResult<File>> {
        try {
            let file: File = await this.fileRepository.getbyId(updateFile.id);

            //borrar la foto de la carpeta ./public
            unlinkSync(Constants.BASE_PATH_FILE + file.url)

            let newfile = await this.fileRepository.UpdateProp({ _id: updateFile.id }, updateFile.dato);

            return ResultGenericDto.OK(newfile);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }

    }

}