import React from 'react';
import { Sun, CloudSun, CloudRain, CloudLightning, CloudDrizzle, CloudFog, Wind, Droplets, Volume2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { translations } from '../i18n/translations';
import { speakText } from '../services/ttsService';

export const WeatherWidget = ({ weather, language }) => {
  const t = translations[language];

  const getWeatherIcon = (iconName) => {
    switch (iconName) {
      case 'Sun': return <Sun style={{ width: '2rem', height: '2rem', color: '#f59e0b' }} />;
      case 'CloudSun': return <CloudSun style={{ width: '2rem', height: '2rem', color: '#f59e0b' }} />;
      case 'CloudRain': return <CloudRain style={{ width: '2rem', height: '2rem', color: '#3b82f6' }} />;
      case 'CloudLightning': return <CloudLightning style={{ width: '2rem', height: '2rem', color: '#9333ea' }} />;
      case 'CloudDrizzle': return <CloudDrizzle style={{ width: '2rem', height: '2rem', color: '#0ea5e9' }} />;
      case 'CloudFog': return <CloudFog style={{ width: '2rem', height: '2rem', color: '#94a3b8' }} />;
      default: return <CloudSun style={{ width: '2rem', height: '2rem', color: '#f59e0b' }} />;
    }
  };

  const handleSpeakAdvisory = (advisory) => {
    const textToSpeak = language === 'hi' 
      ? `${advisory.titleHindi}. ${advisory.descriptionHindi}`
      : `${advisory.title}. ${advisory.description}`;
    speakText(textToSpeak, language);
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CloudSun style={{ width: '1.5rem', height: '1.5rem', color: '#16a34a' }} />
            <span>{t.weatherTitle}</span>
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Location: <span style={{ fontWeight: 600, color: '#334155' }}>{weather.location}</span></p>
        </div>
        {weather.isDemo && (
          <span style={{ fontSize: '0.625rem', backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 700, padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>
            Demo Weather Data
          </span>
        )}
      </div>

      {/* Current Weather Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {/* Temp */}
        <div style={{ background: 'linear-gradient(135deg, #fffbeb, #fff7ed)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600 }}>{t.currentTemp}</p>
            <p style={{ fontSize: '1.875rem', fontWeight: 900, color: '#451a03', marginTop: '0.25rem' }}>{weather.temperature}°C</p>
            <p style={{ fontSize: '0.6875rem', color: '#b45309', marginTop: '0.25rem', fontWeight: 500 }}>
              {language === 'hi' ? weather.weatherConditionHindi : weather.weatherCondition}
            </p>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.75rem' }}>
            {getWeatherIcon(weather.icon)}
          </div>
        </div>

        {/* Humidity */}
        <div style={{ background: 'linear-gradient(135deg, #f0f9ff, #eff6ff)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#075985', fontWeight: 600 }}>{t.humidity}</p>
            <p style={{ fontSize: '1.875rem', fontWeight: 900, color: '#082f49', marginTop: '0.25rem' }}>{weather.humidity}%</p>
            <p style={{ fontSize: '0.6875rem', color: '#0369a1', marginTop: '0.25rem', fontWeight: 500 }}>Relative Humidity</p>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.75rem' }}>
            <Droplets style={{ width: '2rem', height: '2rem', color: '#0ea5e9' }} />
          </div>
        </div>

        {/* Rain Prob */}
        <div style={{ background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 600 }}>{t.rainProbability}</p>
            <p style={{ fontSize: '1.875rem', fontWeight: 900, color: '#1e3a8a', marginTop: '0.25rem' }}>{weather.rainProbability}%</p>
            <p style={{ fontSize: '0.6875rem', color: '#1d4ed8', marginTop: '0.25rem', fontWeight: 500 }}>Precipitation</p>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.75rem' }}>
            <CloudRain style={{ width: '2rem', height: '2rem', color: '#2563eb' }} />
          </div>
        </div>

        {/* Wind */}
        <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #f0fdfa)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>{t.windSpeed}</p>
            <p style={{ fontSize: '1.875rem', fontWeight: 900, color: '#052e16', marginTop: '0.25rem' }}>{weather.windSpeed} <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>km/h</span></p>
            <p style={{ fontSize: '0.6875rem', color: '#15803d', marginTop: '0.25rem', fontWeight: 500 }}>Wind Velocity</p>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.75rem' }}>
            <Wind style={{ width: '2rem', height: '2rem', color: '#16a34a' }} />
          </div>
        </div>
      </div>

      {/* Actionable Farming Advisories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.advisoriesHeader}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {weather.advisories.map((adv) => (
            <div
              key={adv.id}
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                backgroundColor: adv.type === 'warning' ? '#fffbeb' : adv.type === 'success' ? '#f0fdf4' : '#eff6ff',
                borderColor: adv.type === 'warning' ? '#fde68a' : adv.type === 'success' ? '#bbf7d0' : '#bfdbfe',
                color: adv.type === 'warning' ? '#78350f' : adv.type === 'success' ? '#14532d' : '#1e3a8a'
              }}
            >
              <div style={{ marginTop: '0.125rem' }}>
                {adv.type === 'warning' ? <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#d97706' }} /> :
                 adv.type === 'success' ? <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#16a34a' }} /> :
                 <Info style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} />}
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 800, fontSize: '0.875rem' }}>
                  {language === 'hi' ? adv.titleHindi : adv.title}
                </h4>
                <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.9, lineHeight: 1.5 }}>
                  {language === 'hi' ? adv.descriptionHindi : adv.description}
                </p>
              </div>

              <button
                onClick={() => handleSpeakAdvisory(adv)}
                style={{
                  padding: '0.375rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer'
                }}
                title={t.listenAdvisory}
              >
                <Volume2 style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.forecastHeader}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.5rem' }}>
          {weather.forecast.map((fc, idx) => (
            <div
              key={idx}
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid',
                textAlign: 'center',
                backgroundColor: idx === 0 ? '#f0fdf4' : '#f8fafc',
                borderColor: idx === 0 ? '#86efac' : '#e2e8f0'
              }}
            >
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>{language === 'hi' ? fc.dayHindi : fc.day}</p>
              <p style={{ fontSize: '0.625rem', color: '#94a3b8' }}>{fc.date}</p>
              <div style={{ margin: '0.5rem 0', display: 'flex', justifyContent: 'center' }}>{getWeatherIcon(fc.icon)}</div>
              <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a' }}>{fc.maxTemp}° / <span style={{ color: '#64748b', fontWeight: 400 }}>{fc.minTemp}°</span></p>
              <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.125rem', fontSize: '0.625rem', fontWeight: 600, color: '#2563eb' }}>
                <Droplets style={{ width: '0.75rem', height: '0.75rem' }} />
                <span>{fc.rainProb}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
