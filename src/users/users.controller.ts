import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(@Query('opt') opt: string) {
    return this.usersService.getAll(opt);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateById(id, updateUserDto);
  }

  @Put('reset-pass/:id')
  resetPassById(@Param('id') id: number, @Body() data: any) {
    return this.usersService.updatePass(id, data);
  }

  @Put('score/:id')
  @UseGuards(AuthGuard)
  rateUser(@Param('id') id: number) {
    //puntuar
  }

  @Put('favorites/:id')
  @UseGuards(AuthGuard)
  addToFavorite(@Req() request: any, @Param('id') serviceId: number) {
    // return this.usersService.addToFavorites(request, serviceId);
    // puta la wea que no anda
  }

  // todo: cambiar role
  // todo: change email
  // todo: update por QR

  @Delete(':id')
  changeStatusUserById(@Param('id') id: number) {
    return this.usersService.changeStatusById(id);
  }

  // solo para rol admin o >
  @Delete('delete/:id')
  deleteUserById(@Param('id') id: number) {
    return this.usersService.deleteById(id);
  }
}
