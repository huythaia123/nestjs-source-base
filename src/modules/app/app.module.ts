import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import appConfig from 'src/configs/app.config'
import databaseConfig from 'src/configs/database.config'
import jwtConfig from 'src/configs/jwt.config'
import { TypeOrmConfigService } from 'src/database/typeorm-config.service'
import { DataSource, DataSourceOptions } from 'typeorm'
import { UsersModule } from '../users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig, jwtConfig],
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (opts: DataSourceOptions) => {
                return await new DataSource(opts).initialize()
            },
        }),
        UsersModule,
        // AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
