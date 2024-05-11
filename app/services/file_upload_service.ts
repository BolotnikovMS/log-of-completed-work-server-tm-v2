import { randomStr } from '#helpers/random_str'
import File from '#models/file'
import { fileValidator } from '#validators/file'
import { Request } from '@adonisjs/core/http'
import { unlink } from 'node:fs/promises'

export default class FilesServices {
  static async uploadFile(req: Request, userId: number | undefined): Promise<string> {
    const validateData = await req.validateUsing(fileValidator)

    validateData?.file.forEach(async (fileItem) => {
      const fileName = `${new Date().getTime()}${randomStr()}.${fileItem.extname}`

      await File.create({
        userId: userId || 1,
        substationId: 1,
        filePath: `/uploads/files/${validateData.typeFile}/${fileName}`,
        typeFile: validateData.typeFile,
        extname: fileItem.extname,
        size: +(fileItem.size / 1024).toFixed(3),
      })

      await fileItem.move(`tmp/uploads/files/${validateData.typeFile}`, {
        name: fileName,
        overwrite: true,
      })
    })

    return 'File uploaded!'
  }
  static async removeFile(id: number): Promise<string> {
    const file = await File.findOrFail(id)

    try {
      await unlink(`./tmp${file.filePath}`)
    } catch (err) {
      console.log(err)
    }

    await file.delete()

    return 'File deleted!'
  }
}