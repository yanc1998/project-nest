import { Body, Controller, Get, Post, Req, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ResultGenericDto } from 'src/base/DTO/OUTPUT/ResultGenericDto';
import { AppError } from 'src/base/errors/app.error';
import { IResultError } from 'src/base/Interfaces/IResultError';
import { ForgetPasswordDto } from 'src/users/DTO/ForgetPassword';
import { UserReturn } from 'src/users/DTO/UserReturn';
import { UserDtoRegister } from '../../users/DTO/UserDtoRegister';
import { User } from '../../users/Entity/User';
import { ConfirmRegisterDto } from '../DTO/ConfirmRegisterDto';
import { ReturnLoginDTo } from '../DTO/ReturnLoginDto';
import { JwtAuthGuard } from '../Guards/jwtAuthGuards';
import { LocalAuthGuard } from '../Guards/LocalAuthGuard';
import { AuthService } from '../Service/AuthService';

@UsePipes(ValidationPipe)
@Controller('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async GetProfile(@Request() req) {
        return UserReturn.UserToUserReturn(req.user)

    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async Login(@Request() req): Promise<ResultGenericDto<ReturnLoginDTo> | AppError.ValidationErrorResult<ReturnLoginDTo>> {
        let result: ResultGenericDto<ReturnLoginDTo> | AppError.ValidationErrorResult<ReturnLoginDTo> = await this.authService.login(req.user);
        console.log('login')

        return result
    }


    @Post('/register')
    async register(@Body() user: UserDtoRegister): Promise<ResultGenericDto<UserReturn> | AppError.UnexpectedErrorResult<UserReturn> | AppError.ValidationErrorResult<UserReturn>> {
        let result: ResultGenericDto<User> | AppError.UnexpectedErrorResult<User> | AppError.ValidationErrorResult<User> = await this.authService.Register(user);
        return result.mapAsync(UserReturn.UserToUserReturn)

    }

    @Post('/confirmRegister')
    async confirmRegister(@Body() confirmRegisterdto: ConfirmRegisterDto) {
        return await this.authService.ConfirmRegister(confirmRegisterdto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/forgot_password')
    async forgot_password(@Body() forget_password: ForgetPasswordDto, @Request() req: any): Promise<ResultGenericDto<any> | IResultError> {
        return await this.authService.forgerPassword(forget_password, req.user)
    }
}