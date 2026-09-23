import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, UserRole } from '../services/auth.service';
import { I18nService } from '../services/i18n.service';
import { BrandLogoComponent } from './brand-logo';

@Component({
  selector: 'app-auth-modal',
  imports: [CommonModule, FormsModule, MatIconModule, BrandLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (auth.isAuthModalOpen()) {
      <div
        id="auth-modal-wrapper"
        class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <!-- Accessible Backdrop Button -->
        <button
          type="button"
          class="fixed inset-0 bg-black/85 backdrop-blur-md cursor-default w-full h-full border-0"
          (click)="auth.closeAuthModal()"
          aria-label="Cerrar modal de autenticación"
        ></button>

        <div
          id="auth-modal-card"
          class="relative z-10 w-full max-w-md bg-white border border-[#ded7cb] rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-scale-in text-slate-900"
        >
          <!-- Close Button -->
          <button
            type="button"
            id="close-auth-modal-btn"
            (click)="auth.closeAuthModal()"
            class="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f5f2eb] text-slate-600 hover:text-slate-900 border border-[#ded7cb] flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <mat-icon class="text-lg">close</mat-icon>
          </button>

          <!-- Header with Logo -->
          <div class="text-center mb-6">
            <div class="inline-block mb-3">
              <app-brand-logo [size]="'sm'" [showText]="false" />
            </div>
            <h3 id="auth-modal-title" class="text-xl font-bold text-slate-900 tracking-tight">
              {{ i18n.t().auth.modalTitle }}
            </h3>
            <p class="text-xs text-slate-600 mt-1">
              {{ i18n.t().auth.roleQuestion }}
            </p>
          </div>

          <!-- Role Switcher Segmented Control -->
          <div class="grid grid-cols-2 gap-2 p-1 bg-[#f5f2eb] rounded-xl border border-[#ded7cb] mb-6">
            <button
              type="button"
              id="role-investor-btn"
              (click)="selectedRole.set('investor')"
              class="py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-1"
              [class.bg-[#0c4a58]]="selectedRole() === 'investor'"
              [class.text-white]="selectedRole() === 'investor'"
              [class.shadow-sm]="selectedRole() === 'investor'"
              [class.text-slate-700]="selectedRole() !== 'investor'"
            >
              <mat-icon class="text-sm">trending_up</mat-icon>
              <span>{{ i18n.t().auth.investorRoleTitle }}</span>
            </button>

            <button
              type="button"
              id="role-owner-btn"
              (click)="selectedRole.set('owner')"
              class="py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex flex-col items-center gap-1"
              [class.bg-[#0c4a58]]="selectedRole() === 'owner'"
              [class.text-white]="selectedRole() === 'owner'"
              [class.shadow-sm]="selectedRole() === 'owner'"
              [class.text-slate-700]="selectedRole() !== 'owner'"
            >
              <mat-icon class="text-sm">apartment</mat-icon>
              <span>{{ i18n.t().auth.ownerRoleTitle }}</span>
            </button>
          </div>

          <div class="p-3 bg-[#fbf9f5] rounded-xl border border-[#ded7cb] text-[11px] text-slate-600 mb-5">
            @if (selectedRole() === 'investor') {
              <div class="flex items-start gap-2">
                <mat-icon class="text-[#0c4a58] text-base flex-shrink-0">verified_user</mat-icon>
                <span>{{ i18n.t().auth.investorRoleDesc }}</span>
              </div>
            } @else {
              <div class="flex items-start gap-2">
                <mat-icon class="text-[#0c4a58] text-base flex-shrink-0">architecture</mat-icon>
                <span>{{ i18n.t().auth.ownerRoleDesc }}</span>
              </div>
            }
          </div>

          <!-- Login Form -->
          <form (submit)="onLoginSubmit($event)" class="space-y-4">
            <div>
              <label for="authEmailInput" class="text-xs text-slate-700 block mb-1 font-medium">{{ i18n.t().auth.emailLabel }}</label>
              <input
                id="authEmailInput"
                type="email"
                required
                [ngModel]="email()"
                (ngModelChange)="email.set($event)"
                name="authEmail"
                placeholder="inversiones@fideicomiso.com"
                class="w-full bg-[#fbf9f5] border border-[#ded7cb] rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c4a58] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label for="authPasswordInput" class="text-xs text-slate-700 block mb-1 font-medium">{{ i18n.t().auth.passwordLabel }}</label>
              <input
                id="authPasswordInput"
                type="password"
                required
                [ngModel]="password()"
                (ngModelChange)="password.set($event)"
                name="authPassword"
                placeholder="••••••••••••"
                class="w-full bg-[#fbf9f5] border border-[#ded7cb] rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0c4a58] focus:bg-white transition-colors"
              />
            </div>

            <button
              type="submit"
              class="w-full py-2.5 rounded-xl bg-[#0c4a58] hover:bg-[#13596b] text-white font-bold text-xs transition-colors shadow-sm"
            >
              {{ i18n.t().auth.loginBtn }}
            </button>
          </form>

          <!-- 1-Click Demo Shortcut -->
          <div class="mt-4 pt-4 border-t border-[#ded7cb] text-center">
            <button
              type="button"
              id="demo-login-btn"
              (click)="auth.loginAsDemo(selectedRole())"
              class="text-xs text-[#0c4a58] hover:underline font-mono font-semibold flex items-center justify-center gap-1 mx-auto"
            >
              <mat-icon class="text-sm">bolt</mat-icon>
              <span>{{ i18n.t().auth.quickDemo }} ({{ selectedRole() === 'investor' ? 'Inversor' : 'Developer' }})</span>
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class AuthModalComponent {
  readonly auth = inject(AuthService);
  readonly i18n = inject(I18nService);

  readonly selectedRole = signal<UserRole>('investor');
  readonly email = signal<string>('carlos.mendoza@inversiones.com');
  readonly password = signal<string>('demo12345');

  onLoginSubmit(e: Event): void {
    e.preventDefault();
    this.auth.loginAsDemo(this.selectedRole());
  }
}
