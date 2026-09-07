import React, { useState } from 'react';
import { Users, Activity, Radio, RefreshCw, BarChart3, Database } from 'lucide-react';
import { translations } from '../i18n/translations';
import { getAdminStats, isDemoModeActive, setDemoModeActive, saveAdminStats } from '../services/storageService';

export const AdminDashboard = ({
  language,
  currentTab,
  onTabChange
}) => {
  const t = translations[language];

  const [stats, setStats] = useState(getAdminStats());
  const [demoActive, setDemoActive] = useState(isDemoModeActive());

  const activeSubView = ['overview', 'farmers', 'data', 'reports', 'system'].includes(currentTab) ? currentTab : 'overview';

  const handleToggleDemo = () => {
    const nextState = !demoActive;
    setDemoActive(nextState);
    setDemoModeActive(nextState);

    const updatedProviders = stats.apiProviders.map(p => {
      if (p.type === 'ai_vision' || p.type === 'satellite') {
        return { ...p, status: nextState ? 'demo' : 'online' };
      }
      return p;
    });

    const updatedStats = { ...stats, apiProviders: updatedProviders };
    setStats(updatedStats);
    saveAdminStats(updatedStats);
  };

  const sampleFarmerList = [
    { id: 'f_101', name: 'Ramesh Kumar', district: 'Ludhiana', state: 'Punjab', acres: '5 Acres', crop: 'Wheat', status: 'Active' },
    { id: 'f_102', name: 'Gurpreet Singh', district: 'Amritsar', state: 'Punjab', acres: '12 Acres', crop: 'Paddy Rice', status: 'Active' },
    { id: 'f_103', name: 'Suresh Prasad', district: 'Patna', state: 'Bihar', acres: '3.5 Acres', crop: 'Maize', status: 'Active' },
    { id: 'f_104', name: 'Vijay Sharma', district: 'Karnal', state: 'Haryana', acres: '8 Acres', crop: 'Mustard', status: 'Active' },
    { id: 'f_105', name: 'Mahesh Patil', district: 'Nashik', state: 'Maharashtra', acres: '6 Acres', crop: 'Cotton', status: 'Active' },
  ];

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Admin Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#f3e8ff', color: '#7e22ce', borderRadius: '1rem' }}>
            <BarChart3 style={{ width: '1.75rem', height: '1.75rem' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>{t.adminTitle}</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Central Telemetry, Farmers Registry & API Management</p>
          </div>
        </div>

        <button
          onClick={handleToggleDemo}
          className="btn"
          style={{
            backgroundColor: demoActive ? '#d97706' : '#16a34a',
            color: '#ffffff'
          }}
        >
          <RefreshCw style={{ width: '1rem', height: '1rem' }} />
          <span>{demoActive ? 'Demo Mode Active' : 'Live API Active'}</span>
        </button>
      </div>

      {/* 1. OVERVIEW VIEW */}
      {activeSubView === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748b' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{t.totalFarmersCount}</span>
                <Users style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
              </div>
              <p style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>{stats.totalFarmers.toLocaleString()}</p>
              <span style={{ fontSize: '0.625rem', color: '#16a34a', fontWeight: 700, marginTop: '0.25rem', display: 'inline-block' }}>+124 this week</span>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748b' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{t.scansCompleted}</span>
                <Activity style={{ width: '1rem', height: '1rem', color: '#9333ea' }} />
              </div>
              <p style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>{stats.scansCompleted.toLocaleString()}</p>
              <span style={{ fontSize: '0.625rem', color: '#9333ea', fontWeight: 700, marginTop: '0.25rem', display: 'inline-block' }}>94.2% AI Accuracy</span>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748b' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{t.advisoriesIssued}</span>
                <Radio style={{ width: '1rem', height: '1rem', color: '#2563eb' }} />
              </div>
              <p style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>{stats.advisoriesIssued.toLocaleString()}</p>
              <span style={{ fontSize: '0.625rem', color: '#2563eb', fontWeight: 700, marginTop: '0.25rem', display: 'inline-block' }}>Irrigation & Disease</span>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748b' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{t.totalFarmsCount}</span>
                <Database style={{ width: '1rem', height: '1rem', color: '#d97706' }} />
              </div>
              <p style={{ fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>{stats.activeDistricts}</p>
              <span style={{ fontSize: '0.625rem', color: '#d97706', fontWeight: 700, marginTop: '0.25rem', display: 'inline-block' }}>Across 11 States</span>
            </div>
          </div>

          {/* Quick System Telemetry Summary */}
          <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase' }}>{t.apiProvidersHeader}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.75rem' }}>
              {stats.apiProviders.map((prov) => (
                <div key={prov.id} style={{ backgroundColor: '#ffffff', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontWeight: 800, color: '#0f172a', display: 'block' }}>{prov.name}</span>
                    <span style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 500 }}>{prov.latencyMs} ms latency</span>
                  </div>
                  <span style={{
                    padding: '0.125rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.625rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    backgroundColor: prov.status === 'online' ? '#dcfce7' : '#fef3c7',
                    color: prov.status === 'online' ? '#166534' : '#78350f'
                  }}>
                    {prov.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. FARMERS REGISTRY VIEW */}
      {(activeSubView === 'farmers' || activeSubView === 'overview') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users style={{ width: '1rem', height: '1rem', color: '#9333ea' }} />
            <span>{t.farmerRegistryTitle}</span>
          </h3>

          <div style={{ backgroundColor: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0', overflowX: 'auto', fontSize: '0.75rem' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#475569' }}>
                  <th style={{ padding: '0.75rem', fontWeight: 800 }}>Farmer ID</th>
                  <th style={{ padding: '0.75rem', fontWeight: 800 }}>Farmer Name</th>
                  <th style={{ padding: '0.75rem', fontWeight: 800 }}>District / State</th>
                  <th style={{ padding: '0.75rem', fontWeight: 800 }}>Land Size</th>
                  <th style={{ padding: '0.75rem', fontWeight: 800 }}>Current Crop</th>
                  <th style={{ padding: '0.75rem', fontWeight: 800, textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleFarmerList.map((f) => (
                  <tr key={f.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#64748b' }}>{f.id}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 800, color: '#0f172a' }}>{f.name}</td>
                    <td style={{ padding: '0.75rem', color: '#334155' }}>{f.district}, {f.state}</td>
                    <td style={{ padding: '0.75rem', color: '#334155' }}>{f.acres}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#15803d' }}>{f.crop}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      <span style={{ backgroundColor: '#dcfce7', color: '#166534', fontSize: '0.625rem', fontWeight: 800, padding: '0.125rem 0.625rem', borderRadius: '9999px' }}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. DATA & SYSTEM LOGS VIEW */}
      {(activeSubView === 'data' || activeSubView === 'system' || activeSubView === 'reports') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity style={{ width: '1rem', height: '1rem', color: '#9333ea' }} />
            <span>{t.systemLogsTitle}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
            {stats.recentLogs.map((log) => (
              <div key={log.id} style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: '#9333ea' }}></span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{log.detail}</span>
                </div>
                <span style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 500 }}>{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
