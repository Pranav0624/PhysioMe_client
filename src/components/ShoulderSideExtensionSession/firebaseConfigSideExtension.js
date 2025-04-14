// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: "your-api-key",
//   authDomain: "your-auth-domain",
//   databaseURL: "your-database-url", // Important for Realtime DB
//   projectId: "your-project-id",
//   storageBucket: "your-storage-bucket",
//   messagingSenderId: "your-sender-id",
//   appId: "your-app-id",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDrAqYWaqE7dQp6CjSBnMKTCVYWtClYtqY",
  authDomain: "physiofyp-7d9cd.firebaseapp.com",
  projectId: "physiofyp-7d9cd",
  storageBucket: "physiofyp-7d9cd.appspot.com",
  messagingSenderId: "728895826479",
  appId: "1:728895826479:web:2ebce4fb42ac81619ef4da",
  measurementId: "G-TZED65MPLF",
  databaseURL: "https://physiofyp-7d9cd-default-rtdb.asia-southeast1.firebasedatabase.app"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };