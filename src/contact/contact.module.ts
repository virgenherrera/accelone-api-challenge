import { Module } from '@nestjs/common';

import { ContactService } from './services';
import { ContactController } from './controllers';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
