import React, { useState } from 'react';
import { Landmark, Search, ExternalLink, CheckCircle2, ChevronRight, X, Shield, FileText } from 'lucide-react';
import { GovernmentScheme, Language } from '../types';
import { translations } from '../i18n/translations';
import { INDIAN_GOVT_SCHEMES } from '../services/governmentSchemesService';

interface GovernmentSchemesCardProps {
  language: Language;
}

export const GovernmentSchemesCard: React.FC<GovernmentSchemesCardProps> = ({ language }) => {
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalScheme, setActiveModalScheme] = useState<GovernmentScheme | null>(null);

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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.schemesTitle}</h2>
            <p className="text-xs text-slate-500">{t.schemesSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Controls: Search & Category Pills */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scheme name (e.g., PM-KISAN, Fasal Bima, KCC, Soil Card)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-slate-50 hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 rounded-2xl p-5 flex flex-col justify-between transition group"
          >
            <div className="space-y-2">
              <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {language === 'hi' ? scheme.categoryLabelHindi : scheme.categoryLabel}
              </span>

              <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition">
                {language === 'hi' ? scheme.hindiName : scheme.name}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {language === 'hi' ? scheme.purposeHindi : scheme.purpose}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
              <button
                onClick={() => setActiveModalScheme(scheme)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>{t.learnMoreBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 bg-white text-slate-500 hover:text-emerald-700 rounded-lg border border-slate-200 hover:border-emerald-300 shadow-sm"
                title="Official Portal"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {activeModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative my-8 space-y-5">
            <button
              onClick={() => setActiveModalScheme(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {language === 'hi' ? activeModalScheme.categoryLabelHindi : activeModalScheme.categoryLabel}
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {language === 'hi' ? activeModalScheme.hindiName : activeModalScheme.name}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {language === 'hi' ? activeModalScheme.purposeHindi : activeModalScheme.purpose}
              </p>
            </div>

            {/* Eligibility & Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Eligibility */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  {t.eligibilityHeader}
                </h4>
                <ul className="space-y-1.5 text-slate-700">
                  {(language === 'hi' ? activeModalScheme.eligibilityHindi : activeModalScheme.eligibility).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {t.benefitsHeader}
                </h4>
                <ul className="space-y-1.5 text-emerald-950">
                  {(language === 'hi' ? activeModalScheme.benefitsHindi : activeModalScheme.benefits).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step by Step Application */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                How to Apply (आवेदन कैसे करें)
              </h4>
              <ol className="space-y-1.5 text-slate-700">
                {(language === 'hi' ? activeModalScheme.applicationStepsHindi : activeModalScheme.applicationSteps).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalScheme(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                {t.closeBtn}
              </button>
              <a
                href={activeModalScheme.officialLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <span>{t.officialPortalBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
