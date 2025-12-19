import { urlParamIdValidator } from '#shared/validators/url_params_id'
import type { Infer } from '@vinejs/vine/types'

export type UrlParamId = Infer<typeof urlParamIdValidator>
