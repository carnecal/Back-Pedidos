import { Controller, Post, Body, HttpException, HttpStatus, Param, Get } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDto } from './dto/Cliente.dto';

@Controller('cliente')
export class ClienteController {
    constructor( private _clienteService: ClienteService){}

    /** Metodos o Verbos */
    @Post()
    async crear(@Body() clienteDto: ClienteDto){
        const result= await this._clienteService.Create(clienteDto)
        return {ok:true, result}
    }

    /** Consultar por nombre */
    @Get('/:nombre')
    async ConsultarCliente(@Param('nombre') nombre:string){ 
        const name= nombre.toUpperCase()
        console.log(name)
        const result= await this._clienteService.ConsultaxNombre(name)
        if (result==null){
            throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
          }
          return result;
    }

    /** Consultar por codigo */
    @Get('cod/:codigo')
    async ConsultarClientexCodigo(@Param('codigo') codigo:string){
        const result= await this._clienteService.ConsultarxCodigo(codigo)
        if (result==null){
            throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
          }
          return result;
    }

    /** Consulta general */
    @Get()
    async ConsultarClientes(){
        const result= await this._clienteService.Consultar()
        if (result==null){
            throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
          }
          return result;
    }

    @Get('client/:id')
    async ConsultarClientesxId(@Param('id') id:string){
        const result= await this._clienteService.ConsultaxId(id)
        if (result==null){
            throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
          }
          return result;
    }

}