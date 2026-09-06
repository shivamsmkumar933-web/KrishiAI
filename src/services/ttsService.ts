import { Language } from '../types';

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakText = (text: string, lang: Language): void => {
  if (!('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    return;
  }

  // Stop any ongoing speech
  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.0;

  if (lang === 'hi') {
    utterance.lang = 'hi-IN';
  } else {
    utterance.lang = 'en-IN';
  }

  // Try finding a suitable Hindi or English voice
  const voices = window.speechSynthesis.getVoices();
  const targetLangPrefix = lang === 'hi' ? 'hi' : 'en';
  const voice = voices.find(v => v.lang.startsWith(targetLangPrefix));
  if (voice) {
    utterance.voice = voice;
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const isSpeaking = (): boolean => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
};
