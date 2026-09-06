import React, { useState } from 'react';
import { Users, Activity, Radio, ShieldAlert, CheckCircle, RefreshCw, BarChart3, Database, Layers, Camera, Landmark, Server, FileText } from 'lucide-react';
import { Language, AdminStats } from '../types';
import { translations } from '../i18n/translations';
import { getAdminStats, isDemoModeActive, setDemoModeActive, saveAdminStats } from '../services/storageService';

interface AdminDashboardProps {
  language: Language;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  language,
  currentTab,
  onTabChange
}) => {
  const t = translations[language];

  const [stats, setStats] = useState<AdminStats>(getAdminStats());
  const [demoActive, setDemoActive] = useState<boolean>(isDemoModeActive());

  const activeSubView = ['overview', 'farmers', 'data', 'reports', 'system'].includes(currentTab) ? currentTab : 'overview';

  const handleToggleDemo = () => {
    const nextState = !demoActive;
    setDemoActive(nextState);
    setDemoModeActive(nextState);

    const updatedProviders = stats.apiProviders.map(p => {
      if (p.type === 'ai_vision' || p.type === 'satellite') {
        return { ...p, status: nextState ? ('demo' as const) : ('online' as const) };
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">{t.adminTitle}</h2>
            <p className="text-xs text-slate-500 font-medium">Central Telemetry, Farmers Registry & API Management</p>
          </div>
        </div>

        <button
          onClick={handleToggleDemo}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-md ${
            demoActive ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>{demoActive ? 'Demo Mode Active' : 'Live API Active'}</span>
        </button>
      </div>

      {/* Sub-View Router */}

      {/* 1. OVERVIEW VIEW */}
      {activeSubView === 'overview' && (
        <div className="space-y-6">
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase">{t.totalFarmersCount}</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">{stats.totalFarmers.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">+124 this week</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase">{t.scansCompleted}</span>
                <Activity className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">{stats.scansCompleted.toLocaleString()}</p>
              <span className="text-[10px] text-purple-600 font-semibold mt-1 inline-block">94.2% AI Accuracy</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase">{t.advisoriesIssued}</span>
                <Radio className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">{stats.advisoriesIssued.toLocaleString()}</p>
              <span className="text-[10px] text-blue-600 font-semibold mt-1 inline-block">Irrigation & Disease</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase">{t.totalFarmsCount}</span>
                <Database className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">{stats.activeDistricts}</p>
              <span className="text-[10px] text-amber-600 font-semibold mt-1 inline-block">Across 11 States</span>
            </div>
          </div>

          {/* Quick System Telemetry Summary */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{t.apiProvidersHeader}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {stats.apiProviders.map((prov) => (
                <div key={prov.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">{prov.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{prov.latencyMs} ms latency</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    prov.status === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                  }`}>
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
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>{t.farmerRegistryTitle}</span>
          </h3>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100 text-slate-600">
                  <th className="p-3 font-bold">Farmer ID</th>
                  <th className="p-3 font-bold">Farmer Name</th>
                  <th className="p-3 font-bold">District / State</th>
                  <th className="p-3 font-bold">Land Size</th>
                  <th className="p-3 font-bold">Current Crop</th>
                  <th className="p-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleFarmerList.map((f) => (
                  <tr key={f.id} className="border-b border-slate-200/60 hover:bg-slate-100/50">
                    <td className="p-3 font-mono text-slate-500">{f.id}</td>
                    <td className="p-3 font-bold text-slate-900">{f.name}</td>
                    <td className="p-3 font-medium text-slate-700">{f.district}, {f.state}</td>
                    <td className="p-3 font-medium text-slate-700">{f.acres}</td>
                    <td className="p-3 font-semibold text-emerald-700">{f.crop}</td>
                    <td className="p-3 text-right">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
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
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-600" />
            <span>{t.systemLogsTitle}</span>
          </h3>

          <div className="space-y-2 text-xs">
            {stats.recentLogs.map((log) => (
              <div key={log.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span className="font-semibold text-slate-800">{log.detail}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
