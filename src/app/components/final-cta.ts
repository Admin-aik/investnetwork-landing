import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../services/i18n.service';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-final-cta',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="cta-final" class="w-full bg-gradient-to-b from-[#f5f2eb] to-[#ede8df] py-16 sm:py-24 border-b border-[#ded7cb]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative bg-[#0c4a58] rounded-3xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-xl">
          <!-- Background Ambient Elements -->
          <div class="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 text-center max-w-3xl mx-auto">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-mono uppercase tracking-wider mb-6">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Oportunidad Fiduciaria de Mercado</span>
            </div>

            <!-- Main Heading -->
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Multiplica tu Capital con Bienes Raíces de Alta Plusvalía
            </h2>

            <!-- Subtitle -->
            <p class="text-sm sm:text-base text-slate-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              Únete a más de 4,200 inversionistas calificados. Accede a remates bancarios exclusivos con descuentos de hasta el 45% y proyectos de remodelación arquitectónica llave en mano.
            </p>

            <!-- CTA Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                type="button"
                id="final-cta-register-btn"
                (click)="openAuth('investor')"
                class="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2"
              >
                <span>Comenzar a Invertir Ahora</span>
                <mat-icon class="text-lg">arrow_forward</mat-icon>
              </button>

              <button
                type="button"
                id="final-cta-explore-btn"
                (click)="navService.navigate('marketplace')"
                class="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <mat-icon class="text-lg">domain</mat-icon>
                <span>Explorar Propiedades en Vivo</span>
              </button>
            </div>

            <!-- Guarantees Strip -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/15 text-xs text-slate-300 font-mono">
              <div class="flex items-center justify-center gap-2">
                <mat-icon class="text-amber-400 text-base">check_circle</mat-icon>
                <span>Registro Gratuito en 2 Minutos</span>
              </div>
              <div class="flex items-center justify-center gap-2">
                <mat-icon class="text-amber-400 text-base">security</mat-icon>
                <span>Custodia 100% en Escrow Bancario</span>
              </div>
              <div class="flex items-center justify-center gap-2">
                <mat-icon class="text-amber-400 text-base">handshake</mat-icon>
                <span>Cero Comisiones Ocultas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FinalCtaComponent {
  readonly i18n = inject(I18nService);
  readonly auth = inject(AuthService);
  readonly navService = inject(NavigationService);

  openAuth(role: 'investor' | 'owner'): void {
    this.auth.openAuthModal(role);
  }
}
