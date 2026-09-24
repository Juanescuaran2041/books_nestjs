import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Put, UnprocessableEntityException } from '@nestjs/common';
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
            throw new NotFoundException(`usuario con id ${id} no encontrado`)
        }

        //simulacion para error de permisos
        if (data.id === 1){
            throw new ForbiddenException(`No tienes permiso para acceder al usuario con id ${data.id}`)
        }

        return data;
    }



    @Get('name/:name')
    getEmailByName(@Param('name') name: string) {
        const data = this.users.find((user) => user.name.toLowerCase() === name.toLowerCase());
        if (data === undefined || data === null) {
            throw new NotFoundException(`Usuario con nombre ${name} no encontrado`)
        }
        return {
            email: data.email
        }
    }

    @Post()
    createUser(@Body() user: User) {
        

        //valide que el nombre y el email no esten vacios

        if(user.email.trim() === "" || user.name.trim() === ""){
            throw new BadRequestException(`Se deben registrar todos los campos para crear el usuario`)
        }

        //validar que el correo tenga el formato correcto
        if(!user.email.includes("@")){
            throw new UnprocessableEntityException(`Email ${user.email} no es valido`)
        }


        
        this.users.push(user)
        console.log(Body)
        return {
            msg: "Usuario creado",
            data: user
        }
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const position = this.users.findIndex((user) => user.id === Number(id))

        if (position === -1) {
            throw new NotFoundException(`Error no se ha podido eliminar el usuario con id ${id}`)
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
            throw new NotFoundException(`Error no se ha encontrados el usuario con id ${id}`)
            
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

