import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  score: number;

  @ManyToOne(() => User, (user) => user.givenScores)
  scorerUser: User;

  @ManyToOne(() => User, (user) => user.receivedScores)
  scoredUser: User;

  @Column({ default: '' })
  comment: string;
}
