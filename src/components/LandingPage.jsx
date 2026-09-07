import React from 'react';
import { Sprout, UserCheck, ShieldCheck, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { translations } from '../i18n/translations';

export const LandingPage = ({
  language,
  onLanguageChange,
  onSelectRole
}) => {
  const t = translations[language];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #052e16 0%, #0f172a 50%, #052e16 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Header Bar */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '1.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)'
          }}>
            <Sprout style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.025em', color: '#ffffff', display: 'block' }}>
              {t.landingHeroTitle}
            </span>
            <span style={{ display: 'block', fontSize: '0.625rem', color: '#4ade80', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'hi' ? 'डिजिटल कृषि भारत' : 'Digital Agriculture Platform'}
            </span>
          </div>
        </div>

        {/* Language Switcher Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          padding: '0.25rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <button
            onClick={() => onLanguageChange('hi')}
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: language === 'hi' ? '#22c55e' : 'transparent',
              color: language === 'hi' ? '#ffffff' : '#cbd5e1'
            }}
          >
            {t.hindiToggle}
          </button>
          <button
            onClick={() => onLanguageChange('en')}
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: language === 'en' ? '#22c55e' : 'transparent',
              color: language === 'en' ? '#ffffff' : '#cbd5e1'
            }}
          >
            {t.englishToggle}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1024px',
        width: '100%',
        margin: '0 auto',
        padding: '2rem 1rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '2.5rem'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            color: '#86efac',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            padding: '0.375rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            <Sparkles style={{ width: '1rem', height: '1rem' }} />
            <span>{t.appSubtitle}</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            color: '#ffffff'
          }}>
            {language === 'hi'
              ? 'भारतीय किसानों के लिए एक एकीकृत एआई कृषि मंच'
              : 'Unified AI Agriculture Platform for Indian Farmers'}
          </h1>

          <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.6, maxWidth: '42rem' }}>
            {t.landingDesc}
          </p>
        </div>

        {/* Select Role Header */}
        <div style={{ maxWidth: '56rem', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4ade80' }}>
            {t.selectRoleHeader}
          </h2>

          {/* Two Large Role Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* FARMER Role Card */}
            <div
              onClick={() => onSelectRole('farmer')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '2px solid rgba(34, 197, 94, 0.4)',
                borderRadius: '1.5rem',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  border: '1px solid rgba(74, 222, 128, 0.4)',
                  color: '#4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <UserCheck style={{ width: '2rem', height: '2rem' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>{t.farmerRoleTitle}</h3>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#22c55e', color: '#ffffff', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
                      {language === 'hi' ? 'किसान' : 'Farmer'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    {t.farmerRoleDesc}
                  </p>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', color: '#bbf7d0', paddingTop: '0.5rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#4ade80', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'मौसम व 7-दिवसीय सिंचाई सलाह' : 'Live weather & 7-day irrigation advisories'}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#4ade80', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'पत्ती फोटो से एआई रोग पहचान' : 'Instant AI visual leaf disease diagnosis'}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#4ade80', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'सैटेलाइट खेत हरियाली (NDVI) व मिट्टी जांच' : 'Satellite NDVI vegetation health & soil diagnostics'}</span>
                  </li>
                </ul>
              </div>

              <button style={{
                width: '100%',
                backgroundColor: '#22c55e',
                color: '#020617',
                fontWeight: 900,
                padding: '1rem 1.5rem',
                borderRadius: '1rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '1rem'
              }}>
                <span>{t.farmerRoleBtn}</span>
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            {/* ADMIN Role Card */}
            <div
              onClick={() => onSelectRole('admin')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '2px solid rgba(147, 51, 234, 0.4)',
                borderRadius: '1.5rem',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(147, 51, 234, 0.2)',
                  border: '1px solid rgba(192, 132, 252, 0.4)',
                  color: '#d8b4fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldCheck style={{ width: '2rem', height: '2rem' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>{t.adminRoleTitle}</h3>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#9333ea', color: '#ffffff', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
                      {language === 'hi' ? 'प्रशासक' : 'Admin'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    {t.adminRoleDesc}
                  </p>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', color: '#e9d5ff', paddingTop: '0.5rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#c084fc', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'किसान रजिस्ट्री व खेत प्रबंधन' : 'Farmer registry & farm management'}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#c084fc', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'रोग रिपोर्ट व टेलीमेट्री आँकड़े' : 'Disease outbreak reports & telemetry stats'}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#c084fc', flexShrink: 0 }} />
                    <span>{language === 'hi' ? 'एपीआई स्वास्थ्य व डेटाबेस प्रबंधन' : 'API health, database & system status'}</span>
                  </li>
                </ul>
              </div>

              <button style={{
                width: '100%',
                backgroundColor: '#9333ea',
                color: '#ffffff',
                fontWeight: 900,
                padding: '1rem 1.5rem',
                borderRadius: '1rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '1rem'
              }}>
                <span>{t.adminRoleBtn}</span>
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        fontSize: '0.75rem',
        color: '#94a3b8',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span>KrishiAI Digital Agriculture Platform • 2026</span>
          <span>Powered by Gemini AI, Open-Meteo, Sentinel-2 STAC & Firebase</span>
        </div>
      </footer>
    </div>
  );
};
