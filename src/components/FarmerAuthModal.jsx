import React, { useState } from 'react';
import { UserCheck, Lock, Mail, ArrowRight, X, Save, ArrowLeft } from 'lucide-react';
import { translations } from '../i18n/translations';
import { signUpFarmerFirebase, signInFarmerFirebase } from '../services/firebaseAuthService';
import { saveFarmerProfileToFirestore } from '../services/firebaseDbService';

const INDIAN_STATES = [
  'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'Madhya Pradesh',
  'Rajasthan', 'Maharashtra', 'Gujarat', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu'
];

export const FarmerAuthModal = ({
  isOpen,
  onClose,
  language,
  onAuthSuccess
}) => {
  const t = translations[language];

  const [mode, setMode] = useState('signin');
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('Punjab');
  const [district, setDistrict] = useState('Ludhiana');

  const [landArea, setLandArea] = useState(5);
  const [landUnit, setLandUnit] = useState('acres');
  const [soilType, setSoilType] = useState('alluvial');
  const [irrigation, setIrrigation] = useState('borewell');
  const [currentCrop, setCurrentCrop] = useState('Wheat (गेहूं)');
  const [nitrogen, setNitrogen] = useState(120);
  const [phosphorus, setPhosphorus] = useState(45);
  const [potassium, setPotassium] = useState(50);
  const [ph, setPh] = useState(6.8);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { user, error } = await signInFarmerFirebase(email, password);
    setLoading(false);

    if (error || !user) {
      setErrorMsg(error || 'Sign in failed. Check credentials.');
      return;
    }

    const profile = {
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

  const handleSignUpStep1 = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !email || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setStep(2);
  };

  const handleCompleteSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { user, error } = await signUpFarmerFirebase(email, password, name, state, district);
    setLoading(false);

    if (error || !user) {
      setErrorMsg(error || 'Registration failed.');
      return;
    }

    const profile = {
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

    saveFarmerProfileToFirestore(profile);

    onAuthSuccess(user, profile);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            padding: '0.5rem',
            color: '#94a3b8',
            background: 'transparent',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer'
          }}
        >
          <X style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>

        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '1rem' }}>
            <UserCheck style={{ width: '1.75rem', height: '1.75rem' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>
              {mode === 'signin' ? t.farmerSignInTitle : t.farmerSignUpTitle}
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
              {mode === 'signin' ? 'Sign in to access your farm dashboard' : 'Create account & setup farm profile'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '1rem', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
          <button
            type="button"
            onClick={() => { setMode('signin'); setStep(1); setErrorMsg(null); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: mode === 'signin' ? '#16a34a' : 'transparent',
              color: mode === 'signin' ? '#ffffff' : '#475569'
            }}
          >
            {t.signInBtn.split('&')[0]}
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setStep(1); setErrorMsg(null); }}
            style={{
              flex: 1,
              padding: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: mode === 'signup' ? '#16a34a' : 'transparent',
              color: mode === 'signup' ? '#ffffff' : '#475569'
            }}
          >
            {t.farmerSignUpTitle.split(' ')[0]} (Sign Up)
          </button>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.75rem' }}>
            {errorMsg}
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">{t.emailOrPhoneLabel}</label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ width: '1rem', height: '1rem', color: '#94a3b8', position: 'absolute', left: '0.875rem', top: '0.75rem' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@example.com"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t.passwordLabel}</label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ width: '1rem', height: '1rem', color: '#94a3b8', position: 'absolute', left: '0.875rem', top: '0.75rem' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-full btn-lg"
              style={{ marginTop: '0.5rem' }}
            >
              {loading ? (
                <div className="animate-spin" style={{ width: '1.25rem', height: '1.25rem', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
              ) : (
                <>
                  <span>{t.signInBtn}</span>
                  <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </>
              )}
            </button>
          </form>
        )}

        {/* SIGN UP FORM (Step 1) */}
        {mode === 'signup' && step === 1 && (
          <form onSubmit={handleSignUpStep1} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">{t.nameLabel}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ramesh Kumar"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t.emailOrPhoneLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t.passwordLabel}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">{t.stateLabel}</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="form-select"
                >
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t.districtLabel}</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              style={{ marginTop: '0.5rem' }}
            >
              <span>Next: Farm Details (खेत विवरण)</span>
              <ArrowRight style={{ width: '1rem', height: '1rem' }} />
            </button>
          </form>
        )}

        {/* SIGN UP FORM (Step 2) */}
        {mode === 'signup' && step === 2 && (
          <form onSubmit={handleCompleteSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', fontSize: '0.75rem' }}>{t.farmSetupTitle}</span>
              <button type="button" onClick={() => setStep(1)} style={{ color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                <ArrowLeft style={{ width: '0.875rem', height: '0.875rem' }} /> Back
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">{t.landAreaLabel}</label>
                <input
                  type="number"
                  step="0.5"
                  value={landArea}
                  onChange={(e) => setLandArea(parseFloat(e.target.value) || 1)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t.landUnitLabel}</label>
                <select
                  value={landUnit}
                  onChange={(e) => setLandUnit(e.target.value)}
                  className="form-select"
                >
                  <option value="acres">Acres (एकड़)</option>
                  <option value="bigha">Bigha (बीघा)</option>
                  <option value="hectares">Hectares (हेक्टेयर)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">{t.soilTypeLabel}</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="form-select"
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

              <div className="form-group">
                <label className="form-label">{t.irrigationLabel}</label>
                <select
                  value={irrigation}
                  onChange={(e) => setIrrigation(e.target.value)}
                  className="form-select"
                >
                  <option value="canal">{t.canal}</option>
                  <option value="borewell">{t.borewell}</option>
                  <option value="drip">{t.drip}</option>
                  <option value="sprinkler">{t.sprinkler}</option>
                  <option value="rainfed">{t.rainfed}</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t.currentCropLabel}</label>
              <input
                type="text"
                value={currentCrop}
                onChange={(e) => setCurrentCrop(e.target.value)}
                placeholder="e.g. Wheat, Paddy, Mustard"
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-full btn-lg"
              style={{ marginTop: '0.5rem' }}
            >
              {loading ? (
                <div className="animate-spin" style={{ width: '1.25rem', height: '1.25rem', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
              ) : (
                <>
                  <Save style={{ width: '1rem', height: '1rem' }} />
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
