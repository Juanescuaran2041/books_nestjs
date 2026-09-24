import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

interface User {
    id: number;
    name: string;
    email: string;
}

@Controller('users')
export class UsersController {
    private users: User[] = [
        {
            id: 1,
            name: 'Juanes',
            email: 'juan@ejemplo.com'
        },
        {
            id: 2,
            name: 'pancracia',
            email: 'pancracia@ejemplo.com'
        },
        {
            id: 3,
            name: 'Pedro',
            email: 'pedro@ejemplo.com'
        }
    ];

    @Get()
    getAllUsers(): User[] {
        return this.users;
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        const data = this.users.find(user => user.id === Number(id));

        if (data === undefined) {
            throw new NotFoundException("usuario no encontrado")
        }

        return data;
    }

    @Get('name/:name')
    getEmailByName(@Param('name') name: string) {
        const data = this.users.find((user) => user.name.toLowerCase() === name.toLowerCase());
        if (!data) {
            return {
                message: "name no encontrado"
            }
        }
        return {
            email: data.email
        }
    }

    @Post()
    createUser(@Body() user: User) {
        this.users.push(user)
        console.log(Body)
        return {
            msg: "Usuario creado"
        }
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const position = this.users.findIndex((user) => user.id === Number(id))

        if (position === -1) {
            return {
                msg: "El usuario no existe"
            }
        }

        this.users.splice(position, 1)
        return {
            msg: "Usuario eliminado correctamente"
        }
    }

    @Put(':id')
    updatUser(@Param('id') id: number, @Body() changes: User) {
        console.log('.:: ID usuario: ', id)
        console.log('.::Cambios: ', changes)

        const position = this.users.findIndex((user) => user.id === Number(id));

        if (position === -1) {
            return {
                msg: "El usuario no existe"

            }
            
        }


        const currentData = this.users[position];

        const updateUser = {
            ...currentData, 
            ...changes
        }

        this.users[position] = updateUser;

        return {
            msg: "User Updated",
            data: updateUser
        }

    }


}

