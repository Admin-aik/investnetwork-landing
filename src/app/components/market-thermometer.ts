import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PropertyService } from '../services/property.service';
import { I18nService } from '../services/i18n.service';

@Component({
  selector: 'app-market-thermometer',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="thermometer-section" class="w-full bg-[#f5f2eb] py-8 border-b border-[#ded7cb]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Main Bar Container -->
        <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm">
          <!-- Header -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ded7cb]">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#0c4a58] animate-pulse"></span>
                <h3 class="text-lg font-bold text-slate-900 tracking-tight">
                  {{ i18n.t().thermometer.title }}
                </h3>
              </div>
              <p class="text-xs text-slate-600 mt-0.5">
                {{ i18n.t().thermometer.subtitle }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                <mat-icon class="text-xs">bolt</mat-icon>
                Índice de Liquidez: 94.2 pts (Mercado Caliente)
              </span>
            </div>
          </div>

          <!-- Market Absorption Metrics Display (3 Key Gauges) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
            <!-- 1. Presión Compradora -->
            <div class="bg-[#fbf9f5] border border-[#ded7cb] p-4 rounded-xl">
              <div class="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span class="font-medium">{{ i18n.t().thermometer.buyerPressure }}</span>
                <span class="text-xs font-mono font-bold text-[#b8860b]">
                  {{ metrics().buyerPressureRatio }}:1.0
                </span>
              </div>
              <!-- Gauge bar -->
              <div class="w-full h-2 bg-[#e8e2d5] rounded-full overflow-hidden mb-2">
                <div
                  class="h-full bg-gradient-to-r from-teal-600 to-amber-500 rounded-full"
                  [style.width.%]="(metrics().buyerPressureRatio / 5.0) * 100"
                ></div>
              </div>
              <p class="text-[10px] text-slate-500 font-mono">
                {{ i18n.t().thermometer.buyerPressureDesc }}
              </p>
            </div>

            <!-- 2. Descuento Promedio en Subasta -->
            <div class="bg-[#fbf9f5] border border-[#ded7cb] p-4 rounded-xl">
              <div class="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span class="font-medium">{{ i18n.t().thermometer.avgAuctionDiscount }}</span>
                <span class="text-xs font-mono font-bold text-emerald-700">
                  -{{ metrics().avgDiscountAuction }}%
                </span>
              </div>
              <!-- Gauge bar -->
              <div class="w-full h-2 bg-[#e8e2d5] rounded-full overflow-hidden mb-2">
                <div
                  class="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full"
                  [style.width.%]="metrics().avgDiscountAuction * 2"
                ></div>
              </div>
              <p class="text-[10px] text-slate-500 font-mono">
                Bajo valor judicial vs. avalúo bancario
              </p>
            </div>

            <!-- 3. Velocidad de Absorción -->
            <div class="bg-[#fbf9f5] border border-[#ded7cb] p-4 rounded-xl">
              <div class="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span class="font-medium">{{ i18n.t().thermometer.absorptionSpeed }}</span>
                <span class="text-xs font-mono font-bold text-[#0c4a58]">
                  {{ i18n.t().thermometer.absorptionSpeedDays }}
                </span>
              </div>
              <!-- Gauge bar -->
              <div class="w-full h-2 bg-[#e8e2d5] rounded-full overflow-hidden mb-2">
                <div
                  class="h-full bg-gradient-to-r from-[#0c4a58] to-teal-500 rounded-full"
                  [style.width.%]="metrics().absorptionRate"
                ></div>
              </div>
              <p class="text-[10px] text-slate-500 font-mono">
                Tasa de colocación fiduciaria: {{ metrics().absorptionRate }}%
              </p>
            </div>
          </div>

          <!-- Dynamic Tabs: Todas, Alta Demanda, Ofertas con Descuento, Mayor ROI -->
          <div class="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#ded7cb]">
            <button
              type="button"
              id="tab-all-btn"
              (click)="setActiveTab('all')"
              class="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border"
              [class.bg-[#0c4a58]]="propertyService.activeTab() === 'all'"
              [class.text-white]="propertyService.activeTab() === 'all'"
              [class.border-[#0c4a58]]="propertyService.activeTab() === 'all'"
              [class.bg-[#fbf9f5]]="propertyService.activeTab() !== 'all'"
              [class.text-slate-700]]="propertyService.activeTab() !== 'all'"
              [class.border-[#ded7cb]]="propertyService.activeTab() !== 'all'"
            >
              {{ i18n.t().thermometer.tabs.all }}
            </button>

            <button
              type="button"
              id="tab-high-demand-btn"
              (click)="setActiveTab('high-demand')"
              class="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border"
              [class.bg-[#0c4a58]]="propertyService.activeTab() === 'high-demand'"
              [class.text-white]="propertyService.activeTab() === 'high-demand'"
              [class.border-[#0c4a58]]="propertyService.activeTab() === 'high-demand'"
              [class.bg-[#fbf9f5]]="propertyService.activeTab() !== 'high-demand'"
              [class.text-slate-700]]="propertyService.activeTab() !== 'high-demand'"
              [class.border-[#ded7cb]]="propertyService.activeTab() !== 'high-demand'"
            >
              {{ i18n.t().thermometer.tabs.highDemand }}
            </button>

            <button
              type="button"
              id="tab-discounted-btn"
              (click)="setActiveTab('discounted')"
              class="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border"
              [class.bg-[#0c4a58]]="propertyService.activeTab() === 'discounted'"
              [class.text-white]="propertyService.activeTab() === 'discounted'"
              [class.border-[#0c4a58]]="propertyService.activeTab() === 'discounted'"
              [class.bg-[#fbf9f5]]="propertyService.activeTab() !== 'discounted'"
              [class.text-slate-700]]="propertyService.activeTab() !== 'discounted'"
              [class.border-[#ded7cb]]="propertyService.activeTab() !== 'discounted'"
            >
              {{ i18n.t().thermometer.tabs.discounted }}
            </button>

            <button
              type="button"
              id="tab-highest-roi-btn"
              (click)="setActiveTab('highest-roi')"
              class="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border"
              [class.bg-[#0c4a58]]="propertyService.activeTab() === 'highest-roi'"
              [class.text-white]="propertyService.activeTab() === 'highest-roi'"
              [class.border-[#0c4a58]]="propertyService.activeTab() === 'highest-roi'"
              [class.bg-[#fbf9f5]]="propertyService.activeTab() !== 'highest-roi'"
              [class.text-slate-700]]="propertyService.activeTab() !== 'highest-roi'"
              [class.border-[#ded7cb]]="propertyService.activeTab() !== 'highest-roi'"
            >
              {{ i18n.t().thermometer.tabs.highestRoi }}
            </button>

            <button
              type="button"
              id="tab-auctions-btn"
              (click)="setActiveTab('auctions')"
              class="px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border"
              [class.bg-[#0c4a58]]="propertyService.activeTab() === 'auctions'"
              [class.text-white]="propertyService.activeTab() === 'auctions'"
              [class.border-[#0c4a58]]="propertyService.activeTab() === 'auctions'"
              [class.bg-[#fbf9f5]]="propertyService.activeTab() !== 'auctions'"
              [class.text-slate-700]]="propertyService.activeTab() !== 'auctions'"
              [class.border-[#ded7cb]]="propertyService.activeTab() !== 'auctions'"
            >
              {{ i18n.t().thermometer.tabs.auctions }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class MarketThermometerComponent {
  readonly i18n = inject(I18nService);
  readonly propertyService = inject(PropertyService);

  readonly metrics = this.propertyService.marketMetrics;

  setActiveTab(tab: 'all' | 'high-demand' | 'discounted' | 'highest-roi' | 'auctions'): void {
    this.propertyService.activeTab.set(tab);
  }
}
