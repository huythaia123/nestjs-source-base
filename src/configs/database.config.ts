import { registerAs } from '@nestjs/config'
import { DatabaseConfig } from './types/database-config.type'

export default registerAs<DatabaseConfig>('database', () => {
    return {}
})
