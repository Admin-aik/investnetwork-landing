export type PropertyType = 'villa' | 'condo' | 'single-family' | 'penthouse' | 'commercial';
export type PropertyStatus = 'auction' | 'flip-opportunity' | 'verified' | 'active-auction' | 'for-sale' | 'for-rent';
export type FinishTier = 'standard' | 'premium' | 'signature';

export interface RenovationItem {
  id: string;
  nameKey: string;
  category: 'interior' | 'exterior' | 'systems' | 'luxury';
  standardCost: number;
  premiumCost: number;
  signatureCost: number;
  selected: boolean;
  tier: FinishTier;
  estimatedArvImpactFactor: number;
}

export interface RemodelingDirectoryItem {
  id: string;
  nameKey: string;
  title: string;
  category: 'interior' | 'baths' | 'exterior' | 'systems' | 'finishes' | 'structural';
  categoryLabel: string;
  description: string;
  image: string;
  standardCost: number;
  premiumCost: number;
  signatureCost: number;
  executionWeeks: number;
  arvImpactPercent: number; // e.g. 16%
  roiPercent: number; // e.g. 145%
  keySpecs: string[];
  selectedInCalculator: boolean;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  neighborhood: string;
  lat: number;
  lng: number;
  price: number;
  originalPrice: number;
  arv: number; // After Repair Value
  estimatedRent: number;
  bedrooms: number;
  bathrooms: number;
  sqm: number; // Metros cuadrados
  type: PropertyType;
  status: PropertyStatus;
  discountPercent: number;
  estimatedRoi: number; // %
  capRate: number; // %
  remodelBudget: number;
  completionTimeMonths: number;
  photos: string[];
  beforePhoto: string;
  afterPhoto: string;
  description: string;
  features: string[];
  investmentHighlights: string[];
  fundingProgress: number; // e.g. 78% funded
  fundingTarget: number;
  fundedAmount: number;
  minTicket: number;
  investorsCount: number;
  daysOnMarket: number;
  isHighDemand?: boolean;
  isFlipOpportunity?: boolean;
  isDiscountOffer?: boolean;
  investEstimate: {
    low: number;
    mid: number;
    high: number;
    confidence: number; // 0 - 100
  };
}

export interface MarketMetrics {
  absorptionRate: number; // %
  avgDiscountAuction: number; // %
  buyerPressureRatio: number; // 1.0 - 5.0
  activeListingsCount: number;
  totalCoInvestedMillion: number;
  averageRoiPercent: number;
  successRatePercent: number;
}
