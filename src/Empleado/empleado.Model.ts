import mongoose  from "mongoose";

export const EmpleadoSchema = new mongoose.Schema({
    Nombre: String,
    Cedula: String
})

export interface IEmpleado extends mongoose.Document{
    Nombre: string,
    Cedula: string
}