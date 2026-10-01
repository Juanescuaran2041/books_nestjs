import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PedidosController } from './pedidos/pedidos.controller';
import { UsersService } from './users/users.service';
import { PedidosService } from './pedidos/pedidos.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, PedidosController],
  providers: [AppService, UsersService, PedidosService],
})
export class AppModule {}
