import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export default function <T>(app: INestApplication<T>) {
    const config = new DocumentBuilder()
        .setTitle('Nestjs api docs')
        .setDescription('Nestjs api docs description')
        .addBearerAuth()
        .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, documentFactory)
}
