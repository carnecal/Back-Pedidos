import mongoose, { mongo } from "mongoose";
import { IEmpleado } from "src/Empleado/empleado.Model";
import { ICliente } from "src/Cliente/cliente.model";
import { IProducto } from "src/Producto/producto.Model";
import * as moment from "moment-timezone";



export const PedidoSchema = new mongoose.Schema({
    Cliente: {type: mongoose.SchemaTypes.ObjectId, ref:"Cliente"},
    Items: [{
        Producto:  {type: mongoose.SchemaTypes.ObjectId, ref:"Producto"},
        Cantidad: Number,
        Peso: String,
        Observaciones: String,
        _id: String 
        
    }],
    Observaciones_Generales: String,
    Recibio:  {type: mongoose.SchemaTypes.ObjectId, ref:"Empleado"},
    Despacho: {type: mongoose.SchemaTypes.ObjectId, ref:"Empleado"},
    Empaco: String,
    Hora_Pedido: { type: String, default:()=>moment.tz(Date.now(),"America/Bogota").format('YYYY-MM-DD h:mm:ss  A') },
    Hora_Despacho: String,
    Estado: {type: Boolean, default: false}
})

export interface IPedido extends mongoose.Document{
    Cliente: ICliente;
    Items:{
        Producto: IProducto;
        Cantidad: number;
        Peso: String;
        Observaciones: String;
        _id?: string | mongoose.Types.ObjectId;

      }[];
    Observaciones_Generales: String;
    Recibio: IEmpleado;
    Despacho: IEmpleado;
    Empaco:String;
    Hora_Pedido: Date;
    Hora_Despacho: Date;
    Estado: boolean
}