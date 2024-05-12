import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { JourneyService } from './journey.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';

@Controller('journeys')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Post(':serviceId')
  @UsePipes(new ValidationPipe())
  createJourney(
    @Body() createJourneyDto: CreateJourneyDto,
    @Param('serviceId') id: number,
  ) {
    return this.journeyService.create(createJourneyDto, id);
  }

  @Get()
  findAllJourneys() {
    return this.journeyService.getAll();
  }

  @Get(':id')
  getJourneyById(@Param('id') id: number) {
    return this.journeyService.getById(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateJourneyById(
    @Param('id') id: number,
    @Body() updateJourneyDto: UpdateJourneyDto,
  ) {
    return this.journeyService.updateById(id, updateJourneyDto);
  }

  @Delete(':id')
  deleteJourneyById(@Param('id') id: number) {
    return this.journeyService.deleteById(id);
  }
}
