import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/db.module';
import { EventsModule } from './modules/events/events.module';
import { AppJapanService } from './app.japan.service';
import { AttendeeModule } from './modules/attendee/attendee.module';
import { SchoolModule } from './modules/school/school.module';

@Module({
  imports: [DatabaseModule, EventsModule, SchoolModule],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppJapanService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Nest Event Backend',
    },
  ],
})
export class AppModule {}
