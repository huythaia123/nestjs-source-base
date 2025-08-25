import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { UsersService } from '../users/users.service'
import { SignInDto } from './dto/signin.dto'
import { SignUpDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    public async signUp(signUpDto: SignUpDto) {
        const hashPw = await hash(signUpDto.password, 10)
        return await this.usersService.create({
            ...signUpDto,
            password: hashPw,
        })
    }

    public async signIn(signInDto: SignInDto) {
        const user = await this.usersService.findOneByEmail(signInDto.email)
        if (!user) throw new UnauthorizedException('signIn')

        const comparePw = await compare(signInDto.password, user.password)
        if (!comparePw) throw new UnauthorizedException('signIn')

        return user
    }
}
