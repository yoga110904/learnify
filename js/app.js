/* ============================================================
   Learnify — aplikasi utama (router + semua view)
   ============================================================ */
import { modules, capstone, getModule, getLessonById, flatLessons, nextLesson, totalLessons, baseLesson } from './data/index.js';
import * as Content from './content-store.js';
import * as Store from './store.js';
import { runPython, warmUp, onRunnerState } from './runner.js';

const app = document.getElementById('main');
const PASS_QUIZ = 0.7;

/* ---------------- util ---------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function md(text) {
  if (!text) return '';
  try {
    if (window.marked) {
      window.marked.setOptions({ breaks: false, gfm: true });
      return window.marked.parse(text);
    }
  } catch (_) {}
  return `<pre>${esc(text)}</pre>`;
}

function toast(msg, kind = '') {
  const wrap = $('#toastWrap');
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.innerHTML = msg;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(20px)'; }, 3200);
  setTimeout(() => el.remove(), 3600);
}

function modal({ title, body, actions = [] }) {
  const bd = $('#modalBackdrop');
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = body;
  const foot = $('#modalFoot');
  foot.innerHTML = '';
  actions.forEach((a) => {
    const b = document.createElement('button');
    b.className = 'btn ' + (a.primary ? 'btn-primary' : '');
    b.textContent = a.label;
    b.onclick = () => { closeModal(); a.onClick && a.onClick(); };
    foot.appendChild(b);
  });
  bd.hidden = false;
  return bd;
}
function closeModal() { $('#modalBackdrop').hidden = true; }
$('#modalBackdrop').addEventListener('click', (e) => {
  if (e.target.id === 'modalBackdrop' || e.target.closest('[data-close-modal]')) closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

function fmtDate(ts) {
  if (!ts) return '-';
  return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ---------------- progres & unlock ---------------- */
function lessonDone(id) { return Boolean(Store.getLesson(id).done); }

function isLessonUnlocked(lessonId) {
  const idx = flatLessons.findIndex((l) => l.id === lessonId);
  if (idx <= 0) return true;
  return lessonDone(flatLessons[idx - 1].id);
}

function moduleStats(m) {
  const done = m.lessons.filter((l) => lessonDone(l.id)).length;
  const exam = Store.getExam(m.id);
  const hasExam = Boolean(m.exam);
  const total = m.lessons.length + (hasExam ? 1 : 0);
  const completed = done + (hasExam && exam.passed ? 1 : 0);
  return {
    done, total: m.lessons.length, completed, allTotal: total,
    percent: Math.round((completed / total) * 100),
    examUnlocked: done === m.lessons.length,
    examPassed: Boolean(exam.passed),
    finished: done === m.lessons.length && (!hasExam || exam.passed)
  };
}

function moduleUnlocked(m) {
  const i = modules.indexOf(m);
  if (i <= 0) return true;
  return moduleStats(modules[i - 1]).finished;
}

function allModulesFinished() { return modules.every((m) => moduleStats(m).finished); }

function capstoneProgress() {
  const c = Store.state.data.capstone || {};
  const done = capstone.checklist.filter((i) => c[i.id]).length;
  return { done, total: capstone.checklist.length, finished: done === capstone.checklist.length };
}

function overallPercent() {
  const totalUnits = modules.reduce((s, m) => s + m.lessons.length + (m.exam ? 1 : 0), 0);
  const done = modules.reduce((s, m) => { const st = moduleStats(m); return s + st.completed; }, 0);
  return Math.round((done / totalUnits) * 100);
}

/* ---------------- shell ---------------- */
function renderShell() {
  const d = Store.state.data;
  const u = Store.state.user;
  $('#xpValue').textContent = d.xp || 0;
  $('#streakValue').textContent = (d.streak && d.streak.count) || 0;

  const btn = $('#userBtn');
  if (u && u.photo) {
    btn.innerHTML = `<img src="${esc(u.photo)}" alt="" referrerpolicy="no-referrer">`;
    btn.classList.add('has-photo');
    btn.title = `${u.name || u.email} — klik untuk akun`;
  } else {
    btn.textContent = u ? (u.name || u.email || '👤').trim().charAt(0).toUpperCase() : '👤';
    btn.classList.remove('has-photo');
    btn.title = u ? 'Akun' : 'Masuk';
  }

  // menu admin baru muncul setelah login (atau setelah masuk mode pratinjau)
  const bolehAdmin = Store.isAdmin() && (Store.state.user || previewMode());
  $$('[data-nav="admin"]').forEach((el) => { el.hidden = !bolehAdmin; });

  $('#footerSync').textContent = Store.state.localMode
    ? ' · mode lokal (Firebase belum dikonfigurasi)'
    : Store.state.syncing ? ' · menyinkronkan…'
    : u ? ' · tersinkron ke akun Google-mu' : '';
}
Store.subscribe(renderShell);

function setActiveNav(name) {
  $$('#mainnav a, #tabbar a').forEach((a) => a.classList.toggle('active', a.dataset.nav === name));
}

$('#menuBtn').addEventListener('click', () => {
  const nav = $('#mainnav');
  nav.classList.toggle('open');
  $('#menuBtn').setAttribute('aria-expanded', nav.classList.contains('open'));
});
$('#mainnav').addEventListener('click', (e) => {
  if (e.target.tagName === 'A') $('#mainnav').classList.remove('open');
});

/* tema */
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('learnify:theme', t); } catch (_) {}
  refreshEditorTheme();
}
function syncThemeIcon() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const b = $('#themeBtn');
  b.textContent = dark ? '☀️' : '🌙';
  b.title = dark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap';
}
$('#themeBtn').addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  syncThemeIcon();
});
(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('learnify:theme'); } catch (_) {}
  if (saved) { document.documentElement.dataset.theme = saved; return; }
  // belum pernah memilih -> ikuti preferensi sistem
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      let picked = null;
      try { picked = localStorage.getItem('learnify:theme'); } catch (_) {}
      if (!picked) document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
    });
  }
})();

/* akun */
$('#userBtn').addEventListener('click', () => {
  if (!Store.state.user && !Store.state.localMode) { location.hash = '#/login'; return; }
  const d = Store.state.data;
  const u = Store.state.user;
  modal({
    title: 'Akun & Data',
    body: `
      ${u ? `
        <div class="acc-head">
          ${u.photo ? `<img class="acc-photo" src="${esc(u.photo)}" alt="" referrerpolicy="no-referrer">` : `<div class="acc-photo ph">${esc((u.name || u.email || '?').charAt(0).toUpperCase())}</div>`}
          <div>
            <b>${esc(u.name || '—')}</b>
            <div class="muted" style="font-size:.84rem">${esc(u.email || '')}</div>
            ${Store.isAdmin() ? '<span class="pill warn" style="margin-top:6px">★ Admin</span>' : ''}
          </div>
        </div>
        <hr class="hr">` : `
        <div class="feedback bad" style="margin-bottom:16px">
          <b>Mode lokal</b>
          Firebase belum dikonfigurasi, jadi progres hanya tersimpan di browser ini.
          Isi <code>js/firebase-config.js</code> untuk mengaktifkan login Google dan sinkronisasi.
        </div>`}

      <label class="muted" style="font-size:.82rem">Nama untuk sertifikat</label>
      <input class="answer-input" id="nameInput" value="${esc(d.name || '')}" placeholder="Nama lengkap kamu" style="margin:6px 0 16px">

      <div class="row">
        <button class="btn btn-sm" id="btnExport">⬇︎ Export progres</button>
        <button class="btn btn-sm" id="btnImport">⬆︎ Import progres</button>
        ${Store.isAdmin() ? '<a class="btn btn-sm" href="#/admin" id="btnAdmin">⚙︎ Halaman admin</a>' : ''}
      </div>
      <hr class="hr">
      <div class="row">
        <button class="btn btn-sm" id="btnReset" style="border-color:var(--danger);color:var(--danger)">Reset progres</button>
        <div class="spacer"></div>
        ${u ? '<button class="btn btn-sm" id="btnSignOut">Keluar</button>' : ''}
      </div>
    `,
    actions: [{ label: 'Selesai', primary: true }]
  });

  const input = $('#nameInput');
  input.addEventListener('input', () => Store.setName(input.value));

  $('#btnExport').onclick = () => {
    const blob = new Blob([Store.exportData()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'learnify-progres.json';
    a.click();
    toast('Progres diunduh', 'ok');
  };
  $('#btnImport').onclick = () => {
    const f = document.createElement('input');
    f.type = 'file'; f.accept = 'application/json';
    f.onchange = async () => {
      try { Store.importData(await f.files[0].text()); toast('Progres berhasil diimpor', 'ok'); route(); }
      catch (e) { toast('File tidak valid', 'bad'); }
    };
    f.click();
  };
  const adminBtn = $('#btnAdmin');
  if (adminBtn) adminBtn.onclick = () => closeModal();
  const so = $('#btnSignOut');
  if (so) so.onclick = async () => {
    closeModal();
    await Store.signOutUser();
    toast('Kamu sudah keluar');
    location.hash = '#/';
  };
  $('#btnReset').onclick = () => {
    closeModal();
    modal({
      title: 'Reset semua progres?',
      body: '<p>Semua XP, badge, dan lesson yang sudah selesai akan dihapus dari akun ini. Tindakan ini tidak bisa dibatalkan.</p>',
      actions: [
        { label: 'Batal' },
        { label: 'Ya, hapus', primary: true, onClick: () => { Store.resetAll(); toast('Progres direset'); location.hash = '#/'; route(); } }
      ]
    });
  };
});

/* ---------------- helper statistik belajar ---------------- */
const HARI = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function startOfWeek(base) {
  const d = new Date(base);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  d.setHours(0, 0, 0, 0);
  return d;
}
function shiftDays(base, n) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

/** Menit belajar per tanggal, dihitung dari durasi lesson yang selesai + ujian yang lulus. */
function minutesByDay() {
  const map = {};
  flatLessons.forEach((l) => {
    const p = Store.getLesson(l.id);
    if (p.done && p.at) {
      const k = dateKey(new Date(p.at));
      map[k] = (map[k] || 0) + (l.duration || 0);
    }
  });
  modules.forEach((m) => {
    if (!m.exam) return;
    const e = Store.getExam(m.id);
    if (e.passed && e.at) {
      const k = dateKey(new Date(e.at));
      map[k] = (map[k] || 0) + 30;
    }
  });
  return map;
}

function fmtJam(menit) {
  const jam = menit / 60;
  if (jam >= 10) return `${Math.round(jam)} jam`;
  return `${jam.toFixed(1).replace('.', ',')} jam`;
}

function deltaPersen(sekarang, sebelum) {
  if (!sebelum) return sekarang > 0 ? null : 0;   // null = tidak ada pembanding
  return Math.round(((sekarang - sebelum) / sebelum) * 100);
}

/** Data untuk bar chart, mengikuti periode terpilih. */
function seriesBelajar(periode) {
  const map = minutesByDay();
  const today = new Date();
  if (periode === 'month') {
    const bars = [];
    for (let w = 3; w >= 0; w--) {
      const awal = shiftDays(startOfWeek(today), -7 * w);
      let total = 0;
      for (let i = 0; i < 7; i++) total += map[dateKey(shiftDays(awal, i))] || 0;
      bars.push({ label: `M${4 - w}`, value: total, active: w === 0 });
    }
    return bars;
  }
  const senin = startOfWeek(today);
  const kunciHariIni = dateKey(today);
  const bars = HARI.map((label, i) => {
    const d = shiftDays(senin, i);
    const k = dateKey(d);
    return { label, value: map[k] || 0, key: k, hariIni: k === kunciHariIni, future: d > today, active: false };
  });
  // sorot hari ini kalau ada aktivitas; kalau belum, sorot hari terbaik minggu ini
  const hariIniBar = bars.find((b) => b.hariIni);
  if (hariIniBar && hariIniBar.value > 0) hariIniBar.active = true;
  else {
    const terbaik = bars.reduce((a, b) => (b.value > a.value ? b : a), bars[0]);
    (terbaik.value > 0 ? terbaik : hariIniBar || bars[0]).active = true;
  }
  return bars;
}

function ringkasanBelajar() {
  const map = minutesByDay();
  const today = new Date();
  const seninIni = startOfWeek(today);
  const seninLalu = shiftDays(seninIni, -7);
  let mingguIni = 0, mingguLalu = 0, total = 0;
  Object.entries(map).forEach(([k, v]) => { total += v; });
  for (let i = 0; i < 7; i++) {
    mingguIni += map[dateKey(shiftDays(seninIni, i))] || 0;
    mingguLalu += map[dateKey(shiftDays(seninLalu, i))] || 0;
  }
  const hariAktif = Object.values(map).filter((v) => v > 0).length;
  return {
    total, mingguIni, mingguLalu, hariAktif,
    rataPerHari: hariAktif ? total / hariAktif : 0,
    deltaMinggu: deltaPersen(mingguIni, mingguLalu)
  };
}

function deltaPill(n, suffix = '') {
  if (n === null) return `<span class="delta up">✦ minggu pertama</span>`;
  const naik = n >= 0;
  const nilai = Math.abs(n) > 999 ? '999+' : Math.abs(n);
  return `<span class="delta ${naik ? 'up' : 'down'}">${naik ? '▲' : '▼'} ${nilai}%${suffix}</span>`;
}

/* ============================================================
   VIEW: Landing
   ============================================================ */
function viewLanding() {
  setActiveNav('home');
  const pct = overallPercent();
  const d = Store.state.data;
  const lanjut = flatLessons.find((l) => !lessonDone(l.id)) || flatLessons[0];
  const belumMasuk = Store.state.cloud && !Store.state.user;

  app.className = 'app';
  app.innerHTML = `
    <section class="hero">
      <div>
        <span class="pill">🐍 Kurikulum Python · Dasar → Advance</span>
        <h1>Belajar Python sampai bisa <span class="grad">automation testing</span>.</h1>
        <p class="lead">39 lesson, 37 tantangan live coding, dan 6 ujian modul. Semua kode Python
        dijalankan langsung di browser — tidak perlu install apa pun.</p>
        <div class="hero-cta">
          ${belumMasuk
            ? `<a class="btn btn-primary" href="#/login">Masuk dengan Google →</a>`
            : `<a class="btn btn-primary" href="#/lesson/${lanjut.id}">${pct > 0 ? 'Lanjutkan belajar' : 'Mulai dari nol'} →</a>`}
          <a class="btn btn-ghost" href="#/modules">Lihat semua modul</a>
        </div>
        ${pct > 0 ? `
          <div style="margin-top:26px;max-width:380px">
            <div class="row" style="justify-content:space-between;font-size:.82rem">
              <span class="muted">Progres kurikulum</span><b>${pct}%</b>
            </div>
            <div class="progress" style="margin-top:6px"><i style="width:${pct}%"></i></div>
          </div>` : ''}
        <div class="hero-stats">
          <div><b>7</b><span>modul</span></div>
          <div><b>${totalLessons}</b><span>lesson</span></div>
          <div><b>${d.xp || 0}</b><span>XP kamu</span></div>
          <div><b>${(d.streak && d.streak.count) || 0}</b><span>hari streak</span></div>
        </div>
      </div>

      <div class="code-window">
        <div class="cw-bar">
          <i class="cw-dot" style="background:#ff5f57"></i>
          <i class="cw-dot" style="background:#febc2e"></i>
          <i class="cw-dot" style="background:#28c840"></i>
          <span class="cw-title">latihan.py</span>
        </div>
<pre>def fizzbuzz(n):
    hasil = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            hasil.append("FizzBuzz")
        elif i % 3 == 0:
            hasil.append("Fizz")
        elif i % 5 == 0:
            hasil.append("Buzz")
        else:
            hasil.append(i)
    return hasil</pre>
        <div class="cw-out">✅ 4/4 test lolos · +30 XP</div>
      </div>
    </section>

    <h2 class="section-title">Kenapa belajar di sini</h2>
    <p class="section-sub">Bukan sekadar baca teori — tiap lesson dikunci sampai kamu benar-benar bisa.</p>
    <div class="feature-grid">
      <div class="feature"><div class="ic">🐍</div><h3>Python asli di browser</h3>
        <p>Pyodide menjalankan CPython lewat WebAssembly. Kode kamu dieksekusi beneran, bukan disimulasikan.</p></div>
      <div class="feature"><div class="ic">✅</div><h3>Dinilai otomatis</h3>
        <p>Tiap tantangan punya test case. Kamu tahu persis bagian mana yang belum benar.</p></div>
      <div class="feature"><div class="ic">🔒</div><h3>Progres berurutan</h3>
        <p>Lesson berikutnya terbuka setelah kuis ≥70% dan semua test coding lolos.</p></div>
      <div class="feature"><div class="ic">⚡</div><h3>XP, streak & badge</h3>
        <p>Kumpulkan XP tiap langkah, jaga streak harian, dan kumpulkan badge tiap modul.</p></div>
      <div class="feature"><div class="ic">🧪</div><h3>Spesialisasi QA</h3>
        <p>Modul 6 khusus automation testing: pytest, fixture, mocking, API, dan Playwright.</p></div>
      <div class="feature"><div class="ic">📱</div><h3>Jalan di HP</h3>
        <p>Tampilan menyesuaikan layar kecil, jadi bisa lanjut belajar sambil rebahan.</p></div>
    </div>

    <h2 class="section-title">Peta kurikulum</h2>
    <p class="section-sub">Dari "apa itu variabel" sampai framework automation test yang jalan di GitHub Actions.</p>
    <div class="module-grid">${modules.map(moduleCardHTML).join('')}</div>
    <div style="margin-top:16px">${capstoneCardHTML()}</div>
  `;
}

function moduleCardHTML(m) {
  const st = moduleStats(m);
  const unlocked = moduleUnlocked(m);
  return `
    <a class="module-card ${unlocked ? '' : 'locked'}" href="${unlocked ? `#/module/${m.id}` : '#/modules'}">
      <div class="mc-top">
        <div class="mc-icon">${m.icon}</div>
        ${st.finished ? '<span class="pill ok">✓ Selesai</span>'
          : unlocked ? `<span class="pill">${st.percent}%</span>`
          : '<span class="pill lock">🔒 Terkunci</span>'}
      </div>
      <h3>${esc(m.title)}</h3>
      <p class="mc-desc">${esc(m.desc)}</p>
      <div class="progress"><i style="width:${st.percent}%"></i></div>
      <div class="mc-meta">
        <span>${m.lessons.length} lesson${m.exam ? ' + ujian' : ''}</span>
        <span>${st.completed}/${st.allTotal} selesai</span>
      </div>
    </a>`;
}

function capstoneCardHTML() {
  const unlocked = allModulesFinished();
  const cp = capstoneProgress();
  return `
    <a class="module-card ${unlocked ? '' : 'locked'}" href="${unlocked ? '#/capstone' : '#/modules'}">
      <div class="mc-top">
        <div class="mc-icon">🏆</div>
        ${cp.finished ? '<span class="pill ok">✓ Selesai</span>' : unlocked ? `<span class="pill">${cp.done}/${cp.total}</span>` : '<span class="pill lock">🔒 Selesaikan semua modul</span>'}
      </div>
      <h3>Proyek Akhir — ${esc(capstone.tagline)}</h3>
      <p class="mc-desc">${esc(capstone.desc)}</p>
      <div class="progress"><i style="width:${Math.round(cp.done / cp.total * 100)}%"></i></div>
    </a>`;
}

/* ============================================================
   VIEW: Katalog modul
   ============================================================ */
function viewModules() {
  setActiveNav('modules');
  app.className = 'app';
  const pct = overallPercent();
  app.innerHTML = `
    <h1 style="font-size:1.7rem;letter-spacing:-.8px;margin:6px 0 4px">Katalog Modul</h1>
    <p class="section-sub">Progres keseluruhan <b>${pct}%</b>. Modul terbuka satu per satu supaya fondasinya kuat.</p>
    <div class="progress" style="margin-bottom:24px"><i style="width:${pct}%"></i></div>
    <div class="module-grid">${modules.map(moduleCardHTML).join('')}</div>
    <h2 class="section-title">Penutup</h2>
    ${capstoneCardHTML()}
  `;
}

/* ============================================================
   VIEW: Detail modul (daftar lesson)
   ============================================================ */
const MODULE_TINT = { m0: 'peach', m1: 'lilac', m2: 'blue', m3: 'mint', m4: 'pink', m5: 'sky', m6: 'lemon' };

function viewModule(id) {
  const m = getModule(id);
  if (!m) return viewNotFound();
  setActiveNav('modules');
  app.className = 'app';
  const st = moduleStats(m);
  const unlocked = moduleUnlocked(m);

  if (!unlocked) {
    app.innerHTML = `
      <div class="card center">
        <div style="font-size:2.4rem">🔒</div>
        <h2>Modul ini masih terkunci</h2>
        <p class="muted">Selesaikan modul sebelumnya dulu supaya fondasinya kuat.</p>
        <a class="btn btn-primary" href="#/modules">Kembali ke katalog</a>
      </div>`;
    return;
  }

  const rows = m.lessons.map((l) => {
    const done = lessonDone(l.id);
    const open = isLessonUnlocked(l.id);
    const p = Store.getLesson(l.id);
    const bits = [];
    if (p.read) bits.push('materi');
    if (p.quiz) bits.push('kuis');
    if (p.code) bits.push('coding');
    return `
      <a class="lesson-row ${done ? 'done' : ''} ${open ? '' : 'locked'}" href="${open ? `#/lesson/${l.id}` : '#'}"
         ${open ? '' : 'onclick="return false"'}>
        <div class="lr-num">${done ? '✓' : l.order}</div>
        <div class="lr-body">
          <b>${esc(l.title)}</b>
          <span>${l.duration} menit${l.coding ? ' · ada live coding' : ''}${bits.length ? ' · <i>' + bits.join(', ') + ' ok</i>' : ''}</span>
        </div>
        <span class="chev">${open ? (done ? '✓' : '›') : '🔒'}</span>
      </a>`;
  }).join('');

  const examRow = m.exam ? `
    <a class="lesson-row exam ${st.examPassed ? 'done' : ''} ${st.examUnlocked ? '' : 'locked'}"
       href="${st.examUnlocked ? `#/exam/${m.id}` : '#'}" ${st.examUnlocked ? '' : 'onclick="return false"'}>
      <div class="lr-num">${st.examPassed ? '✓' : '🎓'}</div>
      <div class="lr-body">
        <b>${esc(m.exam.title)}</b>
        <span>${m.exam.questionCount} soal teori + ${m.exam.coding.length} coding · lulus ≥ ${m.exam.passScore}%${st.examPassed ? ` · terbaik ${Store.getExam(m.id).score}%` : ''}</span>
      </div>
      <span class="chev">${st.examUnlocked ? (st.examPassed ? '✓' : '›') : '🔒'}</span>
    </a>` : '';

  const lanjut = m.lessons.find((l) => !lessonDone(l.id) && isLessonUnlocked(l.id));
  const ctaHref = lanjut ? `#/lesson/${lanjut.id}`
    : (m.exam && st.examUnlocked && !st.examPassed) ? `#/exam/${m.id}`
    : `#/lesson/${m.lessons[0].id}`;
  const ctaLabel = lanjut ? (st.done ? 'Lanjutkan lesson' : 'Mulai lesson')
    : (m.exam && st.examUnlocked && !st.examPassed) ? 'Kerjakan ujian modul' : 'Ulangi dari awal';

  app.innerHTML = `
    <a class="back-link" href="#/modules">← Katalog modul</a>

    <section class="module-hero" style="--card-tint:var(--tint-${MODULE_TINT[m.id] || 'lilac'})">
      <span class="mh-blob b1"></span>
      <span class="mh-blob b2"></span>
      <div class="mh-icon">${m.icon}</div>
      <div class="mh-meta">
        <span class="pill">${m.lessons.length} lesson${m.exam ? ' + ujian' : ''}</span>
        <span class="pill">${st.percent}% selesai</span>
      </div>
    </section>

    <section class="module-sheet">
      <span class="sheet-grip"></span>
      <h1>${esc(m.title)}</h1>
      <p class="sheet-desc">${esc(m.desc)}</p>
      <div class="progress"><i style="width:${st.percent}%"></i></div>
      <p class="sheet-sub">
        ${st.completed} dari ${st.allTotal} selesai · badge <b>${m.badge.icon} ${esc(m.badge.name)}</b>
        ${st.finished ? 'sudah didapat 🎉' : 'menunggu kamu'}
      </p>

      <div class="sec-head">
        <h2>Daftar lesson</h2>
        <span class="muted" style="font-size:.82rem">${st.done}/${m.lessons.length} lesson</span>
      </div>
      <div class="lesson-list">${rows}${examRow}</div>
    </section>

    <div class="sticky-cta">
      <a class="btn btn-primary btn-block" href="${ctaHref}">${ctaLabel} →</a>
    </div>`;
}

function viewNotFound() {
  app.className = 'app';
  app.innerHTML = `<div class="empty"><h2>404</h2><p>Halaman tidak ditemukan.</p><a class="btn" href="#/">Ke beranda</a></div>`;
}

/* ============================================================
   Komponen: KUIS
   ============================================================ */
function normalizeOut(s) {
  return String(s ?? '').replace(/\r/g, '').split('\n').map((l) => l.trimEnd()).join('\n').trim();
}

function renderQuiz(host, questions, opts = {}) {
  const immediate = opts.immediate !== false;
  let i = 0;
  const results = new Array(questions.length).fill(null);

  function draw() {
    const q = questions[i];
    const bar = questions.map((_, n) => {
      const r = results[n];
      const cls = n === i ? 'now' : r === true ? 'ok' : r === false ? 'bad' : '';
      return `<i class="${cls}"></i>`;
    }).join('');

    let body = '';
    if (q.type === 'mcq') {
      body = q.options.map((o, n) => `
        <div class="opt" data-opt="${n}">
          <span class="mark">${String.fromCharCode(65 + n)}</span>
          <span>${esc(o)}</span>
        </div>`).join('');
    } else if (q.type === 'true_false') {
      body = ['Benar', 'Salah'].map((o, n) => `
        <div class="opt" data-opt="${n}">
          <span class="mark">${n === 0 ? '✓' : '✕'}</span><span>${o}</span>
        </div>`).join('');
    } else {
      body = `
        <label class="muted" style="font-size:.82rem">Tulis output persis seperti yang tercetak:</label>
        <textarea class="answer-input" id="qInput" rows="3" spellcheck="false"
          placeholder="ketik output di sini..."></textarea>`;
    }

    host.innerHTML = `
      <div class="quiz-progress">${bar}</div>
      <div class="row" style="justify-content:space-between;margin-bottom:6px">
        <span class="pill">Soal ${i + 1} / ${questions.length}</span>
        <span class="pill">${q.type === 'mcq' ? 'Pilihan ganda' : q.type === 'true_false' ? 'Benar / Salah' : 'Tebak output'}</span>
      </div>
      <p class="q-text">${esc(q.question)}</p>
      ${q.code ? `<pre class="q-code">${esc(q.code)}</pre>` : ''}
      <div id="qBody">${body}</div>
      <div id="qFeedback"></div>
      <div class="row" style="margin-top:16px">
        <button class="btn btn-primary" id="qCheck">${q.type === 'predict_output' ? 'Cek jawaban' : 'Jawab'}</button>
        <div class="spacer"></div>
        <span class="muted" style="font-size:.8rem" id="qScore">${results.filter((r) => r === true).length} benar</span>
      </div>`;

    let picked = null;
    $$('.opt', host).forEach((el) => el.addEventListener('click', () => {
      if (el.classList.contains('locked')) return;
      $$('.opt', host).forEach((o) => o.classList.remove('sel'));
      el.classList.add('sel');
      picked = Number(el.dataset.opt);
    }));

    const inp = $('#qInput', host);
    if (inp) inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) $('#qCheck', host).click();
    });

    $('#qCheck', host).addEventListener('click', () => {
      let correct = false;
      if (q.type === 'mcq') {
        if (picked === null) return toast('Pilih salah satu jawaban dulu', 'bad');
        correct = picked === q.answer;
      } else if (q.type === 'true_false') {
        if (picked === null) return toast('Pilih Benar atau Salah dulu', 'bad');
        correct = (picked === 0) === Boolean(q.answer);
      } else {
        const val = inp.value;
        if (!val.trim()) return toast('Isi jawabannya dulu', 'bad');
        correct = normalizeOut(val) === normalizeOut(q.answer);
      }
      results[i] = correct;
      showFeedback(q, correct, picked);
    });
  }

  function showFeedback(q, correct, picked) {
    const btn = $('#qCheck', host);
    const sc = $('#qScore', host);
    if (sc) sc.textContent = `${results.filter((r) => r === true).length} benar`;
    if (immediate) {
      if (q.type === 'mcq' || q.type === 'true_false') {
        const right = q.type === 'mcq' ? q.answer : (q.answer ? 0 : 1);
        $$('.opt', host).forEach((el, n) => {
          el.classList.add('locked');
          el.style.pointerEvents = 'none';
          if (n === right) el.classList.add('correct');
          else if (n === picked) el.classList.add('wrong');
        });
      } else {
        const inp = $('#qInput', host);
        inp.disabled = true;
      }
      $('#qFeedback', host).innerHTML = `
        <div class="feedback ${correct ? 'ok' : 'bad'}">
          <b>${correct ? '✅ Benar!' : '❌ Belum tepat'}</b>
          ${!correct && q.type === 'predict_output' ? `<div style="margin-bottom:6px">Jawaban yang benar: <code>${esc(q.answer)}</code></div>` : ''}
          ${esc(q.explanation || '')}
        </div>`;
    }
    btn.textContent = i < questions.length - 1 ? 'Soal berikutnya →' : 'Selesai';
    btn.replaceWith(btn.cloneNode(true));
    $('#qCheck', host).addEventListener('click', () => {
      if (i < questions.length - 1) { i++; draw(); }
      else {
        const benar = results.filter((r) => r === true).length;
        opts.onFinish && opts.onFinish(benar / questions.length, results);
      }
    });
  }

  draw();
}

/* ============================================================
   Komponen: LIVE CODING
   ============================================================ */
const editors = [];
function editorTheme() { return 'material-ocean'; }
function refreshEditorTheme() { editors.forEach((e) => e.setOption('theme', editorTheme())); }

function makeEditor(host, value) {
  const cm = window.CodeMirror(host, {
    value,
    mode: 'python',
    theme: editorTheme(),
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    autoCloseBrackets: true,
    styleActiveLine: true,
    lineWrapping: true,
    extraKeys: {
      Tab: (cmi) => cmi.replaceSelection('    '),
      'Cmd-Enter': () => $('#btnSubmit') && $('#btnSubmit').click(),
      'Ctrl-Enter': () => $('#btnSubmit') && $('#btnSubmit').click()
    }
  });
  editors.push(cm);
  return cm;
}

/**
 * @param host elemen tempat panel dirender
 * @param coding objek coding dari data
 * @param opts {storageKey, onPass, label}
 */
function renderCoding(host, coding, opts = {}) {
  const key = opts.storageKey || coding.id || 'tmp';
  const saved = Store.getDraft(key);
  let attempts = 0;
  let passed = false;

  host.innerHTML = `
    <div class="pane">
      <div class="pane-head">
        <span>⌨️ Editor Python</span>
        <div class="spacer"></div>
        <span id="pyStatus" class="muted" style="font-weight:500"></span>
      </div>
      <div class="editor-toolbar">
        <button class="btn btn-sm" id="btnRun">▶︎ Jalankan</button>
        <button class="btn btn-sm btn-primary" id="btnSubmit">✓ Cek jawaban</button>
        <div class="spacer"></div>
        <button class="btn btn-sm btn-ghost" id="btnHint">💡 Petunjuk</button>
        <button class="btn btn-sm btn-ghost" id="btnReset">↺ Reset</button>
        <button class="btn btn-sm btn-ghost" id="btnSol">👁 Solusi</button>
      </div>
      <div class="editor-wrap" id="editorHost"></div>
      <div class="console" id="console"><span class="dim">Output akan muncul di sini. Tekan Ctrl/Cmd + Enter untuk cek jawaban.</span></div>
      <div class="test-list" id="testList">
        ${coding.tests.map((t, n) => `
          <div class="test-item" data-t="${n}">
            <span class="test-ic">⚪️</span>
            <div><div>${esc(t.name)}</div></div>
          </div>`).join('')}
      </div>
    </div>
    <div id="hintBox"></div>`;

  const cm = makeEditor($('#editorHost', host), saved != null ? saved : (coding.starter_code || ''));
  cm.on('change', () => Store.saveDraft(key, cm.getValue()));
  setTimeout(() => cm.refresh(), 60);

  const statusEl = $('#pyStatus', host);
  const off = onRunnerState((s) => {
    statusEl.textContent = s.status === 'ready' ? '● Python siap'
      : s.status === 'booting' ? '◌ ' + s.message
      : s.status === 'error' ? '● ' + s.message : '';
  });
  host._cleanup = off;
  warmUp();

  const consoleEl = $('#console', host);
  function log(text, cls = '') {
    consoleEl.innerHTML = text ? `<span class="${cls}">${esc(text)}</span>` : '<span class="dim">(tidak ada output)</span>';
  }

  async function execute(withTests) {
    const btn = withTests ? $('#btnSubmit', host) : $('#btnRun', host);
    const label = btn.textContent;
    btn.disabled = true; btn.innerHTML = '<span class="loader"></span> Menjalankan…';
    consoleEl.innerHTML = '<span class="dim">Menjalankan Python…</span>';

    const res = await runPython({
      code: cm.getValue(),
      setup: coding.setup || '',
      tests: withTests ? coding.tests : [],
      stdin: coding.stdin || []
    });

    btn.disabled = false; btn.textContent = label;

    let out = res.stdout || '';
    if (res.error) out += (out ? '\n' : '') + res.error;
    log(out, res.error ? 'err' : '');

    if (!withTests) return;

    attempts++;
    const items = $$('.test-item', host);
    res.tests.forEach((t, n) => {
      const el = items[n];
      if (!el) return;
      el.classList.toggle('pass', t.pass);
      el.classList.toggle('fail', !t.pass);
      $('.test-ic', el).textContent = t.pass ? '✅' : '❌';
      const detail = el.querySelector('.t-detail');
      if (detail) detail.remove();
      if (!t.pass && t.error) {
        const d = document.createElement('div');
        d.className = 't-detail';
        d.innerHTML = `<code>${esc(t.error)}</code>`;
        el.lastElementChild.appendChild(d);
      }
    });

    const lolos = res.tests.length > 0 && res.tests.every((t) => t.pass);
    if (lolos && !passed) {
      passed = true;
      opts.onPass && opts.onPass();
    } else if (!lolos) {
      if (attempts >= 2) $('#btnSol', host).classList.add('btn-primary');
      toast(`${res.tests.filter((t) => t.pass).length}/${res.tests.length} test lolos — coba lagi 💪`, 'bad');
    }
    return lolos;
  }

  $('#btnRun', host).onclick = () => execute(false);
  $('#btnSubmit', host).onclick = () => execute(true);
  $('#btnReset', host).onclick = () => {
    cm.setValue(coding.starter_code || '');
    toast('Editor dikembalikan ke kode awal');
  };
  let hintIdx = 0;
  $('#btnHint', host).onclick = () => {
    const hints = coding.hints || [];
    if (!hints.length) return toast('Lesson ini belum punya petunjuk');
    const h = hints[Math.min(hintIdx, hints.length - 1)];
    $('#hintBox', host).innerHTML = `<div class="hint-box">💡 <b>Petunjuk ${Math.min(hintIdx + 1, hints.length)}/${hints.length}:</b> ${esc(h)}</div>`;
    hintIdx++;
  };
  $('#btnSol', host).onclick = () => {
    modal({
      title: 'Lihat solusi?',
      body: '<p>Coba pakai petunjuk dulu — otak kamu belajar paling banyak justru waktu lagi mentok. Tetap mau lihat?</p>',
      actions: [
        { label: 'Balik ngoding' },
        { label: 'Tampilkan solusi', primary: true, onClick: () => { cm.setValue(coding.solution || ''); toast('Solusi dimuat. Baca pelan-pelan, lalu coba tulis ulang sendiri.'); } }
      ]
    });
  };
  return { editor: cm, run: execute };
}

/* ============================================================
   VIEW: Lesson
   ============================================================ */
const mdCache = new Map();
async function loadContent(id) {
  // materi yang diedit admin menang dari file bawaan
  const lesson = getLessonById(id);
  if (lesson && typeof lesson.content_md === 'string' && lesson.content_md.trim()) return lesson.content_md;
  if (mdCache.has(id)) return mdCache.get(id);
  try {
    const res = await fetch(`content/${id}.md`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    const text = await res.text();
    mdCache.set(id, text);
    return text;
  } catch (e) {
    return `> ⚠️ Materi belum bisa dimuat (${esc(String(e.message || e))}).\n\nKalau kamu membuka file ini langsung lewat \`file://\`, jalankan lewat server lokal dulu — contohnya \`python3 -m http.server\`.`;
  }
}

async function viewLesson(id) {
  const lesson = getLessonById(id);
  if (!lesson) return viewNotFound();
  setActiveNav('modules');
  const m = getModule(lesson.module_id);

  if (!isLessonUnlocked(id)) {
    app.className = 'app';
    app.innerHTML = `
      <div class="card center">
        <div style="font-size:2.4rem">🔒</div>
        <h2>Lesson ini belum terbuka</h2>
        <p class="muted">Selesaikan lesson sebelumnya dulu ya.</p>
        <a class="btn btn-primary" href="#/module/${m.id}">Lihat daftar lesson</a>
      </div>`;
    return;
  }

  const prog = Store.getLesson(id);
  const hasCoding = Boolean(lesson.coding);
  let step = prog.quiz && hasCoding && !prog.code ? 'code' : (prog.read && !prog.quiz ? 'quiz' : 'read');

  app.className = 'app wide';
  app.innerHTML = `
    <a class="muted" href="#/module/${m.id}" style="font-size:.85rem">← ${esc(m.title)}</a>
    <div class="lesson-head">
      <span class="pill">${m.icon} Lesson ${lesson.order}/${m.lessons.length}</span>
      <h1>${esc(lesson.title)}</h1>
      <span class="pill">⏱ ${lesson.duration} menit</span>
      ${lesson.runtime === 'pyodide-limited' ? '<span class="pill warn">runtime terbatas</span>' : ''}
      <div class="spacer"></div>
      <div class="steps" id="steps">
        <button data-step="read">1 · Materi</button>
        <button data-step="quiz">2 · Kuis</button>
        ${hasCoding ? '<button data-step="code">3 · Live Coding</button>' : ''}
      </div>
    </div>
    <div id="lessonBody"></div>`;

  const body = $('#lessonBody');

  function syncSteps() {
    const p = Store.getLesson(id);
    $$('#steps button').forEach((b) => {
      const s = b.dataset.step;
      b.classList.toggle('active', s === step);
      b.classList.toggle('done', Boolean(p[s === 'code' ? 'code' : s]));
      b.disabled = (s === 'quiz' && !p.read) || (s === 'code' && !p.quiz);
      b.onclick = () => { step = s; render(); };
    });
  }

  function maybeComplete() {
    if (Store.completeLesson(id, hasCoding)) {
      const nx = nextLesson(id);
      modal({
        title: '🎉 Lesson selesai!',
        body: `<p>Mantap! <b>${esc(lesson.title)}</b> sudah tuntas.</p>
               <p class="muted">Total XP kamu sekarang <b>${Store.state.data.xp}</b>.</p>
               ${nx ? `<p>Lesson berikutnya: <b>${esc(nx.title)}</b></p>` : '<p>Itu lesson terakhir di kurikulum ini!</p>'}`,
        actions: [
          { label: 'Tetap di sini' },
          nx ? { label: 'Lanjut →', primary: true, onClick: () => { location.hash = `#/lesson/${nx.id}`; } }
             : { label: 'Ke dashboard', primary: true, onClick: () => { location.hash = '#/dashboard'; } }
        ]
      });
    }
  }

  async function render() {
    syncSteps();
    if (body._cleanup) { body._cleanup(); body._cleanup = null; }

    if (step === 'read') {
      body.innerHTML = '<div class="big-loader"><span class="loader"></span> Memuat materi…</div>';
      const text = await loadContent(id);
      const p = Store.getLesson(id);
      body.innerHTML = `
        <div class="pane">
          <div class="pane-head">📖 Materi</div>
          <div class="pane-body">
            <div class="objectives">
              <b>Tujuan lesson</b>
              <ul>${lesson.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
            </div>
            <div class="md">${md(text)}</div>
            <hr class="hr">
            <div class="row">
              <button class="btn btn-primary" id="doneRead">${p.read ? 'Lanjut ke kuis →' : 'Sudah paham, lanjut kuis → +10 XP'}</button>
            </div>
          </div>
        </div>`;
      $('#doneRead').onclick = () => {
        const r = Store.markLessonPart(id, 'read');
        if (r.gained) toast('+10 XP · materi dibaca', 'ok');
        step = 'quiz'; render();
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (step === 'quiz') {
      body.innerHTML = `
        <div class="pane" style="max-width:720px;margin:0 auto">
          <div class="pane-head">🧠 Kuis Teori — minimal ${Math.round(PASS_QUIZ * 100)}% benar</div>
          <div class="pane-body" id="quizHost"></div>
        </div>`;
      const qs = shuffle(lesson.quiz.slice());
      renderQuiz($('#quizHost'), qs, {
        immediate: true,
        onFinish: (score) => {
          const pct = Math.round(score * 100);
          const lulus = score >= PASS_QUIZ;
          $('#quizHost').innerHTML = `
            <div class="center" style="padding:20px 0">
              <div style="font-size:3rem">${lulus ? '🎉' : '😅'}</div>
              <h2 style="margin:6px 0">${pct}%</h2>
              <p class="muted">${lulus ? 'Lulus! Kuis ini selesai.' : `Belum lulus — butuh minimal ${Math.round(PASS_QUIZ * 100)}%. Baca ulang pembahasannya lalu coba lagi.`}</p>
              <div class="row" style="justify-content:center;margin-top:16px">
                <button class="btn" id="qAgain">Ulangi kuis</button>
                ${lulus ? `<button class="btn btn-primary" id="qNext">${hasCoding ? 'Lanjut live coding →' : 'Selesaikan lesson →'}</button>` : '<button class="btn btn-ghost" id="qBack">Baca materi lagi</button>'}
              </div>
            </div>`;
          if (lulus) {
            const r = Store.markLessonPart(id, 'quiz', { quizScore: pct });
            if (r.gained) toast('+20 XP · kuis lulus', 'ok');
            syncSteps();
            $('#qNext').onclick = () => {
              if (hasCoding) { step = 'code'; render(); }
              else maybeComplete();
            };
            if (!hasCoding) maybeComplete();
          } else {
            $('#qBack').onclick = () => { step = 'read'; render(); };
          }
          $('#qAgain').onclick = () => render();
        }
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (step === 'code') {
      const c = lesson.coding;
      body.innerHTML = `
        <div class="split">
          <div class="pane">
            <div class="pane-head">🎯 Tantangan</div>
            <div class="pane-body pane-scroll">
              <div class="md">${md(c.prompt)}</div>
              ${lesson.runtime === 'pyodide-limited' ? '<div class="hint-box">⚠️ Lesson ini punya keterbatasan di browser. Yang diuji di sini adalah logikanya; versi lengkapnya dijalankan di komputermu.</div>' : ''}
              <hr class="hr">
              <div class="muted" style="font-size:.84rem">
                <b>Test case yang akan dijalankan:</b>
                <ul style="padding-left:1.1em;margin:8px 0 0">
                  ${c.tests.map((t) => `<li>${esc(t.name)}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
          <div id="codeHost"></div>
        </div>`;
      const host = $('#codeHost');
      renderCoding(host, c, {
        storageKey: id,
        onPass: () => {
          const r = Store.markLessonPart(id, 'code');
          if (r.gained) toast('+30 XP · semua test lolos!', 'ok');
          syncSteps();
          maybeComplete();
        }
      });
      body._cleanup = host._cleanup;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  render();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ============================================================
   VIEW: Ujian Modul
   ============================================================ */
function buildExamPool(m) {
  const pool = [];
  m.lessons.forEach((l) => (l.quiz || []).forEach((q) => pool.push(q)));
  (m.exam.extraQuestions || []).forEach((q) => pool.push(q));
  return pool;
}

function viewExam(moduleId) {
  const m = getModule(moduleId);
  if (!m || !m.exam) return viewNotFound();
  setActiveNav('modules');
  const st = moduleStats(m);
  app.className = 'app';

  if (!st.examUnlocked) {
    app.innerHTML = `
      <div class="card center">
        <div style="font-size:2.4rem">🔒</div>
        <h2>Ujian belum terbuka</h2>
        <p class="muted">Selesaikan semua lesson di modul ini dulu (${st.done}/${st.total}).</p>
        <a class="btn btn-primary" href="#/module/${m.id}">Kembali ke modul</a>
      </div>`;
    return;
  }

  const prev = Store.getExam(m.id);
  app.innerHTML = `
    <a class="muted" href="#/module/${m.id}" style="font-size:.85rem">← ${esc(m.title)}</a>
    <div class="card" style="max-width:720px;margin:16px auto;text-align:center">
      <div style="font-size:2.6rem">🎓</div>
      <h1 style="margin:6px 0;font-size:1.5rem;letter-spacing:-.6px">${esc(m.exam.title)}</h1>
      <p class="muted">${m.exam.questionCount} soal teori (acak dari seluruh modul) + ${m.exam.coding.length} soal live coding.</p>
      <div class="row" style="justify-content:center;margin:14px 0">
        <span class="pill">Nilai lulus ≥ ${m.exam.passScore}%</span>
        <span class="pill">Teori 50% · Coding 50%</span>
        ${prev.attempts ? `<span class="pill ${prev.passed ? 'ok' : 'warn'}">Percobaan ${prev.attempts} · terbaik ${prev.score}%</span>` : ''}
      </div>
      <p class="muted" style="font-size:.85rem">Soal teori tidak diberi jawaban sampai ujian selesai. Boleh diulang sebanyak yang kamu mau.</p>
      <button class="btn btn-primary" id="startExam">${prev.attempts ? 'Ulangi ujian' : 'Mulai ujian'} →</button>
    </div>`;

  $('#startExam').onclick = () => runExam(m);
}

function runExam(m) {
  const pool = shuffle(buildExamPool(m).slice());
  const qs = pool.slice(0, Math.min(m.exam.questionCount, pool.length));
  const codings = m.exam.coding || [];
  let theoryScore = 0;
  let theoryResults = [];
  let codeIdx = 0;
  let codePassed = 0;

  app.className = 'app wide';
  app.innerHTML = '<div id="examHost"></div>';
  const host = $('#examHost');

  function phaseTheory() {
    host.className = 'app';
    host.innerHTML = `
      <div class="pane" style="max-width:720px;margin:0 auto">
        <div class="pane-head">📝 Bagian 1 — Teori (${qs.length} soal)</div>
        <div class="pane-body" id="qHost"></div>
      </div>`;
    renderQuiz($('#qHost'), qs, {
      immediate: false,
      onFinish: (score, results) => {
        theoryScore = score;
        theoryResults = results;
        if (codings.length) phaseCoding();
        else finish();
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function phaseCoding() {
    const c = codings[codeIdx];
    host.innerHTML = `
      <div class="row" style="margin-bottom:12px">
        <span class="pill">⌨️ Bagian 2 — Coding ${codeIdx + 1}/${codings.length}</span>
        <span class="pill">Teori: ${Math.round(theoryScore * 100)}%</span>
        <div class="spacer"></div>
        <button class="btn btn-sm btn-ghost" id="skipCode">Lewati soal ini</button>
      </div>
      <div class="split">
        <div class="pane">
          <div class="pane-head">🎯 Soal</div>
          <div class="pane-body pane-scroll"><div class="md">${md(c.prompt)}</div></div>
        </div>
        <div id="codeHost"></div>
      </div>`;
    renderCoding($('#codeHost'), c, {
      storageKey: `exam-${m.id}-${c.id}`,
      onPass: () => {
        codePassed++;
        toast('Soal coding lolos! ✅', 'ok');
        setTimeout(nextCode, 700);
      }
    });
    $('#skipCode').onclick = () => {
      modal({
        title: 'Lewati soal ini?',
        body: '<p>Soal yang dilewati dihitung nol untuk bagian coding.</p>',
        actions: [{ label: 'Batal' }, { label: 'Lewati', primary: true, onClick: nextCode }]
      });
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function nextCode() {
    codeIdx++;
    if (codeIdx < codings.length) phaseCoding();
    else finish();
  }

  function finish() {
    const codeScore = codings.length ? codePassed / codings.length : 1;
    const total = Math.round((theoryScore * 50) + (codeScore * 50));
    const lulus = total >= m.exam.passScore;
    const baru = Store.recordExam(m.id, total, lulus);
    if (baru) toast('+100 XP · ujian modul lulus!', 'ok');

    const review = qs.map((q, i) => theoryResults[i] === true ? '' : `
      <div class="feedback bad" style="margin-bottom:10px">
        <b>${esc(q.question)}</b>
        ${q.code ? `<pre class="q-code" style="margin:8px 0">${esc(q.code)}</pre>` : ''}
        <div>Jawaban benar: <code>${esc(
          q.type === 'mcq' ? q.options[q.answer] : q.type === 'true_false' ? (q.answer ? 'Benar' : 'Salah') : q.answer
        )}</code></div>
        <div class="muted" style="margin-top:4px">${esc(q.explanation || '')}</div>
      </div>`).join('');

    host.className = 'app';
    host.innerHTML = `
      <div class="card" style="max-width:760px;margin:0 auto;text-align:center">
        <div style="font-size:3rem">${lulus ? '🏅' : '😤'}</div>
        <h1 style="margin:4px 0;font-size:2rem">${total}%</h1>
        <p class="muted">${lulus ? `Selamat! Kamu lulus ${esc(m.title)} dan mendapat badge ${m.badge.icon} <b>${esc(m.badge.name)}</b>.` : `Butuh ${m.exam.passScore}% untuk lulus. Hampir — pelajari lagi bagian yang salah lalu ulangi.`}</p>
        <div class="row" style="justify-content:center;margin:16px 0">
          <span class="pill">Teori ${Math.round(theoryScore * 100)}%</span>
          <span class="pill">Coding ${codePassed}/${codings.length}</span>
        </div>
        <div class="row" style="justify-content:center">
          <a class="btn" href="#/module/${m.id}">Kembali ke modul</a>
          ${lulus ? `<a class="btn btn-primary" href="#/cert/${m.id}">Lihat sertifikat →</a>` : `<button class="btn btn-primary" id="retry">Ulangi ujian</button>`}
        </div>
      </div>
      ${review.trim() ? `<h2 class="section-title" style="font-size:1.15rem">Pembahasan soal yang salah</h2><div style="max-width:760px;margin:0 auto">${review}</div>` : ''}`;
    const r = $('#retry');
    if (r) r.onclick = () => runExam(m);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  phaseTheory();
}

/* ============================================================
   VIEW: Dashboard
   ============================================================ */
let statsPeriod = 'week';

function viewDashboard() {
  setActiveNav('dashboard');
  app.className = 'app';
  const d = Store.state.data;
  const nama = d.name || 'Pembelajar';
  const inisial = nama.trim().charAt(0).toUpperCase() || '🙂';
  const pct = overallPercent();
  const doneLessons = flatLessons.filter((l) => lessonDone(l.id)).length;
  const codingDone = flatLessons.filter((l) => l.coding && Store.getLesson(l.id).code).length;
  const ring = ringkasanBelajar();
  const lanjut = flatLessons.find((l) => !lessonDone(l.id)) || flatLessons[flatLessons.length - 1];

  /* --- strip hari dalam minggu ini --- */
  const mapMenit = minutesByDay();
  const senin = startOfWeek(new Date());
  const hariIni = dateKey(new Date());
  const strip = HARI.map((label, i) => {
    const tgl = shiftDays(senin, i);
    const k = dateKey(tgl);
    const aktif = (mapMenit[k] || 0) > 0;
    const nanti = tgl > new Date() && k !== hariIni;
    return `
      <div class="day ${aktif ? 'done' : ''} ${k === hariIni ? 'today' : ''} ${nanti ? 'future' : ''}">
        <i>${aktif ? '✓' : ''}</i>
        <span>${label}</span>
      </div>`;
  }).join('');

  /* --- kartu carousel "lanjut belajar" --- */
  const kandidat = modules.filter((m) => moduleUnlocked(m) && !moduleStats(m).finished);
  const sisa = modules.filter((m) => !kandidat.includes(m));
  const daftar = kandidat.concat(sisa).slice(0, 6);
  const kartu = daftar.map((m, i) => {
    const st = moduleStats(m);
    const buka = moduleUnlocked(m);
    return `
      <a class="course-card ${buka ? '' : 'locked'}" href="${buka ? `#/module/${m.id}` : '#/modules'}" style="--card-tint:var(--tint-${['lilac', 'blue', 'pink', 'mint', 'peach', 'sky'][i % 6]})">
        <div class="cc-top">
          <div class="cc-icon">${m.icon}</div>
          <span class="cc-arrow">${buka ? '↗' : '🔒'}</span>
        </div>
        <h3>${esc(m.title)}</h3>
        <span class="cc-meta">${m.lessons.length} lesson · ${st.completed}/${st.allTotal} selesai</span>
        <div class="cc-progress"><i style="width:${st.percent}%"></i></div>
      </a>`;
  }).join('');

  /* --- bar chart --- */
  const bars = seriesBelajar(statsPeriod);
  const maks = Math.max(...bars.map((b) => b.value), 30);
  const chart = `
    <div class="chart-bars">
      ${bars.map((b) => `
        <div class="bar-col" title="${b.label}: ${b.value} menit">
          <i class="bar ${b.active ? 'active' : ''}" style="height:${Math.max((b.value / maks) * 100, 6)}%"></i>
        </div>`).join('')}
    </div>
    <div class="chart-labels">
      ${bars.map((b) => `<span class="${b.active ? 'active' : ''}">${b.label}</span>`).join('')}
    </div>`;

  const badges = modules.map((m) => ({ ...m.badge, earned: moduleStats(m).finished }));
  badges.push({ ...capstone.badge, earned: capstoneProgress().finished });

  app.innerHTML = `
    <header class="home-head">
      <div>
        <span class="home-hi">Halo, ${esc(nama)}</span>
        <h1>Selamat datang kembali</h1>
      </div>
      <button class="avatar" id="avatarBtn" title="Ubah nama & akun">${esc(inisial)}</button>
    </header>

    <section class="week-card">
      <div class="week-head">
        <b>Progres minggu ini</b>
        <span class="week-ic">🗓️</span>
      </div>
      <div class="week-days">${strip}</div>
      <a class="btn btn-primary btn-block" href="#/lesson/${lanjut.id}">
        ${doneLessons ? 'Lanjutkan belajar' : 'Mulai lesson pertama'}
      </a>
    </section>

    <div class="sec-head">
      <h2>Lanjut belajar</h2>
      <a href="#/modules">Lihat semua</a>
    </div>
    <div class="carousel">${kartu}</div>

    <section class="stats-card">
      <div class="stats-head">
        <h2>Statistik</h2>
        <button class="period-pill" id="periodBtn">
          ${statsPeriod === 'week' ? 'Mingguan' : 'Bulanan'}
          <span class="pp-chev">⌄</span>
        </button>
      </div>
      <div class="big-metric">${fmtJam(statsPeriod === 'week' ? ring.mingguIni : bars.reduce((a, b) => a + b.value, 0))}</div>
      <p class="metric-sub">
        ${statsPeriod === 'week' ? 'Waktu belajar minggu ini' : 'Waktu belajar 4 minggu terakhir'}
        ${deltaPill(ring.deltaMinggu)}
      </p>
      <div class="chart">${chart}</div>
    </section>

    <h2 class="section-title">Performa kamu</h2>
    <div class="perf-grid">
      <div class="perf-card" style="--card-tint:var(--tint-blue)">
        <div class="perf-icon">🕐</div>
        <b>${fmtJam(ring.total)}</b>
        <span>Total waktu belajar</span>
        ${deltaPill(ring.deltaMinggu)}
      </div>
      <div class="perf-card" style="--card-tint:var(--tint-peach)">
        <div class="perf-icon">⏳</div>
        <b>${fmtJam(ring.rataPerHari)}</b>
        <span>Rata-rata per hari aktif</span>
        <span class="delta flat">${ring.hariAktif} hari aktif</span>
      </div>
      <div class="perf-card" style="--card-tint:var(--tint-lilac)">
        <div class="perf-icon">⚡</div>
        <b>${d.xp || 0}</b>
        <span>Total XP</span>
        <span class="delta flat">🔥 streak ${(d.streak && d.streak.count) || 0} hari</span>
      </div>
      <div class="perf-card" style="--card-tint:var(--tint-mint)">
        <div class="perf-icon">✅</div>
        <b>${doneLessons}/${totalLessons}</b>
        <span>Lesson selesai</span>
        <span class="delta flat">${codingDone} coding lolos</span>
      </div>
    </div>

    <h2 class="section-title">Progres per modul</h2>
    <div class="grid" style="gap:10px">
      ${modules.map((m) => {
        const st = moduleStats(m);
        return `
        <a class="card mod-progress" href="#/module/${m.id}">
          <div class="row" style="justify-content:space-between">
            <b style="font-size:.95rem">${m.icon} ${esc(m.title)}</b>
            <span class="muted" style="font-size:.8rem">${st.completed}/${st.allTotal}${st.examPassed ? ' · ujian lulus' : ''}</span>
          </div>
          <div class="progress" style="margin-top:10px"><i style="width:${st.percent}%"></i></div>
        </a>`;
      }).join('')}
    </div>

    <h2 class="section-title">Badge</h2>
    <div class="badge-grid">
      ${badges.map((b) => `
        <div class="badge ${b.earned ? 'earned' : ''}">
          <div class="bic">${b.icon}</div>
          <b>${esc(b.name)}</b>
          <span>${b.earned ? 'Didapat' : esc(b.desc)}</span>
        </div>`).join('')}
    </div>

    <h2 class="section-title">Cara mendapat XP</h2>
    <div class="card">
      <div class="row" style="gap:18px">
        <span>📖 Baca materi <b>+${Store.XP.read}</b></span>
        <span>🧠 Lulus kuis <b>+${Store.XP.quiz}</b></span>
        <span>⌨️ Coding lolos <b>+${Store.XP.coding}</b></span>
        <span>🎓 Lulus ujian <b>+${Store.XP.exam}</b></span>
        <span>🏆 Proyek akhir <b>+${Store.XP.capstone}</b></span>
      </div>
    </div>`;

  $('#periodBtn').onclick = () => {
    statsPeriod = statsPeriod === 'week' ? 'month' : 'week';
    viewDashboard();
  };
  $('#avatarBtn').onclick = () => $('#userBtn').click();
}

/* ============================================================
   VIEW: Sertifikat
   ============================================================ */
function viewCertificates() {
  setActiveNav('certificates');
  app.className = 'app';
  const earned = modules.filter((m) => moduleStats(m).finished);
  const finalReady = allModulesFinished() && capstoneProgress().finished;

  app.innerHTML = `
    <h1 style="font-size:1.7rem;letter-spacing:-.8px;margin:6px 0 2px">Sertifikat</h1>
    <p class="section-sub">Satu sertifikat per modul yang lulus ujian, plus satu sertifikat kurikulum setelah proyek akhir.</p>
    <div class="module-grid">
      ${modules.map((m) => {
        const ok = moduleStats(m).finished;
        return `
        <a class="module-card ${ok ? '' : 'locked'}" href="${ok ? `#/cert/${m.id}` : '#/certificates'}">
          <div class="mc-top"><div class="mc-icon">${m.badge.icon}</div>
            ${ok ? '<span class="pill ok">Terbuka</span>' : '<span class="pill lock">🔒</span>'}</div>
          <h3>${esc(m.title)}</h3>
          <p class="mc-desc">${ok ? `Lulus pada ${fmtDate(Store.getExam(m.id).at)}` : 'Selesaikan semua lesson dan ujian modul ini.'}</p>
        </a>`;
      }).join('')}
      <a class="module-card ${finalReady ? '' : 'locked'}" href="${finalReady ? '#/cert/final' : '#/certificates'}">
        <div class="mc-top"><div class="mc-icon">🎖️</div>
          ${finalReady ? '<span class="pill ok">Terbuka</span>' : '<span class="pill lock">🔒</span>'}</div>
        <h3>Sertifikat Kurikulum</h3>
        <p class="mc-desc">${finalReady ? 'Semua modul dan proyek akhir selesai.' : 'Butuh semua modul lulus + checklist proyek akhir lengkap.'}</p>
      </a>
    </div>`;
}

function viewCertificate(which) {
  setActiveNav('certificates');
  app.className = 'app';
  const isFinal = which === 'final';
  const m = isFinal ? null : getModule(which);
  const ok = isFinal ? (allModulesFinished() && capstoneProgress().finished) : (m && moduleStats(m).finished);

  if (!ok) {
    app.innerHTML = `
      <div class="card center"><div style="font-size:2.4rem">🔒</div>
      <h2>Sertifikat belum terbuka</h2>
      <p class="muted">Selesaikan dulu syaratnya ya.</p>
      <a class="btn btn-primary" href="#/certificates">Kembali</a></div>`;
    return;
  }

  const nama = Store.state.data.name || 'Peserta Learnify';
  const tgl = isFinal ? Date.now() : Store.getExam(m.id).at;
  const kode = (isFinal ? 'LRN-FINAL-' : `LRN-${m.id.toUpperCase()}-`) +
    String(Math.abs(hashCode(nama + (m ? m.id : 'final')))).slice(0, 6);

  app.innerHTML = `
    <div class="row no-print" style="margin-bottom:14px">
      <a class="btn btn-sm" href="#/certificates">← Semua sertifikat</a>
      <div class="spacer"></div>
      <button class="btn btn-sm btn-primary" onclick="window.print()">🖨 Cetak / Simpan PDF</button>
    </div>
    <div class="cert">
      <div class="c-kicker">Sertifikat Penyelesaian</div>
      <h2>${isFinal ? 'Kurikulum Python: Dasar → Advance' : esc(m.title)}</h2>
      <p class="muted" style="margin:0">${isFinal ? 'Learnify — Python untuk Automation Testing' : esc(m.tagline)}</p>
      <div class="c-name">${esc(nama)}</div>
      <p class="muted" style="max-width:52ch;margin:0 auto">
        ${isFinal
          ? `telah menyelesaikan seluruh ${modules.length} modul, ${totalLessons} lesson, seluruh ujian modul, dan proyek akhir berupa framework automation test.`
          : `telah menyelesaikan seluruh ${m.lessons.length} lesson dan lulus ujian modul dengan skor ${Store.getExam(m.id).score}%.`}
      </p>
      <div style="font-size:3rem;margin-top:18px">${isFinal ? '🎖️' : m.badge.icon}</div>
      <div class="c-meta">
        <div><b>Tanggal</b><br>${fmtDate(tgl)}</div>
        <div><b>Kode</b><br>${kode}</div>
        <div><b>XP</b><br>${Store.state.data.xp}</div>
      </div>
    </div>`;
}

function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return h;
}

/* ============================================================
   VIEW: Proyek Akhir
   ============================================================ */
async function viewCapstone() {
  setActiveNav('modules');
  app.className = 'app wide';
  const unlocked = allModulesFinished();
  if (!unlocked) {
    app.innerHTML = `
      <div class="card center"><div style="font-size:2.4rem">🔒</div>
      <h2>Proyek Akhir masih terkunci</h2>
      <p class="muted">Selesaikan semua modul (termasuk ujiannya) dulu.</p>
      <a class="btn btn-primary" href="#/modules">Lihat katalog</a></div>`;
    return;
  }

  app.innerHTML = '<div class="big-loader"><span class="loader"></span> Memuat…</div>';
  const text = await loadContent('capstone');
  const c = Store.state.data.capstone || {};
  const cp = capstoneProgress();

  app.innerHTML = `
    <a class="muted" href="#/modules" style="font-size:.85rem">← Katalog modul</a>
    <div class="lesson-head"><span class="pill">🏆 Capstone</span><h1>${esc(capstone.title)}</h1></div>
    <div class="split">
      <div class="pane">
        <div class="pane-head">📖 Panduan proyek</div>
        <div class="pane-body pane-scroll"><div class="md">${md(text)}</div></div>
      </div>
      <div>
        <div class="pane">
          <div class="pane-head">✅ Checklist penilaian — ${cp.done}/${cp.total}</div>
          <div class="pane-body">
            <div class="progress" style="margin-bottom:14px"><i style="width:${Math.round(cp.done / cp.total * 100)}%"></i></div>
            <div id="checks">
              ${capstone.checklist.map((item) => `
                <label class="opt ${c[item.id] ? 'correct' : ''}" data-check="${item.id}">
                  <span class="mark">${c[item.id] ? '✓' : ''}</span>
                  <span>${esc(item.text)}</span>
                </label>`).join('')}
            </div>
            <hr class="hr">
            <label class="muted" style="font-size:.82rem">Link repo GitHub</label>
            <input class="answer-input" id="repoInput" placeholder="https://github.com/username/qa-framework"
              value="${esc(c.repo || '')}" style="margin-top:6px">
            <p class="muted" style="font-size:.78rem;margin-top:8px">Progres checklist disimpan otomatis.</p>
            ${cp.finished ? '<a class="btn btn-primary btn-block" href="#/cert/final" style="margin-top:12px">🎖️ Ambil sertifikat kurikulum</a>' : ''}
          </div>
        </div>
      </div>
    </div>`;

  $$('[data-check]').forEach((el) => el.addEventListener('click', () => {
    const id = el.dataset.check;
    const cur = Store.state.data.capstone || {};
    const next = !cur[id];
    Store.setCapstone(id, next);
    if (next && capstoneProgress().finished) {
      Store.addXP(Store.XP.capstone, 'capstone');
      toast('🏆 Proyek akhir selesai! +200 XP', 'ok');
    }
    viewCapstone();
  }));
  const repo = $('#repoInput');
  repo.addEventListener('change', () => { Store.setCapstone('repo', repo.value.trim()); toast('Link repo disimpan', 'ok'); });
}

/* ============================================================
   VIEW: Tentang
   ============================================================ */
function viewAbout() {
  setActiveNav('about');
  app.className = 'app';
  app.innerHTML = `
    <h1 style="font-size:1.7rem;letter-spacing:-.8px">Tentang Learnify</h1>
    <div class="card md" style="max-width:760px">
      <p>Learnify adalah platform belajar Python satu halaman yang jalan sepenuhnya di browser.
      Materi, kuis, dan live coding ada dalam satu alur, dan progresnya dikunci berurutan supaya
      fondasinya benar-benar terbentuk.</p>

      <h3>Cara kerjanya</h3>
      <ul>
        <li><b>Pyodide</b> menjalankan CPython lewat WebAssembly di dalam Web Worker — kode kamu dieksekusi sungguhan.</li>
        <li><b>CodeMirror</b> jadi editornya, lengkap dengan syntax highlighting Python.</li>
        <li>Tiap tantangan dinilai oleh test case yang dijalankan di Pyodide, dengan batas waktu 15 detik untuk mencegah infinite loop.</li>
        <li>Progres disimpan di <b>localStorage</b>, dan otomatis disinkronkan ke <b>Firebase Firestore</b> kalau konfigurasinya diisi.</li>
      </ul>

      <h3>Aturan progres</h3>
      <ul>
        <li>Lesson dianggap selesai kalau kuis ≥ 70% <b>dan</b> semua test coding lolos.</li>
        <li>Ujian modul terbuka setelah semua lesson di modul selesai; lulus kalau skor ≥ 75%.</li>
        <li>Proyek akhir terbuka setelah semua modul lulus.</li>
      </ul>

      <h3>Catatan runtime</h3>
      <p>Beberapa lesson ditandai <span class="pill warn">runtime terbatas</span> — misalnya <code>requests</code>
      dan Playwright yang butuh jaringan atau browser sungguhan. Di lesson itu yang diuji adalah logikanya;
      versi lengkapnya dikerjakan di komputermu sendiri.</p>

      <h3>Data kamu</h3>
      <p>Progres bisa diexport dan diimport sebagai file JSON lewat menu 👤 di kanan atas.</p>
    </div>`;
}

/* ============================================================
   VIEW: Login (gerbang masuk)
   ============================================================ */
let pendingRoute = null;

/** Pratinjau tanpa Firebase — hanya bisa diaktifkan kalau config belum diisi. */
function previewMode() {
  try { return sessionStorage.getItem('learnify:preview') === '1'; } catch (_) { return false; }
}
function enablePreview() {
  try { sessionStorage.setItem('learnify:preview', '1'); } catch (_) {}
}

function viewLogin() {
  setActiveNav('');
  app.className = 'app';

  if (!Store.state.cloud) {
    app.innerHTML = `
      <div class="login-wrap">
        <div class="login-card">
          <div class="login-mark">🔧</div>
          <h1>Firebase belum dikonfigurasi</h1>
          <p class="muted">Learnify menyimpan semua progres di Firebase dan memakai login Google.
          Isi dulu <code>js/firebase-config.js</code> supaya fiturnya aktif.</p>
          <ol class="login-steps">
            <li>Buat project di <b>console.firebase.google.com</b></li>
            <li>Project settings → Your apps → Web → salin <code>firebaseConfig</code></li>
            <li>Authentication → Sign-in method → aktifkan <b>Google</b></li>
            <li>Firestore Database → Create database</li>
            <li>Tempel Firestore Rules (ada di komentar file config)</li>
            <li>Isi <code>ADMIN_EMAILS</code> dengan emailmu</li>
          </ol>
          <button class="btn btn-primary btn-block" id="previewBtn">Pratinjau tanpa login →</button>
          <p class="muted" style="font-size:.78rem;margin-top:10px">Mode pratinjau dipakai untuk mengecek tampilan
          sebelum Firebase aktif. Progres cuma tersimpan di browser ini.</p>
        </div>
      </div>`;
    $('#previewBtn').onclick = () => {
      enablePreview();
      const tujuan = pendingRoute && pendingRoute !== '/login' ? pendingRoute : '/dashboard';
      pendingRoute = null;
      if (location.hash === '#' + tujuan) route(); else location.hash = '#' + tujuan;
    };
    return;
  }

  app.innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-mark">🐍</div>
        <h1>Masuk untuk mulai belajar</h1>
        <p class="muted">Progres, XP, badge, dan sertifikatmu disimpan di akun Google —
        jadi bisa dilanjutkan dari laptop maupun HP.</p>

        <button class="btn btn-google btn-block" id="googleBtn">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z"/>
            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"/>
            <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1Z"/>
            <path fill="#EA4335" d="M12 4.7c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.7 12 4.7Z"/>
          </svg>
          Masuk dengan Google
        </button>

        <p class="login-note">Learnify hanya membaca nama, email, dan foto profilmu untuk
        menandai progres. Tidak ada akses ke email atau file kamu.</p>
        <a class="muted" href="#/about" style="font-size:.84rem;text-decoration:underline">Tentang Learnify</a>
      </div>
    </div>`;

  $('#googleBtn').onclick = async () => {
    const b = $('#googleBtn');
    b.disabled = true;
    b.innerHTML = '<span class="loader"></span> Membuka Google…';
    try {
      await Store.signInGoogle();
    } catch (e) {
      b.disabled = false;
      b.textContent = 'Coba lagi masuk dengan Google';
      const pesan = e.code === 'auth/popup-closed-by-user' ? 'Jendela Google ditutup sebelum selesai.'
        : e.code === 'auth/unauthorized-domain' ? 'Domain ini belum didaftarkan di Firebase → Authentication → Settings → Authorized domains.'
        : (e.message || String(e));
      toast('Gagal masuk: ' + esc(pesan), 'bad');
    }
  };
}

/* ============================================================
   VIEW: Admin — kelola materi
   ============================================================ */
const adminState = { lessonId: null, tab: 'materi', draft: null, dirty: false };

function adminDocFromLesson(l) {
  return {
    id: l.id,
    module_id: l.module_id,
    order: l.order,
    title: l.title || '',
    duration: l.duration || 15,
    objectives: l.objectives || [],
    runtime: l.runtime || 'pyodide',
    content_md: typeof l.content_md === 'string' ? l.content_md : null,
    quiz: l.quiz || [],
    coding: l.coding || null
  };
}

async function viewAdmin() {
  setActiveNav('admin');
  app.className = 'app wide';

  if (!Store.isAdmin()) {
    app.innerHTML = `
      <div class="card center">
        <div style="font-size:2.4rem">⛔️</div>
        <h2>Halaman khusus admin</h2>
        <p class="muted">Akun <b>${esc((Store.state.user && Store.state.user.email) || 'ini')}</b> belum terdaftar sebagai admin.
        Tambahkan emailmu ke <code>ADMIN_EMAILS</code> di <code>js/firebase-config.js</code>
        dan ke Firestore Rules.</p>
        <a class="btn btn-primary" href="#/">Kembali</a>
      </div>`;
    return;
  }

  if (!adminState.lessonId) adminState.lessonId = flatLessons[0].id;
  let lesson = getLessonById(adminState.lessonId);
  if (!lesson) { adminState.lessonId = flatLessons[0].id; lesson = flatLessons[0]; }

  // materi yang belum pernah diedit diambil dari file .md supaya bisa langsung disunting
  if (!adminState.draft || adminState.draft.id !== lesson.id) {
    const doc = adminDocFromLesson(lesson);
    if (doc.content_md === null) doc.content_md = await loadContent(lesson.id);
    adminState.draft = doc;
    adminState.dirty = false;
  }
  const draft = adminState.draft;
  const diubah = Content.isOverridden(lesson.id);
  const custom = Content.isCustom(lesson.id);
  const ov = Content.getOverride(lesson.id);

  const pilihan = modules.map((m) => `
    <optgroup label="${esc(m.icon + ' ' + m.title)}">
      ${m.lessons.map((l) => `
        <option value="${l.id}" ${l.id === lesson.id ? 'selected' : ''}>
          ${l.order}. ${esc(l.title)}${Content.isOverridden(l.id) ? ' •' : ''}
        </option>`).join('')}
    </optgroup>`).join('');

  app.innerHTML = `
    <div class="admin-head">
      <div>
        <span class="pill warn">★ Mode Admin</span>
        <h1>Kelola Materi</h1>
        <p class="muted" style="margin:2px 0 0;font-size:.88rem">
          Perubahan disimpan ke Firestore koleksi <code>content</code> dan langsung terlihat oleh semua pengguna.
          Tanda <b>•</b> berarti lesson itu sudah pernah diubah.
        </p>
      </div>
      <div class="row">
        <button class="btn btn-sm" id="admNew">＋ Lesson baru</button>
        <button class="btn btn-sm" id="admTemplate">📋 Template</button>
        <button class="btn btn-sm" id="admExport">⬇︎ Export semua</button>
        <button class="btn btn-sm" id="admImport">⬆︎ Import</button>
      </div>
    </div>

    <div class="admin-bar">
      <select class="admin-select" id="admPick">${pilihan}</select>
      <span class="pill ${custom ? 'warn' : diubah ? 'ok' : ''}">
        ${custom ? 'Lesson tambahan' : diubah ? 'Sudah diubah admin' : 'Versi bawaan'}
      </span>
      ${ov && ov.updatedAt ? `<span class="muted" style="font-size:.78rem">Terakhir diubah ${fmtDate(ov.updatedAt)} oleh ${esc(ov.updatedBy || '-')}</span>` : ''}
      <div class="spacer"></div>
      <a class="btn btn-sm btn-ghost" href="#/lesson/${lesson.id}" target="_self">Lihat sebagai siswa ↗</a>
    </div>

    <div class="split">
      <div class="pane">
        <div class="pane-head">✏️ Editor</div>
        <div class="pane-body">
          <div class="admin-grid2">
            <div>
              <label class="fl">Judul lesson</label>
              <input class="answer-input" id="fTitle" value="${esc(draft.title)}">
            </div>
            <div>
              <label class="fl">Durasi (menit)</label>
              <input class="answer-input" id="fDur" type="number" min="1" value="${draft.duration}">
            </div>
          </div>

          <div class="admin-grid2" style="margin-top:14px">
            <div>
              <label class="fl">ID lesson</label>
              <input class="answer-input" id="fId" value="${esc(draft.id)}" ${custom ? '' : 'readonly'}>
            </div>
            <div>
              <label class="fl">Runtime</label>
              <select class="answer-input" id="fRuntime">
                <option value="pyodide" ${draft.runtime !== 'pyodide-limited' ? 'selected' : ''}>pyodide (normal)</option>
                <option value="pyodide-limited" ${draft.runtime === 'pyodide-limited' ? 'selected' : ''}>pyodide-limited (terbatas)</option>
              </select>
            </div>
          </div>

          <label class="fl" style="margin-top:14px">Tujuan lesson — satu per baris</label>
          <textarea class="answer-input mono" id="fObj" rows="3">${esc((draft.objectives || []).join('\n'))}</textarea>

          <div class="steps admin-tabs" id="admTabs" style="margin:18px 0 14px">
            <button data-tab="materi" class="${adminState.tab === 'materi' ? 'active' : ''}">Materi (Markdown)</button>
            <button data-tab="kuis" class="${adminState.tab === 'kuis' ? 'active' : ''}">Kuis (JSON)</button>
            <button data-tab="coding" class="${adminState.tab === 'coding' ? 'active' : ''}">Live coding (JSON)</button>
          </div>

          <div id="admPanel"></div>

          <div class="row" style="margin-top:18px">
            <button class="btn btn-primary" id="admSave">💾 Simpan ke Firebase</button>
            <button class="btn btn-sm" id="admTest">▶︎ Tes solusi coding</button>
            <div class="spacer"></div>
            ${diubah ? `<button class="btn btn-sm" id="admRevert" style="border-color:var(--danger);color:var(--danger)">
              ${custom ? 'Hapus lesson ini' : 'Kembalikan ke bawaan'}</button>` : ''}
          </div>
          <div id="admStatus"></div>
        </div>
      </div>

      <div class="pane">
        <div class="pane-head">👀 Pratinjau</div>
        <div class="pane-body pane-scroll">
          <div class="objectives">
            <b>Tujuan lesson</b>
            <ul id="pvObj"></ul>
          </div>
          <div class="md" id="pvMd"></div>
        </div>
      </div>
    </div>`;

  /* ---------- panel per tab ---------- */
  function drawPanel() {
    const host = $('#admPanel');
    if (adminState.tab === 'materi') {
      host.innerHTML = `
        <label class="fl">Isi materi — Markdown (judul <code>##</code>, kode pakai tiga backtick)</label>
        <textarea class="answer-input mono tall" id="fMd" spellcheck="false">${esc(draft.content_md || '')}</textarea>`;
      const ta = $('#fMd');
      ta.addEventListener('input', () => { draft.content_md = ta.value; adminState.dirty = true; drawPreview(); });
    } else if (adminState.tab === 'kuis') {
      host.innerHTML = `
        <label class="fl">Array soal kuis (JSON) — tipe: <code>mcq</code>, <code>true_false</code>, <code>predict_output</code></label>
        <textarea class="answer-input mono tall" id="fQuiz" spellcheck="false">${esc(JSON.stringify(draft.quiz || [], null, 2))}</textarea>
        <div id="quizErr"></div>`;
      const ta = $('#fQuiz');
      ta.addEventListener('input', () => {
        adminState.dirty = true;
        try {
          const v = JSON.parse(ta.value);
          if (!Array.isArray(v)) throw new Error('Kuis harus berupa array []');
          draft.quiz = v;
          $('#quizErr').innerHTML = `<div class="feedback ok" style="margin-top:10px">✅ JSON valid · ${v.length} soal</div>`;
        } catch (e) {
          $('#quizErr').innerHTML = `<div class="feedback bad" style="margin-top:10px">❌ ${esc(e.message)}</div>`;
        }
      });
    } else {
      host.innerHTML = `
        <label class="fl">Objek live coding (JSON) — isi <code>null</code> kalau lesson ini tanpa coding</label>
        <textarea class="answer-input mono tall" id="fCode" spellcheck="false">${esc(JSON.stringify(draft.coding, null, 2))}</textarea>
        <div id="codeErr"></div>`;
      const ta = $('#fCode');
      ta.addEventListener('input', () => {
        adminState.dirty = true;
        try {
          const v = JSON.parse(ta.value);
          if (v !== null && (typeof v !== 'object' || Array.isArray(v))) throw new Error('Harus objek {} atau null');
          if (v && !Array.isArray(v.tests)) throw new Error('Wajib ada "tests" berupa array');
          draft.coding = v;
          $('#codeErr').innerHTML = `<div class="feedback ok" style="margin-top:10px">✅ JSON valid${v ? ` · ${v.tests.length} test` : ' · tanpa coding'}</div>`;
        } catch (e) {
          $('#codeErr').innerHTML = `<div class="feedback bad" style="margin-top:10px">❌ ${esc(e.message)}</div>`;
        }
      });
    }
  }

  function drawPreview() {
    $('#pvObj').innerHTML = (draft.objectives || []).map((o) => `<li>${esc(o)}</li>`).join('') || '<li class="muted">belum ada</li>';
    $('#pvMd').innerHTML = md(draft.content_md || '_(materi masih kosong)_');
  }

  drawPanel();
  drawPreview();

  $$('#admTabs button').forEach((b) => b.onclick = () => { adminState.tab = b.dataset.tab; viewAdmin(); });

  $('#admPick').onchange = (e) => {
    if (adminState.dirty && !confirm('Ada perubahan yang belum disimpan. Pindah lesson dan buang perubahan?')) {
      e.target.value = adminState.lessonId; return;
    }
    adminState.lessonId = e.target.value;
    adminState.draft = null;
    viewAdmin();
  };

  $('#fTitle').addEventListener('input', (e) => { draft.title = e.target.value; adminState.dirty = true; });
  $('#fDur').addEventListener('input', (e) => { draft.duration = Number(e.target.value) || 1; adminState.dirty = true; });
  $('#fId').addEventListener('input', (e) => { draft.id = e.target.value.trim(); adminState.dirty = true; });
  $('#fRuntime').addEventListener('change', (e) => { draft.runtime = e.target.value; adminState.dirty = true; });
  $('#fObj').addEventListener('input', (e) => {
    draft.objectives = e.target.value.split('\n').map((x) => x.trim()).filter(Boolean);
    adminState.dirty = true; drawPreview();
  });

  /* ---------- simpan ---------- */
  $('#admSave').onclick = async () => {
    const b = $('#admSave');
    if (!draft.id) return toast('ID lesson tidak boleh kosong', 'bad');
    b.disabled = true; b.innerHTML = '<span class="loader"></span> Menyimpan…';
    try {
      await Content.saveOverride(draft);
      adminState.dirty = false;
      adminState.lessonId = draft.id;
      adminState.draft = null;
      toast('Materi tersimpan & langsung tayang ✅', 'ok');
      viewAdmin();
    } catch (e) {
      b.disabled = false; b.textContent = '💾 Simpan ke Firebase';
      const pesan = String(e.message || e).includes('permission')
        ? 'Ditolak Firestore Rules. Pastikan emailmu ada di daftar isAdmin() pada Rules.'
        : e.message || String(e);
      $('#admStatus').innerHTML = `<div class="feedback bad" style="margin-top:12px">❌ ${esc(pesan)}</div>`;
    }
  };

  /* ---------- tes solusi ---------- */
  $('#admTest').onclick = async () => {
    const c = draft.coding;
    if (!c) return toast('Lesson ini tidak punya bagian coding', 'bad');
    const b = $('#admTest');
    b.disabled = true; b.innerHTML = '<span class="loader"></span> Menjalankan…';
    warmUp();
    const res = await runPython({ code: c.solution || '', setup: c.setup || '', tests: c.tests || [] });
    b.disabled = false; b.textContent = '▶︎ Tes solusi coding';
    const lolos = res.tests.length && res.tests.every((t) => t.pass);
    $('#admStatus').innerHTML = `
      <div class="feedback ${lolos ? 'ok' : 'bad'}" style="margin-top:12px">
        <b>${lolos ? '✅ Semua test lolos dengan solusi yang kamu tulis' : '❌ Solusi belum lolos semua test'}</b>
        ${res.error ? `<div class="mono" style="font-size:.82rem">${esc(res.error)}</div>` : ''}
        <ul style="margin:8px 0 0;padding-left:1.1em;font-size:.85rem">
          ${res.tests.map((t) => `<li>${t.pass ? '✅' : '❌'} ${esc(t.name)}${t.error ? ` — <code>${esc(t.error)}</code>` : ''}</li>`).join('')}
        </ul>
      </div>`;
  };

  /* ---------- revert / hapus ---------- */
  const rv = $('#admRevert');
  if (rv) rv.onclick = () => {
    modal({
      title: custom ? 'Hapus lesson ini?' : 'Kembalikan ke versi bawaan?',
      body: custom
        ? '<p>Lesson tambahan ini akan hilang dari kurikulum untuk semua pengguna.</p>'
        : '<p>Semua perubahan admin pada lesson ini dihapus, dan isinya kembali ke versi bawaan dari file.</p>',
      actions: [
        { label: 'Batal' },
        {
          label: custom ? 'Hapus' : 'Kembalikan', primary: true, onClick: async () => {
            try {
              await Content.deleteOverride(lesson.id);
              adminState.draft = null;
              if (custom) adminState.lessonId = flatLessons[0].id;
              toast(custom ? 'Lesson dihapus' : 'Kembali ke versi bawaan', 'ok');
              viewAdmin();
            } catch (e) { toast('Gagal: ' + esc(e.message || e), 'bad'); }
          }
        }
      ]
    });
  };

  /* ---------- lesson baru ---------- */
  $('#admNew').onclick = () => {
    modal({
      title: 'Buat lesson baru',
      body: `
        <label class="fl">Masukkan ke modul</label>
        <select class="answer-input" id="nmMod">
          ${modules.map((m) => `<option value="${m.id}">${esc(m.icon + ' ' + m.title)} (${m.lessons.length} lesson)</option>`).join('')}
        </select>
        <p class="muted" style="font-size:.83rem;margin-top:12px">
          Lesson akan dibuat dari template lengkap (materi, 3 soal kuis, 1 soal coding) dan
          ditaruh di urutan terakhir modul. Kamu tinggal mengubah isinya lalu simpan.</p>`,
      actions: [
        { label: 'Batal' },
        {
          label: 'Buat dari template', primary: true, onClick: () => {
            const mid = $('#nmMod') ? $('#nmMod').value : modules[0].id;
            const m = getModule(mid);
            const urutan = m.lessons.length + 1;
            adminState.draft = Content.lessonTemplate(mid, urutan);
            adminState.lessonId = adminState.draft.id;
            adminState.tab = 'materi';
            adminState.dirty = true;
            viewAdmin();
            toast('Template dimuat — jangan lupa Simpan ke Firebase', 'ok');
          }
        }
      ]
    });
  };

  /* ---------- template & export/import ---------- */
  $('#admTemplate').onclick = () => {
    const contoh = JSON.stringify(Content.lessonTemplate('m1', 9), null, 2);
    modal({
      title: 'Template & format materi',
      body: `
        <p class="muted" style="font-size:.88rem">Setiap lesson adalah satu dokumen JSON. Ini strukturnya:</p>
        <table class="tpl-table">
          <tr><td><code>id</code></td><td>unik, format <code>m1-l8</code></td></tr>
          <tr><td><code>module_id</code></td><td>modul induk: m0–m6</td></tr>
          <tr><td><code>order</code></td><td>urutan di dalam modul</td></tr>
          <tr><td><code>title</code></td><td>judul lesson</td></tr>
          <tr><td><code>duration</code></td><td>perkiraan menit, dipakai statistik</td></tr>
          <tr><td><code>objectives</code></td><td>array tujuan belajar</td></tr>
          <tr><td><code>content_md</code></td><td>materi dalam Markdown</td></tr>
          <tr><td><code>quiz</code></td><td>array soal — <code>mcq</code> / <code>true_false</code> / <code>predict_output</code></td></tr>
          <tr><td><code>coding</code></td><td>objek soal live coding, atau <code>null</code></td></tr>
          <tr><td><code>runtime</code></td><td><code>pyodide</code> atau <code>pyodide-limited</code></td></tr>
        </table>
        <p class="muted" style="font-size:.86rem;margin-top:14px"><b>Di kode test</b> tersedia variabel bantu hasil kode siswa:
        <code>STDOUT</code>, <code>OUTPUT</code> (sudah di-strip), dan <code>LINES</code>. <code>await</code> juga boleh dipakai.</p>
        <p class="muted" style="font-size:.86rem">File template siap pakai ada di folder <code>templates/</code> —
        <code>lesson-template.json</code>, <code>materi-template.md</code>, <code>soal-template.json</code>,
        <code>coding-template.json</code>, plus referensi field lengkapnya di <code>templates/README.md</code>.</p>
        <pre class="q-code" style="max-height:260px;overflow:auto">${esc(contoh)}</pre>`,
      actions: [
        { label: 'Tutup' },
        { label: '📋 Salin template', primary: true, onClick: () => {
          navigator.clipboard.writeText(contoh).then(() => toast('Template disalin', 'ok'), () => toast('Gagal menyalin', 'bad'));
        } }
      ]
    });
  };

  $('#admExport').onclick = () => {
    const blob = new Blob([JSON.stringify(Content.allOverrides(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'learnify-materi.json';
    a.click();
    toast(`${Content.allOverrides().length} lesson diekspor`, 'ok');
  };

  $('#admImport').onclick = () => {
    const f = document.createElement('input');
    f.type = 'file'; f.accept = 'application/json';
    f.onchange = async () => {
      try {
        const list = JSON.parse(await f.files[0].text());
        if (!Array.isArray(list)) throw new Error('File harus berisi array lesson');
        let n = 0;
        for (const doc of list) { if (doc && doc.id && doc.module_id) { await Content.saveOverride(doc); n++; } }
        toast(`${n} lesson diimpor`, 'ok');
        adminState.draft = null;
        viewAdmin();
      } catch (e) { toast('Gagal impor: ' + esc(e.message || e), 'bad'); }
    };
    f.click();
  };
}

/* ============================================================
   ROUTER
   ============================================================ */
const PUBLIC_ROUTES = ['', 'about', 'login'];

function renderBooting(pesan = 'Menyiapkan Learnify…') {
  app.className = 'app';
  app.innerHTML = `<div class="big-loader"><span class="loader"></span> ${esc(pesan)}</div>`;
}

function route() {
  const hash = location.hash.replace(/^#/, '') || '/';
  const [, head, arg] = hash.split('/');
  closeModal();
  editors.length = 0;
  window.scrollTo({ top: 0, behavior: 'auto' });

  if (!Store.state.authReady) return renderBooting();
  renderShell();   // segarkan chip XP & visibilitas menu admin tiap pindah halaman

  // gerbang login: semua halaman selain landing/tentang butuh akun Google.
  // Saat Firebase belum diatur, gerbang tetap muncul tapi ada jalan pratinjau.
  const perluLogin = !Store.state.user && !PUBLIC_ROUTES.includes(head)
    && !(Store.state.localMode && previewMode());
  if (perluLogin) {
    pendingRoute = hash;
    return viewLogin();
  }

  switch (head) {
    case '': return viewLanding();
    case 'login': return Store.state.user ? (location.hash = '#/dashboard') : viewLogin();
    case 'modules': return viewModules();
    case 'module': return viewModule(arg);
    case 'lesson': return viewLesson(arg);
    case 'exam': return viewExam(arg);
    case 'dashboard': return viewDashboard();
    case 'certificates': return viewCertificates();
    case 'cert': return viewCertificate(arg);
    case 'capstone': return viewCapstone();
    case 'admin': return viewAdmin();
    case 'about': return viewAbout();
    default: return viewNotFound();
  }
}

window.addEventListener('hashchange', route);

/* pantau perubahan status login → muat ulang materi & halaman */
let lastUid;
Store.subscribe((st) => {
  const uid = st.user ? st.user.uid : null;
  if (lastUid === undefined) return;
  if (uid !== lastUid) {
    lastUid = uid;
    Content.loadOverrides({ force: true }).finally(() => {
      if (uid && pendingRoute) { const t = pendingRoute; pendingRoute = null; location.hash = '#' + t; }
      route();
    });
  }
});

(async function init() {
  renderBooting();
  await Store.initStore();
  lastUid = Store.state.user ? Store.state.user.uid : null;
  await Content.loadOverrides();
  syncThemeIcon();
  renderShell();
  if (Store.state.user && pendingRoute) { const t = pendingRoute; pendingRoute = null; location.hash = '#' + t; }
  route();
})();
