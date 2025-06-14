//KONFIGURASI HARMONI KE FIRESTORE

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
      document.getElementById("nama-mempelai-intro").innerText = `${data.nama_wanita} & ${data.nama_pria}`;
      document.getElementById("nama-mempelai-judul").innerText = `${data.nama_wanita} & ${data.nama_pria}`;
      document.getElementById("tanggal").innerText = data.tanggal;
      document.getElementById("lokasi").innerText = `📍${data.lokasi}`;
    } else {
      document.body.innerHTML = "<h2>Undangan tidak ditemukan</h2>";
    }
  }).catch((e) => {
    console.error("Gagal ambil data:", e);
    document.body.innerHTML = "<h2>Gagal mengambil data dari Firestore</h2>";
  });
});


// INTRO
document.getElementById('openInvitation').addEventListener('click', function() {
  document.getElementById('cover').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
});

// Animasi: buat teks muncul perlahan dari bawah
gsap.registerPlugin(ScrollTrigger);
  
gsap.from(".keterangan1", {
  y: 50,           // geser dari bawah 50px
  opacity: 0,      // mulai dari transparan
  duration: 1.2    // selama 1.2 detik
});

gsap.from(".judul", {
  y: 50,           // geser dari bawah 50px
  opacity: 0,      // mulai dari transparan
  duration: 1.2,    // selama 1.2 detik
  delay:0.5
});
  
gsap.from(".deskripsi", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  delay: 1       // muncul setengah detik setelah judul
});
  
gsap.from(".acara", {
  scrollTrigger: ".detail-acara", // elemen yang memicu
  y: 50,
  opacity: 0,
  duration: 2.5,
});
  
gsap.from(".scroll-hint", {
  y: 50,           // geser dari bawah 50px
  opacity: 0,      // mulai dari transparan
  duration: 1.2,    // selama 1.2 detik
  delay:2
})
  
gsap.to(".scroll-hint", {
  scrollTrigger: {
    trigger: ".detail-acara", // ketika bagian acara muncul
    start: "top 80%",
    once: true
    
  },
  opacity: 0,
  duration: 0.5,
  pointerEvents: "none"
});

gsap.from(".fade-left", {
  scrollTrigger: ".fade-left",
  x: -100,
  opacity: 0,
  duration: 2,
  ease: "power2.out"
});
  
gsap.from(".fade-right", {
  scrollTrigger: ".fade-right",
  x: 100,
  opacity: 0,
  duration: 2,
  ease: "power2.out"
});

  // Ubah tanggal ini ke tanggal pernikahanmu (format: YYYY-MM-DDTHH:MM:SS)
const weddingDate = new Date("2025-11-25T09:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "Selamat Menempuh Hidup Baru!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
};

setInterval(updateCountdown, 1000);
updateCountdown();

  
const sliderContainer = document.querySelector(".slider-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

prevBtn.addEventListener("click", () => {
  sliderContainer.scrollBy({ left: -320, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
  sliderContainer.scrollBy({ left: 320, behavior: "smooth" });
});

let countHadir = 0;
let countTidak = 0;

document.getElementById("rsvpForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const ucapan = document.getElementById("ucapan").value.trim();
    const status = document.getElementById("statusHadir").value;

    if (!nama || !ucapan || !status) return;

    const commentsDiv = document.getElementById("comments");

    const newComment = document.createElement("div");
    newComment.classList.add("comment-item");
    newComment.innerHTML = `<strong>${nama}</strong>: ${ucapan}`;

    commentsDiv.prepend(newComment); // Tambahkan ke atas

    // Update counter
    if (status === "Hadir") {
        countHadir++;
        document.getElementById("count-hadir").textContent = countHadir;
    } else {
        countTidak++;
        document.getElementById("count-tidak").textContent = countTidak;
    }

    // Reset form
    document.getElementById("rsvpForm").reset();
});