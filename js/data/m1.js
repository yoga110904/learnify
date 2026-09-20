export default {
  id: 'm1',
  title: 'Fondasi',
  icon: '🧱',
  tagline: 'Variabel, operator, percabangan, perulangan.',
  desc: 'Bahan bakar semua program: menyimpan data, menghitung, memilih, dan mengulang.',
  badge: { id: 'b-m1', icon: '🧱', name: 'Tukang Fondasi', desc: 'Menguasai dasar sintaks Python' },
  lessons: [
    {
      id: 'm1-l1',
      title: 'Variabel & Tipe Data',
      duration: 18,
      objectives: ['Menyimpan nilai ke dalam variabel', 'Mengenal int, float, str, bool', 'Menamai variabel dengan benar'],
      quiz: [
        { id: 'm1-l1-q1', type: 'mcq', question: 'Tipe data dari nilai 3.14 adalah ...', options: ['int', 'float', 'str', 'bool'], answer: 1,
          explanation: 'Angka dengan titik desimal bertipe float.' },
        { id: 'm1-l1-q2', type: 'mcq', question: 'Nama variabel berikut yang TIDAK valid adalah ...', options: ['nama_user', '_umur', '2nama', 'total2'], answer: 2,
          explanation: 'Nama variabel tidak boleh diawali angka.' },
        { id: 'm1-l1-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(type("10"))', answer: "<class 'str'>",
          explanation: 'Karena 10 diapit tanda kutip, nilainya string walaupun isinya angka.' },
        { id: 'm1-l1-q4', type: 'true_false', question: 'Nilai boolean di Python ditulis true dan false (huruf kecil).', answer: false,
          explanation: 'Penulisannya True dan False, diawali huruf besar.' }
      ],
      coding: {
        prompt: 'Buat tiga variabel:\n\n- `nama` berisi `"Salsa"`\n- `umur` berisi `21` (bilangan bulat)\n- `aktif` berisi `True`',
        starter_code: 'nama = \numur = \naktif = \n',
        tests: [
          { name: 'nama bernilai "Salsa"', code: 'assert nama == "Salsa"' },
          { name: 'umur bernilai 21 dan bertipe int', code: 'assert umur == 21 and isinstance(umur, int)' },
          { name: 'aktif bernilai True', code: 'assert aktif is True' }
        ],
        hints: ['Teks harus diapit tanda kutip.', 'True ditulis dengan huruf T besar, tanpa kutip.'],
        solution: 'nama = "Salsa"\numur = 21\naktif = True'
      }
    },
    {
      id: 'm1-l2',
      title: 'Operator',
      duration: 20,
      objectives: ['Memakai operator aritmatika', 'Membandingkan nilai', 'Menggabungkan kondisi dengan and/or/not'],
      quiz: [
        { id: 'm1-l2-q1', type: 'mcq', question: 'Hasil dari 7 // 2 adalah ...', options: ['3.5', '3', '4', '1'], answer: 1,
          explanation: '// adalah pembagian bulat: hasilnya dibulatkan ke bawah, sisa desimalnya dibuang.' },
        { id: 'm1-l2-q2', type: 'mcq', question: 'Hasil dari 10 % 3 adalah ...', options: ['3', '1', '0', '3.33'], answer: 1,
          explanation: '% memberi sisa bagi. 10 dibagi 3 = 3 sisa 1.' },
        { id: 'm1-l2-q3', type: 'mcq', question: 'Hasil dari True and not False adalah ...', options: ['True', 'False'], answer: 0,
          explanation: 'not False bernilai True, lalu True and True = True.' },
        { id: 'm1-l2-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(2 + 3 * 4)', answer: '14',
          explanation: 'Perkalian dikerjakan sebelum penjumlahan: 3*4=12, lalu 2+12=14.' },
        { id: 'm1-l2-q5', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(10 / 2)', answer: '5.0',
          explanation: 'Operator / selalu menghasilkan float, walaupun hasilnya bulat.' }
      ],
      coding: {
        prompt: 'Buat fungsi `luas_persegi_panjang(p, l)` yang mengembalikan luas persegi panjang.',
        starter_code: 'def luas_persegi_panjang(p, l):\n    pass\n',
        tests: [
          { name: 'luas_persegi_panjang(2, 3) == 6', code: 'assert luas_persegi_panjang(2, 3) == 6' },
          { name: 'luas_persegi_panjang(0, 5) == 0', code: 'assert luas_persegi_panjang(0, 5) == 0' },
          { name: 'luas_persegi_panjang(2.5, 4) == 10.0', code: 'assert luas_persegi_panjang(2.5, 4) == 10.0' }
        ],
        hints: ['Luas = panjang × lebar.', 'Ganti kata pass dengan return p * l'],
        solution: 'def luas_persegi_panjang(p, l):\n    return p * l'
      }
    },
    {
      id: 'm1-l3',
      title: 'Input, Output & F-String',
      duration: 20,
      objectives: ['Membaca input user', 'Merapikan output dengan f-string', 'Memformat angka'],
      quiz: [
        { id: 'm1-l3-q1', type: 'mcq', question: 'Tipe data hasil dari input() adalah ...', options: ['int', 'str', 'tergantung yang diketik user', 'bool'], answer: 1,
          explanation: 'input() selalu mengembalikan str. Kalau butuh angka, konversi dengan int() atau float().' },
        { id: 'm1-l3-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'x = 5\nprint(f"Nilai: {x*2}")', answer: 'Nilai: 10',
          explanation: 'Isi kurung kurawal dievaluasi dulu: 5*2 = 10.' },
        { id: 'm1-l3-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("a", "b", sep="-")', answer: 'a-b',
          explanation: 'Parameter sep mengganti pemisah default (spasi).' },
        { id: 'm1-l3-q4', type: 'true_false', question: 'Tanpa huruf f di depan string, tulisan {nama} akan tercetak apa adanya.', answer: true,
          explanation: 'Betul. Placeholder hanya aktif pada f-string.' }
      ],
      coding: {
        prompt: 'Buat fungsi `sapa(nama, umur)` yang mengembalikan kalimat seperti `"Halo Budi, umurmu 20 tahun"`.',
        starter_code: 'def sapa(nama, umur):\n    pass\n',
        tests: [
          { name: 'sapa("Budi", 20)', code: 'assert sapa("Budi", 20) == "Halo Budi, umurmu 20 tahun"' },
          { name: 'sapa("Salsa", 21)', code: 'assert sapa("Salsa", 21) == "Halo Salsa, umurmu 21 tahun"' },
          { name: 'Mengembalikan string (bukan print)', code: 'assert isinstance(sapa("A", 1), str)' }
        ],
        hints: ['Pakai f-string: f"Halo {nama}, ..."', 'Gunakan return, bukan print.'],
        solution: 'def sapa(nama, umur):\n    return f"Halo {nama}, umurmu {umur} tahun"'
      }
    },
    {
      id: 'm1-l4',
      title: 'Konversi Tipe',
      duration: 15,
      objectives: ['Mengubah tipe data dengan int/float/str/bool', 'Memahami nilai falsy', 'Menghindari TypeError'],
      quiz: [
        { id: 'm1-l4-q1', type: 'mcq', question: 'Hasil dari int("7") + 3 adalah ...', options: ['"73"', '10', 'TypeError', '73'], answer: 1,
          explanation: 'int("7") mengubah string menjadi angka 7, lalu 7 + 3 = 10.' },
        { id: 'm1-l4-q2', type: 'mcq', question: 'Hasil dari bool("") adalah ...', options: ['True', 'False'], answer: 1,
          explanation: 'String kosong termasuk nilai falsy.' },
        { id: 'm1-l4-q3', type: 'mcq', question: 'Apa yang terjadi pada int("3.5")?', options: ['Menghasilkan 3', 'Error ValueError', 'Menghasilkan 4', 'Menghasilkan 3.5'], answer: 1,
          explanation: 'int() hanya menerima string berisi bilangan bulat. Ubah dulu: int(float("3.5")).' },
        { id: 'm1-l4-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(int(3.99))', answer: '3',
          explanation: 'int() memotong bagian desimal, bukan membulatkan. Gunakan round() untuk membulatkan.' }
      ],
      coding: {
        prompt: 'Buat fungsi `jumlah_teks(a, b)` yang menerima dua angka dalam bentuk string, lalu mengembalikan jumlahnya sebagai `int`.',
        starter_code: 'def jumlah_teks(a, b):\n    pass\n',
        tests: [
          { name: 'jumlah_teks("2", "3") == 5', code: 'assert jumlah_teks("2", "3") == 5' },
          { name: 'jumlah_teks("10", "-4") == 6', code: 'assert jumlah_teks("10", "-4") == 6' },
          { name: 'Hasilnya bertipe int', code: 'assert isinstance(jumlah_teks("1", "1"), int)' }
        ],
        hints: ['Konversi tiap argumen dengan int() sebelum dijumlahkan.'],
        solution: 'def jumlah_teks(a, b):\n    return int(a) + int(b)'
      }
    },
    {
      id: 'm1-l5',
      title: 'Percabangan (if / elif / else)',
      duration: 22,
      objectives: ['Membuat program mengambil keputusan', 'Memahami indentasi sebagai penanda blok', 'Memakai ternary'],
      quiz: [
        { id: 'm1-l5-q1', type: 'mcq', question: 'Python menandai blok kode menggunakan ...', options: ['Kurung kurawal { }', 'Indentasi (menjorok)', 'Kata kunci end', 'Titik koma'], answer: 1,
          explanation: 'Indentasi bukan sekadar rapi-rapi — itu bagian dari sintaks Python.' },
        { id: 'm1-l5-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'x = 15\nif x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")', answer: 'A',
          explanation: 'Python berhenti di kondisi pertama yang benar, jadi elif tidak ikut dicek.' },
        { id: 'm1-l5-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'nilai = 80\nprint("lulus" if nilai >= 70 else "gagal")', answer: 'lulus',
          explanation: 'Bentuk ternary: nilai_kalau_benar if kondisi else nilai_kalau_salah.' },
        { id: 'm1-l5-q4', type: 'true_false', question: 'Urutan kondisi pada rangkaian if/elif tidak mempengaruhi hasil.', answer: false,
          explanation: 'Sangat mempengaruhi. Kondisi pertama yang cocok akan langsung dipakai.' }
      ],
      coding: {
        prompt: 'Buat fungsi `nilai_huruf(skor)`:\n\n- skor ≥ 85 → `"A"`\n- skor ≥ 70 → `"B"`\n- skor ≥ 55 → `"C"`\n- selain itu → `"D"`',
        starter_code: 'def nilai_huruf(skor):\n    pass\n',
        tests: [
          { name: 'nilai_huruf(90) == "A"', code: 'assert nilai_huruf(90) == "A"' },
          { name: 'Batas bawah A: nilai_huruf(85)', code: 'assert nilai_huruf(85) == "A"' },
          { name: 'nilai_huruf(70) == "B"', code: 'assert nilai_huruf(70) == "B"' },
          { name: 'nilai_huruf(60) == "C"', code: 'assert nilai_huruf(60) == "C"' },
          { name: 'nilai_huruf(10) == "D"', code: 'assert nilai_huruf(10) == "D"' }
        ],
        hints: ['Mulai dari kondisi paling besar.', 'Pakai >= supaya nilai batas ikut masuk.'],
        solution: 'def nilai_huruf(skor):\n    if skor >= 85:\n        return "A"\n    elif skor >= 70:\n        return "B"\n    elif skor >= 55:\n        return "C"\n    else:\n        return "D"'
      }
    },
    {
      id: 'm1-l6',
      title: 'Perulangan (for & while)',
      duration: 25,
      objectives: ['Mengulang perintah dengan for dan while', 'Memakai range dengan benar', 'Mengendalikan loop dengan break/continue'],
      quiz: [
        { id: 'm1-l6-q1', type: 'mcq', question: 'range(1, 5) menghasilkan angka ...', options: ['1 sampai 5', '1 sampai 4', '0 sampai 5', '0 sampai 4'], answer: 1,
          explanation: 'Angka akhir bersifat eksklusif — tidak ikut dihasilkan.' },
        { id: 'm1-l6-q2', type: 'mcq', question: 'Kata kunci untuk melewati satu iterasi dan lanjut ke berikutnya adalah ...', options: ['break', 'continue', 'pass', 'skip'], answer: 1,
          explanation: 'continue melompati sisa baris di iterasi itu; break keluar dari loop sepenuhnya.' },
        { id: 'm1-l6-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)', answer: '6',
          explanation: '1 + 2 + 3 = 6.' },
        { id: 'm1-l6-q4', type: 'true_false', question: 'Loop while bisa berjalan selamanya kalau kondisinya tidak pernah menjadi False.', answer: true,
          explanation: 'Itu yang disebut infinite loop. Pastikan ada yang mengubah kondisi di dalam loop.' }
      ],
      coding: {
        prompt: 'Buat fungsi `fizzbuzz(n)` yang mengembalikan **list** berisi angka 1 sampai n, dengan aturan:\n\n- kelipatan 3 → `"Fizz"`\n- kelipatan 5 → `"Buzz"`\n- kelipatan 3 dan 5 → `"FizzBuzz"`\n- selain itu → angkanya sendiri (int)',
        starter_code: 'def fizzbuzz(n):\n    hasil = []\n    # tulis loop di sini\n    return hasil\n',
        tests: [
          { name: 'fizzbuzz(5) benar', code: 'assert fizzbuzz(5) == [1, 2, "Fizz", 4, "Buzz"]' },
          { name: 'Elemen ke-15 adalah "FizzBuzz"', code: 'assert fizzbuzz(15)[-1] == "FizzBuzz"' },
          { name: 'Panjang list sesuai n', code: 'assert len(fizzbuzz(30)) == 30' },
          { name: 'Angka biasa tetap bertipe int', code: 'assert fizzbuzz(2) == [1, 2]' }
        ],
        hints: ['Cek kelipatan 15 (3 dan 5) paling awal.', 'Pakai hasil.append(...) di dalam loop.'],
        solution: 'def fizzbuzz(n):\n    hasil = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            hasil.append("FizzBuzz")\n        elif i % 3 == 0:\n            hasil.append("Fizz")\n        elif i % 5 == 0:\n            hasil.append("Buzz")\n        else:\n            hasil.append(i)\n    return hasil'
      }
    },
    {
      id: 'm1-l7',
      title: 'String Lebih Dalam',
      duration: 22,
      objectives: ['Mengambil bagian teks dengan indexing & slicing', 'Memakai method string penting', 'Memahami sifat immutable'],
      quiz: [
        { id: 'm1-l7-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("python"[1:4])', answer: 'yth',
          explanation: 'Slicing mengambil index 1, 2, 3. Index 4 tidak ikut.' },
        { id: 'm1-l7-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("a,b,c".split(","))', answer: "['a', 'b', 'c']",
          explanation: 'split memecah string menjadi list berdasarkan pemisah yang diberikan.' },
        { id: 'm1-l7-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("Python"[::-1])', answer: 'nohtyP',
          explanation: 'Step -1 membaca string dari belakang.' },
        { id: 'm1-l7-q4', type: 'mcq', question: 'Kenapa teks[0] = "J" menghasilkan error?', options: ['Karena index 0 tidak ada', 'Karena string bersifat immutable', 'Karena harus pakai kutip tunggal', 'Karena huruf besar tidak boleh'], answer: 1,
          explanation: 'String tidak bisa diubah di tempat. Buat string baru, misalnya "J" + teks[1:].' }
      ],
      coding: {
        prompt: 'Buat fungsi `is_palindrom(teks)` yang mengembalikan `True` kalau teks dibaca dari depan dan belakang sama. Abaikan **huruf besar/kecil** dan **spasi**.',
        starter_code: 'def is_palindrom(teks):\n    pass\n',
        tests: [
          { name: 'is_palindrom("Katak") is True', code: 'assert is_palindrom("Katak") is True' },
          { name: 'is_palindrom("Kasur ini rusak") is True', code: 'assert is_palindrom("Kasur ini rusak") is True' },
          { name: 'is_palindrom("Python") is False', code: 'assert is_palindrom("Python") is False' },
          { name: 'Mengembalikan bool asli', code: 'assert isinstance(is_palindrom("aa"), bool)' }
        ],
        hints: ['Bersihkan dulu: .lower() lalu .replace(" ", "")', 'Bandingkan hasil bersih dengan kebalikannya: bersih == bersih[::-1]'],
        solution: 'def is_palindrom(teks):\n    bersih = teks.lower().replace(" ", "")\n    return bersih == bersih[::-1]'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 1 — Fondasi',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm1-x1', type: 'mcq', question: 'Hasil dari 2 ** 3 ** 2 adalah ...', options: ['64', '512', '12', '36'], answer: 1,
        explanation: 'Pangkat dievaluasi dari kanan: 3 ** 2 = 9, lalu 2 ** 9 = 512.' },
      { id: 'm1-x2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a, b = 1, 2\na, b = b, a\nprint(a, b)', answer: '2 1',
        explanation: 'Tukar nilai dalam satu baris — sisi kanan dievaluasi dulu.' },
      { id: 'm1-x3', type: 'mcq', question: 'Manakah yang bernilai falsy?', options: ['"0"', '[0]', '0.0', '-1'], answer: 2,
        explanation: 'Angka nol (termasuk 0.0) falsy. String "0" dan list [0] tetap truthy karena tidak kosong.' },
      { id: 'm1-x4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'for i in range(3):\n    if i == 1:\n        continue\n    print(i)', answer: '0\n2',
        explanation: 'Saat i == 1, continue melewati print dan lanjut ke iterasi berikutnya.' },
      { id: 'm1-x5', type: 'true_false', question: 'Method .upper() mengubah isi variabel string aslinya.', answer: false,
        explanation: 'String immutable; .upper() mengembalikan string baru yang harus disimpan.' }
    ],
    coding: [
      {
        id: 'm1-e-c1',
        prompt: 'Buat fungsi `hitung_vokal(teks)` yang mengembalikan jumlah huruf vokal (a, i, u, e, o) tanpa membedakan huruf besar/kecil.',
        starter_code: 'def hitung_vokal(teks):\n    pass\n',
        tests: [
          { name: 'hitung_vokal("Indonesia") == 5', code: 'assert hitung_vokal("Indonesia") == 5' },
          { name: 'hitung_vokal("xyz") == 0', code: 'assert hitung_vokal("xyz") == 0' },
          { name: 'hitung_vokal("AEIOU") == 5', code: 'assert hitung_vokal("AEIOU") == 5' }
        ],
        hints: ['Ubah teks ke huruf kecil dulu.', 'Loop tiap karakter, cek if c in "aiueo".'],
        solution: 'def hitung_vokal(teks):\n    total = 0\n    for c in teks.lower():\n        if c in "aiueo":\n            total += 1\n    return total'
      },
      {
        id: 'm1-e-c2',
        prompt: 'Buat fungsi `bilangan_prima(n)` yang mengembalikan `True` kalau n adalah bilangan prima.',
        starter_code: 'def bilangan_prima(n):\n    pass\n',
        tests: [
          { name: '2 adalah prima', code: 'assert bilangan_prima(2) is True' },
          { name: '1 bukan prima', code: 'assert bilangan_prima(1) is False' },
          { name: '17 adalah prima', code: 'assert bilangan_prima(17) is True' },
          { name: '20 bukan prima', code: 'assert bilangan_prima(20) is False' }
        ],
        hints: ['Bilangan < 2 bukan prima.', 'Cukup cek pembagi dari 2 sampai akar n.'],
        solution: 'def bilangan_prima(n):\n    if n < 2:\n        return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 1\n    return True'
      }
    ]
  }
};
