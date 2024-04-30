import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpleadoSchema } from './empleado.Model';
import { EmpleadoController } from './empleado.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Empleado', schema: EmpleadoSchema}])],
  controllers: [EmpleadoController],
  providers: [EmpleadoService]
})
export class EmpleadoModule {}
