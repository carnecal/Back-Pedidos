import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IPedido } from './pedido.Model';
import { PedidoDto } from './dto/Pedido.dto';
import path from 'path';

@Injectable()
export class PedidoService {

    constructor (@InjectModel('Pedido') private pedidoModel: Model<IPedido>){}

    /** Crear Pedido */

    async Create (pedidoDto: PedidoDto): Promise<IPedido> {
        try {
            const nuevoPedido = new this.pedidoModel(pedidoDto);
            // Verificar si hay ítems en el pedido antes de guardar
            if (pedidoDto.Items && pedidoDto.Items.length > 0) {
                // Agregar ítems al pedido antes de guardarlo
                nuevoPedido.Items = pedidoDto.Items.map(item => ({
                    Producto: item.Producto,
                    Cantidad: item.Cantidad,
                    Peso: item.Peso,
                    Observaciones: item.Observaciones,
                    _id: new mongoose.Types.ObjectId(), 
                }));
            }
            return await nuevoPedido.save();
        } catch (error) {
            // Manejo de errores
            throw error; // o manejo específico de errores
        }
    }

/**Actualizar con los items */
async Update(pedidoId: string, pedidoDto: PedidoDto): Promise<IPedido> {
    try {
      // Buscar el pedido existente por su ID
      const pedidoExistente = await this.pedidoModel.findById(pedidoId);
      // Si no se encontró el pedido, lanzar un error
      if (!pedidoExistente) {
        throw new NotFoundException(`Pedido con ID ${pedidoId} no encontrado`);
      }
      // Actualizar los campos del pedido existente con los nuevos valores
      pedidoExistente.set(pedidoDto);
      // Verificar si hay ítems en el pedido antes de actualizar
      if (pedidoDto.Items && pedidoDto.Items.length > 0) {
        // Actualizar los ítems del pedido
        pedidoExistente.Items = pedidoDto.Items.map((item, index) => {
          const itemExistente = pedidoExistente.Items[index];
          if (itemExistente) {
            // Actualizar el item existente
            itemExistente.Producto = item.Producto || itemExistente.Producto;
            itemExistente.Cantidad = item.Cantidad || itemExistente.Cantidad;
            itemExistente.Peso = item.Peso || itemExistente.Peso;
            itemExistente.Observaciones = item.Observaciones || itemExistente.Observaciones;
            return itemExistente;
          } else {
            // Crear un nuevo item
            return {
              Producto: item.Producto,
              Cantidad: item.Cantidad,
              Peso: item.Peso,
              Observaciones: item.Observaciones,
              _id: new mongoose.Types.ObjectId(), // Generar un nuevo ID para el nuevo item
            };
          }
        });
      }
      // Guardar los cambios en el pedido existente
      const pedidoActualizado = await pedidoExistente.save();
      return pedidoActualizado;
    } catch (error) {
      // Manejo de errores
      throw error; // o manejo específico de errores
    }
  }

     /** Actualizar Pedido */
     async Actualizar(id:string, pedidoDto: PedidoDto): Promise <IPedido>{
        try {
            return await this.pedidoModel. findByIdAndUpdate(id, pedidoDto)
        } catch (Exception) {
            return null;
        }
    }

    /** Consultar Pedido */
    async Consultar(): Promise<IPedido[]>{
        try {
            return await this.pedidoModel.find().exec()
            
        } catch (Exception) {
            return null;
        }
    }

    /**Consultar con todos los datos */
    async ConsultarTodo(): Promise<IPedido[]>{
        try {
            return await this.pedidoModel.find().populate({path:'Cliente',model:'Cliente'})
            .populate({path:'Items.Producto',model:'Producto'})
            .populate({path:'Recibio',model:'Empleado'})
            .populate({path:'Despacho',model:'Empleado'})
            .exec()
            
        } catch (Exception) {
            return null;
        }
    }

    /**Consultar pedido x id*/
    async ConsultarxId(id:string): Promise<IPedido>{
        try {
            const pedido= await this.pedidoModel.findById(id).populate({path:'Cliente',model:'Cliente'})
            .populate({path:'Producto', model:'Producto' }).populate({path:'Recibio', model:'Empleado'}).exec()
            return pedido
        } catch (Exception) {
            return null
        }
    }

    /** Actualizar Estado Pedido */
    async ActualizarEstado(id:string, pedidoDto):Promise<IPedido>{
        try {
            return await this.pedidoModel.findByIdAndUpdate(id, pedidoDto)
        } catch (Exception) {
            return null
            
        }
    }

}
