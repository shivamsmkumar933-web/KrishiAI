import React, { useState } from 'react';
import { CloudSun, Globe, Sparkles, Camera, TestTube, Landmark, MessageSquare, ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { translations } from '../i18n/translations';
import { WeatherWidget } from './WeatherWidget';
import { SatelliteHealthWidget } from './SatelliteHealthWidget';
import { CropRecommendationCard } from './CropRecommendationCard';
import { DiseaseDetectionCard } from './DiseaseDetectionCard';
import { SoilHealthCard } from './SoilHealthCard';
import { GovernmentSchemesCard } from './GovernmentSchemesCard';

export const Dashboard = ({
  weather,
  farmerProfile,
  language,
  onOpenChat,
  onOpenProfile,
  currentTab,
  onTabChange
}) => {
  const t = translations[language];

  const [activeToolView, setActiveToolView] = useState(null);

  const activeView = currentTab !== 'dashboard' ? currentTab : activeToolView;

  if (activeView === 'weather') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
          <ArrowLeft style={{ width: '1rem', height: '1rem' }} /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <WeatherWidget weather={weather} language={language} />
      </div>
    );
  }

  if (activeView === 'satellite') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
          <ArrowLeft style={{ width: '1rem', height: '1rem' }} /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <SatelliteHealthWidget farmerProfile={farmerProfile} language={language} />
      </div>
    );
  }

  if (activeView === 'recommendation') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
          <ArrowLeft style={{ width: '1rem', height: '1rem' }} /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <CropRecommendationCard farmerProfile={farmerProfile} language={language} />
      </div>
    );
  }

  if (activeView === 'disease') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
          <ArrowLeft style={{ width: '1rem', height: '1rem' }} /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <DiseaseDetectionCard language={language} />
      </div>
    );
  }

  if (activeView === 'soil') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
          <ArrowLeft style={{ width: '1rem', height: '1rem' }} /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <SoilHealthCard farmerProfile={farmerProfile} language={language} />
      </div>
    );
  }

  if (activeView === 'schemes') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
          <ArrowLeft style={{ width: '1rem', height: '1rem' }} /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <GovernmentSchemesCard language={language} />
      </div>
    );
  }

  const farmerTools = [
    {
      id: 'weather',
      title: t.cardWeatherTitle,
      desc: t.cardWeatherDesc,
      icon: CloudSun,
      bgColor: '#f59e0b',
      badge: `${weather.temperature}°C • ${language === 'hi' ? weather.weatherConditionHindi : weather.weatherCondition}`
    },
    {
      id: 'satellite',
      title: t.cardSatelliteTitle,
      desc: t.cardSatelliteDesc,
      icon: Globe,
      bgColor: '#16a34a',
      badge: `NDVI Index`
    },
    {
      id: 'recommendation',
      title: t.cardRecommendationTitle,
      desc: t.cardRecommendationDesc,
      icon: Sparkles,
      bgColor: '#15803d',
      badge: `Rabi / Kharif`
    },
    {
      id: 'disease',
      title: t.cardDiseaseTitle,
      desc: t.cardDiseaseDesc,
      icon: Camera,
      bgColor: '#f43f5e',
      badge: `AI Visual Scanner`
    },
    {
      id: 'soil',
      title: t.cardSoilTitle,
      desc: t.cardSoilDesc,
      icon: TestTube,
      bgColor: '#0284c7',
      badge: `NPK & pH Analysis`
    },
    {
      id: 'schemes',
      title: t.cardSchemesTitle,
      desc: t.cardSchemesDesc,
      icon: Landmark,
      bgColor: '#9333ea',
      badge: `PM-KISAN & PMFBY`
    },
    {
      id: 'chat',
      title: t.cardChatTitle,
      desc: t.cardChatDesc,
      icon: MessageSquare,
      bgColor: '#4f46e5',
      badge: `Hindi / Voice Support`
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #14532d, #15803d, #16a34a)',
        color: '#ffffff',
        borderRadius: '1.5rem',
        padding: '2rem',
        boxShadow: '0 10px 25px -5px rgba(22, 163, 74, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 700, textTransform: 'uppercase', color: '#dcfce7', alignSelf: 'flex-start' }}>
            {t.dashboardSubtitle}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.farmerGreeting}, {farmerProfile.name}! 👋
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#dcfce7', fontWeight: 500 }}>
            {farmerProfile.district}, {farmerProfile.state} • {farmerProfile.landArea} {farmerProfile.landUnit} ({farmerProfile.soilType} soil)
          </p>
        </div>
      </div>

      {/* Actionable Alert Banner Today */}
      {weather.advisories.length > 0 && (
        <div style={{ backgroundColor: '#fffbeb', border: '2px solid #fde68a', padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#451a03' }}>
          <AlertTriangle style={{ width: '1.5rem', height: '1.5rem', color: '#d97706', flexShrink: 0, marginTop: '0.125rem' }} />
          <div style={{ flex: 1, fontSize: '0.875rem' }}>
            <span style={{ fontWeight: 800, display: 'block', color: '#78350f', fontSize: '0.875rem' }}>
              {language === 'hi' ? weather.advisories[0].titleHindi : weather.advisories[0].title}
            </span>
            <p style={{ marginTop: '0.25rem', opacity: 0.9, lineHeight: 1.5 }}>
              {language === 'hi' ? weather.advisories[0].descriptionHindi : weather.advisories[0].description}
            </p>
          </div>
        </div>
      )}

      {/* 5-Second Simplified Tool Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>
          {language === 'hi' ? 'सभी कृषि सेवाएं (All Farm Services)' : 'All Farm Services'}
        </h2>

        <div className="tool-grid">
          {farmerTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => {
                  if (tool.id === 'chat') {
                    onOpenChat();
                  } else {
                    setActiveToolView(tool.id);
                  }
                }}
                className="tool-card"
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div className="tool-card-icon" style={{ backgroundColor: tool.bgColor }}>
                    <Icon style={{ width: '1.75rem', height: '1.75rem' }} />
                  </div>
                  <span style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', padding: '0.25rem 0.625rem', borderRadius: '9999px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0' }}>
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a' }}>
                    {tool.title}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', lineHeight: 1.5 }}>
                    {tool.desc}
                  </p>
                </div>

                <div style={{ paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: '#15803d' }}>
                  <span>{language === 'hi' ? 'खोलें' : 'Open Tool'}</span>
                  <ChevronRight style={{ width: '1rem', height: '1rem' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
