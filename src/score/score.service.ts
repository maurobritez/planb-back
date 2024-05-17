import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: number, data: any, request: any) {
    const { email } = request.user;
    const { score, comment } = data;

    const userDb = await this.usersService.findOneByEmail(email);
    if (!userDb)
      throw new NotFoundException(
        'No deberia pasar, user not found with id from auth token',
      );

    const userToRate = await this.usersService.getById(userId);
    if (!userToRate) throw new NotFoundException('User to rate not found');

    if (userDb.id === userToRate.id)
      throw new UnauthorizedException('You can not rate yourself');

    const scoreAlreadyExists = await this.scoreRepository.findOne({
      where: { scoredUser: { id: userId }, scorerUser: { id: userDb.id } },
    });
    if (scoreAlreadyExists)
      throw new BadRequestException(
        'You can not rate this user again I say :-P',
      );

    const newScore = new Score();
    newScore.score = score;
    newScore.comment = comment;
    newScore.scorerUser = userDb;
    newScore.scoredUser = userToRate;

    return await this.scoreRepository.save(newScore);
  }

  getAllScores() {
    return this.scoreRepository.find();
  }

  async getScoresByUser(request: any) {
    const { email } = request.user;
    const userDb = await this.usersService.findOneByEmail(email);
    if (!userDb)
      throw new NotFoundException(
        'No deberia pasar, user not found with id from auth token',
      );

    const scores = await this.scoreRepository.find({
      where: { scoredUser: { id: userDb.id } },
      relations: { scorerUser: true },
    });

    if (!scores) throw new NotFoundException('Scores not found');

    return scores;
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  async deleteById(id: number, request: any) {
    const { email } = request.user;
    const userDb = await this.usersService.findOneByEmail(email);
    if (!userDb)
      throw new NotFoundException(
        'No deberia pasar, user not found with id from auth token',
      );

    const scoreDb = await this.scoreRepository.findOne({
      where: { id },
    });
    if (!scoreDb) throw new NotFoundException('Score not found');

    await this.scoreRepository.delete(id);
    return true;
  }
}
