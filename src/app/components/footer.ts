import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrandLogoComponent } from './brand-logo';
import { I18nService } from '../services/i18n.service';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule, BrandLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="w-full bg-[#eae4d7] text-slate-700 py-10 border-t border-[#ded7cb] text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Reduced Footer Bar with Repeated CTA to Prevent Traffic Leaks -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#ded7cb]">
          <div class="flex items-center gap-4">
            <button
              type="button"
              id="footer-brand-logo-btn"
              (click)="navService.goHome()"
              class="focus:outline-none cursor-pointer"
              title="Volver a Inicio"
            >
              <app-brand-logo [size]="'sm'" />
            </button>
            <div class="text-xs text-slate-600 font-medium">
              Plataforma fiduciaria de co-inversión inmobiliaria y value engineering.
            </div>
          </div>

          <div class="flex items-center gap-4">
            <button
              type="button"
              id="footer-cta-btn"
              (click)="auth.openAuthModal('investor')"
              class="px-5 py-2.5 rounded-xl bg-[#0c4a58] hover:bg-[#13596b] text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
            >
              <mat-icon class="text-sm">account_circle</mat-icon>
              <span>Comenzar a Invertir</span>
            </button>

            <button
              type="button"
              id="footer-scroll-top-btn"
              (click)="scrollToTop()"
              class="p-2.5 rounded-xl bg-white border border-[#ded7cb] text-slate-700 hover:text-slate-950 transition-colors"
              title="Volver Arriba"
            >
              <mat-icon class="text-base">arrow_upward</mat-icon>
            </button>
          </div>
        </div>

        <!-- Minimum Legal Links & Copyright -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
          <div>
            © {{ currentYear }} InvestNetwork Technologies, Inc. Todos los derechos reservados.
          </div>
          <div class="flex items-center gap-4">
            <span class="hover:text-slate-800 transition-colors cursor-pointer">Aviso de Privacidad</span>
            <span>•</span>
            <span class="hover:text-slate-800 transition-colors cursor-pointer">Términos del Fideicomiso</span>
            <span>•</span>
            <span class="hover:text-slate-800 transition-colors cursor-pointer">Auditoría Notarial</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly i18n = inject(I18nService);
  readonly auth = inject(AuthService);
  readonly navService = inject(NavigationService);
  readonly currentYear = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


