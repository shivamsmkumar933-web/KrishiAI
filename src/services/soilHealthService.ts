import { SoilAnalysis, SoilType } from '../types';

export const analyzeSoilHealth = (
  n: number,
  p: number,
  k: number,
  ph: number,
  soilType: SoilType = 'alluvial'
): SoilAnalysis => {
  // Nutrient status logic based on Indian ICAR standards
  const nStatus: 'low' | 'medium' | 'optimal' = n < 100 ? 'low' : n < 140 ? 'medium' : 'optimal';
  const pStatus: 'low' | 'medium' | 'optimal' = p < 30 ? 'low' : p < 60 ? 'medium' : 'optimal';
  const kStatus: 'low' | 'medium' | 'optimal' = k < 40 ? 'low' : k < 80 ? 'medium' : 'optimal';

  let phRatingEn = 'Slightly Acidic';
  let phRatingHi = 'हल्की अम्लीय';
  if (ph >= 6.5 && ph <= 7.5) {
    phRatingEn = 'Optimal Neutral (Ideal)';
    phRatingHi = 'उत्तम उदासीन (आदर्श pH)';
  } else if (ph > 7.5) {
    phRatingEn = 'Alkaline Soil';
    phRatingHi = 'क्षारीय मिट्टी';
  }

  // Calculate Health Index score out of 100
  let score = 70;
  if (nStatus === 'optimal') score += 10;
  if (pStatus === 'optimal') score += 10;
  if (kStatus === 'optimal') score += 10;
  if (ph >= 6.2 && ph <= 7.5) score += 10;

  const healthIndex = Math.min(96, Math.max(50, score));
  const organicCarbon = Number((0.55 + (score / 200)).toFixed(2));

  const fertilizers = [];

  if (nStatus === 'low' || nStatus === 'medium') {
    fertilizers.push({
      name: 'Urea (46% Nitrogen)',
      hindiName: 'यूरिया (46% नाइट्रोजन)',
      amountPerAcre: `${nStatus === 'low' ? 45 : 30} kg / acre`,
      amountPerAcreHindi: `${nStatus === 'low' ? 45 : 30} किग्रा / एकड़`,
      timing: 'Apply in 2-3 split doses after weeding',
      timingHindi: 'निराई के बाद 2-3 विभाजित किश्तों में दें'
    });
  }

  if (pStatus === 'low' || pStatus === 'medium') {
    fertilizers.push({
      name: 'DAP (18-46-0)',
      hindiName: 'डीएपी (DAP 18-46-0)',
      amountPerAcre: `${pStatus === 'low' ? 50 : 35} kg / acre`,
      amountPerAcreHindi: `${pStatus === 'low' ? 50 : 35} किग्रा / एकड़`,
      timing: 'Basal application during seedbed preparation',
      timingHindi: 'बुवाई के समय खेत की तैयारी में मिलाएं'
    });
  }

  if (kStatus === 'low' || kStatus === 'medium') {
    fertilizers.push({
      name: 'MOP - Muriate of Potash (60% K2O)',
      hindiName: 'एमओपी (पोटाश 60%)',
      amountPerAcre: '25 kg / acre',
      amountPerAcreHindi: '25 किग्रा / एकड़',
      timing: 'Apply at sowing stage',
      timingHindi: 'बुवाई के समय दें'
    });
  }

  // Organic amendments
  fertilizers.push({
    name: 'Well-Decomposed FYM / Vermicompost',
    hindiName: 'देशी गोबर की खाद / वर्मीकंपोस्ट',
    amountPerAcre: '2 - 3 Tons / acre',
    amountPerAcreHindi: '2 - 3 टन / एकड़',
    timing: 'Incorporate 15 days before main tilling',
    timingHindi: 'जुताई से 15 दिन पहले खेत में मिलाएं'
  });

  const recommendations = [
    'Incorporate organic bio-fertilizers like Azotobacter and PSB to improve nutrient bioavailability.',
    'Maintain regular green manuring (Dhaincha / Sunhemp) during Zaid summer fallow period.'
  ];

  const recommendationsHindi = [
    'पोषक तत्वों की उपलब्धता बढ़ाने के लिए एजोटोबैक्टर और पीएसबी जैसे जैविक टीकों का उपयोग करें।',
    'गर्मी के खाली समय में ढैंचा या सनई बोकर हरी खाद (Green Manure) अवश्य बनाएं।'
  ];

  return {
    nitrogenStatus: nStatus,
    phosphorusStatus: pStatus,
    potassiumStatus: kStatus,
    phRating: phRatingEn,
    phRatingHindi: phRatingHi,
    organicCarbon,
    healthIndex,
    recommendations,
    recommendationsHindi,
    fertilizers
  };
};
