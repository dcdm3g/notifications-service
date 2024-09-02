import { Notification } from '@application/entities/notification'
import { NotificationsRepository } from '@application/repositories/notifications-repository'

export class InMemoryNotificationsRepository
	implements NotificationsRepository
{
	notifications: Notification[] = []

	async create(notification: Notification): Promise<void> {
		this.notifications.push(notification)
	}

	async findById(notificationId: string): Promise<Notification | null> {
		return this.notifications.find((n) => n.id === notificationId) ?? null
	}

	async update(notification: Notification): Promise<void> {
		this.notifications = this.notifications.map((n) =>
			n.id === notification.id ? notification : n,
		)
	}

	async countByRecipientId(recipientId: string): Promise<number> {
		return this.notifications.reduce(
			(count, notification) =>
				notification.recipientId === recipientId ? count + 1 : count,
			0,
		)
	}

	async findByRecipientId(recipientId: string): Promise<Notification[]> {
		return this.notifications.filter((n) => n.recipientId === recipientId)
	}
}
