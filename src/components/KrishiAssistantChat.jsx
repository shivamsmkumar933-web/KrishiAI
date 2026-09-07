import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, Volume2, Sparkles, X, MapPin } from 'lucide-react';
import { translations } from '../i18n/translations';
import { sendChatMessageToAI } from '../services/aiAssistantService';
import { speakText } from '../services/ttsService';

export const KrishiAssistantChat = ({
  farmerProfile,
  language,
  isOpen,
  onClose
}) => {
  const t = translations[language];

  const [messages, setMessages] = useState([
    {
      id: 'welcome_1',
      sender: 'assistant',
      text: language === 'hi'
        ? `नमस्ते ${farmerProfile.name}! मैं आपका कृषि एआई सहायक हूँ। आपके खेत (${farmerProfile.district}, ${farmerProfile.soilType} मिट्टी) के बारे में कोई भी प्रश्न पूछें।`
        : `Namaste ${farmerProfile.name}! I am your KrishiAI Assistant. Ask me anything about your field in ${farmerProfile.district} (${farmerProfile.soilType} soil).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      audioAvailable: true
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const aiReply = await sendChatMessageToAI(query, farmerProfile);
      setMessages(prev => [...prev, aiReply]);
      speakText(aiReply.text, language);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSend(transcript);
        }
      };
      recognition.start();
    } else {
      const sampleQueries = language === 'hi'
        ? ['मेरे खेत के लिए कौन सी फसल अच्छी है?', 'कल बारिश होगी?', 'पत्ती पर पीले दाग का इलाज']
        : ['Which crop is best for my soil?', 'Will it rain tomorrow?', 'How to cure leaf spots?'];
      const chosen = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      handleSend(chosen);
    }
  };

  if (!isOpen) return null;

  const quickPromptsHi = [
    'मेरे खेत के लिए कौनसी फसल अच्छी है?',
    'कल बारिश कब होगी?',
    'फसल के पत्ती पर दाग का इलाज क्या है?',
    'सिंचाई कब करनी चाहिए?'
  ];

  const quickPromptsEn = [
    'Which crop is best for my soil?',
    'When will it rain next?',
    'How to cure spots on leaf?',
    'When should I irrigate?'
  ];

  const prompts = language === 'hi' ? quickPromptsHi : quickPromptsEn;

  return (
    <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '32rem',
        height: '100%',
        maxHeight: '600px',
        borderRadius: '1rem 0 0 1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '1rem',
          background: 'linear-gradient(135deg, #15803d, #16a34a)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
            </div>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: '1rem' }}>{t.chatTitle}</h3>
              <p style={{ fontSize: '0.6875rem', color: '#dcfce7', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin style={{ width: '0.75rem', height: '0.75rem' }} />
                <span>{farmerProfile.district} • {farmerProfile.soilType} soil</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ padding: '0.375rem', borderRadius: '0.5rem', color: '#ffffff', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>

        {/* Message Stream */}
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#f8fafc' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                flexShrink: 0,
                backgroundColor: msg.sender === 'user' ? '#1e293b' : '#16a34a',
                color: '#ffffff'
              }}>
                {msg.sender === 'user' ? <User style={{ width: '1rem', height: '1rem' }} /> : <Bot style={{ width: '1rem', height: '1rem' }} />}
              </div>

              <div style={{
                maxWidth: '80%',
                borderRadius: '1rem',
                padding: '0.875rem',
                fontSize: '0.75rem',
                lineHeight: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                backgroundColor: msg.sender === 'user' ? '#1e293b' : '#ffffff',
                color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0'
              }}>
                <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem', opacity: 0.7, fontSize: '0.625rem' }}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && msg.audioAvailable && (
                    <button
                      onClick={() => speakText(msg.text, language)}
                      style={{ padding: '0.25rem', borderRadius: '0.25rem', color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}
                      title="Listen Audio"
                    >
                      <Volume2 style={{ width: '0.875rem', height: '0.875rem' }} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot className="animate-spin" style={{ width: '1rem', height: '1rem' }} />
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '0.875rem', borderRadius: '1rem', border: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles className="animate-pulse" style={{ width: '1rem', height: '1rem', color: '#16a34a' }} />
                <span>{t.sendingQuery}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div style={{ padding: '0.5rem', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', overflowX: 'auto', display: 'flex', gap: '0.375rem' }}>
          {prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              style={{
                padding: '0.25rem 0.625rem',
                fontSize: '0.6875rem',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleMicClick}
            style={{
              padding: '0.625rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: listening ? '#f43f5e' : '#dcfce7',
              color: listening ? '#ffffff' : '#166534'
            }}
            title={t.speakBtn}
          >
            <Mic style={{ width: '1rem', height: '1rem' }} />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.chatPlaceholder}
            className="form-input"
            style={{ flex: 1 }}
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="btn btn-primary"
            style={{ padding: '0.625rem' }}
          >
            <Send style={{ width: '1rem', height: '1rem' }} />
          </button>
        </div>
      </div>
    </div>
  );
};
