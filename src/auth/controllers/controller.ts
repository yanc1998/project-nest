import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { UserDto } from 'src/users/DTO/UserDto';
import { User } from 'src/users/Entity/User';
import { JwtAuthGuard } from '../Guards/jwtAuthGuards';
import { LocalAuthGuard } from '../Guards/LocalAuthGuard';
import { AuthService } from '../Service/AuthService';
@Controller('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async GetProfile(@Request() req) {
        return req.user
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async Login(@Request() req): Promise<any> {
        return await this.authService.login(req.user);
    }


    @Post('/register')
    async register(@Body('user') user: UserDto): Promise<User> {
        return await this.authService.Register(user);
    }
}