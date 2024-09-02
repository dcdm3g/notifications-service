import { CancelNotification } from '@application/use-cases/cancel-notification'
import { makeNotification } from '@test/factories/notification-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/notifications-repository'

describe('CancelNotification (use-case)', () => {
	it('should be able to cancel a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const cancelNotification = new CancelNotification(notificationsRepository)

		const notification = makeNotification()

		await notificationsRepository.create(notification)
		await cancelNotification.execute({ notificationId: notification.id })

		expect(notificationsRepository.notifications).toEqual([
			expect.objectContaining({ canceledAt: expect.any(Date) })
		])
	})

	it('should not be able to cancel a non-existent notification', () => {
		const notificationsRepository = new InMemoryNotificationsRepository()
		const cancelNotification = new CancelNotification(notificationsRepository)

		expect(
			async () =>
				await cancelNotification.execute({
					notificationId: '12345678-1234-1234-1234-12345678abc',
				}),
		).rejects.toThrow()
	})
})
