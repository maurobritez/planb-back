import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  // hacer el dto y validaciones
  @Post(':id')
  @UseGuards(AuthGuard)
  // validaciones
  create(@Param('id') userId: number, @Body() data: any, @Req() request: any) {
    return this.scoreService.create(userId, data, request);
  }

  @Get('all')
  getAllScores() {
    return this.scoreService.getAllScores();
  }

  @Get('')
  @UseGuards(AuthGuard)
  getScoresByUser(@Req() request: any) {
    return this.scoreService.getScoresByUser(request);
  }

  // todo: hacer el update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.update(+id, updateScoreDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteScoreById(@Param('id') id: number, @Req() request: any) {
    return this.scoreService.deleteById(id, request);
  }
}
