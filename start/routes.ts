import { authRoutes } from '#routes/api/v1/auth'
import { channelRoutes } from '#routes/api/v1/channel'
import { channelCategoriesRoutes } from '#routes/api/v1/channel_categories'
import { channelTypesRoutes } from '#routes/api/v1/channel_types'
import { channelingEquipmentsRoutes } from '#routes/api/v1/channeling_equipments'
import { completedWorksRoutes } from '#routes/api/v1/completed_works'
import { dashboardRoutes } from '#routes/api/v1/dashboard'
import { districtsRoutes } from '#routes/api/v1/districts'
import { filesRoutes } from '#routes/api/v1/files'
import { gsmOperatorsRoutes } from '#routes/api/v1/gsm_operators'
import { headControllersRoutes } from '#routes/api/v1/head_controllers'
import { objectTypesRoutes } from '#routes/api/v1/object_types'
import { substationsRoutes } from '#routes/api/v1/substations'
import { typesKpRoutes } from '#routes/api/v1/types_kp'
import { typesWork } from '#routes/api/v1/types_work'
import { usersRoutes } from '#routes/api/v1/users'
import { voltageClassesRoutes } from '#routes/api/v1/voltage_classes'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

authRoutes.prefix('/api/v1.0/')
filesRoutes.prefix('/api/v1.0/')
usersRoutes.prefix('/api/v1.0/')
districtsRoutes.prefix('/api/v1.0/')
voltageClassesRoutes.prefix('/api/v1.0/')
typesKpRoutes.prefix('/api/v1.0/')
headControllersRoutes.prefix('/api/v1.0/')
channelTypesRoutes.prefix('/api/v1.0/')
gsmOperatorsRoutes.prefix('/api/v1.0/')
completedWorksRoutes.prefix('/api/v1.0/')
substationsRoutes.prefix('/api/v1.0/')
dashboardRoutes.prefix('/api/v1.0/')
channelCategoriesRoutes.prefix('/api/v1.0/')
channelRoutes.prefix('/api/v1.0/')
channelingEquipmentsRoutes.prefix('/api/v1.0/')
typesWork.prefix('/api/v1.0/')
objectTypesRoutes.prefix('/api/v1.0/')
