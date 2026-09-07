import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, X } from 'lucide-react';
import { translations } from '../i18n/translations';
import { signInAdminFirebase } from '../services/firebaseAuthService';

export const AdminAuthModal = ({
  isOpen,
  onClose,
  language,
  onAuthSuccess
}) => {
  const t = translations[language];

  const [email, setEmail] = useState('admin@krishiai.gov.in');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { user, error } = await signInAdminFirebase(email, password);
    setLoading(false);

    if (error || !user) {
      setErrorMsg(error || 'Admin authentication failed.');
      return;
    }

    onAuthSuccess(user);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: '28rem' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#f3e8ff', color: '#7e22ce', borderRadius: '1rem' }}>
            <ShieldCheck style={{ width: '1.75rem', height: '1.75rem' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>{t.adminSignInTitle}</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Platform Management & Telemetry Console</p>
          </div>
        </div>

        {errorMsg && (
          <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239', fontSize: '0.75rem', fontWeight: 700, borderRadius: '0.75rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAdminSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">{t.emailOrPhoneLabel}</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ width: '1rem', height: '1rem', color: '#94a3b8', position: 'absolute', left: '0.875rem', top: '0.75rem' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@krishiai.gov.in"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t.passwordLabel}</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ width: '1rem', height: '1rem', color: '#94a3b8', position: 'absolute', left: '0.875rem', top: '0.75rem' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-purple btn-full btn-lg"
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? (
              <div className="animate-spin" style={{ width: '1.25rem', height: '1.25rem', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
            ) : (
              <>
                <span>Enter Admin Console (प्रशासक लॉगिन)</span>
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
