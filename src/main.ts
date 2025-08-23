import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import cookieParser from 'cookie-parser'
import compression from 'compression'

const port = process.env.PORT || 8000
const globalPrefix = process.env.API_PREFIX || ''

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.use(cookieParser)
    app.use(compression())
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
    app.setGlobalPrefix(globalPrefix)
    app.enableCors({ credentials: true, origin: true })

    await app.listen(port, () => {
        console.log(`App is running on port ${port}`)
    })
}

bootstrap().catch((err) => {
    console.error('Error during bootstrap:', err)
})
