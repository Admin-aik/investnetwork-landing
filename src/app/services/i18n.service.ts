import { Injectable, computed, signal } from '@angular/core';
import { SupportedLang, TRANSLATIONS } from './translations';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  readonly currentLang = signal<SupportedLang>('es');

  readonly t = computed(() => {
    return TRANSLATIONS[this.currentLang()];
  });

  setLanguage(lang: SupportedLang): void {
    this.currentLang.set(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage(): void {
    this.setLanguage(this.currentLang() === 'es' ? 'en' : 'es');
  }
}
