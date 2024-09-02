import { CancelNotification } from '@application/use-cases/cancel-notification'
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications'
import { ListRecipientNotifications } from '@application/use-cases/list-recipient-notifications'
import { ReadNotification } from '@application/use-cases/read-notification'
import { SendNotification } from '@application/use-cases/send-notification'
import { UnreadNotification } from '@application/use-cases/unread-notification'
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body'
import { NotificationViewModel } from '@infra/http/view-models/notification-view-model'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common'

@Controller()
export class NotificationsController {
	constructor(
		private readonly sendNotification: SendNotification,
		private readonly listRecipientNotifications: ListRecipientNotifications,
		private readonly countRecipientNotifications: CountRecipientNotifications,
		private readonly readNotification: ReadNotification,
		private readonly unreadNotification: UnreadNotification,
		private readonly cancelNotification: CancelNotification,
	) {}

	@Post('/notifications')
	@HttpCode(201)
	async send(
		@Body() { recipientId, category, content }: CreateNotificationBody,
	) {
		const { notification } = await this.sendNotification.execute({
			recipientId,
			category,
			content,
		})

		return { notification: NotificationViewModel.toHTTP(notification) }
	}

	@Get('/recipients/:recipientId/notifications')
	async listFromRecipient(
		@Param('recipientId', ParseUUIDPipe) recipientId: string,
	) {
		const { notifications } = await this.listRecipientNotifications.execute({
			recipientId,
		})

		return { notifications: notifications.map(NotificationViewModel.toHTTP) }
	}

	@Get('/recipients/:recipientId/notifications/count')
	async countFromRecipient(
		@Param('recipientId', ParseUUIDPipe) recipientId: string,
	) {
		const { count } = await this.countRecipientNotifications.execute({
			recipientId,
		})

		return { count }
	}

	@Patch('/notifications/:notificationId/read')
	@HttpCode(204)
	async read(@Param('notificationId', ParseUUIDPipe) notificationId: string) {
		await this.readNotification.execute({ notificationId })
	}

	@Patch('/notifications/:notificationId/unread')
	@HttpCode(204)
	async unread(@Param('notificationId', ParseUUIDPipe) notificationId: string) {
		await this.unreadNotification.execute({ notificationId })
	}

	@Patch('/notifications/:notificationId/cancel')
	@HttpCode(204)
	async cancel(@Param('notificationId', ParseUUIDPipe) notificationId: string) {
		await this.cancelNotification.execute({ notificationId })
	}
}
