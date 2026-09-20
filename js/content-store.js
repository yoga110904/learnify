/* Learnify — penyimpanan materi yang diedit admin.
   Dokumen disimpan di Firestore koleksi `content`, satu dokumen per lesson,
   lalu di-cache ke localStorage supaya materi tetap muncul saat offline. */
import { state, getFirebase } from './store.js';
import { applyOverrides, baseLesson } from './data/index.js';

const CACHE_KEY = 'learnify:content:v1';

/** id lesson -> dokumen override */
export const overrides = new Map();
let loaded = false;

const listeners = new Set();
export function onContentChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function emit() { listeners.forEach((f) => { try { f(); } catch (_) {} }); }

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) { return []; }
}
function writeCache() {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify([...overrides.values()])); } catch (_) {}
}

function apply() {
  applyOverrides([...overrides.values()]);
  emit();
}

/** Muat semua override. Dipanggil sekali setelah login. */
export async function loadOverrides({ force = false } = {}) {
  if (loaded && !force) return;
  // tampilkan cache dulu supaya cepat
  readCache().forEach((d) => overrides.set(d.id, d));
  apply();

  const fb = getFirebase();
  if (!fb || !state.user) { loaded = true; return; }   // pratinjau lokal: cukup pakai cache
  try {
    const snap = await fb.getDocs(fb.collection(fb.db, 'content'));
    overrides.clear();
    snap.forEach((doc) => overrides.set(doc.id, Object.assign({ id: doc.id }, doc.data())));
    writeCache();
    apply();
  } catch (e) {
    console.warn('[learnify] gagal memuat materi dari Firestore:', e);
  }
  loaded = true;
}

/** Simpan/timpa satu lesson. */
export async function saveOverride(doc) {
  const fb = getFirebase();
  const payload = JSON.parse(JSON.stringify(Object.assign({}, doc, {
    updatedAt: Date.now(),
    updatedBy: (state.user && (state.user.email || state.user.uid)) || 'pratinjau-lokal'
  })));
  if (fb && state.user) {
    await fb.setDoc(fb.doc(fb.db, 'content', doc.id), payload);
  } else if (!state.localMode) {
    throw new Error('Harus login untuk menyimpan materi.');
  }
  overrides.set(doc.id, payload);
  writeCache();
  apply();
  return payload;
}

/** Hapus override → lesson kembali ke versi bawaan (atau hilang kalau lesson custom). */
export async function deleteOverride(id) {
  const fb = getFirebase();
  if (fb && state.user) {
    await fb.deleteDoc(fb.doc(fb.db, 'content', id));
  } else if (!state.localMode) {
    throw new Error('Harus login untuk mengubah materi.');
  }
  overrides.delete(id);
  writeCache();
  apply();
}

export function getOverride(id) { return overrides.get(id) || null; }
export function isOverridden(id) { return overrides.has(id); }
export function isCustom(id) { return overrides.has(id) && !baseLesson(id); }
export function allOverrides() { return [...overrides.values()]; }

/** Template dokumen lesson baru — dipakai tombol "Lesson baru" di halaman admin. */
export function lessonTemplate(moduleId, urutan) {
  return {
    id: `${moduleId}-l${urutan}`,
    module_id: moduleId,
    order: urutan,
    title: 'Judul Lesson Baru',
    duration: 20,
    objectives: [
      'Tujuan pertama yang bisa diukur',
      'Tujuan kedua',
      'Tujuan ketiga'
    ],
    runtime: 'pyodide',
    content_md: `## Mulai dari masalah sehari-hari

Tulis analogi atau masalah nyata di sini sebelum masuk ke sintaks.

## Konsep pertama

Penjelasan singkat, lalu contoh kode:

\`\`\`python
nama = "Salsa"
print(f"Halo {nama}")
\`\`\`

Output:

\`\`\`
Halo Salsa
\`\`\`

## Ringkasan

- Poin penting pertama
- Poin penting kedua
- Poin penting ketiga

## Kesalahan umum

- Kesalahan yang sering dilakukan pemula
- Kesalahan lain beserta cara menghindarinya
`,
    quiz: [
      {
        id: `${moduleId}-l${urutan}-q1`,
        type: 'mcq',
        question: 'Pertanyaan pilihan ganda?',
        options: ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'],
        answer: 1,
        explanation: 'Alasan kenapa jawaban itu benar.'
      },
      {
        id: `${moduleId}-l${urutan}-q2`,
        type: 'true_false',
        question: 'Pernyataan yang benar atau salah.',
        answer: true,
        explanation: 'Penjelasan singkat.'
      },
      {
        id: `${moduleId}-l${urutan}-q3`,
        type: 'predict_output',
        question: 'Apa output kode berikut?',
        code: 'print(2 + 3)',
        answer: '5',
        explanation: 'Penjelasan singkat.'
      }
    ],
    coding: {
      id: `${moduleId}-l${urutan}-c1`,
      prompt: 'Buat fungsi `contoh(a, b)` yang mengembalikan hasil penjumlahan.',
      setup: '',
      starter_code: 'def contoh(a, b):\n    pass\n',
      tests: [
        { name: 'contoh(1, 2) == 3', code: 'assert contoh(1, 2) == 3' },
        { name: 'Bekerja untuk angka negatif', code: 'assert contoh(-1, 1) == 0' }
      ],
      hints: ['Gunakan operator +.', 'Jangan lupa return.'],
      solution: 'def contoh(a, b):\n    return a + b'
    }
  };
}
