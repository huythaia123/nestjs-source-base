import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { Public } from 'src/common/decorators/public.decorator'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signin.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @Public()
    @ApiOperation({ summary: 'register a new user' })
    @ApiBody({ type: CreateUserDto })
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto)
    }

    @Post('signin')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'login user' })
    @ApiBody({ type: SignInDto })
    signIn(@Req() req: { user: User }) {
        return this.authService.signIn(req.user)
    }

    // @Post('signout')
    // @UseGuards(LocalAuthGuard)
    // async logout(@Req() req) {
    //     return req.logout()
    // }

    // @Get('profile')
    // @UseGuards(JwtAuthGuard)
    // profile(@ReqUser() user: User) {
    //     return user
    // }
}
