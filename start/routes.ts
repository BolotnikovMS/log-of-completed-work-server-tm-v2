import { authRoutes } from '#routes/api/v1/auth'
import { channelTypesRoutes } from '#routes/api/v1/channel_types'
import { completedWorksRoutes } from '#routes/api/v1/completed_works'
import { dashboardRoutes } from '#routes/api/v1/dashboard'
import { districtsRoutes } from '#routes/api/v1/districts'
import { filesRoutes } from '#routes/api/v1/files'
import { gsmOperatorsRoutes } from '#routes/api/v1/gsm_operators'
import { headControllersRoutes } from '#routes/api/v1/head_controllers'
import { substationsRoutes } from '#routes/api/v1/substations'
import { typesKpRoutes } from '#routes/api/v1/types_kp'
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
