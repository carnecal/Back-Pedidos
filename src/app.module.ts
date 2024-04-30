import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { PedidoModule } from './Pedido/pedido.module';
import { ClienteModule } from './Cliente/cliente.module';
import { ProductoModule } from './Producto/producto.module';
import 'dotenv/config';
import { EmpleadoModule } from './Empleado/empleado.module';

const URL = process.env.MONGODB;


@Module({
  imports: [
    MongooseModule.forRoot(URL),
    PedidoModule, 
    ClienteModule,
    EmpleadoModule,
    ProductoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
