import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { AppError } from "src/base/errors/app.error";
import { multerOption } from "../config/multer.config";
import { DeleteFileDto } from "../DTO/DeleteFIleDto";
import { GetFileDto } from "../DTO/GetFileDto";
import { UpdateFileDto } from "../DTO/UpdateFIlteDto";
import { File } from "../Entity/File";
import { FileService } from "../Service/fileService";



@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {

    }

    @Get('/get')
    async GetFile(@Body() search: GetFileDto): Promise<ResultGenericDto<File> | AppError.UnexpectedErrorResult<File>> {
        return await this.fileService.GetById(search);
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', multerOption))
    async Add(@UploadedFile() file: any): Promise<ResultGenericDto<File> | AppError.UnexpectedErrorResult<File>> {
        return await this.fileService.Add({ url: file.filename });
    }

    @Post('/deleteById')
    async deleteById(@Body() deleteFile: DeleteFileDto): Promise<ResultGenericDto<File> | AppError.UnexpectedErrorResult<File>> {
        return await this.fileService.DeleteById(deleteFile);
    }

    @Post('/update')
    async update(@Body() updateFile: UpdateFileDto): Promise<ResultGenericDto<File> | AppError.UnexpectedErrorResult<File>> {
        return await this.fileService.Update(updateFile);
    }
}