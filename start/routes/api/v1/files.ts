import FilesController from "#file/controllers/files_controller"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export const filesRoutes = router
  .group(() => {
    router.get('/', [FilesController, 'shortList'])
    router.post('/upload', [FilesController, 'upload'])
    router.get('/download/:id', [FilesController, 'download'])
    router.delete('/:id', [FilesController, 'destroy'])
    router.post('/upload-substation-key', [FilesController, 'uploadCSVFileSubstationKey'])
    router.get('/:id/name', [FilesController, 'getFileName'])
    router.patch('/update-file-name/:id', [FilesController, 'updateFileName'])
  })
  .prefix('/files')
  .use([middleware.auth()])
