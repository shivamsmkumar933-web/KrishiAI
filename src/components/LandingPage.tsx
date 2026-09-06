import React from 'react';
import { Sprout, UserCheck, ShieldCheck, Globe, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface LandingPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectRole: (role: 'farmer' | 'admin') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onLanguageChange,
  onSelectRole
}) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-slate-900 to-green-950 text-white flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-900/50">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-white">{t.landingHeroTitle}</span>
            <span className="block text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
              {language === 'hi' ? 'डिजिटल कृषि भारत' : 'Digital Agriculture Platform'}
            </span>
          </div>
        </div>

        {/* Language Switcher Toggle */}
        <div className="flex items-center bg-white/10 backdrop-blur p-1 rounded-xl border border-white/20">
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              language === 'hi' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.hindiToggle}
          </button>
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              language === 'en' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            {t.englishToggle}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-5xl w-full mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>{t.appSubtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            {language === 'hi'
              ? 'भारतीय किसानों के लिए एक एकीकृत एआई कृषि मंच'
              : 'Unified AI Agriculture Platform for Indian Farmers'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.landingDesc}
          </p>
        </div>

        {/* Select Role Header */}
        <div className="space-y-6 max-w-4xl mx-auto w-full">
          <h2 className="text-center text-xs font-bold uppercase tracking-widest text-emerald-400">
            {t.selectRoleHeader}
          </h2>

          {/* Two Large Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FARMER Role Card */}
            <div
              onClick={() => onSelectRole('farmer')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur border-2 border-emerald-500/40 hover:border-emerald-400 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-2xl flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
                  <UserCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white">{t.farmerRoleTitle}</h3>
                    <span className="text-xs bg-emerald-500 text-white font-extrabold px-3 py-1 rounded-full uppercase">
                      {language === 'hi' ? 'किसान' : 'Farmer'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {t.farmerRoleDesc}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-emerald-200/90 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{language === 'hi' ? 'मौसम व 7-दिवसीय सिंचाई सलाह' : 'Live weather & 7-day irrigation advisories'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{language === 'hi' ? 'पत्ती फोटो से एआई रोग पहचान' : 'Instant AI visual leaf disease diagnosis'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{language === 'hi' ? 'सैटेलाइट खेत हरियाली (NDVI) व मिट्टी जांच' : 'Satellite NDVI vegetation health & soil diagnostics'}</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm sm:text-base">
                <span>{t.farmerRoleBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* ADMIN Role Card */}
            <div
              onClick={() => onSelectRole('admin')}
              className="bg-white/10 hover:bg-white/15 backdrop-blur border-2 border-purple-500/40 hover:border-purple-400 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-2xl flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center group-hover:scale-110 transition">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white">{t.adminRoleTitle}</h3>
                    <span className="text-xs bg-purple-600 text-white font-extrabold px-3 py-1 rounded-full uppercase">
                      {language === 'hi' ? 'प्रशासक' : 'Admin'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {t.adminRoleDesc}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-purple-200/90 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{language === 'hi' ? 'किसान रजिस्ट्री व खेत प्रबंधन' : 'Farmer registry & farm management'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{language === 'hi' ? 'रोग रिपोर्ट व टेलीमेट्री आँकड़े' : 'Disease outbreak reports & telemetry stats'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{language === 'hi' ? 'एपीआई स्वास्थ्य व डेटाबेस प्रबंधन' : 'API health, database & system status'}</span>
                  </li>
                </ul>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-4 px-6 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm sm:text-base">
                <span>{t.adminRoleBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-4 py-6 text-center text-xs text-slate-400 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>KrishiAI Digital Agriculture Platform • 2026</span>
          <span>Powered by Gemini AI, Open-Meteo, Sentinel-2 STAC & Supabase DB</span>
        </div>
      </footer>
    </div>
  );
};
