import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../services/i18n.service';
import { NavigationService } from '../services/navigation.service';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  quote: string;
  asset: string;
  metricLabel: string;
  metricValue: string;
  date: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="testimonios" class="w-full bg-[#f5f2eb] py-16 sm:py-20 border-b border-[#ded7cb]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eae4d7] border border-[#ded7cb] text-[#0c4a58] text-xs font-mono uppercase tracking-wider mb-3 font-semibold">
            <mat-icon class="text-sm leading-none">rate_review</mat-icon>
            <span>Casos de Éxito & Resultados Comprobados</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lo que Dicen Nuestros Inversionistas y Socios
          </h2>
          <p class="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Experiencias reales de inversores individuales, family offices y desarrolladores que han maximizado su capital a través de nuestra plataforma fiduciaria.
          </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          @for (item of testimonials; track item.id) {
            <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <!-- Rating Stars & Verified Badge -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex text-amber-500">
                    <mat-icon class="text-base leading-none">star</mat-icon>
                    <mat-icon class="text-base leading-none">star</mat-icon>
                    <mat-icon class="text-base leading-none">star</mat-icon>
                    <mat-icon class="text-base leading-none">star</mat-icon>
                    <mat-icon class="text-base leading-none">star</mat-icon>
                  </div>
                  <span class="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <mat-icon class="text-xs">verified</mat-icon>
                    <span>Inversión Auditada</span>
                  </span>
                </div>

                <!-- Testimonial Quote -->
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{{ item.quote }}"
                </p>
              </div>

              <div>
                <!-- Impact Metric Box -->
                <div class="bg-[#fbf9f5] border border-[#ded7cb] rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div>
                    <div class="text-[10px] uppercase font-mono text-slate-500">Activo Operado</div>
                    <div class="text-xs font-bold text-slate-900 truncate max-w-[170px]">{{ item.asset }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-[10px] uppercase font-mono text-slate-500">{{ item.metricLabel }}</div>
                    <div class="text-sm font-extrabold font-mono text-emerald-700">{{ item.metricValue }}</div>
                  </div>
                </div>

                <!-- Author Profile -->
                <div class="flex items-center gap-3 pt-3 border-t border-[#ded7cb]">
                  <img
                    [src]="item.avatar"
                    [alt]="item.name"
                    referrerpolicy="no-referrer"
                    class="w-10 h-10 rounded-full object-cover border border-[#ded7cb]"
                  />
                  <div>
                    <div class="text-xs font-bold text-slate-900 leading-tight">{{ item.name }}</div>
                    <div class="text-[11px] text-slate-500">{{ item.role }} • {{ item.city }}</div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Trust Certification Strip -->
        <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 text-center shadow-xs">
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-slate-600">
            <div class="flex items-center gap-2">
              <mat-icon class="text-emerald-700">security</mat-icon>
              <span>100% Contratos Notariados</span>
            </div>
            <div class="flex items-center gap-2">
              <mat-icon class="text-[#0c4a58]">account_balance</mat-icon>
              <span>Fondos Protegidos en Escrow</span>
            </div>
            <div class="flex items-center gap-2">
              <mat-icon class="text-[#b8860b]">thumb_up</mat-icon>
              <span>98.6% Recomendación entre Inversionistas</span>
            </div>
          </div>

          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              (click)="navService.navigate('marketplace')"
              class="px-6 py-3 rounded-xl bg-[#0c4a58] hover:bg-[#13596b] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm flex items-center gap-2"
            >
              <mat-icon class="text-base">domain</mat-icon>
              <span>Explorar Oportunidades de Inversión</span>
            </button>
            <button
              type="button"
              (click)="navService.goHome()"
              class="px-5 py-3 rounded-xl bg-white hover:bg-[#eae4d7] border border-[#ded7cb] text-slate-800 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              <mat-icon class="text-base text-slate-500">arrow_back</mat-icon>
              <span>Volver a Inicio</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  readonly i18n = inject(I18nService);
  readonly navService = inject(NavigationService);

  readonly testimonials: Testimonial[] = [
    {
      id: 't1',
      name: 'Roberto Villaseñor',
      role: 'Inversionista Patrimonial',
      city: 'Miami, FL',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      quote: 'Participé en la remodelación del Penthouse en Brickell con un ticket de $50,000 USD. La obra se entregó dos semanas antes de lo estipulado y la venta cerró con un retorno neto del 34.2% libre de sorpresas.',
      asset: 'Penthouse Brickell Avenue',
      metricLabel: 'Retorno Neto',
      metricValue: '+34.2% ROI',
      date: '2026'
    },
    {
      id: 't2',
      name: 'Dra. Elena Santillán',
      role: 'Cirujana & Inversionista Privada',
      city: 'CDMX',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      quote: 'Nunca había invertido en subastas por temor a litigios ocultos. La auditoría fiduciaria de InvestNetwork me dio absoluta tranquilidad. El informe notarial semanal y el cálculo ARV fueron exactos.',
      asset: 'Residencia en Campos Elíseos',
      metricLabel: 'Descuento Compra',
      metricValue: '38% Off',
      date: '2026'
    },
    {
      id: 't3',
      name: 'Marcus Vance & Asociados',
      role: 'Family Office Director',
      city: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      quote: 'Hemos colocado más de $400,000 USD en sindicaciones dentro de la plataforma. La claridad en los presupuestos de remodelación y la custodia en Escrow la convierten en la mejor herramienta de diversificación.',
      asset: 'Colección Lofts Downtown',
      metricLabel: 'Plazo de Liquidación',
      metricValue: '5.2 Meses',
      date: '2026'
    }
  ];
}
