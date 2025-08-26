import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ModuleRef } from '@nestjs/core'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from 'src/common/types'
import { AllConfigType } from 'src/configs/types/all-config.type'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private moduleRef: ModuleRef,
        private configService: ConfigService<AllConfigType>,
        private usersService: UsersService,
    ) {
        super({
            passReqToCallback: true,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider: (request, rawJwtToken, done) => {
                const secret =
                    configService.get('jwt.secret', { infer: true }) ??
                    configService.get('jwt.publicKey', { infer: true })
                if (!secret)
                    return done(
                        new Error('JWT secret or publicKey not configured'),
                    )
                return done(null, secret)

                // Có thể xử lý thêm dựa trên request hoặc rawJwtToken
                // ví dụ: chọn secret khác nhau dựa theo subdomain
                // const host = request.headers.host;
                // if (host.includes('admin')) secret = this.configService.get('jwt.adminSecret');
            },
        })
    }

    async validate(request: Request, payload: JwtPayload<unknown>) {
        // const contextId = ContextIdFactory.getByRequest(request)
        // const yourService = await this.moduleRef.resolve(YourService, contextId)

        const user = await this.usersService.findOne(+(payload.sub as string))
        if (!user) throw new UnauthorizedException('[JwtStrategy]')
        return user
    }
}
