import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ContextIdFactory, ModuleRef } from '@nestjs/core'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private moduleRef: ModuleRef) {
        super({
            passReqToCallback: true,
            passwordField: 'password',
            usernameField: 'email',
        })
    }

    async validate(request: Request, email: string, password: string) {
        const contextId = ContextIdFactory.getByRequest(request)
        const authService = await this.moduleRef.resolve(AuthService, contextId)
        const user = await authService.validateUser(email, password)

        if (user) return user
        throw new UnauthorizedException('Email or password incorect')
    }
}
