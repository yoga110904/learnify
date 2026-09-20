/* ============================================================
   KONFIGURASI FIREBASE  (WAJIB diisi)
   ------------------------------------------------------------
   Learnify menyimpan SEMUA data di Firebase dan mewajibkan
   login dengan Google. Tanpa config ini, aplikasi hanya bisa
   dibuka dalam mode lokal terbatas untuk pratinjau tampilan.

   Langkah setup (sekali saja, gratis):

   1. Buka https://console.firebase.google.com  →  Add project.

   2. Project settings → Your apps → Web (</>) → daftarkan app,
      lalu salin isi firebaseConfig ke bawah ini.

   3. Build → Authentication → Get started →
      Sign-in method → aktifkan  Google  → Save.

   4. Build → Firestore Database → Create database →
      pilih lokasi (mis. asia-southeast2) → Production mode.

   5. Firestore → Rules → tempel aturan di bawah, ganti
      email admin sesuai punyamu, lalu Publish:

      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {

          function isAdmin() {
            return request.auth != null &&
                   request.auth.token.email in ['emailkamu@gmail.com'];
          }

          // progres belajar: hanya pemiliknya
          match /users/{uid} {
            allow read, write: if request.auth != null
                               && request.auth.uid == uid;
          }

          // materi: semua yang login boleh baca, admin boleh ubah
          match /content/{docId} {
            allow read:  if request.auth != null;
            allow write: if isAdmin();
          }
        }
      }

   6. Authentication → Settings → Authorized domains →
      tambahkan  <username>.github.io
      (localhost sudah otomatis terdaftar)
   ============================================================ */
export const firebaseConfig = {
  apiKey: "AIzaSyD3SVRz7GIVZejQR0coRZ-EBmm96wrXoiI",
  authDomain: "learnify-8bde5.firebaseapp.com",
  projectId: "learnify-8bde5",
  storageBucket: "learnify-8bde5.firebasestorage.app",
  messagingSenderId: "157935806",
  appId: "1:157935806:web:f91f82dd28fbbf02ead6ef",
  measurementId: "G-936MJSC48C"
};

/**
 * Email yang boleh membuka halaman Admin (#/admin).
 * Harus sama persis dengan daftar di Firestore Rules langkah 5 —
 * daftar di sini hanya menyembunyikan menunya, Rules yang benar-benar menjaga data.
 */
export const ADMIN_EMAILS = [
  "yoga110011@gmail.com"
];

/** true kalau config sudah diisi. */
export const FIREBASE_READY = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
