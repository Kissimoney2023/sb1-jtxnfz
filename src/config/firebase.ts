import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "guided-cooking-app.firebaseapp.com",
  projectId: "guided-cooking-app",
  storageBucket: "guided-cooking-app.appspot.com",
  messagingSenderId: "954837551984",
  appId: "1:954837551984:web:8b9b9b9b9b9b9b9b9b9b9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable persistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

export { auth };
export default app;