import { Content } from '@application/entities/content'
import { Notification } from '@application/entities/notification'
import { Notification as PrismaNotification } from '@prisma/client'

export class PrismaNotificationMapper {
	static toPrisma(notification: Notification) {
		return {
			id: notification.id,
			recipientId: notification.recipientId,
			category: notification.category,
			content: notification.content.value,
			readAt: notification.readAt,
			createdAt: notification.createdAt,
		}
	}

	static toDomain({ content, id, ...rest }: PrismaNotification): Notification {
		return new Notification({ content: new Content(content), ...rest }, id)
	}
}
