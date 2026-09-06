import React from 'react';
import { Sun, CloudSun, CloudRain, CloudLightning, CloudDrizzle, CloudFog, Wind, Droplets, Volume2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { WeatherData, Language, WeatherAdvisory } from '../types';
import { translations } from '../i18n/translations';
import { speakText } from '../services/ttsService';

interface WeatherWidgetProps {
  weather: WeatherData;
  language: Language;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, language }) => {
  const t = translations[language];

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />;
      case 'CloudSun': return <CloudSun className="w-8 h-8 text-amber-500" />;
      case 'CloudRain': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'CloudLightning': return <CloudLightning className="w-8 h-8 text-purple-500" />;
      case 'CloudDrizzle': return <CloudDrizzle className="w-8 h-8 text-sky-400" />;
      case 'CloudFog': return <CloudFog className="w-8 h-8 text-slate-400" />;
      default: return <CloudSun className="w-8 h-8 text-amber-500" />;
    }
  };

  const handleSpeakAdvisory = (advisory: WeatherAdvisory) => {
    const textToSpeak = language === 'hi' 
      ? `${advisory.titleHindi}. ${advisory.descriptionHindi}`
      : `${advisory.title}. ${advisory.description}`;
    speakText(textToSpeak, language);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-emerald-600" />
            <span>{t.weatherTitle}</span>
          </h2>
          <p className="text-xs text-slate-500">Location: <span className="font-semibold text-slate-700">{weather.location}</span></p>
        </div>
        {weather.isDemo && (
          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full self-start sm:self-auto">
            Demo Weather Data
          </span>
        )}
      </div>

      {/* Current Weather Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Temp */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-amber-800 font-semibold">{t.currentTemp}</p>
            <p className="text-3xl font-extrabold text-amber-950 mt-1">{weather.temperature}°C</p>
            <p className="text-[11px] text-amber-700 mt-1 font-medium">
              {language === 'hi' ? weather.weatherConditionHindi : weather.weatherCondition}
            </p>
          </div>
          <div className="p-3 bg-white/80 rounded-xl shadow-sm">
            {getWeatherIcon(weather.icon)}
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-sky-800 font-semibold">{t.humidity}</p>
            <p className="text-3xl font-extrabold text-sky-950 mt-1">{weather.humidity}%</p>
            <p className="text-[11px] text-sky-700 mt-1 font-medium">Relative Humidity</p>
          </div>
          <div className="p-3 bg-white/80 rounded-xl shadow-sm">
            <Droplets className="w-8 h-8 text-sky-500" />
          </div>
        </div>

        {/* Rain Prob */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-800 font-semibold">{t.rainProbability}</p>
            <p className="text-3xl font-extrabold text-blue-950 mt-1">{weather.rainProbability}%</p>
            <p className="text-[11px] text-blue-700 mt-1 font-medium">Precipitation</p>
          </div>
          <div className="p-3 bg-white/80 rounded-xl shadow-sm">
            <CloudRain className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Wind */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-800 font-semibold">{t.windSpeed}</p>
            <p className="text-3xl font-extrabold text-emerald-950 mt-1">{weather.windSpeed} <span className="text-sm font-normal">km/h</span></p>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium">Wind Velocity</p>
          </div>
          <div className="p-3 bg-white/80 rounded-xl shadow-sm">
            <Wind className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Actionable Farming Advisories */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t.advisoriesHeader}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {weather.advisories.map((adv) => (
            <div
              key={adv.id}
              className={`p-4 rounded-xl border transition flex items-start gap-3 ${
                adv.type === 'warning' ? 'bg-amber-50/80 border-amber-200 text-amber-900' :
                adv.type === 'success' ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' :
                'bg-blue-50/80 border-blue-200 text-blue-900'
              }`}
            >
              <div className="mt-0.5">
                {adv.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-600" /> :
                 adv.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-600" /> :
                 <Info className="w-5 h-5 text-blue-600" />}
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-sm">
                  {language === 'hi' ? adv.titleHindi : adv.title}
                </h4>
                <p className="text-xs mt-1 opacity-90 leading-relaxed">
                  {language === 'hi' ? adv.descriptionHindi : adv.description}
                </p>
              </div>

              <button
                onClick={() => handleSpeakAdvisory(adv)}
                className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                title={t.listenAdvisory}
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t.forecastHeader}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {weather.forecast.map((fc, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center transition ${
                idx === 0 ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <p className="text-xs font-bold text-slate-700">{language === 'hi' ? fc.dayHindi : fc.day}</p>
              <p className="text-[10px] text-slate-400">{fc.date}</p>
              <div className="my-2 flex justify-center">{getWeatherIcon(fc.icon)}</div>
              <p className="text-xs font-extrabold text-slate-900">{fc.maxTemp}° / <span className="text-slate-500 font-normal">{fc.minTemp}°</span></p>
              <div className="mt-1 flex items-center justify-center gap-0.5 text-[10px] font-semibold text-blue-600">
                <Droplets className="w-3 h-3" />
                <span>{fc.rainProb}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
