import { Injectable, signal, computed } from '@angular/core';
import { Property, MarketMetrics, PropertyType, PropertyStatus } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  // Properties signal store
  readonly properties = signal<Property[]>([
    {
      id: 'prop-1',
      title: 'The Grand Panorama Penthouse — Brickell Waterfront',
      address: '1421 Brickell Ave, Suite 4402',
      city: 'Miami',
      state: 'FL',
      neighborhood: 'Brickell Financial District',
      lat: 25.7594,
      lng: -80.1918,
      price: 1180000,
      originalPrice: 1550000,
      arv: 1720000,
      estimatedRent: 11500,
      bedrooms: 4,
      bathrooms: 4.5,
      sqm: 340,
      type: 'penthouse',
      status: 'flip-opportunity',
      discountPercent: 24,
      estimatedRoi: 36.8,
      capRate: 9.4,
      remodelBudget: 140000,
      completionTimeMonths: 7,
      photos: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'
      ],
      beforePhoto: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
      afterPhoto: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      description: 'Activo prime en piso 44 con vista panorámica a Biscayne Bay. Adquirido con 24% de descuento sobre avalúo fiduciario. Proyecto de remodelación ejecutiva llave en mano listo para comercialización a mercado corporativo internacional.',
      features: [
        'Elevador privado de alta velocidad',
        'Terraza panorámica envolvente de 42m²',
        '2 cajones de estacionamiento robotizados',
        'Certificación fiduciaria LEED Gold',
        'Servicio de Concierge 24/7'
      ],
      investmentHighlights: [
        'Margen neto proyectado: $400,000 USD',
        'Plusvalía proyectada en zona: +14.2% anual',
        'Póliza de garantía de obra por constructora certificada',
        'Renta estimada en salida: $11,500 USD / mes'
      ],
      fundingProgress: 86,
      fundingTarget: 450000,
      fundedAmount: 387000,
      minTicket: 10000,
      investorsCount: 14,
      daysOnMarket: 9,
      isHighDemand: true,
      isFlipOpportunity: true,
      isDiscountOffer: true,
      investEstimate: {
        low: 1680000,
        mid: 1720000,
        high: 1790000,
        confidence: 96
      }
    },
    {
      id: 'prop-2',
      title: 'Residencia de Autor & Remate Bancario — Polanco V',
      address: 'Campos Elíseos 298',
      city: 'Ciudad de México',
      state: 'CDMX',
      neighborhood: 'Polanco V Sección',
      lat: 19.4326,
      lng: -99.1950,
      price: 1220000,
      originalPrice: 1890000,
      arv: 1950000,
      estimatedRent: 8900,
      bedrooms: 5,
      bathrooms: 5.5,
      sqm: 480,
      type: 'villa',
      status: 'auction',
      discountPercent: 35,
      estimatedRoi: 41.5,
      capRate: 8.8,
      remodelBudget: 180000,
      completionTimeMonths: 8,
      photos: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
      ],
      beforePhoto: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1400&q=80',
      afterPhoto: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80',
      description: 'Oportunidad fiduciaria adjudicada en subasta directa. Ubicación inmejorable frente a zona hotelera y embajadas. Potencial de incremento de valor del 60% mediante modernización de fachadas y áreas sociales.',
      features: [
        'Jardín interior con espejo de agua',
        'Cava subterránea con temperatura controlada',
        'Caseta de seguridad blindada nivel 3',
        'Estacionamiento para 4 vehículos'
      ],
      investmentHighlights: [
        'Cesión inmediata de derechos fiduciarios',
        'Descuento judicial de 35% respecto a valor comercial',
        'Retorno neto estimado: $550,000 USD'
      ],
      fundingProgress: 92,
      fundingTarget: 600000,
      fundedAmount: 552000,
      minTicket: 15000,
      investorsCount: 19,
      daysOnMarket: 5,
      isHighDemand: true,
      isFlipOpportunity: true,
      isDiscountOffer: true,
      investEstimate: {
        low: 1890000,
        mid: 1950000,
        high: 2040000,
        confidence: 94
      }
    },
    {
      id: 'prop-3',
      title: 'Skyline Architect Villa — Austin Tech Corridor',
      address: '704 W 6th Street',
      city: 'Austin',
      state: 'TX',
      neighborhood: 'Downtown Historic District',
      lat: 30.2701,
      lng: -97.7490,
      price: 890000,
      originalPrice: 1150000,
      arv: 1280000,
      estimatedRent: 6800,
      bedrooms: 3,
      bathrooms: 3,
      sqm: 225,
      type: 'single-family',
      status: 'flip-opportunity',
      discountPercent: 22,
      estimatedRoi: 31.2,
      capRate: 9.1,
      remodelBudget: 95000,
      completionTimeMonths: 5,
      photos: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1600&q=80'
      ],
      beforePhoto: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
      afterPhoto: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      description: 'Inmueble de estilo industrial contemporáneo a minutos de los campus tecnológicos de Meta y Google. Alta rotación de ejecutivos y fuerte demanda de rentas corporativas de corto y mediano plazo.',
      features: [
        'Techos de doble altura con vigas expuestas',
        'Piscina climatizada con borde infinito',
        'Sistema solar integrado de 12kW',
        'Domótica de última generación'
      ],
      investmentHighlights: [
        'Tiempo de ejecución optimizado a 5 meses',
        'Rendimiento anual compuesto proyectado: 24.8%',
        'Inquilino corporativo pre-calificado'
      ],
      fundingProgress: 68,
      fundingTarget: 320000,
      fundedAmount: 217600,
      minTicket: 5000,
      investorsCount: 22,
      daysOnMarket: 14,
      isHighDemand: false,
      isFlipOpportunity: true,
      isDiscountOffer: true,
      investEstimate: {
        low: 1220000,
        mid: 1280000,
        high: 1340000,
        confidence: 97
      }
    },
    {
      id: 'prop-4',
      title: 'Palacete Modernista & Subasta Prime — Salamanca',
      address: 'Calle de Serrano 84',
      city: 'Madrid',
      state: 'Comunidad de Madrid',
      neighborhood: 'Barrio de Salamanca',
      lat: 40.4319,
      lng: -3.6883,
      price: 1650000,
      originalPrice: 2200000,
      arv: 2300000,
      estimatedRent: 12000,
      bedrooms: 4,
      bathrooms: 4,
      sqm: 295,
      type: 'condo',
      status: 'active-auction',
      discountPercent: 25,
      estimatedRoi: 34.0,
      capRate: 8.7,
      remodelBudget: 160000,
      completionTimeMonths: 6,
      photos: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
      ],
      beforePhoto: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=80',
      afterPhoto: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80',
      description: 'Inmueble señorial protegido con techos artesanales de 3.6m y molduras históricas. Subasta bancaria con título limpio y derechos consolidados en la Milla de Oro madrileña.',
      features: [
        'Portón señorial con zaguán histórico',
        'Balcones clásicos a calle Serrano',
        'Suelos de tarima maciza en espiga',
        'Calefacción central por suelo radiante'
      ],
      investmentHighlights: [
        'Mercado de alta demanda de compradores latinoamericanos',
        'Beneficio fiscal para inversores Golden Visa',
        'Rentabilidad neta neta: 34.0%'
      ],
      fundingProgress: 95,
      fundingTarget: 500000,
      fundedAmount: 475000,
      minTicket: 20000,
      investorsCount: 11,
      daysOnMarket: 4,
      isHighDemand: true,
      isFlipOpportunity: false,
      isDiscountOffer: true,
      investEstimate: {
        low: 2200000,
        mid: 2300000,
        high: 2420000,
        confidence: 95
      }
    },
    {
      id: 'prop-5',
      title: 'Desert Mirage Luxury Estate — Paradise Valley',
      address: '5620 E Camelback Road',
      city: 'Scottsdale',
      state: 'AZ',
      neighborhood: 'Camelback Mountain Foothills',
      lat: 33.5092,
      lng: -111.9261,
      price: 2100000,
      originalPrice: 2600000,
      arv: 2750000,
      estimatedRent: 15000,
      bedrooms: 5,
      bathrooms: 5,
      sqm: 510,
      type: 'villa',
      status: 'verified',
      discountPercent: 19,
      estimatedRoi: 28.5,
      capRate: 8.6,
      remodelBudget: 120000,
      completionTimeMonths: 6,
      photos: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
      ],
      beforePhoto: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1400&q=80',
      afterPhoto: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80',
      description: 'Mansión estilo desert-contemporary con vistas directas a Camelback Mountain. Verificación fiduciaria completa con estudio estructural y mecánica de suelos aprobada.',
      features: [
        'Cancha privada de pickleball con iluminación nocturna',
        'Cocina exterior con parrilla de leña y horno para pizzas',
        'Pozo de fuego de gas natural hundido',
        'Suite de invitados independiente (Casita)'
      ],
      investmentHighlights: [
        'Mercado de alta apreciación en Phoenix Metro',
        'Exclusividad fiduciaria para sindicación de inversores',
        'Margen de salida conservador: $530,000 USD'
      ],
      fundingProgress: 75,
      fundingTarget: 700000,
      fundedAmount: 525000,
      minTicket: 25000,
      investorsCount: 16,
      daysOnMarket: 11,
      isHighDemand: true,
      isFlipOpportunity: true,
      isDiscountOffer: false,
      investEstimate: {
        low: 2650000,
        mid: 2750000,
        high: 2880000,
        confidence: 93
      }
    },
    {
      id: 'prop-6',
      title: 'Ocean Breeze Coastal Residence — Santa Monica',
      address: '1020 Ocean Ave, Unit 4B',
      city: 'Santa Monica',
      state: 'CA',
      neighborhood: 'Ocean Avenue Bluffs',
      lat: 34.0195,
      lng: -118.4912,
      price: 1980000,
      originalPrice: 2550000,
      arv: 2690000,
      estimatedRent: 13500,
      bedrooms: 4,
      bathrooms: 3.5,
      sqm: 310,
      type: 'condo',
      status: 'flip-opportunity',
      discountPercent: 22,
      estimatedRoi: 32.8,
      capRate: 8.2,
      remodelBudget: 150000,
      completionTimeMonths: 7,
      photos: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
      ],
      beforePhoto: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
      afterPhoto: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
      description: 'Exclusiva residencia costera frente al Océano Pacífico. Adquirida mediante liquidación judicial con excelente plusvalía latente y proyecto de interiorismo escandinavo de lujo.',
      features: [
        'Acceso directo a la playa por sendero privado',
        'Ventanas de triple acristalamiento acústico',
        'Gimnasio privado y sauna seco',
        'Cocina Bulthaup con electrodomésticos Gaggenau'
      ],
      investmentHighlights: [
        'Zona de nula oferta nueva debido a restricciones costeras',
        'Retorno sobre capital: 32.8% en 7 meses',
        'Opciones de renta mensual premium verificadas'
      ],
      fundingProgress: 88,
      fundingTarget: 500000,
      fundedAmount: 440000,
      minTicket: 10000,
      investorsCount: 18,
      daysOnMarket: 8,
      isHighDemand: true,
      isFlipOpportunity: true,
      isDiscountOffer: true,
      investEstimate: {
        low: 2600000,
        mid: 2690000,
        high: 2800000,
        confidence: 96
      }
    }
  ]);

  // Market Metrics
  readonly marketMetrics = signal<MarketMetrics>({
    absorptionRate: 84.6,
    avgDiscountAuction: 26.4,
    buyerPressureRatio: 3.8,
    activeListingsCount: 42,
    totalCoInvestedMillion: 18.4,
    averageRoiPercent: 32.4,
    successRatePercent: 98.6
  });

  // State Signals
  readonly activeTab = signal<'all' | 'high-demand' | 'discounted' | 'highest-roi' | 'auctions'>('all');
  readonly selectedPropertyId = signal<string>('prop-1');
  readonly hoveredPropertyId = signal<string | null>(null);
  readonly searchQuery = signal<string>('');
  readonly selectedType = signal<PropertyType | 'all'>('all');
  readonly selectedStatus = signal<PropertyStatus | 'all'>('all');
  readonly maxPrice = signal<number>(3000000);
  readonly minBedrooms = signal<number>(0);
  readonly viewMode = signal<'investment' | 'standard'>('investment');

  // Favorites
  readonly favorites = signal<string[]>(['prop-1']);

  // Selected property computed
  readonly selectedProperty = computed(() => {
    const list = this.properties();
    return list.find(p => p.id === this.selectedPropertyId()) || list[0];
  });

  // Filtered properties computed
  readonly filteredProperties = computed(() => {
    let list = this.properties();
    const tab = this.activeTab();
    const query = this.searchQuery().trim().toLowerCase();
    const type = this.selectedType();
    const status = this.selectedStatus();
    const maxP = this.maxPrice();
    const minBeds = this.minBedrooms();

    // Tab filter
    if (tab === 'high-demand') {
      list = list.filter(p => p.isHighDemand || p.fundingProgress > 80);
    } else if (tab === 'discounted') {
      list = list.filter(p => p.discountPercent >= 20 || p.isDiscountOffer);
    } else if (tab === 'highest-roi') {
      list = list.filter(p => p.estimatedRoi >= 32);
    } else if (tab === 'auctions') {
      list = list.filter(p => p.status === 'auction' || p.status === 'active-auction');
    }

    // Search query filter
    if (query) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query) ||
        p.neighborhood.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query) ||
        p.state.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (type !== 'all') {
      list = list.filter(p => p.type === type);
    }

    // Status filter
    if (status !== 'all') {
      list = list.filter(p => p.status === status);
    }

    // Max price
    list = list.filter(p => p.price <= maxP);

    // Min bedrooms
    if (minBeds > 0) {
      list = list.filter(p => p.bedrooms >= minBeds);
    }

    return list;
  });

  // Actions
  selectProperty(id: string): void {
    this.selectedPropertyId.set(id);
  }

  setHoveredProperty(id: string | null): void {
    this.hoveredPropertyId.set(id);
  }

  toggleFavorite(id: string): void {
    const current = this.favorites();
    if (current.includes(id)) {
      this.favorites.set(current.filter(item => item !== id));
    } else {
      this.favorites.set([...current, id]);
    }
  }

  isFavorite(id: string): boolean {
    return this.favorites().includes(id);
  }

  pledgeTicket(propertyId: string, amount: number): void {
    this.properties.update(items =>
      items.map(p => {
        if (p.id === propertyId) {
          const newFunded = Math.min(p.fundingTarget, p.fundedAmount + amount);
          const newProgress = Math.round((newFunded / p.fundingTarget) * 100);
          return {
            ...p,
            fundedAmount: newFunded,
            fundingProgress: newProgress,
            investorsCount: p.investorsCount + 1
          };
        }
        return p;
      })
    );
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedType.set('all');
    this.selectedStatus.set('all');
    this.maxPrice.set(3000000);
    this.minBedrooms.set(0);
    this.activeTab.set('all');
  }
}
