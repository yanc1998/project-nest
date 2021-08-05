import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOption } from "../config/multer.config";
import { DeleteFileDto } from "../DTO/DeleteFIleDto";
import { UpdateFileDto } from "../DTO/UpdateFIlteDto";
import { File } from "../Entity/File";
import { FileService } from "../Service/fileService";



@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {

    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', multerOption))
    async Add(@UploadedFile() file: any): Promise<File> {
        return await this.fileService.Add({ url: file.filename })
    }

    @Post('/deleteById')
    async deleteById(@Body() deleteFile: DeleteFileDto): Promise<File> {
        return await this.fileService.DeleteById(deleteFile)
    }

    @Post('/update')
    async update(@Body() updateFile: UpdateFileDto): Promise<File> {
        return await this.fileService.Update(updateFile);
    }
}