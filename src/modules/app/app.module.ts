import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'
import appConfig from 'src/configs/app.config'
import databaseConfig from 'src/configs/database.config'
import jwtConfig from 'src/configs/jwt.config'
import { TypeOrmConfigService } from 'src/database/typeorm-config.service'
import { DataSource, DataSourceOptions } from 'typeorm'
import { AuthModule } from '../auth/auth.module'
import { UsersModule } from '../users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ThrottlerConfigService } from './throttler-config.service'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [appConfig, databaseConfig, jwtConfig] }),
        ThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (opts: DataSourceOptions) => {
                return await new DataSource(opts).initialize()
            },
        }),
        UsersModule,
        AuthModule,
        // HealthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
