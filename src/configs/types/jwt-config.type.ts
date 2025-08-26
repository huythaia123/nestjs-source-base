export type JwtConfig = {
    secret?: string
    privateKey?: string
    publicKey?: string
    algorithm?: string
    keyid?: string
    expiresIn?: string
    notBefore?: string
    audience?: string
    issuer?: string
}
