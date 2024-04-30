import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductoSchema } from './producto.Model';
import { ProductoController } from './producto.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Producto', schema: ProductoSchema}])],
  controllers: [ProductoController],
  providers: [ProductoService]
})
export class ProductoModule {}
