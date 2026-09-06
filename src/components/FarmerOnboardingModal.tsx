import React, { useState } from 'react';
import { X, Save, MapPin, Layers, Droplets, User } from 'lucide-react';
import { FarmerProfile, Language, SoilType, IrrigationType } from '../types';
import { translations } from '../i18n/translations';

interface FarmerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmerProfile;
  onSave: (updated: FarmerProfile) => void;
  language: Language;
}

const INDIAN_STATES = [
  'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'Madhya Pradesh',
  'Rajasthan', 'Maharashtra', 'Gujarat', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu'
];

export const FarmerOnboardingModal: React.FC<FarmerOnboardingModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  language
}) => {
  const t = translations[language];

  const [form, setForm] = useState<FarmerProfile>({ ...profile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, updatedAt: new Date().toISOString() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.profileTitle}</h2>
            <p className="text-xs text-slate-500">{t.profileDesc}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Farmer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.farmerNameLabel}</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.stateLabel}</label>
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* District & Land Area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.districtLabel}</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.landAreaLabel}</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={form.landArea}
                onChange={(e) => setForm({ ...form, landArea: parseFloat(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.landUnitLabel}</label>
              <select
                value={form.landUnit}
                onChange={(e) => setForm({ ...form, landUnit: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="acres">Acres (एकड़)</option>
                <option value="bigha">Bigha (बीघा)</option>
                <option value="hectares">Hectares (हेक्टेयर)</option>
              </select>
            </div>
          </div>

          {/* Soil Type & Irrigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.soilTypeLabel}</label>
              <select
                value={form.soilType}
                onChange={(e) => setForm({ ...form, soilType: e.target.value as SoilType })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.irrigationLabel}</label>
              <select
                value={form.irrigation}
                onChange={(e) => setForm({ ...form, irrigation: e.target.value as IrrigationType })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="canal">{t.canal}</option>
                <option value="borewell">{t.borewell}</option>
                <option value="drip">{t.drip}</option>
                <option value="sprinkler">{t.sprinkler}</option>
                <option value="rainfed">{t.rainfed}</option>
              </select>
            </div>
          </div>

          {/* Current Crop */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t.currentCropLabel}</label>
            <input
              type="text"
              value={form.currentCrop}
              onChange={(e) => setForm({ ...form, currentCrop: e.target.value })}
              placeholder="e.g. Wheat, Rice, Mustard"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Soil Chemical Sliders */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">{t.soilNutrientsHeader}</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block">{t.nitrogenLabel}: {form.nitrogen}</label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={form.nitrogen}
                  onChange={(e) => setForm({ ...form, nitrogen: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block">{t.phosphorusLabel}: {form.phosphorus}</label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={form.phosphorus}
                  onChange={(e) => setForm({ ...form, phosphorus: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block">{t.potassiumLabel}: {form.potassium}</label>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={form.potassium}
                  onChange={(e) => setForm({ ...form, potassium: parseInt(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block">{t.phLabel}: {form.ph}</label>
                <input
                  type="range"
                  step="0.1"
                  min="4.5"
                  max="9.0"
                  value={form.ph}
                  onChange={(e) => setForm({ ...form, ph: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-200 transition flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              <span>{t.saveProfileBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
