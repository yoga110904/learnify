export default {
  id: 'm2',
  title: 'Struktur Data & Fungsi',
  icon: '🧰',
  tagline: 'List, dict, comprehension, dan fungsi.',
  desc: 'Cara menyimpan banyak data sekaligus dan membungkus logika jadi fungsi yang rapi.',
  badge: { id: 'b-m2', icon: '🧰', name: 'Perapi Data', desc: 'Menguasai struktur data & fungsi' },
  lessons: [
    {
      id: 'm2-l1',
      title: 'List',
      duration: 22,
      objectives: ['Menyimpan banyak data berurutan', 'Memakai method list penting', 'Paham beda sorted() dan .sort()'],
      quiz: [
        { id: 'm2-l1-q1', type: 'mcq', question: 'Apa beda sorted(x) dan x.sort()?', options: ['Sama saja', 'sorted() membuat list baru, .sort() mengubah list aslinya', '.sort() membuat list baru', 'sorted() hanya untuk angka'], answer: 1,
          explanation: 'x.sort() mengubah di tempat dan mengembalikan None; sorted(x) mengembalikan list baru.' },
        { id: 'm2-l1-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = [1, 2, 3]\na.append(4)\nprint(len(a))', answer: '4',
          explanation: 'append menambah satu elemen di akhir list.' },
        { id: 'm2-l1-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = [3, 1, 2]\na = a.sort()\nprint(a)', answer: 'None',
          explanation: '.sort() mengembalikan None, jadi variabelnya jadi None.' },
        { id: 'm2-l1-q4', type: 'true_false', question: 'Setelah b = a (a sebuah list), mengubah b juga mengubah a.', answer: true,
          explanation: 'Keduanya menunjuk list yang sama. Pakai a.copy() kalau butuh salinan.' }
      ],
      coding: {
        prompt: 'Buat fungsi `rata_rata(angka)` yang mengembalikan rata-rata isi list. Kalau listnya kosong, kembalikan `0`.',
        starter_code: 'def rata_rata(angka):\n    pass\n',
        tests: [
          { name: 'rata_rata([2, 4, 6]) == 4', code: 'assert rata_rata([2, 4, 6]) == 4' },
          { name: 'List kosong menghasilkan 0', code: 'assert rata_rata([]) == 0' },
          { name: 'rata_rata([5]) == 5', code: 'assert rata_rata([5]) == 5' },
          { name: 'Rata-rata desimal', code: 'assert abs(rata_rata([1, 2]) - 1.5) < 1e-9' }
        ],
        hints: ['List kosong bernilai falsy: if not angka: return 0', 'sum(angka) / len(angka)'],
        solution: 'def rata_rata(angka):\n    if not angka:\n        return 0\n    return sum(angka) / len(angka)'
      }
    },
    {
      id: 'm2-l2',
      title: 'Tuple & Set',
      duration: 18,
      objectives: ['Mengenal tuple yang immutable', 'Memakai set untuk data unik', 'Operasi himpunan'],
      quiz: [
        { id: 'm2-l2-q1', type: 'mcq', question: 'Hasil dari len({1, 1, 2, 3}) adalah ...', options: ['4', '3', '2', 'Error'], answer: 1,
          explanation: 'Set membuang duplikat, jadi isinya {1, 2, 3}.' },
        { id: 'm2-l2-q2', type: 'true_false', question: 'Isi tuple bisa diubah setelah dibuat.', answer: false,
          explanation: 'Tuple bersifat immutable. Mengubah elemennya menghasilkan TypeError.' },
        { id: 'm2-l2-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = {1, 2, 3}\nb = {3, 4}\nprint(sorted(a & b))', answer: '[3]',
          explanation: '& adalah irisan dua set; hanya 3 yang ada di keduanya.' },
        { id: 'm2-l2-q4', type: 'mcq', question: 'Cara membuat set kosong adalah ...', options: ['{}', 'set()', '[]', '()'], answer: 1,
          explanation: '{} membuat dictionary kosong, bukan set.' }
      ],
      coding: {
        prompt: 'Buat fungsi `hapus_duplikat(data)` yang mengembalikan list tanpa duplikat, dengan **urutan kemunculan pertama dipertahankan**.',
        starter_code: 'def hapus_duplikat(data):\n    pass\n',
        tests: [
          { name: '[3,1,3,2,1] -> [3,1,2]', code: 'assert hapus_duplikat([3, 1, 3, 2, 1]) == [3, 1, 2]' },
          { name: 'List kosong -> []', code: 'assert hapus_duplikat([]) == []' },
          { name: 'Bekerja untuk string', code: 'assert hapus_duplikat(["a", "b", "a"]) == ["a", "b"]' }
        ],
        hints: ['list(set(data)) tidak menjaga urutan.', 'Pakai set "seen" untuk mencatat yang sudah pernah muncul.'],
        solution: 'def hapus_duplikat(data):\n    seen = set()\n    hasil = []\n    for x in data:\n        if x not in seen:\n            seen.add(x)\n            hasil.append(x)\n    return hasil'
      }
    },
    {
      id: 'm2-l3',
      title: 'Dictionary',
      duration: 24,
      objectives: ['Menyimpan data kunci–nilai', 'Mengakses data dengan aman lewat .get()', 'Membaca dictionary bersarang ala API'],
      quiz: [
        { id: 'm2-l3-q1', type: 'mcq', question: 'Apa hasil d.get("x", 0) kalau kunci "x" tidak ada?', options: ['KeyError', '0', 'None', 'False'], answer: 1,
          explanation: 'Argumen kedua .get() adalah nilai default kalau kunci tidak ditemukan.' },
        { id: 'm2-l3-q2', type: 'mcq', question: 'Cara looping kunci dan nilai sekaligus adalah ...', options: ['d.items()', 'd.all()', 'd.pairs()', 'd.both()'], answer: 0,
          explanation: 'for k, v in d.items() memberi kunci dan nilainya sekaligus.' },
        { id: 'm2-l3-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'd = {"a": 1}\nd["a"] = d.get("a", 0) + 1\nprint(d)', answer: "{'a': 2}",
          explanation: 'Pola hitung frekuensi: ambil nilai lama, tambah, simpan lagi.' },
        { id: 'm2-l3-q4', type: 'mcq', question: 'Manakah yang TIDAK bisa dipakai sebagai kunci dictionary?', options: ['"nama"', '(1, 2)', '[1, 2]', '7'], answer: 2,
          explanation: 'Kunci harus immutable. List tidak bisa (unhashable).' }
      ],
      coding: {
        prompt: 'Buat fungsi `hitung_kata(kalimat)` yang mengembalikan dict berisi frekuensi tiap kata. Semua kata diubah jadi **huruf kecil**.',
        starter_code: 'def hitung_kata(kalimat):\n    pass\n',
        tests: [
          { name: 'Kalimat biasa', code: 'assert hitung_kata("aku dan kamu dan dia") == {"aku": 1, "dan": 2, "kamu": 1, "dia": 1}' },
          { name: 'Huruf besar dianggap sama', code: 'assert hitung_kata("A a") == {"a": 2}' },
          { name: 'Kalimat kosong -> {}', code: 'assert hitung_kata("") == {}' }
        ],
        hints: ['Pecah kalimat dengan .split()', 'hitung[kata] = hitung.get(kata, 0) + 1'],
        solution: 'def hitung_kata(kalimat):\n    hitung = {}\n    for kata in kalimat.lower().split():\n        hitung[kata] = hitung.get(kata, 0) + 1\n    return hitung'
      }
    },
    {
      id: 'm2-l4',
      title: 'Comprehension',
      duration: 18,
      objectives: ['Menulis list comprehension', 'Menyaring data dengan if', 'Mengenal dict & set comprehension'],
      quiz: [
        { id: 'm2-l4-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print([x for x in range(6) if x % 2 == 0])', answer: '[0, 2, 4]',
          explanation: 'if di belakang berfungsi sebagai filter.' },
        { id: 'm2-l4-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print({x: x * x for x in [1, 2, 3]})', answer: '{1: 1, 2: 4, 3: 9}',
          explanation: 'Dict comprehension membuat pasangan kunci: nilai.' },
        { id: 'm2-l4-q3', type: 'mcq', question: 'Di mana posisi if/else kalau kita ingin memilih antara dua nilai?', options: ['Di belakang, setelah for', 'Di depan, sebelum for', 'Tidak bisa dipakai', 'Di dalam kurung siku kedua'], answer: 1,
          explanation: 'Bentuk ternary ditulis di depan: [a if kondisi else b for x in data].' }
      ],
      coding: {
        prompt: 'Buat fungsi `kuadrat_genap(data)` yang mengembalikan list kuadrat dari **angka genap saja**. Gunakan list comprehension.',
        starter_code: 'def kuadrat_genap(data):\n    pass\n',
        tests: [
          { name: '[1,2,3,4] -> [4, 16]', code: 'assert kuadrat_genap([1, 2, 3, 4]) == [4, 16]' },
          { name: 'Tidak ada genap -> []', code: 'assert kuadrat_genap([1, 3]) == []' },
          { name: 'Nol termasuk genap', code: 'assert kuadrat_genap([0, 5]) == [0]' }
        ],
        hints: ['Pola: [x * x for x in data if ...]', 'Genap berarti x % 2 == 0'],
        solution: 'def kuadrat_genap(data):\n    return [x * x for x in data if x % 2 == 0]'
      }
    },
    {
      id: 'm2-l5',
      title: 'Fungsi',
      duration: 25,
      objectives: ['Membungkus logika jadi fungsi', 'Paham beda return dan print', 'Memakai *args dan **kwargs'],
      quiz: [
        { id: 'm2-l5-q1', type: 'mcq', question: 'Fungsi tanpa return akan mengembalikan ...', options: ['0', 'None', 'Error', 'String kosong'], answer: 1,
          explanation: 'Semua fungsi mengembalikan sesuatu; kalau tidak ditulis, nilainya None.' },
        { id: 'm2-l5-q2', type: 'mcq', question: 'Di dalam fungsi, *args menampung argumen sebagai ...', options: ['list', 'tuple', 'dict', 'set'], answer: 1,
          explanation: '*args menjadi tuple, **kwargs menjadi dict.' },
        { id: 'm2-l5-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def f(a, b=10):\n    return a + b\nprint(f(5))', answer: '15',
          explanation: 'Parameter b memakai nilai default 10.' },
        { id: 'm2-l5-q4', type: 'true_false', question: 'print() di dalam fungsi sudah cukup kalau hasilnya mau dipakai perhitungan lain.', answer: false,
          explanation: 'print hanya menampilkan. Untuk dipakai lagi, nilainya harus di-return.' }
      ],
      coding: {
        prompt: 'Buat fungsi `total_belanja(*harga, diskon=0)` yang menjumlahkan semua harga lalu menguranginya sebesar `diskon` **persen**.',
        starter_code: 'def total_belanja(*harga, diskon=0):\n    pass\n',
        tests: [
          { name: 'Tanpa diskon', code: 'assert total_belanja(100, 200) == 300' },
          { name: 'Diskon 10 persen', code: 'assert total_belanja(100, 100, diskon=10) == 180' },
          { name: 'Tanpa argumen -> 0', code: 'assert total_belanja() == 0' },
          { name: 'Satu item dengan diskon 50', code: 'assert total_belanja(200, diskon=50) == 100' }
        ],
        hints: ['sum(harga) menjumlahkan semua argumen.', 'Potongan = subtotal * diskon / 100'],
        solution: 'def total_belanja(*harga, diskon=0):\n    subtotal = sum(harga)\n    return subtotal - subtotal * diskon / 100'
      }
    },
    {
      id: 'm2-l6',
      title: 'Scope & Lambda',
      duration: 20,
      objectives: ['Memahami variabel lokal vs global', 'Mengenal aturan LEGB', 'Memakai lambda sebagai key sorting'],
      quiz: [
        { id: 'm2-l6-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'x = 1\ndef f():\n    x = 2\nf()\nprint(x)', answer: '1',
          explanation: 'x di dalam fungsi adalah variabel lokal baru, tidak menimpa x global.' },
        { id: 'm2-l6-q2', type: 'mcq', question: 'Urutan pencarian nama variabel di Python adalah ...', options: ['Global → Local → Built-in', 'Local → Enclosing → Global → Built-in', 'Built-in → Global → Local', 'Acak'], answer: 1,
          explanation: 'Dikenal sebagai aturan LEGB.' },
        { id: 'm2-l6-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'kata = ["banana", "kiwi", "apple"]\nprint(sorted(kata, key=len)[0])', answer: 'kiwi',
          explanation: 'key=len mengurutkan berdasarkan panjang kata; "kiwi" paling pendek.' },
        { id: 'm2-l6-q4', type: 'true_false', question: 'Lambda boleh berisi beberapa baris statement.', answer: false,
          explanation: 'Lambda hanya boleh satu ekspresi. Kalau lebih, pakai def.' }
      ],
      coding: {
        prompt: 'Buat fungsi `urut_berdasar_umur(orang)` yang mengurutkan list of dict berdasarkan kunci `"umur"` dari kecil ke besar. Gunakan `sorted` + `lambda`.',
        starter_code: 'def urut_berdasar_umur(orang):\n    pass\n',
        tests: [
          { name: 'Urutan benar', code: 'data = [{"n": "A", "umur": 30}, {"n": "B", "umur": 20}]\nassert [o["n"] for o in urut_berdasar_umur(data)] == ["B", "A"]' },
          { name: 'List kosong aman', code: 'assert urut_berdasar_umur([]) == []' },
          { name: 'Tidak mengubah list asli', code: 'data = [{"n": "A", "umur": 30}, {"n": "B", "umur": 20}]\nurut_berdasar_umur(data)\nassert data[0]["n"] == "A"' }
        ],
        hints: ['sorted(orang, key=lambda o: o["umur"])', 'sorted() otomatis membuat list baru.'],
        solution: 'def urut_berdasar_umur(orang):\n    return sorted(orang, key=lambda o: o["umur"])'
      }
    },
    {
      id: 'm2-l7',
      title: 'Rekursi',
      duration: 20,
      objectives: ['Memahami base case dan recursive case', 'Menulis fungsi rekursif sederhana', 'Tahu batas rekursi Python'],
      quiz: [
        { id: 'm2-l7-q1', type: 'mcq', question: 'Fungsi rekursif tanpa base case akan ...', options: ['Berhenti sendiri', 'Menghasilkan RecursionError', 'Mengembalikan None', 'Dikompilasi ulang'], answer: 1,
          explanation: 'Tumpukan pemanggilan terus bertambah sampai melewati batas Python.' },
        { id: 'm2-l7-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def f(n):\n    if n <= 1:\n        return 1\n    return n * f(n - 1)\nprint(f(4))', answer: '24',
          explanation: '4 * 3 * 2 * 1 = 24.' },
        { id: 'm2-l7-q3', type: 'true_false', question: 'Semua masalah lebih baik diselesaikan dengan rekursi daripada loop.', answer: false,
          explanation: 'Rekursi unggul untuk data bersarang; kasus sederhana lebih cocok pakai loop.' }
      ],
      coding: {
        prompt: 'Buat fungsi `faktorial(n)` **secara rekursif** (tanpa loop).',
        starter_code: 'def faktorial(n):\n    pass\n',
        tests: [
          { name: 'faktorial(0) == 1', code: 'assert faktorial(0) == 1' },
          { name: 'faktorial(1) == 1', code: 'assert faktorial(1) == 1' },
          { name: 'faktorial(5) == 120', code: 'assert faktorial(5) == 120' },
          { name: 'Ditulis rekursif (tanpa for/while)', code: 'import inspect\nsrc = inspect.getsource(faktorial)\nassert "for " not in src and "while " not in src, "Gunakan rekursi, bukan loop."' }
        ],
        hints: ['Base case: n <= 1 kembalikan 1.', 'Recursive case: return n * faktorial(n - 1)'],
        solution: 'def faktorial(n):\n    if n <= 1:\n        return 1\n    return n * faktorial(n - 1)'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 2 — Struktur Data & Fungsi',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm2-x1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'd = {"a": 1, "b": 2}\nprint(list(d.items())[1])', answer: "('b', 2)",
        explanation: '.items() menghasilkan pasangan berbentuk tuple.' },
      { id: 'm2-x2', type: 'mcq', question: 'Manakah yang membuat salinan list, bukan referensi?', options: ['b = a', 'b = a.copy()', 'b = a.sort()', 'b = a.append()'], answer: 1,
        explanation: '.copy() (atau list(a) / a[:]) membuat list baru.' },
      { id: 'm2-x3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def f(*a, **k):\n    return len(a), len(k)\nprint(f(1, 2, x=3))', answer: '(2, 1)',
        explanation: 'Dua argumen posisional masuk ke args, satu keyword masuk ke kwargs.' },
      { id: 'm2-x4', type: 'mcq', question: 'Struktur data mana yang paling cepat untuk mengecek "apakah x ada di dalamnya" pada data besar?', options: ['list', 'tuple', 'set', 'string'], answer: 2,
        explanation: 'Set memakai hashing sehingga pengecekan keanggotaan sangat cepat.' },
      { id: 'm2-x5', type: 'true_false', question: 'Comprehension selalu lebih baik daripada loop biasa.', answer: false,
        explanation: 'Kalau sudah sulit dibaca, loop biasa lebih baik.' }
    ],
    coding: [
      {
        id: 'm2-e-c1',
        prompt: 'Buat fungsi `kelompokkan_nilai(data)`. Input berupa list of tuple `(nama, nilai)`. Kembalikan dict:\n\n```python\n{"lulus": [...], "gagal": [...]}\n```\n\nBatas lulus adalah nilai ≥ 70. Isi listnya adalah **nama**-nya saja.',
        starter_code: 'def kelompokkan_nilai(data):\n    pass\n',
        tests: [
          { name: 'Pengelompokan benar', code: 'assert kelompokkan_nilai([("A", 80), ("B", 50)]) == {"lulus": ["A"], "gagal": ["B"]}' },
          { name: 'Batas 70 termasuk lulus', code: 'assert kelompokkan_nilai([("C", 70)]) == {"lulus": ["C"], "gagal": []}' },
          { name: 'Data kosong', code: 'assert kelompokkan_nilai([]) == {"lulus": [], "gagal": []}' }
        ],
        hints: ['Siapkan dict dengan dua list kosong dulu.', 'Unpack tuple di dalam loop: for nama, nilai in data'],
        solution: 'def kelompokkan_nilai(data):\n    hasil = {"lulus": [], "gagal": []}\n    for nama, nilai in data:\n        if nilai >= 70:\n            hasil["lulus"].append(nama)\n        else:\n            hasil["gagal"].append(nama)\n    return hasil'
      },
      {
        id: 'm2-e-c2',
        prompt: 'Buat fungsi `flatten(list_bersarang)` yang meratakan list bersarang sedalam apa pun.\n\nContoh: `[1, [2, [3, 4]]]` → `[1, 2, 3, 4]`',
        starter_code: 'def flatten(list_bersarang):\n    pass\n',
        tests: [
          { name: 'Dua tingkat', code: 'assert flatten([1, [2, 3]]) == [1, 2, 3]' },
          { name: 'Tiga tingkat', code: 'assert flatten([1, [2, [3, 4]]]) == [1, 2, 3, 4]' },
          { name: 'List kosong', code: 'assert flatten([]) == []' },
          { name: 'Bersarang dalam', code: 'assert flatten([[[[5]]]]) == [5]' }
        ],
        hints: ['Cek tiap item dengan isinstance(item, list).', 'Kalau list, panggil flatten lagi dan gabung dengan extend().'],
        solution: 'def flatten(list_bersarang):\n    hasil = []\n    for item in list_bersarang:\n        if isinstance(item, list):\n            hasil.extend(flatten(item))\n        else:\n            hasil.append(item)\n    return hasil'
      }
    ]
  }
};
