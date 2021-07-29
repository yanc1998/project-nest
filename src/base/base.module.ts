import { Module } from '@nestjs/common';
import { BaseRepository } from './Repository/BaseRepository';

@Module({exports:[BaseRepository]})
export class BaseModule {}
