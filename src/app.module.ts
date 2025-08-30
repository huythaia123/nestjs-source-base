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
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ThrottlerConfigService } from './configs/throttler-config.service'
import { AuthModule } from './modules/auth/auth.module'
import { RolesModule } from './modules/roles/roles.module'
import { UsersModule } from './modules/users/users.module'

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
        RolesModule,
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
