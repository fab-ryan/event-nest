import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotAcceptableException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventsDto } from './create-events.dto';
import { UpdateEventsDto } from './update-events-dto';
import { Events } from './event.entity';
import { ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from '../attendee/attendee.entity';
import { EventsService } from './event.service';

@ApiTags('Events')
@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Events)
    private readonly repository: Repository<Events>,
    // @InjectRepository(Attendee)
    // private readonly attendeeRepository: Repository<Attendee>,

    private readonly eventsService: EventsService,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }
  @Get(':id')
  async findOne(@Param('id') id) {
    const event = await this.eventsService.getEvent(id);
    if (!event) {
      throw new NotAcceptableException();
    }
    return event;
  }
  @Get('practice2/:id')
  async practice2() {
    return await this.repository.findOne({
      where: { id: 1 },
      relations: ['attendees'],
    });
  }

  @Post()
  async create(@Body() input: CreateEventsDto) {
    const event = await this.repository.save({
      ...input,
      when: new Date(input.when),
    });

    return event;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() input: UpdateEventsDto) {
    const event = await this.repository.findOne(id);
    return await this.repository.save({
      ...event,
      ...input,
      when: input?.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne(id);
    await this.repository.remove(event);
  }
}
