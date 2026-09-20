# Template Materi Learnify

Isi folder ini dipakai sebagai contoh saat menulis lesson baru — bisa disalin ke halaman
**Admin → Kelola Materi**, atau dipakai sebagai acuan waktu mengedit `js/data/m*.js` langsung.

| File | Isinya |
|---|---|
| `lesson-template.json` | Satu lesson utuh — tempel lewat tombol **Import** di halaman admin |
| `materi-template.md` | Kerangka materi Markdown sesuai gaya penulisan Learnify |
| `soal-template.json` | Tiga tipe soal kuis (`mcq`, `true_false`, `predict_output`) |
| `coding-template.json` | Satu tantangan live coding lengkap dengan test case |

## Referensi field

### Lesson

| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | Wajib unik. Pola: `<modul>-l<urutan>`, contoh `m1-l8` |
| `module_id` | string | `m0` … `m6` |
| `order` | number | Urutan tampil di dalam modul |
| `title` | string | Judul lesson |
| `duration` | number | Perkiraan menit — dipakai juga untuk statistik jam belajar |
| `runtime` | string | `pyodide` atau `pyodide-limited` (kalau butuh jaringan/browser asli) |
| `objectives` | string[] | Muncul di kotak "Tujuan lesson" |
| `content_md` | string | Materi dalam Markdown |
| `quiz` | object[] | Minimal 3 soal disarankan; lulus butuh ≥ 70% benar |
| `coding` | object \| null | `null` kalau lesson ini teori saja |

### Soal kuis

| Tipe | Field khusus | Bentuk `answer` |
|---|---|---|
| `mcq` | `options: string[]` | index jawaban benar (mulai 0) |
| `true_false` | — | `true` atau `false` |
| `predict_output` | `code: string` | string output yang diharapkan |

Semua tipe punya `id`, `question`, dan `explanation`. Pembahasan muncul setelah dijawab,
jadi tulis yang benar-benar menjelaskan, bukan cuma mengulang jawaban.

### Live coding

| Field | Keterangan |
|---|---|
| `prompt` | Soal, boleh memakai Markdown |
| `packages` | Library yang perlu dimuat Pyodide, mis. `["numpy"]`, `["pandas"]`, `["scikit-learn", "numpy"]` |
| `setup` | Kode yang dijalankan **sebelum** kode siswa (untuk menyediakan fungsi/modul bantu) |
| `starter_code` | Isi awal editor |
| `tests` | Array `{ name, code }` — `name` tampil ke siswa, `code` berisi `assert` |
| `hints` | Ditampilkan bertahap lewat tombol Petunjuk |
| `solution` | Kunci jawaban; bisa diuji lewat tombol **Tes solusi coding** di admin |

Variabel bantu yang tersedia di dalam `tests`:

| Variabel | Isinya |
|---|---|
| `STDOUT` | Seluruh output `print()` siswa, apa adanya |
| `OUTPUT` | `STDOUT` yang sudah di-`strip()` |
| `LINES` | `STDOUT` dipecah per baris jadi list |

`await` boleh dipakai di dalam `code` test untuk lesson `asyncio`.

## Aturan penulisan materi

1. Mulai dari masalah atau analogi sehari-hari, baru sintaks.
2. Tiap konsep: penjelasan singkat → contoh kode → output yang diharapkan.
3. Maksimal ±600 kata per lesson. Kalau lebih, pecah jadi dua lesson.
4. Tutup dengan **Ringkasan** (3–5 poin) dan **Kesalahan umum**.
5. Istilah Inggris tetap dipakai, tapi dijelaskan dalam bahasa Indonesia saat pertama muncul.
6. Semua contoh kode harus bisa dijalankan di Pyodide, kecuali ditandai `pyodide-limited`.
