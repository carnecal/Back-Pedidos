import mongoose from "mongoose";

export const ProductoSchema = new mongoose.Schema({
    Nombre: String,
    Codigo: String

})

export interface IProducto extends mongoose.Document{
    Nombre: string;
    Codigo: String
}