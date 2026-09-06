import { GovernmentScheme } from '../types';

export const INDIAN_GOVT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'pm_kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    hindiName: 'पीएम-किसान सम्मान निधि योजना',
    category: 'subsidy',
    categoryLabel: 'Income Support / Direct Cash',
    categoryLabelHindi: 'आय सहायता / नकद राशि',
    purpose: 'Provides direct financial assistance of ₹6,000 per year to all landholding farmer families across India.',
    purposeHindi: 'सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की सीधी वित्तीय सहायता प्रदान करना।',
    eligibility: [
      'Small and marginal farmer families with cultivable landholding in state land records.',
      'Aadhaar-seeded bank account with e-KYC verification completed.',
      'Excludes high-income individuals, institutional landholders, and income tax payers.'
    ],
    eligibilityHindi: [
      'राज्य भूमि अभिलेखों में कृषि योग्य भूमि वाले सभी किसान परिवार।',
      'आधार से जुड़ा बैंक खाता और ई-केवाईसी पूर्ण होना अनिवार्य।',
      'आयकर दाताओं एवं संवैधानिक पद धारकों को छोड़कर।'
    ],
    benefits: [
      '₹6,000 per year transferred directly to bank account in 3 equal installments of ₹2,000 every 4 months.',
      '100% central government funded with zero middleman intervention.'
    ],
    benefitsHindi: [
      '₹6,000 प्रति वर्ष 3 समान किश्तों (₹2,000) में सीधे बैंक खाते में ट्रांसफ़र।',
      '100% केंद्र सरकार द्वारा वित्तपोषित पारदर्शी प्रक्रिया।'
    ],
    officialLink: 'https://pmkisan.gov.in',
    applicationSteps: [
      'Visit nearest CSC (Common Service Centre) or open pmkisan.gov.in',
      'Click "New Farmer Registration" and input Aadhaar Number & Mobile Number',
      'Upload State Revenue Land Khata / Khasra details and bank passbook scan'
    ],
    applicationStepsHindi: [
      'निकटतम सीएससी (CSC) केंद्र पर जाएं या pmkisan.gov.in खोलें',
      ' "New Farmer Registration" पर क्लिक करें और आधार व मोबाइल नंबर दर्ज करें',
      'भूमि खसरा/खतौनी और बैंक पासबुक का विवरण जमा करें'
    ]
  },
  {
    id: 'pmfby',
    name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    hindiName: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    category: 'insurance',
    categoryLabel: 'Crop Risk Insurance',
    categoryLabelHindi: 'फसल जोखिम बीमा',
    purpose: 'Comprehensive insurance coverage against crop loss due to non-preventable natural risks (drought, flood, pest outbreak, hail).',
    purposeHindi: 'प्राकृतिक आपदाओं (सूखा, बाढ़, ओलावृष्टि, कीट आक्रमण) से फसल नुकसान पर पूर्ण वित्तीय सुरक्षा देना।',
    eligibility: [
      'All farmers growing notified crops in notified areas including sharecroppers & tenant farmers.',
      'Enrolment before cutoff date for Kharif (July 31) and Rabi (December 31).'
    ],
    eligibilityHindi: [
      'अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान व पट्टेदार किसान।',
      'खरीफ (31 जुलाई) और रबी (31 दिसंबर) की कट-ऑफ तिथि से पहले नामांकन।'
    ],
    benefits: [
      'Very low premium rate: 2% for Kharif crops, 1.5% for Rabi crops, and 5% for Annual Commercial/Horticultural crops.',
      'Claim compensation settled directly into bank accounts using satellite and crop-cutting data.'
    ],
    benefitsHindi: [
      'अत्यंत कम प्रीमियम: खरीफ के लिए 2%, रबी के लिए 1.5%, और बागवानी के लिए 5%।',
      'उपग्रह और फसल कटाई प्रयोग (CCE) के आधार पर सीधे खाते में दावा भुगतान।'
    ],
    officialLink: 'https://pmfby.gov.in',
    applicationSteps: [
      'Log on to pmfby.gov.in or apply via lending bank branch',
      'Submit Sowing Certificate, Land Ownership document, and Aadhaar card',
      'Pay low premium online or get auto-deducted from KCC account'
    ],
    applicationStepsHindi: [
      'pmfby.gov.in पर जाएं या अपनी बैंक शाखा से संपर्क करें',
      'बुवाई प्रमाण पत्र, भूमि दस्तावेज और आधार कार्ड जमा करें',
      'ऑनलाइन कम प्रीमियम का भुगतान करें या केसीसी खाते से कटवाएं'
    ]
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC) Scheme',
    hindiName: 'किसान क्रेडिट कार्ड (KCC) योजना',
    category: 'credit',
    categoryLabel: 'Agricultural Credit & Loan',
    categoryLabelHindi: 'कृषि ऋण एवं क्रेडिट',
    purpose: 'Ensures flexible, hassle-free credit to farmers for crop cultivation, post-harvest expenses, and allied activities.',
    purposeHindi: 'फसल खेती, कटाई उपरांत खर्चों व पशुपालन हेतु आसान और सस्ती दरों पर कृषि ऋण उपलब्ध कराना।',
    eligibility: [
      'All individual/joint landholding farmers, tenant farmers, oral lessees, and Self Help Groups (SHGs).',
      'Pashu Kisan Credit Card also extended to dairy and fishery farmers.'
    ],
    eligibilityHindi: [
      'सभी भूमिधारक किसान, पट्टेदार किसान, बटाईदार और स्वयं सहायता समूह (SHG)।',
      'डेयरी और मत्स्य पालन किसानों के लिए भी पशु किसान क्रेडिट कार्ड उपलब्ध।'
    ],
    benefits: [
      'Concessional interest rate of 4% per annum (with 3% prompt repayment subvention on 7% base rate).',
      'Collateral-free agricultural loan limit up to ₹1.60 Lakh (up to ₹3 Lakh with land hypothecation).'
    ],
    benefitsHindi: [
      'समय पर भुगतान करने पर मात्र 4% की वार्षिक रियायती ब्याज दर।',
      '₹1.60 लाख तक का बिना किसी गारंटी (Collateral-free) का ऋण।'
    ],
    officialLink: 'https://myscheme.gov.in/schemes/kcc',
    applicationSteps: [
      'Download KCC Application Form from bank or PM-KISAN portal',
      'Attach Land Revenue Document (7/12 or Khasra), identity proof & photo',
      'Submit at nearest Commercial Bank, RRB, or Cooperative Bank branch'
    ],
    applicationStepsHindi: [
      'बैंक या पीएम-किसान पोर्टल से केसीसी आवेदन पत्र डाउनलोड करें',
      'भूमि राजस्व दस्तावेज (खसरा/खतौनी), पहचान पत्र और फोटो संलग्न करें',
      'निकटतम वाणिज्यिक, क्षेत्रीय ग्रामीण या सहकारी बैंक शाखा में जमा करें'
    ]
  },
  {
    id: 'soil_card',
    name: 'Soil Health Card (SHC) Scheme',
    hindiName: 'मृदा स्वास्थ्य कार्ड (Soil Health Card) योजना',
    category: 'soil',
    categoryLabel: 'Soil Testing & Advisory',
    categoryLabelHindi: 'मिट्टी परीक्षण एवं सलाह',
    purpose: 'Helps farmers understand soil nutrient status (12 parameters) and provides customized crop-wise fertilizer dosage recommendations.',
    purposeHindi: 'किसानों को उनकी मिट्टी में 12 मुख्य पोषक तत्वों की स्थिति बताने और सटीक खाद की सिफारिश देने के लिए।',
    eligibility: [
      'Free for all farmers across all agricultural districts in India.',
      'Soil samples collected by Agriculture Department officials every 2-3 years.'
    ],
    eligibilityHindi: [
      'भारत के सभी कृषि जिलों के सभी किसानों के लिए पूर्णतः निःशुल्क।',
      'कृषि विभाग के अधिकारियों द्वारा हर 2-3 साल में मिट्टी के नमूने एकत्र किए जाते हैं।'
    ],
    benefits: [
      'Detailed report card covering N, P, K, S, Zinc, Iron, Copper, Manganese, Boron, pH, EC, and Organic Carbon.',
      'Prevents excessive urea usage, reducing input cost by 15-20% while increasing crop yield.'
    ],
    benefitsHindi: [
      'एनपीके, जिंक, सल्फर, बोरॉन, pH और जैविक कार्बन सहित 12 मापदंडों की विस्तृत रिपोर्ट।',
      'यूरिया के अनावश्यक प्रयोग को रोककर लागत 15-20% घटाता है और उपज बढ़ाता है।'
    ],
    officialLink: 'https://soilhealth.dac.gov.in',
    applicationSteps: [
      'Contact Local Agriculture Extension Officer (Gram Sewak / AO)',
      'Provide grid soil sample from farm plot',
      'Download digitized card from soilhealth.dac.gov.in using Khasra Number'
    ],
    applicationStepsHindi: [
      'स्थानीय कृषि विस्तार अधिकारी (ग्राम सेवक / कृषि अधिकारी) से संपर्क करें',
      'खेत का मिट्टी का नमूना परीक्षण हेतु दें',
      'खसरा नंबर द्वारा soilhealth.dac.gov.in से डिजिटल कार्ड डाउनलोड करें'
    ]
  },
  {
    id: 'pmksy',
    name: 'PMKSY - Per Drop More Crop (Micro Irrigation Subsidy)',
    hindiName: 'पीएम कृषि सिंचाई योजना - प्रति बूंद अधिक फसल',
    category: 'equipment',
    categoryLabel: 'Irrigation & Drip Subsidy',
    categoryLabelHindi: 'ड्रिप व स्प्रिंकलर सब्सिडी',
    purpose: 'Promotes micro-irrigation technologies (drip and sprinkler systems) to maximize water use efficiency.',
    purposeHindi: 'जल उपयोग दक्षता बढ़ाने के लिए ड्रिप और स्प्रिंकलर सूक्ष्म सिंचाई तकनीकों को बढ़ावा देना।',
    eligibility: [
      'All farmers owning agricultural land with access to a functional water source (borewell/pond).',
      'Priority given to Small & Marginal Farmers, SC/ST, and Women Farmers.'
    ],
    eligibilityHindi: [
      'कार्यात्मक जल स्रोत (नलकूप/तालाब) वाले सभी भूमिधारक किसान।',
      'छोटे व सीमांत किसानों, अनुसूचित जाति/जनजाति और महिला किसानों को प्राथमिकता।'
    ],
    benefits: [
      'Up to 55% financial subsidy for Small/Marginal farmers and 45% for Other category farmers.',
      'Saves up to 40-50% irrigation water and reduces weed growth significantly.'
    ],
    benefitsHindi: [
      'छोटे व सीमांत किसानों को 55% तक तथा अन्य किसानों को 45% तक की भारी सब्सिडी।',
      '40-50% तक पानी की बचत और खरपतवार वृद्धि में भारी कमी।'
    ],
    officialLink: 'https://pmksy.gov.in',
    applicationSteps: [
      'Apply through State Horticulture / Agriculture Department Portal',
      'Submit land document, water test report, and micro-irrigation estimate',
      'Authorized vendor installs drip system post field survey & inspection'
    ],
    applicationStepsHindi: [
      'राज्य उद्यानिकी / कृषि विभाग पोर्टल के माध्यम से आवेदन करें',
      'भूमि दस्तावेज, जल परीक्षण रिपोर्ट और ड्रिप एस्टीमेट जमा करें',
      'क्षेत्र सर्वेक्षण के बाद अधिकृत विक्रेता ड्रिप सिस्टम स्थापित करता है'
    ]
  },
  {
    id: 'enam',
    name: 'e-NAM (National Agriculture Market)',
    hindiName: 'राष्ट्रीय कृषि बाजार (e-NAM) पोर्टल',
    category: 'subsidy',
    categoryLabel: 'Market & Trading Platform',
    categoryLabelHindi: 'मंडी व व्यापार पोर्टल',
    purpose: 'Pan-India electronic trading portal networking existing APMC mandis to create a unified national market for agricultural commodities.',
    purposeHindi: 'किसानों को उनकी उपज का सर्वोत्तम मूल्य दिलाने हेतु देश की मंडियों को जोड़ने वाला ई-व्यापार मंच।',
    eligibility: [
      'All individual farmers, FPOs (Farmer Producer Organizations), and traders registered with e-NAM mandis.'
    ],
    eligibilityHindi: [
      'e-NAM मंडियों में पंजीकृत सभी किसान, एफपीओ (FPO) और व्यापारी।'
    ],
    benefits: [
      'Transparent online bidding, accurate assaying/quality testing, and direct online payment into farmer bank account.',
      'Freedom to sell produce to buyers anywhere in India at competitive prices.'
    ],
    benefitsHindi: [
      'पारदर्शी ऑनलाइन बोली (Bidding), गुणवत्ता जांच और बैंक खाते में सीधा त्वरित भुगतान।',
      'देशभर के व्यापारियों को ऊंचे दामों पर फसल बेचने की आजादी।'
    ],
    officialLink: 'https://enam.gov.in',
    applicationSteps: [
      'Register on enam.gov.in or e-NAM Mobile App with Aadhaar & Bank Details',
      'Bring harvested crop produce to nearest e-NAM enabled APMC Mandi gate',
      'Get electronic gate pass and quality assaying test before online bidding'
    ],
    applicationStepsHindi: [
      'enam.gov.in या e-NAM ऐप पर आधार व बैंक विवरण के साथ पंजीकरण करें',
      'अपनी फसल को निकटतम e-NAM सक्षम एपीएमसी मंडी में लाएं',
      'ऑनलाइन बोली से पहले गेट पास और गुणवत्ता जांच रिपोर्ट प्राप्त करें'
    ]
  }
];
