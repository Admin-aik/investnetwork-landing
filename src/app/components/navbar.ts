import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrandLogoComponent } from './brand-logo';
import { I18nService } from '../services/i18n.service';
import { AuthService } from '../services/auth.service';
import { NavigationService, AppSection } from '../services/navigation.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatIconModule, BrandLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="sticky top-0 z-40 w-full bg-[#f5f2eb]/95 backdrop-blur-md border-b border-[#ded7cb] transition-all shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          <!-- Official Brand Logo with Vectorized IN Monogram -->
          <button
            type="button"
            id="navbar-brand-logo-btn"
            (click)="goTo('hero')"
            class="flex items-center text-left focus:outline-none cursor-pointer"
            title="Ir a Inicio"
          >
            <app-brand-logo [size]="'md'" />
          </button>

          <!-- Desktop Navigation Links -->
          <div class="hidden lg:flex items-center gap-1 sm:gap-2 text-xs font-semibold tracking-wide text-slate-700">
            <button
              type="button"
              id="nav-inicio-btn"
              (click)="goTo('hero')"
              class="px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              [class.bg-[#0c4a58]]="navService.activeSection() === 'hero'"
              [class.text-white]="navService.activeSection() === 'hero'"
              [class.hover:text-[#0c4a58]]="navService.activeSection() !== 'hero'"
              [class.hover:bg-[#eae4d7]]="navService.activeSection() !== 'hero'"
            >
              <mat-icon class="text-sm">home</mat-icon>
              <span>Inicio</span>
            </button>

            <button
              type="button"
              id="nav-beneficios-btn"
              (click)="goTo('beneficios')"
              class="px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              [class.bg-[#0c4a58]]="navService.activeSection() === 'beneficios'"
              [class.text-white]="navService.activeSection() === 'beneficios'"
              [class.hover:text-[#0c4a58]]="navService.activeSection() !== 'beneficios'"
              [class.hover:bg-[#eae4d7]]="navService.activeSection() !== 'beneficios'"
            >
              <span>Beneficios</span>
            </button>

            <button
              type="button"
              id="nav-como-funciona-btn"
              (click)="goTo('como-funciona')"
              class="px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              [class.bg-[#0c4a58]]="navService.activeSection() === 'como-funciona'"
              [class.text-white]="navService.activeSection() === 'como-funciona'"
              [class.hover:text-[#0c4a58]]="navService.activeSection() !== 'como-funciona'"
              [class.hover:bg-[#eae4d7]]="navService.activeSection() !== 'como-funciona'"
            >
              <span>Cómo Funciona</span>
            </button>

            <button
              type="button"
              id="nav-marketplace-btn"
              (click)="goTo('marketplace')"
              class="px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              [class.bg-[#0c4a58]]="navService.activeSection() === 'marketplace'"
              [class.text-white]="navService.activeSection() === 'marketplace'"
              [class.hover:text-[#0c4a58]]="navService.activeSection() !== 'marketplace'"
              [class.hover:bg-[#eae4d7]]="navService.activeSection() !== 'marketplace'"
            >
              <mat-icon class="text-sm">domain</mat-icon>
              <span>Marketplace</span>
            </button>

            <button
              type="button"
              id="nav-remodeling-btn"
              (click)="goTo('remodeling')"
              class="px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              [class.bg-[#0c4a58]]="navService.activeSection() === 'remodeling'"
              [class.text-white]="navService.activeSection() === 'remodeling'"
              [class.hover:text-[#0c4a58]]="navService.activeSection() !== 'remodeling'"
              [class.hover:bg-[#eae4d7]]="navService.activeSection() !== 'remodeling'"
            >
              <mat-icon class="text-sm">handyman</mat-icon>
              <span>Remodelación & ARV</span>
            </button>

            <button
              type="button"
              id="nav-testimonios-btn"
              (click)="goTo('testimonios')"
              class="px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              [class.bg-[#0c4a58]]="navService.activeSection() === 'testimonios'"
              [class.text-white]="navService.activeSection() === 'testimonios'"
              [class.hover:text-[#0c4a58]]="navService.activeSection() !== 'testimonios'"
              [class.hover:bg-[#eae4d7]]="navService.activeSection() !== 'testimonios'"
            >
              <span>Testimonios</span>
            </button>

            <button
              type="button"
              id="nav-faq-btn"
              (click)="goTo('faq')"
              class="px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              [class.bg-[#0c4a58]]="navService.activeSection() === 'faq'"
              [class.text-white]="navService.activeSection() === 'faq'"
              [class.hover:text-[#0c4a58]]="navService.activeSection() !== 'faq'"
              [class.hover:bg-[#eae4d7]]="navService.activeSection() !== 'faq'"
            >
              <span>FAQ</span>
            </button>
          </div>

          <!-- Right Controls: i18n Switcher + Auth / Profile -->
          <div class="flex items-center gap-3">
            <!-- Bilingual Switcher [ ES | EN ] -->
            <div class="flex items-center bg-[#eae4d7] border border-[#ded7cb] rounded-lg p-0.5 shadow-sm">
              <button
                type="button"
                id="lang-es-btn"
                (click)="i18n.setLanguage('es')"
                class="px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors"
                [class.bg-[#0c4a58]]="i18n.currentLang() === 'es'"
                [class.text-white]="i18n.currentLang() === 'es'"
                [class.text-slate-700]="i18n.currentLang() !== 'es'"
                [class.hover:text-slate-900]="i18n.currentLang() !== 'es'"
              >
                ES
              </button>
              <span class="text-[#c8c0b2] text-xs select-none">|</span>
              <button
                type="button"
                id="lang-en-btn"
                (click)="i18n.setLanguage('en')"
                class="px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors"
                [class.bg-[#0c4a58]]="i18n.currentLang() === 'en'"
                [class.text-white]="i18n.currentLang() === 'en'"
                [class.text-slate-700]="i18n.currentLang() !== 'en'"
                [class.hover:text-slate-900]="i18n.currentLang() !== 'en'"
              >
                EN
              </button>
            </div>

            <!-- Auth / User Role Indicator -->
            @if (auth.currentUser(); as user) {
              <div class="flex items-center gap-2 bg-white border border-[#ded7cb] rounded-xl px-3 py-1.5 shadow-sm">
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <div class="hidden sm:flex flex-col text-left">
                  <span class="text-xs font-semibold text-slate-800 leading-none truncate max-w-[140px]">{{ user.name }}</span>
                  <span class="text-[9px] font-mono text-[#0c4a58] font-bold mt-0.5">
                    {{ user.role === 'investor' ? i18n.t().nav.roleInvestor : i18n.t().nav.roleOwner }}
                  </span>
                </div>
                <button
                  type="button"
                  id="open-profile-btn"
                  (click)="auth.openAuthModal(user.role)"
                  class="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-[#eae4d7] transition-colors"
                  title="Cambiar de Rol / Cuenta"
                >
                  <mat-icon class="text-base">swap_vert</mat-icon>
                </button>
              </div>
            } @else {
              <button
                type="button"
                id="navbar-login-btn"
                (click)="auth.openAuthModal('investor')"
                class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-sm flex items-center gap-1.5"
              >
                <mat-icon class="text-sm leading-none">account_circle</mat-icon>
                <span>Comenzar a Invertir</span>
              </button>
            }
          </div>
        </div>

        <!-- Mobile Horizontal Tab Bar (Always Accessible on Small Screens) -->
        <div class="flex lg:hidden items-center gap-1.5 overflow-x-auto pb-2.5 pt-1 scrollbar-none text-xs font-semibold">
          <button
            type="button"
            (click)="goTo('hero')"
            class="px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            [class.bg-[#0c4a58]]="navService.activeSection() === 'hero'"
            [class.text-white]="navService.activeSection() === 'hero'"
            [class.bg-[#eae4d7]]="navService.activeSection() !== 'hero'"
            [class.text-slate-800]]="navService.activeSection() !== 'hero'"
          >
            Inicio
          </button>

          <button
            type="button"
            (click)="goTo('beneficios')"
            class="px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            [class.bg-[#0c4a58]]="navService.activeSection() === 'beneficios'"
            [class.text-white]="navService.activeSection() === 'beneficios'"
            [class.bg-[#eae4d7]]="navService.activeSection() !== 'beneficios'"
            [class.text-slate-800]]="navService.activeSection() !== 'beneficios'"
          >
            Beneficios
          </button>

          <button
            type="button"
            (click)="goTo('como-funciona')"
            class="px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            [class.bg-[#0c4a58]]="navService.activeSection() === 'como-funciona'"
            [class.text-white]="navService.activeSection() === 'como-funciona'"
            [class.bg-[#eae4d7]]="navService.activeSection() !== 'como-funciona'"
            [class.text-slate-800]]="navService.activeSection() !== 'como-funciona'"
          >
            Cómo Funciona
          </button>

          <button
            type="button"
            (click)="goTo('marketplace')"
            class="px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            [class.bg-[#0c4a58]]="navService.activeSection() === 'marketplace'"
            [class.text-white]="navService.activeSection() === 'marketplace'"
            [class.bg-[#eae4d7]]="navService.activeSection() !== 'marketplace'"
            [class.text-slate-800]]="navService.activeSection() !== 'marketplace'"
          >
            Marketplace
          </button>

          <button
            type="button"
            (click)="goTo('remodeling')"
            class="px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            [class.bg-[#0c4a58]]="navService.activeSection() === 'remodeling'"
            [class.text-white]="navService.activeSection() === 'remodeling'"
            [class.bg-[#eae4d7]]="navService.activeSection() !== 'remodeling'"
            [class.text-slate-800]]="navService.activeSection() !== 'remodeling'"
          >
            Remodelación
          </button>

          <button
            type="button"
            (click)="goTo('testimonios')"
            class="px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            [class.bg-[#0c4a58]]="navService.activeSection() === 'testimonios'"
            [class.text-white]="navService.activeSection() === 'testimonios'"
            [class.bg-[#eae4d7]]="navService.activeSection() !== 'testimonios'"
            [class.text-slate-800]]="navService.activeSection() !== 'testimonios'"
          >
            Testimonios
          </button>

          <button
            type="button"
            (click)="goTo('faq')"
            class="px-3 py-1 rounded-full whitespace-nowrap transition-colors"
            [class.bg-[#0c4a58]]="navService.activeSection() === 'faq'"
            [class.text-white]="navService.activeSection() === 'faq'"
            [class.bg-[#eae4d7]]="navService.activeSection() !== 'faq'"
            [class.text-slate-800]]="navService.activeSection() !== 'faq'"
          >
            FAQ
          </button>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  readonly i18n = inject(I18nService);
  readonly auth = inject(AuthService);
  readonly navService = inject(NavigationService);

  goTo(section: AppSection): void {
    this.navService.navigate(section);
  }
}
