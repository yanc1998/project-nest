import { Injectable } from "@nestjs/common";
import { PaginateIn } from "src/base/DTO/INPUT/PaginateIn";
import { PaginateOut } from "src/base/DTO/OUTPUT/PaginateOut";
import { UserDto } from "../DTO/UserDto";
import { User } from "../Entity/User";
import { UserRepository } from "../Repository/UserRepository";
import { compare, compareSync, hashSync } from 'bcrypt'
import { UpdateUserDto } from "../DTO/UpdateUserDto";
import { UpdateRoleDto } from "../DTO/UpdateRoleDto";
import { BaseDeleteDto } from "src/base/DTO/INPUT/BaseDeleteDto";
import { BaseDeleteFilterDto } from "src/base/DTO/INPUT/BaseDeleteFilterDto";
import { BaseGetFilterDto } from "src/base/DTO/INPUT/BaseGetFilterDto";
import { GetUserDto } from "../DTO/GetUserDto";
import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { AppError } from "src/base/errors/app.error";
import { UserUpdatePasswordDto } from "../DTO/UserUpdatePassword";
import { Constants } from "src/base/constants/constants";
import { MailService } from "src/mail/service/MailService";
import { ForgetPasswordDto } from "../DTO/ForgetPassword";
@Injectable()
export class UserService {
    constructor(private readonly UserRepository: UserRepository, private readonly emailService: MailService) {

    }
    async GetById(getuserDto: GetUserDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        try {

            let user: User = await this.UserRepository.getbyId(getuserDto.id);

            return ResultGenericDto.OK(user);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error))
        }
    }
    async GetByFilter(basefilter: BaseGetFilterDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        try {

            let user: User = await this.UserRepository.getByfitler(basefilter.filter);

            return ResultGenericDto.OK(user)

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }
    async GetMany(basefilter: BaseGetFilterDto): Promise<ResultGenericDto<User[]> | AppError.UnexpectedErrorResult<User[]>> {
        try {

            let users: User[] = await this.UserRepository.getMany(basefilter.filter);
            console.log(users)

            return ResultGenericDto.OK(users);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }
    async Add(user: UserDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User> | AppError.ValidationErrorResult<User>> {
        try {

            let exist: User = await this.UserRepository.getByfitler({ email: user.email });

            if (exist) {
                return ResultGenericDto.Fail(new AppError.ValidationError('user alredy exist'))
            }


            let _user = await this.UserRepository.add(UserDto.DtoToUser(user, false))

            return ResultGenericDto.OK(_user);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error))
        }


    }
    async DeleteById(baseDeleteDto: BaseDeleteDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        try {
            let user: User = await this.UserRepository.deleteById(baseDeleteDto.id);

            return ResultGenericDto.OK(user)

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }

    }
    async DeleteMany(baseDele: BaseDeleteFilterDto): Promise<ResultGenericDto<any> | AppError.UnexpectedErrorResult<any>> {
        try {
            let users = await this.UserRepository.deleteMany(baseDele.filter);

            return ResultGenericDto.OK(users);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }

    async UpdateUser(updateUser: UpdateUserDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        try {
            let old_user = await this.UserRepository.getByfitler({ _id: updateUser.id })
            let user: User = await this.UserRepository.UpdateProp({ _id: updateUser.id }, UserDto.DtoToUser(updateUser.dato, old_user.is_register_confirm));
            console.log(user)
            return ResultGenericDto.OK(user);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }
    async UpdateConfirmRegister(email: string, confirm: boolean = true): Promise<ResultGenericDto<User> | AppError.ValidationErrorResult<User> | AppError.UnexpectedErrorResult<User>> {
        try {

            let filter = { email: email }
            let prop = { is_register_confirm: true };
            await this.UserRepository.UpdateProp(filter, prop);
            return ResultGenericDto.OK()

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error))
        }
    }
    async UpdatePassword(updateUserPasswordDto: UserUpdatePasswordDto, id: string): Promise<ResultGenericDto<User> | AppError.ValidationErrorResult<User> | AppError.UnexpectedErrorResult<User>> {
        try {
            let user: User = await this.UserRepository.getbyId(id);

            if (user) {

                if (compare(user.password, updateUserPasswordDto.old_password)) {

                    let filter = { _id: id }
                    let prop_to_update = { password: hashSync(updateUserPasswordDto.new_password, Constants.ROUNDS_BYCRIPT) }
                    await this.UserRepository.UpdateProp(filter, prop_to_update)
                    return ResultGenericDto.OK()
                }
                return ResultGenericDto.Fail(new AppError.ValidationError('incorrect password'))
            }

            return ResultGenericDto.Fail(new AppError.ValidationError('user not found'))

        } catch (error) {
            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }
    async updateForgetPassword(updateForgetPassword: ForgetPasswordDto, user: User) {
        try {

            let filter = { _id: user._id }
            let prop_to_update = { password: hashSync(updateForgetPassword.newpassword, Constants.ROUNDS_BYCRIPT) }
            await this.UserRepository.UpdateProp(filter, prop_to_update);
            return ResultGenericDto.OK();

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error))
        }
    }
    async UpdateRole(updateRole: UpdateRoleDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        try {

            let user: User = await this.UserRepository.UpdateProp({ _id: updateRole.id }, { role: updateRole.dato });

            return ResultGenericDto.OK(user);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }
    async Paginate(paginate: PaginateIn): Promise<ResultGenericDto<PaginateOut<User>> | AppError.UnexpectedErrorResult<PaginateOut<User>>> {
        try {

            let _paginate: PaginateOut<User> = await this.UserRepository.paginate(paginate);

            return ResultGenericDto.OK(_paginate);

        } catch (error) {

            return ResultGenericDto.Fail(new AppError.UnexpectedError(error));
        }
    }




}