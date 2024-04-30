import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoSchema } from './pedido.Model';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidoController } from './pedido.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Pedido', schema: PedidoSchema}])],
  controllers: [PedidoController],
  providers: [PedidoService]
})
export class PedidoModule {}
