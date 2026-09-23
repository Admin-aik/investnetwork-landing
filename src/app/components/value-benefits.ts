import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../services/i18n.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-value-benefits',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="beneficios" class="w-full bg-[#f5f2eb] py-16 sm:py-20 border-b border-[#ded7cb]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eae4d7] border border-[#ded7cb] text-[#0c4a58] text-xs font-mono uppercase tracking-wider mb-3 font-semibold">
            <mat-icon class="text-sm leading-none">workspace_premium</mat-icon>
            <span>Propuesta de Valor & Ventaja Competitiva</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Por Qué los Inversores Más Exigentes Eligen InvestNetwork
          </h2>
          <p class="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Eliminamos la burocracia, el riesgo legal y la incertidumbre en remodelaciones para ofrecerte rendimientos institucionales protegidos por contrato.
          </p>
        </div>

        <!-- 4 Key Benefits Focused on User Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <!-- Benefit 1: Descuentos Reales -->
          <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div class="w-12 h-12 rounded-xl bg-[#0c4a58]/10 text-[#0c4a58] flex items-center justify-center mb-4">
                <mat-icon class="text-2xl">trending_down</mat-icon>
              </div>
              <div class="text-[11px] font-mono font-bold text-amber-700 uppercase tracking-wider mb-1">
                Hasta 45% Off
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">
                Descuentos Fuera de Mercado
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Accede a remates bancarios, carteras hipotecarias y activos distressed pre-analizados con un margen de compra del 20% al 45% bajo avalúo comercial.
              </p>
            </div>
            <div class="pt-4 mt-4 border-t border-[#ded7cb] text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <mat-icon class="text-xs text-emerald-700">check_circle</mat-icon>
              <span>Margen de entrada asegurado</span>
            </div>
          </div>

          <!-- Benefit 2: Blindaje Jurídico -->
          <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center mb-4">
                <mat-icon class="text-2xl">gavel</mat-icon>
              </div>
              <div class="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider mb-1">
                Fideicomiso & Escrow
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">
                Seguridad Jurídica Blindada
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Cada inmueble cuenta con título auditado ante notario fiduciario libre de gravámenes. Los fondos residen en cuentas de custodia Escrow independientes.
              </p>
            </div>
            <div class="pt-4 mt-4 border-t border-[#ded7cb] text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <mat-icon class="text-xs text-emerald-700">check_circle</mat-icon>
              <span>0 litigios pendientes</span>
            </div>
          </div>

          <!-- Benefit 3: Value Engineering -->
          <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center mb-4">
                <mat-icon class="text-2xl">architecture</mat-icon>
              </div>
              <div class="text-[11px] font-mono font-bold text-[#0c4a58] uppercase tracking-wider mb-1">
                Retorno Acelerado
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">
                Plusvalía ARV Llave en Mano
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Nuestros directores de obra y arquitectos ejecutan remodelaciones de autor en 3 a 6 meses con presupuesto cerrado, garantizando un salto de valor ARV medible.
              </p>
            </div>
            <div class="pt-4 mt-4 border-t border-[#ded7cb] text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <mat-icon class="text-xs text-emerald-700">check_circle</mat-icon>
              <span>Póliza de fianza de obra</span>
            </div>
          </div>

          <!-- Benefit 4: Co-inversión Fraccionada -->
          <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div class="w-12 h-12 rounded-xl bg-teal-500/10 text-[#0c4a58] flex items-center justify-center mb-4">
                <mat-icon class="text-2xl">pie_chart</mat-icon>
              </div>
              <div class="text-[11px] font-mono font-bold text-teal-800 uppercase tracking-wider mb-1">
                Desde $5,000 USD
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-2">
                Co-Inversión Fraccionada
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Diversifica tu cartera participando con tickets accesibles en penthouses, villas y remates prime sin necesidad de financiar la totalidad del activo.
              </p>
            </div>
            <div class="pt-4 mt-4 border-t border-[#ded7cb] text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <mat-icon class="text-xs text-emerald-700">check_circle</mat-icon>
              <span>Distribución neta garantizada</span>
            </div>
          </div>
        </div>

        <!-- Section CTA Link -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            type="button"
            id="benefits-cta-btn"
            (click)="navService.navigate('marketplace')"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c4a58] hover:bg-[#13596b] text-white font-bold text-xs sm:text-sm transition-colors shadow-md"
          >
            <mat-icon class="text-base">search</mat-icon>
            <span>Ver Inventario Prime con Descuento</span>
          </button>

          <button
            type="button"
            id="benefits-home-btn"
            (click)="navService.goHome()"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#eae4d7] border border-[#ded7cb] text-slate-800 font-bold text-xs sm:text-sm transition-colors"
          >
            <mat-icon class="text-base text-slate-500">arrow_back</mat-icon>
            <span>Volver a Inicio</span>
          </button>
        </div>
      </div>
    </section>
  `
})
export class ValueBenefitsComponent {
  readonly i18n = inject(I18nService);
  readonly navService = inject(NavigationService);
}
