import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PedidosModule],
})
export class AppModule {}
