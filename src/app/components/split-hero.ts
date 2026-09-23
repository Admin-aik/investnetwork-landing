import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PropertyService } from '../services/property.service';
import { I18nService } from '../services/i18n.service';
import { NavigationService } from '../services/navigation.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-split-hero',
  imports: [CommonModule, DecimalPipe, FormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="relative w-full bg-[#f5f2eb] overflow-hidden pt-6 pb-12 border-b border-[#ded7cb]">
      <!-- Ambient Glow Behind Hero -->
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -top-20 right-0 w-96 h-96 bg-teal-800/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 60% Left / 40% Right Desktop Split Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          <!-- Columna Izquierda (60% ancho en escritorio, 7/12 cols): Slider Cinemático Panorámico -->
          <div class="lg:col-span-7 flex flex-col justify-between">
            <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/11] rounded-2xl overflow-hidden bg-slate-950 border border-[#ded7cb] shadow-lg group">
              <!-- Background Panoramic Property Photography -->
              <img
                [src]="currentSlide().photos[activePhotoIndex()]"
                [alt]="currentSlide().title"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <!-- Optical Contrast Vignette & Degradado de Legibilidad -->
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none"></div>
              <div class="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent pointer-events-none"></div>

              <!-- Top Left Badge Strip -->
              <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span class="px-3 py-1 rounded-[6px] text-xs font-semibold tracking-wide border uppercase bg-slate-950/70 text-amber-300 border-amber-500/40 backdrop-blur-md">
                  {{ currentSlide().neighborhood }} • {{ currentSlide().city }}
                </span>
                <span class="px-2 py-0.5 rounded-[6px] text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  ROI +{{ currentSlide().estimatedRoi }}%
                </span>
              </div>

              <!-- Slider Navigation Dots (Top Right) -->
              <div class="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                @for (item of featuredProperties(); track item.id; let idx = $index) {
                  <button
                    type="button"
                    (click)="setSlideIndex(idx)"
                    class="w-2 h-2 rounded-full transition-all"
                    [class.bg-amber-400]="activeSlideIndex() === idx"
                    [class.w-5]="activeSlideIndex() === idx"
                    [class.bg-white/40]="activeSlideIndex() !== idx"
                    [attr.aria-label]="'Diapositiva ' + (idx + 1)"
                  ></button>
                }
              </div>

              <!-- Low-Profile Glassmorphic Dock Anclado en la Franja Inferior -->
              <div class="absolute bottom-3 inset-x-3 z-10 glass-dock rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div class="text-[10px] uppercase font-mono tracking-wider text-slate-300">
                    Oportunidad de Inversión Seleccionada
                  </div>
                  <h3 class="text-sm sm:text-base font-bold text-white truncate max-w-sm">
                    {{ currentSlide().title }}
                  </h3>
                  <!-- Trifecta Habitacional in single line -->
                  <div class="flex items-center gap-3 text-xs text-slate-200 font-mono mt-0.5">
                    <span>{{ currentSlide().bedrooms }} Rec.</span>
                    <span class="text-slate-400">•</span>
                    <span>{{ currentSlide().bathrooms }} Baños</span>
                    <span class="text-slate-400">•</span>
                    <span>{{ currentSlide().sqm }} m²</span>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="text-right">
                    <span class="text-[10px] uppercase font-mono text-amber-300 block">
                      Precio de Compra / ARV
                    </span>
                    <span class="text-sm font-bold font-mono text-white">
                      \${{ currentSlide().price | number:'1.0-0' }} <span class="text-amber-300">/ \${{ currentSlide().arv | number:'1.0-0' }}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    id="hero-inspect-btn"
                    (click)="onInspect(currentSlide())"
                    class="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1 shadow-md whitespace-nowrap"
                  >
                    <span>{{ i18n.t().hero.inspectProperty }}</span>
                    <mat-icon class="text-sm leading-none">arrow_forward</mat-icon>
                  </button>
                </div>
              </div>
            </div>

            <!-- Tirilla de Miniaturas de Propiedades Destacadas -->
            <div class="grid grid-cols-4 gap-2.5 mt-3">
              @for (item of featuredProperties(); track item.id; let idx = $index) {
                <button
                  type="button"
                  (click)="setSlideIndex(idx)"
                  class="relative aspect-[16/10] rounded-lg overflow-hidden border transition-all text-left group/thumb"
                  [class.border-[#0c4a58]]="activeSlideIndex() === idx"
                  [class.ring-2]="activeSlideIndex() === idx"
                  [class.ring-[#0c4a58]/50]="activeSlideIndex() === idx"
                  [class.border-[#ded7cb]]="activeSlideIndex() !== idx"
                  [class.opacity-70]="activeSlideIndex() !== idx"
                  [class.hover:opacity-100]="activeSlideIndex() !== idx"
                >
                  <img
                    [src]="item.photos[0]"
                    [alt]="item.title"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <span class="absolute bottom-1 left-1.5 right-1.5 text-[10px] font-mono font-semibold text-white truncate block">
                    {{ item.city }}
                  </span>
                </button>
              }
            </div>
          </div>

          <!-- Columna Derecha (40% ancho en escritorio, 5/12 cols): Titular, Buscador & Confianza Fiduciaria -->
          <div class="lg:col-span-5 flex flex-col justify-between bg-white border border-[#ded7cb] rounded-2xl p-6 sm:p-8 shadow-sm">
            <div>
              <!-- Platform Badge -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eae4d7] border border-[#ded7cb] text-[#0c4a58] text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
                <span class="w-1.5 h-1.5 rounded-full bg-[#0c4a58] animate-pulse"></span>
                <span>{{ i18n.t().hero.badge }}</span>
              </div>

              <!-- Titular Principal con Énfasis Dorado -->
              <h1 class="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {{ i18n.t().hero.headlineStart }}
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#b8860b] via-[#c28b1e] to-amber-600 font-black">
                  {{ i18n.t().hero.headlineGold }}
                </span>
              </h1>

              <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {{ i18n.t().hero.subtitle }}
              </p>

              <!-- Barra de Búsqueda por Colonia / Ubicación -->
              <div class="mt-6">
                <div class="relative flex items-center">
                  <mat-icon class="absolute left-3.5 text-slate-400 text-lg">search</mat-icon>
                  <input
                    type="text"
                    id="hero-search-input"
                    [placeholder]="i18n.t().hero.searchPlaceholder"
                    [ngModel]="searchQuery()"
                    (ngModelChange)="onSearchChange($event)"
                    (keyup.enter)="onSearchSubmit()"
                    class="w-full bg-[#fbf9f5] border border-[#ded7cb] rounded-xl pl-10 pr-24 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c4a58] shadow-inner"
                  />
                  <button
                    type="button"
                    id="hero-search-submit-btn"
                    (click)="onSearchSubmit()"
                    class="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#0c4a58] hover:bg-[#13596b] text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Buscar</span>
                  </button>
                </div>

                <!-- Accesos Directos de Búsqueda Rápida -->
                <div class="flex items-center gap-1.5 mt-2.5 flex-wrap">
                  <span class="text-[11px] text-slate-500 font-mono">Popular:</span>
                  @for (tag of i18n.t().hero.quickTags; track tag) {
                    <button
                      type="button"
                      (click)="onQuickTagClick(tag)"
                      class="px-2 py-0.5 rounded text-[10px] font-mono text-slate-700 bg-[#eae4d7] hover:bg-[#0c4a58] hover:text-white transition-colors border border-[#ded7cb]"
                    >
                      {{ tag }}
                    </button>
                  }
                </div>

                <!-- Primary & Secondary Landing Page Action Buttons (Visible Without Scroll) -->
                <div class="flex flex-col sm:flex-row items-center gap-2.5 mt-5">
                  <button
                    type="button"
                    id="hero-primary-cta-btn"
                    (click)="navService.navigate('marketplace')"
                    class="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 hover:shadow-lg"
                  >
                    <span>Explorar Activos Prime</span>
                    <mat-icon class="text-base leading-none">arrow_forward</mat-icon>
                  </button>

                  <button
                    type="button"
                    id="hero-secondary-cta-btn"
                    (click)="navService.navigate('como-funciona')"
                    class="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#f5f2eb] hover:bg-[#eae4d7] border border-[#ded7cb] text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <mat-icon class="text-base text-[#0c4a58]">timeline</mat-icon>
                    <span>Cómo Funciona</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Métricas de Confianza Fiduciaria (Tabular Mono Figures) -->
            <div class="pt-6 mt-6 border-t border-[#ded7cb]">
              <div class="grid grid-cols-3 gap-2 text-center">
                <div class="bg-[#fbf9f5] p-2.5 rounded-xl border border-[#ded7cb]">
                  <div class="text-xl sm:text-2xl font-bold font-mono text-[#b8860b] tracking-tight">
                    {{ i18n.t().hero.stat1Value }}
                  </div>
                  <div class="text-[10px] text-slate-600 font-medium mt-0.5 leading-tight">
                    {{ i18n.t().hero.stat1Label }}
                  </div>
                </div>

                <div class="bg-[#fbf9f5] p-2.5 rounded-xl border border-[#ded7cb]">
                  <div class="text-xl sm:text-2xl font-bold font-mono text-emerald-700 tracking-tight">
                    {{ i18n.t().hero.stat2Value }}
                  </div>
                  <div class="text-[10px] text-slate-600 font-medium mt-0.5 leading-tight">
                    {{ i18n.t().hero.stat2Label }}
                  </div>
                </div>

                <div class="bg-[#fbf9f5] p-2.5 rounded-xl border border-[#ded7cb]">
                  <div class="text-xl sm:text-2xl font-bold font-mono text-[#0c4a58] tracking-tight">
                    {{ i18n.t().hero.stat3Value }}
                  </div>
                  <div class="text-[10px] text-slate-600 font-medium mt-0.5 leading-tight">
                    {{ i18n.t().hero.stat3Label }}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  `
})
export class SplitHeroComponent {
  readonly i18n = inject(I18nService);
  readonly propertyService = inject(PropertyService);
  readonly navService = inject(NavigationService);

  readonly inspectProperty = output<Property>();

  readonly activeSlideIndex = signal<number>(0);
  readonly activePhotoIndex = signal<number>(0);
  readonly searchQuery = signal<string>('');

  readonly featuredProperties = computed(() => {
    return this.propertyService.properties().slice(0, 4);
  });

  readonly currentSlide = computed(() => {
    const list = this.featuredProperties();
    return list[this.activeSlideIndex()] || list[0];
  });

  setSlideIndex(index: number): void {
    this.activeSlideIndex.set(index);
    this.activePhotoIndex.set(0);
  }

  onSearchChange(val: string): void {
    this.searchQuery.set(val);
  }

  onSearchSubmit(): void {
    this.propertyService.searchQuery.set(this.searchQuery());
    this.navService.navigate('marketplace');
  }

  onQuickTagClick(tag: string): void {
    const clean = tag.split(',')[0].trim();
    this.searchQuery.set(clean);
    this.onSearchSubmit();
  }

  onInspect(prop: Property): void {
    this.inspectProperty.emit(prop);
  }
}
