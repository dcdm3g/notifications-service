import { Content } from '@application/entities/content'
import { Notification } from '@application/entities/notification'

describe('notification', () => {
	it('should be able to create a notification', () => {
		const notification = new Notification({
			recipientId: '1BXU4E',
			category: 'social',
			content: new Content('You received a friend invitation'),
		})

		expect(notification).toBeTruthy()
	})
})
