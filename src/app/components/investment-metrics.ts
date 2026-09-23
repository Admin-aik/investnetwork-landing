import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../services/i18n.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-investment-metrics',
  imports: [CommonModule, DecimalPipe, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [id]="id()"
      class="bg-white border border-[#ded7cb] rounded-xl p-5 shadow-sm text-slate-900"
    >
      <!-- Header with Fiduciary Certification Badge -->
      <div class="flex items-center justify-between border-b border-[#ded7cb] pb-3 mb-4">
        <div class="flex items-center gap-2">
          <mat-icon class="text-[#0c4a58] text-lg">verified</mat-icon>
          <h4 class="text-xs uppercase font-mono tracking-wider text-slate-700 font-semibold">
            {{ i18n.t().metrics.title }}
          </h4>
        </div>
        <span class="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          Auditoría Fiduciaria
        </span>
      </div>

      <!-- Main ROI and ARV Highlights -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="bg-[#f5f2eb] border border-emerald-500/30 rounded-lg p-3">
          <div class="text-[11px] text-slate-600 font-medium mb-1 flex items-center justify-between">
            <span>{{ i18n.t().metrics.projectedRoi }}</span>
            <mat-icon class="text-emerald-700 text-sm">trending_up</mat-icon>
          </div>
          <div class="text-2xl font-bold font-mono text-emerald-700 tracking-tight">
            +{{ roi() | number:'1.1-1' }}%
          </div>
          <div class="text-[10px] text-slate-600 font-mono mt-0.5">
            Margen neto: \${{ netProfit() | number:'1.0-0' }} USD
          </div>
        </div>

        <div class="bg-[#f5f2eb] border border-[#0c4a58]/30 rounded-lg p-3">
          <div class="text-[11px] text-slate-600 font-medium mb-1 flex items-center justify-between">
            <span>{{ i18n.t().metrics.targetArv }}</span>
            <mat-icon class="text-[#0c4a58] text-sm">analytics</mat-icon>
          </div>
          <div class="text-2xl font-bold font-mono text-[#0c4a58] tracking-tight">
            \${{ effectiveArv() | number:'1.0-0' }}
          </div>
          <div class="text-[10px] text-slate-600 font-mono mt-0.5">
            Valor post-remodelación
          </div>
        </div>
      </div>

      <!-- Detailed Breakdown Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div class="bg-[#fbf9f5] p-2.5 rounded-md border border-[#ded7cb]">
          <div class="text-[10px] text-slate-500 mb-0.5">{{ i18n.t().metrics.acquisitionPrice }}</div>
          <div class="font-mono font-semibold text-slate-900">
            \${{ effectivePrice() | number:'1.0-0' }}
          </div>
          <div class="text-[9px] text-slate-500 font-mono">
            \${{ pricePerSqm() | number:'1.0-0' }} / m²
          </div>
        </div>

        <div class="bg-[#fbf9f5] p-2.5 rounded-md border border-[#ded7cb]">
          <div class="text-[10px] text-slate-500 mb-0.5">{{ i18n.t().metrics.renovationBudget }}</div>
          <div class="font-mono font-semibold text-[#0c4a58]">
            \${{ effectiveRemodel() | number:'1.0-0' }}
          </div>
          <div class="text-[9px] text-slate-500 font-mono">
            \${{ remodelPerSqm() | number:'1.0-0' }} / m²
          </div>
        </div>

        <div class="bg-[#fbf9f5] p-2.5 rounded-md border border-[#ded7cb]">
          <div class="text-[10px] text-slate-500 mb-0.5">{{ i18n.t().metrics.capRate }}</div>
          <div class="font-mono font-semibold text-slate-900">
            {{ effectiveCapRate() | number:'1.1-1' }}%
          </div>
          <div class="text-[9px] text-slate-500 font-mono">
            Tasa de cap. anual
          </div>
        </div>

        <div class="bg-[#fbf9f5] p-2.5 rounded-md border border-[#ded7cb]">
          <div class="text-[10px] text-slate-500 mb-0.5">{{ i18n.t().metrics.executionHorizon }}</div>
          <div class="font-mono font-semibold text-slate-900">
            {{ effectiveMonths() }} {{ i18n.t().metrics.months }}
          </div>
          <div class="text-[9px] text-slate-500 font-mono">
            Llave en mano
          </div>
        </div>
      </div>
    </div>
  `
})
export class InvestmentMetricsComponent {
  readonly i18n = inject(I18nService);

  readonly id = input<string>('investment-metrics');
  readonly property = input<Property | null>(null);
  readonly customPrice = input<number | null>(null);
  readonly customRemodel = input<number | null>(null);
  readonly customArv = input<number | null>(null);
  readonly customSqm = input<number | null>(null);
  readonly customMonths = input<number | null>(null);

  readonly effectivePrice = computed(() => {
    if (this.customPrice() !== null) return this.customPrice()!;
    return this.property()?.price ?? 1180000;
  });

  readonly effectiveRemodel = computed(() => {
    if (this.customRemodel() !== null) return this.customRemodel()!;
    return this.property()?.remodelBudget ?? 140000;
  });

  readonly effectiveArv = computed(() => {
    if (this.customArv() !== null) return this.customArv()!;
    return this.property()?.arv ?? 1720000;
  });

  readonly effectiveSqm = computed(() => {
    if (this.customSqm() !== null) return this.customSqm()!;
    return this.property()?.sqm ?? 340;
  });

  readonly effectiveMonths = computed(() => {
    if (this.customMonths() !== null) return this.customMonths()!;
    return this.property()?.completionTimeMonths ?? 7;
  });

  readonly effectiveCapRate = computed(() => {
    return this.property()?.capRate ?? 9.2;
  });

  readonly totalCapital = computed(() => {
    return this.effectivePrice() + this.effectiveRemodel();
  });

  readonly netProfit = computed(() => {
    return this.effectiveArv() - this.totalCapital();
  });

  readonly roi = computed(() => {
    const capital = this.totalCapital();
    if (capital <= 0) return 0;
    return (this.netProfit() / capital) * 100;
  });

  readonly pricePerSqm = computed(() => {
    const sqm = this.effectiveSqm();
    return sqm > 0 ? this.effectivePrice() / sqm : 0;
  });

  readonly remodelPerSqm = computed(() => {
    const sqm = this.effectiveSqm();
    return sqm > 0 ? this.effectiveRemodel() / sqm : 0;
  });
}
