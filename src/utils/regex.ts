// Regex: khớp đúng các image MIME thường gặp (không phân biệt hoa thường)
export const IMAGE_MIME_REGEX = /^image\/(jpeg|pjpeg|png|webp)$/i
// export const IMAGE_MIME_REGEX =
//     /^image\/(avif|heic|heif|jpeg|pjpeg|png|gif|webp|bmp|tiff|svg\+xml|x-icon|vnd\.microsoft\.icon)$/i

// Dùng với string
export function isImageMime(mimetype: string /* buffer: any */) {
    // const fileType = await fileTypeFromBuffer(buffer)
    // console.log(fileType)
    return IMAGE_MIME_REGEX.test(mimetype)
}

// Dùng với File (trên browser)
// export function isImageFile(file: File): boolean {
//     return IMAGE_MIME_REGEX.test(file.type)
// }
