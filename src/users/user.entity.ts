import { IsBoolean } from 'class-validator';
import { Service } from 'src/services/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  birthDate: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  pass: string;

  @Column({ default: false })
  emailC: boolean;

  @Column({ default: '' })
  phone: string;

  @Column({ default: false })
  phoneC: boolean;

  @Column({ default: '' })
  dni: string;

  @Column({ default: false })
  dniC: boolean;

  // todo: etc.
  // @Column('integer', { array: true, default: '{}' })
  // score: number[];

  @Column({ default: true })
  @IsBoolean()
  status: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  // servicios creado por el usuario
  @OneToMany(() => Service, (service) => service.user)
  services: Service[];

  // @ManyToMany(() => Service, { cascade: true })
  // @JoinTable()
  // favorites: Service[];
}
