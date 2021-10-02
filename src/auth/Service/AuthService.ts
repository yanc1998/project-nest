import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../users/Service/UserService";
import { hashSync, compareSync } from 'bcrypt'
import { User, UserRole } from "../../users/Entity/User";
import { UserDto } from "../../users/DTO/UserDto";
import { UserDtoRegister } from "../../users/DTO/UserDtoRegister";
import { ReturnLoginDTo } from "../DTO/ReturnLoginDto";
import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { AppError } from "src/base/errors/app.error";
import { ForgetPasswordDto } from "src/users/DTO/ForgetPassword";
import { MailService } from "src/mail/service/MailService";
import { Constants } from "src/base/constants/constants";
import { IResultError } from "src/base/Interfaces/IResultError";
import { ConfirmRegisterDto } from "../DTO/ConfirmRegisterDto";
import { jwt_config_confirm_register } from "../config/auth.config";
import { MailError } from "src/mail/errors/email.errors";
import { ConfirmForgetPassword } from "../DTO/ConfirmForgetPassword";
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly mailService: MailService) {

    }
    async validate(username: string, password: string): Promise<User> {
        const result = await this.userService.GetByFilter({ filter: { email: username } })
        if (result.isOk && result.getData() && result.getData().is_register_confirm) {
            if (compareSync(password, result.getData().password)) {
                return result.getData()
            }
            return null;
        }
        return null;

    }
    async login(user: User): Promise<ResultGenericDto<ReturnLoginDTo>> {

        const payload = { email: user.email, sub: user._id, role: user.role };

        console.log(payload, 'login')
        return ResultGenericDto.OK({ acces_token: await this.jwtService.signAsync(payload) });

    }

    async forgerPassword(forgetPassword: ForgetPasswordDto): Promise<ResultGenericDto<any> | IResultError> {

        let result_user = await this.userService.GetByFilter({ filter: { email: forgetPassword.email } })

        if (result_user.isOk) {

            let user = result_user.getData();

            if (user) {

                let payload = { email: user.email, sub: user._id, from_email: true, newpassword: forgetPassword.newpassword };
                let acces_token = await this.jwtService.signAsync(payload, jwt_config_confirm_register);
                let route = `${Constants.url_front}/Auth/forgot_password/${acces_token}`
                let html = `<b>${route}<b/>`
                return await this.mailService.SendEmail(user.email, html);
            }
            return ResultGenericDto.Fail(new AppError.ValidationError('not exist user with this email'))
        }

        return ResultGenericDto.Fail(result_user.error);
    }

    //completar
    async ConfirmForgetPassword(confirmForgetPassword: ConfirmForgetPassword) {
        try {
            if (await this.jwtService.verifyAsync(confirmForgetPassword.validationCode, jwt_config_confirm_register)) {
                let pyload: any = this.jwtService.decode(confirmForgetPassword.validationCode)
                return await this.userService.updateForgetPassword({ newpassword: pyload.newpassword, email: pyload.email })

            }
            return ResultGenericDto.Fail(new AppError.ValidationError('invalid confirm register token'))
        } catch (error) {
            return ResultGenericDto.Fail(new AppError.ValidationError(error))
        }
    }

    async Register(user: UserDtoRegister): Promise<ResultGenericDto<User> | AppError.ValidationErrorResult<User> | MailError.EmailSendErrorResult<any>> {

        const result: ResultGenericDto<User> | AppError.UnexpectedErrorResult<User> = await this.userService.GetByFilter({ filter: { email: user.email } });

        if (result.isOk) {

            let new_data: User = result.getData();
            let payload = { email: user.email, confirm_register: true }
            let register_token = await this.jwtService.signAsync(payload, jwt_config_confirm_register)
            let data = `<b>${register_token}<b/>`

            if (!new_data) {

                let emailresult = await this.mailService.SendEmail(user.email, data);

                if (emailresult.isOk) {

                    return await this.userService.Add(UserDto.RegisterToDto(user, UserRole.USER));
                }

                return ResultGenericDto.Fail(emailresult.error);

            } else {

                if (!new_data.is_register_confirm) {

                    if (compareSync(user.password, new_data.password)) {
                        let res_mail = await this.mailService.SendEmail(user.email, data);
                        if (res_mail.isOk) {
                            return ResultGenericDto.OK(new_data)
                        }

                        return ResultGenericDto.Fail(res_mail.error)
                    }

                    return ResultGenericDto.Fail(new AppError.ValidationError('user alredy exist with other password witout confirm'))
                }

                return ResultGenericDto.Fail(new AppError.ValidationError('user alredy exist'))
            }

        }
        return result;

    }

    async ConfirmRegister(confirmRegister: ConfirmRegisterDto) {
        try {
            if (await this.jwtService.verifyAsync(confirmRegister.validationCode, jwt_config_confirm_register)) {
                let pyload: any = this.jwtService.decode(confirmRegister.validationCode)
                return await this.userService.UpdateConfirmRegister(pyload.email, true);

            }

        } catch (error) {
            return ResultGenericDto.Fail(new AppError.ValidationError(error))
        }
    }

    async SendVerificationCode(email: string) {
        let result = await this.userService.GetByFilter({ filter: { email: email } })
        if (result.isOk) {
            let user = result.getData()
            let pyload = { email: user.email, confirm_register: true }
            let register_token = await this.jwtService.signAsync(pyload, jwt_config_confirm_register)
            let data = `<b>${register_token}<b/>`
            return await this.mailService.SendEmail(user.email, data);

        }
        return result;
    }
}