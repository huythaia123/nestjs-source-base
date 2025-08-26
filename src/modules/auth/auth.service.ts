import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import { JwtPayload } from 'src/common/types'
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
        const user = await this.usersService.findOneByEmail(createUserDto.email)
        if (user) throw new ConflictException('user already exists')

        const hashPw = await hash(createUserDto.password, 10)
        return await this.usersService.create({
            ...createUserDto,
            password: hashPw,
        })
    }

    public signIn(user: User) {
        const payload: JwtPayload = { sub: user.id.toString() }
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
