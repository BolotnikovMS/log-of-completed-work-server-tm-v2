/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const DistrictsController = () => import('#controllers/districts_controller')

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [DistrictsController, 'index'])
        router.post('/', [DistrictsController, 'store'])
        router.patch('/:id', [DistrictsController, 'update'])
        router.delete('/:id', [DistrictsController, 'destroy'])
      })
      .prefix('/districts')
  })
  .prefix('/api/v1.0/')
