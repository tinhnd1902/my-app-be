import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  chat_id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createAt: Date;
}
