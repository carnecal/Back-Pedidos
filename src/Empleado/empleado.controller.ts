import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoDto } from './dto/Empleado.dto';

@Controller('empleado')
export class EmpleadoController {

    constructor( private _empleadoService: EmpleadoService){}


       /** Metodos o Verbos */
       @Post()
       async crear(@Body() empleadoDto: EmpleadoDto){
           const result= await this._empleadoService.Create(empleadoDto)
           return {ok:true, result}
       }
   
       /** Consultar por nombre */
       @Get('/:nombre')
       async ConsultarCliente(@Param('nombre') nombre:string){ 
           const name= nombre.toUpperCase()
           console.log(name)
           const result= await this._empleadoService.ConsultaxNombre(name)
           if (result==null){
               throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
             }
             return result;
       }

       /** Consulta general */
    @Get()
    async ConsultarEmpleado(){
        const result= await this._empleadoService.Consultar()
        if (result==null){
            throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
          }
          return result;
    }

}
