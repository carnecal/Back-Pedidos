import mongoose from "mongoose"

export const ClienteSchema = new mongoose.Schema({
    Nombre: String,
    Nit: Number,
    Codigo: String

})

export interface ICliente extends mongoose.Document{
    Nombre: string,
    Nit: number,
    Codigo: string
}