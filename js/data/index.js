import m0 from './m0.js';
import m1 from './m1.js';
import m2 from './m2.js';
import m3 from './m3.js';
import m4 from './m4.js';
import m5 from './m5.js';
import m6 from './m6.js';

export const modules = [m0, m1, m2, m3, m4, m5, m6];

export const capstone = {
  id: 'capstone',
  title: 'Proyek Akhir',
  icon: '🏆',
  tagline: 'Framework Automation Test untuk Web Demo.',
  desc: 'Bukti nyata seluruh kurikulum: satu repo GitHub yang bisa dipajang di CV.',
  badge: { id: 'b-capstone', icon: '🏆', name: 'Capstone Master', desc: 'Menyelesaikan proyek akhir' },
  checklist: [
    { id: 'c1', text: 'Struktur proyek rapi (package, requirements.txt, README)' },
    { id: 'c2', text: 'Page Object Model minimal 3 halaman' },
    { id: 'c3', text: 'Minimal 10 test UI dengan Playwright' },
    { id: 'c4', text: 'Minimal 5 test API' },
    { id: 'c5', text: 'Data test dibaca dari file JSON/CSV' },
    { id: 'c6', text: 'Fixture & parametrize dipakai' },
    { id: 'c7', text: 'Logging dan laporan HTML' },
    { id: 'c8', text: 'Berjalan otomatis di GitHub Actions' },
    { id: 'c9', text: 'Link repo GitHub sudah diisi di bawah' }
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
