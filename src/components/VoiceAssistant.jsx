import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  X,
  Move,
  Send,
  HelpCircle,
  Compass
} from 'lucide-react';
import { speakText, stopSpeech, isSpeaking } from '../services/ttsService';
import { sendChatMessageToAI } from '../services/aiAssistantService';

export const VoiceAssistant = ({
  currentRole,
  currentTab,
  language = 'hi',
  farmerProfile,
  weather
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(() => {
    try {
      const saved = localStorage.getItem('krishi_voice_pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.x && parsed.y) return parsed;
      }
    } catch (e) {}
    // Default initial bottom-right floating position
    return {
      x: typeof window !== 'undefined' ? Math.max(20, window.innerWidth - 90) : 300,
      y: typeof window !== 'undefined' ? Math.max(20, window.innerHeight - 100) : 500
    };
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, buttonX: 0, buttonY: 0 });
  const hasDraggedRef = useRef(false);

  // Conversational & Speech States
  const [status, setStatus] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking'
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const recognitionRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Monitor speaking status
  useEffect(() => {
    const interval = setInterval(() => {
      const activeSpeaking = isSpeaking();
      if (activeSpeaking && status !== 'speaking') {
        setStatus('speaking');
      } else if (!activeSpeaking && status === 'speaking') {
        setStatus('idle');
      }
    }, 300);
    return () => clearInterval(interval);
  }, [status]);

  // Keep chat scrolled to bottom
  useEffect(() => {
    if (isOpen && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, status]);

  // Handle Dragging
  const handleStartDrag = (clientX, clientY) => {
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      buttonX: position.x,
      buttonY: position.y
    };
  };

  const handleMoveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasDraggedRef.current = true;
    }

    const newX = Math.min(Math.max(10, dragStartRef.current.buttonX + deltaX), window.innerWidth - 80);
    const newY = Math.min(Math.max(10, dragStartRef.current.buttonY + deltaY), window.innerHeight - 80);

    setPosition({ x: newX, y: newY });
  };

  const handleEndDrag = () => {
    if (isDragging) {
      setIsDragging(false);
      try {
        localStorage.setItem('krishi_voice_pos', JSON.stringify(position));
      } catch (e) {}
    }
  };

  useEffect(() => {
    const onMouseMove = (e) => handleMoveDrag(e.clientX, e.clientY);
    const onMouseUp = () => handleEndDrag();
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handleEndDrag();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, position]);

  // Context Descriptions for Current Page & UI State
  const getPageInfo = () => {
    const isHi = language === 'hi';

    if (currentRole === null) {
      return {
        name: isHi ? 'होम लैंडिंग पेज' : 'Home Landing Page',
        intro: isHi
          ? "नमस्ते! कृषि एआई में आपका स्वागत है। यदि आप किसान हैं तो हरे रंग का 'किसान' बटन दबाएं। यदि प्रशासक हैं तो 'प्रशासक' बटन चुनें।"
          : "Namaste! Welcome to KrishiAI. Tap the green 'Farmer' button if you are a farmer, or 'Admin' for administration login.",
        guidance: isHi
          ? "आप किसान हैं तो 'किसान' बटन दबाइए।"
          : "Tap the green Farmer button to enter."
      };
    }

    if (currentRole === 'admin') {
      switch (currentTab) {
        case 'farmers':
          return {
            name: isHi ? 'किसान रजिस्ट्री डाटाबेस' : 'Farmer Registry Database',
            intro: isHi ? "यह किसान रजिस्ट्री पेज है। यहाँ पंजीकृत किसानों की सूची, भूमि का आकार और खसरा नंबर उपलब्ध है।" : "Farmer Registry page. Review registered farmers, land details, and khasra numbers.",
            guidance: isHi ? "किसान सूची देखने के लिए तालिका देखें।" : "Review farmer database list."
          };
        case 'data':
        case 'system':
          return {
            name: isHi ? 'सिस्टम टेलीमेट्री कंट्रोल' : 'System Telemetry Console',
            intro: isHi ? "यह टेलीमेट्री कंसोल है। यहाँ सेंटिनल-2 उपग्रह, ओपन-मीटियो मौसम और जेमिनी एआई की स्थिति दिखती है।" : "System Telemetry view. Shows Sentinel-2 satellite, Open-Meteo, and Gemini AI status.",
            guidance: isHi ? "सिस्टम स्थिति की निगरानी करें।" : "Monitor system API latency and uptime."
          };
        default:
          return {
            name: isHi ? 'प्रशासक डैशबोर्ड' : 'Admin Overview Dashboard',
            intro: isHi ? "यह प्रशासक ओवरव्यू पेज है। कुल पंजीकृत किसान और बीमारी स्कैन के आंकड़े यहाँ उपलब्ध हैं।" : "Admin Overview Dashboard. Tracks total registered farmers and crop scan metrics.",
            guidance: isHi ? "सिस्टम आंकड़े देखें।" : "Review overall platform statistics."
          };
      }
    }

    // Farmer Role
    const farmerName = farmerProfile?.name || 'किसान साथी';
    const location = farmerProfile?.district || 'आपके क्षेत्र';

    switch (currentTab) {
      case 'weather':
        return {
          name: isHi ? 'मौसम पूर्वाअनुमान (Weather)' : 'Weather Forecast',
          intro: isHi
            ? `${location} के लिए 7-दिवसीय मौसम रिपोर्ट। यदि बारिश की संभावना अधिक है तो आज सिंचाई और कीटनाशक छिड़काव रोक दें।`
            : `7-day weather forecast for ${location}. If rain probability is high, delay watering and spray.`,
          guidance: isHi ? "नीचे 7 दिनों का तापमान और बारिश का अनुमान देखें।" : "Check 7-day rainfall and temperature forecast below."
        };
      case 'satellite':
        return {
          name: isHi ? 'उपग्रह फसल स्वास्थ्य (NDVI)' : 'Satellite Crop Canopy',
          intro: isHi
            ? "सेंटिनल-2 उपग्रह द्वारा खेत की हरियाली रिपोर्ट। गहरा हरा रंग स्वस्थ फसल और पीला रंग पानी की कमी दर्शाता है।"
            : "Sentinel-2 satellite NDVI report. Dark green indicates thriving canopy; yellow indicates water or nitrogen deficit.",
          guidance: isHi ? "खेत का उपग्रह मैप देखें।" : "Inspect satellite NDVI map overlay."
        };
      case 'recommendation':
        return {
          name: isHi ? 'फसल सिफारिश (Crop Advisory)' : 'Crop Recommendation Engine',
          intro: isHi
            ? "आपकी मिट्टी (NPK) और मौसम के अनुसार सबसे अधिक मुनाफा देने वाली फसलों की सिफारिश।"
            : "Recommends top crops based on soil NPK levels, water access, and current season.",
          guidance: isHi ? "अपनी मिट्टी का प्रकार चुनें और 'Calculate Crops' बटन दबाएं।" : "Select soil type and tap Calculate Crops."
        };
      case 'disease':
        return {
          name: isHi ? 'पत्ती रोग पहचान (Leaf Disease Check)' : 'Leaf Disease Diagnostics',
          intro: isHi
            ? "खराब पत्ती की फोटो अपलोड करें। हमारा एआई विज़न तुरंत रोग का नाम, दवा और जैविक इलाज बता देगा।"
            : "Upload or capture a leaf photo. AI Vision instantly identifies pathogens and prescribes chemical & organic treatments.",
          guidance: isHi ? "'Upload Leaf Photo' बटन दबाकर पत्ती की फोटो चुनें।" : "Tap 'Upload Leaf Photo' to pick a leaf picture."
        };
      case 'soil':
        return {
          name: isHi ? 'मृदा स्वास्थ्य कार्ड (Soil Report)' : 'Soil Health Card',
          intro: isHi
            ? "आपकी मिट्टी में नाइट्रोजन, फास्फोरस, पोटाश का स्तर। यहाँ प्रति एकड़ यूरिया और DAP की सही मात्रा बताई गई है।"
            : "Soil NPK and pH breakdown with recommended split dosages of Urea and DAP per acre.",
          guidance: isHi ? "खाद की अनुशंसित मात्रा देखें।" : "Review fertilizer dosage per acre."
        };
      case 'schemes':
        return {
          name: isHi ? 'सरकारी योजनाएं (Govt Schemes)' : 'Government Schemes Portal',
          intro: isHi
            ? "PM-किसान (₹6,000 प्रति वर्ष), फसल बीमा (PMFBY), और किसान क्रेडिट कार्ड योजनाएं।"
            : "Access PM-KISAN ₹6,000 cash aid, PMFBY crop insurance, and KCC loan support.",
          guidance: isHi ? "योजना के सामने 'Apply / View' बटन दबाएं।" : "Tap Apply / View next to any scheme."
        };
      case 'profile':
        return {
          name: isHi ? 'आपकी खेत प्रोफ़ाइल' : 'Farm Profile Settings',
          intro: isHi
            ? "यहाँ अपना नाम, राज्य, जिला, भूमि का आकार (एकड़) और मुख्य फसल अपडेट कर सकते हैं।"
            : "Update your name, location, land area, soil type, and primary crop.",
          guidance: isHi ? "जानकारी भरकर 'Save Profile' बटन दबाएं।" : "Fill details and tap Save Profile."
        };
      default:
        return {
          name: isHi ? 'मुख्य कृषि डैशबोर्ड' : 'Main Farm Dashboard',
          intro: isHi
            ? `नमस्ते ${farmerName}! यह आपका मुख्य डैशबोर्ड है। मौसम, फसल सिफारिश, पत्ती रोग जाँच, या सरकारी योजनाओं में से जिसे चुनना चाहें, उसका कार्ड दबाएं।`
            : `Namaste ${farmerName}! This is your primary farm dashboard. Tap any tool card to get started.`,
          guidance: isHi ? "किसी भी सेवा का कार्ड दबाकर विवरण खोलें।" : "Tap any service card to open its feature."
        };
    }
  };

  const currentPageInfo = getPageInfo();

  // Toggle Assistant Panel
  const handleTogglePanel = () => {
    if (hasDraggedRef.current) return;

    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (nextOpen) {
      // Add initial greeting if messages are empty
      if (messages.length === 0) {
        const greetingText = language === 'hi'
          ? "नमस्ते! आपको क्या समस्या आ रही है? मैं आपकी मदद करता हूँ।"
          : "Namaste! How can I help you today? I am your KrishiAI Voice Assistant.";

        const initialMsg = {
          id: 'msg_welcome',
          sender: 'assistant',
          text: greetingText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([initialMsg]);
        speakText(greetingText, language);
        setStatus('speaking');
      }
    } else {
      stopSpeech();
      setStatus('idle');
    }
  };

  // Start Mic Listening
  const handleStartListening = () => {
    stopSpeech();
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert(language === 'hi' ? "आपका ब्राउज़र वॉइस इनपुट का समर्थन नहीं करता है। नीचे टाइप करें।" : "Voice recognition not supported on this browser. Please type below.");
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setStatus('listening');
        setTranscript('');
      };

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(res => res[0].transcript)
          .join('');
        setTranscript(currentTranscript);
      };

      recognition.onerror = (err) => {
        console.error('Speech Recognition Error:', err);
        setStatus('idle');
      };

      recognition.onend = () => {
        setStatus('idle');
        if (transcript.trim()) {
          handleProcessUserQuery(transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setStatus('idle');
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setStatus('idle');
  };

  // Process User Query
  const handleProcessUserQuery = async (queryText) => {
    if (!queryText || !queryText.trim()) return;

    stopSpeech();

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: queryText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setTextInput('');
    setTranscript('');
    setStatus('thinking');

    // Build Page & UI State Context
    const isHi = language === 'hi';
    const contextPrefix = `
[LIVE APP STATE & CONTEXT]:
- Active Role: ${currentRole || 'Landing Guest'}
- Active Page/Tab: ${currentPageInfo.name}
- Page Description: ${currentPageInfo.intro}
- Direct UI Action Guidance: ${currentPageInfo.guidance}
- Farmer Profile: ${farmerProfile ? `${farmerProfile.name}, Location: ${farmerProfile.district} (${farmerProfile.state}), Soil: ${farmerProfile.soilType}, Crop: ${farmerProfile.currentCrop}` : 'None'}
- Weather: ${weather ? `${weather.temperature}°C, ${weather.weatherCondition}` : 'Unknown'}

FARMER INSTRUCTION STYLE (Low-Literacy Friendly):
- Give warm, direct, step-by-step guidance in simple ${isHi ? 'Hindi / Hinglish' : 'English'}.
- Explicitly tell the user what button to tap or what action to take (e.g. "Aap ye button dabaiye").
- Keep explanations concise and practical.
`;

    try {
      const aiRes = await sendChatMessageToAI(`${contextPrefix}\n\nFarmer Query: ${queryText}`, farmerProfile);

      const assistantMsg = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        text: aiRes.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      speakText(aiRes.text, language);
      setStatus('speaking');
    } catch (err) {
      const fallbackText = currentPageInfo.intro;
      const assistantMsg = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      speakText(fallbackText, language);
      setStatus('speaking');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleProcessUserQuery(textInput);
    }
  };

  // Contextual Suggested Action Chips for Low-Literacy Farmers
  const getSuggestedPrompts = () => {
    const isHi = language === 'hi';
    if (currentRole === null) {
      return isHi
        ? ['मैं किसान हूँ, मुझे क्या करना है?', 'प्रशासक लॉगिन कहाँ है?', 'ऐप कैसे काम करता है?']
        : ['I am a farmer, what should I click?', 'Where is Admin login?', 'How does this app work?'];
    }

    switch (currentTab) {
      case 'disease':
        return isHi
          ? ['पत्ती रोग कैसे चेक करें?', 'फोटो कैसे अपलोड करें?', 'फसल पर दाग का इलाज क्या है?']
          : ['How to check leaf disease?', 'How to upload photo?', 'Remedy for leaf spots?'];
      case 'weather':
        return isHi
          ? ['क्या आज बारिश होगी?', 'सिंचाई कब करनी चाहिए?', '7 दिनों का मौसम बताओ']
          : ['Will it rain today?', 'When to irrigate field?', 'Tell 7-day weather forecast'];
      case 'recommendation':
        return isHi
          ? ['मेरे खेत के लिए कौन सी फसल अच्छी है?', 'मिट्टी का प्रकार कैसे चुनें?', 'ज्यादा मुनाफा देने वाली फसल बताओ']
          : ['Which crop is best for my soil?', 'How to select soil type?', 'Most profitable crop for season?'];
      case 'soil':
        return isHi
          ? ['यूरिया और DAP कितनी डालें?', 'मेरी मिट्टी की रिपोर्ट समझाओ', 'गोबर खाद कब डालें?']
          : ['How much Urea and DAP to use?', 'Explain soil report', 'When to apply organic compost?'];
      case 'schemes':
        return isHi
          ? ['PM Kisan के पैसे कब मिलेंगे?', 'फसल बीमा का आवेदन कैसे करें?', 'किसान क्रेडिट कार्ड कैसे लें?']
          : ['PM-KISAN ₹6000 status', 'How to apply PMFBY insurance?', 'Get Kisan Credit Card (KCC)'];
      default:
        return isHi
          ? ['इस पेज पर मुझे क्या दबाना है?', 'मेरी फसल के लिए सलाह बताओ', 'आज खेत में क्या काम करें?']
          : ['What button to click on this page?', 'Give crop advice for my field', 'What to do in field today?'];
    }
  };

  const suggestedPrompts = getSuggestedPrompts();

  return (
    <>
      {/* 1. SINGLE UNIFIED FLOATING DRAGGABLE BUTTON */}
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
          touchAction: 'none',
          userSelect: 'none'
        }}
      >
        <button
          onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onClick={handleTogglePanel}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            backgroundColor: status === 'listening' ? '#ef4444' : status === 'speaking' ? '#f59e0b' : '#16a34a',
            color: '#ffffff',
            border: '3.5px solid #ffffff',
            boxShadow: status === 'listening'
              ? '0 0 25px rgba(239, 68, 68, 0.8)'
              : status === 'speaking'
              ? '0 0 25px rgba(245, 158, 11, 0.8)'
              : '0 10px 25px -5px rgba(22, 163, 74, 0.5)',
            cursor: isDragging ? 'grabbing' : 'pointer',
            transition: isDragging ? 'none' : 'transform 0.2s ease, background-color 0.3s ease',
            position: 'relative'
          }}
          title={language === 'hi' ? "कृषि एआई वॉयस गाइड (खींचकर कहीं भी रखें)" : "KrishiAI Voice Assistant (Drag to reposition)"}
        >
          {status === 'listening' ? (
            <Mic className="animate-pulse" style={{ width: '2rem', height: '2rem' }} />
          ) : status === 'speaking' ? (
            <Volume2 className="animate-pulse" style={{ width: '2rem', height: '2rem' }} />
          ) : (
            <Bot style={{ width: '2.25rem', height: '2.25rem' }} />
          )}

          {/* Small Drag Indicator Handle */}
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '50%',
              padding: '3px',
              border: '1.5px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Move style={{ width: '0.625rem', height: '0.625rem' }} />
          </div>
        </button>
      </div>

      {/* 2. CONVERSATIONAL ASSISTANT PANEL */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 10000,
            width: 'calc(100vw - 3rem)',
            maxWidth: '26rem',
            height: '32rem',
            maxHeight: '80vh',
            backgroundColor: '#ffffff',
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
            border: '2px solid #16a34a',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Panel Header */}
          <div
            style={{
              backgroundColor: '#14532d',
              color: '#ffffff',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{ backgroundColor: '#16a34a', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                  {language === 'hi' ? 'कृषि एआई वॉयस असिस्टेंट' : 'KrishiAI Voice Assistant'}
                </h3>
                <span style={{ fontSize: '0.7rem', color: '#86efac', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.125rem' }}>
                  <Compass style={{ width: '0.75rem', height: '0.75rem' }} />
                  {currentPageInfo.name}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {status === 'speaking' && (
                <button
                  onClick={() => { stopSpeech(); setStatus('idle'); }}
                  style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '9999px', padding: '0.25rem 0.625rem', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <VolumeX style={{ width: '0.75rem', height: '0.75rem' }} />
                  <span>{language === 'hi' ? 'चुप रहें' : 'Mute'}</span>
                </button>
              )}

              <button
                onClick={handleTogglePanel}
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X style={{ width: '1.125rem', height: '1.125rem' }} />
              </button>
            </div>
          </div>

          {/* Current Page Context Ribbon */}
          <div style={{ backgroundColor: '#f0fdf4', padding: '0.625rem 1rem', borderBottom: '1px solid #bbf7d0', fontSize: '0.75rem', color: '#166534', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <HelpCircle style={{ width: '1rem', height: '1rem', flexShrink: 0, marginTop: '0.125rem', color: '#16a34a' }} />
            <div>
              <span style={{ fontWeight: 800 }}>{language === 'hi' ? 'वर्तमान पेज सलाह:' : 'Page Guidance:'}</span>{' '}
              <span>{currentPageInfo.intro}</span>
            </div>
          </div>

          {/* Messages & Audio Waves Container */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: '#f8fafc' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  backgroundColor: msg.sender === 'user' ? '#16a34a' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.sender === 'user' ? '1.125rem 1.125rem 0.125rem 1.125rem' : '1.125rem 1.125rem 1.125rem 0.125rem',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0'
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.375rem', fontSize: '0.65rem', opacity: 0.8 }}>
                  <span>{msg.time}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => { speakText(msg.text, language); setStatus('speaking'); }}
                      style={{ background: 'none', border: 'none', color: '#16a34a', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700 }}
                    >
                      <Volume2 style={{ width: '0.75rem', height: '0.75rem' }} />
                      <span>{language === 'hi' ? 'फिर से सुनें' : 'Replay'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Live Audio Status Visual Feedback */}
            {status === 'listening' && (
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem 1rem', borderRadius: '1rem', color: '#991b1b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mic className="animate-pulse" style={{ width: '1rem', height: '1rem', color: '#ef4444' }} />
                <span style={{ fontWeight: 700 }}>
                  {language === 'hi' ? 'सुन रहा हूँ... बोलिए...' : 'Listening... Speak now...'}
                </span>
                {transcript && <span style={{ fontStyle: 'italic', opacity: 0.8 }}>"{transcript}"</span>}
              </div>
            )}

            {status === 'thinking' && (
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#fffbe3', border: '1px solid #fef08a', padding: '0.75rem 1rem', borderRadius: '1rem', color: '#854d0e', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles className="animate-pulse" style={{ width: '1rem', height: '1rem', color: '#ca8a04' }} />
                <span style={{ fontWeight: 700 }}>
                  {language === 'hi' ? 'उत्तर तैयार हो रहा है...' : 'Analyzing & generating reply...'}
                </span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Quick Action Prompt Chips (Designed for Low-Literacy Farmers) */}
          <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.375rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleProcessUserQuery(prompt)}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#1e293b',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                💬 {prompt}
              </button>
            ))}
          </div>

          {/* Bottom Speech & Text Control Bar */}
          <form onSubmit={handleFormSubmit} style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Big Mic Button */}
            <button
              type="button"
              onClick={status === 'listening' ? handleStopListening : handleStartListening}
              style={{
                backgroundColor: status === 'listening' ? '#dc2626' : '#16a34a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '2.75rem',
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
              title={language === 'hi' ? 'बोलकर सवाल पूछें' : 'Click to speak'}
            >
              {status === 'listening' ? <MicOff style={{ width: '1.25rem', height: '1.25rem' }} /> : <Mic style={{ width: '1.25rem', height: '1.25rem' }} />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={language === 'hi' ? 'यहाँ सवाल टाइप करें या माइक दबाएं...' : 'Type question or tap microphone...'}
              style={{
                flex: 1,
                padding: '0.625rem 0.875rem',
                borderRadius: '9999px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!textInput.trim()}
              style={{
                backgroundColor: textInput.trim() ? '#15803d' : '#94a3b8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: textInput.trim() ? 'pointer' : 'default',
                flexShrink: 0
              }}
            >
              <Send style={{ width: '1rem', height: '1rem' }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
