import React from 'react';
import { Sprout, Globe, User, LogOut, ArrowLeft, ShieldCheck, Home, Leaf, Camera, MessageSquare, BarChart3, Users, Database, Activity, ShieldAlert } from 'lucide-react';
import { Language, FarmerProfile } from '../types';
import { translations } from '../i18n/translations';
import { AuthUser } from '../services/supabaseAuthService';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  authUser: AuthUser | null;
  farmerProfile: FarmerProfile;
  onOpenProfile: () => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onBackToLanding: () => void;
  isDemoMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  authUser,
  farmerProfile,
  onOpenProfile,
  currentTab,
  onTabChange,
  onLogout,
  onBackToLanding,
  isDemoMode
}) => {
  const t = translations[language];

  const isAdmin = authUser?.role === 'admin';

  const farmerNavItems = [
    { id: 'dashboard', label: t.navHome, icon: Home },
    { id: 'recommendation', label: t.navMyFarm, icon: Leaf },
    { id: 'disease', label: t.navDisease, icon: Camera },
    { id: 'chat', label: t.navAiAssistant, icon: MessageSquare },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  const adminNavItems = [
    { id: 'overview', label: t.adminNavOverview, icon: BarChart3 },
    { id: 'farmers', label: t.adminNavFarmers, icon: Users },
    { id: 'data', label: t.adminNavData, icon: Database },
    { id: 'reports', label: t.adminNavReports, icon: Camera },
    { id: 'system', label: t.adminNavSystem, icon: Activity },
  ];

  const navItems = isAdmin ? adminNavItems : farmerNavItems;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
      {/* Top Banner for API status */}
      <div className={`px-4 py-1 text-xs text-center font-medium transition-colors ${
        isDemoMode ? 'bg-amber-50 text-amber-900 border-b border-amber-200' : 'bg-emerald-700 text-white'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{isDemoMode ? t.demoModeActive : t.liveApiActive}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Role Badge */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange(isAdmin ? 'overview' : 'dashboard')}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
              isAdmin ? 'bg-purple-600 text-white' : 'bg-gradient-to-tr from-emerald-600 to-green-500 text-white'
            }`}>
              {isAdmin ? <ShieldCheck className="w-6 h-6" /> : <Sprout className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">{t.appTitle}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isAdmin ? 'Admin Console' : 'Farmer'}
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {isAdmin ? 'System Telemetry & Registry' : `${farmerProfile.district}, ${farmerProfile.state}`}
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  language === 'hi' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.hindiToggle}
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  language === 'en' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.englishToggle}
              </button>
            </div>

            {/* Back to Role Selection */}
            <button
              onClick={onBackToLanding}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition hidden sm:flex items-center gap-1.5"
              title={t.backToHome}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden lg:inline">{t.backToHome}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
              title={t.logout}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
          </div>
        </div>

        {/* Simplified Navigation Tabs Bar */}
        <nav className="flex space-x-2 sm:space-x-3 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-100">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                  isActive
                    ? isAdmin
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
