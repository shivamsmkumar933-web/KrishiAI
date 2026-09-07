import React from 'react';
import { Sprout, User, LogOut, ArrowLeft, ShieldCheck, Home, Leaf, Camera, MessageSquare, BarChart3, Users, Database, Activity, ShieldAlert } from 'lucide-react';
import { translations } from '../i18n/translations';

export const Navbar = ({
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
    <header className="navbar-header">
      <div className={`status-banner ${isDemoMode ? 'demo' : 'live'}`}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <ShieldAlert style={{ width: '0.875rem', height: '0.875rem' }} />
          <span>{isDemoMode ? t.demoModeActive : t.liveApiActive}</span>
        </div>
      </div>

      <div className="navbar-inner">
        <div className="navbar-top">
          <div className="brand-logo" onClick={() => onTabChange(isAdmin ? 'overview' : 'dashboard')}>
            <div className={`brand-icon ${isAdmin ? 'admin' : ''}`}>
              {isAdmin ? <ShieldCheck style={{ width: '1.5rem', height: '1.5rem' }} /> : <Sprout style={{ width: '1.5rem', height: '1.5rem' }} />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="brand-title">{t.appTitle}</span>
                <span className={`role-badge ${isAdmin ? 'admin' : 'farmer'}`}>
                  {isAdmin ? 'Admin Console' : 'Farmer'}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {isAdmin ? 'System Telemetry & Registry' : `${farmerProfile.district}, ${farmerProfile.state}`}
              </p>
            </div>
          </div>

          <div className="navbar-controls">
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
              <button
                onClick={() => onLanguageChange('hi')}
                style={{
                  padding: '0.25rem 0.625rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: language === 'hi' ? '#16a34a' : 'transparent',
                  color: language === 'hi' ? '#ffffff' : '#475569'
                }}
              >
                {t.hindiToggle}
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                style={{
                  padding: '0.25rem 0.625rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: language === 'en' ? '#16a34a' : 'transparent',
                  color: language === 'en' ? '#ffffff' : '#475569'
                }}
              >
                {t.englishToggle}
              </button>
            </div>

            <button
              onClick={onBackToLanding}
              className="btn btn-secondary"
              title={t.backToHome}
            >
              <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
              <span>{t.backToHome}</span>
            </button>

            <button
              onClick={onLogout}
              className="btn btn-danger"
              title={t.logout}
            >
              <LogOut style={{ width: '1rem', height: '1rem' }} />
              <span>{t.logout}</span>
            </button>
          </div>
        </div>

        <nav className="navbar-nav scrollbar-none">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`nav-item-btn ${isActive ? 'active' : ''} ${isActive && isAdmin ? 'admin' : ''}`}
              >
                <Icon style={{ width: '1rem', height: '1rem' }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
