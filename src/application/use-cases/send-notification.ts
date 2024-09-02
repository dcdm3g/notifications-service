import { Content } from '@application/entities/content'
import { Notification } from '@application/entities/notification'
import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '@application/repositories/notifications-repository'

interface SendNotificationRequest {
	recipientId: string
	category: string
	content: string
}

interface SendNotificationResponse {
	notification: Notification
}

@Injectable()
export class SendNotification {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}

	async execute({
		recipientId,
		content,
		category,
	}: SendNotificationRequest): Promise<SendNotificationResponse> {
		const notification = new Notification({
			recipientId,
			category,
			content: new Content(content),
		})

		this.notificationsRepository.create(notification)

		return { notification }
	}
}
