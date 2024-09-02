import { UnreadNotification } from '@application/use-cases/unread-notification'
import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/notifications-repository'

describe('ReadNotification (use-case)', () => {
	it('should be able to unread a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const cancelNotification = new UnreadNotification(notificationsRepository)

		const notification = makeNotification({ readAt: new Date() })

		await notificationsRepository.create(notification)
		await cancelNotification.execute({ notificationId: notification.id })

		expect(notificationsRepository.notifications).toEqual([
			expect.objectContaining({ readAt: null }),
		])
	})

	it('should not be able to unread a non-existent notification', () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const cancelNotification = new UnreadNotification(notificationsRepository)

		expect(
			async () =>
				await cancelNotification.execute({
					notificationId: '12345678-1234-1234-1234-12345678abc',
				}),
		).rejects.toThrow()
	})
})
