export interface Pedido {
    id: String;
    metodoPago: MetodosPago;
    productos: string[];
}

export enum MetodosPago {
    TarjetaCredito = 'Tarjeta_credito',
    CREDITO = 'credito',
    EFECTIVO = 'efectivo'
}