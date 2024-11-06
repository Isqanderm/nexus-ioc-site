import { DynamicModule, NsModule } from "@nexus-ioc/core";
import { TranslateService } from "./translate.service";

export class TranslateModule {
  public static forRoot(options: { locales: string[] }): DynamicModule {
    let translations = {};
    if (process.env.IS_SERVER) {
      for (const locale of options.locales) {
        const translation = require(`../../i18n/${locale}.json`);
        Object.assign(translations, { [locale]: translation });
      }
    } else {
      Object.assign(translations, window?.__INIT_TRANSLATIONS__! || {});
    }

    return {
      module: TranslateModule,
      providers: [
        {
          provide: "translations",
          useValue: translations,
        },
        TranslateService,
      ],
      exports: [TranslateService],
    }
  }
}
