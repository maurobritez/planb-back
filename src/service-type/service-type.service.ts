import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceType } from './service-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceTypeService {
  constructor(
    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,
  ) {}

  create(createServiceTypeDto: CreateServiceTypeDto) {
    return this.serviceTypeRepository.save(createServiceTypeDto);
  }

  findAll() {
    return this.serviceTypeRepository.find();
  }

  findOne(id: number) {
    const servTypeDb = this.serviceTypeRepository.findOne({ where: { id } });
    if (!servTypeDb) throw new NotFoundException('Service type not found');

    return servTypeDb;
  }

  async update(id: number, updateServiceTypeDto: UpdateServiceTypeDto) {
    const servTypeDb = await this.serviceTypeRepository.findOne({
      where: { id },
    });
    if (!servTypeDb) throw new NotFoundException('Service type not found');

    const { type, picture } = updateServiceTypeDto;
    servTypeDb.type = type || servTypeDb.type;
    servTypeDb.picture = picture || servTypeDb.picture;

    return await this.serviceTypeRepository.save(servTypeDb);
  }

  async changeStatus(id: number) {
    const servTypeDb = await this.serviceTypeRepository.findOne({
      where: { id },
    });
    if (!servTypeDb) throw new NotFoundException('Service type not found');

    servTypeDb.status = !servTypeDb.status;
    await this.serviceTypeRepository.save(servTypeDb);
    return true;
  }

  async remove(id: number) {
    const servTypeDb = this.serviceTypeRepository.findOne({ where: { id } });
    if (!servTypeDb) throw new NotFoundException('Service type not found');
    await this.serviceTypeRepository.delete(id);
    return true;
  }
}
