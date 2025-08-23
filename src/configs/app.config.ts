import { registerAs } from '@nestjs/config'
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator'
import { validateConfig } from 'src/utils/validateConfig'
import { AppConfig } from './types/app-config.type'

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Provision = 'provision',
}

class EnvVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment

    @IsString()
    APP_NAME: string

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number
}

export default registerAs<AppConfig>('app', () => {
    validateConfig(process.env, EnvVariables)

    return {
        name: process.env.APP_NAME || 'APP_NAME',
        port: parseInt(process.env.PORT || '8000', 10),
    }
})
