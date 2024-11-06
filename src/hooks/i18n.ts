import { useNexus } from "nexus-ioc-react-adapter";
import { TranslateService } from '@apps/translate/translate.service';
import { useLanguage } from '../context/LanguageContext';

export const i18nHook = () => {
    const translateService = useNexus<TranslateService>(TranslateService);
    const { language } = useLanguage();
    
    const i18nTranslate = (name: string) => {
      return translateService?.getText(name, { lng: language });
    }

    return i18nTranslate;
}