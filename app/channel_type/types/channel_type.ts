import type { createChannelTypeValidator, updateChannelTypeValidator } from '#channel_type/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateChannelType = Infer<typeof createChannelTypeValidator> & { userId: number }

export type UpdateChannelType = Infer<typeof updateChannelTypeValidator>
