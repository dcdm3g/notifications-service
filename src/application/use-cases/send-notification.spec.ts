import { SendNotification } from '@application/use-cases/send-notification'
import { InMemoryNotificationsRepository } from '@test/repositories/notifications-repository'

describe('SendNotification (use-case)', () => {
	it('should be able to send a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const sendNotification = new SendNotification(notificationsRepository)

		const { notification } = await sendNotification.execute({
			recipientId: '1BXU4E',
			category: 'social',
			content: 'You received a friend invitation',
		})

		expect(notificationsRepository.notifications).toEqual([notification])
	})
})
