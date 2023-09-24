import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Events } from '../events/event.entity';

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @ManyToOne(() => Events, (events) => events.attendees, {
    nullable: false,
  })
  event: Events;
}
