import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get,  } from 'http';

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
            name: 'Maria',
            email: 'maria@ejemplo.com'
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
    getUserById(@Param('id') id: number){
        const data = this.users.find(user => user.id === Number(id));

        if (!data) {
            return {
                message: "Usuario no encontrado"
            }
        }

        return data;
    }

    @Get('name/:name')
    getEmailByName (@Param('name') name: string){
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
    createUser(@Body() user:User  ){
        this.users.push(user)
        console.log(Body)
        return{
            msg: "Usuario creado"
        }
    }

    @Delete(':id')

    deleteUser(@Param('id') id:String){
        const position = this.users.findIndex((user) => user.id)     
        this.users.splice(position, 1)
        return {
            msg: "Usuario eliminado correctamente"
        }
    }

}

