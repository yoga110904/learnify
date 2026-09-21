export default {
  id: 'm2',
  title: 'Struktur Data & Fungsi',
  icon: '🧰',
  tagline: 'List, dict, comprehension, fungsi, referensi.',
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
        { id: 'm2-l1-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = [1, 2]\na.append([3, 4])\nprint(len(a))', answer: '3',
          explanation: 'append menambah SATU elemen — list [3,4] masuk utuh sebagai satu item.' },
        { id: 'm2-l1-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = [3, 1, 2]\na = a.sort()\nprint(a)', answer: 'None',
          explanation: '.sort() mengembalikan None, jadi variabelnya jadi None.' },
        { id: 'm2-l1-q4', type: 'true_false', question: 'Setelah b = a (a sebuah list), mengubah b juga mengubah a.', answer: true,
          explanation: 'Keduanya menunjuk list yang sama. Pakai a.copy() kalau butuh salinan.' },
        { id: 'm2-l1-q5', type: 'mcq', question: 'Beda append dan extend adalah ...', options: ['Tidak ada', 'append menambah satu elemen, extend membongkar isinya', 'extend lebih cepat', 'append hanya untuk angka'], answer: 1,
          explanation: 'x.append([3,4]) menghasilkan [..., [3,4]]; x.extend([3,4]) menghasilkan [..., 3, 4].' },
        { id: 'm2-l1-q6', type: 'mcq', question: 'Method yang menghapus berdasarkan NILAI (bukan index) adalah ...', options: ['pop()', 'del', 'remove()', 'clear()'], answer: 2,
          explanation: 'pop dan del bekerja dengan index; remove dengan nilai dan error kalau tidak ditemukan.' },
        { id: 'm2-l1-q7', type: 'predict_output', question: 'Apa output kode berikut?', code: 'grid = [[0] * 2] * 2\ngrid[0][0] = 9\nprint(grid)', answer: '[[9, 0], [9, 0]]',
          explanation: '* 2 menyalin referensi ke list yang sama, jadi dua barisnya sebenarnya satu objek.' },
        { id: 'm2-l1-q8', type: 'mcq', question: 'Kenapa method yang mengubah list di tempat mengembalikan None?', options: ['Bug Python', 'Konvensi Python untuk menandai operasi in-place', 'Untuk menghemat memori', 'Supaya lebih cepat'], answer: 1,
          explanation: 'Berlaku juga untuk .append(), .reverse(), dan .clear().' }
      ],
      coding: {
        prompt: 'Buat fungsi `rata_rata(angka)` yang mengembalikan rata-rata isi list. Kalau listnya kosong, kembalikan `0`.',
        starter_code: 'def rata_rata(angka):\n    pass\n',
        tests: [
          { name: 'rata_rata([2, 4, 6]) == 4', code: 'assert rata_rata([2, 4, 6]) == 4' },
          { name: 'List kosong menghasilkan 0', code: 'assert rata_rata([]) == 0' },
          { name: 'rata_rata([5]) == 5', code: 'assert rata_rata([5]) == 5' },
          { name: 'Rata-rata desimal', code: 'assert abs(rata_rata([1, 2]) - 1.5) < 1e-9' },
          { name: 'Bekerja untuk angka negatif', code: 'assert rata_rata([-10, 10]) == 0' }
        ],
        hints: ['List kosong bernilai falsy: if not angka: return 0', 'sum(angka) / len(angka)'],
        solution: 'def rata_rata(angka):\n    if not angka:\n        return 0\n    return sum(angka) / len(angka)'
      }
    },
    {
      id: 'm2-l8',
      title: 'List Lanjutan — Sorting & Slicing',
      duration: 24,
      objectives: ['Mengurutkan dengan parameter key', 'Mengurutkan berdasarkan beberapa kriteria', 'Menguasai slicing lanjutan'],
      quiz: [
        { id: 'm2-l8-q1', type: 'mcq', question: 'Parameter key pada sorted() menerima ...', options: ['Nama kolom', 'Sebuah fungsi yang menentukan nilai penilaian tiap elemen', 'Angka index', 'String pembanding'], answer: 1,
          explanation: 'Contoh: key=len atau key=lambda s: s["nilai"].' },
        { id: 'm2-l8-q2', type: 'mcq', question: 'Menulis key=len() dengan kurung akan ...', options: ['Bekerja normal', 'Error, karena kamu memanggil fungsinya bukan mengopernya', 'Mengurutkan terbalik', 'Diabaikan Python'], answer: 1,
          explanation: 'key butuh objek fungsinya, jadi tulis key=len tanpa kurung.' },
        { id: 'm2-l8-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'kata = ["banana", "kiwi", "apple"]\nprint(sorted(kata, key=len)[0])', answer: 'kiwi',
          explanation: 'Diurutkan berdasarkan panjang kata; "kiwi" paling pendek.' },
        { id: 'm2-l8-q4', type: 'mcq', question: 'Untuk mengurutkan berdasarkan dua kriteria, key sebaiknya mengembalikan ...', options: ['String', 'Tuple', 'List', 'Dict'], answer: 1,
          explanation: 'Python membandingkan elemen pertama dulu, baru elemen kedua kalau seri.' },
        { id: 'm2-l8-q5', type: 'mcq', question: 'Sort Python bersifat "stable", artinya ...', options: ['Tidak pernah error', 'Elemen dengan nilai sama mempertahankan urutan sebelumnya', 'Selalu menaik', 'Hasilnya selalu sama'], answer: 1,
          explanation: 'Berkat itu, pengurutan bertingkat bisa dilakukan dengan dua kali sort.' },
        { id: 'm2-l8-q6', type: 'mcq', question: 'Untuk mengambil elemen dengan nilai tertinggi, cara paling efisien adalah ...', options: ['sorted(data)[-1]', 'max(data, key=...)', 'data.sort() lalu ambil terakhir', 'reversed(data)[0]'], answer: 1,
          explanation: 'max hanya melewati list sekali; mengurutkan seluruhnya itu pemborosan.' },
        { id: 'm2-l8-q7', type: 'predict_output', question: 'Apa output kode berikut?', code: 'n = [0,1,2,3,4,5,6,7,8,9]\nprint(n[1::3])', answer: '[1, 4, 7]',
          explanation: 'Mulai index 1, loncat 3.' },
        { id: 'm2-l8-q8', type: 'true_false', question: 'Slicing pada list selalu menghasilkan list baru, jadi aman diubah.', answer: true,
          explanation: 'Beda dengan b = a yang berbagi objek yang sama.' }
      ],
      coding: {
        prompt: 'Buat fungsi `urutkan_siswa(data)` yang mengurutkan list of dict berdasarkan:\n\n1. `kelas` menaik (A, B, C, ...)\n2. lalu `nilai` **menurun** di dalam kelas yang sama\n\nKembalikan list baru tanpa mengubah data aslinya.',
        starter_code: 'def urutkan_siswa(data):\n    pass\n',
        tests: [
          { name: 'Urutan kelas lalu nilai benar', code: 'd = [{"nama":"C","kelas":"A","nilai":80},{"nama":"B","kelas":"A","nilai":92},{"nama":"A","kelas":"B","nilai":85}]\nassert [s["nama"] for s in urutkan_siswa(d)] == ["B", "C", "A"]' },
          { name: 'Tidak mengubah list asli', code: 'd = [{"nama":"C","kelas":"A","nilai":80},{"nama":"B","kelas":"A","nilai":92}]\nurutkan_siswa(d)\nassert d[0]["nama"] == "C"' },
          { name: 'List kosong aman', code: 'assert urutkan_siswa([]) == []' },
          { name: 'Satu kelas saja tetap urut menurun', code: 'd = [{"nama":"X","kelas":"A","nilai":70},{"nama":"Y","kelas":"A","nilai":95}]\nassert [s["nama"] for s in urutkan_siswa(d)] == ["Y", "X"]' }
        ],
        hints: ['Pakai sorted() supaya list baru, bukan .sort().', 'key=lambda s: (s["kelas"], -s["nilai"]) — minus membalik arah untuk angka.'],
        solution: 'def urutkan_siswa(data):\n    return sorted(data, key=lambda s: (s["kelas"], -s["nilai"]))'
      }
    },
    {
      id: 'm2-l2',
      title: 'Tuple & Set',
      duration: 22,
      objectives: ['Mengenal tuple yang immutable', 'Memakai unpacking dengan *', 'Memakai set untuk data unik dan operasi himpunan'],
      quiz: [
        { id: 'm2-l2-q1', type: 'mcq', question: 'Hasil dari len({1, 1, 2, 3}) adalah ...', options: ['4', '3', '2', 'Error'], answer: 1,
          explanation: 'Set membuang duplikat, jadi isinya {1, 2, 3}.' },
        { id: 'm2-l2-q2', type: 'true_false', question: 'Isi tuple bisa diubah setelah dibuat.', answer: false,
          explanation: 'Tuple bersifat immutable. Mengubah elemennya menghasilkan TypeError.' },
        { id: 'm2-l2-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = {1, 2, 3}\nb = {3, 4}\nprint(sorted(a & b))', answer: '[3]',
          explanation: '& adalah irisan dua set; hanya 3 yang ada di keduanya.' },
        { id: 'm2-l2-q4', type: 'mcq', question: 'Cara membuat set kosong adalah ...', options: ['{}', 'set()', '[]', '()'], answer: 1,
          explanation: '{} membuat dictionary kosong, bukan set.' },
        { id: 'm2-l2-q5', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(type((5)))', answer: "<class 'int'>",
          explanation: 'Yang membuat tuple adalah koma, bukan kurung. (5,) baru tuple.' },
        { id: 'm2-l2-q6', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a, *b = [1, 2, 3, 4]\nprint(b)', answer: '[2, 3, 4]',
          explanation: 'Bintang menampung sisanya sebagai list.' },
        { id: 'm2-l2-q7', type: 'mcq', question: 'Kenapa list tidak bisa jadi kunci dictionary?', options: ['Terlalu besar', 'Tidak hashable karena isinya bisa berubah', 'Dilarang Python', 'Terlalu lambat'], answer: 1,
          explanation: 'Kunci butuh hash yang stabil; tuple bisa karena immutable.' },
        { id: 'm2-l2-q8', type: 'mcq', question: 'Pengecekan "x in data" jauh lebih cepat kalau data bertipe ...', options: ['list', 'tuple', 'set', 'string'], answer: 2,
          explanation: 'Set memakai hashing, bukan memeriksa satu per satu.' }
      ],
      coding: {
        prompt: 'Buat fungsi `hapus_duplikat(data)` yang mengembalikan list tanpa duplikat, dengan **urutan kemunculan pertama dipertahankan**.',
        starter_code: 'def hapus_duplikat(data):\n    pass\n',
        tests: [
          { name: '[3,1,3,2,1] -> [3,1,2]', code: 'assert hapus_duplikat([3, 1, 3, 2, 1]) == [3, 1, 2]' },
          { name: 'List kosong -> []', code: 'assert hapus_duplikat([]) == []' },
          { name: 'Bekerja untuk string', code: 'assert hapus_duplikat(["a", "b", "a"]) == ["a", "b"]' },
          { name: 'Tanpa duplikat tetap utuh', code: 'assert hapus_duplikat([1, 2, 3]) == [1, 2, 3]' }
        ],
        hints: ['list(set(data)) tidak menjaga urutan.', 'Pakai set "seen" untuk mencatat yang sudah pernah muncul.', 'Alternatif satu baris: list(dict.fromkeys(data))'],
        solution: 'def hapus_duplikat(data):\n    seen = set()\n    hasil = []\n    for x in data:\n        if x not in seen:\n            seen.add(x)\n            hasil.append(x)\n    return hasil'
      }
    },
    {
      id: 'm2-l3',
      title: 'Dictionary',
      duration: 24,
      objectives: ['Menyimpan data kunci–nilai', 'Mengakses data dengan aman lewat .get()', 'Menghitung frekuensi dan menggabungkan dict'],
      quiz: [
        { id: 'm2-l3-q1', type: 'mcq', question: 'Apa hasil d.get("x", 0) kalau kunci "x" tidak ada?', options: ['KeyError', '0', 'None', 'False'], answer: 1,
          explanation: 'Argumen kedua .get() adalah nilai default kalau kunci tidak ditemukan.' },
        { id: 'm2-l3-q2', type: 'mcq', question: 'Cara looping kunci dan nilai sekaligus adalah ...', options: ['d.items()', 'd.all()', 'd.pairs()', 'd.both()'], answer: 0,
          explanation: 'for k, v in d.items() memberi kunci dan nilainya sekaligus.' },
        { id: 'm2-l3-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'd = {"a": 1}\nd["a"] = d.get("a", 0) + 1\nprint(d)', answer: "{'a': 2}",
          explanation: 'Pola hitung frekuensi: ambil nilai lama, tambah, simpan lagi.' },
        { id: 'm2-l3-q4', type: 'mcq', question: 'Manakah yang TIDAK bisa dipakai sebagai kunci dictionary?', options: ['"nama"', '(1, 2)', '[1, 2]', '7'], answer: 2,
          explanation: 'Kunci harus immutable. List tidak bisa (unhashable).' },
        { id: 'm2-l3-q5', type: 'mcq', question: '"a" in d pada sebuah dict mengecek ...', options: ['Kuncinya', 'Nilainya', 'Keduanya', 'Panjangnya'], answer: 0,
          explanation: 'Untuk mengecek nilai, pakai "a" in d.values().' },
        { id: 'm2-l3-q6', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = {"x": 1, "y": 2}\nb = {"y": 99}\nprint({**a, **b})', answer: "{'x': 1, 'y': 99}",
          explanation: 'Saat digabung, dict yang ditulis belakangan menimpa.' },
        { id: 'm2-l3-q7', type: 'mcq', question: 'Menghapus kunci sambil melakukan loop pada dict yang sama menyebabkan ...', options: ['Tidak apa-apa', 'RuntimeError: dictionary changed size during iteration', 'Kunci dilewati diam-diam', 'Program berhenti'], answer: 1,
          explanation: 'Salin daftar kuncinya dulu: for k in list(d).' },
        { id: 'm2-l3-q8', type: 'true_false', question: 'Sejak Python 3.7, dictionary menjaga urutan penyisipan.', answer: true,
          explanation: 'Jadi urutan looping-nya bisa diandalkan.' }
      ],
      coding: {
        prompt: 'Buat fungsi `hitung_kata(kalimat)` yang mengembalikan dict berisi frekuensi tiap kata. Semua kata diubah jadi **huruf kecil**.',
        starter_code: 'def hitung_kata(kalimat):\n    pass\n',
        tests: [
          { name: 'Kalimat biasa', code: 'assert hitung_kata("aku dan kamu dan dia") == {"aku": 1, "dan": 2, "kamu": 1, "dia": 1}' },
          { name: 'Huruf besar dianggap sama', code: 'assert hitung_kata("A a") == {"a": 2}' },
          { name: 'Kalimat kosong -> {}', code: 'assert hitung_kata("") == {}' },
          { name: 'Spasi berlebih diabaikan', code: 'assert hitung_kata("  a   a  b ") == {"a": 2, "b": 1}' }
        ],
        hints: ['Pecah kalimat dengan .split()', 'hitung[kata] = hitung.get(kata, 0) + 1'],
        solution: 'def hitung_kata(kalimat):\n    hitung = {}\n    for kata in kalimat.lower().split():\n        hitung[kata] = hitung.get(kata, 0) + 1\n    return hitung'
      }
    },
    {
      id: 'm2-l9',
      title: 'Dictionary Lanjutan & Data Bersarang',
      duration: 26,
      objectives: ['Membaca struktur dict-list bersarang', 'Mengakses data secara aman', 'Mengelompokkan dan membentuk ulang data'],
      quiz: [
        { id: 'm2-l9-q1', type: 'mcq', question: 'Saat bingung dengan struktur data bersarang, langkah pertama yang paling berguna adalah ...', options: ['Menebak strukturnya', 'Mencetak type() dan .keys() di tiap lapis', 'Menghapus lapisannya', 'Mengubahnya jadi string'], answer: 1,
          explanation: 'Menelusuri bertahap jauh lebih cepat daripada menebak.' },
        { id: 'm2-l9-q2', type: 'mcq', question: 'Pada .get() berantai, default tiap lapis sebaiknya ...', options: ['None', '{} (dict kosong)', '0', '""'], answer: 1,
          explanation: 'Supaya .get() berikutnya tetap punya dict untuk dipanggil; None akan AttributeError.' },
        { id: 'm2-l9-q3', type: 'mcq', question: 'defaultdict(list) berguna karena ...', options: ['Lebih cepat', 'Kunci yang belum ada otomatis dibuat berisi list kosong', 'Menjaga urutan', 'Membuang duplikat'], answer: 1,
          explanation: 'Jadi grup[k].append(v) langsung bisa dipakai tanpa pengecekan.' },
        { id: 'm2-l9-q4', type: 'mcq', question: 'Di JSON, nilai benar/salah ditulis ...', options: ['True / False', 'true / false', 'yes / no', '1 / 0'], answer: 1,
          explanation: 'Dan null di JSON setara None di Python — karena itu perlu json.loads().' },
        { id: 'm2-l9-q5', type: 'mcq', question: 'Kenapa f"{d["k"]}" menyebabkan error?', options: ['Kunci tidak ada', 'Kutip ganda di dalam f-string berkutip ganda menutup string lebih awal', 'Dict tidak boleh di f-string', 'Perlu tanda +'], answer: 1,
          explanation: 'Pakai kutip tunggal di dalam: f"{d[\'k\']}".' },
        { id: 'm2-l9-q6', type: 'mcq', question: 'Mengubah list of dict jadi {id: dict} berguna untuk ...', options: ['Menghemat memori', 'Membuat pencarian berdasarkan id jadi instan', 'Mengurutkan data', 'Membuang duplikat'], answer: 1,
          explanation: 'Daripada melewati seluruh list tiap kali mencari.' },
        { id: 'm2-l9-q7', type: 'predict_output', question: 'Apa output kode berikut?', code: 'd = {"a": {"b": {"c": 42}}}\nprint(d.get("a", {}).get("x", {}).get("c", "-"))', answer: '-',
          explanation: 'Kunci "x" tidak ada, jadi lapis berikutnya memakai dict kosong dan berakhir di default.' }
      ],
      coding: {
        prompt: 'Diberikan struktur respons API:\n\n```python\n{"data": {"pesanan": [{"id": 1, "total": 50000}, ...]}}\n```\n\nBuat fungsi `ringkas_pesanan(response)` yang mengembalikan dict:\n\n```python\n{"jumlah": int, "total": int, "terbesar": int}\n```\n\n`terbesar` adalah **id** pesanan dengan total tertinggi. Kalau tidak ada pesanan (atau strukturnya tidak lengkap), kembalikan `{"jumlah": 0, "total": 0, "terbesar": None}`.',
        starter_code: 'def ringkas_pesanan(response):\n    pass\n',
        tests: [
          { name: 'Dua pesanan', code: 'r = {"data": {"pesanan": [{"id": 1, "total": 50000}, {"id": 2, "total": 75000}]}}\nassert ringkas_pesanan(r) == {"jumlah": 2, "total": 125000, "terbesar": 2}' },
          { name: 'Satu pesanan', code: 'r = {"data": {"pesanan": [{"id": 9, "total": 100}]}}\nassert ringkas_pesanan(r) == {"jumlah": 1, "total": 100, "terbesar": 9}' },
          { name: 'Tanpa pesanan', code: 'assert ringkas_pesanan({"data": {"pesanan": []}}) == {"jumlah": 0, "total": 0, "terbesar": None}' },
          { name: 'Struktur tidak lengkap tetap aman', code: 'assert ringkas_pesanan({}) == {"jumlah": 0, "total": 0, "terbesar": None}' },
          { name: 'Kunci data ada tapi pesanan tidak', code: 'assert ringkas_pesanan({"data": {}}) == {"jumlah": 0, "total": 0, "terbesar": None}' }
        ],
        hints: ['Ambil dengan aman: response.get("data", {}).get("pesanan", [])', 'max(pesanan, key=lambda p: p["total"])["id"] untuk id terbesar.'],
        solution: 'def ringkas_pesanan(response):\n    pesanan = response.get("data", {}).get("pesanan", []) or []\n    if not pesanan:\n        return {"jumlah": 0, "total": 0, "terbesar": None}\n    return {\n        "jumlah": len(pesanan),\n        "total": sum(p["total"] for p in pesanan),\n        "terbesar": max(pesanan, key=lambda p: p["total"])["id"]\n    }'
      }
    },
    {
      id: 'm2-l11',
      title: 'Mutability, Referensi & Copy',
      duration: 24,
      objectives: ['Memahami variabel sebagai label ke objek', 'Menyalin data dengan benar', 'Menghindari jebakan default argument'],
      quiz: [
        { id: 'm2-l11-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)', answer: '[1, 2, 3]',
          explanation: 'b = a tidak menyalin — keduanya label untuk objek yang sama.' },
        { id: 'm2-l11-q2', type: 'mcq', question: 'Manakah yang termasuk tipe IMMUTABLE?', options: ['list', 'dict', 'tuple', 'set'], answer: 2,
          explanation: 'int, float, str, bool, dan tuple immutable; list, dict, set mutable.' },
        { id: 'm2-l11-q3', type: 'mcq', question: 'a.copy() pada list bersarang tidak cukup karena ...', options: ['Terlalu lambat', 'Hanya menyalin lapis terluar, isinya masih berbagi referensi', 'Menghasilkan error', 'Mengubah aslinya'], answer: 1,
          explanation: 'Untuk data bersarang, pakai copy.deepcopy().' },
        { id: 'm2-l11-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def f(x, daftar=[]):\n    daftar.append(x)\n    return daftar\nprint(f(1))\nprint(f(2))', answer: '[1]\n[1, 2]',
          explanation: 'Nilai default dievaluasi sekali saat fungsi didefinisikan, lalu dipakai ulang.' },
        { id: 'm2-l11-q5', type: 'mcq', question: 'Cara benar menulis parameter berdefault yang mutable adalah ...', options: ['def f(x, d=[])', 'def f(x, d=None) lalu buat list di dalam', 'def f(x, d={})', 'def f(x, *d)'], answer: 1,
          explanation: 'if d is None: d = [] di baris pertama fungsi.' },
        { id: 'm2-l11-q6', type: 'mcq', question: 'Kenapa int dan str tidak pernah kena masalah "berubah sendiri"?', options: ['Karena ukurannya kecil', 'Karena immutable — "mengubahnya" sebenarnya membuat objek baru', 'Karena disimpan di cache', 'Karena bukan objek'], answer: 1,
          explanation: 'Label lain tetap menunjuk objek lama yang tidak berubah.' },
        { id: 'm2-l11-q7', type: 'true_false', question: 'Fungsi bisa mengubah isi list milik pemanggilnya.', answer: true,
          explanation: 'Karena argumen mutable dioper sebagai referensi. Salin dulu kalau tidak ingin mengubahnya.' }
      ],
      coding: {
        prompt: 'Buat dua fungsi:\n\n- `tambah_bonus(nilai, bonus=5)` → kembalikan **list baru** dengan tiap nilai ditambah bonus, tanpa mengubah list asli\n- `catat(item, log=None)` → tambahkan item ke log dan kembalikan log-nya. Kalau `log` tidak diberikan, mulai dari list kosong **yang baru tiap pemanggilan**.',
        starter_code: 'def tambah_bonus(nilai, bonus=5):\n    pass\n\n\ndef catat(item, log=None):\n    pass\n',
        tests: [
          { name: 'Bonus ditambahkan', code: 'assert tambah_bonus([80, 90]) == [85, 95]' },
          { name: 'List asli tidak berubah', code: 'n = [80, 90]\ntambah_bonus(n)\nassert n == [80, 90]' },
          { name: 'Bonus bisa diubah', code: 'assert tambah_bonus([10], bonus=1) == [11]' },
          { name: 'catat tidak mengingat pemanggilan sebelumnya', code: 'assert catat("a") == ["a"]\nassert catat("b") == ["b"]' },
          { name: 'catat bisa menerima log yang sudah ada', code: 'l = ["x"]\nassert catat("y", l) == ["x", "y"]' }
        ],
        hints: ['tambah_bonus: pakai comprehension [n + bonus for n in nilai] — otomatis membuat list baru.', 'catat: mulai dengan if log is None: log = []'],
        solution: 'def tambah_bonus(nilai, bonus=5):\n    return [n + bonus for n in nilai]\n\n\ndef catat(item, log=None):\n    if log is None:\n        log = []\n    log.append(item)\n    return log'
      }
    },
    {
      id: 'm2-l4',
      title: 'Comprehension',
      duration: 22,
      objectives: ['Menulis list comprehension', 'Menyaring dan memilih nilai', 'Mengenal dict, set, dan generator expression'],
      quiz: [
        { id: 'm2-l4-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print([x for x in range(6) if x % 2 == 0])', answer: '[0, 2, 4]',
          explanation: 'if di belakang berfungsi sebagai filter.' },
        { id: 'm2-l4-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print({x: x * x for x in [1, 2, 3]})', answer: '{1: 1, 2: 4, 3: 9}',
          explanation: 'Dict comprehension membuat pasangan kunci: nilai.' },
        { id: 'm2-l4-q3', type: 'mcq', question: 'Di mana posisi if/else kalau kita ingin memilih antara dua nilai?', options: ['Di belakang, setelah for', 'Di depan, sebelum for', 'Tidak bisa dipakai', 'Di dalam kurung siku kedua'], answer: 1,
          explanation: 'Bentuk ternary ditulis di depan: [a if kondisi else b for x in data].' },
        { id: 'm2-l4-q4', type: 'mcq', question: 'Kurung biasa pada (x for x in data) menghasilkan ...', options: ['tuple', 'generator', 'list', 'set'], answer: 1,
          explanation: 'Generator menghasilkan nilai satu per satu, hemat memori.' },
        { id: 'm2-l4-q5', type: 'mcq', question: 'Kenapa [x if x % 2 == 0 for x in range(5)] error?', options: ['range tidak boleh', 'if tanpa else di posisi depan tidak sah', 'Harus pakai lambda', 'x belum didefinisikan'], answer: 1,
          explanation: 'Di posisi depan itu ternary yang wajib punya else; untuk menyaring, taruh if di belakang.' },
        { id: 'm2-l4-q6', type: 'predict_output', question: 'Apa output kode berikut?', code: 'm = [[1, 2], [3, 4]]\nprint([x for baris in m for x in baris])', answer: '[1, 2, 3, 4]',
          explanation: 'Urutan for-nya dari luar ke dalam, sama seperti nested loop biasa.' },
        { id: 'm2-l4-q7', type: 'true_false', question: 'Memakai comprehension hanya untuk efek samping seperti print adalah praktik yang baik.', answer: false,
          explanation: 'Itu membuat list sampah berisi None. Pakai loop biasa.' }
      ],
      coding: {
        prompt: 'Buat fungsi `kuadrat_genap(data)` yang mengembalikan list kuadrat dari **angka genap saja**. Gunakan list comprehension.',
        starter_code: 'def kuadrat_genap(data):\n    pass\n',
        tests: [
          { name: '[1,2,3,4] -> [4, 16]', code: 'assert kuadrat_genap([1, 2, 3, 4]) == [4, 16]' },
          { name: 'Tidak ada genap -> []', code: 'assert kuadrat_genap([1, 3]) == []' },
          { name: 'Nol termasuk genap', code: 'assert kuadrat_genap([0, 5]) == [0]' },
          { name: 'Angka negatif genap ikut', code: 'assert kuadrat_genap([-2, -3]) == [4]' }
        ],
        hints: ['Pola: [x * x for x in data if ...]', 'Genap berarti x % 2 == 0'],
        solution: 'def kuadrat_genap(data):\n    return [x * x for x in data if x % 2 == 0]'
      }
    },
    {
      id: 'm2-l5',
      title: 'Fungsi',
      duration: 24,
      objectives: ['Membungkus logika jadi fungsi', 'Paham beda return dan print', 'Menulis fungsi yang baik'],
      quiz: [
        { id: 'm2-l5-q1', type: 'mcq', question: 'Fungsi tanpa return akan mengembalikan ...', options: ['0', 'None', 'Error', 'String kosong'], answer: 1,
          explanation: 'Semua fungsi mengembalikan sesuatu; kalau tidak ditulis, nilainya None.' },
        { id: 'm2-l5-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def f(a, b=10):\n    return a + b\nprint(f(5))', answer: '15',
          explanation: 'Parameter b memakai nilai default 10.' },
        { id: 'm2-l5-q3', type: 'true_false', question: 'print() di dalam fungsi sudah cukup kalau hasilnya mau dipakai perhitungan lain.', answer: false,
          explanation: 'print hanya menampilkan. Untuk dipakai lagi, nilainya harus di-return.' },
        { id: 'm2-l5-q4', type: 'mcq', question: 'def f(a=1, b) menghasilkan SyntaxError karena ...', options: ['Nama parameter salah', 'Parameter tanpa default tidak boleh setelah yang berdefault', 'Terlalu banyak parameter', 'Harus pakai *'], answer: 1,
          explanation: 'Python tidak akan tahu nilai mana untuk siapa saat dipanggil f(5).' },
        { id: 'm2-l5-q5', type: 'mcq', question: 'Beda parameter dan argumen adalah ...', options: ['Tidak ada', 'Parameter di definisi, argumen nilai saat dipanggil', 'Argumen di definisi, parameter saat dipanggil', 'Parameter hanya untuk angka'], answer: 1,
          explanation: 'def f(nama) — nama adalah parameter; f("Salsa") — "Salsa" adalah argumen.' },
        { id: 'm2-l5-q6', type: 'mcq', question: 'Docstring berbeda dari komentar karena ...', options: ['Lebih panjang', 'Menjadi bagian dari objek fungsi dan bisa dibaca lewat help()', 'Ditulis dengan #', 'Dijalankan Python'], answer: 1,
          explanation: 'Bisa diakses lewat fungsi.__doc__ dan dipakai tool dokumentasi.' },
        { id: 'm2-l5-q7', type: 'mcq', question: 'Tanda fungsi perlu dipecah biasanya ...', options: ['Namanya panjang', 'Namanya mengandung kata "dan"', 'Punya docstring', 'Mengembalikan tuple'], answer: 1,
          explanation: 'Fungsi yang baik melakukan satu tugas saja.' }
      ],
      coding: {
        prompt: 'Buat fungsi `total_belanja(*harga, diskon=0)` yang menjumlahkan semua harga lalu menguranginya sebesar `diskon` **persen**.',
        starter_code: 'def total_belanja(*harga, diskon=0):\n    pass\n',
        tests: [
          { name: 'Tanpa diskon', code: 'assert total_belanja(100, 200) == 300' },
          { name: 'Diskon 10 persen', code: 'assert total_belanja(100, 100, diskon=10) == 180' },
          { name: 'Tanpa argumen -> 0', code: 'assert total_belanja() == 0' },
          { name: 'Satu item dengan diskon 50', code: 'assert total_belanja(200, diskon=50) == 100' },
          { name: 'Diskon 100 persen -> 0', code: 'assert total_belanja(500, diskon=100) == 0' }
        ],
        hints: ['sum(harga) menjumlahkan semua argumen.', 'Potongan = subtotal * diskon / 100'],
        solution: 'def total_belanja(*harga, diskon=0):\n    subtotal = sum(harga)\n    return subtotal - subtotal * diskon / 100'
      }
    },
    {
      id: 'm2-l10',
      title: 'Argumen Fungsi Lanjutan',
      duration: 24,
      objectives: ['Memakai *args dan **kwargs', 'Memahami parameter keyword-only', 'Membongkar argumen saat memanggil'],
      quiz: [
        { id: 'm2-l10-q1', type: 'mcq', question: 'Di dalam fungsi, *args menampung argumen sebagai ...', options: ['list', 'tuple', 'dict', 'set'], answer: 1,
          explanation: '*args menjadi tuple, **kwargs menjadi dict.' },
        { id: 'm2-l10-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def f(*a, **k):\n    return len(a), len(k)\nprint(f(1, 2, x=3))', answer: '(2, 1)',
          explanation: 'Dua argumen posisional masuk ke args, satu keyword masuk ke kwargs.' },
        { id: 'm2-l10-q3', type: 'mcq', question: 'Parameter yang ditulis setelah *args menjadi ...', options: ['Opsional', 'Keyword-only, harus disebut namanya', 'Diabaikan', 'Posisional pertama'], answer: 1,
          explanation: 'Karena semua argumen posisional sudah ditangkap *args.' },
        { id: 'm2-l10-q4', type: 'mcq', question: 'Di sisi PEMANGGILAN, f(*data) berarti ...', options: ['Mengumpulkan argumen', 'Membongkar tuple/list jadi argumen terpisah', 'Membuat copy', 'Mengabaikan data'], answer: 1,
          explanation: 'Di definisi * mengumpulkan; di pemanggilan * membongkar.' },
        { id: 'm2-l10-q5', type: 'mcq', question: 'def f(nama, *, admin=False) memaksa admin ...', options: ['Selalu False', 'Harus disebut namanya saat dipanggil', 'Menjadi posisional', 'Tidak boleh diisi'], answer: 1,
          explanation: 'Praktik baik untuk parameter boolean supaya pemanggilannya jelas.' },
        { id: 'm2-l10-q6', type: 'mcq', question: 'f(**data) mengharuskan kunci dict ...', options: ['Berupa angka', 'Persis sama dengan nama parameter', 'Urut alfabet', 'Bertipe string bebas'], answer: 1,
          explanation: 'Kunci yang tidak dikenal akan menghasilkan TypeError.' },
        { id: 'm2-l10-q7', type: 'true_false', question: 'Meneruskan *args, **kwargs ke fungsi lain adalah dasar pola decorator.', answer: true,
          explanation: 'Pembungkus jadi bisa dipakai untuk fungsi apa pun tanpa tahu parameternya.' }
      ],
      coding: {
        prompt: 'Buat fungsi `buat_laporan(*nilai, pembulatan=2, **meta)` yang mengembalikan dict:\n\n```python\n{"jumlah": int, "rata": float, "meta": dict}\n```\n\n- `rata` dibulatkan sesuai `pembulatan`\n- `meta` berisi semua keyword argument tambahan\n- Tanpa nilai → `{"jumlah": 0, "rata": 0.0, "meta": {...}}`',
        starter_code: 'def buat_laporan(*nilai, pembulatan=2, **meta):\n    pass\n',
        tests: [
          { name: 'Menghitung jumlah dan rata-rata', code: 'h = buat_laporan(80, 90, 70)\nassert h["jumlah"] == 3 and h["rata"] == 80.0' },
          { name: 'Pembulatan dipakai', code: 'assert buat_laporan(1, 2, pembulatan=3)["rata"] == 1.5' },
          { name: 'Meta menampung keyword sisa', code: 'h = buat_laporan(10, kelas="A", guru="Budi")\nassert h["meta"] == {"kelas": "A", "guru": "Budi"}' },
          { name: 'pembulatan tidak ikut ke meta', code: 'assert "pembulatan" not in buat_laporan(10, pembulatan=1)["meta"]' },
          { name: 'Tanpa nilai aman', code: 'h = buat_laporan()\nassert h["jumlah"] == 0 and h["rata"] == 0.0' }
        ],
        hints: ['nilai adalah tuple, meta adalah dict — pakai langsung.', 'Jaga pembagian nol: kalau tidak ada nilai, rata = 0.0.'],
        solution: 'def buat_laporan(*nilai, pembulatan=2, **meta):\n    jumlah = len(nilai)\n    rata = round(sum(nilai) / jumlah, pembulatan) if jumlah else 0.0\n    return {"jumlah": jumlah, "rata": rata, "meta": meta}'
      }
    },
    {
      id: 'm2-l6',
      title: 'Scope & Lambda',
      duration: 22,
      objectives: ['Memahami variabel lokal vs global', 'Mengenal aturan LEGB dan closure', 'Memakai lambda sebagai key sorting'],
      quiz: [
        { id: 'm2-l6-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'x = 1\ndef f():\n    x = 2\nf()\nprint(x)', answer: '1',
          explanation: 'x di dalam fungsi adalah variabel lokal baru, tidak menimpa x global.' },
        { id: 'm2-l6-q2', type: 'mcq', question: 'Urutan pencarian nama variabel di Python adalah ...', options: ['Global → Local → Built-in', 'Local → Enclosing → Global → Built-in', 'Built-in → Global → Local', 'Acak'], answer: 1,
          explanation: 'Dikenal sebagai aturan LEGB.' },
        { id: 'm2-l6-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'kata = ["banana", "kiwi", "apple"]\nprint(sorted(kata, key=len)[0])', answer: 'kiwi',
          explanation: 'key=len mengurutkan berdasarkan panjang kata; "kiwi" paling pendek.' },
        { id: 'm2-l6-q4', type: 'true_false', question: 'Lambda boleh berisi beberapa baris statement.', answer: false,
          explanation: 'Lambda hanya boleh satu ekspresi. Kalau lebih, pakai def.' },
        { id: 'm2-l6-q5', type: 'mcq', question: 'UnboundLocalError terjadi ketika ...', options: ['Variabel tidak ada sama sekali', 'Variabel global dibaca di fungsi yang juga menugaskan padanya', 'Fungsi tidak punya return', 'Terlalu banyak parameter'], answer: 1,
          explanation: 'Adanya penugasan membuat Python menandai variabel itu lokal untuk seluruh fungsi.' },
        { id: 'm2-l6-q6', type: 'mcq', question: 'Fungsi dalam yang "mengingat" variabel fungsi luarnya disebut ...', options: ['Generator', 'Closure', 'Decorator', 'Lambda'], answer: 1,
          explanation: 'Konsep ini jadi dasar decorator di Modul 5.' },
        { id: 'm2-l6-q7', type: 'mcq', question: 'Kenapa sebaiknya menghindari kata kunci global?', options: ['Lambat', 'Membuat fungsi diam-diam mengubah keadaan di luar sehingga sulit dilacak & diuji', 'Tidak didukung Python 3', 'Boros memori'], answer: 1,
          explanation: 'Lebih baik terima lewat parameter dan kembalikan lewat return.' },
        { id: 'm2-l6-q8', type: 'mcq', question: 'f = tambah dan f = tambah(1, 2) berbeda karena ...', options: ['Tidak ada bedanya', 'Yang pertama menyimpan fungsinya, yang kedua menyimpan hasilnya', 'Yang pertama error', 'Yang kedua lebih cepat'], answer: 1,
          explanation: 'Fungsi adalah objek yang bisa disimpan dan dioper.' }
      ],
      coding: {
        prompt: 'Buat fungsi `urut_berdasar_umur(orang)` yang mengurutkan list of dict berdasarkan kunci `"umur"` dari kecil ke besar. Gunakan `sorted` + `lambda`.',
        starter_code: 'def urut_berdasar_umur(orang):\n    pass\n',
        tests: [
          { name: 'Urutan benar', code: 'data = [{"n": "A", "umur": 30}, {"n": "B", "umur": 20}]\nassert [o["n"] for o in urut_berdasar_umur(data)] == ["B", "A"]' },
          { name: 'List kosong aman', code: 'assert urut_berdasar_umur([]) == []' },
          { name: 'Tidak mengubah list asli', code: 'data = [{"n": "A", "umur": 30}, {"n": "B", "umur": 20}]\nurut_berdasar_umur(data)\nassert data[0]["n"] == "A"' },
          { name: 'Umur sama tetap stabil', code: 'data = [{"n": "A", "umur": 20}, {"n": "B", "umur": 20}]\nassert [o["n"] for o in urut_berdasar_umur(data)] == ["A", "B"]' }
        ],
        hints: ['sorted(orang, key=lambda o: o["umur"])', 'sorted() otomatis membuat list baru.'],
        solution: 'def urut_berdasar_umur(orang):\n    return sorted(orang, key=lambda o: o["umur"])'
      }
    },
    {
      id: 'm2-l7',
      title: 'Rekursi',
      duration: 24,
      objectives: ['Memahami base case dan recursive case', 'Menulis fungsi rekursif untuk data bersarang', 'Tahu kapan rekursi tidak tepat'],
      quiz: [
        { id: 'm2-l7-q1', type: 'mcq', question: 'Fungsi rekursif tanpa base case akan ...', options: ['Berhenti sendiri', 'Menghasilkan RecursionError', 'Mengembalikan None', 'Dikompilasi ulang'], answer: 1,
          explanation: 'Tumpukan pemanggilan terus bertambah sampai melewati batas Python.' },
        { id: 'm2-l7-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def f(n):\n    if n <= 1:\n        return 1\n    return n * f(n - 1)\nprint(f(4))', answer: '24',
          explanation: '4 * 3 * 2 * 1 = 24.' },
        { id: 'm2-l7-q3', type: 'true_false', question: 'Semua masalah lebih baik diselesaikan dengan rekursi daripada loop.', answer: false,
          explanation: 'Rekursi unggul untuk data bersarang; kasus sederhana lebih cocok pakai loop.' },
        { id: 'm2-l7-q4', type: 'mcq', question: 'Kenapa fib(35) versi rekursif polos sangat lambat?', options: ['Angkanya terlalu besar', 'Nilai yang sama dihitung berulang kali secara eksponensial', 'Python lambat', 'Memorinya penuh'], answer: 1,
          explanation: '@lru_cache membuat tiap nilai cuma dihitung sekali.' },
        { id: 'm2-l7-q5', type: 'mcq', question: 'Batas kedalaman rekursi default Python sekitar ...', options: ['100', '1000', '10000', 'Tak terbatas'], answer: 1,
          explanation: 'Bisa dicek dengan sys.getrecursionlimit().' },
        { id: 'm2-l7-q6', type: 'mcq', question: 'Rekursi paling tepat dipakai untuk ...', options: ['Menjumlah list datar', 'Mencetak angka 1-100', 'Menjelajah struktur bersarang yang kedalamannya tidak diketahui', 'Mengurutkan dua angka'], answer: 2,
          explanation: 'Contohnya JSON bertingkat, struktur folder, dan pohon komentar.' },
        { id: 'm2-l7-q7', type: 'mcq', question: 'Saat menulis fungsi rekursif, sikap yang membantu adalah ...', options: ['Melacak seluruh tumpukan di kepala', 'Percaya bahwa pemanggilan rekursifnya sudah benar', 'Menghindari base case', 'Memakai variabel global'], answer: 1,
          explanation: 'Kalau f(n-1) sudah benar, maka n * f(n-1) pasti benar juga.' }
      ],
      coding: {
        prompt: 'Buat fungsi `faktorial(n)` **secara rekursif** (tanpa loop).',
        starter_code: 'def faktorial(n):\n    pass\n',
        tests: [
          { name: 'faktorial(0) == 1', code: 'assert faktorial(0) == 1' },
          { name: 'faktorial(1) == 1', code: 'assert faktorial(1) == 1' },
          { name: 'faktorial(5) == 120', code: 'assert faktorial(5) == 120' },
          { name: 'faktorial(10) == 3628800', code: 'assert faktorial(10) == 3628800' },
          { name: 'Ditulis rekursif (tanpa for/while)', code: 'import inspect\nsrc = inspect.getsource(faktorial)\nassert "for " not in src and "while " not in src, "Gunakan rekursi, bukan loop."' }
        ],
        hints: ['Base case: n <= 1 kembalikan 1.', 'Recursive case: return n * faktorial(n - 1)'],
        solution: 'def faktorial(n):\n    if n <= 1:\n        return 1\n    return n * faktorial(n - 1)'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 2 — Struktur Data & Fungsi',
    questionCount: 12,
    passScore: 75,
    extraQuestions: [
      { id: 'm2-x1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'd = {"a": 1, "b": 2}\nprint(list(d.items())[1])', answer: "('b', 2)",
        explanation: '.items() menghasilkan pasangan berbentuk tuple.' },
      { id: 'm2-x2', type: 'mcq', question: 'Manakah yang membuat salinan list, bukan referensi?', options: ['b = a', 'b = a.copy()', 'b = a.sort()', 'b = a.append()'], answer: 1,
        explanation: '.copy() (atau list(a) / a[:]) membuat list baru.' },
      { id: 'm2-x3', type: 'mcq', question: 'Struktur data mana yang paling cepat untuk mengecek "apakah x ada di dalamnya" pada data besar?', options: ['list', 'tuple', 'set', 'string'], answer: 2,
        explanation: 'Set memakai hashing sehingga pengecekan keanggotaan sangat cepat.' },
      { id: 'm2-x4', type: 'true_false', question: 'Comprehension selalu lebih baik daripada loop biasa.', answer: false,
        explanation: 'Kalau sudah sulit dibaca, loop biasa lebih baik.' },
      { id: 'm2-x5', type: 'mcq', question: 'copy.deepcopy() dibutuhkan ketika ...', options: ['Datanya besar', 'Datanya bersarang dan lapis dalamnya juga harus terpisah', 'Datanya immutable', 'Selalu, untuk keamanan'], answer: 1,
        explanation: 'Untuk data datar, .copy() sudah cukup dan jauh lebih murah.' },
      { id: 'm2-x6', type: 'mcq', question: 'defaultdict(int) berguna untuk ...', options: ['Menjaga urutan', 'Menghitung frekuensi tanpa pengecekan kunci', 'Membuang duplikat', 'Mengurutkan kunci'], answer: 1,
        explanation: 'Kunci baru otomatis bernilai 0, jadi += langsung bisa dipakai.' },
      { id: 'm2-x7', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def f(x, d=[]):\n    d.append(x)\n    return len(d)\nf(1)\nprint(f(2))', answer: '2',
        explanation: 'List default dipakai ulang antar pemanggilan, jadi isinya sudah dua.' }
    ],
    coding: [
      {
        id: 'm2-e-c1',
        prompt: 'Buat fungsi `kelompokkan_nilai(data)`. Input berupa list of tuple `(nama, nilai)`. Kembalikan dict:\n\n```python\n{"lulus": [...], "gagal": [...]}\n```\n\nBatas lulus adalah nilai ≥ 70. Isi listnya adalah **nama**-nya saja.',
        starter_code: 'def kelompokkan_nilai(data):\n    pass\n',
        tests: [
          { name: 'Pengelompokan benar', code: 'assert kelompokkan_nilai([("A", 80), ("B", 50)]) == {"lulus": ["A"], "gagal": ["B"]}' },
          { name: 'Batas 70 termasuk lulus', code: 'assert kelompokkan_nilai([("C", 70)]) == {"lulus": ["C"], "gagal": []}' },
          { name: 'Data kosong', code: 'assert kelompokkan_nilai([]) == {"lulus": [], "gagal": []}' },
          { name: 'Urutan dipertahankan', code: 'assert kelompokkan_nilai([("A", 90), ("B", 80)])["lulus"] == ["A", "B"]' }
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
          { name: 'Bersarang dalam', code: 'assert flatten([[[[5]]]]) == [5]' },
          { name: 'List kosong di dalam diabaikan', code: 'assert flatten([1, [], [2, []]]) == [1, 2]' }
        ],
        hints: ['Cek tiap item dengan isinstance(item, list).', 'Kalau list, panggil flatten lagi dan gabung dengan extend().'],
        solution: 'def flatten(list_bersarang):\n    hasil = []\n    for item in list_bersarang:\n        if isinstance(item, list):\n            hasil.extend(flatten(item))\n        else:\n            hasil.append(item)\n    return hasil'
      },
      {
        id: 'm2-e-c3',
        prompt: 'Buat fungsi `statistik_kelas(data)`. Input: list of dict berkunci `nama`, `kelas`, `nilai`.\n\nKembalikan dict per kelas:\n\n```python\n{"A": {"jumlah": 2, "rata": 86.0, "terbaik": "Budi"}, ...}\n```\n\n`rata` dibulatkan 2 angka. Data kosong menghasilkan `{}`.',
        starter_code: 'def statistik_kelas(data):\n    pass\n',
        tests: [
          { name: 'Dua kelas', code: 'd = [{"nama":"Budi","kelas":"A","nilai":92},{"nama":"Ani","kelas":"A","nilai":80},{"nama":"Citra","kelas":"B","nilai":75}]\nh = statistik_kelas(d)\nassert h["A"] == {"jumlah": 2, "rata": 86.0, "terbaik": "Budi"}' },
          { name: 'Kelas kedua benar', code: 'd = [{"nama":"Budi","kelas":"A","nilai":92},{"nama":"Citra","kelas":"B","nilai":75}]\nassert statistik_kelas(d)["B"] == {"jumlah": 1, "rata": 75.0, "terbaik": "Citra"}' },
          { name: 'Data kosong', code: 'assert statistik_kelas([]) == {}' },
          { name: 'Rata-rata dibulatkan 2 angka', code: 'd = [{"nama":"A","kelas":"X","nilai":80},{"nama":"B","kelas":"X","nilai":85},{"nama":"C","kelas":"X","nilai":81}]\nassert statistik_kelas(d)["X"]["rata"] == 82.0' }
        ],
        hints: ['Kelompokkan dulu per kelas memakai setdefault atau defaultdict.', 'Untuk "terbaik", pakai max(siswa, key=lambda s: s["nilai"])["nama"].'],
        solution: 'def statistik_kelas(data):\n    grup = {}\n    for d in data:\n        grup.setdefault(d["kelas"], []).append(d)\n\n    hasil = {}\n    for kelas, siswa in grup.items():\n        nilai = [s["nilai"] for s in siswa]\n        hasil[kelas] = {\n            "jumlah": len(siswa),\n            "rata": round(sum(nilai) / len(nilai), 2),\n            "terbaik": max(siswa, key=lambda s: s["nilai"])["nama"]\n        }\n    return hasil'
      }
    ]
  }
};
