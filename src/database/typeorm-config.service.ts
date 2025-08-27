import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { AllConfigType } from 'src/configs/types/all-config.type'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService<AllConfigType>) {}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get('database.host', { infer: true }),
            port: this.configService.get('database.port', { infer: true }),
            username: this.configService.get('database.username', {
                infer: true,
            }),
            password: this.configService.get('database.password', {
                infer: true,
            }),
            database: this.configService.get('database.name', {
                infer: true,
            }),
            synchronize: this.configService.get('database.synchronize', {
                infer: true,
            }),
            autoLoadEntities: true,
        }
    }
}
