import React, { useState } from 'react';
import { CloudSun, Globe, Sparkles, Camera, TestTube, Landmark, MessageSquare, ArrowLeft, ChevronRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { WeatherData, FarmerProfile, Language } from '../types';
import { translations } from '../i18n/translations';
import { WeatherWidget } from './WeatherWidget';
import { SatelliteHealthWidget } from './SatelliteHealthWidget';
import { CropRecommendationCard } from './CropRecommendationCard';
import { DiseaseDetectionCard } from './DiseaseDetectionCard';
import { SoilHealthCard } from './SoilHealthCard';
import { GovernmentSchemesCard } from './GovernmentSchemesCard';

interface DashboardProps {
  weather: WeatherData;
  farmerProfile: FarmerProfile;
  language: Language;
  onOpenChat: () => void;
  onOpenProfile: () => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  weather,
  farmerProfile,
  language,
  onOpenChat,
  onOpenProfile,
  currentTab,
  onTabChange
}) => {
  const t = translations[language];

  const [activeToolView, setActiveToolView] = useState<string | null>(null);

  const activeView = currentTab !== 'dashboard' ? currentTab : activeToolView;

  // Render specific tool view when selected
  if (activeView === 'weather') {
    return (
      <div className="space-y-4">
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <WeatherWidget weather={weather} language={language} />
      </div>
    );
  }

  if (activeView === 'satellite') {
    return (
      <div className="space-y-4">
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <SatelliteHealthWidget farmerProfile={farmerProfile} language={language} />
      </div>
    );
  }

  if (activeView === 'recommendation') {
    return (
      <div className="space-y-4">
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <CropRecommendationCard farmerProfile={farmerProfile} language={language} />
      </div>
    );
  }

  if (activeView === 'disease') {
    return (
      <div className="space-y-4">
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <DiseaseDetectionCard language={language} />
      </div>
    );
  }

  if (activeView === 'soil') {
    return (
      <div className="space-y-4">
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
        </button>
        <SoilHealthCard farmerProfile={farmerProfile} language={language} />
      </div>
    );
  }

  if (activeView === 'schemes') {
    return (
      <div className="space-y-4">
        <button onClick={() => { setActiveToolView(null); onTabChange('dashboard'); }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> <span>{language === 'hi' ? '← मुख्य डैशबोर्ड पर लौटें' : '← Back to Main Dashboard'}</span>
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
      bgColor: 'bg-amber-500',
      badge: `${weather.temperature}°C • ${language === 'hi' ? weather.weatherConditionHindi : weather.weatherCondition}`
    },
    {
      id: 'satellite',
      title: t.cardSatelliteTitle,
      desc: t.cardSatelliteDesc,
      icon: Globe,
      bgColor: 'bg-emerald-600',
      badge: `NDVI Index`
    },
    {
      id: 'recommendation',
      title: t.cardRecommendationTitle,
      desc: t.cardRecommendationDesc,
      icon: Sparkles,
      bgColor: 'bg-green-600',
      badge: `Rabi / Kharif`
    },
    {
      id: 'disease',
      title: t.cardDiseaseTitle,
      desc: t.cardDiseaseDesc,
      icon: Camera,
      bgColor: 'bg-rose-500',
      badge: `AI Visual Scanner`
    },
    {
      id: 'soil',
      title: t.cardSoilTitle,
      desc: t.cardSoilDesc,
      icon: TestTube,
      bgColor: 'bg-sky-600',
      badge: `NPK & pH Analysis`
    },
    {
      id: 'schemes',
      title: t.cardSchemesTitle,
      desc: t.cardSchemesDesc,
      icon: Landmark,
      bgColor: 'bg-purple-600',
      badge: `PM-KISAN & PMFBY`
    },
    {
      id: 'chat',
      title: t.cardChatTitle,
      desc: t.cardChatDesc,
      icon: MessageSquare,
      bgColor: 'bg-indigo-600',
      badge: `Hindi / Voice Support`
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="text-xs bg-white/20 backdrop-blur px-3 py-1 rounded-full font-bold uppercase tracking-wider text-emerald-100">
            {t.dashboardSubtitle}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.farmerGreeting}, {farmerProfile.name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium">
            {farmerProfile.district}, {farmerProfile.state} • {farmerProfile.landArea} {farmerProfile.landUnit} ({farmerProfile.soilType} soil)
          </p>
        </div>
      </div>

      {/* Actionable Alert Banner Today */}
      {weather.advisories.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 p-4 sm:p-5 rounded-2xl flex items-start gap-3 text-amber-950 shadow-sm">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs sm:text-sm">
            <span className="font-extrabold block text-amber-900 text-sm">
              {language === 'hi' ? weather.advisories[0].titleHindi : weather.advisories[0].title}
            </span>
            <p className="mt-0.5 opacity-90 leading-relaxed">
              {language === 'hi' ? weather.advisories[0].descriptionHindi : weather.advisories[0].description}
            </p>
          </div>
        </div>
      )}

      {/* 5-Second Simplified Tool Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {language === 'hi' ? 'सभी कृषि सेवाएं (All Farm Services)' : 'All Farm Services'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-emerald-500 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-2xl ${tool.bgColor} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-800 transition">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>{language === 'hi' ? 'खोलें' : 'Open Tool'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
