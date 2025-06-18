import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtpcwFxUsllDtfJFksKZWKA3iKWjjIyCQ",
  authDomain: "formbase-skalainvee.firebaseapp.com",
  projectId: "formbase-skalainvee",
  storageBucket: "formbase-skalainvee.appspot.com",
  messagingSenderId: "195305733982",
  appId: "1:195305733982:web:ad589279eb0d02687c99cf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function compressImage(file, maxWidth = 800, quality = 0.6) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          const compressedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        }, "image/jpeg", quality);
      };
    };
    reader.readAsDataURL(file);
  });
}


async function uploadToCloudinary(file) {
  const cloudName = "dfb4jegqs"; // ganti dengan cloud name milikmu
  const preset = "Foto_Undangan_oto";           // ganti dengan nama upload preset yang sudah kamu buat

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const response = await fetch(url, {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  return data.secure_url; // URL publik gambar
}

//handler untuk foto foto lainya
let uploadedSingleImages = {
  hero_img: "",
  foto_prewed: "",
  foto_bride: "",
  foto_groom: ""
};

function handleSingleImageUpload(inputId, previewId, storageKey) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) return;

    // Tampilkan preview
    preview.innerHTML = ""; // hapus loading
    const loading = document.createElement("p");
    loading.innerText = "Memproses foto...";
    preview.appendChild(loading);

    // Kompres gambar
    const compressed = await compressImage(file);

    // Simpan file hasil kompres untuk dikirim saat submit
    uploadedSingleImages[storageKey] = compressed;

    // Tampilkan preview dari hasil kompresi
    const previewUrl = URL.createObjectURL(compressed);
    preview.innerHTML = ""; // hapus loading
    const img = document.createElement("img");
    img.src = previewUrl;
    img.classList.add("preview-foto");
    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Hapus";
    deleteBtn.type = "button";
    deleteBtn.classList.add("btn-hapus-foto");
    deleteBtn.addEventListener("click", () => {
      input.value = "";
      preview.innerHTML = "";
      uploadedSingleImages[storageKey] = "";
    });

    preview.appendChild(img);
    preview.appendChild(deleteBtn);
  });
}

handleSingleImageUpload("hero_img", "preview-hero", "hero_img");
handleSingleImageUpload("foto_prewed", "preview-prewed", "foto_prewed");
handleSingleImageUpload("foto_bride", "preview-bride", "foto_bride");
handleSingleImageUpload("foto_groom", "preview-groom", "foto_groom");


let fotoGaleriArray = [];

const inputGaleri = document.getElementById("foto_galeri_input");
const galeriPreview = document.getElementById("preview-galeri");
const galeriCount = document.getElementById("jumlah-foto");

inputGaleri.addEventListener("change", async function () {
  const file = this.files[0];
  if (!file) return;
  if (fotoGaleriArray.length >= 10) {
    alert("Maksimal 10 foto galeri.");
    return;
  }
  
  const compressed = await compressImage(file);
  fotoGaleriArray.push(compressed);
  galeriCount.innerText = `${fotoGaleriArray.length} / 10 foto terunggah`;

  const wrapper = document.createElement("div");
  wrapper.classList.add("preview-wrapper");

  const img = document.createElement("img");
  img.src = URL.createObjectURL(compressed);
  img.classList.add("preview-foto-galeri");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Hapus";
  deleteBtn.type = "button";
  deleteBtn.addEventListener("click", () => {
    galeriPreview.removeChild(wrapper);
    fotoGaleriArray = fotoGaleriArray.filter((item) => item !== compressed);
    galeriCount.innerText = `${fotoGaleriArray.length} / 10 foto terunggah`;
  });

  wrapper.appendChild(img);
  wrapper.appendChild(deleteBtn);
  galeriPreview.appendChild(wrapper);

  this.value = "";
});

document.getElementById("formUndangan").addEventListener("submit", async (e) => {
  e.preventDefault(); //script lanjutan pertanyaan form
  const form = e.target;
  const nama_lengkap_pria = form.nama_lengkap_pria.value.trim();
  const nama_pria = form.nama_pria.value.trim();

  const nama_lengkap_wanita = form.nama_lengkap_wanita.value.trim();
  const nama_wanita = form.nama_wanita.value.trim();

  const nama_ayah_wanita = form.nama_ayah_wanita.value.trim();
  const wanita_anak_ke = form.wanita_anak_ke.value.trim();
  const nama_ibu_wanita = form.nama_ibu_wanita.value.trim();

  const nama_ayah_pria = form.nama_ayah_pria.value.trim();
  const pria_anak_ke = form.pria_anak_ke.value.trim();
  const nama_ibu_pria = form.nama_ibu_pria.value.trim();

  const tanggal_akad = new Date(form.tanggal_akad.value);

  const lokasi_akad = form.lokasi_akad.value;
  const link_lokasi_akad = form.link_lokasi_akad.value.trim();

  const tanggal_resepsi = new Date(form.tanggal_resepsi.value);

  const lokasi_resepsi = form.lokasi_resepsi.value;
  const link_lokasi_resepsi = form.link_lokasi_resepsi.value.trim();

  const no_rek1 = form.no_rek1.value.trim();
  const an_bank1 = form.an_bank1.value.trim();
  const nama_bank1 = form.nama_bank1.value.trim();

  const no_rek2 = form.no_rek2.value.trim();
  const an_bank2 = form.an_bank2.value.trim();
  const nama_bank2 = form.nama_bank2.value.trim();

  const nama_penerima_hadiah = form.nama_penerima_hadiah.value.trim();
  const no_hp_penerima = form.no_hp_penerima.value.trim();
  const alamat_penerima = form.alamat_penerima.value.trim();

  const slug = `${nama_pria.toLowerCase()}-${nama_wanita.toLowerCase()}`.replace(/\s+/g, "-");

  try {    
    let hero_img_url = "";
    
    let foto_prewed_url = "";

    let foto_bride_url = "";

    let foto_groom_url = "";

    if (uploadedSingleImages.hero_img) {
      hero_img_url = await uploadToCloudinary(uploadedSingleImages.hero_img);
    }

    if (uploadedSingleImages.foto_prewed) {
      foto_prewed_url = await uploadToCloudinary(uploadedSingleImages.foto_prewed);
    }

    if (uploadedSingleImages.foto_bride) {
      foto_bride_url = await uploadToCloudinary(uploadedSingleImages.foto_bride);
    }

    if (uploadedSingleImages.foto_groom) {
      foto_groom_url = await uploadToCloudinary(uploadedSingleImages.foto_groom);
    }

    let fotoGaleriUrls = [];

    for (const file of fotoGaleriArray) {
      const url = await uploadToCloudinary(file);
      fotoGaleriUrls.push(url);
    }

    await setDoc(doc(db, "undangan", slug), { //INI HARUS DIUBAH SESUAI PERTANYAAN
      nama_lengkap_pria, nama_pria, 
      nama_lengkap_wanita, nama_wanita, 
      nama_ayah_wanita, wanita_anak_ke, nama_ibu_wanita,
      nama_ayah_pria, pria_anak_ke, nama_ibu_pria,   
      tanggal_akad, lokasi_akad, link_lokasi_akad,
      tanggal_resepsi, lokasi_resepsi, link_lokasi_resepsi,
      no_rek1, an_bank1, nama_bank1,
      no_rek2, an_bank2, nama_bank2,
      nama_penerima_hadiah, no_hp_penerima, alamat_penerima,
      hero_img: hero_img_url,
      foto_prewed: foto_prewed_url,
      foto_bride: foto_bride_url,
      foto_groom: foto_groom_url,
      foto_galeri: fotoGaleriUrls
    });
    alert(`Data berhasil disimpan! Link undangan: /${slug}`);
    form.reset();
    galeriPreview.innerHTML = "";
    fotoGaleriArray = [];
    galeriCount.innerText = "0 / 10 foto terunggah";
  } catch (err) {
    console.error("Gagal menyimpan ke Firestore:", err);
    alert("Terjadi kesalahan saat menyimpan data. Coba lagi.");
  }
});
