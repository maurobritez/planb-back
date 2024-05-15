import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ServiceTypeService } from 'src/service-type/service-type.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly usersService: UsersService,
    private readonly serviceTypeService: ServiceTypeService,
  ) {}

  async create(createServiceDto: CreateServiceDto, request: any) {
    const { name, description, paymentChoice, price, serviceTypeId } =
      createServiceDto;

    const user = await this.usersService.findOneByEmail(request.user.email);
    if (!user) throw new NotFoundException('User not found');

    const serviceType = await this.serviceTypeService.findOne(serviceTypeId);
    if (!serviceType) throw new NotFoundException('ServiceType not found');

    const newService = new Service();
    (newService.name = name),
      (newService.description = description),
      (newService.paymentChoice = paymentChoice),
      (newService.creationDate = new Date()),
      (newService.price = price),
      (newService.user = user),
      (newService.serviceType = serviceType);

    return this.servicesRepository.save(newService);
  }

  findAll() {
    return this.servicesRepository.find();
  }

  async findOne(id: number) {
    const servDb = await this.servicesRepository.findOne({
      where: { id },
      relations: { serviceType: true, user: true, journeys: true },
    });
    if (!servDb) throw new NotFoundException('Service not found');

    return servDb;
  }

  getByUserId(id: number) {
    return this.servicesRepository.findOne({
      where: { user: { id } },
      relations: { journeys: true, serviceType: true },
    });
  }

  async getByUserLogged(request: any) {
    const { id } = request.user;

    return this.servicesRepository.findOne({
      where: { user: { id } },
      relations: { journeys: true, serviceType: true },
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const servDb = await this.servicesRepository.findOne({ where: { id } });
    if (!servDb) throw new NotFoundException('Service not found');

    const { name, description, paymentChoice, price } = updateServiceDto;
    servDb.name = name || servDb.name;
    servDb.description = description || servDb.description;
    servDb.paymentChoice = paymentChoice || servDb.paymentChoice;
    servDb.price = price || servDb.price;

    return this.servicesRepository.save(servDb);
  }

  async getByCategoryId(id: number) {
    const servicesDb = await this.servicesRepository.find({
      where: { serviceType: { id } },
    });
    if (!servicesDb) throw new NotFoundException('Services not found');

    return servicesDb;
  }

  remove(id: number) {
    const servDb = this.servicesRepository.findOne({ where: { id } });
    if (!servDb) throw new NotFoundException('Service not found');

    this.servicesRepository.delete(id);

    return true;
  }

  // todo: hacer funcionar
  // async addFavoriteById(id: number, request: any) {
  //   const userDb = await this.usersService.findOneByEmail(request.user.email);
  //   if (!userDb) throw new BadRequestException('Malio sal');

  //   const servDb = await this.servicesRepository.findOne({ where: { id } });
  //   if (!servDb) throw new NotFoundException('Service not found');

  //   userDb.favorites.push(servDb);

  //   return await this.servicesRepository.save(servDb);
  // }
}
