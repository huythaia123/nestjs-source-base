import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'create new user' })
    @ApiBody({ type: CreateUserDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get()
    @ApiOperation({ summary: 'get all user' })
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'get user by id' })
    @ApiParam({ name: 'id', type: String, description: 'user id' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'update user by id' })
    @ApiParam({ name: 'id', type: String, description: 'user id' })
    @ApiBody({ type: CreateUserDto })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete user by id' })
    @ApiParam({ name: 'id', type: String, description: 'user id' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }
}
