# 🐍 Learnify — Platform Belajar Python & AI

Platform belajar Python dari nol sampai bikin AI, dengan gaya DataCamp/Dicoding.
Materi → kuis → **live coding Python langsung di browser** → ujian modul → sertifikat.

Semua vanilla **HTML + CSS + JavaScript**. Tanpa build step, tanpa backend, siap di-deploy ke GitHub Pages.

---

## ✨ Fitur

- **71 lesson** dalam 12 modul + proyek akhir, semua berbahasa Indonesia
- **69 tantangan live coding** + **343 soal kuis**, semuanya dinilai otomatis
- **Latihan mandiri** di dalam materi dengan jawaban yang bisa dibuka-tutup
- **NumPy, pandas, dan scikit-learn jalan di browser** — dimuat otomatis saat lesson yang butuh dibuka
- **Python asli di browser** lewat [Pyodide](https://pyodide.org) (CPython → WebAssembly), berjalan di Web Worker dengan timeout 15 detik
- Editor **CodeMirror** dengan syntax highlighting Python
- **11 ujian modul** (teori acak + live coding), lulus ≥ 75%
- **Gamifikasi**: XP, streak harian, badge per modul
- **Sertifikat** per modul dan sertifikat kurikulum (bisa dicetak / simpan PDF)
- **Login Google wajib** — semua progres tersimpan per akun di **Firebase Firestore**
- **Halaman admin** untuk menulis & mengubah materi langsung dari browser, lengkap dengan template
- **Responsive**: nyaman di laptop maupun HP, lengkap dengan bottom tab bar di layar kecil
- Tema **terang & gelap** — putih bersih / slate gelap, keduanya beraksen teal dan sengaja dijaga kontrasnya supaya tidak menyilaukan. Ikut preferensi sistem, bisa dikunci manual lewat tombol 🌙/☀️

## 🧭 Pola UI/UX

Layout-nya mengikuti pola aplikasi belajar mobile-first:

**Beranda progres** (`#/dashboard`)
- Header sapaan "Halo, {nama}" + avatar inisial (klik = buka pengaturan akun)
- Kartu **Progres minggu ini**: tujuh lingkaran hari, tercentang otomatis kalau hari itu ada
  lesson yang diselesaikan, lalu satu tombol utama "Lanjutkan belajar"
- **Carousel "Lanjut belajar"**: kartu modul bisa digeser ke samping, tiap kartu punya ikon bulat,
  tombol panah, jumlah lesson, dan progress bar
- Kartu **Statistik**: tombol periode (Mingguan ⇄ Bulanan), angka besar waktu belajar, badge delta
  naik/turun dibanding minggu lalu, dan bar chart dengan satu batang tersorot
- **Performa kamu**: kartu-kartu pastel berisi ikon bulat, angka besar, label, dan badge delta

Angka statistiknya nyata, dihitung dari `duration` lesson yang selesai dan timestamp penyelesaiannya
— bukan data contoh.

**Halaman lesson** (`#/lesson/m1-l3`)
- **Sidebar daftar materi** di kiri: kartu "Modul aktif" berisi progress, lalu daftar lesson
  bernomor (`2.1`, `2.2`, …) — selesai bercentang teal, yang aktif bergaris teal di kiri,
  yang belum terbuka digembok. Ujian modul ada di bagian bawah.
- Di bawah 1080px sidebar jadi laci yang dibuka lewat tombol **☰ Daftar materi**
- Konten di kanan: tab **Materi → Kuis → Live Coding**

**Halaman modul** (`#/module/m1`)
- Hero bertint pastel dengan ikon modul besar dan pill ringkasan
- Kartu konten yang menimpa hero (ada "grip" seperti bottom sheet) berisi judul, deskripsi, progress
- Daftar lesson bergaya list: judul + durasi, tombol chevron bulat, tint selang-seling,
  hijau kalau sudah selesai, gembok kalau belum terbuka
- Tombol utama menempel di bawah (sticky) — isinya menyesuaikan: lanjutkan lesson,
  kerjakan ujian, atau ulangi

**Navigasi**
- Desktop: menu di topbar
- Mobile (≤760px): bottom tab bar melayang (Beranda · Modul · Progres · Sertifikat)

## 🎨 Mengubah tema

Seluruh warna diatur lewat CSS variable di bagian atas [`css/style.css`](css/style.css):

- `:root, [data-theme="light"]` → palet terang (putih, aksen teal)
- `[data-theme="dark"]` → palet gelap (slate, aksen teal yang sama)

Yang paling sering diubah:

| Variabel | Fungsi |
|---|---|
| `--bg` / `--bg-grad` | latar halaman — light memakai putih polos (`none`), dark memakai gradient |
| `--surface` / `--surface-2` | warna kartu (pakai transparansi + blur) |
| `--brand` / `--brand-soft` | warna tombol & aksen utama (teal) + versi latarnya |
| `--tint-1` … `--tint-7` | tint sangat tipis untuk kartu modul, stat, dan badge |
| `--radius` / `--radius-lg` / `--radius-btn` | tingkat kebulatan sudut |

Tema awal mengikuti pengaturan sistem; begitu tombol tema ditekan, pilihannya disimpan di
`localStorage` dan tidak berubah lagi mengikuti sistem.

Editor dan blok kode sengaja tetap gelap di kedua tema supaya syntax highlighting-nya konsisten
dan enak dibaca.

## 📚 Kurikulum

| Modul | Judul | Lesson |
|---|---|---|
| M0 | Persiapan | 4 |
| M1 | Fondasi | 11 |
| M2 | Struktur Data & Fungsi | 7 |
| M3 | Menengah | 5 |
| M4 | Object-Oriented Programming | 6 |
| M5 | Advance | 7 |
| M6 | NumPy — Fondasi Komputasi AI | 5 |
| M7 | Pandas — Mengolah Data | 5 |
| M8 | Matematika & Statistik untuk AI | 5 |
| M9 | Machine Learning Dasar | 6 |
| M10 | Neural Network dari Nol | 5 |
| M11 | LLM & AI Generatif | 5 |
| — | Proyek Akhir (capstone AI) | 1 |

Alurnya: **Python dasar → struktur data → OOP → fitur advance → NumPy/pandas → matematika →
machine learning → neural network dari nol → LLM & RAG → proyek akhir.**

## 🚀 Menjalankan di komputer

Butuh server lokal (Pyodide dijalankan dari Web Worker, jadi `file://` tidak bisa):

```bash
cd learnify
python3 -m http.server 8000
```

Buka <http://localhost:8000>.

Alternatif: `npx serve`, atau ekstensi **Live Server** di VS Code (klik kanan `index.html` → *Open with Live Server*).

## 🌐 Deploy ke GitHub Pages

```bash
cd learnify
git init
git add .
git commit -m "Learnify: platform belajar Python"
git branch -M main
git remote add origin https://github.com/USERNAME/learnify.git
git push -u origin main
```

Lalu di GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.

Situsnya muncul di `https://USERNAME.github.io/learnify/` dalam satu-dua menit.

> File `.nojekyll` sudah disertakan supaya GitHub Pages tidak memproses ulang isi folder.

## 🔥 Setup Firebase (wajib)

Learnify menyimpan semua progres di Firebase dan mewajibkan login Google. Selama
`js/firebase-config.js` belum diisi, aplikasi menampilkan layar setup — ada tombol
**Pratinjau tanpa login** kalau cuma mau lihat tampilannya dulu.

1. Buat project di <https://console.firebase.google.com> → **Add project**
2. **Project settings → Your apps → Web (`</>`)** → salin `firebaseConfig` ke
   [`js/firebase-config.js`](js/firebase-config.js)
3. **Build → Authentication → Get started → Sign-in method** → aktifkan **Google** → Save
4. **Build → Firestore Database → Create database** (pilih lokasi, mis. `asia-southeast2`)
5. **Firestore → Rules** → tempel ini, ganti emailnya, lalu **Publish**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {

       function isAdmin() {
         return request.auth != null &&
                request.auth.token.email in ['emailkamu@gmail.com'];
       }

       // progres belajar: hanya pemiliknya
       match /users/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }

       // materi: semua yang login boleh baca, admin boleh ubah
       match /content/{docId} {
         allow read:  if request.auth != null;
         allow write: if isAdmin();
       }
     }
   }
   ```

6. Isi `ADMIN_EMAILS` di `js/firebase-config.js` dengan email yang sama
7. **Authentication → Settings → Authorized domains** → tambahkan `USERNAME.github.io`
   (`localhost` sudah otomatis terdaftar)

> `ADMIN_EMAILS` cuma menyembunyikan menunya di browser. Yang benar-benar menjaga data
> adalah Firestore Rules di langkah 5 — jadi dua-duanya harus diisi.

### Apa yang disimpan

| Koleksi | Dokumen | Isinya |
|---|---|---|
| `users` | satu per UID | XP, streak, status tiap lesson, hasil ujian, draft kode, checklist capstone |
| `content` | satu per lesson | materi yang diubah admin (lesson bawaan tetap di repo) |

Nama, email, dan foto profil Google dipakai untuk sertifikat dan avatar. Tidak ada akses
ke email atau file Google kamu.

## ✏️ Halaman Admin

Buka `#/admin` — menunya cuma muncul kalau emailmu terdaftar di `ADMIN_EMAILS`.

- Pilih lesson mana pun dari dropdown (tanda **•** = sudah pernah diubah)
- Edit **judul, durasi, tujuan, runtime**, materi Markdown dengan **pratinjau langsung**
- Edit **kuis** dan **live coding** dalam bentuk JSON, divalidasi saat diketik
- **▶︎ Tes solusi coding** menjalankan kunci jawaban melawan test case-nya di Pyodide —
  pastikan hijau sebelum disimpan
- **＋ Lesson baru** membuat lesson dari template lengkap dan menaruhnya di akhir modul
- **Kembalikan ke bawaan** menghapus override, lesson balik ke versi asli di repo
- **Export semua / Import** untuk backup atau memindahkan materi antar project

Perubahan tersimpan ke Firestore dan **langsung tayang** untuk semua pengguna — tidak perlu
deploy ulang.

Materi bawaan tetap hidup di `js/data/m*.js` + `content/*.md`. Firestore cuma menyimpan
yang diubah, jadi selalu bisa dibalikkan.

### Template

Folder [`templates/`](templates/) berisi contoh siap pakai:

| File | Isinya |
|---|---|
| `lesson-template.json` | satu lesson utuh, bisa langsung di-Import |
| `materi-template.md` | kerangka materi sesuai gaya penulisan Learnify |
| `soal-template.json` | tiga tipe soal kuis |
| `coding-template.json` | tantangan live coding + test case |
| `README.md` | referensi semua field + aturan penulisan |

## 🗂 Struktur

```
learnify/
├── index.html
├── .nojekyll
├── css/style.css
├── js/
│   ├── app.js              # router + semua view (termasuk login & admin)
│   ├── store.js            # auth Google, progres, XP, streak, sinkron Firestore
│   ├── content-store.js    # materi hasil edit admin (koleksi `content`)
│   ├── runner.js           # manajer worker Pyodide (timeout & restart)
│   ├── pyworker.js         # Web Worker: menjalankan kode + test
│   ├── firebase-config.js  # WAJIB diisi
│   └── data/
│       ├── index.js        # gabungan modul + penerap override admin
│       └── m0..m6.js       # metadata, kuis, dan soal coding bawaan
├── content/
│   ├── m0-l1.md ...        # materi bawaan tiap lesson (Markdown)
│   └── capstone.md
└── templates/              # contoh lesson/materi/soal untuk admin
```

## ➕ Menambah lesson baru

**Cara cepat:** buka `#/admin` → **＋ Lesson baru** → isi → **Simpan**. Lesson langsung tayang
tanpa deploy ulang, dan tersimpan di Firestore.

**Cara permanen (masuk repo):** tulis materinya di `content/<id>.md`, lalu tambahkan objek
lesson di `js/data/<modul>.js`:

```js
{
  id: 'm1-l8',
  title: 'Judul Lesson',
  duration: 20,
  objectives: ['...'],
  quiz: [
    { id: 'm1-l8-q1', type: 'mcq', question: '...', options: ['a','b'], answer: 1, explanation: '...' }
    // type lain: 'true_false' (answer: true/false), 'predict_output' (answer: string, code: '...')
  ],
  coding: {
    prompt: 'Markdown boleh dipakai di sini',
    setup: '',                 // opsional: kode yang dijalankan sebelum kode user
    starter_code: 'def f():\n    pass\n',
    tests: [{ name: 'Deskripsi test', code: 'assert f() == 1' }],
    hints: ['...'],
    solution: '...'
  }
}
```

Di dalam kode test tersedia variabel bantu hasil eksekusi kode user:
`STDOUT` (string mentah), `OUTPUT` (sudah di-`strip`), dan `LINES` (list per baris).
`await` juga boleh dipakai di kode test untuk lesson async.

## ⚠️ Catatan runtime

Lesson bertanda `runtime: 'pyodide-limited'` (asyncio, panggilan API LLM) punya keterbatasan
di browser — yang diuji logikanya saja. Versi lengkapnya dikerjakan di komputer sendiri.

Lesson yang butuh library ilmiah mencantumkannya di `coding.packages`, misalnya
`["numpy"]`, `["pandas"]`, atau `["scikit-learn", "numpy"]`. Pyodide mengunduhnya otomatis saat
pertama dipakai (beberapa detik), lalu menyimpannya untuk sisa sesi. Batas waktu eksekusi
diperpanjang otomatis selama proses pengunduhan berlangsung.

PyTorch dan TensorFlow tidak tersedia di Pyodide — karena itu Modul 10 sengaja membangun
neural network memakai NumPy saja, yang justru cara terbaik memahami isinya.
