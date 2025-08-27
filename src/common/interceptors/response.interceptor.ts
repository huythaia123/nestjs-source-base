import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request, Response } from 'express'
import { map, Observable } from 'rxjs'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, { data: T }> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<{ data: T }> {
        const req = context.switchToHttp().getRequest<Request>()
        const res = context.switchToHttp().getResponse<Response>()
        return next.handle().pipe(
            map((data) => ({
                status: res.statusCode,
                success: res.statusCode >= 200 && res.statusCode < 300,
                message: 'Request processed successfully',
                url: req.url,
                data,
            })),
        )
    }
}
