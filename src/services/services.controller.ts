import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() createServiceDto: CreateServiceDto, @Req() request: any) {
    return this.servicesService.create(createServiceDto, request);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.servicesService.findOne(id);
  }

  @Get('type/:typeId')
  findServiceType(@Param('typeId') id: number) {
    return this.servicesService.getByCategoryId(id);
  }

  // no me dejaba poner solo user, sorry
  @Get('user/logged')
  @UseGuards(AuthGuard)
  getByUser(@Req() request: any) {
    return this.servicesService.getByUserLogged(request);
  }

  @Get('user/:id')
  getByUserId(@Param('id') id: number) {
    return this.servicesService.getByUserId(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.servicesService.remove(id);
  }

  // agregar un servicio a favoritos
  // @Post(':id')
  // @UseGuards(AuthGuard)
  // addFavById(@Param('id') id: number, @Req() request: any) {
  //   return this.servicesService.addFavoriteById(id, request);
  // }
}
