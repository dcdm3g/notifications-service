import { NotificationNotFoundError } from '@application/use-cases/errors/notification-not-found'
import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { Injectable } from '@nestjs/common'

interface ReadNotificationRequest {
	notificationId: string
}

@Injectable()
export class ReadNotification {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}

	async execute({
		notificationId,
	}: ReadNotificationRequest): Promise<void> {
    const notification = await this.notificationsRepository.findById(notificationId)

		if (!notification) {
			throw new NotificationNotFoundError()
		}

    notification.read()
    await this.notificationsRepository.update(notification)
	}
}
