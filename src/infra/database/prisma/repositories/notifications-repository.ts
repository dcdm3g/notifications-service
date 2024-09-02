import { Notification } from '@application/entities/notification'
import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { PrismaNotificationMapper } from '@infra/database/prisma/mappers/notification-mapper'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(notification: Notification): Promise<void> {
		await this.prisma.notification.create({
			data: PrismaNotificationMapper.toPrisma(notification),
		})
	}

	async findById(notificationId: string): Promise<Notification | null> {
		const notification = await this.prisma.notification.findUnique({
			where: { id: notificationId },
		})

		return notification ? PrismaNotificationMapper.toDomain(notification) : null
	}

	async update(notification: Notification): Promise<void> {
		await this.prisma.notification.update({
			where: { id: notification.id },
			data: PrismaNotificationMapper.toPrisma(notification),
		})
	}

	async countByRecipientId(recipientId: string): Promise<number> {
		return this.prisma.notification.count({
			where: { recipientId },
		})
	}

	async findByRecipientId(recipientId: string): Promise<Notification[]> {
		const notifications = await this.prisma.notification.findMany({
			where: { recipientId },
		})

		return notifications.map(PrismaNotificationMapper.toDomain)
	}
}
