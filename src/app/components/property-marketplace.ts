import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PropertyCardComponent } from './property-card';
import { PropertyService } from '../services/property.service';
import { I18nService } from '../services/i18n.service';
import { Property, PropertyStatus, PropertyType } from '../models/property.model';

interface CityCluster {
  id: string;
  name: string;
  count: number;
  centerLat: number;
  centerLng: number;
  zoomLevel: number;
}

@Component({
  selector: 'app-property-marketplace',
  imports: [CommonModule, DecimalPipe, FormsModule, MatIconModule, PropertyCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="marketplace-section" class="w-full bg-[#fbf9f5] text-slate-900 py-8 border-t border-[#ded7cb]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#0c4a58] mb-1 font-bold">
              <mat-icon class="text-base leading-none">travel_explore</mat-icon>
              <span>PropTech Geodata • Split-Screen Engine</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {{ i18n.t().marketplace.title }}
            </h2>
            <p class="text-sm text-slate-600 mt-1 max-w-2xl">
              {{ i18n.t().marketplace.subtitle }}
            </p>
          </div>

          <!-- View Mode Switcher -->
          <div class="flex items-center gap-2 bg-[#eae4d7] p-1 rounded-lg border border-[#ded7cb]">
            <button
              type="button"
              id="mode-investment-btn"
              (click)="setViewMode('investment')"
              class="px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
              [class.bg-[#0c4a58]]="propertyService.viewMode() === 'investment'"
              [class.text-white]="propertyService.viewMode() === 'investment'"
              [class.shadow-sm]="propertyService.viewMode() === 'investment'"
              [class.text-slate-700]="propertyService.viewMode() !== 'investment'"
            >
              <mat-icon class="text-sm">insights</mat-icon>
              <span>{{ i18n.t().card.modeInvestment }}</span>
            </button>
            <button
              type="button"
              id="mode-standard-btn"
              (click)="setViewMode('standard')"
              class="px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
              [class.bg-[#0c4a58]]="propertyService.viewMode() === 'standard'"
              [class.text-white]="propertyService.viewMode() === 'standard'"
              [class.shadow-sm]="propertyService.viewMode() === 'standard'"
              [class.text-slate-700]="propertyService.viewMode() !== 'standard'"
            >
              <mat-icon class="text-sm">apartment</mat-icon>
              <span>{{ i18n.t().card.modeStandard }}</span>
            </button>
          </div>
        </div>

        <!-- Sticky Filter Bar -->
        <div class="sticky top-16 z-30 bg-[#f5f2eb]/95 backdrop-blur-md border border-[#ded7cb] rounded-xl p-3.5 shadow-sm mb-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <!-- Search by text -->
            <div class="relative lg:col-span-2">
              <mat-icon class="absolute left-3 top-2.5 text-slate-400 text-lg">search</mat-icon>
              <input
                type="text"
                id="search-input-filter"
                [ngModel]="propertyService.searchQuery()"
                (ngModelChange)="propertyService.searchQuery.set($event)"
                [placeholder]="i18n.t().marketplace.filterLocation + ' (Miami, Austin, Polanco, Madrid...)'"
                class="w-full bg-white border border-[#ded7cb] rounded-lg pl-9 pr-8 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c4a58]"
              />
              @if (propertyService.searchQuery()) {
                <button
                  type="button"
                  (click)="propertyService.searchQuery.set('')"
                  class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
                >
                  <mat-icon class="text-sm">close</mat-icon>
                </button>
              }
            </div>

            <!-- Property Type Select -->
            <div>
              <select
                id="type-filter-select"
                [ngModel]="propertyService.selectedType()"
                (ngModelChange)="onTypeChange($event)"
                class="w-full bg-white border border-[#ded7cb] rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0c4a58]"
              >
                <option value="all">{{ i18n.t().marketplace.allTypes }}</option>
                <option value="penthouse">{{ i18n.t().marketplace.penthouse }}</option>
                <option value="villa">{{ i18n.t().marketplace.villa }}</option>
                <option value="condo">{{ i18n.t().marketplace.condo }}</option>
                <option value="single-family">{{ i18n.t().marketplace.singleFamily }}</option>
              </select>
            </div>

            <!-- Status / Legal Model Select -->
            <div>
              <select
                id="status-filter-select"
                [ngModel]="propertyService.selectedStatus()"
                (ngModelChange)="onStatusChange($event)"
                class="w-full bg-white border border-[#ded7cb] rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0c4a58]"
              >
                <option value="all">{{ i18n.t().marketplace.allStatuses }}</option>
                <option value="auction">⚖️ {{ i18n.t().card.badges.auction }}</option>
                <option value="active-auction">⚡ {{ i18n.t().card.badges['active-auction'] }}</option>
                <option value="flip-opportunity">📈 {{ i18n.t().card.badges['flip-opportunity'] }}</option>
                <option value="verified">🛡️ {{ i18n.t().card.badges.verified }}</option>
              </select>
            </div>

            <!-- Reset / Counter -->
            <div class="flex items-center justify-between gap-2">
              <span class="text-xs font-mono text-slate-600">
                <strong class="text-[#0c4a58] font-bold">{{ propertyService.filteredProperties().length }}</strong> {{ i18n.t().marketplace.resultsCount }}
              </span>

              <button
                type="button"
                id="reset-filters-btn"
                (click)="propertyService.resetFilters()"
                class="px-2.5 py-1.5 rounded bg-[#eae4d7] hover:bg-[#ded7cb] text-[11px] text-slate-800 font-medium transition-colors border border-[#ded7cb] flex items-center gap-1"
              >
                <mat-icon class="text-xs">restart_alt</mat-icon>
                <span>{{ i18n.t().marketplace.resetFilters }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Split Screen Layout: List (Left) + Interactive Map (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <!-- Columna Izquierda (Lista de Propiedades, 7 cols en escritorio) -->
          <div class="lg:col-span-7 space-y-4">
            <div class="flex items-center justify-between text-xs text-slate-500 font-mono pb-1 border-b border-[#ded7cb]">
              <span class="flex items-center gap-1">
                <mat-icon class="text-xs text-[#0c4a58]">sync</mat-icon>
                {{ i18n.t().marketplace.syncNotice }}
              </span>
            </div>

            @if (propertyService.filteredProperties().length === 0) {
              <div class="bg-white border border-[#ded7cb] rounded-xl p-8 text-center shadow-sm">
                <mat-icon class="text-4xl text-slate-400 mb-2">search_off</mat-icon>
                <p class="text-slate-700 text-sm font-medium">{{ i18n.t().marketplace.noResults }}</p>
                <button
                  type="button"
                  (click)="propertyService.resetFilters()"
                  class="mt-3 px-4 py-2 rounded bg-[#0c4a58] text-white font-semibold text-xs shadow-sm hover:bg-[#13596b] transition-colors"
                >
                  {{ i18n.t().marketplace.resetFilters }}
                </button>
              </div>
            } @else {
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                @for (item of propertyService.filteredProperties(); track item.id) {
                  <app-property-card
                    [property]="item"
                    [viewMode]="propertyService.viewMode()"
                    (inspectClick)="onInspect(item)"
                    (cardClick)="onSelect(item)"
                  />
                }
              </div>
            }
          </div>

          <!-- Columna Derecha (Mapa Interactivo Estilizado con Pines Dinámicos, 5 cols) -->
          <div class="lg:col-span-5 lg:sticky lg:top-36 h-[600px] lg:h-[720px] rounded-xl overflow-hidden border border-[#ded7cb] bg-[#eef1ed] shadow-md flex flex-col relative">
            <!-- Map Top Toolbar -->
            <div class="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
              <div class="flex items-center gap-1.5 pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#ded7cb] shadow-sm">
                <span class="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span class="text-[11px] font-mono font-semibold text-slate-800">
                  Cluster: {{ selectedCluster().name }}
                </span>
              </div>

              <!-- Cluster Selector Dropdown -->
              <div class="pointer-events-auto flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-lg border border-[#ded7cb] shadow-sm">
                @for (c of clusters; track c.id) {
                  <button
                    type="button"
                    (click)="selectCluster(c)"
                    class="px-2 py-1 rounded text-[10px] font-mono font-medium transition-colors"
                    [class.bg-[#0c4a58]]="selectedCluster().id === c.id"
                    [class.text-white]="selectedCluster().id === c.id"
                    [class.text-slate-700]="selectedCluster().id !== c.id"
                    [class.hover:bg-[#eae4d7]]="selectedCluster().id !== c.id"
                  >
                    {{ c.id.toUpperCase() }}
                  </button>
                }
              </div>
            </div>

            <!-- Stylized Architectural Vector Map Canvas / SVG -->
            <div class="w-full h-full relative overflow-hidden bg-[#ebe6dd] flex items-center justify-center select-none">
              <!-- Soft Warm Vignette -->
              <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-50/20 via-stone-200/40 to-[#dfd7ca]"></div>

              <!-- Cartographic Grid Lines -->
              <svg class="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cartoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b4aa98" stroke-width="0.75" stroke-dasharray="2 3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cartoGrid)" />
              </svg>

              <!-- Stylized Geographic Contours & Water Body Representation -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 600" preserveAspectRatio="none">
                <!-- Water Coast / River Line -->
                <path
                  d="M 500,80 Q 320,160 280,320 T 360,540 L 500,600 Z"
                  fill="#b9cbce"
                  opacity="0.6"
                />
                <!-- Secondary Highway Arteries -->
                <path d="M 0,220 C 140,240 320,180 500,280" fill="none" stroke="#d5ccbd" stroke-width="3" opacity="0.8"/>
                <path d="M 220,0 C 240,180 200,380 260,600" fill="none" stroke="#d5ccbd" stroke-width="3" opacity="0.8"/>
                <path d="M 50,450 Q 240,420 450,480" fill="none" stroke="#c4b8a4" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.7"/>
              </svg>

              <!-- Interactive Dynamic Price Markers -->
              <div class="absolute inset-0 p-8">
                @for (item of propertyService.filteredProperties(); track item.id; let idx = $index) {
                  <!-- Calculated position on the visual map board -->
                  <button
                    type="button"
                    [id]="'map-pin-' + item.id"
                    class="absolute transition-all duration-300 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10 hover:z-30 bg-transparent border-0 p-0 text-left"
                    [style.left]="getPinX(idx) + '%'"
                    [style.top]="getPinY(idx) + '%'"
                    (mouseenter)="onMarkerHover(item.id)"
                    (mouseleave)="onMarkerLeave()"
                    (click)="onMarkerClick(item)"
                    [attr.aria-label]="item.title + ' - $' + item.price"
                  >
                    <!-- Price Tag Pill with Ring -->
                    <div
                      class="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold shadow-md border transition-transform duration-200"
                      [class.scale-125]="propertyService.hoveredPropertyId() === item.id || propertyService.selectedPropertyId() === item.id"
                      [class.ring-4]="propertyService.hoveredPropertyId() === item.id || propertyService.selectedPropertyId() === item.id"
                      [class.ring-[#0c4a58]/30]="propertyService.hoveredPropertyId() === item.id || propertyService.selectedPropertyId() === item.id"
                      [class.bg-[#0c4a58]]="propertyService.hoveredPropertyId() === item.id || propertyService.selectedPropertyId() === item.id"
                      [class.text-white]="propertyService.hoveredPropertyId() === item.id || propertyService.selectedPropertyId() === item.id"
                      [class.bg-white]="propertyService.hoveredPropertyId() !== item.id && propertyService.selectedPropertyId() !== item.id"
                      [class.text-slate-900]="propertyService.hoveredPropertyId() !== item.id && propertyService.selectedPropertyId() !== item.id"
                      [class.border-[#b8860b]]="item.status === 'auction' || item.status === 'active-auction'"
                      [class.border-emerald-600]="item.status === 'flip-opportunity'"
                      [class.border-[#ded7cb]]="item.status !== 'auction' && item.status !== 'active-auction' && item.status !== 'flip-opportunity'"
                    >
                      @if (item.status === 'auction' || item.status === 'active-auction') {
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      } @else if (item.status === 'flip-opportunity') {
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      }
                      <span>\${{ formatCompactPrice(item.price) }}</span>
                    </div>

                    <!-- Bottom Pointer triangle -->
                    <div
                      class="w-0 h-0 mx-auto border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent transition-colors"
                      [class.border-t-[#0c4a58]]="propertyService.hoveredPropertyId() === item.id || propertyService.selectedPropertyId() === item.id"
                      [class.border-t-white]="propertyService.hoveredPropertyId() !== item.id && propertyService.selectedPropertyId() !== item.id"
                    ></div>
                  </button>
                }
              </div>

              <!-- Active Property Floating Card Preview on Map -->
              @if (activePropertyForPreview(); as prop) {
                <div class="absolute bottom-4 inset-x-4 z-20 bg-white/95 border border-[#ded7cb] rounded-xl p-3 shadow-xl backdrop-blur-md flex gap-3 animate-fade-in text-slate-900">
                  <img
                    [src]="prop.photos[0]"
                    [alt]="prop.title"
                    referrerpolicy="no-referrer"
                    class="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1">
                      <span class="text-[10px] uppercase font-mono font-bold text-[#b8860b] truncate">
                        {{ prop.neighborhood }}
                      </span>
                      <span class="text-[11px] font-mono text-emerald-700 font-semibold">
                        ROI +{{ prop.estimatedRoi }}%
                      </span>
                    </div>
                    <h4 class="text-xs font-semibold text-slate-900 truncate mt-0.5">{{ prop.title }}</h4>
                    <div class="flex items-center justify-between mt-1">
                      <span class="text-sm font-bold font-mono text-slate-900">
                        \${{ prop.price | number:'1.0-0' }} USD
                      </span>
                      <button
                        type="button"
                        (click)="onInspect(prop)"
                        class="px-2.5 py-1 rounded bg-[#0c4a58] hover:bg-[#13596b] text-white text-[10px] font-bold transition-colors shadow-sm"
                      >
                        {{ i18n.t().card.viewDetail }}
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Map Bottom Controls -->
            <div class="p-3 bg-[#f5f2eb] border-t border-[#ded7cb] flex items-center justify-between text-xs text-slate-600">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1 text-[11px] font-mono">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span> Remates / Subastas
                </span>
                <span class="flex items-center gap-1 text-[11px] font-mono">
                  <span class="w-2 h-2 rounded-full bg-emerald-600"></span> Flips de Alto Rendimiento
                </span>
              </div>
              <span class="text-[10px] font-mono text-slate-500">
                Lat: {{ selectedCluster().centerLat | number:'1.2-2' }}, Lng: {{ selectedCluster().centerLng | number:'1.2-2' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class PropertyMarketplaceView {
  readonly i18n = inject(I18nService);
  readonly propertyService = inject(PropertyService);

  readonly inspectProperty = output<Property>();

  readonly clusters: CityCluster[] = [
    { id: 'global', name: 'Global Portfolio', count: 6, centerLat: 25.76, centerLng: -80.19, zoomLevel: 11 },
    { id: 'mia', name: 'Miami, FL', count: 1, centerLat: 25.7594, centerLng: -80.1918, zoomLevel: 14 },
    { id: 'cdmx', name: 'Polanco, CDMX', count: 1, centerLat: 19.4326, centerLng: -99.1950, zoomLevel: 14 },
    { id: 'atx', name: 'Austin, TX', count: 1, centerLat: 30.2701, centerLng: -97.7490, zoomLevel: 14 },
    { id: 'mad', name: 'Salamanca, MAD', count: 1, centerLat: 40.4319, centerLng: -3.6883, zoomLevel: 14 },
    { id: 'phx', name: 'Scottsdale, AZ', count: 1, centerLat: 33.5092, centerLng: -111.9261, zoomLevel: 14 },
  ];

  readonly selectedCluster = signal<CityCluster>(this.clusters[0]);

  readonly activePropertyForPreview = computed(() => {
    const hoveredId = this.propertyService.hoveredPropertyId();
    const selectedId = this.propertyService.selectedPropertyId();
    const targetId = hoveredId || selectedId;
    return this.propertyService.properties().find(p => p.id === targetId) || null;
  });

  selectCluster(c: CityCluster): void {
    this.selectedCluster.set(c);
  }

  setViewMode(mode: 'investment' | 'standard'): void {
    this.propertyService.viewMode.set(mode);
  }

  onTypeChange(val: string): void {
    this.propertyService.selectedType.set(val as PropertyType | 'all');
  }

  onStatusChange(val: string): void {
    this.propertyService.selectedStatus.set(val as PropertyStatus | 'all');
  }

  onInspect(prop: Property): void {
    this.inspectProperty.emit(prop);
  }

  onSelect(prop: Property): void {
    this.propertyService.selectProperty(prop.id);
  }

  onMarkerHover(id: string): void {
    this.propertyService.setHoveredProperty(id);
  }

  onMarkerLeave(): void {
    this.propertyService.setHoveredProperty(null);
  }

  onMarkerClick(prop: Property): void {
    this.propertyService.selectProperty(prop.id);
  }

  formatCompactPrice(price: number): string {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(2) + 'M';
    }
    return (price / 1000).toFixed(0) + 'K';
  }

  // Helper coordinate pins mapped inside the stylized map canvas
  getPinX(idx: number): number {
    const fixedX = [28, 62, 44, 76, 32, 58];
    return fixedX[idx % fixedX.length];
  }

  getPinY(idx: number): number {
    const fixedY = [35, 48, 68, 26, 75, 40];
    return fixedY[idx % fixedY.length];
  }
}
