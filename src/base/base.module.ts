import { Module } from '@nestjs/common';
import { BaseRepository } from './Repository/BaseRepository';

@Module({
    exports: [BaseRepository],
    providers: [BaseRepository]
})
export class BaseModule { }
