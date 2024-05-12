import { Service } from 'src/services/service.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: '' })
  week: string;
  @Column({ default: '' })
  day: string;
  @Column({ default: '' })
  hour: string;
  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => Service, (service) => service.journeys)
  service: Service;
}
