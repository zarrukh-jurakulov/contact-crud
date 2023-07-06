import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC56BqYBRBRrS4ozlEbXN79ggF7G7witcQ",
  authDomain: "my-contacts-8bff3.firebaseapp.com",
  databaseURL: "https://my-contacts-8bff3-default-rtdb.firebaseio.com",
  projectId: "my-contacts-8bff3",
  storageBucket: "my-contacts-8bff3.appspot.com",
  messagingSenderId: "947285317382",
  appId: "1:947285317382:web:5ec747b418cb669fe4f087",
  measurementId: "G-04RDJNS1FM",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
