/* Learnify — manajer Pyodide worker (boot, timeout, restart). */
const WORKER_URL = new URL('./pyworker.js', import.meta.url);
const TIMEOUT_MS = 25000;   // diperpanjang otomatis selama worker masih mengabari progres

let worker = null;
let booting = null;
let seq = 0;
const pending = new Map();
const listeners = new Set();

export const runnerState = { status: 'idle', message: 'Belum dimuat' };

function emit(status, message) {
  runnerState.status = status;
  runnerState.message = message;
  listeners.forEach((fn) => { try { fn(runnerState); } catch (_) {} });
}

export function onRunnerState(fn) {
  listeners.add(fn);
  fn(runnerState);
  return () => listeners.delete(fn);
}

function spawn() {
  worker = new Worker(WORKER_URL, { type: 'classic' });
  worker.onmessage = (ev) => {
    const m = ev.data || {};
    if (m.type === 'status') {
      emit('booting', m.text);
      // unduhan paket bisa lama — perpanjang batas waktu selama worker masih mengabari
      pending.forEach((p) => {
        clearTimeout(p.timer);
        p.timer = setTimeout(p.onTimeout, TIMEOUT_MS);
      });
    }
    else if (m.type === 'ready') emit('ready', 'Python siap');
    else if (m.type === 'boot-error') emit('error', 'Gagal memuat Python: ' + m.error);
    else if (m.type === 'result') {
      const p = pending.get(m.id);
      if (p) { clearTimeout(p.timer); pending.delete(m.id); p.resolve(m.result); }
      if (!pending.size) emit('ready', 'Python siap');
    }
  };
  worker.onerror = (e) => emit('error', 'Worker error: ' + (e.message || 'unknown'));
  return worker;
}

/** Panaskan Pyodide di latar belakang (dipanggil saat buka lesson coding). */
export function warmUp() {
  if (booting) return booting;
  emit('booting', 'Menyiapkan Python…');
  spawn();
  worker.postMessage({ type: 'init' });
  booting = new Promise((resolve) => {
    const off = onRunnerState((s) => {
      if (s.status === 'ready' || s.status === 'error') { off(); resolve(s.status === 'ready'); }
    });
  });
  return booting;
}

function hardReset(reason) {
  try { worker && worker.terminate(); } catch (_) {}
  worker = null; booting = null;
  pending.forEach((p) => {
    clearTimeout(p.timer);
    p.resolve({ stdout: '', error: reason, tests: [], timeout: true });
  });
  pending.clear();
  emit('idle', 'Python di-restart');
}

/**
 * Jalankan kode user + test.
 * @returns {Promise<{stdout:string,error:string|null,tests:Array,timeout?:boolean}>}
 */
export function runPython({ code, tests = [], setup = '', stdin = [], packages = [] }) {
  if (!worker) warmUp();
  const id = ++seq;
  return new Promise((resolve) => {
    const onTimeout = () => hardReset('⏱️ Waktu eksekusi habis. Cek apakah ada infinite loop — misalnya `while` yang kondisinya tidak pernah selesai.');
    const timer = setTimeout(onTimeout, TIMEOUT_MS);
    pending.set(id, { resolve, timer, onTimeout });
    worker.postMessage({ type: 'run', id, code, tests, setup, stdin, packages });
  });
}
