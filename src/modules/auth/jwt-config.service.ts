import { Injectable } from '@nestjs/common'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
        return {
            secret: 'secret',
            signOptions: { expiresIn: '60s' },
        }
    }
}
