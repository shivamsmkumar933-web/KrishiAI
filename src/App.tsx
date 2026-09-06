import React, { useState, useEffect } from 'react';
import { FarmerProfile, Language, WeatherData } from './types';
import {
  getFarmerProfile,
  saveFarmerProfile,
  getSavedLanguage,
  saveLanguage,
  isDemoModeActive,
  setDemoModeActive
} from './services/storageService';
import { fetchWeatherData, getMockWeatherData } from './services/weatherService';
import { AuthUser, signOutFirebase } from './services/firebaseAuthService';
import { LandingPage } from './components/LandingPage';
import { FarmerAuthModal } from './components/FarmerAuthModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { KrishiAssistantChat } from './components/KrishiAssistantChat';
import { AdminDashboard } from './components/AdminDashboard';
import { MessageSquare } from 'lucide-react';

export const App: React.FC = () => {
  // Role & Entry State
  const [currentRole, setCurrentRole] = useState<'farmer' | 'admin' | null>(null);
  const [farmerUser, setFarmerUser] = useState<AuthUser | null>(null);
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);

  // Auth Modals State
  const [isFarmerAuthOpen, setIsFarmerAuthOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);

  // Profile & Language State
  const [profile, setProfile] = useState<FarmerProfile>(getFarmerProfile());
  const [language, setLanguage] = useState<Language>(getSavedLanguage());
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(isDemoModeActive());

  // Telemetry Weather State
  const [weather, setWeather] = useState<WeatherData>(getMockWeatherData(profile.district));

  // AI Chat Drawer State
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetchWeatherData(profile.district, profile.latitude, profile.longitude)
      .then((data) => setWeather(data))
      .catch((err) => {
        console.error('Weather load note:', err);
        setWeather(getMockWeatherData(profile.district));
      });
  }, [profile.district, profile.latitude, profile.longitude]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    saveLanguage(lang);
  };

  const handleSelectRole = (role: 'farmer' | 'admin') => {
    if (role === 'farmer') {
      if (farmerUser) {
        setCurrentRole('farmer');
        setCurrentTab('dashboard');
      } else {
        setIsFarmerAuthOpen(true);
      }
    } else if (role === 'admin') {
      if (adminUser) {
        setCurrentRole('admin');
        setCurrentTab('overview');
      } else {
        setIsAdminAuthOpen(true);
      }
    }
  };

  const handleFarmerAuthSuccess = (user: AuthUser, updatedProfile: FarmerProfile) => {
    setFarmerUser(user);
    setProfile(updatedProfile);
    saveFarmerProfile(updatedProfile);
    setCurrentRole('farmer');
    setCurrentTab('dashboard');
    setIsFarmerAuthOpen(false);
  };

  const handleAdminAuthSuccess = (user: AuthUser) => {
    setAdminUser(user);
    setCurrentRole('admin');
    setCurrentTab('overview');
    setIsAdminAuthOpen(false);
  };

  const handleLogout = () => {
    signOutFirebase();
    if (currentRole === 'farmer') setFarmerUser(null);
    if (currentRole === 'admin') setAdminUser(null);
    setCurrentRole(null);
  };

  const handleSaveProfile = (updated: FarmerProfile) => {
    setProfile(updated);
    saveFarmerProfile(updated);
    import('./services/firebaseDbService').then(m => m.saveFarmerProfileToFirestore(updated));
  };

  // 1. LANDING PAGE (Entry Screen)
  if (currentRole === null) {
    return (
      <>
        <LandingPage
          language={language}
          onLanguageChange={handleLanguageChange}
          onSelectRole={handleSelectRole}
        />

        {/* Farmer Auth Modal */}
        <FarmerAuthModal
          isOpen={isFarmerAuthOpen}
          onClose={() => setIsFarmerAuthOpen(false)}
          language={language}
          onAuthSuccess={handleFarmerAuthSuccess}
        />

        {/* Admin Auth Modal */}
        <AdminAuthModal
          isOpen={isAdminAuthOpen}
          onClose={() => setIsAdminAuthOpen(false)}
          language={language}
          onAuthSuccess={handleAdminAuthSuccess}
        />
      </>
    );
  }

  const activeAuthUser = currentRole === 'admin' ? adminUser : farmerUser;

  // 2. DASHBOARD VIEW (Farmer or Admin)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        authUser={activeAuthUser}
        farmerProfile={profile}
        onOpenProfile={() => setCurrentTab('profile')}
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        onLogout={handleLogout}
        onBackToLanding={() => setCurrentRole(null)}
        isDemoMode={isDemoMode}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentRole === 'admin' ? (
          <AdminDashboard
            language={language}
            currentTab={currentTab}
            onTabChange={(tab) => setCurrentTab(tab)}
          />
        ) : (
          <Dashboard
            weather={weather}
            farmerProfile={profile}
            language={language}
            onOpenChat={() => setIsChatOpen(true)}
            onOpenProfile={() => setCurrentTab('profile')}
            currentTab={currentTab}
            onTabChange={(tab) => setCurrentTab(tab)}
          />
        )}
      </main>

      {/* Floating KrishiAI Assistant Chat Button (Farmer View) */}
      {currentRole === 'farmer' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-transform hover:scale-105 border-2 border-white"
          >
            <MessageSquare className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-extrabold hidden sm:inline">
              {language === 'hi' ? 'कृषि एआई से पूछें' : 'Ask KrishiAI'}
            </span>
          </button>
        </div>
      )}

      {/* KrishiAI Assistant Drawer */}
      <KrishiAssistantChat
        farmerProfile={profile}
        language={language}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>KrishiAI Digital Agriculture Platform • {currentRole === 'admin' ? 'Admin Session' : profile.district}</span>
          <span>Gemini 3.6 Flash, Open-Meteo, Sentinel-2 STAC & Supabase DB</span>
        </div>
      </footer>
    </div>
  );
};
