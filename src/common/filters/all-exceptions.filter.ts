import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { Response } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { ErrorResponse } from '../abstracts/error-reponse'
import { HttpExceptionFilter } from './http-exception.filter'
import { ValidationExceptionFilter } from './validation-exception.filter'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly httpExceptionFilter = new HttpExceptionFilter()
    private readonly validationExceptionFilter = new ValidationExceptionFilter()

    catch(exception: any, host: ArgumentsHost) {
        // catch http exception
        if (exception instanceof HttpException) {
            return this.httpExceptionFilter.catch(exception, host)
        }
        // catch validation exception
        if (Array.isArray(exception) && exception.length > 0 && exception[0] instanceof ValidationError) {
            return this.validationExceptionFilter.catch(exception as ValidationError[], host)
        }

        // other exception
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        const status = StatusCodes.INTERNAL_SERVER_ERROR
        const error = getReasonPhrase(status)
        const message = exception instanceof Error ? exception.message : getReasonPhrase(status)

        response.status(status).json(new ErrorResponse({ message, error, status }))
    }
}
