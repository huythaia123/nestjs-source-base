import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(private readonly entityManager: EntityManager) {}

    public async create(createUserDto: CreateUserDto) {
        const user = this.entityManager.create(User, createUserDto)
        return await this.entityManager.save(user)
    }

    public async findAll() {
        return await this.entityManager.find(User)
    }

    public async findOne(id: number) {
        return await this.entityManager.findOne(User, { where: { id } })
    }

    public async findOneByEmail(email: string) {
        return await this.entityManager.findOne(User, { where: { email } })
    }

    public async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.entityManager.findOne(User, { where: { id } })
        if (user) {
            Object.assign(user, { ...updateUserDto })
            return await this.entityManager.save(user)
        }
        throw new NotFoundException('User not found')
    }

    async remove(id: number) {
        const user = await this.entityManager.findOne(User, { where: { id } })
        if (user) return await this.entityManager.remove(user)
        throw new NotFoundException('User not found')
    }
}
