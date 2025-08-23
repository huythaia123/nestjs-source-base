import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Cookies = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        const req: { cookies: Record<string, unknown> } = ctx
            .switchToHttp()
            .getRequest()
        return key ? req.cookies?.[key] : req.cookies
    },
)
