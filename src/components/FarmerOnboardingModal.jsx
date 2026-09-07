import React, { useState } from 'react';
import { X, Save, User } from 'lucide-react';
import { translations } from '../i18n/translations';
import { getStatesList, getDistrictsList, getTehsilsList } from '../data/indianLocations';

export const FarmerOnboardingModal = ({
  isOpen,
  onClose,
  profile,
  onSave,
  language
}) => {
  const t = translations[language];

  const [form, setForm] = useState({ ...profile });

  if (!isOpen) return null;

  const statesList = getStatesList();
  const districtsList = getDistrictsList(form.state);
  const tehsilsList = getTehsilsList(form.state, form.district);

  const handleStateChange = (newSt) => {
    const newDistList = getDistrictsList(newSt);
    const firstDist = newDistList[0] || '';
    const newTehList = getTehsilsList(newSt, firstDist);
    setForm({
      ...form,
      state: newSt,
      district: firstDist,
      tehsil: newTehList[0] || ''
    });
  };

  const handleDistrictChange = (newDist) => {
    const newTehList = getTehsilsList(form.state, newDist);
    setForm({
      ...form,
      district: newDist,
      tehsil: newTehList[0] || ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, updatedAt: new Date().toISOString() });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: '38rem' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '0.75rem' }}>
            <User style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{t.profileTitle}</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.profileDesc}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">{t.farmerNameLabel}</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t.stateLabel}</label>
              <select
                value={form.state}
                onChange={(e) => handleStateChange(e.target.value)}
                className="form-select"
              >
                {statesList.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <div className="form-group">
              <label className="form-label">{t.districtLabel}</label>
              <select
                value={form.district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="form-select"
              >
                {districtsList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tehsil / Region</label>
              <select
                value={form.tehsil || tehsilsList[0]}
                onChange={(e) => setForm({ ...form, tehsil: e.target.value })}
                className="form-select"
              >
                {tehsilsList.map((th) => (
                  <option key={th} value={th}>{th}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t.landAreaLabel}</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={form.landArea}
                onChange={(e) => setForm({ ...form, landArea: parseFloat(e.target.value) || 1 })}
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <div className="form-group">
              <label className="form-label">{t.landUnitLabel}</label>
              <select
                value={form.landUnit}
                onChange={(e) => setForm({ ...form, landUnit: e.target.value })}
                className="form-select"
              >
                <option value="acres">Acres (एकड़)</option>
                <option value="bigha">Bigha (बीघा)</option>
                <option value="hectares">Hectares (हेक्टेयर)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t.soilTypeLabel}</label>
              <select
                value={form.soilType}
                onChange={(e) => setForm({ ...form, soilType: e.target.value })}
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
                value={form.irrigation}
                onChange={(e) => setForm({ ...form, irrigation: e.target.value })}
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
              value={form.currentCrop}
              onChange={(e) => setForm({ ...form, currentCrop: e.target.value })}
              placeholder="e.g. Wheat, Rice, Mustard"
              className="form-input"
            />
          </div>

          {/* Soil Chemical Sliders */}
          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.75rem', textTransform: 'uppercase' }}>{t.soilNutrientsHeader}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block' }}>{t.nitrogenLabel}: {form.nitrogen}</label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={form.nitrogen}
                  onChange={(e) => setForm({ ...form, nitrogen: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: '#16a34a' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block' }}>{t.phosphorusLabel}: {form.phosphorus}</label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={form.phosphorus}
                  onChange={(e) => setForm({ ...form, phosphorus: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: '#16a34a' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block' }}>{t.potassiumLabel}: {form.potassium}</label>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={form.potassium}
                  onChange={(e) => setForm({ ...form, potassium: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: '#16a34a' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block' }}>{t.phLabel}: {form.ph}</label>
                <input
                  type="range"
                  step="0.1"
                  min="4.5"
                  max="9.0"
                  value={form.ph}
                  onChange={(e) => setForm({ ...form, ph: parseFloat(e.target.value) })}
                  style={{ width: '100%', accentColor: '#16a34a' }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
          >
            <Save style={{ width: '1.25rem', height: '1.25rem' }} />
            <span>{t.saveProfileBtn}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
