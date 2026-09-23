import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar';
import { SplitHeroComponent } from './components/split-hero';
import { SocialProofComponent } from './components/social-proof';
import { ValueBenefitsComponent } from './components/value-benefits';
import { HowItWorksComponent } from './components/how-it-works';
import { MarketThermometerComponent } from './components/market-thermometer';
import { PropertyMarketplaceView } from './components/property-marketplace';
import { FlipDetailView } from './components/flip-detail';
import { TestimonialsComponent } from './components/testimonials';
import { FaqSectionComponent } from './components/faq-section';
import { FinalCtaComponent } from './components/final-cta';
import { PropertyDetailModalComponent } from './components/property-detail-modal';
import { AuthModalComponent } from './components/auth-modal';
import { FooterComponent } from './components/footer';
import { Property } from './models/property.model';
import { PropertyService } from './services/property.service';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavbarComponent,
    SplitHeroComponent,
    SocialProofComponent,
    ValueBenefitsComponent,
    HowItWorksComponent,
    MarketThermometerComponent,
    PropertyMarketplaceView,
    FlipDetailView,
    TestimonialsComponent,
    FaqSectionComponent,
    FinalCtaComponent,
    PropertyDetailModalComponent,
    AuthModalComponent,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly propertyService = inject(PropertyService);
  readonly navService = inject(NavigationService);

  readonly inspectedProperty = signal<Property | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);

  openPropertyDetail(prop: Property): void {
    this.inspectedProperty.set(prop);
    this.isDetailModalOpen.set(true);
  }

  closePropertyDetail(): void {
    this.isDetailModalOpen.set(false);
  }
}
