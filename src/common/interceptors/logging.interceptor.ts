import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>()
        const now = Date.now()
        return next
            .handle()
            .pipe(tap(() => console.log(`${req.method} - ${req.url} - ${Date.now() - now}ms`)))
    }
}
