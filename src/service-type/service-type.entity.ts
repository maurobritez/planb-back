import { IsBoolean } from 'class-validator';
import { Service } from 'src/services/service.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServiceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  type: string;

  // definir manejo de img
  @Column({ default: '' })
  picture: string;

  @Column({ default: true })
  @IsBoolean()
  status: boolean;

  @OneToMany(() => Service, (service) => service.serviceType)
  services: Service[];
}
