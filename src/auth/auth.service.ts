import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ firstName, lastName, email, pass, role }: RegisterDto) {
    const userDb = await this.usersService.findOneByEmail(email);

    if (userDb) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcryptjs.hash(pass, 10);

    await this.usersService.create({
      firstName,
      lastName,
      email,
      pass: hashedPassword,
      role: role || UserRole.USER,
    });

    return {
      message: 'User created successfully',
    };
  }

  async login({ email, pass }: LoginDto) {
    const userDb = await this.usersService.findOneByEmail(email);

    if (!userDb) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(pass, userDb.pass);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: userDb.email, firstName: userDb.firstName };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      firstName: userDb.firstName,
      email: userDb.email,
    };
  }
}
