import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IEmpleado } from './empleado.Model';
import { Model } from 'mongoose';
import { EmpleadoDto } from './dto/Empleado.dto';

@Injectable()
export class EmpleadoService {

    constructor (@InjectModel('Empleado') private empleadoModel: Model<IEmpleado>){}

    /** Crear Empleado */

    async Create (empleadoDto: EmpleadoDto): Promise <IEmpleado>{
        empleadoDto.Nombre=empleadoDto.Nombre.toUpperCase()
        const crear= new this.empleadoModel(empleadoDto)
        return await crear.save()
    }

     /** Actualizar Empleado */
     async Actualizar(id:string, empleadoDto: EmpleadoDto): Promise <IEmpleado>{
        try {
            return await this.empleadoModel. findByIdAndUpdate(id, empleadoDto)
        } catch (Exception) {
            return null;
        }
    }

    /** Consultar Empleado */
    async Consultar(): Promise<IEmpleado[]>{
        try {
            return await this.empleadoModel.find().exec()
            
        } catch (Exception) {
            return null;
        }
    }

     /** Consultar Empleado x Nombre */
     async ConsultaxNombre(nombre: string) : Promise <IEmpleado>{
        try {
            let empleado= this.empleadoModel.findOne({Nombre: nombre}).exec();
            return empleado
        } catch (Exception) {
            return null
        }
    }
}
