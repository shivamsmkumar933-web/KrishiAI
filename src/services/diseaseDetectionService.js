export const DEMO_DISEASE_SAMPLES = [
  {
    id: 'sample_wheat_rust',
    detectedCrop: 'Wheat (Triticum aestivum)',
    cropHindiName: 'गेहूं (Wheat)',
    diseaseName: 'Puccinia striiformis (Yellow Rust / Stripe Rust)',
    diseaseHindiName: 'पीला रतुआ (Yellow Rust)',
    confidence: 94,
    isHealthy: false,
    severity: 'high',
    symptoms: [
      'Bright yellow linear stripes on leaf upper surface along veins',
      'Powdery yellow pustules (uredinia) releasing spores when touched',
      'Chlorosis and premature yellowing and drying of entire leaf blade'
    ],
    symptomsHindi: [
      'पत्तियों की ऊपरी सतह पर शिराओं के समांतर चमकदार पीले रंग की धारियां',
      'पत्तियों को छूने पर हाथों में पीला पाउडर (बीजाणु) लगना',
      'पत्तियों का समय से पहले पीला पड़कर सूखना'
    ],
    preventiveSteps: [
      'Plant resistant varieties like HD 3086, DBW 187, or PBW 725',
      'Avoid excessive nitrogenous fertilizer application in early stages',
      'Maintain field hygiene and rogue out infected volunteer wheat plants'
    ],
    preventiveStepsHindi: [
      'रोग प्रतिरोधी किस्मों (जैसे HD 3086, DBW 187, PBW 725) की बुवाई करें।',
      'शुरुआती अवस्था में अत्यधिक यूरिया (नाइट्रोजन) के प्रयोग से बचें।',
      'संक्रमित पौधों को उखाड़कर नष्ट कर दें।'
    ],
    recommendedActions: {
      chemical: [
        'Foliar spray of Propiconazole 25% EC @ 200 ml in 200 liters of water per acre.',
        'Tebuconazole 25.9% EC @ 200 ml/acre if rust coverage exceeds 5% of leaf area.'
      ],
      chemicalHindi: [
        'प्रोपीकोनाज़ोल 25% EC (Tilt) @ 200 मिली प्रति 200 लीटर पानी प्रति एकड़ छिड़काव करें।',
        'संक्रमण अधिक होने पर टेबूकोनाज़ोल 25.9% EC @ 200 मिली/एकड़ का छिड़काव करें।'
      ],
      organic: [
        'Spray fresh Cow Urine solution (10% concentration) mixed with 5% Sour Butter Milk (Lassi).',
        'Neem Seed Kernel Extract (NSKE 5%) spray at 15-day intervals.'
      ],
      organicHindi: [
        '10% ताजा गौमूत्र को 5% खट्टी छाछ (लस्सी) के साथ मिलाकर पत्तियों पर छिड़कें।',
        'नीम के बीज का अर्क (NSKE 5%) 15 दिनों के अंतराल पर छिड़कें।'
      ]
    },
    timestamp: new Date().toISOString(),
    isDemo: true
  },
  {
    id: 'sample_potato_blight',
    detectedCrop: 'Potato (Solanum tuberosum)',
    cropHindiName: 'आलू (Potato)',
    diseaseName: 'Phytophthora infestans (Late Blight of Potato)',
    diseaseHindiName: 'पछेती झुलसा (Late Blight)',
    confidence: 96,
    isHealthy: false,
    severity: 'high',
    symptoms: [
      'Water-soaked irregular dark brown to black lesions on leaf tips and margins',
      'White downy fungal growth on lower surface of leaves during humid morning hours',
      'Rapid collapse and wilting of whole canopy within 3 to 4 days'
    ],
    symptomsHindi: [
      'पत्तियों के सिरों पर काले-भूरे रंग के जलीय धब्बे (Lesions)',
      'सुबह की नमी में पत्ती के निचले हिस्से पर सफेद फफूंद (Downy Growth)',
      '3-4 दिनों के भीतर फसल का अचानक झुलसकर गिर जाना'
    ],
    preventiveSteps: [
      'Use certified disease-free seed tubers with Trichoderma treatment',
      'Ensure high earthing-up to protect tubers from down-washed spores',
      'Avoid overhead sprinkler irrigation during cloudy weather'
    ],
    preventiveStepsHindi: [
      'प्रमाणित और रोगमुक्त आलू के बीजों का ही प्रयोग करें।',
      'कंदों (आलू) को बीजाणुओं से बचाने के लिए जड़ों पर पर्याप्त मिट्टी चढ़ाएं।',
      'बादल छाए रहने के दौरान ऊपर से फव्वारा सिंचाई से बचें।'
    ],
    recommendedActions: {
      chemical: [
        'Spray Mancozeb 75% WP @ 600g/acre as prophylactic spray before fog/rain.',
        'Curative spray of Cymoxanil 8% + Mancozeb 64% WP @ 600g in 200L water per acre.'
      ],
      chemicalHindi: [
        'कोहरा या बारिश से पहले सुरक्षात्मक रूप से मैंकोज़ेब 75% WP @ 600 ग्राम/एकड़ छिड़कें।',
        'बीमारी फैलने पर साइमोक्सानिल + मैंकोज़ेब @ 600 ग्राम/एकड़ का छिड़काव करें।'
      ],
      organic: [
        'Spray Copper Oxychloride 50% WP @ 500g mixed with fermented neem leaf extract.',
        'Bio-fungicide Trichoderma viride foliar spray @ 5g/liter water.'
      ],
      organicHindi: [
        'कॉपर ऑक्सीक्लोराइड 50% WP @ 500 ग्राम को नीम के अर्क के साथ मिलाकर छिड़कें।',
        'जैविक फफूंदनाशी ट्राइकोडरमा विरिडे (5 ग्राम/लीटर) का छिड़काव करें।'
      ]
    },
    timestamp: new Date().toISOString(),
    isDemo: true
  },
  {
    id: 'sample_rice_blast',
    detectedCrop: 'Paddy / Rice (Oryza sativa)',
    cropHindiName: 'धान (Paddy Rice)',
    diseaseName: 'Magnaporthe oryzae (Rice Leaf Blast)',
    diseaseHindiName: 'धान का ब्लास्ट रोग (Rice Leaf Blast)',
    confidence: 91,
    isHealthy: false,
    severity: 'medium',
    symptoms: [
      'Spindle-shaped or eye-shaped lesions with reddish-brown margins and gray center',
      'Lesions enlarge and coalesce causing leaf desiccation and burning appearance',
      'Lesion at node or neck leading to neck blast and empty panicles'
    ],
    symptomsHindi: [
      'पत्तियों पर नांव या आंख के आकार के धब्बे जिनके बीच का भाग भूरा-सफेद होता है',
      'धब्बों के आपस में मिलने से पत्तियां झुलसी हुई दिखाई देती हैं',
      'बालियों के निचले जोड़ पर कालापन (Neck Blast) जिससे बालियां सफेद/खाली रह जाती हैं'
    ],
    preventiveSteps: [
      'Avoid excess application of urea fertilizer in split doses',
      'Maintain field water level of 2-5 cm during tillering stage',
      'Burn or compost crop residues after harvest'
    ],
    preventiveStepsHindi: [
      'यूरिया का अत्यधिक और एकमुश्त छिड़काव न करें।',
      'कल्ले निकलते समय खेत में 2-5 सेमी पानी बनाए रखें।',
      'कटाई के बाद अवशेषों को खेत से साफ करें।'
    ],
    recommendedActions: {
      chemical: [
        'Foliar spray of Tricyclazole 75% WP @ 120g per acre in 200 liters of water.',
        'Isoprothiolane 40% EC @ 300 ml/acre at initial spot appearance.'
      ],
      chemicalHindi: [
        'ट्राइसाइक्लाज़ोल 75% WP (Baan) @ 120 ग्राम प्रति एकड़ छिड़काव करें।',
        'शुरुआती धब्बे दिखने पर आइसोप्राथियोलेन 40% EC @ 300 मिली/एकड़ छिड़कें।'
      ],
      organic: [
        'Foliar application of Pseudomonas fluorescens @ 10g/liter water.',
        'Spray garlic-chilli extract mixed with soap water solution.'
      ],
      organicHindi: [
        'जैविक सुडोमोनस फ्लोरोसेंस @ 10 ग्राम/लीटर पानी का छिड़काव करें।',
        'लहसुन-मिर्च के प्राकृतिक अर्क को साबुन के घोल में मिलाकर छिड़कें।'
      ]
    },
    timestamp: new Date().toISOString(),
    isDemo: true
  },
  {
    id: 'sample_healthy_crop',
    detectedCrop: 'Tomato (Solanum lycopersicum)',
    cropHindiName: 'टमाटर (Tomato)',
    diseaseName: 'Healthy Canopy (No Pathogen Detected)',
    diseaseHindiName: 'स्वस्थ पौधा (कोई रोग नहीं मिला)',
    confidence: 98,
    isHealthy: true,
    severity: 'low',
    symptoms: [
      'Vibrant deep green foliage with uniform leaf thickness',
      'No signs of chlorosis, leaf curl, necrosis or fungal spots',
      'Healthy apical growth and robust flower clusters'
    ],
    symptomsHindi: [
      'चमकदार और गहरा हरा पत्ता, बिना किसी धब्बे या दाग के',
      'कोई पीलापन, ऐंठन या फंगल धब्बे नहीं पाए गए',
      'पौधे की ऊपरी वृद्धि और फूल स्वस्थ और मजबूत हैं'
    ],
    preventiveSteps: [
      'Continue balanced fertigation schedule (NPK + Micronutrients)',
      'Maintain adequate plant spacing for optimal sunlight penetration',
      'Inspect weekly for early aphid or whitefly infestation'
    ],
    preventiveStepsHindi: [
      'संतुलित उर्वरक (NPK + सूक्ष्म पोषक तत्व) देना जारी रखें।',
      'पौधों के बीच पर्याप्त दूरी और हवा का संचार बनाए रखें।',
      'सप्ताह में एक बार कीड़ों की नियमित निगरानी करें।'
    ],
    recommendedActions: {
      chemical: [
        'No chemical fungicide treatment required at this stage.',
        'Optional prophylactic spray of Soluble Sulfur @ 2g/liter.'
      ],
      chemicalHindi: [
        'इस समय किसी रासायनिक दवा की आवश्यकता नहीं है।',
        'सुरक्षात्मक रूप से सल्फर पाउडर (2 ग्राम/लीटर) का छिड़काव कर सकते हैं।'
      ],
      organic: [
        'Regular preventative spraying of Neem Oil (10,000 ppm) @ 3 ml/liter.',
        'Application of Panchagavya or Jeevamrut to boost soil immunity.'
      ],
      organicHindi: [
        '15 दिनों में नीम के तेल (10,000 ppm) @ 3 मिली/लीटर का छिड़काव करें।',
        'मिट्टी की उर्वरता बढ़ाने के लिए जीवामृत का प्रयोग करें।'
      ]
    },
    timestamp: new Date().toISOString(),
    isDemo: true
  }
];

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const analyzeCropDiseaseImage = async (imageDataBase64, demoIndex = 0) => {
  // First try Node.js Express Backend API
  try {
    const backendRes = await fetch(`${API_BASE}/disease/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageDataBase64 })
    });
    if (backendRes.ok) {
      const data = await backendRes.json();
      if (data && data.diseaseName) return data;
    }
  } catch (backendErr) {
    console.warn('Express Backend Disease API unavailable, utilizing fallback provider', backendErr);
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: `You are an expert Indian plant pathologist. Analyze this crop leaf photo and return a strict JSON object with these keys:
                {
                  "detectedCrop": "crop name",
                  "cropHindiName": "crop name in Hindi",
                  "diseaseName": "botanical and common disease name",
                  "diseaseHindiName": "disease name in Hindi",
                  "confidence": 95,
                  "isHealthy": false,
                  "severity": "high/medium/low",
                  "symptoms": ["symptom 1", "symptom 2"],
                  "symptomsHindi": ["symptom 1 in Hindi", "symptom 2 in Hindi"],
                  "preventiveSteps": ["step 1", "step 2"],
                  "preventiveStepsHindi": ["step 1 in Hindi"],
                  "recommendedActions": {
                    "chemical": ["chemical treatment 1"],
                    "chemicalHindi": ["chemical treatment 1 in Hindi"],
                    "organic": ["organic treatment 1"],
                    "organicHindi": ["organic treatment 1 in Hindi"]
                  }
                }`
              },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: imageDataBase64.replace(/^data:image\/\w+;base64,/, '')
                }
              }
            ]
          }]
        })
      });

      if (response.ok) {
        const jsonRes = await response.json();
        const rawText = jsonRes.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);

        return {
          id: `scan_${Date.now()}`,
          detectedCrop: parsed.detectedCrop || 'Crop Leaf',
          cropHindiName: parsed.cropHindiName || 'फसल पत्ती',
          diseaseName: parsed.diseaseName || 'Leaf Infection',
          diseaseHindiName: parsed.diseaseHindiName || 'पत्ती का रोग',
          confidence: parsed.confidence || 92,
          isHealthy: !!parsed.isHealthy,
          severity: parsed.severity || 'medium',
          symptoms: parsed.symptoms || [],
          symptomsHindi: parsed.symptomsHindi || [],
          preventiveSteps: parsed.preventiveSteps || [],
          preventiveStepsHindi: parsed.preventiveStepsHindi || [],
          recommendedActions: {
            chemical: parsed.recommendedActions?.chemical || [],
            chemicalHindi: parsed.recommendedActions?.chemicalHindi || [],
            organic: parsed.recommendedActions?.organic || [],
            organicHindi: parsed.recommendedActions?.organicHindi || []
          },
          imageUrl: imageDataBase64,
          timestamp: new Date().toISOString(),
          isDemo: false
        };
      }
    } catch (err) {
      console.warn('Gemini AI Vision call failed, utilizing high-fidelity agricultural fallback database', err);
    }
  }

  const selectedSample = DEMO_DISEASE_SAMPLES[demoIndex % DEMO_DISEASE_SAMPLES.length];
  return {
    ...selectedSample,
    id: `scan_demo_${Date.now()}`,
    imageUrl: imageDataBase64 || undefined,
    timestamp: new Date().toISOString(),
    isDemo: true
  };
};
