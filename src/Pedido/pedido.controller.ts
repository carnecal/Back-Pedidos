import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoDto } from './dto/Pedido.dto';

@Controller('pedido')
export class PedidoController {

    constructor( private _pedidoService: PedidoService){}


    /** Metodos o Verbos */
    @Post()
    async crear(@Body() pedidoDto: PedidoDto){
        const result= await this._pedidoService.Create(pedidoDto)
        return {ok:true, result}
    }

    @Get()
    async consultar(){
        const resultado= await this._pedidoService.Consultar()
        return resultado
    }

    /** Consultar todo */

    @Get('All')
    async consultarAll(){
        const resultado= await this._pedidoService.ConsultarTodo()
        return resultado
    }

    @Get('unique/:id')
    async consultarxId(@Param('id') id:string){
        const resultado= await this._pedidoService.ConsultarxId(id)
        return resultado
    }

    @Patch('/:id')
    async ModificarPedido(
      @Param('id') id: string,
      @Body() pedido: PedidoDto,
    ) {
      const resultado = await this._pedidoService.Update(id, pedido);
      if (resultado == null) {
        throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
      }
      return resultado;
    }

}
