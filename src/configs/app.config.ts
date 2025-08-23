import { registerAs } from '@nestjs/config'
import { AppConfig } from './types/app-config.type'
import { validateConfig } from './env.validation'

export default registerAs<AppConfig>('app', () => {
    validateConfig(process.env)

    return {
        name: process.env.APP_NAME || 'APP_NAME',
        port: parseInt(process.env.PORT || '8000', 10),
    }
})
