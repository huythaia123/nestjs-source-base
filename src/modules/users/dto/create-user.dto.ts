import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
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
