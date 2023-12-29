import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD6RCOxtUrVP8DVyXPB1VTcAfIYaaqkDHc",
  authDomain: "bookverse-86b43.firebaseapp.com",
  projectId: "bookverse-86b43",
  storageBucket: "bookverse-86b43.appspot.com",
  messagingSenderId: "236654634194",
  appId: "1:236654634194:web:064095b648c03cb8f1390b",
  measurementId: "G-6EPBPNK92G"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };