import { urlParamIdValidator } from "#validators/url_params_id"
import { Infer } from "@vinejs/vine/types"

export type TUrlParamId = Infer<typeof urlParamIdValidator>
