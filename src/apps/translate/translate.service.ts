import { Inject, Injectable } from "@nexus-ioc/core";

@Injectable()
export class TranslateService {
    constructor(
        @Inject('translations') private readonly translations: Record<string, any>
    ) {}

    public getText(name: string, params: { lng: string } ): string {
        const translations = this.getTranslation(params.lng);
        return translations?.[name];
    }

    getTranslation(language: string) {
        return this.translations[language];
    }

    getTranslations() {
        return this.translations;
    }
}
