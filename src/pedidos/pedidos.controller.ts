import {Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import { MetodosPago, Pedido } from './pedido.model';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
    constructor (private pedidoService:PedidosService){}

    @Get()
    GetAllPedidos(): Pedido[] {
        return this.pedidoService.findAll();
    }

    @Get('metodoPago/:metodoPago')
    GetPedidosPorTarjetaCredito(@Param('metodoPago') metodoPago: MetodosPago) {
        return this.pedidoService.findByPayMethod(metodoPago)
    }

    // @Get(':id')
    // GetPedidoById(@Param('id') id: String) {
    //     const data = this.pedidos.find(pedido => pedido.id === String(id));

    //     if (data === undefined || data === null){
    //         throw new NotFoundException (`No se ha encontrado el pedido con id ${id}`)
    //     }

    //     return data;
    // }

    // @Post()
    // createOrder(@Body() pedido:Pedido){
    //     this.pedidos.push(pedido)
    //     console.log(pedido)
    //     return{
    //         msg: "Pedido registrado Correctamente"
    //     }
    // }

    // @Delete(':id')
    // deleteByID(@Param('id', ParseIntPipe) id: String) {
    //     const position = this.pedidos.findIndex((pedido) => pedido.id === id);
    //     if (position === -1) {
    //         throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    //     }
    //     this.pedidos.splice(position, 1);
    //     return { 
    //         msg: 'Pedido eliminado correctamente' 
    //     };
    // }

}
