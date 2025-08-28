import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request, Response } from 'express'
import { map, Observable } from 'rxjs'
import { RESPONSE_MESSAGE } from '../decorators/response-message.decorator'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, { data: T }> {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<{ data: T }> {
        const req = context.switchToHttp().getRequest<Request>()
        const res = context.switchToHttp().getResponse<Response>()
        return next.handle().pipe(
            map((data) => ({
                status: res.statusCode,
                success: res.statusCode >= 200 && res.statusCode < 300,
                message:
                    this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) ||
                    'Request processed successfully',
                url: req.url,
                data,
            })),
        )
    }
}
