import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications'
import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/notifications-repository'

describe('CountRecipientNotifications (use-case)', () => {
	it('should be able to count recipient notifications', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const countRecipientNotifications = new CountRecipientNotifications(
			notificationsRepository,
		)

		await notificationsRepository.create(
			makeNotification({ recipientId: 'recipient-1' }),
		)

		await notificationsRepository.create(
			makeNotification({ recipientId: 'recipient-1' }),
		)

		await notificationsRepository.create(
			makeNotification({ recipientId: 'recipient-2' }),
		)

		const { count } = await countRecipientNotifications.execute({
			recipientId: 'recipient-1',
		})

		expect(count).toEqual(2)
	})
})
