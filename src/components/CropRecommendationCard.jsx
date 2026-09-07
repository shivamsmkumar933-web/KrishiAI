import React, { useState, useEffect } from 'react';
import { Sprout, CheckCircle2, Droplets, Clock, DollarSign, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';
import { translations } from '../i18n/translations';
import { recommendCrops } from '../services/cropRecommendationService';

export const CropRecommendationCard = ({ farmerProfile, language }) => {
  const t = translations[language];

  const [season, setSeason] = useState('rabi');
  const [soilType, setSoilType] = useState(farmerProfile.soilType);
  const [irrigation, setIrrigation] = useState(farmerProfile.irrigation);
  const [nitrogen, setNitrogen] = useState(farmerProfile.nitrogen);
  const [phosphorus, setPhosphorus] = useState(farmerProfile.phosphorus);
  const [potassium, setPotassium] = useState(farmerProfile.potassium);
  const [ph, setPh] = useState(farmerProfile.ph);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedCrop, setExpandedCrop] = useState(null);

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
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '0.5rem' }}>
            <Sparkles style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{t.recommendationTitle}</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.recommendationSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Input Parameters Box */}
      <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Filter style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
            Field & Nutrient Parameters
          </span>
          <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700, backgroundColor: '#dcfce7', padding: '0.125rem 0.625rem', borderRadius: '9999px' }}>
            {farmerProfile.district}, {farmerProfile.state}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {/* Season Select */}
          <div className="form-group">
            <label className="form-label">{t.seasonLabel}</label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="form-select"
            >
              <option value="rabi">Rabi Winter (रबी: गेहूँ, सरसों, चना)</option>
              <option value="kharif">Kharif Monsoon (खरीफ: धान, मक्का, कपास)</option>
              <option value="zaid">Zaid Summer (जायद: मूंगफली, सब्जियां)</option>
            </select>
          </div>

          {/* Soil Select */}
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

          {/* Water Availability */}
          <div className="form-group">
            <label className="form-label">{t.waterAvailabilityLabel}</label>
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

        {/* N-P-K Sliders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block' }}>{t.nitrogenLabel}: <strong style={{ color: '#15803d' }}>{nitrogen}</strong></span>
            <input type="range" min="20" max="180" value={nitrogen} onChange={(e) => setNitrogen(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#16a34a' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block' }}>{t.phosphorusLabel}: <strong style={{ color: '#15803d' }}>{phosphorus}</strong></span>
            <input type="range" min="10" max="100" value={phosphorus} onChange={(e) => setPhosphorus(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#16a34a' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block' }}>{t.potassiumLabel}: <strong style={{ color: '#15803d' }}>{potassium}</strong></span>
            <input type="range" min="10" max="120" value={potassium} onChange={(e) => setPotassium(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#16a34a' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block' }}>{t.phLabel}: <strong style={{ color: '#15803d' }}>{ph}</strong></span>
            <input type="range" step="0.1" min="5.0" max="8.5" value={ph} onChange={(e) => setPh(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#16a34a' }} />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="btn btn-primary btn-full"
        >
          {loading ? (
            <div className="animate-spin" style={{ width: '1.25rem', height: '1.25rem', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
          ) : (
            <>
              <Sparkles style={{ width: '1rem', height: '1rem' }} />
              <span>{t.calculateCropsBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Top 3 Crop Recommendation Output Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase' }}>{t.topCropsHeader}</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          {recommendations.map((crop, idx) => {
            const isExpanded = expandedCrop === crop.cropName;
            return (
              <div
                key={crop.cropName}
                style={{
                  borderRadius: '1rem',
                  border: '1px solid',
                  overflow: 'hidden',
                  backgroundColor: idx === 0 ? '#f0fdf4' : '#ffffff',
                  borderColor: idx === 0 ? '#86efac' : '#e2e8f0'
                }}
              >
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.125rem',
                        backgroundColor: idx === 0 ? '#16a34a' : '#f1f5f9',
                        color: idx === 0 ? '#ffffff' : '#334155'
                      }}>
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a' }}>
                          {language === 'hi' ? crop.hindiName : crop.cropName}
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.125rem' }}>
                          {language === 'hi' ? crop.reasonHindi : crop.reason}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', display: 'block' }}>{t.suitabilityScore}</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803d' }}>{crop.suitability}%</span>
                      </div>
                      <button
                        onClick={() => setExpandedCrop(isExpanded ? null : crop.cropName)}
                        style={{ padding: '0.5rem', color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer' }}
                      >
                        {isExpanded ? <ChevronUp style={{ width: '1.25rem', height: '1.25rem' }} /> : <ChevronDown style={{ width: '1.25rem', height: '1.25rem' }} />}
                      </button>
                    </div>
                  </div>

                  <div style={{ width: '100%', backgroundColor: '#e2e8f0', height: '0.5rem', borderRadius: '9999px', marginTop: '0.75rem', overflow: 'hidden' }}>
                    <div
                      style={{ backgroundColor: '#16a34a', height: '100%', borderRadius: '9999px', width: `${crop.suitability}%`, transition: 'width 0.5s ease' }}
                    ></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #cbd5e1', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#334155' }}>
                      <Clock style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
                      <div>
                        <span style={{ fontSize: '0.625rem', color: '#94a3b8', display: 'block' }}>{t.growingPeriod}</span>
                        <span style={{ fontWeight: 600 }}>{language === 'hi' ? crop.durationHindi : crop.duration}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#334155' }}>
                      <Droplets style={{ width: '1rem', height: '1rem', color: '#2563eb' }} />
                      <div>
                        <span style={{ fontSize: '0.625rem', color: '#94a3b8', display: 'block' }}>{t.waterRequirement}</span>
                        <span style={{ fontWeight: 600 }}>{language === 'hi' ? crop.waterReqHindi : crop.waterReq}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#334155' }}>
                      <DollarSign style={{ width: '1rem', height: '1rem', color: '#d97706' }} />
                      <div>
                        <span style={{ fontSize: '0.625rem', color: '#94a3b8', display: 'block' }}>{t.expectedYield}</span>
                        <span style={{ fontWeight: 600 }}>{crop.expectedYield}</span>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                      <h5 style={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
                        {t.farmingGuidance}
                      </h5>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', paddingLeft: '0.5rem' }}>
                        {(language === 'hi' ? crop.guidanceHindi : crop.guidance).map((step, sIdx) => (
                          <li key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#334155' }}>
                            <span style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#166534', fontSize: '0.625rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.125rem' }}>
                              {sIdx + 1}
                            </span>
                            <span style={{ lineHeight: 1.5 }}>{step}</span>
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
