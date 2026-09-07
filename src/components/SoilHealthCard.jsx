import React from 'react';
import { Activity, TestTube, Scale, CheckCircle2 } from 'lucide-react';
import { translations } from '../i18n/translations';
import { analyzeSoilHealth } from '../services/soilHealthService';

export const SoilHealthCard = ({ farmerProfile, language }) => {
  const t = translations[language];

  const soilData = analyzeSoilHealth(
    farmerProfile.nitrogen,
    farmerProfile.phosphorus,
    farmerProfile.potassium,
    farmerProfile.ph,
    farmerProfile.soilType
  );

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '0.5rem' }}>
            <TestTube style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{t.soilTitle}</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.soilSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Score Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {/* Health Index */}
        <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #f0fdfa)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', textTransform: 'uppercase', display: 'block' }}>{t.healthIndexLabel}</span>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#052e16', marginTop: '0.25rem', display: 'block' }}>{soilData.healthIndex}%</span>
            <span style={{ fontSize: '0.625rem', color: '#15803d', fontWeight: 500 }}>Nutrient & Microbial Status</span>
          </div>
          <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
        </div>

        {/* Organic Carbon */}
        <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e', textTransform: 'uppercase', display: 'block' }}>{t.organicCarbonLabel}</span>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#451a03', marginTop: '0.25rem', display: 'block' }}>{soilData.organicCarbon}%</span>
            <span style={{ fontSize: '0.625rem', color: '#b45309', fontWeight: 500 }}>Target: &gt;0.75% for high yield</span>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', color: '#d97706' }}>
            <Scale style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
        </div>

        {/* Soil pH Rating */}
        <div style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#075985', textTransform: 'uppercase', display: 'block' }}>{t.phLabel} Rating</span>
            <span style={{ fontSize: '1.125rem', fontWeight: 900, color: '#082f49', marginTop: '0.25rem', display: 'block' }}>
              {farmerProfile.ph} pH ({language === 'hi' ? soilData.phRatingHindi : soilData.phRating})
            </span>
            <span style={{ fontSize: '0.625rem', color: '#0369a1', fontWeight: 500 }}>Ideal Range: 6.2 - 7.5</span>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', color: '#0284c7' }}>
            <TestTube style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
        </div>
      </div>

      {/* NPK Status Badges */}
      <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h4 style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.75rem', textTransform: 'uppercase' }}>{t.soilNutrientsHeader}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', textAlign: 'center', fontSize: '0.75rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '0.625rem', display: 'block', fontWeight: 600 }}>Nitrogen (N)</span>
            <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>{farmerProfile.nitrogen} kg/ha</span>
            <span style={{
              display: 'inline-block',
              padding: '0.125rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.625rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginTop: '0.25rem',
              backgroundColor: soilData.nitrogenStatus === 'optimal' ? '#dcfce7' : '#fef3c7',
              color: soilData.nitrogenStatus === 'optimal' ? '#166534' : '#92400e'
            }}>
              {soilData.nitrogenStatus}
            </span>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '0.625rem', display: 'block', fontWeight: 600 }}>Phosphorus (P)</span>
            <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>{farmerProfile.phosphorus} kg/ha</span>
            <span style={{
              display: 'inline-block',
              padding: '0.125rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.625rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginTop: '0.25rem',
              backgroundColor: soilData.phosphorusStatus === 'optimal' ? '#dcfce7' : '#fef3c7',
              color: soilData.phosphorusStatus === 'optimal' ? '#166534' : '#92400e'
            }}>
              {soilData.phosphorusStatus}
            </span>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontSize: '0.625rem', display: 'block', fontWeight: 600 }}>Potassium (K)</span>
            <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>{farmerProfile.potassium} kg/ha</span>
            <span style={{
              display: 'inline-block',
              padding: '0.125rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.625rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginTop: '0.25rem',
              backgroundColor: soilData.potassiumStatus === 'optimal' ? '#dcfce7' : '#fef3c7',
              color: soilData.potassiumStatus === 'optimal' ? '#166534' : '#92400e'
            }}>
              {soilData.potassiumStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Calculated Fertilizer Dosage */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h4 style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.75rem', textTransform: 'uppercase' }}>{t.fertilizerDoseTitle}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', fontSize: '0.75rem' }}>
          {soilData.fertilizers.map((fert, idx) => (
            <div key={idx} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div>
                <h5 style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>
                  {language === 'hi' ? fert.hindiName : fert.name}
                </h5>
                <p style={{ color: '#64748b', marginTop: '0.125rem' }}>
                  Timing: {language === 'hi' ? fert.timingHindi : fert.timing}
                </p>
              </div>
              <span style={{ backgroundColor: '#dcfce7', color: '#14532d', fontWeight: 900, padding: '0.25rem 0.75rem', borderRadius: '0.5rem', flexShrink: 0, fontSize: '0.75rem' }}>
                {language === 'hi' ? fert.amountPerAcreHindi : fert.amountPerAcre}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
