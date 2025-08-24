/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { registerAs } from '@nestjs/config'
import {
    IsBoolean,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
    ValidateIf,
} from 'class-validator'
import { validateConfig } from 'src/utils/validateConfig'
import { DatabaseConfig } from './types/database-config.type'

class EnvVariables {
    @ValidateIf((o) => o.DB_URL)
    @IsString()
    DB_URL: string

    @ValidateIf((o) => !o.DB_URL)
    @IsString()
    DB_TYPE: string

    @ValidateIf((o) => !o.DB_URL)
    @IsString()
    DB_HOST: string

    @ValidateIf((o) => !o.DB_URL)
    @IsNumber()
    @Min(0)
    @Max(65535)
    DB_PORT: number

    @ValidateIf((o) => !o.DB_URL)
    @IsString()
    DB_NAME: string

    @ValidateIf((o) => !o.DB_URL)
    @IsString()
    DB_USERNAME: string

    @ValidateIf((o) => !o.DB_URL)
    @IsString()
    DB_PASSWORD: string

    @IsOptional()
    @IsBoolean()
    DB_SYNCHRONIZE: boolean

    @IsOptional()
    @IsInt()
    DB_MAX_CONNECTIONS: number

    @IsOptional()
    @IsBoolean()
    DB_SSL_ENABLED: boolean

    @IsOptional()
    @IsBoolean()
    DB_REJECT_UNAUTHORIZED: boolean

    @IsOptional()
    @IsString()
    DB_CA: string

    @IsOptional()
    @IsString()
    DB_KEY: string

    @IsOptional()
    @IsString()
    DB_CERT: string
}

export default registerAs<DatabaseConfig>('database', () => {
    validateConfig(process.env, EnvVariables)

    return {
        url: process.env.DB_URL,
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        synchronize: process.env.DB_SYNCHRONIZE?.toLowerCase() === 'true',
        maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '100', 10),
        sslEnabled: process.env.DB_SSL_ENABLED?.toLowerCase() === 'true',
        rejectUnauthorized:
            process.env.DB_REJECT_UNAUTHORIZED?.toLowerCase() === 'true',
        ca: process.env.DB_CA,
        key: process.env.DB_KEY,
        cert: process.env.DB_CERT,
    }
})
