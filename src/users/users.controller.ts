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

    @Put(':id')
    updatUser(@Param('id') id: String, @Body() changes: UpdateUserDTO) {
        return this.userService.updateUser(String(id), changes)
    }
}

