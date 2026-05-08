import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaWlA2_bs70cjVrLbLxC9_MkVq9GEds7M",
  authDomain: "lsp-guidex.firebaseapp.com",
  projectId: "lsp-guidex",
  storageBucket: "lsp-guidex.firebasestorage.app",
  messagingSenderId: "771853991199",
  appId: "1:771853991199:web:75a582972cf10fdce4042a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);