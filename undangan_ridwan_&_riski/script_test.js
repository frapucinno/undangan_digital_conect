import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ Konfigurasi Firebase (GANTI dengan punyamu!)
const firebaseConfig = {
  apiKey: "AIzaSyCoWoEPyOBaPmiFIxfS3GsVNTpcdNKp4Q8",
  authDomain: "skala-invee.firebaseapp.com",
  projectId: "skala-invee",
  storageBucket: "skala-invee.firebasestorage.app",
  messagingSenderId: "969423263700",
  appId: "1:969423263700:web:72697c1ed5855a74dc2841"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Jalankan setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const undanganId = params.get("id");

  if (!undanganId) {
    document.body.innerHTML = "<h2>URL tidak memiliki parameter ?id=...</h2>";
    return;
  }

  const docRef = doc(db, "Undangan First Design", undanganId);
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("judul").innerText = `${data.nama_pria} & ${data.nama_wanita}`;
      document.getElementById("tanggal").innerText = `Tanggal: ${data.tanggal}`;
      document.getElementById("lokasi").innerText = `Lokasi: ${data.lokasi}`;
    } else {
      document.body.innerHTML = "<h2>Undangan tidak ditemukan</h2>";
    }
  }).catch((e) => {
    console.error("Gagal ambil data:", e);
    document.body.innerHTML = "<h2>Gagal mengambil data dari Firestore</h2>";
  });
});
