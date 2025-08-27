import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { getReasonPhrase } from 'http-status-codes'
import { ErrorResponse } from '../abstracts/error-reponse'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(httpException: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        const status = httpException.getStatus()
        const error = getReasonPhrase(status)
        const message = httpException.message

        response.status(status).json(new ErrorResponse({ status, error, message }))
    }
}
