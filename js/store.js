/* Learnify — autentikasi + penyimpanan progres.
   Sumber kebenaran: Firestore (users/{uid}).
   localStorage dipakai sebagai cache per-user supaya tetap responsif & tahan offline. */
import { firebaseConfig, FIREBASE_READY, ADMIN_EMAILS } from './firebase-config.js';

const SDK = 'https://www.gstatic.com/firebasejs/10.12.2';
const LS_BASE = 'learnify:v1';

export const XP = { read: 10, quiz: 20, coding: 30, exam: 100, capstone: 200 };

const blank = () => ({
  name: '',
  email: '',
  photo: '',
  xp: 0,
  streak: { count: 0, best: 0, last: null },
  days: {},
  lessons: {},
  exams: {},
  drafts: {},
  capstone: {},
  updatedAt: 0
});

export const state = {
  data: blank(),
  user: null,          // { uid, name, email, photo }
  cloud: FIREBASE_READY,
  localMode: !FIREBASE_READY,
  authReady: false,
  syncing: false,
  authError: null
};

const subs = new Set();
export function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
function notify() { subs.forEach((fn) => { try { fn(state); } catch (_) {} }); }

/* ---------------- local cache (per user) ---------------- */
function lsKey() { return `${LS_BASE}:${state.user ? state.user.uid : 'local'}`; }
function readLocal() {
  try {
    const raw = localStorage.getItem(lsKey());
    return raw ? Object.assign(blank(), JSON.parse(raw)) : blank();
  } catch (_) { return blank(); }
}
function writeLocal() {
  try { localStorage.setItem(lsKey(), JSON.stringify(state.data)); } catch (_) {}
}

/* ---------------- firebase ---------------- */
let fb = null;
let saveTimer = null;
let bootResolve = null;
const bootPromise = new Promise((r) => { bootResolve = r; });

export function getFirebase() { return fb; }

export function isAdmin() {
  // tanpa Firebase, halaman admin dibuka untuk pratinjau (semua simpanan lokal saja)
  if (state.localMode) return true;
  const email = state.user && state.user.email;
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => String(e).toLowerCase()).includes(email.toLowerCase());
}

function mergeData(a, b) {
  const out = Object.assign(blank(), a);
  out.name = b.name || a.name || '';
  out.email = b.email || a.email || '';
  out.photo = b.photo || a.photo || '';
  out.xp = Math.max(a.xp || 0, b.xp || 0);
  out.days = Object.assign({}, a.days, b.days);
  const sa = a.streak || {}, sb = b.streak || {};
  out.streak = (sb.last || '') >= (sa.last || '') ? Object.assign({}, sa, sb) : Object.assign({}, sb, sa);
  out.streak.best = Math.max(sa.best || 0, sb.best || 0, out.streak.count || 0);
  out.lessons = Object.assign({}, a.lessons);
  Object.entries(b.lessons || {}).forEach(([k, v]) => {
    const p = out.lessons[k] || {};
    out.lessons[k] = {
      read: p.read || v.read, quiz: p.quiz || v.quiz, code: p.code || v.code,
      done: p.done || v.done,
      quizScore: Math.max(p.quizScore || 0, v.quizScore || 0),
      at: Math.max(p.at || 0, v.at || 0)
    };
  });
  out.exams = Object.assign({}, a.exams);
  Object.entries(b.exams || {}).forEach(([k, v]) => {
    const p = out.exams[k] || {};
    out.exams[k] = {
      score: Math.max(p.score || 0, v.score || 0),
      passed: p.passed || v.passed,
      attempts: Math.max(p.attempts || 0, v.attempts || 0),
      at: Math.max(p.at || 0, v.at || 0)
    };
  });
  out.drafts = Object.assign({}, a.drafts, b.drafts);
  out.capstone = Object.assign({}, a.capstone, b.capstone);
  out.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  return out;
}

async function initFirebase() {
  const [appMod, authMod, dbMod] = await Promise.all([
    import(`${SDK}/firebase-app.js`),
    import(`${SDK}/firebase-auth.js`),
    import(`${SDK}/firebase-firestore.js`)
  ]);
  const app = appMod.initializeApp(firebaseConfig);
  fb = { app, auth: authMod.getAuth(app), db: dbMod.getFirestore(app), ...authMod, ...dbMod };
  return fb;
}

async function pullCloud(uid) {
  try {
    const snap = await fb.getDoc(fb.doc(fb.db, 'users', uid));
    if (snap.exists()) state.data = mergeData(state.data, snap.data());
  } catch (e) {
    console.warn('[learnify] gagal memuat progres:', e);
  }
  writeLocal();
  notify();
  pushCloud();
}

async function pushCloud() {
  if (!fb || !state.user) return;
  state.syncing = true; notify();
  try {
    await fb.setDoc(fb.doc(fb.db, 'users', state.user.uid), JSON.parse(JSON.stringify(state.data)), { merge: true });
  } catch (e) {
    console.warn('[learnify] gagal menyimpan progres:', e);
  }
  state.syncing = false; notify();
}

function scheduleSave() {
  state.data.updatedAt = Date.now();
  writeLocal();
  notify();
  if (!fb || !state.user) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushCloud, 900);
}

/* ---------------- API publik ---------------- */
export async function initStore() {
  if (!FIREBASE_READY) {
    state.localMode = true;
    state.data = readLocal();
    state.authReady = true;
    notify();
    bootResolve();
    return bootPromise;
  }
  try {
    await initFirebase();
    fb.onAuthStateChanged(fb.auth, async (u) => {
      if (u) {
        state.user = { uid: u.uid, name: u.displayName || '', email: u.email || '', photo: u.photoURL || '' };
        state.data = readLocal();
        if (!state.data.name) state.data.name = state.user.name;
        state.data.email = state.user.email;
        state.data.photo = state.user.photo;
        state.authReady = true;
        notify();
        await pullCloud(u.uid);
      } else {
        state.user = null;
        state.data = blank();
        state.authReady = true;
        notify();
      }
      bootResolve();
    });
  } catch (e) {
    console.error('[learnify] Firebase gagal dimuat:', e);
    state.authError = e.message || String(e);
    state.cloud = false;
    state.localMode = true;
    state.data = readLocal();
    state.authReady = true;
    notify();
    bootResolve();
  }
  return bootPromise;
}

export async function signInGoogle() {
  if (!fb) throw new Error('Firebase belum dikonfigurasi.');
  const provider = new fb.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    await fb.signInWithPopup(fb.auth, provider);
  } catch (e) {
    // popup diblokir browser → jatuh ke redirect
    if (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') {
      await fb.signInWithRedirect(fb.auth, provider);
      return;
    }
    throw e;
  }
}

export async function signOutUser() {
  if (!fb) return;
  clearTimeout(saveTimer);
  await pushCloud();
  await fb.signOut(fb.auth);
}

export function setName(name) { state.data.name = name; scheduleSave(); }

export function getLesson(id) {
  return state.data.lessons[id] || { read: false, quiz: false, code: false, done: false, quizScore: 0 };
}
export function getExam(id) {
  return state.data.exams[id] || { score: 0, passed: false, attempts: 0 };
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function daysBetween(a, b) {
  return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
}

export function touchStreak() {
  const t = today();
  const s = state.data.streak;
  state.data.days[t] = (state.data.days[t] || 0) + 1;
  if (s.last === t) return;
  if (!s.last) s.count = 1;
  else s.count = daysBetween(s.last, t) === 1 ? (s.count || 0) + 1 : 1;
  s.last = t;
  s.best = Math.max(s.best || 0, s.count);
  scheduleSave();
}

export function addXP(amount, reason) {
  state.data.xp = (state.data.xp || 0) + amount;
  touchStreak();
  scheduleSave();
  return { amount, reason };
}

export function markLessonPart(lessonId, part, extra = {}) {
  const l = Object.assign({ read: false, quiz: false, code: false, done: false, quizScore: 0 }, state.data.lessons[lessonId]);
  const wasNew = !l[part];
  l[part] = true;
  Object.assign(l, extra);
  l.at = Date.now();
  state.data.lessons[lessonId] = l;
  if (wasNew) {
    state.data.xp = (state.data.xp || 0) + (part === 'read' ? XP.read : part === 'quiz' ? XP.quiz : XP.coding);
    touchStreak();
  }
  scheduleSave();
  return { gained: wasNew, lesson: l };
}

export function completeLesson(lessonId, needsCoding) {
  const l = state.data.lessons[lessonId];
  if (!l) return false;
  const ok = l.quiz && (needsCoding ? l.code : true);
  if (ok && !l.done) { l.done = true; l.at = Date.now(); scheduleSave(); return true; }
  return false;
}

export function saveDraft(lessonId, code) {
  state.data.drafts[lessonId] = code;
  writeLocal();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushCloud, 4000);
}
export function getDraft(lessonId) { return state.data.drafts[lessonId]; }

export function recordExam(moduleId, score, passed) {
  const e = getExam(moduleId);
  const first = passed && !e.passed;
  state.data.exams[moduleId] = {
    score: Math.max(e.score, score),
    passed: e.passed || passed,
    attempts: (e.attempts || 0) + 1,
    at: Date.now()
  };
  if (first) { state.data.xp = (state.data.xp || 0) + XP.exam; touchStreak(); }
  scheduleSave();
  return first;
}

export function setCapstone(key, value) { state.data.capstone[key] = value; scheduleSave(); }

export function resetAll() {
  const id = { name: state.data.name, email: state.data.email, photo: state.data.photo };
  state.data = Object.assign(blank(), id);
  scheduleSave();
}

export function exportData() { return JSON.stringify(state.data, null, 2); }
export function importData(json) {
  state.data = mergeData(state.data, Object.assign(blank(), JSON.parse(json)));
  scheduleSave();
}
