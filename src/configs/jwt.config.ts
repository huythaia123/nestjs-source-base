import { registerAs } from '@nestjs/config'
import { JwtConfig } from './types/jwt-config.type'

export default registerAs<JwtConfig>('jwt', () => {
    return {}
})
