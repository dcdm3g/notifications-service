import { ListRecipientNotifications } from '@application/use-cases/list-recipient-notifications'
import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/notifications-repository'

describe('ListRecipientNotifications (use-case)', () => {
	it('should be able to list recipient notifications', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const listRecipientNotifications = new ListRecipientNotifications(
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

		const { notifications } = await listRecipientNotifications.execute({
			recipientId: 'recipient-1',
		})

		expect(notifications).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ recipientId: 'recipient-1' }),
				expect.objectContaining({ recipientId: 'recipient-1' }),
			]),
		)
	})
})
