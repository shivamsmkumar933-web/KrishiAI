import React, { useState } from 'react';
import { UserCheck, Lock, Mail, MapPin, ArrowRight, X, Sprout, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Language, FarmerProfile, SoilType, IrrigationType } from '../types';
import { translations } from '../i18n/translations';
import { signUpFarmerFirebase, signInFarmerFirebase, AuthUser } from '../services/firebaseAuthService';
import { saveFarmerProfileToFirestore } from '../services/firebaseDbService';

interface FarmerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAuthSuccess: (user: AuthUser, profile: FarmerProfile) => void;
}

const INDIAN_STATES = [
  'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'Madhya Pradesh',
  'Rajasthan', 'Maharashtra', 'Gujarat', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu'
];

export const FarmerAuthModal: React.FC<FarmerAuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onAuthSuccess
}) => {
  const t = translations[language];

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Account, Step 2: Farm Details

  // Account Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('Punjab');
  const [district, setDistrict] = useState('Ludhiana');

  // Farm Onboarding Fields
  const [landArea, setLandArea] = useState(5);
  const [landUnit, setLandUnit] = useState<'acres' | 'bigha' | 'hectares'>('acres');
  const [soilType, setSoilType] = useState<SoilType>('alluvial');
  const [irrigation, setIrrigation] = useState<IrrigationType>('borewell');
  const [currentCrop, setCurrentCrop] = useState('Wheat (गेहूं)');
  const [nitrogen, setNitrogen] = useState(120);
  const [phosphorus, setPhosphorus] = useState(45);
  const [potassium, setPotassium] = useState(50);
  const [ph, setPh] = useState(6.8);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { user, error } = await signInFarmerFirebase(email, password);
    setLoading(false);

    if (error || !user) {
      setErrorMsg(error || 'Sign in failed. Check credentials.');
      return;
    }

    const profile: FarmerProfile = {
      id: user.id,
      name: user.name || 'Ramesh Kumar',
      phone: user.email,
      state: user.state || state,
      district: user.district || district,
      landArea,
      landUnit,
      soilType,
      irrigation,
      currentCrop,
      nitrogen,
      phosphorus,
      potassium,
      ph,
      latitude: 30.9010,
      longitude: 75.8573,
      updatedAt: new Date().toISOString()
    };

    onAuthSuccess(user, profile);
  };

  const handleSignUpStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !email || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setStep(2); // Proceed to Farm Details step
  };

  const handleCompleteSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { user, error } = await signUpFarmerFirebase(email, password, name, state, district);
    setLoading(false);

    if (error || !user) {
      setErrorMsg(error || 'Registration failed.');
      return;
    }

    const profile: FarmerProfile = {
      id: user.id,
      name: user.name,
      phone: user.email,
      state: user.state,
      district: user.district,
      landArea,
      landUnit,
      soilType,
      irrigation,
      currentCrop,
      nitrogen,
      phosphorus,
      potassium,
      ph,
      latitude: 30.9010,
      longitude: 75.8573,
      updatedAt: new Date().toISOString()
    };

    // Save profile to Firebase Firestore
    saveFarmerProfileToFirestore(profile);

    onAuthSuccess(user, profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {mode === 'signin' ? t.farmerSignInTitle : t.farmerSignUpTitle}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {mode === 'signin' ? 'Sign in to access your farm dashboard' : 'Create account & setup farm profile'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 border border-slate-200">
          <button
            type="button"
            onClick={() => { setMode('signin'); setStep(1); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              mode === 'signin' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.signInBtn.split('&')[0]}
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setStep(1); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              mode === 'signup' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.farmerSignUpTitle.split(' ')[0]} (Sign Up)
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.emailOrPhoneLabel}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.passwordLabel}</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-200 transition flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{t.signInBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* SIGN UP FORM (Step 1: Credentials) */}
        {mode === 'signup' && step === 1 && (
          <form onSubmit={handleSignUpStep1} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.nameLabel}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ramesh Kumar"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.emailOrPhoneLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.passwordLabel}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.stateLabel}</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.districtLabel}</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-200 transition flex items-center justify-center gap-2 text-sm mt-2"
            >
              <span>Next: Farm Details (खेत विवरण)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* SIGN UP FORM (Step 2: Farm Onboarding) */}
        {mode === 'signup' && step === 2 && (
          <form onSubmit={handleCompleteSignUp} className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider">{t.farmSetupTitle}</span>
              <button type="button" onClick={() => setStep(1)} className="text-emerald-700 font-bold flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.landAreaLabel}</label>
                <input
                  type="number"
                  step="0.5"
                  value={landArea}
                  onChange={(e) => setLandArea(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.landUnitLabel}</label>
                <select
                  value={landUnit}
                  onChange={(e) => setLandUnit(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="acres">Acres (एकड़)</option>
                  <option value="bigha">Bigha (बीघा)</option>
                  <option value="hectares">Hectares (हेक्टेयर)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.soilTypeLabel}</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value as SoilType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                <label className="block font-bold text-slate-700 mb-1">{t.irrigationLabel}</label>
                <select
                  value={irrigation}
                  onChange={(e) => setIrrigation(e.target.value as IrrigationType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="canal">{t.canal}</option>
                  <option value="borewell">{t.borewell}</option>
                  <option value="drip">{t.drip}</option>
                  <option value="sprinkler">{t.sprinkler}</option>
                  <option value="rainfed">{t.rainfed}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">{t.currentCropLabel}</label>
              <input
                type="text"
                value={currentCrop}
                onChange={(e) => setCurrentCrop(e.target.value)}
                placeholder="e.g. Wheat, Paddy, Mustard"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-200 transition flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{t.saveFarmDetailsBtn}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
