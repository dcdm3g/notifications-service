import { CancelNotification } from '@application/use-cases/cancel-notification'
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications'
import { ListRecipientNotifications } from '@application/use-cases/list-recipient-notifications'
import { ReadNotification } from '@application/use-cases/read-notification'
import { SendNotification } from '@application/use-cases/send-notification'
import { UnreadNotification } from '@application/use-cases/unread-notification'
import { DatabaseModule } from '@infra/database/database.module'
import { NotificationsController } from '@infra/http/controllers/notifications.controller'
import { Module } from '@nestjs/common'

@Module({
	imports: [DatabaseModule],
	controllers: [NotificationsController],
	providers: [
		SendNotification,
		ListRecipientNotifications,
		CountRecipientNotifications,
		ReadNotification,
		UnreadNotification,
		CancelNotification,
	],
})
export class HTTPModule {}
