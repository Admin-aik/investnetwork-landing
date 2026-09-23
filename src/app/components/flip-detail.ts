import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FinishTier, RemodelingDirectoryItem } from '../models/property.model';
import { I18nService } from '../services/i18n.service';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-flip-detail',
  imports: [CommonModule, DecimalPipe, FormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="remodeling-flips-section" class="w-full bg-[#f5f2eb] text-slate-900 py-14 border-t border-[#ded7cb]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 1. Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eae4d7] border border-[#ded7cb] text-[#0c4a58] text-xs font-mono uppercase tracking-wider mb-3 font-semibold">
            <mat-icon class="text-sm leading-none">architecture</mat-icon>
            <span>Centro Fiduciario de Remodelación & Value Engineering</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {{ i18n.t().flip.title }}
          </h2>
          <p class="text-sm sm:text-base text-slate-600 mt-2">
            {{ i18n.t().flip.subtitle }}
          </p>
        </div>

        <!-- 2. DIRECTORIO DE REMODELACIONES (Catálogo de Obras & Mejoras de Valor) -->
        <div id="remodeling-directory" class="mb-16">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div class="flex items-center gap-2 text-[#0c4a58] font-bold text-xs uppercase font-mono tracking-wider mb-1">
                <mat-icon class="text-base">auto_awesome</mat-icon>
                <span>Catálogo de Obras de Alto Retorno</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900">
                {{ i18n.t().flip.directoryTitle }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                {{ i18n.t().flip.directorySubtitle }}
              </p>
            </div>

            <!-- Active in Calculator Counter Badge -->
            <div class="flex items-center gap-3">
              <div class="bg-white border border-[#ded7cb] px-3.5 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span class="text-xs font-mono text-slate-700">
                  <strong class="text-[#0c4a58]">{{ activeItemsCount() }}</strong> partidas en calculadora
                </span>
              </div>
              <a
                href="#remodeling-calculator"
                class="px-3 py-1.5 rounded-xl bg-[#0c4a58] hover:bg-[#13596b] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <mat-icon class="text-sm">calculate</mat-icon>
                <span>Ir a Calculadora</span>
              </a>
            </div>
          </div>

          <!-- Category Filter Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
            @for (cat of categoryFilters; track cat.id) {
              <button
                type="button"
                [id]="'cat-filter-' + cat.id"
                (click)="selectedCategory.set(cat.id)"
                class="px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border"
                [class.bg-[#0c4a58]]="selectedCategory() === cat.id"
                [class.text-white]="selectedCategory() === cat.id"
                [class.border-[#0c4a58]]="selectedCategory() === cat.id"
                [class.shadow-sm]="selectedCategory() === cat.id"
                [class.bg-white]="selectedCategory() !== cat.id"
                [class.text-slate-700]="selectedCategory() !== cat.id"
                [class.border-[#ded7cb]]="selectedCategory() !== cat.id"
                [class.hover:bg-[#eae4d7]]="selectedCategory() !== cat.id"
              >
                <mat-icon class="text-sm">{{ cat.icon }}</mat-icon>
                <span>{{ cat.label }}</span>
              </button>
            }
          </div>

          <!-- Directory Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (item of filteredDirectoryItems(); track item.id) {
              <div
                [id]="'dir-card-' + item.id"
                class="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md"
                [class.border-[#0c4a58]]="item.selectedInCalculator"
                [class.ring-2]="item.selectedInCalculator"
                [class.ring-[#0c4a58]/20]="item.selectedInCalculator"
                [class.border-[#ded7cb]]="!item.selectedInCalculator"
              >
                <!-- Image Header with Badges -->
                <div class="relative h-44 w-full overflow-hidden bg-slate-100 group">
                  <img
                    [src]="item.image"
                    [alt]="item.title"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <!-- Category Badge -->
                  <div class="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white font-medium">
                    {{ item.categoryLabel }}
                  </div>
                  <!-- ARV Impact Pill -->
                  <div class="absolute top-2.5 right-2.5 bg-emerald-50/95 border border-emerald-300 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-emerald-800 font-bold flex items-center gap-1 shadow-sm">
                    <mat-icon class="text-xs">trending_up</mat-icon>
                    <span>+{{ item.arvImpactPercent }}% ARV</span>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 class="font-bold text-sm text-slate-900 mb-1.5 leading-snug">
                      {{ item.title }}
                    </h4>
                    <p class="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                      {{ item.description }}
                    </p>

                    <!-- Key Specs Chips -->
                    <div class="flex flex-wrap gap-1.5 mb-4">
                      @for (spec of item.keySpecs.slice(0, 2); track spec) {
                        <span class="text-[10px] px-2 py-0.5 rounded bg-[#f5f2eb] text-slate-700 border border-[#ded7cb] font-mono">
                          {{ spec }}
                        </span>
                      }
                    </div>
                  </div>

                  <!-- Financial Metrics Grid -->
                  <div class="bg-[#fbf9f5] border border-[#ded7cb] rounded-xl p-3 mb-4 space-y-2 text-xs">
                    <div class="flex items-center justify-between">
                      <span class="text-[11px] text-slate-500">Inversión Estimada:</span>
                      <span class="font-mono font-bold text-[#0c4a58]">
                        \${{ getCostForCurrentTier(item) | number:'1.0-0' }} USD
                      </span>
                    </div>
                    <div class="flex items-center justify-between text-[11px]">
                      <span class="text-slate-500">Plazo de Obra:</span>
                      <span class="font-mono font-semibold text-slate-700">
                        {{ item.executionWeeks }} semanas
                      </span>
                    </div>
                    <div class="flex items-center justify-between text-[11px] pt-1 border-t border-[#ded7cb]">
                      <span class="text-slate-500">Retorno s/ Costo:</span>
                      <span class="font-mono font-bold text-emerald-700">
                        {{ item.roiPercent }}% ROI
                      </span>
                    </div>
                  </div>

                  <!-- Actions: Toggle to Calculator & Specs Modal -->
                  <div class="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      [id]="'toggle-calc-' + item.id"
                      (click)="toggleDirectoryItem(item.id)"
                      class="py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all border shadow-sm"
                      [class.bg-[#0c4a58]]="item.selectedInCalculator"
                      [class.text-white]="item.selectedInCalculator"
                      [class.border-[#0c4a58]]="item.selectedInCalculator"
                      [class.bg-white]="!item.selectedInCalculator"
                      [class.text-[#0c4a58]]="!item.selectedInCalculator"
                      [class.border-[#0c4a58]]="!item.selectedInCalculator"
                      [class.hover:bg-[#f5f2eb]]="!item.selectedInCalculator"
                    >
                      <mat-icon class="text-sm">
                        {{ item.selectedInCalculator ? 'check_circle' : 'add_circle_outline' }}
                      </mat-icon>
                      <span class="truncate">
                        {{ item.selectedInCalculator ? 'En Calculadora' : 'Añadir' }}
                      </span>
                    </button>

                    <button
                      type="button"
                      [id]="'view-specs-' + item.id"
                      (click)="openItemSpecsModal(item)"
                      class="py-2 px-2 rounded-xl text-xs font-medium text-slate-700 bg-[#f5f2eb] hover:bg-[#eae4d7] border border-[#ded7cb] transition-colors flex items-center justify-center gap-1"
                    >
                      <mat-icon class="text-sm">visibility</mat-icon>
                      <span>Ficha</span>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- 3. CALCULADORA INTEGRAL DE REMODELACIONES & RETORNO ARV -->
        <div id="remodeling-calculator" class="bg-white border border-[#ded7cb] rounded-2xl p-6 sm:p-8 shadow-sm">
          <!-- Calculator Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#ded7cb] gap-3">
            <div>
              <div class="flex items-center gap-2 text-[#0c4a58] font-bold text-xs uppercase font-mono tracking-wider mb-1">
                <mat-icon class="text-base">calculate</mat-icon>
                <span>Motor Paramétrico de Plusvalía</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900">
                {{ i18n.t().flip.calculatorTitle }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 mt-0.5">
                {{ i18n.t().flip.calculatorSubtitle }}
              </p>
            </div>

            <!-- Mode Switcher: Portafolio vs Inmueble Propio -->
            <div class="flex items-center bg-[#f5f2eb] p-1 rounded-xl border border-[#ded7cb]">
              <button
                type="button"
                id="calc-mode-portfolio"
                (click)="customPropertyMode.set(false)"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                [class.bg-[#0c4a58]]="!customPropertyMode()"
                [class.text-white]="!customPropertyMode()"
                [class.shadow-sm]="!customPropertyMode()"
                [class.text-slate-700]="customPropertyMode()"
              >
                <mat-icon class="text-sm">domain</mat-icon>
                <span>Portafolio Prime</span>
              </button>
              <button
                type="button"
                id="calc-mode-custom"
                (click)="customPropertyMode.set(true)"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                [class.bg-[#0c4a58]]="customPropertyMode()"
                [class.text-white]="customPropertyMode()"
                [class.shadow-sm]="customPropertyMode()"
                [class.text-slate-700]="!customPropertyMode()"
              >
                <mat-icon class="text-sm">tune</mat-icon>
                <span>Inmueble a Medida</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Left Controls Column (7 cols) -->
            <div class="lg:col-span-7 space-y-6">
              <!-- A. Inmueble Context -->
              @if (!customPropertyMode()) {
                <div>
                  <span class="text-xs font-semibold text-slate-800 block mb-2 font-mono uppercase tracking-wider">
                    1. Selecciona Activo del Portafolio:
                  </span>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    @for (p of flipOpportunities(); track p.id) {
                      <button
                        type="button"
                        [id]="'calc-prop-' + p.id"
                        (click)="selectProperty(p.id)"
                        class="p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between"
                        [class.bg-[#f5f2eb]]="activeProp().id === p.id"
                        [class.border-[#0c4a58]]="activeProp().id === p.id"
                        [class.ring-1]="activeProp().id === p.id"
                        [class.ring-[#0c4a58]]="activeProp().id === p.id"
                        [class.bg-[#fbf9f5]]="activeProp().id !== p.id"
                        [class.border-[#ded7cb]]="activeProp().id !== p.id"
                      >
                        <div class="text-xs font-bold text-slate-900 truncate">{{ p.city }}</div>
                        <div class="text-[11px] text-slate-500 truncate">{{ p.neighborhood }}</div>
                        <div class="text-[10px] font-mono text-[#0c4a58] font-semibold mt-1">
                          \${{ p.price | number:'1.0-0' }} USD • {{ p.sqm }} m²
                        </div>
                      </button>
                    }
                  </div>
                </div>
              } @else {
                <!-- Custom Property Form -->
                <div class="bg-[#fbf9f5] border border-[#ded7cb] rounded-xl p-4 space-y-3">
                  <span class="text-xs font-semibold text-slate-800 block font-mono uppercase tracking-wider">
                    1. Datos de tu Inmueble a Medida:
                  </span>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label for="custom-prop-name" class="text-[11px] text-slate-600 block mb-1">Nombre o Ubicación del Proyecto</label>
                      <input
                        id="custom-prop-name"
                        type="text"
                        [ngModel]="customPropertyName()"
                        (ngModelChange)="customPropertyName.set($event)"
                        class="w-full bg-white border border-[#ded7cb] rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0c4a58]"
                      />
                    </div>
                    <div>
                      <label for="custom-prop-price" class="text-[11px] text-slate-600 block mb-1">Valor Actual / Adquisición (USD)</label>
                      <input
                        id="custom-prop-price"
                        type="number"
                        step="10000"
                        [ngModel]="customPropertyPrice()"
                        (ngModelChange)="customPropertyPrice.set($event)"
                        class="w-full bg-white border border-[#ded7cb] rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0c4a58]"
                      />
                    </div>
                  </div>
                </div>
              }

              <!-- B. Metros Cuadrados Slider & Input -->
              <div class="bg-[#fbf9f5] p-4 rounded-xl border border-[#ded7cb]">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <label for="sqm-calc-range" class="text-xs font-semibold text-slate-800 font-mono uppercase tracking-wider block">
                      2. Superficie a Intervenir (m²):
                    </label>
                    <span class="text-[11px] text-slate-500">Área útil total sujeta a remodelación</span>
                  </div>
                  <div class="flex items-center gap-1.5 bg-white border border-[#ded7cb] rounded-lg px-2.5 py-1 shadow-sm">
                    <input
                      id="sqm-calc-number"
                      type="number"
                      min="50"
                      max="800"
                      step="5"
                      [ngModel]="interventionSqm()"
                      (ngModelChange)="interventionSqm.set($event)"
                      class="w-16 text-right font-mono font-bold text-sm text-[#0c4a58] focus:outline-none"
                    />
                    <span class="text-xs font-mono text-slate-600">m²</span>
                  </div>
                </div>
                <input
                  type="range"
                  id="sqm-calc-range"
                  min="60"
                  max="650"
                  step="10"
                  [ngModel]="interventionSqm()"
                  (ngModelChange)="interventionSqm.set($event)"
                  class="w-full accent-[#0c4a58] cursor-pointer"
                />
                <div class="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>60 m² (Estudio)</span>
                  <span>250 m² (Depto Familiar)</span>
                  <span>450 m² (Penthouse / Villa)</span>
                  <span>650 m² (Mansión)</span>
                </div>
              </div>

              <!-- C. Finish Quality Tier Selector -->
              <div>
                <span class="text-xs font-semibold text-slate-800 block mb-2 font-mono uppercase tracking-wider">
                  3. Gama de Acabados & Especificación:
                </span>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    id="calc-tier-standard"
                    (click)="setFinishTier('standard')"
                    class="p-3.5 rounded-xl border text-left transition-all"
                    [class.bg-[#f5f2eb]]="selectedTier() === 'standard'"
                    [class.border-[#0c4a58]]="selectedTier() === 'standard'"
                    [class.ring-1]="selectedTier() === 'standard'"
                    [class.ring-[#0c4a58]]="selectedTier() === 'standard'"
                    [class.bg-[#fbf9f5]]="selectedTier() !== 'standard'"
                    [class.border-[#ded7cb]]="selectedTier() !== 'standard'"
                  >
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-xs font-bold text-slate-900">{{ i18n.t().flip.tierStandard }}</span>
                      <span class="text-[10px] font-mono font-semibold text-slate-600">$420 / m²</span>
                    </div>
                    <p class="text-[11px] text-slate-500 leading-tight">
                      {{ i18n.t().flip.tierStandardDesc }}
                    </p>
                  </button>

                  <button
                    type="button"
                    id="calc-tier-premium"
                    (click)="setFinishTier('premium')"
                    class="p-3.5 rounded-xl border text-left transition-all"
                    [class.bg-[#f5f2eb]]="selectedTier() === 'premium'"
                    [class.border-[#0c4a58]]="selectedTier() === 'premium'"
                    [class.ring-1]="selectedTier() === 'premium'"
                    [class.ring-[#0c4a58]]="selectedTier() === 'premium'"
                    [class.bg-[#fbf9f5]]="selectedTier() !== 'premium'"
                    [class.border-[#ded7cb]]="selectedTier() !== 'premium'"
                  >
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-xs font-bold text-slate-900">{{ i18n.t().flip.tierPremium }}</span>
                      <span class="text-[10px] font-mono font-semibold text-[#0c4a58]">$750 / m²</span>
                    </div>
                    <p class="text-[11px] text-slate-500 leading-tight">
                      {{ i18n.t().flip.tierPremiumDesc }}
                    </p>
                  </button>

                  <button
                    type="button"
                    id="calc-tier-signature"
                    (click)="setFinishTier('signature')"
                    class="p-3.5 rounded-xl border text-left transition-all"
                    [class.bg-[#f5f2eb]]="selectedTier() === 'signature'"
                    [class.border-[#0c4a58]]="selectedTier() === 'signature'"
                    [class.ring-1]="selectedTier() === 'signature'"
                    [class.ring-[#0c4a58]]="selectedTier() === 'signature'"
                    [class.bg-[#fbf9f5]]="selectedTier() !== 'signature'"
                    [class.border-[#ded7cb]]="selectedTier() !== 'signature'"
                  >
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-xs font-bold text-slate-900">{{ i18n.t().flip.tierSignature }}</span>
                      <span class="text-[10px] font-mono font-semibold text-[#0c4a58]">$1,180 / m²</span>
                    </div>
                    <p class="text-[11px] text-slate-500 leading-tight">
                      {{ i18n.t().flip.tierSignatureDesc }}
                    </p>
                  </button>
                </div>
              </div>

              <!-- D. Selection of Architectural Work Items Checklist -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-slate-800 font-mono uppercase tracking-wider">
                    4. Partidas de Obra Incluidas:
                  </span>
                  <button
                    type="button"
                    (click)="toggleAllWorkItems()"
                    class="text-[11px] text-[#0c4a58] hover:underline font-mono font-medium"
                  >
                    {{ allWorkItemsSelected() ? 'Desmarcar Todas' : 'Seleccionar Todas' }}
                  </button>
                </div>
                <div class="space-y-2.5">
                  @for (item of directoryItems(); track item.id) {
                    <label
                      class="flex items-center justify-between p-3 rounded-xl bg-[#fbf9f5] border transition-colors cursor-pointer"
                      [class.border-[#0c4a58]]="item.selectedInCalculator"
                      [class.bg-white]="item.selectedInCalculator"
                      [class.border-[#ded7cb]]="!item.selectedInCalculator"
                    >
                      <div class="flex items-center gap-3">
                        <input
                          type="checkbox"
                          [checked]="item.selectedInCalculator"
                          (change)="toggleDirectoryItem(item.id)"
                          class="w-4 h-4 rounded text-[#0c4a58] accent-[#0c4a58] cursor-pointer"
                        />
                        <div>
                          <span class="text-xs text-slate-900 font-medium block">
                            {{ item.title }}
                          </span>
                          <span class="text-[10px] text-emerald-700 font-mono">
                            Impacto ARV: +{{ item.arvImpactPercent }}% • Plazo: {{ item.executionWeeks }} sem.
                          </span>
                        </div>
                      </div>
                      <span class="text-xs font-mono font-bold text-[#0c4a58]">
                        +\${{ getCostForCurrentTier(item) | number:'1.0-0' }} USD
                      </span>
                    </label>
                  }
                </div>
              </div>

              <!-- E. Budget Breakdown Progress Bar -->
              <div class="bg-[#fbf9f5] border border-[#ded7cb] rounded-xl p-4">
                <span class="text-xs font-semibold text-slate-800 block mb-2 font-mono uppercase tracking-wider">
                  {{ i18n.t().flip.costBreakdown }}
                </span>
                <!-- Visual Stacked Bar -->
                <div class="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 mb-3 border border-[#ded7cb]">
                  <div class="h-full bg-[#0c4a58]" style="width: 45%" title="Materiales 45%"></div>
                  <div class="h-full bg-[#1b7a8d]" style="width: 35%" title="Mano de obra 35%"></div>
                  <div class="h-full bg-amber-500" style="width: 10%" title="Licencias 10%"></div>
                  <div class="h-full bg-emerald-600" style="width: 10%" title="Contingencia 10%"></div>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  <div class="p-2 rounded bg-white border border-[#ded7cb]">
                    <div class="text-slate-500 text-[10px]">Materiales (45%)</div>
                    <div class="font-bold text-slate-900">\${{ budgetBreakdown().materials | number:'1.0-0' }}</div>
                  </div>
                  <div class="p-2 rounded bg-white border border-[#ded7cb]">
                    <div class="text-slate-500 text-[10px]">Mano de Obra (35%)</div>
                    <div class="font-bold text-slate-900">\${{ budgetBreakdown().labor | number:'1.0-0' }}</div>
                  </div>
                  <div class="p-2 rounded bg-white border border-[#ded7cb]">
                    <div class="text-slate-500 text-[10px]">Licencias (10%)</div>
                    <div class="font-bold text-slate-900">\${{ budgetBreakdown().permits | number:'1.0-0' }}</div>
                  </div>
                  <div class="p-2 rounded bg-white border border-[#ded7cb]">
                    <div class="text-slate-500 text-[10px]">Contingencia (10%)</div>
                    <div class="font-bold text-slate-900">\${{ budgetBreakdown().contingency | number:'1.0-0' }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Results & Yield Column (5 cols) -->
            <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <!-- Live Metrics Card -->
              <div class="bg-white border border-[#ded7cb] rounded-2xl p-6 shadow-sm">
                <div class="flex items-center justify-between border-b border-[#ded7cb] pb-3 mb-4">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-[#0c4a58]">assessment</mat-icon>
                    <h4 class="text-xs uppercase font-mono tracking-wider text-slate-800 font-bold">
                      Resumen Ejecutivo de Obra & ARV
                    </h4>
                  </div>
                  <span class="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full font-semibold">
                    Auditado
                  </span>
                </div>

                <!-- ROI & ARV Highlighting -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div class="bg-[#f5f2eb] border border-emerald-500/30 rounded-xl p-3.5">
                    <span class="text-[11px] text-slate-600 block mb-1">ROI Neto Proyectado</span>
                    <div class="text-2xl font-bold font-mono text-emerald-700 tracking-tight">
                      +{{ calculatedRoi() | number:'1.1-1' }}%
                    </div>
                    <div class="text-[10px] text-slate-500 font-mono mt-0.5">
                      Margen: +\${{ calculatedNetProfit() | number:'1.0-0' }} USD
                    </div>
                  </div>

                  <div class="bg-[#f5f2eb] border border-[#0c4a58]/30 rounded-xl p-3.5">
                    <span class="text-[11px] text-slate-600 block mb-1">Valor ARV Estimado</span>
                    <div class="text-2xl font-bold font-mono text-[#0c4a58] tracking-tight">
                      \${{ calculatedArv() | number:'1.0-0' }}
                    </div>
                    <div class="text-[10px] text-slate-500 font-mono mt-0.5">
                      Post-remodelación
                    </div>
                  </div>
                </div>

                <!-- Detailed Breakdown List -->
                <div class="bg-[#fbf9f5] border border-[#ded7cb] rounded-xl p-4 space-y-2.5 text-xs mb-5">
                  <div class="flex justify-between items-center">
                    <span class="text-slate-600">Presupuesto Total de Obra:</span>
                    <span class="font-mono font-bold text-[#0c4a58] text-sm">
                      \${{ calculatedRemodelCost() | number:'1.0-0' }} USD
                    </span>
                  </div>
                  <div class="flex justify-between items-center text-slate-600">
                    <span>Costo Promedio por m²:</span>
                    <span class="font-mono font-medium text-slate-900">
                      \${{ costPerSqm() | number:'1.0-0' }} USD / m²
                    </span>
                  </div>
                  <div class="flex justify-between items-center text-slate-600">
                    <span>Plazo de Ejecución:</span>
                    <span class="font-mono font-medium text-slate-900">
                      {{ calculatedExecutionWeeks() }} semanas ({{ calculatedExecutionMonths() }} meses)
                    </span>
                  </div>
                  <div class="flex justify-between items-center pt-2 border-t border-[#ded7cb] text-slate-600">
                    <span>Inversión Inicial / Base:</span>
                    <span class="font-mono font-medium text-slate-900">
                      \${{ effectiveBasePrice() | number:'1.0-0' }} USD
                    </span>
                  </div>
                  <div class="flex justify-between items-center text-slate-600">
                    <span>Inversión Total del Proyecto:</span>
                    <span class="font-mono font-semibold text-slate-900">
                      \${{ (effectiveBasePrice() + calculatedRemodelCost()) | number:'1.0-0' }} USD
                    </span>
                  </div>
                  <div class="flex justify-between items-center pt-2 border-t border-[#ded7cb] font-bold">
                    <span class="text-slate-900">Plusvalía Bruta Proyectada:</span>
                    <span class="font-mono text-emerald-700 text-sm">
                      +\${{ (calculatedArv() - effectiveBasePrice()) | number:'1.0-0' }} USD
                    </span>
                  </div>
                </div>

                <!-- Export Executive Budget Button -->
                @if (exportSuccess()) {
                  <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center mb-4 text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1.5 animate-fade-in">
                    <mat-icon class="text-emerald-700 text-base">check_circle</mat-icon>
                    <span>¡Presupuesto Fiduciario exportado y guardado exitosamente!</span>
                  </div>
                } @else {
                  <button
                    type="button"
                    id="export-budget-btn"
                    (click)="exportExecutiveBudget()"
                    class="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#f5f2eb] text-[#0c4a58] border border-[#0c4a58] font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 mb-4"
                  >
                    <mat-icon class="text-sm">download</mat-icon>
                    <span>Descargar Presupuesto Fiduciario (Dossier)</span>
                  </button>
                }

                <!-- Co-inversión / Pool Fiduciario Widget -->
                <div class="border-t border-[#ded7cb] pt-5">
                  <div class="flex items-center gap-2 mb-1.5">
                    <mat-icon class="text-[#0c4a58] text-base">group_work</mat-icon>
                    <h5 class="text-xs font-bold text-slate-900">
                      {{ i18n.t().flip.poolTitle }}
                    </h5>
                  </div>
                  <p class="text-[11px] text-slate-600 mb-3">
                    Participa con tickets fraccionados en la ejecución de este proyecto de valorización:
                  </p>

                  <!-- Ticket Selection -->
                  <div class="grid grid-cols-4 gap-1.5 font-mono text-xs mb-3">
                    @for (t of ticketOptions; track t) {
                      <button
                        type="button"
                        [id]="'ticket-opt-' + t"
                        (click)="selectedTicket.set(t)"
                        class="py-1.5 rounded-lg border text-center transition-all font-semibold text-[11px]"
                        [class.bg-[#0c4a58]]="selectedTicket() === t"
                        [class.text-white]="selectedTicket() === t"
                        [class.border-[#0c4a58]]="selectedTicket() === t"
                        [class.bg-[#fbf9f5]]="selectedTicket() !== t"
                        [class.text-slate-800]="selectedTicket() !== t"
                        [class.border-[#ded7cb]]="selectedTicket() !== t"
                        [class.hover:bg-[#eae4d7]]="selectedTicket() !== t"
                      >
                        \${{ t / 1000 }}k
                      </button>
                    }
                  </div>

                  <!-- Return on Ticket -->
                  <div class="bg-[#f5f2eb] p-2.5 rounded-xl border border-[#ded7cb] mb-3 flex items-center justify-between text-xs">
                    <div>
                      <span class="text-[10px] font-mono text-slate-500 block">Retorno Proyectado al Cierre:</span>
                      <span class="text-[11px] font-semibold text-slate-700">En {{ calculatedExecutionMonths() }} meses</span>
                    </div>
                    <div class="text-right">
                      <span class="font-bold font-mono text-emerald-700 leading-none block">
                        +\${{ projectedReturnOnTicket() | number:'1.0-0' }} USD
                      </span>
                      <span class="text-[10px] font-mono text-emerald-800 font-semibold">
                        +{{ calculatedRoi() | number:'1.0-0' }}% Neto
                      </span>
                    </div>
                  </div>

                  @if (pledgeSuccess()) {
                    <div class="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-center animate-fade-in">
                      <mat-icon class="text-emerald-700 text-2xl mb-1">verified</mat-icon>
                      <h6 class="text-xs font-bold text-emerald-900">{{ i18n.t().flip.pledgeSuccess }}</h6>
                      <p class="text-[10px] text-emerald-800 mt-0.5">{{ i18n.t().flip.pledgeSuccessDesc }}</p>
                    </div>
                  } @else {
                    <button
                      type="button"
                      id="pledge-calc-btn"
                      (click)="onPledge()"
                      class="w-full py-2.5 px-4 rounded-xl bg-[#0c4a58] hover:bg-[#13596b] text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <mat-icon class="text-sm">monetization_on</mat-icon>
                      <span>Co-Invertir \${{ selectedTicket() | number:'1.0-0' }} USD en este Proyecto</span>
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de Especificaciones Arquitectónicas (Ficha Técnica de Partida) -->
    @if (selectedModalItem(); as modalItem) {
      <div
        id="item-specs-modal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <div class="bg-white border border-[#ded7cb] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-900">
          <button
            type="button"
            (click)="selectedModalItem.set(null)"
            class="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f5f2eb] border border-[#ded7cb] text-slate-600 hover:text-slate-900 flex items-center justify-center"
          >
            <mat-icon class="text-sm">close</mat-icon>
          </button>

          <div class="flex items-center gap-2 text-xs font-mono text-[#0c4a58] font-bold uppercase mb-2">
            <mat-icon class="text-base">verified</mat-icon>
            <span>Especificación Arquitectónica Fiduciaria</span>
          </div>

          <h3 class="text-lg font-bold text-slate-900 mb-2">
            {{ modalItem.title }}
          </h3>

          <img
            [src]="modalItem.image"
            [alt]="modalItem.title"
            referrerpolicy="no-referrer"
            class="w-full h-44 object-cover rounded-xl border border-[#ded7cb] mb-4"
          />

          <p class="text-xs text-slate-600 leading-relaxed mb-4">
            {{ modalItem.description }}
          </p>

          <div class="bg-[#fbf9f5] border border-[#ded7cb] rounded-xl p-3.5 mb-4">
            <span class="text-xs font-bold text-slate-800 block mb-2 font-mono uppercase tracking-wider">
              Componentes & Materiales Incluidos:
            </span>
            <ul class="space-y-1.5 text-xs text-slate-700">
              @for (spec of modalItem.keySpecs; track spec) {
                <li class="flex items-center gap-2">
                  <mat-icon class="text-emerald-700 text-sm">check_circle</mat-icon>
                  <span>{{ spec }}</span>
                </li>
              }
            </ul>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center text-xs font-mono mb-5">
            <div class="p-2 rounded-lg bg-[#f5f2eb] border border-[#ded7cb]">
              <div class="text-[10px] text-slate-500">Costo Actual</div>
              <div class="font-bold text-[#0c4a58]">\${{ getCostForCurrentTier(modalItem) | number:'1.0-0' }}</div>
            </div>
            <div class="p-2 rounded-lg bg-[#f5f2eb] border border-[#ded7cb]">
              <div class="text-[10px] text-slate-500">Plazo Obra</div>
              <div class="font-bold text-slate-800">{{ modalItem.executionWeeks }} sem.</div>
            </div>
            <div class="p-2 rounded-lg bg-[#f5f2eb] border border-[#ded7cb]">
              <div class="text-[10px] text-slate-500">Plusvalía</div>
              <div class="font-bold text-emerald-700">+{{ modalItem.arvImpactPercent }}% ARV</div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2">
            <button
              type="button"
              (click)="selectedModalItem.set(null)"
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-[#f5f2eb] hover:bg-[#eae4d7] border border-[#ded7cb]"
            >
              Cerrar
            </button>
            <button
              type="button"
              (click)="toggleDirectoryItem(modalItem.id); selectedModalItem.set(null)"
              class="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0c4a58] hover:bg-[#13596b]"
            >
              {{ modalItem.selectedInCalculator ? 'Quitar de Calculadora' : 'Añadir a Calculadora' }}
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class FlipDetailView {
  readonly i18n = inject(I18nService);
  readonly propertyService = inject(PropertyService);

  readonly targetPropertyId = input<string | null>(null);

  // Available flip opportunities from service
  readonly flipOpportunities = computed(() => {
    return this.propertyService.properties().filter(p => p.isFlipOpportunity || p.status === 'flip-opportunity' || p.beforePhoto);
  });

  readonly selectedPropId = signal<string>('prop-1');

  readonly activeProp = computed(() => {
    const list = this.propertyService.properties();
    const id = this.targetPropertyId() || this.selectedPropId();
    return list.find(p => p.id === id) || list[0];
  });

  // Custom Property Mode State
  readonly customPropertyMode = signal<boolean>(false);
  readonly customPropertyName = signal<string>('Propiedad Residencial Personalizada');
  readonly customPropertyPrice = signal<number>(850000);

  // Renovation Calculator State
  readonly interventionSqm = signal<number>(340);
  readonly selectedTier = signal<FinishTier>('premium');
  readonly selectedTicket = signal<number>(10000);
  readonly pledgeSuccess = signal<boolean>(false);
  readonly exportSuccess = signal<boolean>(false);

  readonly ticketOptions = [5000, 10000, 25000, 50000];

  // Directory Category Filters
  readonly selectedCategory = signal<string>('all');

  readonly categoryFilters = [
    { id: 'all', label: 'Todas las Remodelaciones', icon: 'view_module' },
    { id: 'interior', label: 'Cocinas & Áreas Sociales', icon: 'soup_kitchen' },
    { id: 'baths', label: 'Baños & Spa Master', icon: 'bathtub' },
    { id: 'structural', label: 'Espacios Abiertos & Estructural', icon: 'crop_free' },
    { id: 'exterior', label: 'Fachadas, Deck & Exteriores', icon: 'deck' },
    { id: 'finishes', label: 'Pisos & Carpintería de Autor', icon: 'layers' },
    { id: 'systems', label: 'Domótica, Clima & Eficiencia', icon: 'hvac' }
  ];

  // Modal State for Item Specs
  readonly selectedModalItem = signal<RemodelingDirectoryItem | null>(null);

  // Comprehensive Directory of Remodeling Interventions
  readonly directoryItems = signal<RemodelingDirectoryItem[]>([
    {
      id: 'kitchen',
      nameKey: 'kitchen',
      title: 'Cocina Integral de Autor con Isla de Cuarzo & Miele',
      category: 'interior',
      categoryLabel: 'Cocinas & Áreas Sociales',
      description: 'Apertura de espacio, mobiliario a medida de cierre suave, isla central con cuarzo Calacatta, electrodomésticos empotrados panelables e iluminación LED perimetral.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      standardCost: 28000,
      premiumCost: 45000,
      signatureCost: 75000,
      executionWeeks: 5,
      arvImpactPercent: 16,
      roiPercent: 145,
      keySpecs: [
        'Isla en cascada con cuarzo Calacatta Gold 20mm',
        'Mobiliario termoestructurado con herrajes Blum Legrabox',
        'Torre de hornos y parrilla de inducción Miele',
        'Grifería monomando extraíble negro mate o latón cepillado'
      ],
      selectedInCalculator: true
    },
    {
      id: 'baths',
      nameKey: 'baths',
      title: 'Master Suite & Baños Spa con Mármol Calacatta',
      category: 'baths',
      categoryLabel: 'Baños & Spa Master',
      description: 'Ampliación de baño principal, doble lavabo flotante en madera maciza de nogal, ducha walk-in con cancel de cristal templado, tina exenta y nichos iluminados.',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
      standardCost: 18000,
      premiumCost: 32000,
      signatureCost: 52000,
      executionWeeks: 4,
      arvImpactPercent: 12,
      roiPercent: 130,
      keySpecs: [
        'Muros en porcelanato rectificado 120x260 efecto Calacatta',
        'Grifería empotrada termostática de techo con lluvia',
        'Tina exenta ergonómica en resina mineral mate',
        'Espejos retroiluminados antivaho con dimmer touch'
      ],
      selectedInCalculator: true
    },
    {
      id: 'openConcept',
      nameKey: 'openConcept',
      title: 'Reconfiguración Open-Concept & Eliminación de Muros',
      category: 'structural',
      categoryLabel: 'Espacios Abiertos',
      description: 'Supresión de muros no portantes, refuerzo estructural mediante viga metálica oculta, unificación de sala, comedor y cocina con máxima luminosidad natural.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      standardCost: 14000,
      premiumCost: 26000,
      signatureCost: 42000,
      executionWeeks: 3,
      arvImpactPercent: 14,
      roiPercent: 160,
      keySpecs: [
        'Cálculo y peritaje estructural con firma de DRO certificado',
        'Viga IPR de acero estructural empotrada en falso plafón',
        'Nivelación milimétrica de losas y forjados',
        'Ampliación visual y funcional del 35% del área social'
      ],
      selectedInCalculator: true
    },
    {
      id: 'facade',
      nameKey: 'facade',
      title: 'Fachada Contemporánea, Deck & Paisajismo Prime',
      category: 'exterior',
      categoryLabel: 'Fachadas & Exteriores',
      description: 'Revestimiento arquitectónico en piedra sinterizada y madera tecnológica composite, iluminación rasante cálida, deck exterior y vegetación xerófila elegante.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      standardCost: 16000,
      premiumCost: 30000,
      signatureCost: 50000,
      executionWeeks: 5,
      arvImpactPercent: 11,
      roiPercent: 135,
      keySpecs: [
        'Revestimiento Dekton / Neolith resistente a rayos UV',
        'Deck tecnológico antideslizante sin mantenimiento',
        'Iluminación lineal IP67 arquitectónica de bajo consumo',
        'Sistema de riego por goteo automatizado con sensor de humedad'
      ],
      selectedInCalculator: true
    },
    {
      id: 'floors',
      nameKey: 'floors',
      title: 'Pisos de Madera Natural Roble Europeo de Gran Formato',
      category: 'finishes',
      categoryLabel: 'Pisos & Acabados',
      description: 'Piso de madera de ingeniería en roble europeo cepillado al aceite mate en lamas anchas de 240mm, con membrana acústica subyacente de alta densidad.',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
      standardCost: 12000,
      premiumCost: 22000,
      signatureCost: 38000,
      executionWeeks: 2,
      arvImpactPercent: 8,
      roiPercent: 125,
      keySpecs: [
        'Madera noble de roble europeo certificado FSC',
        'Tratamiento al aceite mate de alta resistencia UV',
        'Aislamiento acústico a ruido de impacto (-21 dB)',
        'Zoclos y rodapiés enrasados a muro de diseño minimalista'
      ],
      selectedInCalculator: false
    },
    {
      id: 'automation',
      nameKey: 'automation',
      title: 'Domótica Integral Lutron, Audio & Seguridad Biometría',
      category: 'systems',
      categoryLabel: 'Domótica & Eficiencia',
      description: 'Control de escenas lumínicas Lutron Palladiom, audio multizona empotrado en techo, cerraduras digitales biométricas y control centralizado desde app móvil.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      standardCost: 12000,
      premiumCost: 24000,
      signatureCost: 40000,
      executionWeeks: 3,
      arvImpactPercent: 9,
      roiPercent: 140,
      keySpecs: [
        'Botoneras Lutron Palladiom en cristal y metal cepillado',
        'Bocinas de alta fidelidad Sonance invisibles en plafón',
        'Acceso peatonal con teclado numérico, huella y Apple Wallet',
        'Monitoreo perimetral con cámaras 4K y almacenamiento seguro'
      ],
      selectedInCalculator: true
    },
    {
      id: 'hvac',
      nameKey: 'hvac',
      title: 'Sistema HVAC Inverter de Alta Eficiencia & Filtración',
      category: 'systems',
      categoryLabel: 'Domótica & Eficiencia',
      description: 'Equipos fan-coil ocultos con zonificación independiente por recámara, compresores inverter de bajo decibelio y filtros HEPA de purificación activa.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      standardCost: 15000,
      premiumCost: 26000,
      signatureCost: 42000,
      executionWeeks: 3,
      arvImpactPercent: 8,
      roiPercent: 120,
      keySpecs: [
        'Eficiencia energética SEER 21+ con reducción de consumo del 40%',
        'Zonificación digital independiente con termostatos Nest/Ecobee',
        'Rejillas lineales difusoras de aire arquitectónicas invisibles',
        'Aislamiento térmico en ductería para cero condensación'
      ],
      selectedInCalculator: false
    },
    {
      id: 'rooftop',
      nameKey: 'rooftop',
      title: 'Rooftop Lounge, Pérgola Bioclimática & Zona BBQ',
      category: 'exterior',
      categoryLabel: 'Fachadas & Exteriores',
      description: 'Transformación de azotea o terraza con pérgola de lamas orientables automatizadas, barra exterior de granito con asador inoxidable empotrado y barandal de cristal templado.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      standardCost: 22000,
      premiumCost: 42000,
      signatureCost: 68000,
      executionWeeks: 5,
      arvImpactPercent: 15,
      roiPercent: 150,
      keySpecs: [
        'Pérgola bioclimática de aluminio termolacado con iluminación LED',
        'Asador de gas y carbón de acero inoxidable grado 316',
        'Barandales de cristal laminado 10+10 con sujeción oculta',
        'Revestimiento cerámico antideslizante clase 3 en piso'
      ],
      selectedInCalculator: false
    }
  ]);

  // Filtered Directory Items based on category
  readonly filteredDirectoryItems = computed(() => {
    const cat = this.selectedCategory();
    const items = this.directoryItems();
    if (cat === 'all') return items;
    return items.filter(item => item.category === cat);
  });

  // Count active in calculator
  readonly activeItemsCount = computed(() => {
    return this.directoryItems().filter(i => i.selectedInCalculator).length;
  });

  // Are all work items selected
  readonly allWorkItemsSelected = computed(() => {
    return this.directoryItems().every(i => i.selectedInCalculator);
  });

  // Effective Base Price for calculation
  readonly effectiveBasePrice = computed(() => {
    if (this.customPropertyMode()) {
      return this.customPropertyPrice();
    }
    return this.activeProp().price;
  });

  // Get cost for current tier
  getCostForCurrentTier(item: RemodelingDirectoryItem): number {
    const tier = this.selectedTier();
    if (tier === 'standard') return item.standardCost;
    if (tier === 'signature') return item.signatureCost;
    return item.premiumCost;
  }

  // Toggle item in directory & calculator
  toggleDirectoryItem(id: string): void {
    this.directoryItems.update(items =>
      items.map(i => i.id === id ? { ...i, selectedInCalculator: !i.selectedInCalculator } : i)
    );
    this.exportSuccess.set(false);
  }

  toggleAllWorkItems(): void {
    const selectAll = !this.allWorkItemsSelected();
    this.directoryItems.update(items =>
      items.map(i => ({ ...i, selectedInCalculator: selectAll }))
    );
    this.exportSuccess.set(false);
  }

  openItemSpecsModal(item: RemodelingDirectoryItem): void {
    this.selectedModalItem.set(item);
  }

  selectProperty(id: string): void {
    this.selectedPropId.set(id);
    const p = this.propertyService.properties().find(item => item.id === id);
    if (p) {
      this.interventionSqm.set(p.sqm);
    }
    this.pledgeSuccess.set(false);
    this.exportSuccess.set(false);
  }

  setFinishTier(tier: FinishTier): void {
    this.selectedTier.set(tier);
    this.exportSuccess.set(false);
  }

  // Calculated Remodel Budget
  readonly calculatedRemodelCost = computed(() => {
    const sqm = this.interventionSqm();
    const tier = this.selectedTier();
    let baseRate = 750;
    if (tier === 'standard') baseRate = 420;
    if (tier === 'signature') baseRate = 1180;

    // Base structural finish per m²
    const basePrepCost = sqm * (baseRate * 0.22);
    // Work package sum
    const itemsCost = this.directoryItems()
      .filter(i => i.selectedInCalculator)
      .reduce((sum, item) => sum + this.getCostForCurrentTier(item), 0);

    return Math.round(basePrepCost + itemsCost);
  });

  // Cost breakdown
  readonly budgetBreakdown = computed(() => {
    const total = this.calculatedRemodelCost();
    return {
      materials: Math.round(total * 0.45),
      labor: Math.round(total * 0.35),
      permits: Math.round(total * 0.10),
      contingency: Math.round(total * 0.10)
    };
  });

  // Cost per m²
  readonly costPerSqm = computed(() => {
    const sqm = this.interventionSqm() || 1;
    return Math.round(this.calculatedRemodelCost() / sqm);
  });

  // Calculated ARV
  readonly calculatedArv = computed(() => {
    const basePrice = this.effectiveBasePrice();
    const activeItems = this.directoryItems().filter(i => i.selectedInCalculator);
    const combinedImpactFraction = activeItems.reduce((acc, i) => acc + (i.arvImpactPercent / 100), 0);

    // Baseline appreciation + compounding impact
    let multiplier = 1.15 + (combinedImpactFraction * 0.75);
    if (this.selectedTier() === 'signature') multiplier += 0.08;
    if (this.selectedTier() === 'standard') multiplier -= 0.04;

    return Math.round(basePrice * multiplier);
  });

  // Net Profit
  readonly calculatedNetProfit = computed(() => {
    const arv = this.calculatedArv();
    const base = this.effectiveBasePrice();
    const remodel = this.calculatedRemodelCost();
    return Math.max(0, arv - (base + remodel));
  });

  // Projected ROI %
  readonly calculatedRoi = computed(() => {
    const net = this.calculatedNetProfit();
    const totalInvested = this.effectiveBasePrice() + this.calculatedRemodelCost();
    if (totalInvested <= 0) return 0;
    return Math.round((net / totalInvested) * 1000) / 10;
  });

  readonly calculatedExecutionWeeks = computed(() => {
    const active = this.directoryItems().filter(i => i.selectedInCalculator);
    if (active.length === 0) return 4;
    // Overlapping schedule calculation
    const maxSingleWeek = Math.max(...active.map(i => i.executionWeeks));
    const extraWeeks = Math.round(active.length * 0.7);
    return Math.min(36, Math.max(6, maxSingleWeek + extraWeeks));
  });

  readonly calculatedExecutionMonths = computed(() => {
    return Math.max(2, Math.round(this.calculatedExecutionWeeks() / 4));
  });

  readonly projectedReturnOnTicket = computed(() => {
    const ticket = this.selectedTicket();
    const roi = this.calculatedRoi();
    return Math.round(ticket * (roi / 100));
  });

  exportExecutiveBudget(): void {
    this.exportSuccess.set(true);
    setTimeout(() => {
      this.exportSuccess.set(false);
    }, 4500);
  }

  onPledge(): void {
    const propId = this.customPropertyMode() ? 'prop-custom' : this.activeProp().id;
    this.propertyService.pledgeTicket(propId, this.selectedTicket());
    this.pledgeSuccess.set(true);
  }
}
