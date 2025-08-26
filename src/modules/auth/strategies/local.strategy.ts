import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { PassportStrategy } from '@nestjs/passport'
import { plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { SignInDto } from '../dto/signin.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private moduleRef: ModuleRef,
        private authService: AuthService,
    ) {
        super({
            passReqToCallback: true,
            passwordField: 'password',
            usernameField: 'email',
        })
    }

    async validate(request: Request, email: string, password: string) {
        // const contextId = ContextIdFactory.getByRequest(request)
        // const authService = await this.moduleRef.resolve(AuthService, contextId)

        const signInDto = plainToInstance(SignInDto, { email, password })
        await validateOrReject(signInDto)

        const user = await this.authService.validateUser({ email, password })
        if (user) return user
        throw new UnauthorizedException('Email or password incorect')
    }
}
