import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        )

        if (isPublic) return true

        return super.canActivate(context)
    }

    handleRequest<JwtPayload>(
        err: unknown,
        payload: JwtPayload,
        info: unknown,
    ) {
        // console.log(err, payload, info instanceof Error)
        if (
            payload &&
            typeof payload === 'object' &&
            Object.keys(payload).length > 0
        ) {
            return payload
        } else if (err instanceof Error) {
            throw new UnauthorizedException(`Invalid token: ${err.message}`)
        } else if (info instanceof Error) {
            throw new UnauthorizedException(`Invalid token: ${info.message}`)
        } else {
            throw err || info
        }
    }
}
