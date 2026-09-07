import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, AlertTriangle, RefreshCw, Beaker, Leaf } from 'lucide-react';
import { translations } from '../i18n/translations';
import { analyzeCropDiseaseImage, DEMO_DISEASE_SAMPLES } from '../services/diseaseDetectionService';
import { saveDiseaseScan } from '../services/storageService';

export const DiseaseDetectionCard = ({ language }) => {
  const t = translations[language];

  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setSelectedImage(base64);
        runDiagnosis(base64, 0);
      };
      reader.readAsDataURL(file);
    }
  };

  const runDiagnosis = async (imgBase64, sampleIdx = 0) => {
    setAnalyzing(true);
    setResult(null);

    setTimeout(async () => {
      const res = await analyzeCropDiseaseImage(imgBase64, sampleIdx);
      setResult(res);
      saveDiseaseScan(res);
      import('../services/firebaseDbService').then(m => m.saveDiseaseScanToFirestore(res));
      setAnalyzing(false);
    }, 1200);
  };

  const handleSampleClick = (idx) => {
    setSelectedImage(null);
    runDiagnosis('', idx);
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '0.5rem' }}>
            <Camera style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{t.diseaseTitle}</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.diseaseSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Upload / Camera / Sample Area */}
      {!result && !analyzing && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Upload Dropzone */}
          <div style={{
            border: '2px dashed #cbd5e1',
            backgroundColor: '#f8fafc',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%', zIndex: 10 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', color: '#16a34a' }}>
                <Upload style={{ width: '2rem', height: '2rem' }} />
              </div>
              <h3 style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.875rem' }}>{t.uploadBoxText}</h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Supports JPG, PNG, WEBP leaf photos (Max 10MB)</p>
            </div>
          </div>

          {/* Quick Demo Sample Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>{t.sampleImagesBtn}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {[
                { title: 'Wheat Yellow Rust', hindi: 'गेहूं रतुआ', crop: 'Wheat' },
                { title: 'Potato Late Blight', hindi: 'आलू झुलसा', crop: 'Potato' },
                { title: 'Paddy Rice Blast', hindi: 'धान ब्लास्ट', crop: 'Paddy' },
                { title: 'Healthy Tomato', hindi: 'टमाटर स्वस्थ', crop: 'Tomato' },
              ].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSampleClick(idx)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b' }}>{language === 'hi' ? sample.hindi : sample.title}</p>
                  <span style={{ fontSize: '0.625rem', color: '#64748b' }}>{sample.crop} Demo</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading Scan State */}
      {analyzing && (
        <div style={{ padding: '3rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '4rem', height: '4rem' }}>
            <div className="animate-spin" style={{ position: 'absolute', inset: 0, border: '4px solid #bbf7d0', borderTopColor: '#16a34a', borderRadius: '50%' }}></div>
            <Camera style={{ width: '2rem', height: '2rem', color: '#16a34a', position: 'absolute', inset: 0, margin: 'auto' }} />
          </div>
          <div>
            <h3 style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.875rem' }}>{t.analyzingImage}</h3>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Checking for pathogens, chlorosis, and fungal leaf lesions...</p>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && !analyzing && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top Result Banner */}
          <div style={{
            padding: '1.25rem',
            borderRadius: '1rem',
            border: '1px solid',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            backgroundColor: result.isHealthy ? '#f0fdf4' : result.severity === 'high' ? '#fff1f2' : '#fffbeb',
            borderColor: result.isHealthy ? '#bbf7d0' : result.severity === 'high' ? '#fecdd3' : '#fde68a',
            color: result.isHealthy ? '#14532d' : result.severity === 'high' ? '#881337' : '#78350f'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ marginTop: '0.25rem' }}>
                {result.isHealthy ? (
                  <CheckCircle2 style={{ width: '1.75rem', height: '1.75rem', color: '#16a34a' }} />
                ) : (
                  <AlertTriangle style={{ width: '1.75rem', height: '1.75rem', color: '#e11d48' }} />
                )}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, color: '#475569' }}>{t.detectedCrop}:</span>
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.875rem' }}>{language === 'hi' ? result.cropHindiName : result.detectedCrop}</span>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 900, marginTop: '0.125rem' }}>
                  {language === 'hi' ? result.diseaseHindiName : result.diseaseName}
                </h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
                  Diagnostics severity: <strong style={{ textTransform: 'uppercase' }}>{result.severity}</strong>
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', display: 'block' }}>{t.confidenceScore}</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803d' }}>{result.confidence}%</span>
              {result.isDemo && (
                <span style={{ fontSize: '0.5625rem', backgroundColor: '#fde68a', color: '#78350f', fontWeight: 800, padding: '0.125rem 0.5rem', borderRadius: '9999px', display: 'inline-block', marginTop: '0.25rem' }}>
                  Demo Analysis Mode
                </span>
              )}
            </div>
          </div>

          {/* Symptoms & Preventive Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <AlertTriangle style={{ width: '1rem', height: '1rem', color: '#d97706' }} />
                {t.symptomsTitle}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', color: '#334155' }}>
                {(language === 'hi' ? result.symptomsHindi : result.symptoms).map((sym, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                    <span style={{ color: '#f59e0b' }}>•</span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
                {t.preventiveStepsTitle}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', color: '#334155' }}>
                {(language === 'hi' ? result.preventiveStepsHindi : result.preventiveSteps).map((step, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                    <span style={{ color: '#16a34a' }}>•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Remedies */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bfdbfe', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '0.75rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Beaker style={{ width: '1rem', height: '1rem', color: '#2563eb' }} />
                {t.chemicalTreatment}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.75rem', color: '#172554' }}>
                {(language === 'hi' ? result.recommendedActions.chemicalHindi : result.recommendedActions.chemical).map((chem, idx) => (
                  <li key={idx} style={{ backgroundColor: '#ffffff', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #dbeafe', lineHeight: 1.5 }}>
                    {chem}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ fontWeight: 800, color: '#14532d', fontSize: '0.75rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Leaf style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
                {t.organicTreatment}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.75rem', color: '#052e16' }}>
                {(language === 'hi' ? result.recommendedActions.organicHindi : result.recommendedActions.organic).map((org, idx) => (
                  <li key={idx} style={{ backgroundColor: '#ffffff', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #dcfce7', lineHeight: 1.5 }}>
                    {org}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => { setResult(null); setSelectedImage(null); }}
            className="btn btn-secondary btn-full"
          >
            <RefreshCw style={{ width: '1rem', height: '1rem' }} />
            <span>{t.scanAnotherBtn}</span>
          </button>
        </div>
      )}
    </div>
  );
};
