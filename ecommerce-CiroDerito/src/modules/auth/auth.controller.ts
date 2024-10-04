import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "src/dtos/user.dto";
import { ApiTags } from "@nestjs/swagger";
import { EmailToloweCase } from "src/interceptors/emailToLowerCase.interceptor";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }
    @Get()
    getAuths(): string {
        return this.authService.getAuths();
    }
    @Post('signin')
    singIn(@Body() credentials: LoginUserDto) {
        const { email, password } = credentials
        return this.authService.singIn(email, password)
    }

    // @UseInterceptors(EmailToloweCase)
    @Post('signup')
    singUp(@Body() user: CreateUserDto) {
        return this.authService.singup(user)
    }
}