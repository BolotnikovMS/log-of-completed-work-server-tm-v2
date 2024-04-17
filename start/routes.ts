/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const DistrictsController = () => import('#controllers/districts_controller')
const SubstationsController = () => import('#controllers/substations_controller')
const ChannelTypesController = () => import('#controllers/channel_types_controller')
const CompletedWorksController = () => import('#controllers/completed_works_controller')
const GsmOperatorsController = () => import('#controllers/gsm_operators_controller')
const HeadsController = () => import('#controllers/heads_controller')
const TypesKpsController = () => import('#controllers/types_kps_controller')
const VoltageClassesController = () => import('#controllers/voltage_classes_controller')

const AuthController = () => import('#controllers/auth_controller')

const UsersController = () => import('#controllers/users_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.group(() => {
      router.post('/login', [AuthController, 'login'])
      router.get('/logout', [AuthController, 'logout'])
      router.get('/profile', [AuthController, 'profile']).use([middleware.auth()])
    })
    router
      .group(() => {
        router.get('/', [UsersController, 'index'])
        router.get('/roles', [UsersController, 'getRoles'])
        router.post('/create-account', [UsersController, 'createUserAccount'])
      })
      .prefix('/users')
      .use([middleware.auth()])
    router
      .group(() => {
        router.get('/', [DistrictsController, 'index'])
        router.post('/', [DistrictsController, 'store'])
        router.get('/:id/substations', [DistrictsController, 'getSubstations'])
        router.patch('/:id', [DistrictsController, 'update'])
        router.delete('/:id', [DistrictsController, 'destroy'])
      })
      .prefix('/districts')
      .use([middleware.auth()])
    router
      .group(() => {
        router.get('/', [VoltageClassesController, 'index'])
        router.post('/', [VoltageClassesController, 'store'])
        router.patch('/:id', [VoltageClassesController, 'update'])
        router.delete('/:id', [VoltageClassesController, 'destroy'])
      })
      .prefix('/voltage-classes')
      .use([middleware.auth()])
    router
      .group(() => {
        router.get('/', [TypesKpsController, 'index'])
        router.post('/', [TypesKpsController, 'store'])
        router.patch('/:id', [TypesKpsController, 'update'])
        router.delete('/:id', [TypesKpsController, 'destroy'])
      })
      .prefix('/types-kp')
      .use([middleware.auth()])
    router
      .group(() => {
        router.get('/', [HeadsController, 'index'])
        router.post('/', [HeadsController, 'store'])
        router.patch('/:id', [HeadsController, 'update'])
        router.delete('/:id', [HeadsController, 'destroy'])
      })
      .prefix('/head-controllers')
      .use([middleware.auth()])
    router
      .group(() => {
        router.get('/', [ChannelTypesController, 'index'])
        router.post('/', [ChannelTypesController, 'store'])
        router.patch('/:id', [ChannelTypesController, 'update'])
        router.delete('/:id', [ChannelTypesController, 'destroy'])
      })
      .prefix('/channel-types')
      .use([middleware.auth()])
    router
      .group(() => {
        router.get('/', [GsmOperatorsController, 'index'])
        router.post('/', [GsmOperatorsController, 'store'])
        router.patch('/:id', [GsmOperatorsController, 'update'])
        router.delete('/:id', [GsmOperatorsController, 'destroy'])
      })
      .prefix('/gsm-operators')
      .use([middleware.auth()])
    router
      .group(() => {
        router.get('/', [SubstationsController, 'index'])
        router.post('/', [SubstationsController, 'store'])
        router.get('/:id', [SubstationsController, 'getSubstation'])
        router.patch('/:id', [SubstationsController, 'update'])
        router.delete('/:id', [SubstationsController, 'destroy'])
      })
      .prefix('/substations')
      .use([middleware.auth()])
    router
      .group(() => {
        router.get('/', [CompletedWorksController, 'index'])
        router.post('/', [CompletedWorksController, 'store'])
        router.patch('/:id', [CompletedWorksController, 'update'])
        router.delete('/:id', [CompletedWorksController, 'destroy'])
      })
      .prefix('/completed-works')
      .use([middleware.auth()])
  })
  .prefix('/api/v1.0/')
