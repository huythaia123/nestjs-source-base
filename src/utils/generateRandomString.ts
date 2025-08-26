export type GenerateRandomStringOptions = {
    // min?: number
    // max?: number
    prefix?: string
}

export function generateRandomString(
    length: number,
    opts: GenerateRandomStringOptions = { prefix: '' },
) {
    // if (opts.max && length > opts.max) {
    //     throw new Error('')
    // } else if (opts.min && length < opts.min) {
    //     throw new Error('')
    // }

    if (opts.prefix && length < opts.prefix?.length) {
        throw new Error(
            `string length {${length}} is less than prefix length {${opts.prefix.length}}`,
        )
    }
    length -= opts.prefix?.length ?? 0

    const digits = '0123456789'
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const allChars = digits + upper + lower
    const strArr: string[] = []

    for (let i = 0; i < length; i++) {
        strArr.push(allChars[Math.floor(Math.random() * allChars.length)])
    }

    // Trộn ngẫu nhiên mảng ký tự
    for (let i = strArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[strArr[i], strArr[j]] = [strArr[j], strArr[i]]
    }

    return opts.prefix?.toString() + strArr.join('')
}
