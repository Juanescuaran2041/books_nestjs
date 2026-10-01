import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: "1",
            name: 'Juanes',
            email: 'juan@ejemplo.com',
            isActive: true
        },
        {
            id: "2",
            name: 'pancracia',
            email: 'pancracia@ejemplo.com',
            isActive: false
        },
        {
            id: "3",
            name: 'Pedro',
            email: 'pedro@ejemplo.com',
            isActive: true
        }
    ];

    findAll(): User[] {
        return this.users.filter((user) => user.isActive === true)
    }

    findByID(id: string): User {
        const data = this.users.find((user) => user.id === id)
        
        if (data === undefined || data === null){
            throw new NotFoundException(`Usuario con id ${id} no encontrado`)
        }

        return data
    }


    findEmailByName(name: string): any {
        const data = this.users.find((user) => user.name.toLowerCase() === name.toLowerCase())
        if (data === undefined || data === null) {
            throw new NotFoundException(`Usuario con nombre ${name} no encontrado`)
        }

        return {
            "email": data.email
        }
    }


    createUser(user: CreateUserDTO): User {
        const newUser = {
            id: `${new Date().getTime()}`,
            ...user,
            isActive: true 
        }

        this.users.push(newUser)
        return newUser
    }

    deleteUser(id:string): any {
        const position = this.users.findIndex((user) => user.id === String(id));

        if (position === -1){
            throw new NotFoundException(`Error no se ha podido eliminar el usuario con id ${id}`)
        }

        this.users.splice(position, 1)

        return {
            msg: "Usuario eliminado correctamente"
        }
    }
}
