import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ReqUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request: { user: unknown } = ctx.switchToHttp().getRequest()
    return request.user
})
