import m0 from './m0.js';
import m1 from './m1.js';
import m2 from './m2.js';
import m3 from './m3.js';
import m4 from './m4.js';
import m5 from './m5.js';
import m6 from './m6.js';
import m7 from './m7.js';
import m8 from './m8.js';
import m9 from './m9.js';
import m10 from './m10.js';
import m11 from './m11.js';

export const modules = [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11];

export const capstone = {
  id: 'capstone',
  title: 'Proyek Akhir',
  icon: '🏆',
  tagline: 'Bangun satu sistem AI dari nol sampai jalan.',
  desc: 'Bukti nyata seluruh kurikulum: satu repo GitHub berisi proyek AI yang bisa dipajang di CV.',
  badge: { id: 'b-capstone', icon: '🏆', name: 'Capstone Master', desc: 'Menyelesaikan proyek akhir AI' },
  checklist: [
    { id: 'c1', text: 'Struktur proyek rapi (README, requirements.txt, pemisahan kode & data)' },
    { id: 'c2', text: 'Eksplorasi data (EDA) — statistik, nilai kosong, minimal 3 visualisasi' },
    { id: 'c3', text: 'Pembersihan & rekayasa fitur, termasuk minimal satu fitur turunan' },
    { id: 'c4', text: 'Pemisahan data yang benar, tanpa data leakage' },
    { id: 'c5', text: 'Minimal 3 model dibandingkan dalam satu tabel hasil' },
    { id: 'c6', text: 'Evaluasi memakai metrik yang tepat, bukan cuma akurasi' },
    { id: 'c7', text: 'Pipeline / kode bisa dijalankan ulang dengan hasil yang sama' },
    { id: 'c8', text: 'Model tersimpan & bisa dipakai (predict.py atau antarmuka sederhana)' },
    { id: 'c9', text: 'README menjelaskan masalah, metode, hasil, dan keterbatasan' },
    { id: 'c10', text: 'Link repo GitHub sudah diisi di bawah' }
  ]
};

/* ============================================================
   Index & override materi
   - BASE menyimpan kurikulum bawaan (dari file js/data/m*.js)
   - Admin bisa menimpa / menambah lesson lewat Firestore
   ============================================================ */
const BASE = modules.map((m) => m.lessons.map((l) => ({ ...l })));
const lessonIndex = new Map();
const moduleIndex = new Map();

export let flatLessons = [];
export let totalLessons = 0;
export let totalCoding = 0;

function rebuild() {
  lessonIndex.clear();
  moduleIndex.clear();
  modules.forEach((m) => {
    moduleIndex.set(m.id, m);
    m.lessons.forEach((l, i) => {
      l.module_id = m.id;
      l.order = i + 1;
      lessonIndex.set(l.id, l);
    });
  });
  flatLessons = modules.flatMap((m) => m.lessons);
  totalLessons = flatLessons.length;
  totalCoding = flatLessons.filter((l) => l.coding).length;
}
rebuild();

const FIELDS = ['title', 'duration', 'objectives', 'content_md', 'quiz', 'coding', 'runtime'];

/**
 * Terapkan daftar override materi dari Firestore ke kurikulum di memori.
 * Selalu dihitung ulang dari BASE, jadi menghapus override = kembali ke bawaan.
 */
export function applyOverrides(list = []) {
  modules.forEach((m, i) => { m.lessons = BASE[i].map((l) => ({ ...l })); });

  list.forEach((o) => {
    if (!o || !o.id || !o.module_id) return;
    const m = moduleIndex.get(o.module_id) || modules.find((x) => x.id === o.module_id);
    if (!m) return;
    const patch = {};
    FIELDS.forEach((f) => { if (o[f] !== undefined) patch[f] = o[f]; });
    const idx = m.lessons.findIndex((l) => l.id === o.id);
    if (idx >= 0) {
      m.lessons[idx] = Object.assign({}, m.lessons[idx], patch, { overridden: true });
    } else {
      m.lessons.push(Object.assign(
        { id: o.id, duration: 15, objectives: [], quiz: [], coding: null },
        patch,
        { custom: true, overridden: true, _order: o.order || 999 }
      ));
    }
  });

  modules.forEach((m) => {
    m.lessons.sort((a, b) => (a._order || a.order || 0) - (b._order || b.order || 0));
  });
  rebuild();
}

/** Lesson bawaan (sebelum diubah admin) — dipakai tombol "kembalikan ke bawaan". */
export function baseLesson(id) {
  for (const list of BASE) {
    const found = list.find((l) => l.id === id);
    if (found) return found;
  }
  return null;
}

export function getModule(id) { return moduleIndex.get(id); }
export function getLessonById(id) { return lessonIndex.get(id); }

export function nextLesson(lessonId) {
  const i = flatLessons.findIndex((l) => l.id === lessonId);
  return i >= 0 && i < flatLessons.length - 1 ? flatLessons[i + 1] : null;
}
export function prevLesson(lessonId) {
  const i = flatLessons.findIndex((l) => l.id === lessonId);
  return i > 0 ? flatLessons[i - 1] : null;
}
