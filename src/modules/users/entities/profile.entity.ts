import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: string;

  @Column()
  gender: string;

  @Column()
  createAt: Date;
}
