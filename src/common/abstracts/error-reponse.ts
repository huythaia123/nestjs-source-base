type ErrorResponseConstructor<M = unknown> = {
    status?: number
    error?: string
    message: M
}
export class ErrorResponse<M> {
    constructor(data: ErrorResponseConstructor<M>) {
        Object.assign(this, data)
    }
}
