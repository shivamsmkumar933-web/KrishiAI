import React, { useState } from 'react';
import { Landmark, Search, ExternalLink, CheckCircle2, ChevronRight, X, Shield, FileText } from 'lucide-react';
import { translations } from '../i18n/translations';
import { INDIAN_GOVT_SCHEMES } from '../services/governmentSchemesService';

export const GovernmentSchemesCard = ({ language }) => {
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalScheme, setActiveModalScheme] = useState(null);

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'subsidy', label: t.subsidyCategory },
    { id: 'credit', label: t.creditCategory },
    { id: 'insurance', label: t.insuranceCategory },
    { id: 'soil', label: t.soilCategory },
  ];

  const filteredSchemes = INDIAN_GOVT_SCHEMES.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = scheme.name.toLowerCase().includes(q) ||
      scheme.hindiName.toLowerCase().includes(q) ||
      scheme.purpose.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '0.5rem' }}>
            <Landmark style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{t.schemesTitle}</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.schemesSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ position: 'relative' }}>
          <Search style={{ width: '1rem', height: '1rem', color: '#94a3b8', position: 'absolute', left: '0.75rem', top: '0.75rem' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scheme name (e.g., PM-KISAN, Fasal Bima, KCC, Soil Card)..."
            className="form-input"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.25rem 0' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                backgroundColor: selectedCategory === cat.id ? '#16a34a' : '#f1f5f9',
                color: selectedCategory === cat.id ? '#ffffff' : '#334155'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '1rem',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', padding: '0.125rem 0.625rem', borderRadius: '9999px', backgroundColor: '#dcfce7', color: '#166534', alignSelf: 'flex-start' }}>
                {language === 'hi' ? scheme.categoryLabelHindi : scheme.categoryLabel}
              </span>

              <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
                {language === 'hi' ? scheme.hindiName : scheme.name}
              </h3>

              <p style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                {language === 'hi' ? scheme.purposeHindi : scheme.purpose}
              </p>
            </div>

            <div style={{ paddingTop: '1rem', marginTop: '0.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={() => setActiveModalScheme(scheme)}
                style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>{t.learnMoreBtn}</span>
                <ChevronRight style={{ width: '1rem', height: '1rem' }} />
              </button>

              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noreferrer"
                style={{ padding: '0.375rem', backgroundColor: '#ffffff', color: '#64748b', borderRadius: '0.5rem', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Official Portal"
              >
                <ExternalLink style={{ width: '0.875rem', height: '0.875rem' }} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {activeModalScheme && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: '42rem' }}>
            <button
              onClick={() => setActiveModalScheme(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.5rem',
                color: '#94a3b8',
                background: 'transparent',
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', padding: '0.125rem 0.625rem', borderRadius: '9999px', backgroundColor: '#dcfce7', color: '#166534', alignSelf: 'flex-start' }}>
                {language === 'hi' ? activeModalScheme.categoryLabelHindi : activeModalScheme.categoryLabel}
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                {language === 'hi' ? activeModalScheme.hindiName : activeModalScheme.name}
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.5, paddingTop: '0.25rem' }}>
                {language === 'hi' ? activeModalScheme.purposeHindi : activeModalScheme.purpose}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', fontSize: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Shield style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
                  {t.eligibilityHeader}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', color: '#334155' }}>
                  {(language === 'hi' ? activeModalScheme.eligibilityHindi : activeModalScheme.eligibility).map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                      <CheckCircle2 style={{ width: '0.875rem', height: '0.875rem', color: '#16a34a', flexShrink: 0, marginTop: '0.125rem' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ fontWeight: 800, color: '#052e16', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
                  {t.benefitsHeader}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', color: '#052e16' }}>
                  {(language === 'hi' ? activeModalScheme.benefitsHindi : activeModalScheme.benefits).map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                      <span style={{ color: '#16a34a', fontWeight: 800 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', marginBottom: '1rem' }}>
              <h4 style={{ fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <FileText style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
                How to Apply (आवेदन कैसे करें)
              </h4>
              <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', color: '#334155' }}>
                {(language === 'hi' ? activeModalScheme.applicationStepsHindi : activeModalScheme.applicationSteps).map((step, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#e2e8f0', color: '#1e293b', fontSize: '0.625rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.125rem' }}>
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setActiveModalScheme(null)}
                className="btn btn-secondary"
              >
                {t.closeBtn}
              </button>
              <a
                href={activeModalScheme.officialLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <span>{t.officialPortalBtn}</span>
                <ExternalLink style={{ width: '0.875rem', height: '0.875rem' }} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
