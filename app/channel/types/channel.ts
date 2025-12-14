import type { createChannelValidator, updateChannelValidator } from '#channel/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateChannel = Infer<typeof createChannelValidator> & { userId: number }

export type UpdateChannel = Infer<typeof updateChannelValidator>
