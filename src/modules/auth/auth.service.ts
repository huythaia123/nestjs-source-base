import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import { JwtPayload } from 'src/common/types'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { SignInDto } from './dto/signin.dto'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    public async signUp(createUserDto: CreateUserDto) {
        let user = await this.usersService.findOneByEmail(createUserDto.email)
        if (user) throw new ConflictException('user already exists')

        const hashPw = await hash(createUserDto.password, 10)
        user = await this.usersService.create({
            ...createUserDto,
            password: hashPw,
        })

        // sign in user into system after sign up
        return this.signIn(user)
    }

    public signIn(user: User) {
        const payload: JwtPayload = { sub: user.id.toString() }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    public async validateUser(signInDto: SignInDto) {
        const user = await this.usersService.findOneByEmail(signInDto.email)
        if (user && (await compare(signInDto.password, user.password))) return user
        return null
    }
}
