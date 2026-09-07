export const INDIAN_DISTRICT_COORDS = {
  'Ludhiana': { lat: 30.9010, lon: 75.8573 },
  'Amritsar': { lat: 31.6340, lon: 74.8723 },
  'Karnal': { lat: 29.6857, lon: 76.9905 },
  'Patna': { lat: 25.5941, lon: 85.1376 },
  'Gaya': { lat: 24.7914, lon: 85.0002 },
  'Varanasi': { lat: 25.3176, lon: 82.9739 },
  'Nashik': { lat: 20.0059, lon: 73.7898 },
  'Pune': { lat: 18.5204, lon: 73.8567 },
  'Indore': { lat: 22.7196, lon: 75.8577 },
  'Jaipur': { lat: 26.9124, lon: 75.7873 },
  'Guntur': { lat: 16.3067, lon: 80.4365 },
  'Shimoga': { lat: 13.9299, lon: 75.5681 },
  'Coimbatore': { lat: 11.0168, lon: 76.9558 },
};

export const fetchWeatherData = async (district = 'Ludhiana', lat, lon) => {
  const coords = (lat && lon) ? { lat, lon } : (INDIAN_DISTRICT_COORDS[district] || INDIAN_DISTRICT_COORDS['Ludhiana']);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather API request failed');

    const data = await response.json();
    const current = data.current;
    const daily = data.daily;

    const weatherCodeMap = {
      0: { text: 'Clear Sky', hindi: 'साफ आसमान', icon: 'Sun' },
      1: { text: 'Mainly Clear', hindi: 'मुख्यतः साफ', icon: 'SunMedium' },
      2: { text: 'Partly Cloudy', hindi: 'आंशिक बादल', icon: 'CloudSun' },
      3: { text: 'Overcast', hindi: 'घने बादल', icon: 'Cloud' },
      45: { text: 'Foggy', hindi: 'कोहरा', icon: 'CloudFog' },
      51: { text: 'Light Drizzle', hindi: 'हल्की बूंदाबांदी', icon: 'CloudDrizzle' },
      61: { text: 'Slight Rain', hindi: 'हल्की बारिश', icon: 'CloudRain' },
      63: { text: 'Moderate Rain', hindi: 'मध्यम बारिश', icon: 'CloudRain' },
      65: { text: 'Heavy Rain', hindi: 'भारी बारिश', icon: 'CloudLightning' },
      80: { text: 'Rain Showers', hindi: 'तेज बौछारें', icon: 'CloudRain' },
      95: { text: 'Thunderstorm', hindi: 'आंधी-तूफान', icon: 'CloudLightning' }
    };

    const curCodeInfo = weatherCodeMap[current.weather_code] || { text: 'Partly Cloudy', hindi: 'आंशिक बादल', icon: 'CloudSun' };
    const rainProb = daily.precipitation_probability_max[0] || 20;

    const forecast = daily.time.slice(0, 7).map((timeStr, idx) => {
      const d = new Date(timeStr);
      const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayNamesHi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
      const code = daily.weather_code[idx] || 0;
      const codeInfo = weatherCodeMap[code] || { text: 'Partly Cloudy', hindi: 'आंशिक बादल', icon: 'CloudSun' };

      return {
        day: dayNamesEn[d.getDay()],
        dayHindi: dayNamesHi[d.getDay()],
        date: `${d.getDate()} ${d.toLocaleString('en', { month: 'short' })}`,
        maxTemp: Math.round(daily.temperature_2m_max[idx]),
        minTemp: Math.round(daily.temperature_2m_min[idx]),
        rainProb: daily.precipitation_probability_max[idx] || 15,
        condition: codeInfo.text,
        conditionHindi: codeInfo.hindi,
        icon: codeInfo.icon
      };
    });

    const advisories = generateActionableAdvisories(rainProb, current.temperature_2m, current.relative_humidity_2m, current.wind_speed_10m);

    return {
      location: district,
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      rainProbability: rainProb,
      windSpeed: Math.round(current.wind_speed_10m),
      weatherCondition: curCodeInfo.text,
      weatherConditionHindi: curCodeInfo.hindi,
      icon: curCodeInfo.icon,
      forecast,
      advisories,
      isDemo: false
    };
  } catch (error) {
    console.warn('Falling back to local high-fidelity weather mock data', error);
    return getMockWeatherData(district);
  }
};

const generateActionableAdvisories = (rainProb, temp, humidity, windSpeed) => {
  const advisories = [];

  if (rainProb > 60) {
    advisories.push({
      id: 'adv_rain',
      title: 'Rain Expected Soon — Avoid Irrigation Today',
      titleHindi: 'जल्द बारिश की संभावना — आज सिंचाई न करें',
      description: 'High precipitation probability detected over the next 24-48 hours. Postpone field irrigation to prevent waterlogging and root rot.',
      descriptionHindi: 'अगले 24-48 घंटों में बारिश की उच्च संभावना है। जलभराव और जड़ों के सड़न से बचने के लिए खेत में सिंचाई टालें।',
      type: 'warning',
      category: 'irrigation'
    });
  } else if (temp > 36 && humidity < 40) {
    advisories.push({
      id: 'adv_heat',
      title: 'High Temperature Advisory — Provide Light Moisture',
      titleHindi: 'उच्च तापमान चेतावनी — हल्की सिंचाई करें',
      description: 'Hot dry weather may cause moisture stress in standing crops. Schedule light evening drip or sprinkler irrigation.',
      descriptionHindi: 'गर्मी के मौसम में फसलों में नमी की कमी हो सकती है। शाम को ड्रिप या स्प्रिंकलर से हल्की सिंचाई करें।',
      type: 'info',
      category: 'irrigation'
    });
  }

  if (windSpeed > 20) {
    advisories.push({
      id: 'adv_wind',
      title: 'High Wind Velocity — Postpone Foliar Spraying',
      titleHindi: 'तेज हवा की गति — कीटनाशक छिड़काव टालें',
      description: 'Wind speeds exceeding 20 km/h will cause severe spray drift and reduced chemical efficacy. Delay liquid fertilizing or pesticide spraying.',
      descriptionHindi: '20 किमी/घंटा से अधिक हवा की गति से दवाएं उड़ सकती हैं। कीटनाशक या खाद का छिड़काव कल तक के लिए टाल दें।',
      type: 'warning',
      category: 'spray'
    });
  }

  if (humidity > 75 && temp >= 22 && temp <= 30) {
    advisories.push({
      id: 'adv_fungal',
      title: 'Fungal Rust Alert — Inspect Leaf Undersides',
      titleHindi: 'फंगल रोग का खतरा — पत्तियों की जांच करें',
      description: 'High humidity combined with mild temperatures creates ideal conditions for fungal pathogens (Yellow Rust / Powdery Mildew). Inspect crop canopy closely.',
      descriptionHindi: 'उच्च आर्द्रता और अनुकूल तापमान के कारण फंगल (फफूंद) रोग फैल सकता है। अपनी फसल की पत्तियों के निचले हिस्से की जांच करें।',
      type: 'warning',
      category: 'general'
    });
  }

  if (advisories.length === 0) {
    advisories.push({
      id: 'adv_optimal',
      title: 'Optimal Weather Window for Fieldwork',
      titleHindi: 'खेत के काम के लिए अनुकूल मौसम',
      description: 'Current weather conditions are favorable for routine weeding, intercultural operations, and fertilizer application.',
      descriptionHindi: 'वर्तमान मौसम निराई-गुड़ाई, खाद डालने और खेत के सामान्य प्रबंधन के लिए पूरी तरह अनुकूल है।',
      type: 'success',
      category: 'harvest'
    });
  }

  return advisories;
};

export const getMockWeatherData = (district) => {
  return {
    location: district,
    temperature: 31,
    humidity: 65,
    rainProbability: 25,
    windSpeed: 14,
    weatherCondition: 'Partly Cloudy',
    weatherConditionHindi: 'आंशिक बादल',
    icon: 'CloudSun',
    forecast: [
      { day: 'Today', dayHindi: 'आज', date: '6 Sep', maxTemp: 32, minTemp: 24, rainProb: 25, condition: 'Partly Cloudy', conditionHindi: 'आंशिक बादल', icon: 'CloudSun' },
      { day: 'Mon', dayHindi: 'सोमवार', date: '7 Sep', maxTemp: 34, minTemp: 25, rainProb: 65, condition: 'Moderate Rain', conditionHindi: 'मध्यम बारिश', icon: 'CloudRain' },
      { day: 'Tue', dayHindi: 'मंगलवार', date: '8 Sep', maxTemp: 30, minTemp: 23, rainProb: 80, condition: 'Thunderstorm', conditionHindi: 'आंधी-तूफान', icon: 'CloudLightning' },
      { day: 'Wed', dayHindi: 'बुधवार', date: '9 Sep', maxTemp: 29, minTemp: 22, rainProb: 40, condition: 'Light Drizzle', conditionHindi: 'हल्की बूंदाबांदी', icon: 'CloudDrizzle' },
      { day: 'Thu', dayHindi: 'गुरुवार', date: '10 Sep', maxTemp: 31, minTemp: 23, rainProb: 15, condition: 'Mainly Clear', conditionHindi: 'मुख्यतः साफ', icon: 'SunMedium' },
      { day: 'Fri', dayHindi: 'शुक्रवार', date: '11 Sep', maxTemp: 33, minTemp: 24, rainProb: 10, condition: 'Clear Sky', conditionHindi: 'साफ आसमान', icon: 'Sun' },
      { day: 'Sat', dayHindi: 'शनिवार', date: '12 Sep', maxTemp: 34, minTemp: 25, rainProb: 10, condition: 'Sunny', conditionHindi: 'धूप', icon: 'Sun' },
    ],
    advisories: [
      {
        id: 'adv_mock_1',
        title: 'Rain expected tomorrow — avoid irrigation today.',
        titleHindi: 'कल बारिश की संभावना — आज खेत में पानी (सिंचाई) न दें।',
        description: 'Atmospheric humidity is rising with rain showers expected Monday and Tuesday. Save water and prevent root rotting.',
        descriptionHindi: 'सोमवार और मंगलवार को बारिश की 65-80% संभावना है। खेत में सिंचाई रोकें।',
        type: 'warning',
        category: 'irrigation'
      },
      {
        id: 'adv_mock_2',
        title: 'Good window for soil aeration & weeding today.',
        titleHindi: 'आज खेत में निराई-गुड़ाई के लिए अच्छा समय है।',
        description: 'Wind speed is moderate at 14 km/h. Suitable for routine field operations before rains start.',
        descriptionHindi: 'हवा की गति 14 किमी/घंटा है। बारिश शुरू होने से पहले निराई-गुड़ाई पूरी करें।',
        type: 'success',
        category: 'general'
      }
    ],
    isDemo: true
  };
};
