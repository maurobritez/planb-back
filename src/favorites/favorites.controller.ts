import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':id')
  @UseGuards(AuthGuard)
  addServiceToFavorites(@Param('id') serviceId: number, @Req() request: any) {
    return this.favoritesService.create(serviceId, request);
  }

  @Get('')
  @UseGuards(AuthGuard)
  getFavsByUser(@Req() request: any) {
    return this.favoritesService.getFavsByUser(request);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  removeServiceFromFavorites(@Param('id') favId: number, @Req() request: any) {
    return this.favoritesService.deleteServiceById(favId, request);
  }
}
