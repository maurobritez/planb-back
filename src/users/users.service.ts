import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getAll(opt?: string) {
    if (opt === 'inactive') {
      return await this.usersRepository.find({
        where: { status: false },
      });
    }

    if (opt === 'all') {
      return await this.usersRepository.find();
    }

    return await this.usersRepository.find({ where: { status: true } });
  }

  async getById(id: number) {
    const userDb = await this.usersRepository.findOne({
      where: { id },
      relations: { services: true },
    });
    if (!userDb) throw new NotFoundException('User not found');
    return userDb;
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    const userDb = await this.usersRepository.findOne({ where: { id } });
    if (!userDb) throw new NotFoundException('User not found');

    const { firstName, lastName, birthDate, emailC, phone, phoneC, dni, dniC } =
      updateUserDto;
    userDb.firstName = firstName || userDb.firstName;
    userDb.lastName = lastName || userDb.lastName;
    userDb.birthDate = birthDate || userDb.birthDate;
    userDb.emailC = emailC || userDb.emailC;
    userDb.phone = phone || userDb.phone;
    userDb.phoneC = phoneC || userDb.phoneC;
    userDb.dni = dni || userDb.dni;
    userDb.dniC = dniC || userDb.dniC;

    return this.usersRepository.save(userDb);
  }

  async updatePass(id: number, data: any) {
    const { oldPass, newPass } = data;
    const userDb = await this.usersRepository.findOne({ where: { id } });
    if (!userDb) throw new NotFoundException('User not found');

    const isPasswordValid = await bcryptjs.compare(oldPass, userDb.pass);
    if (!isPasswordValid) throw new NotFoundException('Invalid password');

    const hashedPassword = await bcryptjs.hash(newPass, 10);
    userDb.pass = hashedPassword;
    return this.usersRepository.save(userDb);
  }

  async rateUserById(id: number, score: number) {
    // todo : implementar
  }

  async changeStatusById(id: number) {
    const userDb = await this.usersRepository.findOne({ where: { id } });
    if (!userDb) throw new NotFoundException('User not found');

    userDb.status = !userDb.status;

    this.usersRepository.save(userDb);
    return true;
  }

  async deleteById(id: number) {
    const userDb = await this.usersRepository.findOne({ where: { id } });
    if (!userDb) throw new NotFoundException('User not found');

    await this.usersRepository.delete(id);
    return true;
  }

  // todo: hacer que funcione
  // async addToFavorites(request: any, serviceId: number): Promise<User> {
  //   const { email } = request.user;
  //   const user = await this.usersRepository.findOne({
  //     where: { email },
  //     relations: { favorites: true },
  //   });
  //   const serviceToAdd = await this.servicesService.findOne(serviceId);
  //   if (!serviceId) throw new NotFoundException('Service not found');
  //   user.favorites.push(serviceToAdd);
  //   return this.usersRepository.save(user);
  // }
}