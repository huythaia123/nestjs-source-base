import { existsSync, mkdirSync, writeFileSync } from 'fs'

export const uploadFileBasePath = '/public'
export const imagesBasePath = `${uploadFileBasePath}/images`
export const pdfsBasePath = `${uploadFileBasePath}/pdfs`

export function ensureUploadDir(pathName: string) {
    if (!existsSync(pathName)) {
        const data = ['*', '!.gitignore']
        mkdirSync(pathName, { recursive: true })
        writeFileSync(pathName + '/.gitignore', data.join('\n'))
    }
}
