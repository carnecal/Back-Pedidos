import mongoose from "mongoose";
import { Date } from "mongoose";
import { IEmpleado } from "src/Empleado/empleado.Model";
import { ICliente } from "src/cliente/cliente.model";
import { IProducto } from "src/producto/producto.Model";

export class PedidoDto{
    Cliente: ICliente;
    Items:{
      Producto: IProducto;
      Cantidad: number;
      Peso: string;
      Observaciones: String;
      _id?: string | mongoose.Types.ObjectId;
    }[]
    
    Recibio: IEmpleado;
    Despacho: IEmpleado
    Empaco:String;
    
    Hora_Pedido: Date;
    Hora_Despacho: Date;
    
    Estado: boolean
  }
    
