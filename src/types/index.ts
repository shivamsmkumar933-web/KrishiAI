export type Language = 'en' | 'hi';

export type SoilType = 'alluvial' | 'black' | 'red' | 'laterite' | 'desert' | 'clay' | 'loam' | 'sandy';

export type IrrigationType = 'canal' | 'borewell' | 'drip' | 'sprinkler' | 'rainfed';

export type Season = 'kharif' | 'rabi' | 'zaid';

export interface FarmerProfile {
  id: string;
  name: string;
  phone?: string;
  state: string;
  district: string;
  village?: string;
  landArea: number;
  landUnit: 'acres' | 'bigha' | 'hectares';
  soilType: SoilType;
  irrigation: IrrigationType;
  currentCrop: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  latitude: number;
  longitude: number;
  updatedAt: string;
}

export interface WeatherAdvisory {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  type: 'warning' | 'info' | 'success';
  category: 'irrigation' | 'spray' | 'harvest' | 'frost' | 'general';
}

export interface DayForecast {
  day: string;
  dayHindi: string;
  date: string;
  maxTemp: number;
  minTemp: number;
  rainProb: number;
  condition: string;
  conditionHindi: string;
  icon: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  weatherCondition: string;
  weatherConditionHindi: string;
  icon: string;
  forecast: DayForecast[];
  advisories: WeatherAdvisory[];
  isDemo?: boolean;
}

export interface CropRecommendation {
  cropName: string;
  hindiName: string;
  suitability: number; // percentage
  reason: string;
  reasonHindi: string;
  duration: string;
  durationHindi: string;
  waterReq: string;
  waterReqHindi: string;
  npkReq: string;
  expectedYield: string;
  marketPriceEst: string;
  icon: string;
  guidance: string[];
  guidanceHindi: string[];
}

export interface DiseaseAnalysisResult {
  id: string;
  detectedCrop: string;
  cropHindiName: string;
  diseaseName: string;
  diseaseHindiName: string;
  confidence: number; // percentage
  isHealthy: boolean;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  symptomsHindi: string[];
  preventiveSteps: string[];
  preventiveStepsHindi: string[];
  recommendedActions: {
    chemical: string[];
    chemicalHindi: string[];
    organic: string[];
    organicHindi: string[];
  };
  imageUrl?: string;
  timestamp: string;
  isDemo: boolean;
}

export interface StressArea {
  id: string;
  areaName: string;
  areaNameHindi: string;
  issue: string;
  issueHindi: string;
  severity: 'High' | 'Medium' | 'Low';
  lat: number;
  lng: number;
  recommendation: string;
  recommendationHindi: string;
}

export interface HistoricalNDVI {
  date: string;
  ndvi: number;
  moisture: number;
  chlorophyll: number;
}

export interface SatelliteData {
  locationName: string;
  coordinates: [number, number];
  ndviScore: number; // 0.0 - 1.0
  vegetationHealth: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Severe Stress';
  vegetationHealthHindi: string;
  historicalTrend: HistoricalNDVI[];
  stressAreas: StressArea[];
  isDemo: boolean;
  lastUpdated: string;
  stacSource?: string;
  sceneId?: string;
  acquisitionDate?: string;
  cloudCoverPct?: number;
  redBandUrl?: string;
  nirBandUrl?: string;
  previewUrl?: string;
  vegetationPct?: number;
}

export interface SoilAnalysis {
  nitrogenStatus: 'low' | 'medium' | 'optimal';
  phosphorusStatus: 'low' | 'medium' | 'optimal';
  potassiumStatus: 'low' | 'medium' | 'optimal';
  phRating: string;
  phRatingHindi: string;
  organicCarbon: number; // percentage
  healthIndex: number; // percentage
  recommendations: string[];
  recommendationsHindi: string[];
  fertilizers: Array<{
    name: string;
    hindiName: string;
    amountPerAcre: string;
    amountPerAcreHindi: string;
    timing: string;
    timingHindi: string;
  }>;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  hindiName: string;
  category: 'subsidy' | 'credit' | 'insurance' | 'equipment' | 'soil';
  categoryLabel: string;
  categoryLabelHindi: string;
  purpose: string;
  purposeHindi: string;
  eligibility: string[];
  eligibilityHindi: string[];
  benefits: string[];
  benefitsHindi: string[];
  officialLink: string;
  applicationSteps: string[];
  applicationStepsHindi: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  suggestedActionsHindi?: string[];
  audioAvailable?: boolean;
}

export interface AdminStats {
  totalFarmers: number;
  scansCompleted: number;
  advisoriesIssued: number;
  activeDistricts: number;
  apiProviders: Array<{
    id: string;
    name: string;
    type: 'weather' | 'ai_vision' | 'satellite' | 'llm';
    status: 'online' | 'degraded' | 'demo';
    latencyMs: number;
  }>;
  recentLogs: Array<{
    id: string;
    time: string;
    type: 'disease_scan' | 'recommendation' | 'advisory_trigger';
    detail: string;
  }>;
}
