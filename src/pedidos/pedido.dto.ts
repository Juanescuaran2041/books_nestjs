import {IsNotEmpty, IsString } from "class-validator";
export class CreatePedidoDTO {

    @IsNotEmpty()
    metodoPago: string

}