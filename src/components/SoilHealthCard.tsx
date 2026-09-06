import React from 'react';
import { Activity, TestTube, Scale, CheckCircle2, ChevronRight } from 'lucide-react';
import { FarmerProfile, Language } from '../types';
import { translations } from '../i18n/translations';
import { analyzeSoilHealth } from '../services/soilHealthService';

interface SoilHealthCardProps {
  farmerProfile: FarmerProfile;
  language: Language;
}

export const SoilHealthCard: React.FC<SoilHealthCardProps> = ({ farmerProfile, language }) => {
  const t = translations[language];

  const soilData = analyzeSoilHealth(
    farmerProfile.nitrogen,
    farmerProfile.phosphorus,
    farmerProfile.potassium,
    farmerProfile.ph,
    farmerProfile.soilType
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
            <TestTube className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.soilTitle}</h2>
            <p className="text-xs text-slate-500">{t.soilSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Score Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Health Index */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase block">{t.healthIndexLabel}</span>
            <span className="text-3xl font-black text-emerald-950 mt-1 block">{soilData.healthIndex}%</span>
            <span className="text-[10px] text-emerald-700 font-medium">Nutrient & Microbial Status</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center shadow-md">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Organic Carbon */}
        <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-800 uppercase block">{t.organicCarbonLabel}</span>
            <span className="text-3xl font-black text-amber-950 mt-1 block">{soilData.organicCarbon}%</span>
            <span className="text-[10px] text-amber-700 font-medium">Target: &gt;0.75% for high yield</span>
          </div>
          <div className="p-3 bg-white rounded-xl text-amber-600 shadow-sm">
            <Scale className="w-6 h-6" />
          </div>
        </div>

        {/* Soil pH Rating */}
        <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-sky-800 uppercase block">{t.phLabel} Rating</span>
            <span className="text-lg font-black text-sky-950 mt-1 block">
              {farmerProfile.ph} pH ({language === 'hi' ? soilData.phRatingHindi : soilData.phRating})
            </span>
            <span className="text-[10px] text-sky-700 font-medium">Ideal Range: 6.2 - 7.5</span>
          </div>
          <div className="p-3 bg-white rounded-xl text-sky-600 shadow-sm">
            <TestTube className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* NPK Status Badges */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">{t.soilNutrientsHeader}</h4>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 text-[10px] block font-semibold">Nitrogen (N)</span>
            <span className="font-bold text-slate-900 text-sm">{farmerProfile.nitrogen} kg/ha</span>
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${
              soilData.nitrogenStatus === 'optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {soilData.nitrogenStatus}
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 text-[10px] block font-semibold">Phosphorus (P)</span>
            <span className="font-bold text-slate-900 text-sm">{farmerProfile.phosphorus} kg/ha</span>
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${
              soilData.phosphorusStatus === 'optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {soilData.phosphorusStatus}
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 text-[10px] block font-semibold">Potassium (K)</span>
            <span className="font-bold text-slate-900 text-sm">{farmerProfile.potassium} kg/ha</span>
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${
              soilData.potassiumStatus === 'optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {soilData.potassiumStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Calculated Fertilizer Dosage */}
      <div className="space-y-3">
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">{t.fertilizerDoseTitle}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {soilData.fertilizers.map((fert, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start justify-between">
              <div>
                <h5 className="font-bold text-slate-900 text-sm">
                  {language === 'hi' ? fert.hindiName : fert.name}
                </h5>
                <p className="text-slate-500 mt-0.5">
                  Timing: {language === 'hi' ? fert.timingHindi : fert.timing}
                </p>
              </div>
              <span className="bg-emerald-100 text-emerald-900 font-extrabold px-3 py-1 rounded-lg shrink-0 text-xs">
                {language === 'hi' ? fert.amountPerAcreHindi : fert.amountPerAcre}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
