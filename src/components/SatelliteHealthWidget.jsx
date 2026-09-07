import React, { useEffect, useState } from 'react';
import { Globe, Layers, AlertCircle, TrendingUp, MapPin, CheckCircle2, ShieldAlert, ExternalLink, Calendar, Eye } from 'lucide-react';
import { translations } from '../i18n/translations';
import { getSatelliteCropHealth } from '../services/satelliteService';

export const SatelliteHealthWidget = ({ farmerProfile, language }) => {
  const t = translations[language];

  const [satelliteData, setSatelliteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSatelliteCropHealth(farmerProfile.district, farmerProfile.latitude, farmerProfile.longitude)
      .then(data => {
        setSatelliteData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('STAC fetch error:', err);
        setLoading(false);
      });
  }, [farmerProfile]);

  if (loading) {
    return (
      <div className="card" style={{ padding: '3rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
        <div className="animate-spin" style={{ width: '2.5rem', height: '2.5rem', border: '4px solid #bbf7d0', borderTopColor: '#16a34a', borderRadius: '50%' }}></div>
        <p style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1e293b' }}>Querying Microsoft Planetary Computer STAC API...</p>
        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Searching Sentinel-2 L2A low-cloud imagery for {farmerProfile.district} coordinates...</p>
      </div>
    );
  }

  if (!satelliteData) return null;

  const acqDateStr = satelliteData.acquisitionDate
    ? new Date(satelliteData.acquisitionDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : satelliteData.lastUpdated;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe style={{ width: '1.5rem', height: '1.5rem', color: '#16a34a' }} />
            <span>{t.satelliteTitle}</span>
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.satelliteSubtitle}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {!satelliteData.isDemo ? (
            <span style={{ fontSize: '0.6875rem', backgroundColor: '#dcfce7', color: '#052e16', border: '1px solid #86efac', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
              <span>Source: Microsoft Planetary Computer / Sentinel-2</span>
            </span>
          ) : (
            <span style={{ fontSize: '0.6875rem', backgroundColor: '#fef3c7', color: '#78350f', border: '1px solid #fde68a', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ShieldAlert style={{ width: '1rem', height: '1rem', color: '#d97706' }} />
              <span>Demo Satellite Data (Fallback Mode)</span>
            </span>
          )}
        </div>
      </div>

      {/* Overview Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {/* NDVI Score */}
        <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', textTransform: 'uppercase', display: 'block' }}>{t.ndviScoreLabel}</span>
            <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#052e16', marginTop: '0.125rem', display: 'block' }}>{satelliteData.ndviScore}</span>
            <span style={{ fontSize: '0.625rem', color: '#15803d', fontWeight: 500 }}>Formula: (NIR - Red) / (NIR + Red)</span>
          </div>
          <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
            NDVI
          </div>
        </div>

        {/* Vigor Rating */}
        <div style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#075985', textTransform: 'uppercase', display: 'block' }}>{t.healthStatusLabel}</span>
            <span style={{ fontSize: '1.125rem', fontWeight: 900, color: '#082f49', marginTop: '0.25rem', display: 'block' }}>
              {language === 'hi' ? satelliteData.vegetationHealthHindi : satelliteData.vegetationHealth}
            </span>
            <span style={{ fontSize: '0.625rem', color: '#0369a1', fontWeight: 500 }}>Vegetation Cover: {satelliteData.vegetationPct || 65}%</span>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', color: '#0284c7' }}>
            <CheckCircle2 style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
        </div>

        {/* Acquisition Date */}
        <div style={{ backgroundColor: '#faf5ff', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b21a8', textTransform: 'uppercase', display: 'block' }}>Acquisition Date</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#3b0764', marginTop: '0.25rem', display: 'block' }}>{acqDateStr}</span>
            <span style={{ fontSize: '0.625rem', color: '#7e22ce', fontWeight: 500 }}>Cloud Cover: {satelliteData.cloudCoverPct ?? 0}%</span>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', color: '#9333ea' }}>
            <Calendar style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
        </div>

        {/* Target */}
        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', display: 'block' }}>STAC Tile Target</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', marginTop: '0.25rem', display: 'block' }} title={satelliteData.sceneId}>
              {satelliteData.sceneId || 'Sentinel-2 L2A'}
            </span>
            <span style={{ fontSize: '0.625rem', color: '#64748b' }}>{farmerProfile.district} Farm</span>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', color: '#475569' }}>
            <MapPin style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
        </div>
      </div>

      {/* Main Satellite Imagery */}
      <div style={{
        position: 'relative',
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        backgroundColor: '#020617',
        color: '#ffffff',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem'
      }}>
        {satelliteData.previewUrl ? (
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${satelliteData.previewUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(2,6,23,0.9) 0%, rgba(2,6,23,0.4) 100%)' }}></div>
          </div>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #052e16 0%, #0f172a 100%)', opacity: 0.9 }}></div>
        )}

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(0,0,0,0.75)', padding: '0.375rem 0.875rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem' }}>
            <MapPin style={{ width: '1rem', height: '1rem', color: '#4ade80' }} />
            <span style={{ fontWeight: 600 }}>{farmerProfile.district} ({farmerProfile.latitude.toFixed(4)}° N, {farmerProfile.longitude.toFixed(4)}° E)</span>
          </div>

          <span style={{ backgroundColor: 'rgba(0,0,0,0.75)', color: '#86efac', fontSize: '0.6875rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Eye style={{ width: '0.875rem', height: '0.875rem' }} />
            <span>Sentinel-2 Imagery View</span>
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 10, margin: 'auto 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(0,0,0,0.8)', color: '#ffffff', border: '1px solid rgba(34,197,94,0.5)', padding: '0.625rem 1.25rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700, margin: '0 auto' }}>
            <Layers style={{ width: '1rem', height: '1rem', color: '#4ade80' }} />
            <span>Sentinel-2 L2A Spectral Vigor (Calculated NDVI: {satelliteData.ndviScore})</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#e2e8f0', maxWidth: '32rem', margin: '0 auto', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.5rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            Retrieved from <strong>Microsoft Planetary Computer STAC API</strong>. 
            Acquisition date: {acqDateStr} (Cloud cover: {satelliteData.cloudCoverPct ?? 0}%).
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem', backgroundColor: 'rgba(0,0,0,0.6)', margin: '0 -1.5rem -1.5rem -1.5rem', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.6875rem' }}>
            <span style={{ color: '#cbd5e1', fontWeight: 700 }}>STAC Spectral Assets:</span>
            {satelliteData.redBandUrl && (
              <a href={satelliteData.redBandUrl} target="_blank" rel="noreferrer" style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'underline' }}>
                Red Band (B04) <ExternalLink style={{ width: '0.75rem', height: '0.75rem' }} />
              </a>
            )}
            {satelliteData.nirBandUrl && (
              <a href={satelliteData.nirBandUrl} target="_blank" rel="noreferrer" style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'underline' }}>
                NIR Band (B08) <ExternalLink style={{ width: '0.75rem', height: '0.75rem' }} />
              </a>
            )}
          </div>
          <span style={{ fontSize: '0.625rem', color: '#94a3b8' }}>STAC Spec: 10m Spatial Resolution</span>
        </div>
      </div>

      {/* Historical Vigor & Stress Hotspots Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Trend Graph */}
        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <TrendingUp style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
            {t.temporalGraphTitle}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.5rem' }}>
            {satelliteData.historicalTrend.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
                <span style={{ width: '3.5rem', color: '#64748b', fontWeight: 500, fontSize: '0.6875rem' }}>{item.date}</span>
                <div style={{ flex: 1, backgroundColor: '#e2e8f0', height: '0.875rem', borderRadius: '9999px', overflow: 'hidden', display: 'flex' }}>
                  <div
                    style={{ backgroundColor: '#16a34a', height: '100%', borderRadius: '9999px', width: `${item.ndvi * 100}%`, transition: 'width 0.5s ease' }}
                  ></div>
                </div>
                <span style={{ width: '2.5rem', textAlign: 'right', fontWeight: 800, color: '#1e293b' }}>{item.ndvi}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stress Hotspots */}
        <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <AlertCircle style={{ width: '1rem', height: '1rem', color: '#d97706' }} />
            {t.stressAreasHeader}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {satelliteData.stressAreas.map((area) => (
              <div key={area.id} style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a' }}>
                  <span>{language === 'hi' ? area.areaNameHindi : area.areaName}</span>
                  <span style={{
                    padding: '0.125rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    fontWeight: 900,
                    backgroundColor: area.severity === 'High' ? '#ffe4e6' : '#fef3c7',
                    color: area.severity === 'High' ? '#9f1239' : '#92400e'
                  }}>
                    {area.severity} Stress
                  </span>
                </div>
                <p style={{ color: '#475569', fontWeight: 500 }}>
                  Issue: {language === 'hi' ? area.issueHindi : area.issue}
                </p>
                <p style={{ color: '#15803d', backgroundColor: '#f0fdf4', padding: '0.5rem', borderRadius: '0.5rem', marginTop: '0.25rem', fontWeight: 600 }}>
                  Action: {language === 'hi' ? area.recommendationHindi : area.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
