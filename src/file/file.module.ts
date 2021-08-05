import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { File } from './Entity/File';
import { MulterExtendedModule } from 'node_modules/nestjs-multer-extended'
import { Constants } from 'src/base/constants/constants';

@Module({
    imports: [TypegooseModule.forFeature([File])]
})
export class FileModule { }
