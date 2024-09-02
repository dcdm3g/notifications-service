import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { NotificationNotFoundError } from '@application/use-cases/errors/notification-not-found'
import { Injectable } from '@nestjs/common'

interface UnreadNotificationRequest {
	notificationId: string
}

@Injectable()
export class UnreadNotification {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}

	async execute({ notificationId }: UnreadNotificationRequest): Promise<void> {
		const notification =
			await this.notificationsRepository.findById(notificationId)

		if (!notification) {
			throw new NotificationNotFoundError()
		}

		notification.unread()
		await this.notificationsRepository.update(notification)
	}
}
