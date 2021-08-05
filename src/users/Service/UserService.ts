import { Injectable } from "@nestjs/common";
import { PaginateIn } from "src/base/DTO/INPUT/PaginateIn";
import { PaginateOut } from "src/base/DTO/OUTPUT/PaginateOut";
import { UserDto } from "../DTO/UserDto";
import { User } from "../Entity/User";
import { UserRepository } from "../Repository/UserRepository";
import { hashSync } from 'bcrypt'
import { UpdateUserDto } from "../DTO/UpdateUserDto";
import { UpdateRoleDto } from "../DTO/UpdateRoleDto";
import { BaseDeleteDto } from "src/base/DTO/INPUT/BaseDeleteDto";
import { BaseDeleteFilterDto } from "src/base/DTO/INPUT/BaseDeleteFilterDto";
import { BaseGetFilterDto } from "src/base/DTO/INPUT/BaseGetFilterDto";
import { GetUserDto } from "../DTO/GetUserDto";
import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { AppError } from "src/base/errors/app.error";
@Injectable()
export class UserService {
    constructor(private readonly UserRepository: UserRepository) {

    }
    async GetById(getuserDto: GetUserDto): Promise<User> {
        return await this.UserRepository.getbyId(getuserDto.id);
    }
    async GetByFilter(basefilter: BaseGetFilterDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        try {

            let user: User = await this.UserRepository.getByfitler(basefilter.filter);

            return ResultGenericDto.OK(user)

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }
    async GetMany(basefilter: BaseGetFilterDto): Promise<User[]> {
        return await this.UserRepository.getMany(basefilter.filter);
    }
    async Add(user: UserDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User> | AppError.ValidationErrorResult<User>> {
        try {

            let exist: User = await this.UserRepository.getByfitler({ email: user.email });

            if (exist) {
                return ResultGenericDto.Fail(new AppError.ValidationError('user alredy exist'))
            }

            let new_user: User = {
                username: user.username,
                email: user.email,
                role: user.role,
                password: hashSync(user.password, parseInt("4")),
                date: new Date(),
            }

            let _user = await this.UserRepository.add(new_user)

            return ResultGenericDto.OK(_user);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error))
        }


    }
    async DeleteById(baseDeleteDto: BaseDeleteDto): Promise<User> {
        return await this.UserRepository.deleteById(baseDeleteDto.id);
    }
    async DeleteMany(baseDele: BaseDeleteFilterDto): Promise<any> {
        return await this.UserRepository.deleteMany(baseDele.filter);
    }

    async UpdateUser(updateUser: UpdateUserDto): Promise<User> {
        return await this.UserRepository.UpdateProp({ _id: updateUser.id }, updateUser.dato);
    }
    async UpdateRole(updateRole: UpdateRoleDto): Promise<User> {
        return await this.UserRepository.UpdateProp({ _id: updateRole.id }, { role: updateRole.dato });
    }
    async Paginate(paginate: PaginateIn): Promise<PaginateOut<User>> {
        return await this.UserRepository.paginate(paginate);
    }
}