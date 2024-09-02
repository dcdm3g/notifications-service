import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { NotificationNotFoundError } from '@application/use-cases/errors/notification-not-found'
import { Injectable } from '@nestjs/common'

interface CancelNotificationRequest {
	notificationId: string
}

@Injectable()
export class CancelNotification {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}

	async execute({ notificationId }: CancelNotificationRequest): Promise<void> {
		const notification =
			await this.notificationsRepository.findById(notificationId)

		if (!notification) {
			throw new NotificationNotFoundError()
		}

		notification.cancel()
		await this.notificationsRepository.update(notification)
	}
}
