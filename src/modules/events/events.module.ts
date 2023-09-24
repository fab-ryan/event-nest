import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
