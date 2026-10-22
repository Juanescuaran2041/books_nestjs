import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { IUser } from './users.model';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    
    constructor(private userService:UsersService){}


    @Get()
    getAllUsers(){
        return this.userService.findAll()
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findByID(id)
    }

    @Post()
    createUser(@Body() userPayload: CreateUserDTO) {
        return this.userService.createUser(userPayload)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
    }

    @Put(':id')
    updatUser(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateUserDTO) {
        return this.userService.updateUser(id, changes)
    }
}

