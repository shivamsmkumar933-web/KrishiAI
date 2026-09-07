let currentUtterance = null;

export const speakText = (text, lang) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    return;
  }

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;

  if (lang === 'hi') {
    utterance.lang = 'hi-IN';
  } else {
    utterance.lang = 'en-IN';
  }

  const voices = window.speechSynthesis.getVoices();
  const targetLangPrefix = lang === 'hi' ? 'hi' : 'en';
  const voice = voices.find(v => v.lang.startsWith(targetLangPrefix));
  if (voice) {
    utterance.voice = voice;
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const isSpeaking = () => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
};
