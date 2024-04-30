import { Injectable } from '@nestjs/common';
import { ClienteModule } from './cliente.module';
import { ICliente } from './cliente.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClienteDto } from './dto/Cliente.dto';

@Injectable()
export class ClienteService {
    constructor (@InjectModel("Cliente") private  clienteModel: Model<ICliente>){}
/** 

    //CRUD

    /** Crear Cliente */
    async Create (clienteDto: ClienteDto): Promise <ICliente>{
        clienteDto.Nombre=clienteDto.Nombre.toUpperCase()
        const crear= new this.clienteModel(clienteDto)
        return await crear.save()
    }

    /** Actualizar Cliente */
    async Actualizar(id:string, clienteDto: ClienteDto): Promise <ICliente>{
        try {
            
            return await this.clienteModel. findByIdAndUpdate(id, clienteDto)
        } catch (Exception) {
            return null;
        }
    }

    /** Consultar Clientes */
    async Consultar(): Promise<ICliente[]>{
        try {
            return await this.clienteModel.find().exec()
            
        } catch (Exception) {
            return null;
        }
    }

    /** Consultar Clientes x Nombre */
    async ConsultaxNombre(nombre: string) : Promise <ICliente>{
        try {
            let client= this.clienteModel.findOne({Nombre: nombre}).exec();
            return client
        } catch (Exception) {
            return null
        }
    }

    /** Consultar Cliente por codigo */
    async ConsultarxCodigo (codigo: string): Promise<ICliente>{
        try {
            let cliente= this.clienteModel.findOne({Codigo: codigo}).exec();
            return cliente
            
        } catch (Exception) {
            return null
        }
    }

    async ConsultaxId(id: string) : Promise <ICliente>{
        try {
            let client= this.clienteModel.findById(id).exec();
            return client
        } catch (Exception) {
            return null
        }
    }

}
