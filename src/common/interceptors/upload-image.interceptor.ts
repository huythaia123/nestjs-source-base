import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { randomString } from 'src/utils/randomString'
import { isImageMime } from 'src/utils/regex'
import { rootPath } from 'src/utils/rootPath'
import { ensureUploadDir, imagesBasePath } from 'src/utils/upload-file-utils'

export function UploadImageInterceptor(field: string) {
    return FileInterceptor(field, {
        storage: diskStorage({
            destination: (req, file, callback) => {
                const pathName = rootPath + imagesBasePath
                ensureUploadDir(pathName)
                callback(null, pathName)
            },
            filename: (req, file, callback) => {
                const ext = extname(file.originalname)
                const fileName = randomString(32, { prefix: Date.now().toString() }) + ext
                callback(null, fileName)
            },
        }),
        fileFilter: (req, file, callback) => {
            if (isImageMime(file.mimetype)) callback(null, true)
            else callback(new Error('Invalid image'), false)
        },
    })
}
