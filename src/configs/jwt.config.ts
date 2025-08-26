/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { registerAs } from '@nestjs/config'
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator'
import { validateConfig } from 'src/utils/validateConfig'
import { JwtConfig } from './types/jwt-config.type'

export enum JwtAlgorithm {
    HS256 = 'HS256',
    HS384 = 'HS384',
    HS512 = 'HS512',
    RS256 = 'RS256',
    RS384 = 'RS384',
    RS512 = 'RS512',
    ES256 = 'ES256',
    ES384 = 'ES384',
    ES512 = 'ES512',
    PS256 = 'PS256',
    PS384 = 'PS384',
    PS512 = 'PS512',
    None = 'none',
}

class EnvVariables {
    @ValidateIf((o) => o.JWT_SECRET)
    @IsNotEmpty()
    @IsString()
    JWT_SECRET: string

    @ValidateIf((o) => !o.JWT_SECRET)
    @IsNotEmpty()
    @IsString()
    JWT_PRIVATE_KEY?: string

    @ValidateIf((o) => !o.JWT_SECRET)
    @IsNotEmpty()
    @IsString()
    JWT_PUBLIC_KEY?: string

    @IsEnum(JwtAlgorithm)
    JWT_ALGORITHM: string

    @IsString()
    JWT_KEY_ID?: string

    @IsString()
    JWT_EXPIRES_IN: string

    @IsString()
    JWT_NOT_BEFORE?: string

    @IsString()
    JWT_AUDIENCE?: string

    @IsString()
    JWT_ISSUER?: string
}

export default registerAs<JwtConfig>('jwt', () => {
    validateConfig(process.env, EnvVariables)

    return {
        secret: process.env.JWT_SECRET,
        privateKey: process.env.JWT_PRIVATE_KEY,
        publicKey: process.env.JWT_PUBLIC_KEY,
        algorithm: process.env.JWT_ALGORITHM || JwtAlgorithm.HS256,
        keyid: process.env.JWT_KEY_ID,
        expiresIn: process.env.JWT_EXPIRES_IN,
        notBefore: process.env.JWT_NOT_BEFORE,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
    }
})
