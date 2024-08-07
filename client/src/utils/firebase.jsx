// import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// dotenv.config();


// const firebaseConfig = {
//   apiKey: 'AIzaSyAaY2xhPX0-18e60RGxCf6N6yfgtGZlKHY',
//   authDomain: 'fir-training-1b7d6.firebaseapp.com',
//   projectId: 'fir-training-1b7d6',
//   storageBucket: 'fir-training-1b7d6.appspot.com',
//   messagingSenderId: '115418467729',
//   appId: '1:115418467729:web:461d1d484b0ab80e785e30',
// };

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_APIKEY,
//     authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_APP_ID,
//   };

const firebaseConfig = {
  apiKey: "AIzaSyD4EWOcOb-HgsDZ2FuwWDzDvROdPUkedZ8",
  authDomain: "closet-coordinator-v2-af613.firebaseapp.com",
  projectId: "closet-coordinator-v2-af613",
  storageBucket: "closet-coordinator-v2-af613.appspot.com",
  messagingSenderId: "229975178681",
  appId: "1:229975178681:web:1f1b9f7965fa496a490a68"
};

// const firebaseConfig = {
//   apiKey: process.env.APIKEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
