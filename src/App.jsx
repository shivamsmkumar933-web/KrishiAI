import React, { useState, useEffect } from 'react';
import {
  getFarmerProfile,
  saveFarmerProfile,
  getSavedLanguage,
  saveLanguage,
  isDemoModeActive
} from './services/storageService';
import { fetchWeatherData, getMockWeatherData } from './services/weatherService';
import { signOutFirebase } from './services/firebaseAuthService';
import { LandingPage } from './components/LandingPage';
import { FarmerAuthModal } from './components/FarmerAuthModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { KrishiAssistantChat } from './components/KrishiAssistantChat';
import { AdminDashboard } from './components/AdminDashboard';
import { MessageSquare } from 'lucide-react';

export const App = () => {
  const [currentRole, setCurrentRole] = useState(null);
  const [farmerUser, setFarmerUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  const [isFarmerAuthOpen, setIsFarmerAuthOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);

  const [profile, setProfile] = useState(getFarmerProfile());
  const [language, setLanguage] = useState(getSavedLanguage());
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isDemoMode, setIsDemoMode] = useState(isDemoModeActive());

  const [weather, setWeather] = useState(getMockWeatherData(profile.district));

  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetchWeatherData(profile.district, profile.latitude, profile.longitude)
      .then((data) => setWeather(data))
      .catch((err) => {
        console.error('Weather load note:', err);
        setWeather(getMockWeatherData(profile.district));
      });
  }, [profile.district, profile.latitude, profile.longitude]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    saveLanguage(lang);
  };

  const handleSelectRole = (role) => {
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

  const handleFarmerAuthSuccess = (user, updatedProfile) => {
    setFarmerUser(user);
    setProfile(updatedProfile);
    saveFarmerProfile(updatedProfile);
    setCurrentRole('farmer');
    setCurrentTab('dashboard');
    setIsFarmerAuthOpen(false);
  };

  const handleAdminAuthSuccess = (user) => {
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

  const handleSaveProfile = (updated) => {
    setProfile(updated);
    saveFarmerProfile(updated);
    import('./services/firebaseDbService').then(m => m.saveFarmerProfileToFirestore(updated));
  };

  if (currentRole === null) {
    return (
      <>
        <LandingPage
          language={language}
          onLanguageChange={handleLanguageChange}
          onSelectRole={handleSelectRole}
        />

        <FarmerAuthModal
          isOpen={isFarmerAuthOpen}
          onClose={() => setIsFarmerAuthOpen(false)}
          language={language}
          onAuthSuccess={handleFarmerAuthSuccess}
        />

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

  return (
    <div className="app-container">
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

      <main className="main-content">
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

      {currentRole === 'farmer' && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 40 }}>
          <button
            onClick={() => setIsChatOpen(true)}
            className="btn btn-primary btn-lg"
            style={{ borderRadius: '9999px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', border: '2px solid #ffffff' }}
          >
            <MessageSquare className="animate-pulse" style={{ width: '1.25rem', height: '1.25rem' }} />
            <span>
              {language === 'hi' ? 'कृषि एआई से पूछें' : 'Ask KrishiAI'}
            </span>
          </button>
        </div>
      )}

      <KrishiAssistantChat
        farmerProfile={profile}
        language={language}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '1.5rem 0', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span>KrishiAI Digital Agriculture Platform • {currentRole === 'admin' ? 'Admin Session' : profile.district}</span>
          <span>Gemini 3.6 Flash, Open-Meteo, Sentinel-2 STAC & Firebase DB</span>
        </div>
      </footer>
    </div>
  );
};
export default App;
