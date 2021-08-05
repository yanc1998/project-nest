import { PaginateIn } from "../DTO/INPUT/PaginateIn";
import { PaginateOut } from "../DTO/OUTPUT/PaginateOut";


export interface IRepository<T> {
    getbyId(id: string): Promise<T>;
    getMany(filter: {}): Promise<T[]>;
    add(model: T): Promise<T>;
    deleteById(id: string): Promise<T>;
    deleteMany(filter: {}): Promise<T[]>;
    updateByModel(model: T): Promise<T>;
    UpdateProp(filter: {}, prop: {}): Promise<T>;
    paginate(paginate: PaginateIn): Promise<PaginateOut<T>>;
}