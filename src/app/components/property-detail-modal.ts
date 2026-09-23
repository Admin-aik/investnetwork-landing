import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Property } from '../models/property.model';
import { I18nService } from '../services/i18n.service';
import { InvestmentMetricsComponent } from './investment-metrics';

@Component({
  selector: 'app-property-detail-modal',
  imports: [CommonModule, DecimalPipe, FormsModule, MatIconModule, InvestmentMetricsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen() && property(); as prop) {
      <div
        id="property-detail-modal-wrapper"
        class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-prop-title"
      >
        <!-- Accessible Backdrop Button -->
        <button
          type="button"
          class="fixed inset-0 bg-black/85 backdrop-blur-md cursor-default w-full h-full border-0"
          (click)="closeModal.emit()"
          aria-label="Cerrar modal"
        ></button>

        <!-- Modal Card Content -->
        <div
          id="property-detail-modal-content"
          class="relative z-10 w-full max-w-5xl bg-[#fbf9f5] border border-[#ded7cb] rounded-2xl overflow-hidden shadow-2xl my-6 animate-scale-in text-slate-900"
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-4 sm:p-5 border-b border-[#ded7cb] bg-[#f5f2eb] sticky top-0 z-20">
            <div class="flex items-center gap-2.5">
              <span class="px-2.5 py-1 rounded text-[11px] font-mono font-bold uppercase bg-[#0c4a58] text-white shadow-sm">
                {{ prop.type.toUpperCase() }}
              </span>
              <div>
                <h2 id="modal-prop-title" class="text-base sm:text-lg font-bold text-slate-900 truncate max-w-md sm:max-w-xl">
                  {{ prop.title }}
                </h2>
                <div class="flex items-center gap-2 text-xs text-slate-600 font-mono">
                  <span>{{ prop.address }}, {{ prop.city }}</span>
                  <span class="text-slate-400">•</span>
                  <span class="text-[#0c4a58] font-bold">ID: INV-{{ prop.id.toUpperCase() }}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              id="close-modal-btn"
              (click)="closeModal.emit()"
              class="w-9 h-9 rounded-full bg-[#eae4d7] hover:bg-[#ded7cb] text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors border border-[#ded7cb]"
              aria-label="Cerrar ventana de detalles"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <!-- Modal Scrollable Body -->
          <div class="p-5 sm:p-7 space-y-7 max-h-[80vh] overflow-y-auto">
            <!-- 1. Panoramic Gallery with Active Thumbnails -->
            <div class="space-y-2">
              <div class="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-slate-900 border border-[#ded7cb]">
                <img
                  [src]="prop.photos[selectedPhotoIndex()]"
                  [alt]="prop.title"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
                <div class="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-white">
                  Foto {{ selectedPhotoIndex() + 1 }} de {{ prop.photos.length }}
                </div>
              </div>

              <!-- Thumbnails -->
              <div class="flex items-center gap-2 overflow-x-auto pb-1">
                @for (photo of prop.photos; track photo; let idx = $index) {
                  <button
                    type="button"
                    (click)="selectedPhotoIndex.set(idx)"
                    class="w-24 h-16 rounded-lg overflow-hidden border flex-shrink-0 transition-all"
                    [class.border-[#0c4a58]]="selectedPhotoIndex() === idx"
                    [class.ring-2]="selectedPhotoIndex() === idx"
                    [class.ring-[#0c4a58]/40]="selectedPhotoIndex() === idx"
                    [class.border-[#ded7cb]]="selectedPhotoIndex() !== idx"
                    [class.opacity-70]="selectedPhotoIndex() !== idx"
                    [attr.aria-label]="'Ver fotografía ' + (idx + 1)"
                  >
                    <img [src]="photo" [alt]="'Foto ' + idx" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
                  </button>
                }
              </div>
            </div>

            <!-- 2. Housing Trifecta & Core Attributes -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-[#ded7cb] shadow-sm">
              <div class="text-center p-2">
                <span class="text-xs text-slate-500 block mb-0.5">Recámaras</span>
                <span class="text-lg font-bold font-mono text-slate-900">{{ prop.bedrooms }} Habitaciones</span>
              </div>
              <div class="text-center p-2 border-l border-[#ded7cb]">
                <span class="text-xs text-slate-500 block mb-0.5">Baños</span>
                <span class="text-lg font-bold font-mono text-slate-900">{{ prop.bathrooms }} Completos</span>
              </div>
              <div class="text-center p-2 border-l border-[#ded7cb]">
                <span class="text-xs text-slate-500 block mb-0.5">Superficie</span>
                <span class="text-lg font-bold font-mono text-[#0c4a58]">{{ prop.sqm }} m²</span>
              </div>
              <div class="text-center p-2 border-l border-[#ded7cb]">
                <span class="text-xs text-slate-500 block mb-0.5">Avalúo Original</span>
                <span class="text-lg font-bold font-mono text-slate-400 line-through">
                  \${{ prop.originalPrice | number:'1.0-0' }}
                </span>
              </div>
            </div>

            <!-- 3. Financial Metrics Breakdown Component -->
            <app-investment-metrics [id]="'modal-metrics-' + prop.id" [property]="prop" />

            <!-- 4. InvestEstimate™ Market Valuation Corridor -->
            <div class="bg-white border border-[#ded7cb] rounded-xl p-5 shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <mat-icon class="text-[#0c4a58]">query_stats</mat-icon>
                  <h4 class="text-sm font-bold text-slate-900 uppercase font-mono tracking-wide">
                    {{ i18n.t().modal.investEstimate }}
                  </h4>
                </div>
                <span class="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300 font-semibold">
                  Confianza Algorítmica: {{ prop.investEstimate.confidence }}%
                </span>
              </div>

              <!-- Corridor Visual Slider Range -->
              <div class="space-y-3">
                <div class="flex justify-between text-xs font-mono">
                  <div class="text-left">
                    <span class="text-slate-500 block text-[10px]">Rango Inferior</span>
                    <strong class="text-slate-700">\${{ prop.investEstimate.low | number:'1.0-0' }}</strong>
                  </div>
                  <div class="text-center">
                    <span class="text-[#0c4a58] block text-[10px] font-semibold">Valor Central Sugerido</span>
                    <strong class="text-[#0c4a58] text-sm font-bold">\${{ prop.investEstimate.mid | number:'1.0-0' }}</strong>
                  </div>
                  <div class="text-right">
                    <span class="text-slate-500 block text-[10px]">Rango Superior</span>
                    <strong class="text-slate-700">\${{ prop.investEstimate.high | number:'1.0-0' }}</strong>
                  </div>
                </div>

                <div class="w-full h-3 bg-[#eae4d7] rounded-full overflow-hidden border border-[#ded7cb] relative">
                  <div class="absolute inset-y-0 left-1/4 right-1/4 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 rounded-full"></div>
                  <div class="absolute inset-y-0 left-1/2 w-1.5 bg-[#0c4a58] transform -translate-x-1/2 shadow-md"></div>
                </div>
              </div>
            </div>

            <!-- 5. Interactive Debt & Mortgage Financing Calculator -->
            <div class="bg-white border border-[#ded7cb] rounded-xl p-5 shadow-sm">
              <div class="flex items-center gap-2 mb-4">
                <mat-icon class="text-[#0c4a58]">account_balance</mat-icon>
                <h4 class="text-sm font-bold text-slate-900 uppercase font-mono tracking-wide">
                  {{ i18n.t().modal.mortgageCalc }}
                </h4>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <div class="flex justify-between text-xs font-mono mb-1">
                    <label for="downPaymentInput" class="text-slate-600">
                      {{ i18n.t().modal.downPayment }} ({{ downPaymentPercent() }}%)
                    </label>
                    <span class="text-slate-900 font-bold">\${{ calculatedDownPayment() | number:'1.0-0' }}</span>
                  </div>
                  <input
                    id="downPaymentInput"
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    [ngModel]="downPaymentPercent()"
                    (ngModelChange)="downPaymentPercent.set($event)"
                    class="w-full accent-[#0c4a58]"
                  />
                </div>

                <div>
                  <div class="flex justify-between text-xs font-mono mb-1">
                    <label for="loanTermInput" class="text-slate-600">
                      {{ i18n.t().modal.loanTerm }}
                    </label>
                    <span class="text-slate-900 font-bold">{{ loanTermYears() }} años</span>
                  </div>
                  <input
                    id="loanTermInput"
                    type="range"
                    min="10"
                    max="30"
                    step="5"
                    [ngModel]="loanTermYears()"
                    (ngModelChange)="loanTermYears.set($event)"
                    class="w-full accent-[#0c4a58]"
                  />
                </div>

                <div>
                  <div class="flex justify-between text-xs font-mono mb-1">
                    <label for="interestRateInput" class="text-slate-600">
                      {{ i18n.t().modal.interestRate }}
                    </label>
                    <span class="text-slate-900 font-bold">{{ interestRatePercent() }}%</span>
                  </div>
                  <input
                    id="interestRateInput"
                    type="range"
                    min="4.5"
                    max="10.5"
                    step="0.25"
                    [ngModel]="interestRatePercent()"
                    (ngModelChange)="interestRatePercent.set($event)"
                    class="w-full accent-[#0c4a58]"
                  />
                </div>
              </div>

              <!-- Output Monthly Payment -->
              <div class="bg-[#f5f2eb] p-4 rounded-lg flex items-center justify-between border border-[#ded7cb]">
                <div>
                  <span class="text-xs text-slate-700 block font-medium">{{ i18n.t().modal.monthlyPayment }} (Capital + Interés)</span>
                  <span class="text-[10px] text-slate-500 font-mono">Financiamiento fiduciario pre-calificado</span>
                </div>
                <div class="text-right">
                  <span class="text-xl font-bold font-mono text-[#0c4a58]">
                    \${{ calculatedMonthlyPayment() | number:'1.0-0' }} <span class="text-xs font-normal text-slate-600">USD/mes</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- 6. Submit Formal Binding Proposal Form -->
            <div class="bg-white border border-[#ded7cb] rounded-xl p-5 sm:p-6 shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <mat-icon class="text-[#0c4a58]">send_and_archive</mat-icon>
                <h4 class="text-base font-bold text-slate-900">
                  {{ i18n.t().modal.submitProposal }}
                </h4>
              </div>
              <p class="text-xs text-slate-600 mb-4">
                Presenta una propuesta de adquisición formal garantizada por nuestro fideicomiso inmobiliario.
              </p>

              @if (proposalSubmitted()) {
                <div class="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-center">
                  <mat-icon class="text-emerald-700 text-3xl mb-1">check_circle</mat-icon>
                  <h5 class="text-xs font-bold text-emerald-900">Propuesta Enviada Exitosamente</h5>
                  <p class="text-[11px] text-emerald-800 mt-1">{{ i18n.t().modal.proposalSuccess }}</p>
                </div>
              } @else {
                <form (submit)="onSubmitProposal($event)" class="space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label for="modalPropName" class="text-xs text-slate-700 block mb-1 font-medium">{{ i18n.t().modal.name }}</label>
                      <input
                        id="modalPropName"
                        type="text"
                        required
                        [ngModel]="proposalName()"
                        (ngModelChange)="proposalName.set($event)"
                        name="propName"
                        placeholder="Ej: Lic. Roberto García"
                        class="w-full bg-[#fbf9f5] border border-[#ded7cb] rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c4a58]"
                      />
                    </div>
                    <div>
                      <label for="modalPropEmail" class="text-xs text-slate-700 block mb-1 font-medium">{{ i18n.t().modal.email }}</label>
                      <input
                        id="modalPropEmail"
                        type="email"
                        required
                        [ngModel]="proposalEmail()"
                        (ngModelChange)="proposalEmail.set($event)"
                        name="propEmail"
                        placeholder="inversiones@empresa.com"
                        class="w-full bg-[#fbf9f5] border border-[#ded7cb] rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c4a58]"
                      />
                    </div>
                    <div>
                      <label for="modalPropPhone" class="text-xs text-slate-700 block mb-1 font-medium">{{ i18n.t().modal.phone }}</label>
                      <input
                        id="modalPropPhone"
                        type="tel"
                        required
                        [ngModel]="proposalPhone()"
                        (ngModelChange)="proposalPhone.set($event)"
                        name="propPhone"
                        placeholder="+1 (305) 555-0192"
                        class="w-full bg-[#fbf9f5] border border-[#ded7cb] rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c4a58]"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label for="modalPropOffer" class="text-xs text-slate-700 block mb-1 font-medium">{{ i18n.t().modal.offerAmount }}</label>
                      <div class="relative">
                        <span class="absolute left-3 top-2 text-slate-500 font-mono text-xs">$</span>
                        <input
                          id="modalPropOffer"
                          type="number"
                          required
                          [ngModel]="proposalOfferAmount()"
                          (ngModelChange)="proposalOfferAmount.set($event)"
                          name="propOffer"
                          class="w-full bg-[#fbf9f5] border border-[#ded7cb] rounded-lg pl-7 pr-3 py-2 text-xs font-mono font-bold text-[#0c4a58] focus:outline-none focus:border-[#0c4a58]"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="modalPropFin" class="text-xs text-slate-700 block mb-1 font-medium">{{ i18n.t().modal.financingType }}</label>
                      <select
                        id="modalPropFin"
                        [ngModel]="proposalFinancing()"
                        (ngModelChange)="proposalFinancing.set($event)"
                        name="propFin"
                        class="w-full bg-[#fbf9f5] border border-[#ded7cb] rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0c4a58]"
                      >
                        <option value="cash">{{ i18n.t().modal.cash }}</option>
                        <option value="mortgage">{{ i18n.t().modal.mortgage }}</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="w-full py-3 rounded-xl bg-[#0c4a58] hover:bg-[#13596b] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <mat-icon class="text-white">verified_user</mat-icon>
                    <span>{{ i18n.t().modal.sendProposalBtn }}</span>
                  </button>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class PropertyDetailModalComponent {
  readonly i18n = inject(I18nService);

  readonly isOpen = input<boolean>(false);
  readonly property = input<Property | null>(null);

  readonly closeModal = output<void>();

  readonly selectedPhotoIndex = signal<number>(0);

  // Mortgage Calculator State
  readonly downPaymentPercent = signal<number>(25);
  readonly loanTermYears = signal<number>(20);
  readonly interestRatePercent = signal<number>(6.5);

  // Proposal State
  readonly proposalName = signal<string>('Carlos Mendoza, CFA');
  readonly proposalEmail = signal<string>('carlos.mendoza@inversiones.com');
  readonly proposalPhone = signal<string>('+1 (305) 928-4421');
  readonly proposalOfferAmount = signal<number>(1150000);
  readonly proposalFinancing = signal<string>('cash');
  readonly proposalSubmitted = signal<boolean>(false);

  readonly calculatedDownPayment = computed(() => {
    const price = this.property()?.price ?? 1000000;
    return Math.round(price * (this.downPaymentPercent() / 100));
  });

  readonly calculatedMonthlyPayment = computed(() => {
    const price = this.property()?.price ?? 1000000;
    const principal = price - this.calculatedDownPayment();
    const monthlyRate = (this.interestRatePercent() / 100) / 12;
    const totalMonths = this.loanTermYears() * 12;

    if (monthlyRate === 0) return principal / totalMonths;
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    const monthly = (principal * monthlyRate * factor) / (factor - 1);
    return Math.round(monthly);
  });

  onSubmitProposal(e: Event): void {
    e.preventDefault();
    this.proposalSubmitted.set(true);
  }
}
