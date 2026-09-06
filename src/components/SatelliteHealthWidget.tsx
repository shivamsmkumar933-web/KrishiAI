import React, { useEffect, useState } from 'react';
import { Globe, Layers, AlertCircle, TrendingUp, MapPin, CheckCircle2, ShieldAlert, ExternalLink, Calendar, Cloud, Eye } from 'lucide-react';
import { SatelliteData, Language, FarmerProfile } from '../types';
import { translations } from '../i18n/translations';
import { getSatelliteCropHealth } from '../services/satelliteService';

interface SatelliteHealthWidgetProps {
  farmerProfile: FarmerProfile;
  language: Language;
}

export const SatelliteHealthWidget: React.FC<SatelliteHealthWidgetProps> = ({ farmerProfile, language }) => {
  const t = translations[language];

  const [satelliteData, setSatelliteData] = useState<SatelliteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeLayer, setActiveLayer] = useState<'preview' | 'ndvi'>('preview');

  useEffect(() => {
    setLoading(true);
    getSatelliteCropHealth(farmerProfile.district, farmerProfile.latitude, farmerProfile.longitude)
      .then(data => {
        setSatelliteData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('STAC fetch error:', err);
        setLoading(false);
      });
  }, [farmerProfile]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100 space-y-3">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-bold text-slate-800">Querying Microsoft Planetary Computer STAC API...</p>
        <p className="text-xs text-slate-500">Searching Sentinel-2 L2A low-cloud imagery for {farmerProfile.district} coordinates...</p>
      </div>
    );
  }

  if (!satelliteData) return null;

  const acqDateStr = satelliteData.acquisitionDate
    ? new Date(satelliteData.acquisitionDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : satelliteData.lastUpdated;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-600" />
            <span>{t.satelliteTitle}</span>
          </h2>
          <p className="text-xs text-slate-500">{t.satelliteSubtitle}</p>
        </div>

        {/* Live Data Source / Demo Tag */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!satelliteData.isDemo ? (
            <span className="text-[11px] bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Source: Microsoft Planetary Computer / Sentinel-2</span>
            </span>
          ) : (
            <span className="text-[11px] bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Demo Satellite Data (Fallback Mode)</span>
            </span>
          )}
        </div>
      </div>

      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* NDVI Score */}
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase block">{t.ndviScoreLabel}</span>
            <span className="text-3xl font-black text-emerald-950 mt-0.5 block">{satelliteData.ndviScore}</span>
            <span className="text-[10px] text-emerald-700 font-medium">Formula: (NIR - Red) / (NIR + Red)</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
            NDVI
          </div>
        </div>

        {/* Vigor Rating */}
        <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-sky-800 uppercase block">{t.healthStatusLabel}</span>
            <span className="text-lg font-black text-sky-950 mt-1 block">
              {language === 'hi' ? satelliteData.vegetationHealthHindi : satelliteData.vegetationHealth}
            </span>
            <span className="text-[10px] text-sky-700 font-medium">Vegetation Cover: {satelliteData.vegetationPct || 65}%</span>
          </div>
          <div className="p-3 bg-white rounded-xl text-sky-600 shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Acquisition Date */}
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-purple-800 uppercase block">Acquisition Date</span>
            <span className="text-sm font-bold text-purple-950 mt-1 block">{acqDateStr}</span>
            <span className="text-[10px] text-purple-700 font-medium">Cloud Cover: {satelliteData.cloudCoverPct ?? 0}%</span>
          </div>
          <div className="p-3 bg-white rounded-xl text-purple-600 shadow-sm">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Coords & Scene ID */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-600 uppercase block">STAC Tile Target</span>
            <span className="text-xs font-bold text-slate-800 mt-1 block truncate max-w-[130px]" title={satelliteData.sceneId}>
              {satelliteData.sceneId || 'Sentinel-2 L2A'}
            </span>
            <span className="text-[10px] text-slate-500">{farmerProfile.district} Farm</span>
          </div>
          <div className="p-3 bg-white rounded-xl text-slate-600 shadow-sm">
            <MapPin className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Satellite Imagery & Map Viewer */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 text-white min-h-[320px] flex flex-col justify-between p-6 shadow-md">
        {/* If Real Preview Image URL exists from Planetary Computer, show image as background */}
        {satelliteData.previewUrl ? (
          <div className="absolute inset-0 bg-cover bg-center opacity-80 transition-all duration-700" style={{ backgroundImage: `url(${satelliteData.previewUrl})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-slate-900 to-green-950 opacity-90"></div>
        )}

        {/* Map Header Overlay */}
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 bg-black/75 backdrop-blur px-3.5 py-1.5 rounded-xl border border-white/10 text-xs">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{farmerProfile.district} ({farmerProfile.latitude.toFixed(4)}° N, {farmerProfile.longitude.toFixed(4)}° E)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-black/75 backdrop-blur text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-xl border border-white/10 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Sentinel-2 Imagery View</span>
            </span>
          </div>
        </div>

        {/* Center Field Marker & Overlay Specs */}
        <div className="relative z-10 my-auto text-center space-y-3 py-6">
          <div className="inline-flex items-center gap-2 bg-black/80 backdrop-blur text-white border border-emerald-500/50 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-2xl">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Sentinel-2 L2A Spectral Vigor (Calculated NDVI: {satelliteData.ndviScore})</span>
          </div>
          <p className="text-xs text-slate-200 max-w-lg mx-auto bg-black/50 backdrop-blur p-2 rounded-xl border border-white/10">
            Retrieved from <strong>Microsoft Planetary Computer STAC STAC API</strong>. 
            Acquisition date: {acqDateStr} (Cloud cover: {satelliteData.cloudCoverPct ?? 0}%).
          </p>
        </div>

        {/* Bottom Bar: Direct Band Asset Links */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs border-t border-white/10 pt-3 bg-black/60 backdrop-blur -mx-6 -mb-6 p-4">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-300 font-bold">STAC Spectral Assets:</span>
            {satelliteData.redBandUrl && (
              <a
                href={satelliteData.redBandUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline"
              >
                Red Band (B04) <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {satelliteData.nirBandUrl && (
              <a
                href={satelliteData.nirBandUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline"
              >
                NIR Band (B08) <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <span>STAC Spec: 10m Spatial Resolution</span>
          </div>
        </div>
      </div>

      {/* Historical Vigor & Stress Hotspots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trend Graph */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            {t.temporalGraphTitle}
          </h4>

          <div className="space-y-2 pt-2">
            {satelliteData.historicalTrend.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                <span className="w-14 text-slate-500 font-medium text-[11px]">{item.date}</span>
                <div className="flex-1 bg-slate-200 h-3.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.ndvi * 100}%` }}
                  ></div>
                </div>
                <span className="w-10 text-right font-bold text-slate-800">{item.ndvi}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stress Hotspots */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            {t.stressAreasHeader}
          </h4>

          <div className="space-y-3">
            {satelliteData.stressAreas.map((area) => (
              <div key={area.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{language === 'hi' ? area.areaNameHindi : area.areaName}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${
                    area.severity === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {area.severity} Stress
                  </span>
                </div>
                <p className="text-slate-600 font-medium">
                  Issue: {language === 'hi' ? area.issueHindi : area.issue}
                </p>
                <p className="text-emerald-700 bg-emerald-50 p-2 rounded-lg mt-1 font-semibold">
                  Action: {language === 'hi' ? area.recommendationHindi : area.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
