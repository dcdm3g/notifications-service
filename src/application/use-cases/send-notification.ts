import { Content } from '@application/entities/content'
import { Notification } from '@application/entities/notification'
import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { Injectable } from '@nestjs/common'

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
