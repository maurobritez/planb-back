import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journey } from './journey.entity';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class JourneyService {
  constructor(
    @InjectRepository(Journey)
    private readonly journeyRepository: Repository<Journey>,
    private readonly servicesService: ServicesService,
  ) {}

  async create(createJourneyDto: CreateJourneyDto, id: number) {
    const servDb = await this.servicesService.findOne(id);
    if (!servDb) throw new NotFoundException('Service not found');

    const { week, day, hour, available } = createJourneyDto;
    const newJourney = new Journey();
    newJourney.week = week;
    newJourney.day = day;
    newJourney.hour = hour;
    newJourney.available = available;
    newJourney.service = servDb;
    return this.journeyRepository.save(newJourney);
  }

  getAll() {
    return this.journeyRepository.find();
  }

  async getById(id: number) {
    const journeyDb = await this.journeyRepository.findOne({
      where: { id },
      relations: { service: true },
    });
    if (!journeyDb) throw new NotFoundException('Journey not found');
    // agregar filtros si es necesario...
    return journeyDb;
  }

  async updateById(id: number, updateJourneyDto: UpdateJourneyDto) {
    const journeyDb = await this.journeyRepository.findOne({ where: { id } });
    if (!journeyDb) throw new NotFoundException('Journey not found');

    const { week, day, hour, available } = updateJourneyDto;
    journeyDb.week = week || journeyDb.week;
    journeyDb.day = day || journeyDb.day;
    journeyDb.hour = hour || journeyDb.hour;
    journeyDb.available = available || journeyDb.available;

    return await this.journeyRepository.save(journeyDb);
  }

  async deleteById(id: number) {
    const journeyDb = await this.journeyRepository.findOne({ where: { id } });
    if (!journeyDb) throw new NotFoundException('Journey not found');

    await this.journeyRepository.delete(id);
    return true;
  }
}
