import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../services/i18n.service';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-faq-section',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="faq" class="w-full bg-[#fbf9f5] py-16 sm:py-20 border-b border-[#ded7cb]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eae4d7] border border-[#ded7cb] text-[#0c4a58] text-xs font-mono uppercase tracking-wider mb-3 font-semibold">
            <mat-icon class="text-sm leading-none">help_outline</mat-icon>
            <span>Preguntas Frecuentes & Manejo de Riesgo</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Todo lo que Necesitas Saber Antes de Invertir
          </h2>
          <p class="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Resolvemos con total transparencia las dudas más habituales sobre garantías legales, tickets mínimos y distribución de utilidades.
          </p>
        </div>

        <!-- FAQ Accordion -->
        <div class="space-y-4">
          @for (item of faqs; track item.id; let idx = $index) {
            <div
              class="bg-white border border-[#ded7cb] rounded-2xl overflow-hidden transition-all shadow-xs"
              [class.ring-1]="openItemIndex() === idx"
              [class.ring-[#0c4a58]/40]="openItemIndex() === idx"
            >
              <button
                type="button"
                [id]="'faq-toggle-' + idx"
                (click)="toggleFaq(idx)"
                class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-lg bg-[#eae4d7] text-[#0c4a58] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {{ idx + 1 }}
                  </span>
                  <span class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {{ item.question }}
                  </span>
                </div>
                <div class="w-8 h-8 rounded-full bg-[#f5f2eb] flex items-center justify-center text-slate-700 shrink-0">
                  <mat-icon class="text-lg transition-transform duration-300" [class.rotate-180]="openItemIndex() === idx">
                    expand_more
                  </mat-icon>
                </div>
              </button>

              @if (openItemIndex() === idx) {
                <div class="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#f5f2eb]">
                  <p>{{ item.answer }}</p>
                  <div class="mt-3 flex items-center gap-2 text-[11px] font-mono text-[#0c4a58] font-semibold">
                    <mat-icon class="text-xs text-emerald-700">verified</mat-icon>
                    <span>Categoría: {{ item.category }} • Respaldado por Protocolo Fiduciario</span>
                  </div>
                </div>
              }
            </div>
          }
        </div>

        <!-- Still have questions? -->
        <div class="mt-12 text-center bg-[#eae4d7]/60 border border-[#ded7cb] rounded-2xl p-6">
          <p class="text-xs sm:text-sm font-semibold text-slate-800">
            ¿Tienes alguna consulta técnica o fiduciaria específica?
          </p>
          <p class="text-xs text-slate-600 mt-1">
            Habla directamente con un oficial fiduciario colegiado sin ningún compromiso.
          </p>
          <div class="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              id="faq-contact-advisor-btn"
              (click)="openAuthModal()"
              class="px-5 py-2.5 rounded-xl bg-[#0c4a58] hover:bg-[#13596b] text-white font-bold text-xs transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <mat-icon class="text-sm">support_agent</mat-icon>
              <span>Contactar a un Oficial Fiduciario</span>
            </button>
            <button
              type="button"
              (click)="navService.navigate('marketplace')"
              class="px-5 py-2.5 rounded-xl bg-white hover:bg-[#eae4d7] border border-[#ded7cb] text-slate-800 font-bold text-xs transition-colors inline-flex items-center gap-1.5"
            >
              <mat-icon class="text-sm">domain</mat-icon>
              <span>Ir al Marketplace</span>
            </button>
            <button
              type="button"
              (click)="navService.goHome()"
              class="px-4 py-2.5 rounded-xl bg-white hover:bg-[#eae4d7] border border-[#ded7cb] text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors inline-flex items-center gap-1"
            >
              <mat-icon class="text-sm">arrow_back</mat-icon>
              <span>Inicio</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FaqSectionComponent {
  readonly i18n = inject(I18nService);
  readonly auth = inject(AuthService);
  readonly navService = inject(NavigationService);

  readonly openItemIndex = signal<number | null>(0);

  readonly faqs: FaqItem[] = [
    {
      id: 'q1',
      category: 'Inversión & Tickets',
      question: '¿Cuál es el ticket mínimo para empezar a co-invertir?',
      answer: 'Puedes comenzar a co-invertir en proyectos sindicados y remodelaciones desde $5,000 USD. Para adquisición directa al 100% de títulos en remates bancarios y propiedades distressed, los tickets varían entre $180,000 y $3,500,000 USD según la ubicación.'
    },
    {
      id: 'q2',
      category: 'Seguridad Legal & Títulos',
      question: '¿Cómo se garantiza la titularidad legal y la protección de mi capital?',
      answer: 'Cada propiedad pasa por una rigurosa auditoría notarial que descarta litigios, gravámenes o adeudos fiscales previos. Los fondos de los inversores se depositan en una cuenta de custodia Escrow independiente y no se liberan hasta que el contrato fiduciario esté debidamente inscrito ante notario público.'
    },
    {
      id: 'q3',
      category: 'Obras & Presupuestos',
      question: '¿Qué sucede si una remodelación arquitectónica sufre demoras o sobrecostos?',
      answer: 'Todas las obras de remodelación se contratan bajo la modalidad de "Precio Máximo Garantizado" (GMP) con pólizas de fianza de cumplimiento. Además, cada proyecto contempla una partida de contingencia técnica del 10% ya incluida en la simulación financiera para proteger el margen de retorno ARV.'
    },
    {
      id: 'q4',
      category: 'Extranjeros & Fiscalidad',
      question: '¿Pueden participar personas físicas o jurídicas no residentes o extranjeras?',
      answer: 'Sí. Aceptamos inversores internacionales calificados (personas físicas o estructuras societarias como LLCs, patrimoniales o fideicomisos extranjeros). Nuestro equipo fiduciario facilita la apertura de cuenta en custodia y la estructura fiscal óptima para retención y repatriación de capital.'
    },
    {
      id: 'q5',
      category: 'Liquidación & Rendimientos',
      question: '¿Cómo y cuándo recibo las utilidades y el capital invertido?',
      answer: 'En proyectos de Flip / Remodelación, el capital y la plusvalía neta se liquidan mediante transferencia internacional al momento de la firma de escritura de compraventa del activo revalorizado (promedio entre 4 y 7 meses). En activos con renta patrimonial, las distribuciones se realizan de manera trimestral.'
    },
    {
      id: 'q6',
      category: 'Comisiones & Costos',
      question: '¿Qué honorarios o comisiones cobra InvestNetwork?',
      answer: 'Mantenemos total transparencia: cobramos una comisión de originación fiduciaria del 1.5% al 2.5% ya descontada en el precio de adquisición del activo, y un fee de éxito (carried interest) únicamente si el proyecto supera la tasa de rendimiento preferente pactada. Sin cobros sorpresa ni comisiones de mantenimiento ocultas.'
    }
  ];

  toggleFaq(index: number): void {
    if (this.openItemIndex() === index) {
      this.openItemIndex.set(null);
    } else {
      this.openItemIndex.set(index);
    }
  }

  openAuthModal(): void {
    this.auth.openAuthModal('investor');
  }
}
