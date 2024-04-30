import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteController } from './cliente.controller';
import { ClienteSchema } from './cliente.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Cliente', schema: ClienteSchema}])],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}
