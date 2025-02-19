import { randomUUID } from 'node:crypto'
import { Content } from '@application/entities/content'
import { SetOptional } from 'type-fest'

export interface NotificationProps {
	recipientId: string
	category: string
	content: Content
	createdAt: Date
	readAt: Date | null
	canceledAt: Date | null
}

export class Notification {
	private _id: string
	private props: NotificationProps

	constructor(
		props: SetOptional<
			NotificationProps,
			'createdAt' | 'readAt' | 'canceledAt'
		>,
		id?: string,
	) {
		this._id = id ?? randomUUID()

		this.props = {
			createdAt: new Date(),
			readAt: null,
			canceledAt: null,
			...props,
		}
	}

	public get id() {
		return this._id
	}

	public get recipientId(): string {
		return this.props.recipientId
	}

	public set recipientId(recipientId: string) {
		this.props.recipientId = recipientId
	}

	public get category(): string {
		return this.props.category
	}

	public set category(category: string) {
		this.props.category = category
	}

	public get content(): Content {
		return this.props.content
	}

	public set content(content: Content) {
		this.props.content = content
	}

	public get createdAt(): Date {
		return this.props.createdAt
	}

	public set createdAt(createdAt: Date) {
		this.props.createdAt = createdAt
	}

	public get readAt(): Date | null | undefined {
		return this.props.readAt
	}

	public read() {
		this.props.readAt = new Date()
	}

	public unread() {
		this.props.readAt = null
	}

	public get canceledAt(): Date {
		return this.props.canceledAt
	}

	public cancel() {
		this.props.canceledAt = new Date()
	}
}
