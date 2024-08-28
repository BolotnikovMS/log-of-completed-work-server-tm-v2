import File from '#models/file'
import { fileValidator } from '#validators/file'
import { cuid } from '@adonisjs/core/helpers'
import { Request } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { unlink } from 'node:fs/promises'
import path from 'node:path'

export default class FilesServices {
  static async uploadFile(req: Request, userId: number | undefined): Promise<string> {
    const validateData = await req.validateUsing(fileValidator)

    validateData?.file.forEach(async (fileItem) => {
      const newFileName = `${cuid()}.${fileItem.extname}`

      await File.create({
        userId: userId,
        substationId: validateData.substationId,
        filePath: `/uploads/files/${validateData.typeFile}/${newFileName}`,
        clientName: fileItem.clientName,
        typeFile: validateData.typeFile,
        extname: fileItem.extname,
        size: +(fileItem.size / 1024).toFixed(3),
      })

      await fileItem.move(app.publicPath(`uploads/files/${validateData.typeFile}`), {
        name: newFileName,
        overwrite: true,
      })
    })

    // if (validateData.file) {
    //   const currentFile = validateData.file
    //   const newFileName = `${new Date().getTime()}${randomStr()}.${currentFile.extname}`
    //   await File.create({
    //     userId: userId || 1,
    //     substationId: 1,
    //     filePath: `/uploads/files/${validateData.typeFile}/${newFileName}`,
    //     clientName: currentFile.clientName,
    //     typeFile: validateData.typeFile,
    //     extname: currentFile.extname,
    //     size: +(currentFile.size / 1024).toFixed(3),
    //   })

    //   await currentFile.move(`tmp/uploads/files/${validateData.typeFile}`, {
    //     name: newFileName,
    //     overwrite: true,
    //   })
    // }

    return 'File uploaded!'
  }
  static async removeFile(id: number): Promise<string> {
    const file = await File.findOrFail(id)
    const filePath = path.join(app.publicPath(), file.filePath)

    try {
      // await unlink(`public${file.filePath}`)
      await unlink(filePath)
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }

    await file.delete()

    return 'File deleted!'
  }
}
