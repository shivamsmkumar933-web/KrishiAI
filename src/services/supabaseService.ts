import { supabase } from './supabaseClient';
import { FarmerProfile, DiseaseAnalysisResult } from '../types';

export const syncFarmerProfileToSupabase = async (profile: FarmerProfile): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('farmer_profiles')
      .upsert({
        id: profile.id,
        name: profile.name,
        phone: profile.phone || '',
        state: profile.state,
        district: profile.district,
        land_area: profile.landArea,
        land_unit: profile.landUnit,
        soil_type: profile.soilType,
        irrigation: profile.irrigation,
        current_crop: profile.currentCrop,
        nitrogen: profile.nitrogen,
        phosphorus: profile.phosphorus,
        potassium: profile.potassium,
        ph: profile.ph,
        latitude: profile.latitude,
        longitude: profile.longitude,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.warn('Supabase DB profile sync note (Falling back to local persistent store):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase DB network error, utilizing local storage sync:', err);
    return false;
  }
};

export const syncDiseaseScanToSupabase = async (scan: DiseaseAnalysisResult): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('disease_scans')
      .insert({
        id: scan.id,
        crop_name: scan.detectedCrop,
        disease_name: scan.diseaseName,
        confidence: scan.confidence,
        severity: scan.severity,
        is_demo: scan.isDemo,
        created_at: scan.timestamp
      });

    if (error) {
      console.warn('Supabase DB scan sync note:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase DB scan sync network error:', err);
    return false;
  }
};
