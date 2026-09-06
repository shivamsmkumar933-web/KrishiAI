import { FarmerProfile, Language, DiseaseAnalysisResult, AdminStats } from '../types';

const PROFILE_KEY = 'krishiai_farmer_profile';
const LANG_KEY = 'krishiai_language';
const DEMO_MODE_KEY = 'krishiai_demo_mode';
const DISEASE_SCANS_KEY = 'krishiai_disease_scans';
const ADMIN_STATS_KEY = 'krishiai_admin_stats';

export const DEFAULT_FARMER_PROFILE: FarmerProfile = {
  id: 'farmer_101',
  name: 'Ramesh Kumar',
  phone: '+91 98765 43210',
  state: 'Punjab',
  district: 'Ludhiana',
  village: 'Sahnewal',
  landArea: 5,
  landUnit: 'acres',
  soilType: 'alluvial',
  irrigation: 'borewell',
  currentCrop: 'Wheat (गेहूं)',
  nitrogen: 120,
  phosphorus: 45,
  potassium: 50,
  ph: 6.8,
  latitude: 30.9010,
  longitude: 75.8573,
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_ADMIN_STATS: AdminStats = {
  totalFarmers: 12480,
  scansCompleted: 8430,
  advisoriesIssued: 45120,
  activeDistricts: 142,
  apiProviders: [
    { id: '1', name: 'Open-Meteo Weather API', type: 'weather', status: 'online', latencyMs: 120 },
    { id: '2', name: 'Gemini 3.6 Flash Vision AI', type: 'ai_vision', status: 'online', latencyMs: 240 },
    { id: '3', name: 'Sentinel-2 Satellite STAC API', type: 'satellite', status: 'online', latencyMs: 180 },
    { id: '4', name: 'KrishiAI LLM Advisor', type: 'llm', status: 'online', latencyMs: 95 },
  ],
  recentLogs: [
    { id: 'log_1', time: '10 mins ago', type: 'disease_scan', detail: 'Leaf scanner identified Yellow Rust in Wheat (Ludhiana)' },
    { id: 'log_2', time: '25 mins ago', type: 'advisory_trigger', detail: 'Automated rain advisory broadcasted to 1,240 farmers in Punjab' },
    { id: 'log_3', time: '1 hour ago', type: 'recommendation', detail: 'Crop advisory calculated for Alluvial soil in Bihar (Kharif season)' },
  ],
};

export const getFarmerProfile = (): FarmerProfile => {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load profile', e);
  }
  return DEFAULT_FARMER_PROFILE;
};

export const saveFarmerProfile = (profile: FarmerProfile): void => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
};

export const getSavedLanguage = (): Language => {
  try {
    const lang = localStorage.getItem(LANG_KEY);
    if (lang === 'hi' || lang === 'en') return lang;
  } catch (e) {
    console.error('Failed to load language', e);
  }
  return 'hi'; // Default to Hindi for Indian farmers
};

export const saveLanguage = (lang: Language): void => {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    console.error('Failed to save language', e);
  }
};

export const isDemoModeActive = (): boolean => {
  try {
    const data = localStorage.getItem(DEMO_MODE_KEY);
    if (data !== null) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to check demo mode', e);
  }
  // If no Gemini API key set in env, default to demo mode
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  return !apiKey || apiKey.trim() === '';
};

export const setDemoModeActive = (active: boolean): void => {
  try {
    localStorage.setItem(DEMO_MODE_KEY, JSON.stringify(active));
  } catch (e) {
    console.error('Failed to set demo mode', e);
  }
};

export const getSavedDiseaseScans = (): DiseaseAnalysisResult[] => {
  try {
    const data = localStorage.getItem(DISEASE_SCANS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load disease scans', e);
  }
  return [];
};

export const saveDiseaseScan = (scan: DiseaseAnalysisResult): void => {
  try {
    const existing = getSavedDiseaseScans();
    const updated = [scan, ...existing].slice(0, 20); // Keep last 20
    localStorage.setItem(DISEASE_SCANS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save disease scan', e);
  }
};

export const getAdminStats = (): AdminStats => {
  try {
    const data = localStorage.getItem(ADMIN_STATS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load admin stats', e);
  }
  return DEFAULT_ADMIN_STATS;
};

export const saveAdminStats = (stats: AdminStats): void => {
  try {
    localStorage.setItem(ADMIN_STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save admin stats', e);
  }
};
