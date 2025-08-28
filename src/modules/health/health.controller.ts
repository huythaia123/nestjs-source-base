import { Controller, Get } from '@nestjs/common'
import {
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus'
import { Public } from 'src/common/decorators/public.decorator'

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private httpHealth: HttpHealthIndicator,
        private typeOrmHealth: TypeOrmHealthIndicator,
    ) {}

    @Get()
    @Public()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.httpHealth.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
            () => this.typeOrmHealth.pingCheck('database'),
        ])
    }
}
