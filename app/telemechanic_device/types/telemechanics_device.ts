import type { createTelemechanicsDeviceValidator, updateTelemechanicsDeviceValidator } from '#telemechanic_device/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateTelemechanicsDevice = Infer<typeof createTelemechanicsDeviceValidator> & { userId: number }

export type UpdateTelemechanicsDevice = Infer<typeof updateTelemechanicsDeviceValidator>
