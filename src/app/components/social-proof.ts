import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../services/i18n.service';

@Component({
  selector: 'app-social-proof',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="social-proof-section" class="w-full bg-[#fbf9f5] border-b border-[#ded7cb] py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Main Stats Grid with High Authority -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div class="bg-white border border-[#ded7cb] p-4 rounded-xl shadow-xs text-center">
            <div class="text-2xl sm:text-3xl font-extrabold font-mono text-[#0c4a58] tracking-tight">
              +$18.4M USD
            </div>
            <div class="text-xs text-slate-600 mt-1 font-medium">
              Capital Sindicado & Operado
            </div>
          </div>

          <div class="bg-white border border-[#ded7cb] p-4 rounded-xl shadow-xs text-center">
            <div class="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700 tracking-tight">
              +4,200
            </div>
            <div class="text-xs text-slate-600 mt-1 font-medium">
              Inversores Calificados Activos
            </div>
          </div>

          <div class="bg-white border border-[#ded7cb] p-4 rounded-xl shadow-xs text-center">
            <div class="text-2xl sm:text-3xl font-extrabold font-mono text-[#b8860b] tracking-tight">
              98.6%
            </div>
            <div class="text-xs text-slate-600 mt-1 font-medium">
              Tasa de Éxito en Proyección ARV
            </div>
          </div>

          <div class="bg-white border border-[#ded7cb] p-4 rounded-xl shadow-xs text-center">
            <div class="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
              0 Días
            </div>
            <div class="text-xs text-slate-600 mt-1 font-medium">
              Litigios Judiciales Pendientes
            </div>
          </div>
        </div>

        <!-- Trust Logos & Institutional Custody Banner -->
        <div class="pt-2 border-t border-[#ded7cb]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
            <mat-icon class="text-base text-emerald-700">verified_user</mat-icon>
            <span>Alianzas Fiduciarias & Custodia Institucional</span>
          </div>

          <!-- Institutional Trust Badges -->
          <div class="flex items-center flex-wrap justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-600 font-bold">
            <div class="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
              <mat-icon class="text-sm text-[#0c4a58]">account_balance</mat-icon>
              <span>Escrow Fiduciario Internacional</span>
            </div>
            <div class="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
              <mat-icon class="text-sm text-[#0c4a58]">gavel</mat-icon>
              <span>Colegio Notarial Certificado</span>
            </div>
            <div class="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
              <mat-icon class="text-sm text-[#0c4a58]">security</mat-icon>
              <span>Póliza de Garantía de Obra</span>
            </div>
            <div class="flex items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
              <mat-icon class="text-sm text-[#0c4a58]">eco</mat-icon>
              <span>Certificación LEED & ESG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SocialProofComponent {
  readonly i18n = inject(I18nService);
}
