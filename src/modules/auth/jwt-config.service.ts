import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'
import { Algorithm } from 'jsonwebtoken'
import { AllConfigType } from 'src/configs/types/all-config.type'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private configService: ConfigService<AllConfigType>) {}

    createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
        const algorithm = this.configService.get('jwt.algorithm', {
            infer: true,
        }) as Algorithm

        return {
            secret: algorithm?.startsWith('HS')
                ? this.configService.get('jwt.secret', { infer: true })
                : undefined,
            // privateKey:
            //     algorithm?.startsWith('RS') || algorithm?.startsWith('ES')
            //         ? this.configService.get('jwt.privateKey', { infer: true })
            //         : undefined,
            publicKey:
                algorithm?.startsWith('RS') || algorithm?.startsWith('ES')
                    ? this.configService.get('jwt.publicKey', { infer: true })
                    : undefined,
            signOptions: {
                algorithm,
                // keyid:
                //     this.configService.get('jwt.keyid', { infer: true }),,
                expiresIn: this.configService.get('jwt.expiresIn', {
                    infer: true,
                }),
                notBefore: this.configService.get('jwt.notBefore', {
                    infer: true,
                }),
                // jwtid: ,
                // audience:
                //     this.configService.get('jwt.audience', {
                //         infer: true,
                //     }) || undefined,
                // issuer:
                //     this.configService.get('jwt.issuer', { infer: true }) ||
                //     undefined,
            },
        }
    }
}
