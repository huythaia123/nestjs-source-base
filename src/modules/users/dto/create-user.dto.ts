import { IsString } from 'class-validator'

export class CreateUserDto {
    @IsString()
    firstName: string

    @IsString()
    lastName: string

    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => CreateCommentDto)
    // comments: CreateCommentDto[]
}

// export class CreateCommentDto {
//     @IsString()
//     content: string
// }
