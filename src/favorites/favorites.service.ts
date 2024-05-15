import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { UsersService } from 'src/users/users.service';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    private readonly usersService: UsersService,
    private readonly servicesService: ServicesService,
  ) {}

  async create(serviceId: number, request: any) {
    const { id } = request.user;
    const userDb = await this.usersService.getById(id);
    if (!userDb)
      throw new NotFoundException(
        'No deberia pasar, user not found with id from auth token',
      );

    const servDb = await this.servicesService.findOne(serviceId);
    if (!servDb) throw new NotFoundException('Service not found');

    const serviceAlreadyExists = await this.favoritesRepository.findOne({
      where: { user: { id }, service: { id: serviceId } },
    });
    if (serviceAlreadyExists)
      throw new BadRequestException(
        'Service already exists in user favorites-services',
      );

    const newFavorite = new Favorite();
    newFavorite.user = userDb;
    newFavorite.service = servDb;

    return await this.favoritesRepository.save(newFavorite);
  }

  async getFavsByUser(request: any) {
    const { id } = request.user;
    const userDb = await this.usersService.getById(id);
    if (!userDb)
      throw new NotFoundException(
        'No deberia pasar, user not found with id from auth token',
      );

    const favsDb = await this.favoritesRepository.find({
      where: { user: { id } },
      relations: { service: { serviceType: true } },
    });

    if (!favsDb) throw new NotFoundException('Services not found');

    return favsDb;
  }

  async deleteServiceById(favId: number, request: any) {
    const { id } = request.user;
    const userDb = await this.usersService.getById(id);
    if (!userDb)
      throw new NotFoundException(
        'No deberia pasar, user not found with id from auth token',
      );

    const favDb = await this.favoritesRepository.findOne({
      where: { id: favId },
    });
    if (!favDb) throw new NotFoundException('Favorite service not found');

    await this.favoritesRepository.delete(favId);
    return true;
  }
}
