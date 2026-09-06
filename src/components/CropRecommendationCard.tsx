import React, { useState, useEffect } from 'react';
import { Sprout, CheckCircle2, Droplets, Clock, DollarSign, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';
import { FarmerProfile, Language, Season, CropRecommendation } from '../types';
import { translations } from '../i18n/translations';
import { recommendCrops } from '../services/cropRecommendationService';

interface CropRecommendationCardProps {
  farmerProfile: FarmerProfile;
  language: Language;
}

export const CropRecommendationCard: React.FC<CropRecommendationCardProps> = ({ farmerProfile, language }) => {
  const t = translations[language];

  const [season, setSeason] = useState<Season>('rabi');
  const [soilType, setSoilType] = useState(farmerProfile.soilType);
  const [irrigation, setIrrigation] = useState(farmerProfile.irrigation);
  const [nitrogen, setNitrogen] = useState(farmerProfile.nitrogen);
  const [phosphorus, setPhosphorus] = useState(farmerProfile.phosphorus);
  const [potassium, setPotassium] = useState(farmerProfile.potassium);
  const [ph, setPh] = useState(farmerProfile.ph);

  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedCrop, setExpandedCrop] = useState<string | null>(null);

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const results = recommendCrops({
        soilType,
        season,
        irrigation,
        nitrogen,
        phosphorus,
        potassium,
        ph,
      });
      setRecommendations(results);
      if (results.length > 0) setExpandedCrop(results[0].cropName);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    handleCalculate();
  }, [farmerProfile]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.recommendationTitle}</h2>
            <p className="text-xs text-slate-500">{t.recommendationSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Input Parameters Box */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-emerald-600" />
            Field & Nutrient Parameters
          </span>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-2.5 py-0.5 rounded-full">
            {farmerProfile.district}, {farmerProfile.state}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Season Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t.seasonLabel}</label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value as Season)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="rabi">Rabi Winter (रबी: गेहूँ, सरसों, चना)</option>
              <option value="kharif">Kharif Monsoon (खरीफ: धान, मक्का, कपास)</option>
              <option value="zaid">Zaid Summer (जायद: मूंगफली, सब्जियां)</option>
            </select>
          </div>

          {/* Soil Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t.soilTypeLabel}</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="alluvial">{t.alluvial}</option>
              <option value="black">{t.black}</option>
              <option value="red">{t.red}</option>
              <option value="laterite">{t.laterite}</option>
              <option value="desert">{t.desert}</option>
              <option value="clay">{t.clay}</option>
              <option value="loam">{t.loam}</option>
            </select>
          </div>

          {/* Water Availability */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t.waterAvailabilityLabel}</label>
            <select
              value={irrigation}
              onChange={(e) => setIrrigation(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="canal">{t.canal}</option>
              <option value="borewell">{t.borewell}</option>
              <option value="drip">{t.drip}</option>
              <option value="sprinkler">{t.sprinkler}</option>
              <option value="rainfed">{t.rainfed}</option>
            </select>
          </div>
        </div>

        {/* N-P-K Sliders */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200">
          <div>
            <span className="text-[11px] font-semibold text-slate-600 block">{t.nitrogenLabel}: <strong className="text-emerald-700">{nitrogen}</strong></span>
            <input type="range" min="20" max="180" value={nitrogen} onChange={(e) => setNitrogen(parseInt(e.target.value))} className="w-full accent-emerald-600" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-600 block">{t.phosphorusLabel}: <strong className="text-emerald-700">{phosphorus}</strong></span>
            <input type="range" min="10" max="100" value={phosphorus} onChange={(e) => setPhosphorus(parseInt(e.target.value))} className="w-full accent-emerald-600" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-600 block">{t.potassiumLabel}: <strong className="text-emerald-700">{potassium}</strong></span>
            <input type="range" min="10" max="120" value={potassium} onChange={(e) => setPotassium(parseInt(e.target.value))} className="w-full accent-emerald-600" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-600 block">{t.phLabel}: <strong className="text-emerald-700">{ph}</strong></span>
            <input type="range" step="0.1" min="5.0" max="8.5" value={ph} onChange={(e) => setPh(parseFloat(e.target.value))} className="w-full accent-emerald-600" />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{t.calculateCropsBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Top 3 Crop Recommendation Output Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t.topCropsHeader}</h3>

        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((crop, idx) => {
            const isExpanded = expandedCrop === crop.cropName;
            return (
              <div
                key={crop.cropName}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  idx === 0 ? 'bg-gradient-to-r from-emerald-50/70 to-green-50/70 border-emerald-300 ring-2 ring-emerald-500/20' : 'bg-white border-slate-200'
                }`}
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        idx === 0 ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">
                          {language === 'hi' ? crop.hindiName : crop.cropName}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {language === 'hi' ? crop.reasonHindi : crop.reason}
                        </p>
                      </div>
                    </div>

                    {/* Suitability Score Badge */}
                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.suitabilityScore}</span>
                        <span className="text-2xl font-black text-emerald-700">{crop.suitability}%</span>
                      </div>
                      <button
                        onClick={() => setExpandedCrop(isExpanded ? null : crop.cropName)}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Suitability Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${crop.suitability}%` }}
                    ></div>
                  </div>

                  {/* Quick Info Badges */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/60 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">{t.growingPeriod}</span>
                        <span className="font-semibold">{language === 'hi' ? crop.durationHindi : crop.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">{t.waterRequirement}</span>
                        <span className="font-semibold">{language === 'hi' ? crop.waterReqHindi : crop.waterReq}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">{t.expectedYield}</span>
                        <span className="font-semibold">{crop.expectedYield}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Step-by-Step Guidance */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-emerald-200/60 space-y-2 text-xs">
                      <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {t.farmingGuidance}
                      </h5>
                      <ul className="space-y-1.5 pl-2">
                        {(language === 'hi' ? crop.guidanceHindi : crop.guidance).map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-slate-700">
                            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
