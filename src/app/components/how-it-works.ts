import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../services/i18n.service';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-how-it-works',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="como-funciona" class="w-full bg-[#fbf9f5] py-16 sm:py-20 border-b border-[#ded7cb]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eae4d7] border border-[#ded7cb] text-[#0c4a58] text-xs font-mono uppercase tracking-wider mb-3 font-semibold">
            <mat-icon class="text-sm leading-none">timeline</mat-icon>
            <span>Proceso Fiduciario Transparente</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cómo Funciona InvestNetwork en 4 Pasos Simples
          </h2>
          <p class="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Un proceso sin fricción diseñado para inversores individuales y patrimoniales que buscan retornos sólidos sin complicaciones operativas.
          </p>
        </div>

        <!-- 4 Step Diagram -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-12">
          <!-- Step 1 -->
          <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm relative flex flex-col justify-between">
            <div class="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-[#0c4a58] text-white font-mono font-bold text-xs shadow-sm">
              Paso 1
            </div>
            <div>
              <div class="w-12 h-12 rounded-xl bg-[#f5f2eb] text-[#0c4a58] flex items-center justify-center mb-4 mt-2 border border-[#ded7cb]">
                <mat-icon class="text-2xl">travel_explore</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">
                Explora el Marketplace
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Filtra por ciudad, nivel de descuento y tipo de activo en nuestro marketplace con mapa sincronizado y termómetro de demanda en tiempo real.
              </p>
            </div>
            <div class="pt-4 mt-4 border-t border-[#ded7cb]">
              <button
                type="button"
                (click)="navService.navigate('marketplace')"
                class="text-xs font-bold text-[#0c4a58] hover:underline flex items-center gap-1 font-mono"
              >
                <span>Ver inmuebles</span>
                <mat-icon class="text-xs">arrow_forward</mat-icon>
              </button>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm relative flex flex-col justify-between">
            <div class="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-[#0c4a58] text-white font-mono font-bold text-xs shadow-sm">
              Paso 2
            </div>
            <div>
              <div class="w-12 h-12 rounded-xl bg-[#f5f2eb] text-[#0c4a58] flex items-center justify-center mb-4 mt-2 border border-[#ded7cb]">
                <mat-icon class="text-2xl">calculate</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">
                Simula en la Calculadora
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Personaliza metrajes, acabados y partidas arquitectónicas en el portal de remodelación para proyectar el costo exacto y la plusvalía ARV.
              </p>
            </div>
            <div class="pt-4 mt-4 border-t border-[#ded7cb]">
              <button
                type="button"
                (click)="navService.navigate('remodeling')"
                class="text-xs font-bold text-[#0c4a58] hover:underline flex items-center gap-1 font-mono"
              >
                <span>Abrir calculadora</span>
                <mat-icon class="text-xs">arrow_forward</mat-icon>
              </button>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm relative flex flex-col justify-between">
            <div class="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-[#0c4a58] text-white font-mono font-bold text-xs shadow-sm">
              Paso 3
            </div>
            <div>
              <div class="w-12 h-12 rounded-xl bg-[#f5f2eb] text-[#0c4a58] flex items-center justify-center mb-4 mt-2 border border-[#ded7cb]">
                <mat-icon class="text-2xl">draw</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">
                Invierte con Respaldo Legal
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Adquiere directamente o suscríbete a un pool fraccionado desde $5,000 USD mediante contrato fiduciario digital y depósito seguro en Escrow.
              </p>
            </div>
            <div class="pt-4 mt-4 border-t border-[#ded7cb]">
              <button
                type="button"
                (click)="openAuth()"
                class="text-xs font-bold text-[#0c4a58] hover:underline flex items-center gap-1 font-mono"
              >
                <span>Crear cuenta</span>
                <mat-icon class="text-xs">arrow_forward</mat-icon>
              </button>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm relative flex flex-col justify-between">
            <div class="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-mono font-bold text-xs shadow-sm">
              Paso 4
            </div>
            <div>
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 mt-2 border border-emerald-300">
                <mat-icon class="text-2xl">paid</mat-icon>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">
                Cobra tu Plusvalía o Renta
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Supervisa el progreso de obra semanal en tu portal y recibe tu capital más las ganancias netas acordadas al completar la venta o arrendamiento.
              </p>
            </div>
            <div class="pt-4 mt-4 border-t border-[#ded7cb]">
              <span class="text-[11px] font-mono font-bold text-emerald-700 flex items-center gap-1">
                <mat-icon class="text-xs">verified</mat-icon>
                <span>Rendimientos auditados</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Callout Banner -->
        <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#eae4d7] flex items-center justify-center text-[#0c4a58]">
              <mat-icon class="text-xl">support_agent</mat-icon>
            </div>
            <div>
              <div class="text-xs font-bold text-slate-900">¿Tienes dudas sobre cómo estructurar tu portafolio?</div>
              <div class="text-[11px] text-slate-600">Nuestros oficiales fiduciarios te asesoran de forma personalizada sin costo.</div>
            </div>
          </div>
          <button
            type="button"
            id="how-it-works-advisor-btn"
            (click)="openAuth()"
            class="px-4 py-2 rounded-xl bg-white hover:bg-[#f5f2eb] border border-[#0c4a58] text-[#0c4a58] font-bold text-xs transition-colors whitespace-nowrap"
          >
            Agendar Asesoría Fiduciaria
          </button>
        </div>
      </div>
    </section>
  `
})
export class HowItWorksComponent {
  readonly i18n = inject(I18nService);
  readonly auth = inject(AuthService);
  readonly navService = inject(NavigationService);

  openAuth(): void {
    this.auth.openAuthModal('investor');
  }
}
