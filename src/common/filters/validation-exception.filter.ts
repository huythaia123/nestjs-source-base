import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { Response } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { ErrorResponse } from '../abstracts/error-reponse'

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationError[], host: ArgumentsHost) {
        console.log('ValidationExceptionFilter', exception)

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        const status = StatusCodes.BAD_REQUEST
        const error = getReasonPhrase(status)
        const message = exception.map((err) => ({
            field: err.property,
            error: err.constraints,
        }))

        response.status(status).json(new ErrorResponse({ message, error, status }))
    }
}
