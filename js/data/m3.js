export default {
  id: 'm3',
  title: 'Menengah',
  icon: '⚙️',
  tagline: 'Error handling, file, modul, standard library.',
  desc: 'Keterampilan yang membedakan skrip latihan dengan program yang dipakai orang.',
  badge: { id: 'b-m3', icon: '⚙️', name: 'Anti Panik', desc: 'Menguasai error handling & file I/O' },
  lessons: [
    {
      id: 'm3-l1',
      title: 'Error Handling',
      duration: 22,
      objectives: ['Mengenal jenis exception umum', 'Memakai try/except/else/finally', 'Melempar error dengan raise'],
      quiz: [
        { id: 'm3-l1-q1', type: 'mcq', question: 'Blok yang SELALU dijalankan, ada error maupun tidak, adalah ...', options: ['except', 'else', 'finally', 'try'], answer: 2,
          explanation: 'finally cocok untuk beres-beres: menutup file, koneksi, atau browser.' },
        { id: 'm3-l1-q2', type: 'mcq', question: 'int("abc") memicu error ...', options: ['TypeError', 'ValueError', 'KeyError', 'SyntaxError'], answer: 1,
          explanation: 'Tipenya sudah benar (string), tapi nilainya tidak bisa dijadikan angka → ValueError.' },
        { id: 'm3-l1-q3', type: 'mcq', question: 'Mengakses kunci dictionary yang tidak ada memicu ...', options: ['IndexError', 'KeyError', 'ValueError', 'AttributeError'], answer: 1,
          explanation: 'Gunakan .get() untuk menghindarinya.' },
        { id: 'm3-l1-q4', type: 'true_false', question: 'Menulis except: tanpa menyebut jenis error adalah praktik yang dianjurkan.', answer: false,
          explanation: 'Itu menelan semua error, termasuk bug di kode kita sendiri.' }
      ],
      coding: {
        prompt: 'Buat fungsi `bagi_aman(a, b)` yang mengembalikan hasil `a / b`. Kalau `b` bernilai 0, kembalikan `None` (jangan sampai program error).',
        starter_code: 'def bagi_aman(a, b):\n    pass\n',
        tests: [
          { name: 'bagi_aman(10, 2) == 5', code: 'assert bagi_aman(10, 2) == 5' },
          { name: 'bagi_aman(1, 0) is None', code: 'assert bagi_aman(1, 0) is None' },
          { name: 'Hasil desimal benar', code: 'assert bagi_aman(7, 2) == 3.5' }
        ],
        hints: ['Bungkus pembagian dalam try.', 'Tangkap ZeroDivisionError lalu return None.'],
        solution: 'def bagi_aman(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None'
      }
    },
    {
      id: 'm3-l2',
      title: 'File I/O (txt, csv, json)',
      duration: 25,
      objectives: ['Membaca & menulis file dengan with open', 'Mengolah CSV', 'Mengubah data ke/dari JSON'],
      quiz: [
        { id: 'm3-l2-q1', type: 'mcq', question: 'Mode file yang menambahkan isi di akhir tanpa menghapus isi lama adalah ...', options: ['"w"', '"a"', '"r"', '"x"'], answer: 1,
          explanation: 'Mode "w" justru menimpa seluruh isi file.' },
        { id: 'm3-l2-q2', type: 'mcq', question: 'Fungsi untuk mengubah string JSON menjadi dict adalah ...', options: ['json.loads', 'json.dumps', 'json.load', 'json.dump'], answer: 0,
          explanation: 'Huruf s berarti string. loads = load from string.' },
        { id: 'm3-l2-q3', type: 'mcq', question: 'Kenapa sebaiknya memakai with open(...) dibanding open(...) biasa?', options: ['Lebih cepat', 'File otomatis ditutup walaupun terjadi error', 'Bisa membaca file biner', 'Tidak butuh mode'], answer: 1,
          explanation: 'with adalah context manager yang menjamin file tertutup.' },
        { id: 'm3-l2-q4', type: 'true_false', question: 'Nilai yang dibaca csv.DictReader otomatis bertipe int kalau isinya angka.', answer: false,
          explanation: 'Semua nilai CSV terbaca sebagai string; konversi sendiri bila perlu.' }
      ],
      coding: {
        prompt: 'Buat fungsi `simpan_dan_baca(data, path)` yang menyimpan dict `data` ke file JSON di `path`, lalu membacanya kembali dan mengembalikan hasilnya.',
        starter_code: 'import json\n\ndef simpan_dan_baca(data, path):\n    pass\n',
        tests: [
          { name: 'Data kembali utuh', code: 'assert simpan_dan_baca({"a": 1}, "t1.json") == {"a": 1}' },
          { name: 'Data bersarang', code: 'assert simpan_dan_baca({"x": {"y": [1, 2]}}, "t2.json") == {"x": {"y": [1, 2]}}' },
          { name: 'File benar-benar dibuat', code: 'import os\nsimpan_dan_baca({"b": 2}, "t3.json")\nassert os.path.exists("t3.json")' }
        ],
        hints: ['Tulis dengan json.dump(data, f).', 'Baca dengan json.load(f) lalu return.'],
        solution: 'import json\n\ndef simpan_dan_baca(data, path):\n    with open(path, "w") as f:\n        json.dump(data, f)\n    with open(path) as f:\n        return json.load(f)'
      }
    },
    {
      id: 'm3-l3',
      title: 'Modul & Package',
      duration: 18,
      objectives: ['Memecah kode ke banyak file', 'Memakai import dengan benar', 'Memahami __name__ == "__main__"'],
      quiz: [
        { id: 'm3-l3-q1', type: 'mcq', question: 'Fungsi baris if __name__ == "__main__": adalah ...', options: ['Wajib ada di semua file Python', 'Menjalankan kode hanya kalau file dijalankan langsung', 'Mempercepat import', 'Mendefinisikan fungsi utama'], answer: 1,
          explanation: 'Saat file di-import, __name__ berisi nama modul, bukan "__main__".' },
        { id: 'm3-l3-q2', type: 'mcq', question: 'Manakah gaya import yang sebaiknya dihindari?', options: ['import math', 'from math import sqrt', 'import numpy as np', 'from math import *'], answer: 3,
          explanation: 'Import bintang membanjiri namespace dan menyembunyikan asal-usul fungsi.' },
        { id: 'm3-l3-q3', type: 'true_false', question: 'Menamai file sendiri random.py bisa membuat import random jadi error.', answer: true,
          explanation: 'File di folder yang sama ditemukan lebih dulu sehingga menutupi modul bawaan.' }
      ],
      coding: {
        prompt: 'Gunakan modul `math` untuk membuat fungsi `luas_lingkaran(r)` yang mengembalikan luas lingkaran, **dibulatkan 2 angka di belakang koma**.',
        starter_code: 'import math\n\ndef luas_lingkaran(r):\n    pass\n',
        tests: [
          { name: 'r = 1 -> 3.14', code: 'assert luas_lingkaran(1) == 3.14' },
          { name: 'r = 2 -> 12.57', code: 'assert luas_lingkaran(2) == 12.57' },
          { name: 'r = 0 -> 0', code: 'assert luas_lingkaran(0) == 0' }
        ],
        hints: ['Luas = pi * r kuadrat.', 'Pakai math.pi dan round(hasil, 2).'],
        solution: 'import math\n\ndef luas_lingkaran(r):\n    return round(math.pi * r ** 2, 2)'
      }
    },
    {
      id: 'm3-l4',
      title: 'Standard Library Penting',
      duration: 22,
      objectives: ['Mengolah tanggal dengan datetime', 'Memakai random secara terkontrol', 'Mengenal Counter dan defaultdict'],
      quiz: [
        { id: 'm3-l4-q1', type: 'mcq', question: 'Counter("aab") menghasilkan ...', options: ["Counter({'a': 2, 'b': 1})", "['a', 'a', 'b']", "{'a', 'b'}", "Counter({'a': 1, 'b': 1})"], answer: 0,
          explanation: 'Counter menghitung frekuensi tiap elemen.' },
        { id: 'm3-l4-q2', type: 'mcq', question: 'Mengubah string "2026-01-31" menjadi objek tanggal memakai ...', options: ['strftime', 'strptime', 'timedelta', 'isoformat'], answer: 1,
          explanation: 'strptime = string parse time. strftime = string format time.' },
        { id: 'm3-l4-q3', type: 'true_false', question: 'random.seed(42) membuat urutan angka acak bisa diulang persis.', answer: true,
          explanation: 'Sangat berguna supaya test yang memakai random tidak flaky.' },
        { id: 'm3-l4-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'from collections import defaultdict\nd = defaultdict(list)\nd["a"].append(1)\nprint(dict(d))', answer: "{'a': [1]}",
          explanation: 'defaultdict membuat nilai default otomatis saat kunci belum ada.' }
      ],
      coding: {
        prompt: 'Buat fungsi `selisih_hari(tgl1, tgl2)`. Kedua argumen berupa string format `"YYYY-MM-DD"`. Kembalikan selisih harinya sebagai **bilangan positif**.',
        starter_code: 'from datetime import datetime\n\ndef selisih_hari(tgl1, tgl2):\n    pass\n',
        tests: [
          { name: 'Januari 1 ke 31 -> 30', code: 'assert selisih_hari("2026-01-01", "2026-01-31") == 30' },
          { name: 'Urutan terbalik tetap positif', code: 'assert selisih_hari("2026-03-01", "2026-02-01") == 28' },
          { name: 'Tanggal sama -> 0', code: 'assert selisih_hari("2026-05-05", "2026-05-05") == 0' }
        ],
        hints: ['datetime.strptime(tgl, "%Y-%m-%d")', 'Selisih dua datetime punya atribut .days — bungkus dengan abs().'],
        solution: 'from datetime import datetime\n\ndef selisih_hari(tgl1, tgl2):\n    a = datetime.strptime(tgl1, "%Y-%m-%d")\n    b = datetime.strptime(tgl2, "%Y-%m-%d")\n    return abs((b - a).days)'
      }
    },
    {
      id: 'm3-l5',
      title: 'pip, Virtual Env & Git',
      duration: 20,
      objectives: ['Memasang library dengan pip', 'Memisahkan dependensi dengan venv', 'Menyimpan riwayat kode dengan Git'],
      quiz: [
        { id: 'm3-l5-q1', type: 'mcq', question: 'File berisi daftar library yang dibutuhkan proyek bernama ...', options: ['requirements.txt', 'libs.json', 'packages.py', 'pip.cfg'], answer: 0,
          explanation: 'Dipasang ulang dengan pip install -r requirements.txt.' },
        { id: 'm3-l5-q2', type: 'mcq', question: 'Tujuan utama virtual environment adalah ...', options: ['Mempercepat Python', 'Memisahkan library tiap proyek agar tidak bentrok', 'Mengenkripsi kode', 'Menghemat kuota internet'], answer: 1,
          explanation: 'Tiap proyek punya "kotak" library sendiri.' },
        { id: 'm3-l5-q3', type: 'mcq', question: 'Perintah untuk menyimpan snapshot perubahan di Git adalah ...', options: ['git save', 'git commit', 'git push', 'git store'], answer: 1,
          explanation: 'git add menyiapkan perubahan, git commit menyimpannya.' },
        { id: 'm3-l5-q4', type: 'true_false', question: 'Folder venv/ dan file .env sebaiknya ikut di-commit ke repo publik.', answer: false,
          explanation: 'Keduanya masuk .gitignore. .env berisi rahasia, venv/ bisa dibuat ulang.' }
      ],
      coding: null
    }
  ],
  exam: {
    title: 'Ujian Modul 3 — Menengah',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm3-x1', type: 'mcq', question: '[1, 2][5] memicu error ...', options: ['KeyError', 'IndexError', 'ValueError', 'TypeError'], answer: 1,
        explanation: 'Index di luar jangkauan list menghasilkan IndexError.' },
      { id: 'm3-x2', type: 'mcq', question: 'json.dump(data, f) dipakai untuk ...', options: ['Mengubah objek jadi string', 'Menulis objek ke file', 'Membaca file jadi objek', 'Memvalidasi JSON'], answer: 1,
        explanation: 'Tanpa huruf s berarti bekerja dengan file.' },
      { id: 'm3-x3', type: 'true_false', question: 'raise dipakai untuk melempar exception secara sengaja.', answer: true,
        explanation: 'Berguna untuk menolak input yang tidak valid.' },
      { id: 'm3-x4', type: 'mcq', question: 'Cara benar membaca API key adalah ...', options: ['Ditulis langsung di kode', 'os.getenv("API_KEY")', 'Disimpan di nama file', 'Ditulis di komentar'], answer: 1,
        explanation: 'Rahasia disimpan di environment variable, bukan di dalam kode.' }
    ],
    coding: [
      {
        id: 'm3-e-c1',
        prompt: 'Buat fungsi `parse_csv_nilai(teks_csv)`.\n\nInput berupa string CSV dengan header `nama,nilai`. Kembalikan dict `{nama: nilai}` dengan nilai bertipe `int`. **Baris yang nilainya tidak valid dilewati.**\n\nContoh input:\n```\nnama,nilai\nBudi,80\nAni,abc\nCitra,90\n```\nOutput: `{"Budi": 80, "Citra": 90}`',
        starter_code: 'import csv, io\n\ndef parse_csv_nilai(teks_csv):\n    pass\n',
        tests: [
          { name: 'Baris valid terbaca', code: 'assert parse_csv_nilai("nama,nilai\\nBudi,80") == {"Budi": 80}' },
          { name: 'Baris tidak valid dilewati', code: 'assert parse_csv_nilai("nama,nilai\\nBudi,80\\nAni,abc\\nCitra,90") == {"Budi": 80, "Citra": 90}' },
          { name: 'Hanya header -> {}', code: 'assert parse_csv_nilai("nama,nilai") == {}' },
          { name: 'Nilai bertipe int', code: 'assert all(isinstance(v, int) for v in parse_csv_nilai("nama,nilai\\nA,1").values())' }
        ],
        hints: ['Bungkus string dengan io.StringIO supaya bisa dibaca csv.DictReader.', 'Pakai try/except ValueError untuk melewati baris yang gagal dikonversi.'],
        solution: 'import csv, io\n\ndef parse_csv_nilai(teks_csv):\n    hasil = {}\n    for row in csv.DictReader(io.StringIO(teks_csv)):\n        try:\n            hasil[row["nama"]] = int(row["nilai"])\n        except (ValueError, TypeError):\n            continue\n    return hasil'
      }
    ]
  }
};
