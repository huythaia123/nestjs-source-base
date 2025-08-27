import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import swaggerConfig from './configs/swagger.config'
import { AppModule } from './modules/app/app.module'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'

const port = process.env.PORT || 8000
const globalPrefix = process.env.API_PREFIX || ''

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    const reflector = app.get(Reflector)

    app.use(helmet())
    app.use(compression())
    app.use(cookieParser())
    app.useGlobalGuards(new JwtAuthGuard(reflector))
    app.useGlobalFilters(new AllExceptionsFilter())
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector), new ResponseInterceptor())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true /* Loại bỏ các thuộc tính không khai báo trong DTO */,
            forbidNonWhitelisted: true /* Ném lỗi nếu có thuộc tính không khai báo trong DTO */,
            transform: true /* Tự động chuyển đổi dữ liệu đầu vào thành kiểu dữ liệu mong muốn */,
            transformOptions: {
                enableImplicitConversion: true /* Kích hoạt chuyển đổi ngầm định */,
            },
        }),
    )
    app.enableCors({ credentials: true, origin: true })
    app.setGlobalPrefix(globalPrefix)

    // swagger ----------------------------------------------------------------
    swaggerConfig(app)

    await app.listen(port, () => {
        console.log(`App is running on port ${port}`)
    })
}

bootstrap().catch((err) => {
    console.error('Error during bootstrap:', err)
})
