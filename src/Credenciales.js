import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB83gCRE6gcOTHtL-XYrxup8VsENM4x5To",
  authDomain: "projectreact-1951b.firebaseapp.com",
  projectId: "projectreact-1951b",
  storageBucket: "projectreact-1951b.appspot.com",
  messagingSenderId: "147865728520",
  appId: "1:147865728520:web:2af68d3124907bc91583bd",
  measurementId: "G-R038WGN2KL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const {fireApp} = getFirestore(app);