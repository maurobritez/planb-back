import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';

@Controller('service-type')
export class ServiceTypeController {
  constructor(private readonly serviceTypeService: ServiceTypeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createServiceTypeDto: CreateServiceTypeDto) {
    return this.serviceTypeService.create(createServiceTypeDto);
  }

  @Get()
  getAll() {
    return this.serviceTypeService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.serviceTypeService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateById(
    @Param('id') id: number,
    @Body() updateServiceTypeDto: UpdateServiceTypeDto,
  ) {
    return this.serviceTypeService.update(id, updateServiceTypeDto);
  }

  @Delete(':id')
  changeStatus(@Param('id') id: number) {
    return this.serviceTypeService.changeStatus(id);
  }

  @Delete('delete/:id')
  deleteById(@Param('id') id: number) {
    return this.serviceTypeService.remove(id);
  }
}
