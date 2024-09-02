import { Content } from '@application/entities/content'
import {
	Notification,
	NotificationProps,
} from '@application/entities/notification'

export function makeNotification(override?: Partial<NotificationProps>) {
	return new Notification({
		recipientId: 'example-recipient-id',
		category: 'social',
		content: new Content('You received a friend invitation'),
		...override,
	})
}
