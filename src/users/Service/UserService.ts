import { Injectable } from "@nestjs/common";
import { PaginateIn } from "src/base/DTO/INPUT/PaginateIn";
import { PaginateOut } from "src/base/DTO/OUTPUT/PaginateOut";
import { User } from "../Entity/User";
import { UserRepository } from "../Repository/UserRepository";

@Injectable()
export class UserService {
    constructor(private readonly UserRepository: UserRepository) {

    }
    async GetById(id: string): Promise<User> {
        return await this.UserRepository.getbyId(id);
    }
    async GetMany(filter: {}): Promise<User[]> {
        return await this.UserRepository.getMany(filter);
    }
    async Add(user: User): Promise<User> {
        return await this.UserRepository.add(user);
    }
    async DeleteById(id: string): Promise<User> {
        return await this.UserRepository.deleteById(id);
    }
    async DeleteMany(filter: {}): Promise<User[]> {
        return await this.UserRepository.deleteMany(filter);
    }
    async Paginate(paginate: PaginateIn): Promise<PaginateOut<User>> {
        return await this.UserRepository.paginate(paginate);
    }
}