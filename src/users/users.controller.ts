import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Put, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    
    constructor(private userService:UsersService){}


    @Get()
    getAllUsers(){
        return this.userService.findAll()
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.userService.findByID(String(id))
    }

    @Get('name/:name')
    getEmailByName(@Param('name') name: string) {
        return this.userService.findEmailByName(String(name))
    }

    @Post()
    createUser(@Body() userPayload: CreateUserDTO) {
        return this.userService.createUser(userPayload)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(String(id))
    }

    // @Put(':id')
    // updatUser(@Param('id') id: number, @Body() changes: UpdateUserDTO) {
    //     console.log('.:: ID usuario: ', id)
    //     console.log('.::Cambios: ', changes)

    //     const position = this.users.findIndex((user) => user.id === String(id));

    //     if (position === -1) {
    //         throw new NotFoundException(`Error no se ha encontrados el usuario con id ${id}`)

    //     }


    //     const currentData = this.users[position];

    //     const updateUser = {
    //         ...currentData,
    //         ...changes
    //     }

    //     this.users[position] = updateUser;

    //     return {
    //         msg: "User Updated",
    //         data: updateUser
    //     }

    // }


}

