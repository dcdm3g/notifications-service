import { NotificationsRepository } from '@application/repositories/notifications-repository'

interface CountRecipientNotificationsRequest {
	recipientId: string
}

interface CountRecipientNotificationsResponse {
	count: number
}

export class CountRecipientNotifications {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}

	async execute({
		recipientId,
	}: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
		const count =
			await this.notificationsRepository.countByRecipientId(recipientId)

    return { count }
	}
}
