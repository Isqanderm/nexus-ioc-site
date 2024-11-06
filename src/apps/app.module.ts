import { NsModule } from '@nexus-ioc/core';
import { ConfigModule } from './config/config.module';

@NsModule({
  imports: [ConfigModule],
  providers: [],
  exports: [],
})
export class AppModule {}
