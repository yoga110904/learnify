export default {
  id: 'm1',
  title: 'Fondasi',
  icon: '🧱',
  tagline: 'Variabel, operator, logika, percabangan, perulangan, teks.',
  desc: 'Bahan bakar semua program: menyimpan data, menghitung, memilih, mengulang, dan mengolah teks.',
  badge: { id: 'b-m1', icon: '🧱', name: 'Tukang Fondasi', desc: 'Menguasai dasar sintaks Python' },
  lessons: [
    {
      id: 'm1-l1',
      title: 'Variabel & Tipe Data',
      duration: 20,
      objectives: ['Menyimpan nilai ke dalam variabel', 'Mengenal int, float, str, bool', 'Menamai variabel dengan benar'],
      quiz: [
        { id: 'm1-l1-q1', type: 'mcq', question: 'Tipe data dari nilai 3.14 adalah ...', options: ['int', 'float', 'str', 'bool'], answer: 1,
          explanation: 'Angka dengan titik desimal bertipe float.' },
        { id: 'm1-l1-q2', type: 'mcq', question: 'Nama variabel berikut yang TIDAK valid adalah ...', options: ['nama_user', '_umur', '2nama', 'total2'], answer: 2,
          explanation: 'Nama variabel tidak boleh diawali angka.' },
        { id: 'm1-l1-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(type("10"))', answer: "<class 'str'>",
          explanation: 'Karena 10 diapit tanda kutip, nilainya string walaupun isinya angka.' },
        { id: 'm1-l1-q4', type: 'true_false', question: 'Nilai boolean di Python ditulis true dan false (huruf kecil).', answer: false,
          explanation: 'Penulisannya True dan False, diawali huruf besar.' },
        { id: 'm1-l1-q5', type: 'mcq', question: 'harga = 10,5 menghasilkan variabel bertipe ...', options: ['float', 'int', 'tuple', 'str'], answer: 2,
          explanation: 'Koma membuatnya jadi tuple (10, 5). Desimal di Python memakai titik.' },
        { id: 'm1-l1-q6', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = 5\nb = a\na = 10\nprint(b)', answer: '5',
          explanation: 'b menyalin nilai a saat itu juga, bukan mengikuti a selamanya.' },
        { id: 'm1-l1-q7', type: 'mcq', question: 'Kenapa sebaiknya tidak menamai variabel dengan list atau sum?', options: ['Terlalu pendek', 'Menimpa fungsi bawaan Python sehingga rusak', 'Dilarang oleh interpreter', 'Membuat program lambat'], answer: 1,
          explanation: 'Setelah list = [1,2], fungsi list() tidak bisa dipakai lagi.' },
        { id: 'm1-l1-q8', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(True + True)', answer: '2',
          explanation: 'Di balik layar True bernilai 1 dan False bernilai 0.' }
      ],
      coding: {
        prompt: 'Buat tiga variabel:\n\n- `nama` berisi `"Salsa"`\n- `umur` berisi `21` (bilangan bulat)\n- `aktif` berisi `True`',
        starter_code: 'nama = \numur = \naktif = \n',
        tests: [
          { name: 'nama bernilai "Salsa"', code: 'assert nama == "Salsa"' },
          { name: 'umur bernilai 21 dan bertipe int', code: 'assert umur == 21 and isinstance(umur, int)' },
          { name: 'aktif bernilai True', code: 'assert aktif is True' },
          { name: 'nama benar-benar string', code: 'assert isinstance(nama, str)' }
        ],
        hints: ['Teks harus diapit tanda kutip.', 'True ditulis dengan huruf T besar, tanpa kutip.'],
        solution: 'nama = "Salsa"\numur = 21\naktif = True'
      }
    },
    {
      id: 'm1-l2',
      title: 'Operator Aritmatika',
      duration: 22,
      objectives: ['Memakai operator hitung termasuk // dan %', 'Memahami urutan operasi', 'Menyadari keterbatasan bilangan desimal'],
      quiz: [
        { id: 'm1-l2-q1', type: 'mcq', question: 'Hasil dari 7 // 2 adalah ...', options: ['3.5', '3', '4', '1'], answer: 1,
          explanation: '// adalah pembagian bulat: hasilnya dibulatkan ke bawah.' },
        { id: 'm1-l2-q2', type: 'mcq', question: 'Hasil dari 10 % 3 adalah ...', options: ['3', '1', '0', '3.33'], answer: 1,
          explanation: '% memberi sisa bagi. 10 dibagi 3 = 3 sisa 1.' },
        { id: 'm1-l2-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(2 + 3 * 4)', answer: '14',
          explanation: 'Perkalian dikerjakan sebelum penjumlahan: 3*4=12, lalu 2+12=14.' },
        { id: 'm1-l2-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(10 / 2)', answer: '5.0',
          explanation: 'Operator / selalu menghasilkan float, walaupun hasilnya bulat.' },
        { id: 'm1-l2-q5', type: 'mcq', question: 'Hasil dari -7 // 2 adalah ...', options: ['-3', '-3.5', '-4', '4'], answer: 2,
          explanation: '// membulatkan ke bawah (menjauhi nol untuk negatif), bukan memotong.' },
        { id: 'm1-l2-q6', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(2 ** 3 ** 2)', answer: '512',
          explanation: 'Pangkat dievaluasi dari kanan: 3**2 = 9, lalu 2**9 = 512.' },
        { id: 'm1-l2-q7', type: 'mcq', question: 'Kenapa 0.1 + 0.2 == 0.3 menghasilkan False?', options: ['Bug Python', 'Float tidak bisa menyimpan 0.1 secara persis dalam biner', 'Urutan operasi salah', 'Harus pakai kurung'], answer: 1,
          explanation: 'Bandingkan dengan toleransi, atau pakai Decimal untuk uang.' },
        { id: 'm1-l2-q8', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(round(2.5))', answer: '2',
          explanation: 'Python memakai banker\u2019s rounding: angka tepat di tengah dibulatkan ke genap terdekat.' }
      ],
      coding: {
        prompt: 'Buat fungsi `luas_persegi_panjang(p, l)` yang mengembalikan luas persegi panjang.',
        starter_code: 'def luas_persegi_panjang(p, l):\n    pass\n',
        tests: [
          { name: 'luas_persegi_panjang(2, 3) == 6', code: 'assert luas_persegi_panjang(2, 3) == 6' },
          { name: 'luas_persegi_panjang(0, 5) == 0', code: 'assert luas_persegi_panjang(0, 5) == 0' },
          { name: 'luas_persegi_panjang(2.5, 4) == 10.0', code: 'assert luas_persegi_panjang(2.5, 4) == 10.0' },
          { name: 'Bekerja untuk angka besar', code: 'assert luas_persegi_panjang(1000, 2000) == 2000000' }
        ],
        hints: ['Luas = panjang × lebar.', 'Ganti kata pass dengan return p * l'],
        solution: 'def luas_persegi_panjang(p, l):\n    return p * l'
      }
    },
    {
      id: 'm1-l8',
      title: 'Operator Perbandingan & Logika',
      duration: 24,
      objectives: ['Membandingkan nilai dan menggabungkan kondisi', 'Memahami short-circuit', 'Membedakan == dan is'],
      quiz: [
        { id: 'm1-l8-q1', type: 'mcq', question: 'Hasil dari True and not False adalah ...', options: ['True', 'False'], answer: 0,
          explanation: 'not False bernilai True, lalu True and True = True.' },
        { id: 'm1-l8-q2', type: 'mcq', question: 'Perbedaan == dan is adalah ...', options: ['Tidak ada', '== membandingkan isi, is membandingkan objek yang sama di memori', 'is lebih cepat', '== hanya untuk angka'], answer: 1,
          explanation: 'Pakai is hanya untuk None, True, dan False.' },
        { id: 'm1-l8-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)', answer: 'True False',
          explanation: 'Isinya sama, tapi keduanya dua objek berbeda di memori.' },
        { id: 'm1-l8-q4', type: 'mcq', question: 'Kode "if data and data[0] == 5" aman untuk list kosong karena ...', options: ['Python otomatis mengecek', 'Short-circuit: kalau data kosong (falsy), sisi kanan tidak dijalankan', 'List kosong menghasilkan None', 'Ada penanganan error bawaan'], answer: 1,
          explanation: 'Urutan kondisi bisa menyelamatkan dari IndexError.' },
        { id: 'm1-l8-q5', type: 'mcq', question: 'Manakah yang bernilai falsy?', options: ['"0"', '[0]', '0.0', '-1'], answer: 2,
          explanation: 'Angka nol falsy. String "0" dan list [0] tetap truthy karena tidak kosong.' },
        { id: 'm1-l8-q6', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print([] or "kosong")', answer: 'kosong',
          explanation: 'or mengembalikan operand, bukan True/False. Karena [] falsy, yang diambil sisi kanan.' },
        { id: 'm1-l8-q7', type: 'mcq', question: 'Cara paling ringkas mengganti "hari == \'Sabtu\' or hari == \'Minggu\'" adalah ...', options: ['hari in ("Sabtu", "Minggu")', 'hari == ("Sabtu", "Minggu")', 'hari is "Sabtu"', 'any(hari)'], answer: 0,
          explanation: 'Operator in jauh lebih ringkas daripada rantai or.' },
        { id: 'm1-l8-q8', type: 'true_false', question: 'Rantai perbandingan seperti 70 <= nilai < 85 sah di Python.', answer: true,
          explanation: 'Setara dengan nilai >= 70 and nilai < 85, tapi lebih terbaca.' }
      ],
      coding: {
        prompt: 'Buat fungsi `boleh_masuk(umur, punya_tiket, anggota)` yang mengembalikan `True` kalau:\n\n- punya tiket **dan** umur minimal 17, **atau**\n- dia anggota (anggota bebas syarat umur, tapi tetap harus punya tiket)\n\nSelain itu `False`.',
        starter_code: 'def boleh_masuk(umur, punya_tiket, anggota):\n    pass\n',
        tests: [
          { name: 'Dewasa bertiket boleh masuk', code: 'assert boleh_masuk(20, True, False) is True' },
          { name: 'Anak bertiket tidak boleh', code: 'assert boleh_masuk(12, True, False) is False' },
          { name: 'Anggota anak bertiket boleh', code: 'assert boleh_masuk(12, True, True) is True' },
          { name: 'Tanpa tiket selalu ditolak', code: 'assert boleh_masuk(30, False, True) is False' },
          { name: 'Batas umur 17 diterima', code: 'assert boleh_masuk(17, True, False) is True' },
          { name: 'Mengembalikan bool asli', code: 'assert isinstance(boleh_masuk(20, True, False), bool)' }
        ],
        hints: ['Tiket adalah syarat mutlak — taruh di luar kurung.', 'Bentuknya: punya_tiket and (umur >= 17 or anggota)'],
        solution: 'def boleh_masuk(umur, punya_tiket, anggota):\n    return bool(punya_tiket and (umur >= 17 or anggota))'
      }
    },
    {
      id: 'm1-l3',
      title: 'Input, Output & F-String',
      duration: 22,
      objectives: ['Membaca input user', 'Merapikan output dengan f-string', 'Memformat angka dan meratakan teks'],
      quiz: [
        { id: 'm1-l3-q1', type: 'mcq', question: 'Tipe data hasil dari input() adalah ...', options: ['int', 'str', 'tergantung yang diketik user', 'bool'], answer: 1,
          explanation: 'input() selalu mengembalikan str. Konversi dengan int() atau float() kalau butuh angka.' },
        { id: 'm1-l3-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'x = 5\nprint(f"Nilai: {x*2}")', answer: 'Nilai: 10',
          explanation: 'Isi kurung kurawal dievaluasi dulu: 5*2 = 10.' },
        { id: 'm1-l3-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("a", "b", sep="-")', answer: 'a-b',
          explanation: 'Parameter sep mengganti pemisah default (spasi).' },
        { id: 'm1-l3-q4', type: 'true_false', question: 'Tanpa huruf f di depan string, tulisan {nama} akan tercetak apa adanya.', answer: true,
          explanation: 'Placeholder hanya aktif pada f-string.' },
        { id: 'm1-l3-q5', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(f"{1234.5:,.2f}")', answer: '1,234.50',
          explanation: 'Koma menambah pemisah ribuan, .2f memaksa dua angka desimal.' },
        { id: 'm1-l3-q6', type: 'mcq', question: 'f"{7:03d}" menghasilkan ...', options: ['7', '007', '700', '0007'], answer: 1,
          explanation: 'Lebar 3, sisanya diisi nol di depan.' },
        { id: 'm1-l3-q7', type: 'mcq', question: 'Untuk mencetak beberapa item dalam satu baris dari dalam loop, parameter yang dipakai adalah ...', options: ['sep=""', 'end=" "', 'flush=True', 'file=None'], answer: 1,
          explanation: 'end mengganti karakter penutup yang default-nya newline.' },
        { id: 'm1-l3-q8', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(r"C:\\nama")', answer: 'C:\\nama',
          explanation: 'Raw string membuat backslash diperlakukan apa adanya, \\n tidak jadi newline.' }
      ],
      coding: {
        prompt: 'Buat fungsi `sapa(nama, umur)` yang mengembalikan kalimat seperti `"Halo Budi, umurmu 20 tahun"`.',
        starter_code: 'def sapa(nama, umur):\n    pass\n',
        tests: [
          { name: 'sapa("Budi", 20)', code: 'assert sapa("Budi", 20) == "Halo Budi, umurmu 20 tahun"' },
          { name: 'sapa("Salsa", 21)', code: 'assert sapa("Salsa", 21) == "Halo Salsa, umurmu 21 tahun"' },
          { name: 'Mengembalikan string (bukan print)', code: 'assert isinstance(sapa("A", 1), str)' },
          { name: 'Umur satu digit tetap benar', code: 'assert sapa("C", 7) == "Halo C, umurmu 7 tahun"' }
        ],
        hints: ['Pakai f-string: f"Halo {nama}, ..."', 'Gunakan return, bukan print.'],
        solution: 'def sapa(nama, umur):\n    return f"Halo {nama}, umurmu {umur} tahun"'
      }
    },
    {
      id: 'm1-l4',
      title: 'Konversi Tipe',
      duration: 20,
      objectives: ['Mengubah tipe data dengan int/float/str/bool', 'Memahami nilai falsy', 'Menulis konversi yang aman'],
      quiz: [
        { id: 'm1-l4-q1', type: 'mcq', question: 'Hasil dari int("7") + 3 adalah ...', options: ['"73"', '10', 'TypeError', '73'], answer: 1,
          explanation: 'int("7") mengubah string menjadi angka 7, lalu 7 + 3 = 10.' },
        { id: 'm1-l4-q2', type: 'mcq', question: 'Hasil dari bool("") adalah ...', options: ['True', 'False'], answer: 1,
          explanation: 'String kosong termasuk nilai falsy.' },
        { id: 'm1-l4-q3', type: 'mcq', question: 'Apa yang terjadi pada int("3.5")?', options: ['Menghasilkan 3', 'Error ValueError', 'Menghasilkan 4', 'Menghasilkan 3.5'], answer: 1,
          explanation: 'int() hanya menerima string berisi bilangan bulat. Ubah dulu: int(float("3.5")).' },
        { id: 'm1-l4-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(int(-3.99))', answer: '-3',
          explanation: 'int() memotong ke arah nol, bukan membulatkan ke bawah.' },
        { id: 'm1-l4-q5', type: 'mcq', question: 'bool("False") menghasilkan ...', options: ['False', 'True', 'Error', 'None'], answer: 1,
          explanation: 'bool() pada string hanya memeriksa kosong atau tidak. Konversi teks ke boolean harus manual.' },
        { id: 'm1-l4-q6', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("5" * 3)', answer: '555',
          explanation: 'String dikali angka berarti diulang, bukan dijumlah.' },
        { id: 'm1-l4-q7', type: 'mcq', question: 'Cara mengubah ["a","b"] menjadi "ab" adalah ...', options: ['str(["a","b"])', '"".join(["a","b"])', 'int(["a","b"])', '["a","b"].str()'], answer: 1,
          explanation: 'str(list) ikut membawa kurung dan kutipnya.' },
        { id: 'm1-l4-q8', type: 'true_false', question: 'Python tetap otomatis menaikkan int menjadi float saat keduanya dicampur.', answer: true,
          explanation: 'Urutan promosinya bool -> int -> float. Yang tidak otomatis adalah str dengan angka.' }
      ],
      coding: {
        prompt: 'Buat fungsi `jumlah_teks(a, b)` yang menerima dua angka dalam bentuk string, lalu mengembalikan jumlahnya sebagai `int`.\n\nSpasi berlebih harus diabaikan.',
        starter_code: 'def jumlah_teks(a, b):\n    pass\n',
        tests: [
          { name: 'jumlah_teks("2", "3") == 5', code: 'assert jumlah_teks("2", "3") == 5' },
          { name: 'jumlah_teks("10", "-4") == 6', code: 'assert jumlah_teks("10", "-4") == 6' },
          { name: 'Hasilnya bertipe int', code: 'assert isinstance(jumlah_teks("1", "1"), int)' },
          { name: 'Spasi berlebih diabaikan', code: 'assert jumlah_teks("  7 ", " 3  ") == 10' }
        ],
        hints: ['Konversi tiap argumen dengan int() sebelum dijumlahkan.', 'int() sebenarnya sudah mengabaikan spasi di ujung.'],
        solution: 'def jumlah_teks(a, b):\n    return int(a) + int(b)'
      }
    },
    {
      id: 'm1-l5',
      title: 'Percabangan (if / elif / else)',
      duration: 24,
      objectives: ['Membuat program mengambil keputusan', 'Memahami indentasi sebagai penanda blok', 'Menulis guard clause'],
      quiz: [
        { id: 'm1-l5-q1', type: 'mcq', question: 'Python menandai blok kode menggunakan ...', options: ['Kurung kurawal { }', 'Indentasi (menjorok)', 'Kata kunci end', 'Titik koma'], answer: 1,
          explanation: 'Indentasi bukan sekadar rapi-rapi — itu bagian dari sintaks Python.' },
        { id: 'm1-l5-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'x = 15\nif x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")', answer: 'A',
          explanation: 'Python berhenti di kondisi pertama yang benar, jadi elif tidak ikut dicek.' },
        { id: 'm1-l5-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'nilai = 80\nprint("lulus" if nilai >= 70 else "gagal")', answer: 'lulus',
          explanation: 'Bentuk ternary: nilai_kalau_benar if kondisi else nilai_kalau_salah.' },
        { id: 'm1-l5-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'n = 95\nif n >= 55:\n    print("C")\nelif n >= 85:\n    print("A")', answer: 'C',
          explanation: 'Urutan kondisi salah — yang paling longgar diletakkan duluan sehingga cabang A tak pernah tercapai.' },
        { id: 'm1-l5-q5', type: 'mcq', question: 'Pola "guard clause" artinya ...', options: ['Menumpuk if bersarang', 'Menangani kasus gagal lebih dulu lalu keluar, supaya kode tetap datar', 'Memakai try/except', 'Menambah komentar pengaman'], answer: 1,
          explanation: 'Membuat kode jauh lebih mudah dibaca dibanding bersarang tiga tingkat.' },
        { id: 'm1-l5-q6', type: 'true_false', question: 'Urutan kondisi pada rangkaian if/elif tidak mempengaruhi hasil.', answer: false,
          explanation: 'Sangat mempengaruhi. Kondisi pertama yang cocok akan langsung dipakai.' },
        { id: 'm1-l5-q7', type: 'mcq', question: 'Blok if yang isinya kosong akan error. Cara menandainya sementara adalah ...', options: ['null', 'pass', 'skip', 'void'], answer: 1,
          explanation: 'pass adalah pernyataan kosong yang sah.' }
      ],
      coding: {
        prompt: 'Buat fungsi `nilai_huruf(skor)`:\n\n- skor ≥ 85 → `"A"`\n- skor ≥ 70 → `"B"`\n- skor ≥ 55 → `"C"`\n- selain itu → `"D"`',
        starter_code: 'def nilai_huruf(skor):\n    pass\n',
        tests: [
          { name: 'nilai_huruf(90) == "A"', code: 'assert nilai_huruf(90) == "A"' },
          { name: 'Batas bawah A: nilai_huruf(85)', code: 'assert nilai_huruf(85) == "A"' },
          { name: 'nilai_huruf(70) == "B"', code: 'assert nilai_huruf(70) == "B"' },
          { name: 'nilai_huruf(60) == "C"', code: 'assert nilai_huruf(60) == "C"' },
          { name: 'nilai_huruf(10) == "D"', code: 'assert nilai_huruf(10) == "D"' },
          { name: 'Nilai 0 tetap D', code: 'assert nilai_huruf(0) == "D"' }
        ],
        hints: ['Mulai dari kondisi paling besar.', 'Pakai >= supaya nilai batas ikut masuk.'],
        solution: 'def nilai_huruf(skor):\n    if skor >= 85:\n        return "A"\n    elif skor >= 70:\n        return "B"\n    elif skor >= 55:\n        return "C"\n    else:\n        return "D"'
      }
    },
    {
      id: 'm1-l9',
      title: 'Percabangan Lanjutan & Validasi',
      duration: 24,
      objectives: ['Mengenal match/case', 'Memakai dict sebagai tabel keputusan', 'Memakai any() dan all()'],
      quiz: [
        { id: 'm1-l9-q1', type: 'mcq', question: 'Pada match/case, penangkap sisa (setara else) ditulis ...', options: ['case default', 'case _', 'case else', 'case *'], answer: 1,
          explanation: 'Tanpa case _, nilai tak dikenal lewat begitu saja tanpa peringatan.' },
        { id: 'm1-l9-q2', type: 'mcq', question: 'Untuk memetakan kode negara ke nama negara, struktur paling tepat adalah ...', options: ['Rantai if/elif', 'dict', 'list', 'while'], answer: 1,
          explanation: 'Dict lebih ringkas, lebih cepat, dan menambah entri cukup satu baris.' },
        { id: 'm1-l9-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(all([]), any([]))', answer: 'True False',
          explanation: 'all pada list kosong bernilai True ("tidak ada yang melanggar"), any bernilai False.' },
        { id: 'm1-l9-q4', type: 'mcq', question: 'all(n >= 70 for n in nilai) bernilai True kalau ...', options: ['Ada satu nilai di atas 70', 'Semua nilai minimal 70', 'Tidak ada nilai di atas 70', 'Rata-ratanya 70'], answer: 1,
          explanation: 'any yang mengecek "ada minimal satu".' },
        { id: 'm1-l9-q5', type: 'mcq', question: 'match/case tersedia mulai Python versi ...', options: ['3.6', '3.8', '3.10', '3.12'], answer: 2,
          explanation: 'Kalau kodemu harus jalan di versi lama, pakai if/elif atau dict.' },
        { id: 'm1-l9-q6', type: 'mcq', question: 'Dispatch table adalah pola ...', options: ['Dict yang nilainya berupa fungsi', 'Tabel di database', 'Daftar if bersarang', 'Cara memformat tabel'], answer: 0,
          explanation: 'Dipakai untuk menghindari rantai if raksasa di kode produksi.' },
        { id: 'm1-l9-q7', type: 'true_false', question: 'any() dan all() melakukan short-circuit — berhenti begitu jawabannya pasti.', answer: true,
          explanation: 'any berhenti di True pertama, all berhenti di False pertama.' }
      ],
      coding: {
        prompt: 'Buat fungsi `validasi_password(pw)` yang mengembalikan tuple `(valid, pesan)`:\n\n1. Kurang dari 8 karakter → `(False, "Minimal 8 karakter")`\n2. Tidak mengandung angka → `(False, "Harus mengandung angka")`\n3. Tidak mengandung huruf besar → `(False, "Harus mengandung huruf besar")`\n4. Lolos semua → `(True, "Password kuat")`\n\nPeriksa berurutan dan kembalikan kegagalan **pertama** yang ditemukan.',
        starter_code: 'def validasi_password(pw):\n    pass\n',
        tests: [
          { name: 'Terlalu pendek', code: 'assert validasi_password("rahasia") == (False, "Minimal 8 karakter")' },
          { name: 'Tanpa angka', code: 'assert validasi_password("rahasiaku") == (False, "Harus mengandung angka")' },
          { name: 'Tanpa huruf besar', code: 'assert validasi_password("rahasia123") == (False, "Harus mengandung huruf besar")' },
          { name: 'Password kuat', code: 'assert validasi_password("Rahasia123") == (True, "Password kuat")' },
          { name: 'Urutan pemeriksaan benar', code: 'assert validasi_password("abc") == (False, "Minimal 8 karakter")' },
          { name: 'Tepat 8 karakter diterima', code: 'assert validasi_password("Passw0rd") == (True, "Password kuat")' }
        ],
        hints: ['Pakai any(c.isdigit() for c in pw) untuk mengecek ada angka.', 'c.isupper() untuk huruf besar.', 'Kembalikan tuple: return False, "pesan"'],
        solution: 'def validasi_password(pw):\n    if len(pw) < 8:\n        return False, "Minimal 8 karakter"\n    if not any(c.isdigit() for c in pw):\n        return False, "Harus mengandung angka"\n    if not any(c.isupper() for c in pw):\n        return False, "Harus mengandung huruf besar"\n    return True, "Password kuat"'
      }
    },
    {
      id: 'm1-l6',
      title: 'Perulangan dengan for',
      duration: 24,
      objectives: ['Mengulang perintah dengan for', 'Memakai range, enumerate, dan zip', 'Menguasai pola akumulator'],
      quiz: [
        { id: 'm1-l6-q1', type: 'mcq', question: 'range(1, 5) menghasilkan angka ...', options: ['1 sampai 5', '1 sampai 4', '0 sampai 5', '0 sampai 4'], answer: 1,
          explanation: 'Angka akhir bersifat eksklusif — tidak ikut dihasilkan.' },
        { id: 'm1-l6-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)', answer: '6',
          explanation: '1 + 2 + 3 = 6.' },
        { id: 'm1-l6-q3', type: 'mcq', question: 'Untuk mendapat index sekaligus nilainya, fungsi yang tepat adalah ...', options: ['range(len(x))', 'enumerate(x)', 'zip(x)', 'list(x)'], answer: 1,
          explanation: 'enumerate lebih jelas dan lebih Pythonic daripada range(len(...)).' },
        { id: 'm1-l6-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'for i in range(3, 0, -1):\n    print(i, end=" ")', answer: '3 2 1',
          explanation: 'Langkah -1, berhenti sebelum 0.' },
        { id: 'm1-l6-q5', type: 'mcq', question: 'zip(a, b) berhenti ketika ...', options: ['a habis', 'b habis', 'Koleksi terpendek habis', 'Keduanya habis'], answer: 2,
          explanation: 'Data yang lebih panjang akan terpotong diam-diam — cek panjangnya kalau penting.' },
        { id: 'm1-l6-q6', type: 'predict_output', question: 'Apa output kode berikut?', code: 'for n in [10, 20, 30]:\n    total = 0\n    total += n\nprint(total)', answer: '30',
          explanation: 'Inisialisasi akumulator ada di dalam loop, jadi direset tiap putaran.' },
        { id: 'm1-l6-q7', type: 'true_false', question: 'Menghapus elemen dari list yang sedang di-loop bisa membuat ada elemen terlewat.', answer: true,
          explanation: 'Posisi bergeser saat ada yang dihapus. Buat list baru sebagai gantinya.' },
        { id: 'm1-l6-q8', type: 'mcq', question: 'range(10_000_000) langsung jalan tanpa menghabiskan memori karena ...', options: ['Python mengompresinya', 'range menghasilkan angka satu per satu saat diminta', 'Angkanya disimpan di disk', 'Memang boros memori'], answer: 1,
          explanation: 'print(range(5)) menghasilkan range(0, 5), bukan daftar angka.' }
      ],
      coding: {
        prompt: 'Buat fungsi `fizzbuzz(n)` yang mengembalikan **list** berisi angka 1 sampai n, dengan aturan:\n\n- kelipatan 3 → `"Fizz"`\n- kelipatan 5 → `"Buzz"`\n- kelipatan 3 dan 5 → `"FizzBuzz"`\n- selain itu → angkanya sendiri (int)',
        starter_code: 'def fizzbuzz(n):\n    hasil = []\n    # tulis loop di sini\n    return hasil\n',
        tests: [
          { name: 'fizzbuzz(5) benar', code: 'assert fizzbuzz(5) == [1, 2, "Fizz", 4, "Buzz"]' },
          { name: 'Elemen ke-15 adalah "FizzBuzz"', code: 'assert fizzbuzz(15)[-1] == "FizzBuzz"' },
          { name: 'Panjang list sesuai n', code: 'assert len(fizzbuzz(30)) == 30' },
          { name: 'Angka biasa tetap bertipe int', code: 'assert fizzbuzz(2) == [1, 2]' },
          { name: 'n = 0 menghasilkan list kosong', code: 'assert fizzbuzz(0) == []' }
        ],
        hints: ['Cek kelipatan 15 (3 dan 5) paling awal.', 'Pakai hasil.append(...) di dalam loop.'],
        solution: 'def fizzbuzz(n):\n    hasil = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            hasil.append("FizzBuzz")\n        elif i % 3 == 0:\n            hasil.append("Fizz")\n        elif i % 5 == 0:\n            hasil.append("Buzz")\n        else:\n            hasil.append(i)\n    return hasil'
      }
    },
    {
      id: 'm1-l10',
      title: 'Perulangan while & Kontrol Loop',
      duration: 24,
      objectives: ['Memakai while untuk kondisi yang belum diketahui', 'Menghindari infinite loop', 'Menguasai break dan continue'],
      quiz: [
        { id: 'm1-l10-q1', type: 'mcq', question: 'Kata kunci untuk melewati satu iterasi dan lanjut ke berikutnya adalah ...', options: ['break', 'continue', 'pass', 'skip'], answer: 1,
          explanation: 'continue melompati sisa baris di iterasi itu; break keluar dari loop sepenuhnya.' },
        { id: 'm1-l10-q2', type: 'true_false', question: 'Loop while bisa berjalan selamanya kalau kondisinya tidak pernah menjadi False.', answer: true,
          explanation: 'Pastikan ada sesuatu di dalam loop yang mengubah kondisinya.' },
        { id: 'm1-l10-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'i = 0\nwhile i < 5:\n    i += 1\n    if i == 3:\n        continue\n    print(i, end=" ")', answer: '1 2 4 5',
          explanation: 'Saat i bernilai 3, continue melompati print.' },
        { id: 'm1-l10-q4', type: 'mcq', question: 'Tiga bahan wajib sebuah while yang sehat adalah ...', options: ['import, fungsi, return', 'inisialisasi, kondisi, perubahan menuju berhenti', 'try, except, finally', 'break, continue, pass'], answer: 1,
          explanation: 'Lupa bahan ketiga adalah penyebab utama infinite loop.' },
        { id: 'm1-l10-q5', type: 'mcq', question: 'Pada loop bersarang, break akan keluar dari ...', options: ['Semua loop', 'Loop terdalam tempat break berada', 'Loop terluar', 'Fungsi'], answer: 1,
          explanation: 'Untuk keluar dari semuanya, bungkus dalam fungsi lalu pakai return.' },
        { id: 'm1-l10-q6', type: 'mcq', question: 'Blok else pada loop dijalankan kalau ...', options: ['Loop tidak pernah jalan', 'Loop selesai tanpa break', 'Terjadi error', 'Selalu dijalankan'], answer: 1,
          explanation: 'Berguna untuk pola "cari sesuatu, kalau tidak ketemu lakukan X".' },
        { id: 'm1-l10-q7', type: 'mcq', question: 'Pola while True + break paling sering dipakai untuk ...', options: ['Menghitung total', 'Meminta input sampai valid', 'Mengurutkan data', 'Membaca file'], answer: 1,
          explanation: 'Aman selama ada break yang pasti tercapai.' },
        { id: 'm1-l10-q8', type: 'predict_output', question: 'Apa output kode berikut?', code: 'n = 0\nwhile n < 3:\n    n += 1\nelse:\n    print("selesai", n)', answer: 'selesai 3',
          explanation: 'Loop berakhir normal tanpa break, jadi blok else dijalankan.' }
      ],
      coding: {
        prompt: 'Deret Collatz: mulai dari `n`, kalau genap bagi 2, kalau ganjil kalikan 3 tambah 1. Ulangi sampai mencapai 1.\n\nBuat fungsi `langkah_collatz(n)` yang mengembalikan **berapa langkah** dibutuhkan untuk mencapai 1.\n\nContoh: `6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1` = 8 langkah.',
        starter_code: 'def langkah_collatz(n):\n    pass\n',
        tests: [
          { name: 'n = 1 butuh 0 langkah', code: 'assert langkah_collatz(1) == 0' },
          { name: 'n = 2 butuh 1 langkah', code: 'assert langkah_collatz(2) == 1' },
          { name: 'n = 6 butuh 8 langkah', code: 'assert langkah_collatz(6) == 8' },
          { name: 'n = 27 butuh 111 langkah', code: 'assert langkah_collatz(27) == 111' },
          { name: 'Mengembalikan int', code: 'assert isinstance(langkah_collatz(5), int)' }
        ],
        hints: ['Pakai while n != 1 dan sebuah penghitung langkah.', 'Genap: n = n // 2. Ganjil: n = 3 * n + 1.'],
        solution: 'def langkah_collatz(n):\n    langkah = 0\n    while n != 1:\n        if n % 2 == 0:\n            n = n // 2\n        else:\n            n = 3 * n + 1\n        langkah += 1\n    return langkah'
      }
    },
    {
      id: 'm1-l7',
      title: 'String Lebih Dalam',
      duration: 24,
      objectives: ['Mengambil bagian teks dengan indexing & slicing', 'Memakai method string penting', 'Memahami sifat immutable'],
      quiz: [
        { id: 'm1-l7-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("python"[1:4])', answer: 'yth',
          explanation: 'Slicing mengambil index 1, 2, 3. Index 4 tidak ikut.' },
        { id: 'm1-l7-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("a,b,c".split(","))', answer: "['a', 'b', 'c']",
          explanation: 'split memecah string menjadi list berdasarkan pemisah yang diberikan.' },
        { id: 'm1-l7-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("Python"[::-1])', answer: 'nohtyP',
          explanation: 'Step -1 membaca string dari belakang.' },
        { id: 'm1-l7-q4', type: 'mcq', question: 'Kenapa teks[0] = "J" menghasilkan error?', options: ['Karena index 0 tidak ada', 'Karena string bersifat immutable', 'Karena harus pakai kutip tunggal', 'Karena huruf besar tidak boleh'], answer: 1,
          explanation: 'String tidak bisa diubah di tempat. Buat string baru, misalnya "J" + teks[1:].' },
        { id: 'm1-l7-q5', type: 'predict_output', question: 'Apa output kode berikut?', code: 't = "halo"\nt.upper()\nprint(t)', answer: 'halo',
          explanation: 'Method string mengembalikan string baru; hasilnya harus disimpan.' },
        { id: 'm1-l7-q6', type: 'mcq', question: 'Cara benar menggabungkan ["a","b"] dengan tanda "-" adalah ...', options: ['["a","b"].join("-")', '"-".join(["a","b"])', 'join(["a","b"], "-")', '"a".join("b", "-")'], answer: 1,
          explanation: 'Pemisah yang punya method .join(), bukan list-nya.' },
        { id: 'm1-l7-q7', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("Learnify"[100:])', answer: '',
          explanation: 'Slicing di luar jangkauan aman dan menghasilkan string kosong (beda dengan indexing yang error).' },
        { id: 'm1-l7-q8', type: 'mcq', question: 'Menyambung ribuan string dalam loop dengan += itu lambat karena ...', options: ['Python tidak mendukungnya', 'String immutable, jadi tiap += membuat string baru', 'Memakai terlalu banyak CPU', 'Harus pakai list'], answer: 1,
          explanation: 'Pakai "".join(daftar) yang jauh lebih efisien.' }
      ],
      coding: {
        prompt: 'Buat fungsi `is_palindrom(teks)` yang mengembalikan `True` kalau teks dibaca dari depan dan belakang sama. Abaikan **huruf besar/kecil** dan **spasi**.',
        starter_code: 'def is_palindrom(teks):\n    pass\n',
        tests: [
          { name: 'is_palindrom("Katak") is True', code: 'assert is_palindrom("Katak") is True' },
          { name: 'is_palindrom("Kasur ini rusak") is True', code: 'assert is_palindrom("Kasur ini rusak") is True' },
          { name: 'is_palindrom("Python") is False', code: 'assert is_palindrom("Python") is False' },
          { name: 'Mengembalikan bool asli', code: 'assert isinstance(is_palindrom("aa"), bool)' },
          { name: 'String kosong dianggap palindrom', code: 'assert is_palindrom("") is True' }
        ],
        hints: ['Bersihkan dulu: .lower() lalu .replace(" ", "")', 'Bandingkan hasil bersih dengan kebalikannya: bersih == bersih[::-1]'],
        solution: 'def is_palindrom(teks):\n    bersih = teks.lower().replace(" ", "")\n    return bersih == bersih[::-1]'
      }
    },
    {
      id: 'm1-l11',
      title: 'Format & Manipulasi Teks Lanjutan',
      duration: 24,
      objectives: ['Membersihkan teks yang berantakan', 'Mengurai baris data', 'Memakai padding dan template'],
      quiz: [
        { id: 'm1-l11-q1', type: 'mcq', question: '" ".join(teks.split()) berguna untuk ...', options: ['Membalik teks', 'Merapatkan spasi berlebih di tengah sekaligus membuang di ujung', 'Mengubah huruf besar', 'Menghapus angka'], answer: 1,
          explanation: '.strip() hanya membersihkan ujung, tidak menyentuh spasi ganda di tengah.' },
        { id: 'm1-l11-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(len("  belajar   Python  ".split()))', answer: '2',
          explanation: 'split() tanpa argumen mengabaikan spasi berlebih dan spasi di ujung.' },
        { id: 'm1-l11-q3', type: 'mcq', question: '"12.5".isdigit() menghasilkan ...', options: ['True', 'False'], answer: 1,
          explanation: 'Titik bukan digit. Untuk angka desimal, pakai try: float(teks).' },
        { id: 'm1-l11-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("7".zfill(3))', answer: '007',
          explanation: 'zfill mengisi nol di depan sampai lebar yang diminta.' },
        { id: 'm1-l11-q5', type: 'mcq', question: 'repr() dipakai saat membersihkan teks karena ...', options: ['Lebih cepat', 'Menampilkan spasi dan karakter tersembunyi yang tidak terlihat di print biasa', 'Mengubah huruf kecil', 'Menghapus newline'], answer: 1,
          explanation: 'print("  halo  ") terlihat sama dengan print("halo").' },
        { id: 'm1-l11-q6', type: 'mcq', question: 'str.format masih berguna dibanding f-string ketika ...', options: ['Datanya angka', 'Template disimpan terpisah dari datanya', 'Teksnya panjang', 'Ada emoji'], answer: 1,
          explanation: 'f-string dievaluasi saat ditulis, jadi tidak bisa disimpan sebagai template.' },
        { id: 'm1-l11-q7', type: 'true_false', question: 'Setelah teks.split(","), tiap bagian sebaiknya di-.strip() karena data nyata sering punya spasi setelah koma.', answer: true,
          explanation: 'Tanpa itu, "Budi, 20" menghasilkan " 20" yang gagal dikonversi ke int di beberapa kasus.' }
      ],
      coding: {
        prompt: 'Buat fungsi `rapikan_nama(teks)` yang:\n\n1. Membuang spasi di ujung\n2. Merapatkan spasi berlebih di tengah\n3. Mengubah jadi Title Case\n\nContoh: `"  budi   SANTOSO "` → `"Budi Santoso"`. Teks kosong atau hanya spasi menghasilkan `""`.',
        starter_code: 'def rapikan_nama(teks):\n    pass\n',
        tests: [
          { name: 'Spasi ujung dan ganda dibereskan', code: 'assert rapikan_nama("  budi   SANTOSO ") == "Budi Santoso"' },
          { name: 'Satu kata', code: 'assert rapikan_nama("  ANI ") == "Ani"' },
          { name: 'Teks kosong', code: 'assert rapikan_nama("") == ""' },
          { name: 'Hanya spasi', code: 'assert rapikan_nama("     ") == ""' },
          { name: 'Tiga kata', code: 'assert rapikan_nama("citra   dewi  LESTARI") == "Citra Dewi Lestari"' }
        ],
        hints: ['" ".join(teks.split()) membereskan langkah 1 dan 2 sekaligus.', 'Lalu .title() untuk langkah 3.'],
        solution: 'def rapikan_nama(teks):\n    return " ".join(teks.split()).title()'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 1 — Fondasi',
    questionCount: 12,
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
        explanation: 'String immutable; .upper() mengembalikan string baru yang harus disimpan.' },
      { id: 'm1-x6', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(f"{1234567:,}")', answer: '1,234,567',
        explanation: 'Format koma menambahkan pemisah ribuan.' },
      { id: 'm1-x7', type: 'mcq', question: 'Kenapa "if data and data[0] > 5" lebih aman daripada urutan sebaliknya?', options: ['Lebih cepat', 'Short-circuit mencegah IndexError saat data kosong', 'Lebih pendek', 'Tidak ada bedanya'], answer: 1,
        explanation: 'Sisi kanan tidak dijalankan kalau sisi kiri sudah falsy.' },
      { id: 'm1-x8', type: 'mcq', question: 'Struktur paling tepat untuk memetakan 50 kode pos ke nama kota adalah ...', options: ['Rantai if/elif', 'dict', 'Loop while', 'Tuple'], answer: 1,
        explanation: 'Dict mencari lewat hash, bukan memeriksa satu per satu.' }
    ],
    coding: [
      {
        id: 'm1-e-c1',
        prompt: 'Buat fungsi `hitung_vokal(teks)` yang mengembalikan jumlah huruf vokal (a, i, u, e, o) tanpa membedakan huruf besar/kecil.',
        starter_code: 'def hitung_vokal(teks):\n    pass\n',
        tests: [
          { name: 'hitung_vokal("Indonesia") == 5', code: 'assert hitung_vokal("Indonesia") == 5' },
          { name: 'hitung_vokal("xyz") == 0', code: 'assert hitung_vokal("xyz") == 0' },
          { name: 'hitung_vokal("AEIOU") == 5', code: 'assert hitung_vokal("AEIOU") == 5' },
          { name: 'Teks kosong -> 0', code: 'assert hitung_vokal("") == 0' }
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
          { name: '20 bukan prima', code: 'assert bilangan_prima(20) is False' },
          { name: 'Bilangan negatif bukan prima', code: 'assert bilangan_prima(-7) is False' },
          { name: '97 adalah prima', code: 'assert bilangan_prima(97) is True' }
        ],
        hints: ['Bilangan < 2 bukan prima.', 'Cukup cek pembagi dari 2 sampai akar n.'],
        solution: 'def bilangan_prima(n):\n    if n < 2:\n        return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0:\n            return False\n        i += 1\n    return True'
      },
      {
        id: 'm1-e-c3',
        prompt: 'Buat fungsi `ringkas_nilai(data)` yang menerima string berformat `"nama:nilai"` dipisah koma, lalu mengembalikan dict `{"tertinggi": nama, "rata": float}`.\n\nContoh: `"Budi:80, Ani:92, Citra:75"` → `{"tertinggi": "Ani", "rata": 82.33}`\n\nRata-rata dibulatkan 2 angka. Data kosong menghasilkan `{"tertinggi": None, "rata": 0.0}`.',
        starter_code: 'def ringkas_nilai(data):\n    pass\n',
        tests: [
          { name: 'Tiga siswa', code: 'assert ringkas_nilai("Budi:80, Ani:92, Citra:75") == {"tertinggi": "Ani", "rata": 82.33}' },
          { name: 'Satu siswa', code: 'assert ringkas_nilai("Budi:80") == {"tertinggi": "Budi", "rata": 80.0}' },
          { name: 'Data kosong', code: 'assert ringkas_nilai("") == {"tertinggi": None, "rata": 0.0}' },
          { name: 'Spasi berlebih diabaikan', code: 'assert ringkas_nilai("  A : 60 ,  B : 80 ")["tertinggi"] == "B"' }
        ],
        hints: ['Pecah dengan split(","), lalu tiap bagian split(":").', 'Jangan lupa .strip() tiap potongan.', 'Simpan nama dan nilai, cari yang tertinggi sambil menjumlah.'],
        solution: 'def ringkas_nilai(data):\n    data = data.strip()\n    if not data:\n        return {"tertinggi": None, "rata": 0.0}\n\n    nama_tertinggi = None\n    nilai_tertinggi = None\n    total = 0\n    jumlah = 0\n\n    for bagian in data.split(","):\n        nama, _, nilai = bagian.partition(":")\n        nama = nama.strip()\n        nilai = int(nilai.strip())\n        total += nilai\n        jumlah += 1\n        if nilai_tertinggi is None or nilai > nilai_tertinggi:\n            nilai_tertinggi = nilai\n            nama_tertinggi = nama\n\n    return {"tertinggi": nama_tertinggi, "rata": round(total / jumlah, 2)}'
      }
    ]
  }
};
