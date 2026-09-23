import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-3 select-none group cursor-pointer" [id]="id()">
      <!-- Vectorized InvestNetwork Monogram (Matches uploaded inves.png) -->
      <svg
        [class]="svgClass()"
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="goldCircuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f6efdc" />
            <stop offset="30%" stop-color="#dfb76c" />
            <stop offset="85%" stop-color="#ca8a04" />
            <stop offset="100%" stop-color="#9e6732" />
          </linearGradient>
          <linearGradient id="petroleumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#14596a" />
            <stop offset="100%" stop-color="#0c4a58" />
          </linearGradient>
          <filter id="goldGlow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#dfb76c" flood-opacity="0.35"/>
          </filter>
        </defs>

        <!-- "I" Bar: Deep Petroleum Blue -->
        <rect x="6" y="24" width="22" height="92" rx="1.5" fill="url(#petroleumGrad)" />

        <!-- "N" Left Vertical Bar -->
        <rect x="36" y="24" width="22" height="92" rx="1.5" fill="url(#petroleumGrad)" />

        <!-- "N" Right Vertical Bar -->
        <rect x="94" y="24" width="22" height="92" rx="1.5" fill="url(#petroleumGrad)" />

        <!-- "N" Diagonal Stroke -->
        <polygon points="42,24 64,24 104,116 82,116" fill="url(#petroleumGrad)" />

        <!-- Gold Network / Circuit Traces (Branching out from and around N) -->
        <g stroke="url(#goldCircuitGrad)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#goldGlow)">
          <!-- Top Left Node and L-trace -->
          <path d="M72,18 L72,42 L112,42" />
          <!-- Bottom Left Node and L-trace -->
          <path d="M72,122 L72,98 L92,98" />
          <!-- Middle Right Horizontal Trace -->
          <path d="M116,68 L140,68" />
          <!-- Top Right Branch Trace -->
          <path d="M112,42 L124,42" />
          <!-- Bottom Right Branch Trace -->
          <path d="M114,94 L124,94" />
        </g>

        <!-- Golden Circuit Circular Nodes / Terminals -->
        <!-- Top Node -->
        <circle cx="72" cy="18" r="9.5" fill="#f5f2eb" stroke="url(#goldCircuitGrad)" stroke-width="4" />
        <circle cx="72" cy="18" r="3.5" fill="url(#goldCircuitGrad)" />

        <!-- Bottom Node -->
        <circle cx="72" cy="122" r="9.5" fill="#f5f2eb" stroke="url(#goldCircuitGrad)" stroke-width="4" />
        <circle cx="72" cy="122" r="3.5" fill="url(#goldCircuitGrad)" />

        <!-- Top Right Node -->
        <circle cx="127" cy="42" r="8" fill="#f5f2eb" stroke="url(#goldCircuitGrad)" stroke-width="3.5" />
        <circle cx="127" cy="42" r="2.8" fill="url(#goldCircuitGrad)" />

        <!-- Far Right Middle Node -->
        <circle cx="144" cy="68" r="9" fill="#f5f2eb" stroke="url(#goldCircuitGrad)" stroke-width="3.8" />
        <circle cx="144" cy="68" r="3.2" fill="url(#goldCircuitGrad)" />

        <!-- Bottom Right Node -->
        <circle cx="126" cy="94" r="8" fill="#f5f2eb" stroke="url(#goldCircuitGrad)" stroke-width="3.5" />
        <circle cx="126" cy="94" r="2.8" fill="url(#goldCircuitGrad)" />
      </svg>

      @if (showText()) {
        <div class="flex flex-col">
          <div class="flex items-center tracking-tight font-bold text-slate-900 leading-none" [class]="titleSizeClass()">
            <span>Invest</span><span class="text-[#b8860b]">Network</span>
          </div>
          <span class="text-[9px] uppercase font-mono tracking-widest text-slate-600 font-semibold mt-1">
            PropTech Enterprise
          </span>
        </div>
      }
    </div>
  `
})
export class BrandLogoComponent {
  readonly id = input<string>('brand-logo');
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly showText = input<boolean>(true);

  svgClass(): string {
    switch (this.size()) {
      case 'sm':
        return 'w-8 h-7';
      case 'lg':
        return 'w-14 h-12';
      case 'xl':
        return 'w-20 h-16';
      default:
        return 'w-11 h-9';
    }
  }

  titleSizeClass(): string {
    switch (this.size()) {
      case 'sm':
        return 'text-base';
      case 'lg':
        return 'text-2xl';
      case 'xl':
        return 'text-3xl';
      default:
        return 'text-xl';
    }
  }
}
