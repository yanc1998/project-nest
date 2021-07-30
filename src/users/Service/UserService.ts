import { Injectable } from "@nestjs/common";
import { PaginateIn } from "src/base/DTO/INPUT/PaginateIn";
import { PaginateOut } from "src/base/DTO/OUTPUT/PaginateOut";
import { UserDto } from "../DTO/UserDto";
import { User } from "../Entity/User";
import { UserRepository } from "../Repository/UserRepository";
import {hashSync} from 'bcrypt'
@Injectable()
export class UserService {
    constructor(private readonly UserRepository: UserRepository) {

    }
    async GetById(id: string): Promise<User> {
        return await this.UserRepository.getbyId(id);
    }
    async GetByFilter(filter: {}): Promise<User> {
        return await this.UserRepository.getByfitler(filter);
    }
    async GetMany(filter: {}): Promise<User[]> {
        return await this.UserRepository.getMany(filter);
    }
    async Add(user: UserDto): Promise<User> {
        let _date = new Date()
        let _user: User = {
            username: user.username,
            email:user.email,
            //poner la variable de entorno para la cantidad de rondas
            password: hashSync(user.password,parseInt("4")),
            date: _date,
        }
        return await this.UserRepository.add(_user);
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