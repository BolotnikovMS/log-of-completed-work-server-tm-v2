import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

const FilesController = () => import("#controllers/files_controller")

export const filesRoutes = router
  .group(() => {
    router.post('/upload', [FilesController, 'upload'])
    router.get('/download/:id', [FilesController, 'download'])
    router.delete('/:id', [FilesController, 'destroy'])
  })
  .prefix('/files')
  .use([middleware.auth()])
