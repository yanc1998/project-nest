import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { File } from './Entity/File';
import { MulterExtendedModule } from 'node_modules/nestjs-multer-extended'
import { Constants } from 'src/base/constants/constants';
import { FileController } from './Controller/FileController';
import { FileService } from './Service/fileService';
import { FileRepository } from './Repository/FileRepository';

@Module({
    imports: [ TypegooseModule.forFeature([File])],
    controllers: [FileController], providers: [FileService,FileRepository]
})
export class FileModule { }
