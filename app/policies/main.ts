/*
|--------------------------------------------------------------------------
| Bouncer policies
|--------------------------------------------------------------------------
|
| You may define a collection of policies inside this file and pre-register
| them when creating a new bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

export const policies = {
  UserPolicy: () => import('#policies/user_policy'),
  VoltageClassPolicy: () => import('#policies/voltage_class_policy'),
  TypeKpPolicy: () => import('#policies/type_kp_policy'),
  HeadControllerPolicy: () => import('#policies/head_controller_policy'),
  GsmOperatorPolicy: () => import('#policies/gsm_operator_policy'),
  CompletedWorkPolicy: () => import('#policies/completed_work_policy'),
  ChannelTypePolicy: () => import('#policies/channel_type_policy'),
  SubstationPolicy: () => import('#policies/substation_policy'),
  DistrictPolicy: () => import('#policies/district_policy'),
}
