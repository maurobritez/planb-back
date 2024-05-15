import { Service } from 'src/services/service.entity';
import { User } from 'src/users/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favoriteServices)
  user: User;

  @ManyToOne(() => Service, (service) => service.users)
  service: Service;
}
