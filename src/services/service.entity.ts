import { Journey } from 'src/journey/journey.entity';
import { ServiceType } from 'src/service-type/service-type.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 1 })
  paymentChoice: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ default: 0 })
  completedJobs: number;

  @Column({ default: 0 })
  price: number;

  // usuario al que pertenece el servicio
  @ManyToOne(() => User, (user) => user.services)
  user: User;

  // tipo de servicio asociado al servicio
  @ManyToOne(() => ServiceType, (serviceType) => serviceType.services)
  serviceType: ServiceType;

  @OneToMany(() => Journey, (journey) => journey.service)
  journeys: Journey[];

  // usuarios que agregaron el servicio a sus favoritos
  @ManyToMany(() => User, (user) => user.favoriteServices)
  users: User[];
}
