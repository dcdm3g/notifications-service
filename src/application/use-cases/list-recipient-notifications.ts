import { Notification } from '@application/entities/notification'
import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { Injectable } from '@nestjs/common'

interface ListRecipientNotificationsRequest {
	recipientId: string
}

interface ListRecipientNotificationsResponse {
	notifications: Notification[]
}

@Injectable()
export class ListRecipientNotifications {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}

	async execute({
		recipientId,
	}: ListRecipientNotificationsRequest): Promise<ListRecipientNotificationsResponse> {
		const notifications =
			await this.notificationsRepository.findByRecipientId(recipientId)

		return { notifications }
	}
}
