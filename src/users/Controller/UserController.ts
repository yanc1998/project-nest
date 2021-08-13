import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { PaginateIn } from "src/base/DTO/INPUT/PaginateIn";
import { PaginateOut } from "src/base/DTO/OUTPUT/PaginateOut";
import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { AppError } from "src/base/errors/app.error";
import { IResultError } from "src/base/Interfaces/IResultError";
import { Roles } from "../../auth/decorator/roles.decorator";
import { JwtAuthGuard } from "../../auth/Guards/jwtAuthGuards";
import { RolesGuard } from "../../auth/Guards/role.guard";
import { DeleteUserDto } from "../DTO/DeleteUserDto";
import { ForgetPasswordDto } from "../DTO/ForgetPassword";
import { GetUserDto } from "../DTO/GetUserDto";
import { GetUserFilterDto } from "../DTO/GetUserFilterDto";
import { UpdateRoleDto } from "../DTO/UpdateRoleDto";
import { UpdateUserDto } from "../DTO/UpdateUserDto";
import { UserDto } from "../DTO/UserDto";
import { UserReturn } from "../DTO/UserReturn";
import { UserUpdatePasswordDto } from "../DTO/UserUpdatePassword";
import { User, UserRole } from "../Entity/User";
import { UserService } from "../Service/UserService";

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) {

    }
    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get('/get')
    async GetById(@Body() getDto: GetUserDto): Promise<ResultGenericDto<UserReturn> | AppError.UnexpectedErrorResult<UserReturn>> {
        let user = await this.UserService.GetById(getDto);
        return user.mapAsync(UserReturn.UserToUserReturn);
    }

    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get('/getmany')
    async GetMany(@Body() getuserfilter: GetUserFilterDto): Promise<ResultGenericDto<UserReturn[]> | AppError.UnexpectedErrorResult<UserReturn[]>> {
        let users = await this.UserService.GetMany(getuserfilter);
        console.log(users)
        return users.mapAsync(UserReturn.UsersToUserReturn);
    }

    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async Add(@Body() user: UserDto): Promise<ResultGenericDto<UserReturn> | AppError.UnexpectedErrorResult<UserReturn> | AppError.ValidationErrorResult<UserReturn>> {
        let result: ResultGenericDto<User> | AppError.UnexpectedErrorResult<User> | AppError.ValidationErrorResult<User> = await this.UserService.Add(user);
        return result.mapAsync(UserReturn.UserToUserReturn);
    }

    //@Roles('manager')
    //@UseGuards(RolesGuard)
    //@UseGuards(JwtAuthGuard)
    @Post('/delete')
    async delete(): Promise<any> {
        return await this.UserService.DeleteMany({ filter: {} });
    }

    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/deleteById')
    async deleteById(@Body() deleteDto: DeleteUserDto): Promise<ResultGenericDto<UserReturn> | AppError.UnexpectedErrorResult<UserReturn>> {
        let user = await this.UserService.DeleteById(deleteDto);
        return user.mapAsync(UserReturn.UserToUserReturn);
    }

    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/updateUser')
    async updateUser(@Body() updateUser: UpdateUserDto): Promise<ResultGenericDto<UserReturn> | AppError.UnexpectedErrorResult<UserReturn>> {
        let user_update = await this.UserService.UpdateUser(updateUser);
        return user_update.mapAsync(UserReturn.UserToUserReturn)
    }

    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/updateRole')
    async updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<ResultGenericDto<UserReturn> | AppError.UnexpectedErrorResult<UserReturn>> {
        let user_update = await this.UserService.UpdateRole(updateRoleDto);
        return user_update.mapAsync(UserReturn.UserToUserReturn)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/updatePassword')
    async updatePassword(@Body() userUpdatePasswordDto: UserUpdatePasswordDto, @Request() req): Promise<ResultGenericDto<User> | IResultError> {
        console.log(req.user);
        return await this.UserService.UpdatePassword(userUpdatePasswordDto, req.user._id);
    }


    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get('/paginate')
    async paginate(@Body() paginate: PaginateIn): Promise<ResultGenericDto<PaginateOut<UserReturn>> | AppError.UnexpectedErrorResult<PaginateOut<UserReturn>>> {
        let paginate_Out = await this.UserService.Paginate(paginate);
        return paginate_Out.mapAsync(UserReturn.PaginateUserResult);
    }

    @Post('/admincheck')
    async checkAdmin(): Promise<User> {
        let user: User = {
            username: "UserManager",
            password: "PasswordManager",
            email: "yancarloglez@gmail.com",
            date: new Date(),
            role: UserRole.MANAGER,
            is_register_confirm: false

        }
        let result = await this.UserService.Add(user);
        if (result.isOk) {
            return result.getData()
        }
        result.getError()
    }

}