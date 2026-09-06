import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, Volume2, Sparkles, X, MessageSquare, MapPin } from 'lucide-react';
import { ChatMessage, Language, FarmerProfile } from '../types';
import { translations } from '../i18n/translations';
import { sendChatMessageToAI } from '../services/aiAssistantService';
import { speakText } from '../services/ttsService';

interface KrishiAssistantChatProps {
  farmerProfile: FarmerProfile;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const KrishiAssistantChat: React.FC<KrishiAssistantChatProps> = ({
  farmerProfile,
  language,
  isOpen,
  onClose
}) => {
  const t = translations[language];

  const [messages, setMessages] = useState<ChatMessage[]>([
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
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
      // Auto-read in Hindi or English if voice enabled
      speakText(aiReply.text, language);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSend(transcript);
        }
      };
      recognition.start();
    } else {
      // Fallback simulated voice input prompt
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
    <div className="fixed inset-0 z-50 flex items-center justify-end sm:p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full sm:max-w-lg h-full sm:h-[600px] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 relative">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-700 to-green-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">{t.chatTitle}</h3>
              <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{farmerProfile.district} • {farmerProfile.soilType} soil</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                msg.sender === 'user' ? 'bg-slate-800 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-slate-800 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <div className="flex items-center justify-between pt-1 opacity-70 text-[10px]">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && msg.audioAvailable && (
                    <button
                      onClick={() => speakText(msg.text, language)}
                      className="p-1 rounded hover:bg-slate-100 text-emerald-700 font-semibold flex items-center gap-1"
                      title="Listen Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-500 shadow-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>{t.sendingQuery}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Pills */}
        <div className="p-2 bg-white border-t border-slate-200 overflow-x-auto scrollbar-none flex gap-1.5">
          {prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 rounded-full shrink-0 font-medium transition"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={handleMicClick}
            className={`p-2.5 rounded-xl transition ${
              listening ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
            title={t.speakBtn}
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.chatPlaceholder}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl shadow-md transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
