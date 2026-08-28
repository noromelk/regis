import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const leadsTableBody = document.getElementById('leadsTableBody');

const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  leadsTableBody.innerHTML = '';
  snapshot.forEach((doc) => {
    const data = doc.data();
    const phoneClean = data.clientPhone.replace(/[^0-9]/g, '');

    const row = document.createElement('tr');
    row.className = "hover:bg-slate-800/50 transition";
    row.innerHTML = `
      <td class="p-4 font-semibold text-white">${data.clientName}</td>
      <td class="p-4">${data.clientPhone}</td>
      <td class="p-4"><span class="px-2.5 py-1 rounded-md text-xs font-medium bg-brand-500/20 text-brand-300">${data.siteType}</span></td>
      <td class="p-4">${data.industry}</td>
      <td class="p-4">${data.audience}</td>
      <td class="p-4 flex gap-2">
        <a href="https://wa.me/374${phoneClean}?text=Բարև%20ձեզ,%20Regiscode-ից%20ենք%20կապնվում%20Ձեր%20հայտի%20հետ%20կապված:" target="_blank" class="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </a>
        <a href="tel:${data.clientPhone}" class="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
          <i class="fa-solid fa-phone"></i> Զանգել
        </a>
      </td>
    `;
    leadsTableBody.appendChild(row);
  });
});