import type { createChannelCategoryValidator, updateChannelCategoryValidator } from '#channel_category/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateChannelCategory = Infer<typeof createChannelCategoryValidator> & { userId: number }

export type UpdateChannelCategory = Infer<typeof updateChannelCategoryValidator>
