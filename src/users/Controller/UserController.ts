import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ResultGenericDto } from "src/base/DTO/OUTPUT/ResultGenericDto";
import { AppError } from "src/base/errors/app.error";
import { Roles } from "../../auth/decorator/roles.decorator";
import { JwtAuthGuard } from "../../auth/Guards/jwtAuthGuards";
import { RolesGuard } from "../../auth/Guards/role.guard";
import { DeleteUserDto } from "../DTO/DeleteUserDto";
import { GetUserDto } from "../DTO/GetUserDto";
import { GetUserFilterDto } from "../DTO/GetUserFilterDto";
import { UpdateRoleDto } from "../DTO/UpdateRoleDto";
import { UpdateUserDto } from "../DTO/UpdateUserDto";
import { UserDto } from "../DTO/UserDto";
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
    async GetById(@Body() getDto: GetUserDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        return await this.UserService.GetById(getDto);
    }

    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get('/getmany')
    async GetMany(@Body() getuserfilter: GetUserFilterDto): Promise<ResultGenericDto<User[]> | AppError.UnexpectedErrorResult<User[]>> {
        return await this.UserService.GetMany(getuserfilter);
    }

    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async Add(@Body() user: UserDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User> | AppError.ValidationErrorResult<User>> {
        let result: ResultGenericDto<User> | AppError.UnexpectedErrorResult<User> | AppError.ValidationErrorResult<User> = await this.UserService.Add(user);
        return result;
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
    async deleteById(@Body() deleteDto: DeleteUserDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        return await this.UserService.DeleteById(deleteDto);
    }

    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/updateUser')
    async updateUser(@Body() updateUser: UpdateUserDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        return await this.UserService.UpdateUser(updateUser);
    }

    @Roles('manager')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('/updateRole')
    async updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<ResultGenericDto<User> | AppError.UnexpectedErrorResult<User>> {
        return await this.UserService.UpdateRole(updateRoleDto);
    }

    @Post('/admincheck')
    async checkAdmin(): Promise<User> {
        let user: User = {
            username: "UserManager",
            password: "PasswordManager",
            email: "yancarloglez@gmail.com",
            date: new Date(),
            role: UserRole.MANAGER
        }
        let result = await this.UserService.Add(user);
        if (result.isOk) {
            return result.getData()
        }
        result.getError()
    }
}