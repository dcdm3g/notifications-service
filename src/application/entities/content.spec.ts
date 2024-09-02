import { Content } from '@application/entities/content'

describe('content', () => {
	it('should be able to create a notification content', () => {
		const content = new Content('You received a friend invitation')
		expect(content).toBeTruthy()
	})

	it('should not be able to create a notification content with less than 5 charaters', () => {
		expect(() => new Content('###')).toThrow()
	})

	it('should not be able to create a notification content with more than 240 charaters', () => {
		expect(() => new Content('#'.repeat(241))).toThrow()
	})
})
