import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/Producto.Dto';

@Controller('producto')
export class ProductoController {

    constructor( private _productoService: ProductoService){}

    /** Metodos o Verbos */
    @Post()
    async crear(@Body()  productoDto:ProductoDto){
        const result= await this._productoService.Create(productoDto)
        return {ok:true, result}
    }

    /** Consultar por nombre */
    @Get('/:nombre')
    async ConsultarCliente(@Param('nombre') nombre:string){ 
        const name= nombre.toUpperCase()
        console.log(name)
        const result= await this._productoService.ConsultaxNombre(name)
        if (result==null){
            throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
          }
          return result;
    }

    /** Consulta general */
    @Get()
    async ConsultarProductos(){
        const result= await this._productoService.Consultar()
        if (result==null){
            throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
          }
          return result;
    }
}
