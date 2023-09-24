import { Repository } from 'typeorm';
import { Events } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
  ) {}

  private getEventBaseQuery() {
    return this.eventsRepository
      .createQueryBuilder('e')
      .orderBy('e.id', 'DESC');
  }

  public async getEvent(id: number): Promise<Events | undefined> {
    const query = this.getEventBaseQuery().andWhere('e.id = :id', { id });

    this.logger.debug(query.getSql());
    return await query.getOne();
  }
}
