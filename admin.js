import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Config: regis-8646e
const firebaseConfig = {
  apiKey: "AIzaSyDKiCznhQlcpsnUaEuVLD2MZDoZMu8A8Tk",
  authDomain: "regis-8646e.firebaseapp.com",
  projectId: "regis-8646e",
  storageBucket: "regis-8646e.firebasestorage.app",
  messagingSenderId: "303636628077",
  appId: "1:303636628077:web:3bc762df5a32daba487564",
  measurementId: "G-G1TMREE5JM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const leadsTableBody = document.getElementById('leadsTableBody');

const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  if (!leadsTableBody) return;
  leadsTableBody.innerHTML = '';
  snapshot.forEach((doc) => {
    const data = doc.data();
    const rawPhone = data.clientPhone || '';
    const phoneClean = rawPhone.replace(/[^0-9]/g, '');

    const row = document.createElement('tr');
    row.className = "hover:bg-slate-800/50 transition border-b border-slate-800/50";
    row.innerHTML = `
      <td class="p-4 font-semibold text-white">${data.clientName || 'Անուն չկա'}</td>
      <td class="p-4">${data.clientPhone || '—'}</td>
      <td class="p-4"><span class="px-2.5 py-1 rounded-md text-xs font-medium bg-brand-500/20 text-brand-300">${data.siteType || '—'}</span></td>
      <td class="p-4">${data.industry || '—'}</td>
      <td class="p-4">${data.audience || '—'}</td>
      <td class="p-4 flex gap-2">
        <a href="https://wa.me/374${phoneClean}?text=Բարև%20ձեզ,%20Regiscode-ից%20ենք%20կապնվում%20Ձեր%20հայտի%20հետ%20կապված:" target="_blank" class="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </a>
        <a href="tel:${data.clientPhone}" class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
          <i class="fa-solid fa-phone"></i> Զանգել
        </a>
      </td>
    `;
    leadsTableBody.appendChild(row);
  });
});
