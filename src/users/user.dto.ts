import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDTO{
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

} 

export class UpdateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 8)
    nickname ?: string
}