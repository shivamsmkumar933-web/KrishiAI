import React, { useState } from 'react';
import { Camera, Upload, ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Beaker, Leaf } from 'lucide-react';
import { Language, DiseaseAnalysisResult } from '../types';
import { translations } from '../i18n/translations';
import { analyzeCropDiseaseImage, DEMO_DISEASE_SAMPLES } from '../services/diseaseDetectionService';
import { saveDiseaseScan } from '../services/storageService';

interface DiseaseDetectionCardProps {
  language: Language;
}

export const DiseaseDetectionCard: React.FC<DiseaseDetectionCardProps> = ({ language }) => {
  const t = translations[language];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        runDiagnosis(base64, 0);
      };
      reader.readAsDataURL(file);
    }
  };

  const runDiagnosis = async (imgBase64: string, sampleIdx: number = 0) => {
    setAnalyzing(true);
    setResult(null);

    // Simulate AI vision network scan time
    setTimeout(async () => {
      const res = await analyzeCropDiseaseImage(imgBase64, sampleIdx);
      setResult(res);
      saveDiseaseScan(res);
      import('../services/firebaseDbService').then(m => m.saveDiseaseScanToFirestore(res));
      setAnalyzing(false);
    }, 1200);
  };

  const handleSampleClick = (idx: number) => {
    const sample = DEMO_DISEASE_SAMPLES[idx];
    setSelectedImage(null);
    runDiagnosis('', idx);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.diseaseTitle}</h2>
            <p className="text-xs text-slate-500">{t.diseaseSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Upload / Camera / Sample Area */}
      {!result && !analyzing && (
        <div className="space-y-4">
          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 rounded-2xl p-8 text-center transition cursor-pointer relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-emerald-600 group-hover:scale-110 transition">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{t.uploadBoxText}</h3>
              <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP leaf photos (Max 10MB)</p>
            </div>
          </div>

          {/* Quick Demo Sample Cards */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.sampleImagesBtn}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { title: 'Wheat Yellow Rust', hindi: 'गेहूं रतुआ', crop: 'Wheat' },
                { title: 'Potato Late Blight', hindi: 'आलू झुलसा', crop: 'Potato' },
                { title: 'Paddy Rice Blast', hindi: 'धान ब्लास्ट', crop: 'Paddy' },
                { title: 'Healthy Tomato', hindi: 'टमाटर स्वस्थ', crop: 'Tomato' },
              ].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSampleClick(idx)}
                  className="p-3 bg-slate-50 hover:bg-emerald-100/70 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition"
                >
                  <p className="text-xs font-bold text-slate-800">{language === 'hi' ? sample.hindi : sample.title}</p>
                  <span className="text-[10px] text-slate-500">{sample.crop} Demo</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading Scan State */}
      {analyzing && (
        <div className="py-12 text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <Camera className="w-8 h-8 text-emerald-600 absolute inset-0 m-auto" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">{t.analyzingImage}</h3>
            <p className="text-xs text-slate-500">Checking for pathogens, chlorosis, and fungal leaf lesions...</p>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && !analyzing && (
        <div className="space-y-6">
          {/* Top Result Banner */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            result.isHealthy
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : result.severity === 'high'
              ? 'bg-rose-50 border-rose-200 text-rose-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {result.isHealthy ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-rose-600" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold text-slate-600">{t.detectedCrop}:</span>
                  <span className="font-bold text-slate-900 text-sm">{language === 'hi' ? result.cropHindiName : result.detectedCrop}</span>
                </div>
                <h3 className="text-lg font-black mt-0.5">
                  {language === 'hi' ? result.diseaseHindiName : result.diseaseName}
                </h3>
                <p className="text-xs opacity-80 mt-1">
                  Diagnostics severity: <strong className="uppercase">{result.severity}</strong>
                </p>
              </div>
            </div>

            {/* Confidence Badge */}
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-500">{t.confidenceScore}</span>
              <span className="text-2xl font-black text-emerald-700">{result.confidence}%</span>
              {result.isDemo && (
                <span className="text-[9px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full mt-1">
                  Demo Analysis Mode
                </span>
              )}
            </div>
          </div>

          {/* Symptoms & Preventive Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Symptoms */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                {t.symptomsTitle}
              </h4>
              <ul className="space-y-1 text-xs text-slate-700">
                {(language === 'hi' ? result.symptomsHindi : result.symptoms).map((sym, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-500">•</span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preventive Steps */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t.preventiveStepsTitle}
              </h4>
              <ul className="space-y-1 text-xs text-slate-700">
                {(language === 'hi' ? result.preventiveStepsHindi : result.preventiveSteps).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chemical vs Organic Remedies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chemical Spray Dosage */}
            <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 space-y-2">
              <h4 className="font-bold text-blue-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Beaker className="w-4 h-4 text-blue-600" />
                {t.chemicalTreatment}
              </h4>
              <ul className="space-y-1.5 text-xs text-blue-950">
                {(language === 'hi' ? result.recommendedActions.chemicalHindi : result.recommendedActions.chemical).map((chem, idx) => (
                  <li key={idx} className="bg-white p-2 rounded-lg border border-blue-100 leading-relaxed">
                    {chem}
                  </li>
                ))}
              </ul>
            </div>

            {/* Organic Natural Remedies */}
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                {t.organicTreatment}
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {(language === 'hi' ? result.recommendedActions.organicHindi : result.recommendedActions.organic).map((org, idx) => (
                  <li key={idx} className="bg-white p-2 rounded-lg border border-emerald-100 leading-relaxed">
                    {org}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => { setResult(null); setSelectedImage(null); }}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.scanAnotherBtn}</span>
          </button>
        </div>
      )}
    </div>
  );
};
