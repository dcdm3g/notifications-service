import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateNotificationBody {
	@IsUUID()
	recipientId: string

	@IsString()
	@IsNotEmpty()
	category: string

	@IsString()
	@IsNotEmpty()
	content: string
}
