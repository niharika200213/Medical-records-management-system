import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6XNLfPm6kepDIIifeH4GICjLQUFzMV-w",
  authDomain: "meddocs-75bc3.firebaseapp.com",
  projectId: "meddocs-75bc3",
  storageBucket: "meddocs-75bc3.appspot.com",
  messagingSenderId: "239472625828",
  appId: "1:239472625828:web:d3ff877187b97757d7fe31"
};

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);