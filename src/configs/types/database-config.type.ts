export type DatabaseConfig = {
    url?: string
    type?: string
    host?: string
    port?: number
    name?: string
    username?: string
    password?: string
    synchronize?: boolean
    maxConnections?: number
    sslEnabled?: boolean
    rejectUnauthorized?: boolean
    ca?: string
    key?: string
    cert?: string
}
