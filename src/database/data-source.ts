import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [process.cwd() + '/src/*.entity.{ts,js}'],
    migrations: [process.cwd() + '/src/database/migrations/*.{ts,js}'],
    synchronize: process.env.DB_NAME === 'true',
})
