import { Injectable } from '@nestjs/common';
import { PaginateIn } from '../DTO/INPUT/PaginateIn';
import { PaginateOut } from '../DTO/OUTPUT/PaginateOut';
import { IRepository } from '../Interfaces/IRepository';
import { ReturnModelType } from '@typegoose/typegoose'
import { BaseEntity } from '../Entity/baseEntity';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';


@Injectable()
export class BaseRepository<T extends BaseEntity> implements IRepository<T>{

    private readonly model: ReturnModelType<AnyParamConstructor<T>>;

    constructor(_model: ReturnModelType<AnyParamConstructor<T>>) {
        this.model = _model
    }
    async getbyId(id: string): Promise<T> {
        return await this.model.findById(id);
    }
    async getByfitler(filter: {}): Promise<T> {
        return await this.model.findOne(filter);
    }
    async getMany(filter: {}): Promise<T[]> {
        return await this.model.find(filter);
    }
    async add(model: T): Promise<T> {
        return await this.model.create(model);
    }
    async deleteById(id: string): Promise<T> {
        let filter: {} = { _id: id };
        return await this.model.findOneAndDelete(filter);
    }
    async deleteMany(filter: {}): Promise<any> {
        return await this.model.deleteMany(filter);
    }
    async paginate(paginate: PaginateIn): Promise<PaginateOut<T>> {
        let page: number = paginate.page;
        let limit: number = paginate.limit;
        let filter: {} = paginate.filter;

        let items: T[] = await this.model.find(filter).skip((page - 1) * limit).limit(limit);
        let total: number = await this.model.countDocuments(filter)
        let pages = Math.ceil(total / limit);
        return {
            page: page,
            total: total,
            pages: pages,
            data: items
        }
    }
}