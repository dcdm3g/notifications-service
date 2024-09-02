import { ReadNotification } from '@application/use-cases/read-notification'
import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/notifications-repository'

describe('ReadNotification (use-case)', () => {
	it('should be able to read a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const cancelNotification = new ReadNotification(notificationsRepository)

		const notification = makeNotification()

		await notificationsRepository.create(notification)
		await cancelNotification.execute({ notificationId: notification.id })

		expect(notificationsRepository.notifications).toEqual([
			expect.objectContaining({ readAt: expect.any(Date) }),
		])
	})

	it('should not be able to read a non-existent notification', () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const cancelNotification = new ReadNotification(notificationsRepository)

		expect(
			async () =>
				await cancelNotification.execute({
					notificationId: '12345678-1234-1234-1234-12345678abc',
				}),
		).rejects.toThrow()
	})
})
