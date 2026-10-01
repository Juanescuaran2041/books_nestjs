import { BadRequestException, Injectable } from '@nestjs/common';
import { MetodosPago, Pedido } from './pedido.model';

@Injectable()
export class PedidosService {
    private pedidos: Pedido[] = [
        {
            id: "1",
            metodoPago: MetodosPago.TarjetaCredito,
            productos: ['Producto 1', 'Producto 2']
        },
        {
            id: "2",
            metodoPago: MetodosPago.CREDITO,
            productos: ['Producto 3', 'Producto 4']
        },
        {
            id: "3",
            metodoPago: MetodosPago.EFECTIVO,
            productos: ['Producto 5', 'Producto 6']
        }
    ];

    findAll (): Pedido[]{
        return this.pedidos
    }

    findByPayMethod (metodoPago: MetodosPago): Pedido[]{
        
        let data = null; 
        
        if (metodoPago === MetodosPago.TarjetaCredito){
            data = this.pedidos.filter(pedido => pedido.metodoPago === MetodosPago.TarjetaCredito);
        }else if (metodoPago === MetodosPago.CREDITO){
            data = this.pedidos.filter(pedido => pedido.metodoPago === MetodosPago.CREDITO);
        }else if (metodoPago === MetodosPago.EFECTIVO){
            data = this.pedidos.filter(pedido => pedido.metodoPago === MetodosPago.EFECTIVO)
        }else{
            throw new BadRequestException(`El metodo de pago ${metodoPago} no es valido`)
        }

        return data
        
    }
}
