import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    public async signUp(createUserDto: CreateUserDto) {
        const hashPw = await hash(createUserDto.password, 10)
        return await this.usersService.create({
            ...createUserDto,
            password: hashPw,
        })
    }

    public signIn(user: User) {
        const payload = { sub: user.id, email: user.email }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    public async validateUser(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email)
        if (user && (await compare(password, user.password))) return user
        return null
    }
}
