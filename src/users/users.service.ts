import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async findByID(id: number) {
        const user = await this.findOne(id)

        return user
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({ id })

        if (!user) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`)
        }

        return user
    }

    async createUser(user: CreateUserDTO) {
        try {
            const newUser = this.userRepository.create({
                email: user.email,
                password: user.password,
            });
            return await this.userRepository.save(newUser)

        }catch{
            throw new BadRequestException("Error al crear el usuario")
        }
        
    }

    async deleteUser(id: number) {
        const user = await this.findOne(id)

        if (!user){
            throw new NotFoundException(`Usuario con ID: ${id} no existe`)
        }
        this.userRepository.delete(user.id)
    }

    async updateUser(id: number, updateUserdto: UpdateUserDTO) {
        const user = await this.findOne(id);

        if(!user){
            throw new NotFoundException(`Usuario con ID: ${id} no existe`);
        }

        const updateUser = this.userRepository.merge(user, updateUserdto);

        this.userRepository.save(updateUser);

        return updateUser
    }
}
