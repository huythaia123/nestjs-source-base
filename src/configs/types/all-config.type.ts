import { AppConfig } from './app-config.type'
import { DatabaseConfig } from './database-config.type'
import { JwtConfig } from './jwt-config.type'

export type AllConfigType = {
    app: AppConfig
    database: DatabaseConfig
    jwt: JwtConfig
}
