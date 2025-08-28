import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler'

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    constructor(private configService: ConfigService) {}

    createThrottlerOptions(): Promise<ThrottlerModuleOptions> | ThrottlerModuleOptions {
        return { throttlers: [{ limit: 10, ttl: 60 * 1000 }] }
    }
}
