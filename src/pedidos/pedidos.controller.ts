import { Controller, Get, Param } from '@nestjs/common';

interface Pedido {
    id: number;
    metodoPago: MetodosPago;
    productos: string[];
}

enum MetodosPago {
    TarjetaCredito = 'Tarjeta de crédito',
    CREDITO = 'credito',
    EFECTIVO = 'efectivo'
}

@Controller('pedidos')
export class PedidosController {
    private pedidos: Pedido[] = [
        {
            id: 1,
            metodoPago: MetodosPago.TarjetaCredito,
            productos: ['Producto 1', 'Producto 2']
        },
        {
            id: 2,
            metodoPago: MetodosPago.CREDITO,
            productos: ['Producto 3', 'Producto 4']
        },
        {
            id: 3,
            metodoPago: MetodosPago.EFECTIVO,
            productos: ['Producto 5', 'Producto 6']
        }
    ];

    @Get()
    GetAllPedidos(): Pedido[] {
        return this.pedidos;
    }

    @Get('metodoPago/tarjeta-credito')
    GetPedidosPorTarjetaCredito() {
        return this.pedidos.filter(pedido => pedido.metodoPago === MetodosPago.TarjetaCredito);
    }

    @Get('metodoPago/credito')
    GetPedidosPorCredito() {
        return this.pedidos.filter(pedido => pedido.metodoPago === MetodosPago.CREDITO);
    }

    @Get('metodoPago/efectivo')
    GetPedidosPorEfectivo() {
        return this.pedidos.filter(pedido => pedido.metodoPago === MetodosPago.EFECTIVO);
    }

    @Get(':id')
    GetPedidoById(@Param('id') id: number) {
        const data = this.pedidos.find(pedido => pedido.id === Number(id));
        return data;
    }


}
