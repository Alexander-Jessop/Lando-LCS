import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvwPQ8rk7f2_EYYAKmmQpJVEYa1Jo8gBc",
  authDomain: "lando-lcs.firebaseapp.com",
  projectId: "lando-lcs",
  storageBucket: "lando-lcs.appspot.com",
  messagingSenderId: "929323048951",
  appId: "1:929323048951:web:684321334e5dc7f9b398f2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const FBCtx = createContext();

const FBProvider = ({ children }) => {
  const fBContent = { app, db };

  return <FBCtx.Provider value={fBContent}>{children}</FBCtx.Provider>;
};

export default FBProvider;
