import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseClient';

export const saveFarmerProfileToFirestore = async (profile) => {
  try {
    const docRef = doc(db, 'farmer_profiles', profile.id || `farmer_${Date.now()}`);
    await setDoc(docRef, {
      ...profile,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore profile save note (Local store active):', err);
    return false;
  }
};

export const saveDiseaseScanToFirestore = async (scan) => {
  try {
    const colRef = collection(db, 'disease_scans');
    await addDoc(colRef, {
      id: scan.id,
      detectedCrop: scan.detectedCrop,
      cropHindiName: scan.cropHindiName,
      diseaseName: scan.diseaseName,
      diseaseHindiName: scan.diseaseHindiName,
      confidence: scan.confidence,
      severity: scan.severity,
      isDemo: scan.isDemo,
      timestamp: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.warn('Firestore disease scan save note:', err);
    return false;
  }
};

export const getFarmerProfileFromFirestore = async (userId) => {
  try {
    const docRef = doc(db, 'farmer_profiles', userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (err) {
    console.warn('Firestore profile fetch note:', err);
  }
  return null;
};
