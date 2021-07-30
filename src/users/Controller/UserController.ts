import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserDto } from "../DTO/UserDto";
import { User } from "../Entity/User";
import { UserService } from "../Service/UserService";

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) {

    }
    @Get('/get/:id')
    async GetById(@Param('id') id: string): Promise<User> {
        return await this.UserService.GetById(id);
    }
    @Get('/getmany')
    async GetMany(@Body('filter') filter: {}): Promise<User[]> {
        return await this.UserService.GetMany(filter);
    }
    @Post('/add')
    async Add(@Body('user') user: UserDto): Promise<User> {
        return await this.UserService.Add(user);
    }
    @Post('/delete')
    async delete(): Promise<User[]> {
        return await this.UserService.DeleteMany({});

    }
}