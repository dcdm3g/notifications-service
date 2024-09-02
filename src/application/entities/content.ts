export class Content {
	private readonly content: string

	get value() {
		return this.content
	}

	constructor(content: string) {
		if (content.length < 5 || content.length > 240) {
			throw new Error('Content length error')
		}

		this.content = content
	}
}
