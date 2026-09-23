import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Property } from '../models/property.model';
import { I18nService } from '../services/i18n.service';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule, DecimalPipe, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      [id]="'property-card-' + property().id"
      class="group relative bg-white border border-[#ded7cb] hover:border-[#0c4a58] rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md flex flex-col cursor-pointer"
      [class.ring-2]="isHovered() || isSelected()"
      [class.ring-[#0c4a58]]="isHovered() || isSelected()"
      tabindex="0"
      (keydown.enter)="onCardClick()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (click)="onCardClick()"
    >
      <!-- Cinematic Image Container (16:9 Aspect Ratio) -->
      <div class="relative w-full aspect-video overflow-hidden bg-slate-900">
        <img
          [src]="property().photos[0]"
          [alt]="property().title"
          referrerpolicy="no-referrer"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <!-- Optical Contrast Vignette / Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>

        <!-- Top Badges & Actions Strip -->
        <div class="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <div class="flex items-center gap-1.5 flex-wrap">
            <!-- Discrete Status Badge with Fine Border -->
            <span
              class="px-2.5 py-1 rounded-[6px] text-[11px] font-semibold tracking-wide border uppercase"
              [class]="statusBadgeClass()"
            >
              {{ statusLabel() }}
            </span>

            @if (property().discountPercent > 0) {
              <span class="px-2 py-0.5 rounded-[6px] text-[10px] font-mono font-bold bg-amber-400 text-slate-950 border border-amber-300">
                -{{ property().discountPercent }}% AVALÚO
              </span>
            }
          </div>

          <!-- Favorite Button -->
          <button
            type="button"
            [id]="'fav-btn-' + property().id"
            (click)="onToggleFavorite($event)"
            class="w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-white hover:text-amber-400 flex items-center justify-center backdrop-blur-md transition-colors"
            [attr.aria-label]="'Guardar favorito ' + property().title"
          >
            <mat-icon class="text-base leading-none" [class.text-amber-400]="isFav()">
              {{ isFav() ? 'favorite' : 'favorite_border' }}
            </mat-icon>
          </button>
        </div>

        <!-- Low-Profile Glassmorphic Dock Anclado en Franja Inferior -->
        <div class="absolute bottom-2.5 inset-x-2.5 z-10 glass-dock-subtle rounded-lg px-3 py-2 flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[10px] uppercase font-mono tracking-wider text-slate-300">
              {{ isInvestmentMode() ? i18n.t().card.purchasePrice : 'Precio de Lista' }}
            </span>
            <span class="text-lg font-bold font-mono text-white tracking-tight leading-none">
              \${{ property().price | number:'1.0-0' }} <span class="text-xs font-normal text-slate-300">USD</span>
            </span>
          </div>

          @if (isInvestmentMode()) {
            <div class="flex items-center gap-3">
              <!-- ARV Metric -->
              <div class="text-right">
                <span class="text-[9px] uppercase font-mono text-amber-300 block">
                  {{ i18n.t().card.arv }}
                </span>
                <span class="text-xs font-mono font-bold text-amber-200">
                  \${{ property().arv | number:'1.0-0' }}
                </span>
              </div>
              <!-- Net ROI Metric -->
              <div class="bg-emerald-950/80 border border-emerald-500/40 px-2 py-1 rounded text-right">
                <span class="text-[9px] uppercase font-mono text-emerald-400 block">
                  ROI EST.
                </span>
                <span class="text-xs font-mono font-bold text-emerald-300">
                  +{{ property().estimatedRoi | number:'1.1-1' }}%
                </span>
              </div>
            </div>
          } @else {
            <div class="text-right">
              <span class="text-[10px] font-mono text-slate-300 block">
                Renta Estimada
              </span>
              <span class="text-xs font-mono font-semibold text-white">
                \${{ property().estimatedRent | number:'1.0-0' }} / mo
              </span>
            </div>
          }
        </div>
      </div>

      <!-- Card Body Content -->
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <!-- Location Breadcrumb -->
          <div class="flex items-center gap-1.5 text-slate-500 text-xs mb-1.5">
            <mat-icon class="text-[#b8860b] text-sm leading-none">location_on</mat-icon>
            <span class="font-medium truncate">{{ property().neighborhood }}, {{ property().city }}</span>
          </div>

          <!-- Title -->
          <h3 class="text-base font-semibold text-slate-900 group-hover:text-[#0c4a58] transition-colors line-clamp-1 mb-2.5">
            {{ property().title }}
          </h3>

          <!-- Housing Trifecta (Recámaras • Baños • Metros Cuadrados) in single horizontal row -->
          <div class="flex items-center gap-4 py-2 border-y border-[#ded7cb] text-xs text-slate-700 font-medium">
            <div class="flex items-center gap-1">
              <mat-icon class="text-slate-400 text-sm leading-none">king_bed</mat-icon>
              <span>{{ property().bedrooms }} {{ i18n.t().card.beds }}</span>
            </div>
            <span class="text-slate-400">•</span>
            <div class="flex items-center gap-1">
              <mat-icon class="text-slate-400 text-sm leading-none">bathtub</mat-icon>
              <span>{{ property().bathrooms }} {{ i18n.t().card.baths }}</span>
            </div>
            <span class="text-slate-400">•</span>
            <div class="flex items-center gap-1">
              <mat-icon class="text-slate-400 text-sm leading-none">square_foot</mat-icon>
              <span class="font-mono">{{ property().sqm }} {{ i18n.t().card.sqm }}</span>
            </div>
          </div>
        </div>

        <!-- Crowdfunding Pool or Quick Action Footer -->
        <div class="mt-3 pt-2">
          @if (property().fundingProgress > 0 && isInvestmentMode()) {
            <div>
              <div class="flex items-center justify-between text-[11px] font-mono mb-1">
                <span class="text-slate-600">Co-inversión: {{ property().investorsCount }} inversores</span>
                <span class="font-bold text-[#b8860b]">{{ property().fundingProgress }}% fondeado</span>
              </div>
              <div class="w-full h-1.5 bg-[#eae4d7] rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-teal-700 via-emerald-600 to-[#b8860b] rounded-full transition-all duration-500"
                  [style.width.%]="property().fundingProgress"
                ></div>
              </div>
            </div>
          }

          <div class="flex items-center justify-between mt-3 pt-2 border-t border-[#ded7cb] text-xs">
            <span class="text-[11px] font-mono text-slate-600">
              Ticket mín: <strong class="text-slate-900">\${{ property().minTicket | number:'1.0-0' }}</strong>
            </span>

            <button
              type="button"
              [id]="'inspect-btn-' + property().id"
              (click)="onInspectClick($event)"
              class="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#f5f2eb] hover:bg-[#0c4a58] text-slate-800 hover:text-white font-medium transition-colors text-xs border border-[#ded7cb]"
            >
              <span>{{ i18n.t().card.viewDetail }}</span>
              <mat-icon class="text-sm leading-none">arrow_forward</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </article>
  `
})
export class PropertyCardComponent {
  readonly i18n = inject(I18nService);
  readonly propertyService = inject(PropertyService);

  readonly property = input.required<Property>();
  readonly viewMode = input<'investment' | 'standard'>('investment');

  readonly cardClick = output<Property>();
  readonly inspectClick = output<Property>();

  readonly isFav = computed(() => {
    return this.propertyService.isFavorite(this.property().id);
  });

  readonly isSelected = computed(() => {
    return this.propertyService.selectedPropertyId() === this.property().id;
  });

  readonly isHovered = computed(() => {
    return this.propertyService.hoveredPropertyId() === this.property().id;
  });

  readonly isInvestmentMode = computed(() => {
    return this.viewMode() === 'investment';
  });

  statusLabel(): string {
    const s = this.property().status;
    const badges = this.i18n.t().card.badges;
    switch (s) {
      case 'auction':
        return badges.auction;
      case 'active-auction':
        return badges['active-auction'];
      case 'flip-opportunity':
        return badges['flip-opportunity'];
      case 'verified':
        return badges.verified;
      case 'for-sale':
        return badges['for-sale'];
      case 'for-rent':
        return badges['for-rent'];
      default:
        return 'PropTech Deal';
    }
  }

  statusBadgeClass(): string {
    const s = this.property().status;
    switch (s) {
      case 'auction':
      case 'active-auction':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-semibold';
      case 'flip-opportunity':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold';
      case 'verified':
        return 'bg-teal-100 text-teal-900 border-teal-300 font-semibold';
      default:
        return 'bg-[#eae4d7] text-slate-800 border-[#ded7cb]';
    }
  }

  onMouseEnter(): void {
    this.propertyService.setHoveredProperty(this.property().id);
  }

  onMouseLeave(): void {
    if (this.propertyService.hoveredPropertyId() === this.property().id) {
      this.propertyService.setHoveredProperty(null);
    }
  }

  onCardClick(): void {
    this.propertyService.selectProperty(this.property().id);
    this.cardClick.emit(this.property());
  }

  onToggleFavorite(e: MouseEvent): void {
    e.stopPropagation();
    this.propertyService.toggleFavorite(this.property().id);
  }

  onInspectClick(e: MouseEvent): void {
    e.stopPropagation();
    this.propertyService.selectProperty(this.property().id);
    this.inspectClick.emit(this.property());
  }
}
