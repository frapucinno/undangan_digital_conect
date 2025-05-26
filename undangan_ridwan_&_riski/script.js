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
const weddingDate = new Date("{{tanggal_countdown}}").getTime();

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