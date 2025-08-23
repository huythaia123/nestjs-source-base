import { plainToInstance } from 'class-transformer'
import {
    IsEnum,
    IsNumber,
    IsString,
    Max,
    Min,
    validateSync,
} from 'class-validator'

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Provision = 'provision',
}

class EnvironmentVariables {
    @IsEnum(Environment, {
        message: `NODE_ENV must be one of ${Object.values(Environment).join(',')}`,
    })
    NODE_ENV: Environment

    @IsString()
    APP_NAME: string

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number
}

export function validateConfig(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    })
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    })
    if (errors.length > 0) {
        throw new Error(errors.toString())
    }
    return validatedConfig
}
