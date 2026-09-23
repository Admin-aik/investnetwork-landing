import { Injectable, signal } from '@angular/core';

export type AppSection = 'hero' | 'beneficios' | 'como-funciona' | 'marketplace' | 'remodeling' | 'testimonios' | 'faq';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  readonly activeSection = signal<AppSection>('hero');

  navigate(section: AppSection): void {
    this.activeSection.set(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goHome(): void {
    this.navigate('hero');
  }
}
