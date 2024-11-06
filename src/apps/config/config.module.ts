import { NsModule } from '@nexus-ioc/core';
import { ConfigService } from './config.service';

@NsModule({
  imports: [],
  providers: [ConfigService],
  exports: [],
})
export class ConfigModule {}
