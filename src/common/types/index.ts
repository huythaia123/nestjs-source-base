import { JwtPayload as _JwtPayload } from 'jsonwebtoken'

export type JwtPayload<O = unknown> = _JwtPayload & O
