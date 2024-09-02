import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { HTTPModule } from '@infra//http/http.module'

async function bootstrap() {
	const app = await NestFactory.create(HTTPModule)
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(3000)
}

bootstrap()
