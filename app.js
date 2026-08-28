import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaGwwRC_2kEtjFG-rCUD1XpM4uNvDKNNQ",
  authDomain: "regiscode-92151.firebaseapp.com",
  databaseURL: "https://regiscode-92151-default-rtdb.firebaseio.com",
  projectId: "regiscode-92151",
  storageBucket: "regiscode-92151.firebasestorage.app",
  messagingSenderId: "248979565055",
  appId: "1:248979565055:web:8c04d09813bd31ec509fca",
  measurementId: "G-47RJBD59HJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const leadForm = document.getElementById('leadForm');
const successMsg = document.getElementById('successMsg');

leadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const siteType = document.querySelector('input[name="siteType"]:checked').value;
  const industry = document.getElementById('industry').value;
  const audience = document.getElementById('audience').value;
  const clientName = document.getElementById('clientName').value;
  const clientPhone = document.getElementById('clientPhone').value;

  try {
    await addDoc(collection(db, "leads"), {
      siteType,
      industry,
      audience,
      clientName,
      clientPhone,
      createdAt: serverTimestamp()
    });

    leadForm.classList.add('hidden');
    successMsg.classList.remove('hidden');
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Խնդիր առաջացավ հայտն ուղարկելիս:");
  }
});