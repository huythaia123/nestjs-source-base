import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtConfigService } from './jwt-config.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    imports: [
        JwtModule.registerAsync({ useClass: JwtConfigService }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
