import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ReqUser = createParamDecorator((key: string, ctx: ExecutionContext) => {
    const request: { user: Record<string, unknown> } = ctx.switchToHttp().getRequest()
    return key ? request.user?.[key] : request.user
})
