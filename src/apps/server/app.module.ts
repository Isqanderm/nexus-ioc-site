import { NsModule } from '@nexus-ioc/core';
import { ConfigModule } from '../config/config.module';
import { TranslateModule } from '../translate/translate.module';

@NsModule({
  imports: [ConfigModule, TranslateModule.forRoot({ locales: ['ru', 'en'] })],
  providers: [],
  exports: [],
})
export class AppModule {}
