import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProducto } from './producto.Model';
import { ProductoDto } from './dto/Producto.Dto';

@Injectable()
export class ProductoService {

    constructor (@InjectModel("Producto") private  productoModel: Model<IProducto>){}


        /** Crear Poducto */
    async Create (productoDto: ProductoDto): Promise <IProducto>{
        productoDto.Nombre=productoDto.Nombre.toUpperCase()
        const crear= new this.productoModel(productoDto)
        return await crear.save()
    }

    /** Actualizar Cliente */
    async Actualizar(id:string, productoDto: ProductoDto): Promise <IProducto>{
        try {
            
            return await this.productoModel. findByIdAndUpdate(id, productoDto)
        } catch (Exception) {
            return null;
        }
    }

    /** Consultar Clientes */
    async Consultar(): Promise<IProducto[]>{
        try {
            return await this.productoModel.find().exec()
            
        } catch (Exception) {
            return null;
        }
    }

    /** Consultar Clientes x Nombre */
    async ConsultaxNombre(nombre: string) : Promise <IProducto>{
        try {
            let client= this.productoModel.findOne({Nombre: nombre}).exec();
            return client
        } catch (Exception) {
            return null
        }
    }
}
