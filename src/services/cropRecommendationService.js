const CROP_DATABASE = [
  {
    name: 'Wheat',
    hindiName: 'गेहूं (Wheat)',
    preferredSeasons: ['rabi'],
    preferredSoils: ['alluvial', 'loam', 'clay'],
    idealPh: [6.0, 7.5],
    idealNPK: [120, 60, 40],
    waterNeed: 'Medium',
    waterNeedHindi: 'मध्यम (4-5 सिंचाई)',
    duration: '115 - 135 Days',
    durationHindi: '115 - 135 दिन',
    yieldEst: '20 - 25 Quintal / Acre',
    marketPrice: '₹2,275 / Quintal (MSP)',
    icon: 'Wheat',
    reasonsEn: ['Excellent fit for Rabi season and loamy/alluvial soil with balanced N-P-K.'],
    reasonsHi: ['रबी मौसम और दोमट/जलोढ़ मिट्टी के लिए आदर्श नाइट्रोजन-फास्फोरस संतुलन।'],
    guidanceEn: [
      'Perform primary tilling with line sowing at 20 cm spacing.',
      'Apply first crown root irrigation (CRI) at 21 days after sowing.',
      'Top dress with 45 kg Urea/acre at 30 days.'
    ],
    guidanceHi: [
      '20 सेमी की दूरी पर कतारों में गेहूं की बुवाई करें।',
      'बुवाई के 21 दिन बाद पहली सिंचाई (CRI चरण) अवश्य करें।',
      '30 दिन पर प्रति एकड़ 45 किग्रा यूरिया का छिड़काव करें।'
    ]
  },
  {
    name: 'Paddy / Rice',
    hindiName: 'धान / चावल (Paddy Rice)',
    preferredSeasons: ['kharif'],
    preferredSoils: ['clay', 'alluvial', 'black'],
    idealPh: [5.5, 7.0],
    idealNPK: [100, 50, 50],
    waterNeed: 'Very High',
    waterNeedHindi: 'अत्यधिक (सतत जल जमाव)',
    duration: '120 - 150 Days',
    durationHindi: '120 - 150 दिन',
    yieldEst: '22 - 28 Quintal / Acre',
    marketPrice: '₹2,300 / Quintal (MSP)',
    icon: 'Wheat',
    reasonsEn: ['High clay retention in Kharif season ensures high paddy yield.'],
    reasonsHi: ['खरीफ मौसम में चिकनी/जलोढ़ मिट्टी जल संचयन के लिए सर्वोत्तम है।'],
    guidanceEn: [
      'Prepare puddled field with 5 cm standing water for transplantation.',
      'Transplant 21-25 day old nursery seedlings.',
      'Keep field flooded till dough stage of grain formation.'
    ],
    guidanceHi: [
      'रोपाई के लिए 5 सेमी खड़े पानी के साथ कादू (Puddling) तैयार करें।',
      '21-25 दिन पुरानी पौध की कतारबद्ध रोपाई करें।',
      'दाने बनने की अवस्था तक खेत में नमी बनाए रखें।'
    ]
  },
  {
    name: 'Cotton',
    hindiName: 'कपास (Cotton)',
    preferredSeasons: ['kharif'],
    preferredSoils: ['black', 'alluvial'],
    idealPh: [6.5, 8.0],
    idealNPK: [90, 45, 45],
    waterNeed: 'Medium',
    waterNeedHindi: 'मध्यम',
    duration: '150 - 180 Days',
    durationHindi: '150 - 180 दिन',
    yieldEst: '10 - 14 Quintal / Acre',
    marketPrice: '₹7,121 / Quintal (MSP)',
    icon: 'Sprout',
    reasonsEn: ['Deep black clay soil retains moisture perfectly for high cotton boll growth.'],
    reasonsHi: ['काली दोमट मिट्टी कपास के पौधे के विकास और डोडे बनने के लिए अति उपयुक्त है।'],
    guidanceEn: [
      'Use Bt-Cotton certified seeds treated with imidacloprid.',
      'Maintain row spacing of 90 cm x 60 cm for optimum sunlight.',
      'Monitor for pink bollworm at 60-90 days interval.'
    ],
    guidanceHi: [
      'प्रमाणित बीटी-कॉटन बीज का प्रयोग करें।',
      'पंक्ति से पंक्ति की दूरी 90 सेमी रखें।',
      '60-90 दिनों में गुलाबी सूंडी (Pink Bollworm) की निगरानी करें।'
    ]
  },
  {
    name: 'Mustard / Rapeseed',
    hindiName: 'सरसों (Mustard)',
    preferredSeasons: ['rabi'],
    preferredSoils: ['loam', 'sandy', 'alluvial', 'red'],
    idealPh: [6.0, 7.8],
    idealNPK: [80, 40, 40],
    waterNeed: 'Low',
    waterNeedHindi: 'कम (2-3 सिंचाई)',
    duration: '105 - 120 Days',
    durationHindi: '105 - 120 दिन',
    yieldEst: '8 - 12 Quintal / Acre',
    marketPrice: '₹5,650 / Quintal (MSP)',
    icon: 'Sun',
    reasonsEn: ['Low water requirement makes mustard ideal for light loam soil during Rabi.'],
    reasonsHi: ['कम सिंचाई की आवश्यकता के कारण रबी में बलुई दोमट मिट्टी हेतु सर्वोत्तम फसल।'],
    guidanceEn: [
      'Sow seeds at shallow depth of 3-4 cm in moist seedbed.',
      'First irrigation at flowering stage (30-35 days).',
      'Apply Single Super Phosphate (SSP) for high oil content.'
    ],
    guidanceHi: [
      '3-4 सेमी की गहराई पर बीजों की बुवाई करें।',
      'फूल आने के समय (30-35 दिन) पहली सिंचाई करें।',
      'तेल की मात्रा बढ़ाने के लिए सल्फर युक्त एसएसपी (SSP) खाद डालें।'
    ]
  },
  {
    name: 'Maize / Corn',
    hindiName: 'मक्का (Maize)',
    preferredSeasons: ['kharif', 'zaid'],
    preferredSoils: ['alluvial', 'loam', 'red'],
    idealPh: [5.8, 7.2],
    idealNPK: [100, 50, 40],
    waterNeed: 'Medium',
    waterNeedHindi: 'मध्यम',
    duration: '90 - 110 Days',
    durationHindi: '90 - 110 दिन',
    yieldEst: '18 - 24 Quintal / Acre',
    marketPrice: '₹2,090 / Quintal (MSP)',
    icon: 'Zap',
    reasonsEn: ['Well-drained alluvial soil and high nitrogen availability boost maize cob weight.'],
    reasonsHi: ['अच्छे जल निकास वाली जलोढ़ मिट्टी मक्के के भुट्टे के वजन को बढ़ाती है।'],
    guidanceEn: [
      'Plant seeds on ridges at 60 cm x 20 cm spacing.',
      'Apply nitrogen in 3 splits (sowing, knee-high, tasseling).',
      'Prevent Fall Armyworm by early whorl application of Emamectin.'
    ],
    guidanceHi: [
      'मेड़ों पर 60 सेमी x 20 सेमी की दूरी पर बीज बोएं।',
      'नाइट्रोजन को 3 किश्तों में दें (बुवाई, घुटना ऊंचाई, और मूंछें निकलने पर)।',
      'फॉलो आर्मीवार्म से बचाव के लिए उपयुक्त कीटनाशक का छिड़काव करें।'
    ]
  },
  {
    name: 'Gram / Chickpea',
    hindiName: 'चना (Chickpea / Chana)',
    preferredSeasons: ['rabi'],
    preferredSoils: ['black', 'loam', 'alluvial', 'red'],
    idealPh: [6.0, 8.0],
    idealNPK: [20, 50, 20],
    waterNeed: 'Low',
    waterNeedHindi: 'बहुत कम (1-2 सिंचाई)',
    duration: '110 - 125 Days',
    durationHindi: '110 - 125 दिन',
    yieldEst: '7 - 10 Quintal / Acre',
    marketPrice: '₹5,440 / Quintal (MSP)',
    icon: 'Leaf',
    reasonsEn: ['Fixes atmospheric nitrogen into soil, thrives with minimal irrigation.'],
    reasonsHi: ['मिट्टी में नाइट्रोजन बढ़ाता है और बहुत कम पानी में उत्कृष्ट उपज देता है।'],
    guidanceEn: [
      'Treat seeds with Rhizobium culture before sowing.',
      'Nipping (top pinching) at 35-40 days to encourage side branching.',
      'Avoid heavy irrigation during flowering to prevent pod drop.'
    ],
    guidanceHi: [
      'बुवाई से पहले बीजों को राइजोबियम कल्चर से उपचारित करें।',
      '35-40 दिन पर ऊपरी कोपलों को तोड़ें (खुंटाई) ताकि शाखाएं अधिक निकलें।',
      'फूल आते समय सिंचाई करने से बचें।'
    ]
  },
  {
    name: 'Sugarcane',
    hindiName: 'गन्ना (Sugarcane)',
    preferredSeasons: ['kharif', 'zaid'],
    preferredSoils: ['alluvial', 'black', 'loam', 'clay'],
    idealPh: [6.5, 7.5],
    idealNPK: [150, 60, 60],
    waterNeed: 'Very High',
    waterNeedHindi: 'अत्यधिक (बार-बार सिंचाई)',
    duration: '300 - 365 Days',
    durationHindi: '10 - 12 महीने',
    yieldEst: '350 - 450 Quintal / Acre',
    marketPrice: '₹315 / Quintal (FRP)',
    icon: 'Sprout',
    reasonsEn: ['Rich alluvial soil with high nitrogen capacity yields dense sugar cane stalks.'],
    reasonsHi: ['गहरे पानी और नाइट्रोजन वाली उपजाऊ मिट्टी गन्ने के लिए सबसे लाभदायक है।'],
    guidanceEn: [
      'Plant 3-budded setts in furrows 90 cm apart.',
      'Earthing up at 120 days to prevent lodging during monsoon.',
      'Trash mulching in inter-rows to conserve soil moisture.'
    ],
    guidanceHi: [
      '90 सेमी दूर नालियों में 3-आंख वाले गन्ने के टुकड़ों की बुवाई करें।',
      'मानसून से पहले 120 दिनों में पौधों पर मिट्टी चढ़ाएं (Earthing up)।',
      'नमी बनाए रखने के लिए सूखी पत्तियों से मल्चिंग करें।'
    ]
  },
  {
    name: 'Groundnut / Peanut',
    hindiName: 'मूंगफली (Groundnut)',
    preferredSeasons: ['kharif', 'zaid'],
    preferredSoils: ['sandy', 'loam', 'red', 'alluvial'],
    idealPh: [6.0, 7.5],
    idealNPK: [25, 50, 40],
    waterNeed: 'Low',
    waterNeedHindi: 'कम से मध्यम',
    duration: '100 - 115 Days',
    durationHindi: '100 - 115 दिन',
    yieldEst: '10 - 14 Quintal / Acre',
    marketPrice: '₹6,377 / Quintal (MSP)',
    icon: 'Sun',
    reasonsEn: ['Friable sandy loam soil enables easy peg penetration and pod expansion.'],
    reasonsHi: ['भुरभुरी बलुई दोमट मिट्टी मूंगफली की सुइयों (Pegs) के प्रवेश हेतु सबसे उत्तम है।'],
    guidanceEn: [
      'Apply Gypsum @ 200 kg/acre at pegging stage for pod filling.',
      'Ensure soil remains loose during 40-60 days interval.',
      'Harvest when inner shell turns dark brown.'
    ],
    guidanceHi: [
      'सुइयां बनते समय प्रति एकड़ 200 किग्रा जिप्सम का प्रयोग करें।',
      '40-60 दिनों के दौरान खेत की मिट्टी को भुरभुरा बनाए रखें।',
      'जब छिलके का अंदरूनी हिस्सा गहरा भूरा हो जाए तब खुदाई करें।'
    ]
  }
];

export const recommendCrops = (input) => {
  const scoredCrops = CROP_DATABASE.map(crop => {
    let score = 50;

    if (crop.preferredSeasons.includes(input.season)) {
      score += 25;
    } else {
      score -= 30;
    }

    if (crop.preferredSoils.includes(input.soilType)) {
      score += 15;
    } else {
      score -= 10;
    }

    if (input.ph >= crop.idealPh[0] && input.ph <= crop.idealPh[1]) {
      score += 10;
    }

    if (crop.waterNeed === 'Very High' || crop.waterNeed === 'High') {
      if (input.irrigation === 'canal' || input.irrigation === 'borewell') score += 10;
      if (input.irrigation === 'rainfed') score -= 25;
    } else if (crop.waterNeed === 'Low') {
      if (input.irrigation === 'rainfed' || input.irrigation === 'drip') score += 10;
    }

    if (input.nitrogen > 100 && crop.idealNPK[0] > 100) score += 5;
    if (input.phosphorus > 40 && crop.idealNPK[1] > 40) score += 5;

    const finalSuitability = Math.min(98, Math.max(62, score));

    return {
      cropName: crop.name,
      hindiName: crop.hindiName,
      suitability: finalSuitability,
      reason: crop.reasonsEn[0],
      reasonHindi: crop.reasonsHi[0],
      duration: crop.duration,
      durationHindi: crop.durationHindi,
      waterReq: crop.waterNeed,
      waterReqHindi: crop.waterNeedHindi,
      npkReq: `N:${crop.idealNPK[0]}, P:${crop.idealNPK[1]}, K:${crop.idealNPK[2]}`,
      expectedYield: crop.yieldEst,
      marketPriceEst: crop.marketPrice,
      icon: crop.icon,
      guidance: crop.guidanceEn,
      guidanceHindi: crop.guidanceHi,
    };
  });

  return scoredCrops
    .sort((a, b) => b.suitability - a.suitability)
    .slice(0, 3);
};
