export default {
  id: 'm4',
  title: 'Object-Oriented Programming',
  icon: '🧩',
  tagline: 'Class, inheritance, polymorphism, Page Object Model.',
  desc: 'Cara menyusun program besar agar tetap rapi — plus jembatan ke automation testing.',
  badge: { id: 'b-m4', icon: '🧩', name: 'Arsitek Objek', desc: 'Menguasai OOP sampai Page Object Model' },
  lessons: [
    {
      id: 'm4-l1',
      title: 'Class & Object',
      duration: 22,
      objectives: ['Membuat class dan objek', 'Memahami __init__ dan self', 'Membedakan atribut instance dan class'],
      quiz: [
        { id: 'm4-l1-q1', type: 'mcq', question: 'Di dalam method, self merujuk ke ...', options: ['Nama class-nya', 'Objek yang sedang dipakai', 'Modul tempat class ditulis', 'Method itu sendiri'], answer: 1,
          explanation: 'Saat obj.method() dipanggil, Python mengirim obj sebagai argumen pertama.' },
        { id: 'm4-l1-q2', type: 'mcq', question: 'Method yang otomatis dijalankan saat objek dibuat adalah ...', options: ['__start__', '__init__', '__new__', '__call__'], answer: 1,
          explanation: '__init__ adalah constructor yang menyiapkan atribut awal.' },
        { id: 'm4-l1-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'class A:\n    def __init__(self, x):\n        self.x = x\n    def dua(self):\n        return self.x * 2\nprint(A(5).dua())', answer: '10',
          explanation: 'Objek dibuat dengan x=5, lalu method mengembalikan 5*2.' },
        { id: 'm4-l1-q4', type: 'true_false', question: 'Parameter self boleh tidak ditulis di method biasa.', answer: false,
          explanation: 'Tanpa self, pemanggilan lewat objek akan menghasilkan TypeError.' }
      ],
      coding: {
        prompt: 'Buat class `Kucing` dengan atribut `nama` dan method `bersuara()` yang mengembalikan `"Meong, aku <nama>"`.',
        starter_code: 'class Kucing:\n    pass\n',
        tests: [
          { name: 'Kucing("Oyen").bersuara()', code: 'assert Kucing("Oyen").bersuara() == "Meong, aku Oyen"' },
          { name: 'Nama lain juga benar', code: 'assert Kucing("Mimi").bersuara() == "Meong, aku Mimi"' },
          { name: 'Atribut nama tersimpan', code: 'assert Kucing("Bella").nama == "Bella"' }
        ],
        hints: ['Butuh __init__(self, nama) yang menyimpan self.nama = nama.', 'bersuara(self) mengembalikan f-string.'],
        solution: 'class Kucing:\n    def __init__(self, nama):\n        self.nama = nama\n\n    def bersuara(self):\n        return f"Meong, aku {self.nama}"'
      }
    },
    {
      id: 'm4-l2',
      title: 'Encapsulation & Property',
      duration: 22,
      objectives: ['Menyembunyikan data internal objek', 'Memakai @property', 'Memvalidasi perubahan nilai'],
      quiz: [
        { id: 'm4-l2-q1', type: 'mcq', question: 'Atribut yang diawali dua garis bawah (__saldo) akan ...', options: ['Terenkripsi', 'Diubah namanya oleh Python (name mangling)', 'Dihapus otomatis', 'Menjadi atribut class'], answer: 1,
          explanation: 'Namanya menjadi _NamaClass__saldo, sehingga tidak sengaja diakses dari luar.' },
        { id: 'm4-l2-q2', type: 'mcq', question: 'Atribut yang dibuat dengan @property tanpa setter bersifat ...', options: ['Hanya bisa dibaca', 'Hanya bisa ditulis', 'Privat total', 'Statis'], answer: 0,
          explanation: 'Mengubahnya menghasilkan AttributeError.' },
        { id: 'm4-l2-q3', type: 'true_false', question: 'Method ber-@property dipanggil tanpa tanda kurung.', answer: true,
          explanation: 'Itulah gunanya: terlihat seperti atribut biasa.' },
        { id: 'm4-l2-q4', type: 'mcq', question: 'Cara paling tepat menolak penarikan melebihi saldo adalah ...', options: ['return None diam-diam', 'print pesan error', 'raise ValueError', 'Mengubah saldo jadi 0'], answer: 2,
          explanation: 'Melempar exception membuat pemanggil tahu operasinya gagal.' }
      ],
      coding: {
        prompt: 'Buat class `Rekening`:\n\n- `Rekening(saldo=0)`\n- property `saldo` **read-only**\n- `setor(jumlah)` menambah saldo\n- `tarik(jumlah)` mengurangi saldo; kalau jumlah melebihi saldo → `raise ValueError`',
        starter_code: 'class Rekening:\n    def __init__(self, saldo=0):\n        self._saldo = saldo\n\n    # lengkapi di sini\n',
        tests: [
          { name: 'Setor menambah saldo', code: 'r = Rekening(100)\nr.setor(50)\nassert r.saldo == 150' },
          { name: 'Tarik mengurangi saldo', code: 'r = Rekening(100)\nr.tarik(40)\nassert r.saldo == 60' },
          { name: 'Tarik melebihi saldo -> ValueError', code: 'r = Rekening(100)\ntry:\n    r.tarik(500)\n    raise AssertionError("Seharusnya melempar ValueError")\nexcept ValueError:\n    pass' },
          { name: 'saldo bersifat read-only', code: 'r = Rekening(10)\ntry:\n    r.saldo = 999\n    raise AssertionError("saldo seharusnya read-only")\nexcept AttributeError:\n    pass' }
        ],
        hints: ['Pakai @property def saldo(self): return self._saldo', 'Di tarik(): if jumlah > self._saldo: raise ValueError("Saldo tidak cukup")'],
        solution: 'class Rekening:\n    def __init__(self, saldo=0):\n        self._saldo = saldo\n\n    @property\n    def saldo(self):\n        return self._saldo\n\n    def setor(self, jumlah):\n        self._saldo += jumlah\n\n    def tarik(self, jumlah):\n        if jumlah > self._saldo:\n            raise ValueError("Saldo tidak cukup")\n        self._saldo -= jumlah'
      }
    },
    {
      id: 'm4-l3',
      title: 'Inheritance',
      duration: 20,
      objectives: ['Mewarisi atribut & method dari class induk', 'Memakai super()', 'Melakukan override'],
      quiz: [
        { id: 'm4-l3-q1', type: 'mcq', question: 'Fungsi super() dipakai untuk ...', options: ['Membuat class baru', 'Memanggil method milik class induk', 'Menghapus atribut', 'Membuat objek jadi global'], answer: 1,
          explanation: 'Paling sering dipakai untuk super().__init__() di constructor turunan.' },
        { id: 'm4-l3-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'class A:\n    def halo(self):\n        return "A"\nclass B(A):\n    def halo(self):\n        return super().halo() + "B"\nprint(B().halo())', answer: 'AB',
          explanation: 'Override memanggil versi induk dulu lalu menambahkan.' },
        { id: 'm4-l3-q3', type: 'true_false', question: 'isinstance(objek_turunan, ClassInduk) bernilai True.', answer: true,
          explanation: 'Objek turunan tetap dianggap instance dari induknya.' },
        { id: 'm4-l3-q4', type: 'mcq', question: 'Hubungan "Mobil punya Mesin" sebaiknya diwujudkan dengan ...', options: ['Inheritance', 'Composition', 'Abstract class', 'Property'], answer: 1,
          explanation: 'Inheritance untuk relasi "adalah", composition untuk relasi "punya".' }
      ],
      coding: {
        prompt: 'Buat class `Karyawan(nama, gaji)` dengan method `info()` yang mengembalikan `"<nama> - <gaji>"`.\n\nLalu buat `Manajer(nama, gaji, tunjangan)` sebagai turunannya, dengan method `total_gaji()` = gaji + tunjangan.',
        starter_code: 'class Karyawan:\n    pass\n\n\nclass Manajer(Karyawan):\n    pass\n',
        tests: [
          { name: 'info() milik Karyawan', code: 'assert Karyawan("A", 100).info() == "A - 100"' },
          { name: 'total_gaji() Manajer', code: 'assert Manajer("A", 100, 50).total_gaji() == 150' },
          { name: 'Manajer mewarisi info()', code: 'assert Manajer("B", 10, 5).info() == "B - 10"' },
          { name: 'Manajer adalah turunan Karyawan', code: 'assert issubclass(Manajer, Karyawan) and isinstance(Manajer("C", 1, 1), Karyawan)' }
        ],
        hints: ['Di Manajer.__init__, panggil super().__init__(nama, gaji) dulu.', 'Baru simpan self.tunjangan = tunjangan.'],
        solution: 'class Karyawan:\n    def __init__(self, nama, gaji):\n        self.nama = nama\n        self.gaji = gaji\n\n    def info(self):\n        return f"{self.nama} - {self.gaji}"\n\n\nclass Manajer(Karyawan):\n    def __init__(self, nama, gaji, tunjangan):\n        super().__init__(nama, gaji)\n        self.tunjangan = tunjangan\n\n    def total_gaji(self):\n        return self.gaji + self.tunjangan'
      }
    },
    {
      id: 'm4-l4',
      title: 'Polymorphism',
      duration: 20,
      objectives: ['Memahami duck typing', 'Membuat abstract class', 'Menulis fungsi yang bekerja untuk banyak tipe'],
      quiz: [
        { id: 'm4-l4-q1', type: 'mcq', question: 'Duck typing berarti Python peduli pada ...', options: ['Tipe class objek', 'Method yang dimiliki objek', 'Nama variabel', 'Urutan import'], answer: 1,
          explanation: 'Selama methodnya ada, objek apa pun bisa dipakai.' },
        { id: 'm4-l4-q2', type: 'mcq', question: 'Apa yang terjadi kalau kita membuat objek dari class ber-@abstractmethod yang belum diimplementasi?', options: ['Berhasil dibuat', 'TypeError saat instansiasi', 'Method dilewati', 'Peringatan saja'], answer: 1,
          explanation: 'Python menolak membuat objek dari abstract class yang belum lengkap.' },
        { id: 'm4-l4-q3', type: 'true_false', question: 'Menumpuk if isinstance(...) adalah tanda polymorphism belum dimanfaatkan.', answer: true,
          explanation: 'Dengan polymorphism, fungsi tidak perlu tahu tipe konkretnya.' }
      ],
      coding: {
        prompt: 'Buat abstract class `Bentuk` dengan method abstrak `luas()`. Buat turunan `Persegi(s)` dan `Lingkaran(r)` (pakai `math.pi`). Lalu buat fungsi `total_luas(daftar)` yang menjumlahkan luas semua bentuk.',
        starter_code: 'from abc import ABC, abstractmethod\nimport math\n\nclass Bentuk(ABC):\n    @abstractmethod\n    def luas(self):\n        ...\n\n# lengkapi Persegi, Lingkaran, dan total_luas\n',
        tests: [
          { name: 'Luas persegi', code: 'assert Persegi(3).luas() == 9' },
          { name: 'Luas lingkaran', code: 'assert round(Lingkaran(1).luas(), 2) == 3.14' },
          { name: 'total_luas gabungan', code: 'assert round(total_luas([Persegi(2), Lingkaran(1)]), 2) == 7.14' },
          { name: 'Bentuk tidak bisa diinstansiasi', code: 'try:\n    Bentuk()\n    raise AssertionError("Bentuk seharusnya abstract")\nexcept TypeError:\n    pass' }
        ],
        hints: ['Persegi.luas() mengembalikan self.s ** 2.', 'Lingkaran.luas() mengembalikan math.pi * self.r ** 2.', 'total_luas bisa memakai sum(b.luas() for b in daftar).'],
        solution: 'from abc import ABC, abstractmethod\nimport math\n\nclass Bentuk(ABC):\n    @abstractmethod\n    def luas(self):\n        ...\n\nclass Persegi(Bentuk):\n    def __init__(self, s):\n        self.s = s\n    def luas(self):\n        return self.s ** 2\n\nclass Lingkaran(Bentuk):\n    def __init__(self, r):\n        self.r = r\n    def luas(self):\n        return math.pi * self.r ** 2\n\ndef total_luas(daftar):\n    return sum(b.luas() for b in daftar)'
      }
    },
    {
      id: 'm4-l5',
      title: 'Dunder Methods & Dataclass',
      duration: 22,
      objectives: ['Membuat objek tercetak rapi', 'Membandingkan & mengurutkan objek', 'Memakai @dataclass'],
      quiz: [
        { id: 'm4-l5-q1', type: 'mcq', question: 'Method yang dipanggil saat print(objek) adalah ...', options: ['__repr__', '__str__', '__print__', '__format__'], answer: 1,
          explanation: 'Kalau __str__ tidak ada, Python memakai __repr__ sebagai cadangan.' },
        { id: 'm4-l5-q2', type: 'mcq', question: 'Supaya objek bisa diurutkan dengan sorted(), minimal kita butuh ...', options: ['__eq__', '__lt__', '__len__', '__iter__'], answer: 1,
          explanation: 'sorted() memakai operator < yang diatur oleh __lt__.' },
        { id: 'm4-l5-q3', type: 'mcq', question: '@dataclass otomatis membuatkan ...', options: ['__init__, __repr__, __eq__', 'Hanya __init__', '__str__ dan __len__', 'Semua dunder method'], answer: 0,
          explanation: 'Tambahkan order=True kalau perlu perbandingan urutan.' },
        { id: 'm4-l5-q4', type: 'true_false', question: 'Field dataclass boleh diberi default berupa [] secara langsung.', answer: false,
          explanation: 'Harus memakai field(default_factory=list) untuk menghindari objek yang dipakai bersama.' }
      ],
      coding: {
        prompt: 'Dengan `@dataclass`, buat `Produk` yang punya `nama` dan `harga`. Dua produk dianggap sama kalau nama dan harganya sama, dan daftar produk harus bisa diurutkan berdasarkan **harga**.',
        starter_code: 'from dataclasses import dataclass\n\n# lengkapi di sini\n',
        tests: [
          { name: 'Dua produk identik dianggap sama', code: 'assert Produk("a", 1) == Produk("a", 1)' },
          { name: 'Produk berbeda tidak sama', code: 'assert Produk("a", 1) != Produk("a", 2)' },
          { name: 'Bisa diurutkan berdasarkan harga', code: 'assert sorted([Produk("b", 5), Produk("a", 2)])[0].nama == "a"' },
          { name: 'Atribut bisa diakses', code: 'p = Produk("kopi", 20)\nassert p.nama == "kopi" and p.harga == 20' }
        ],
        hints: ['Tulis @dataclass di atas class, lalu daftarkan field: nama: str dan harga: int.', 'Untuk pengurutan berdasarkan harga, tambahkan method __lt__(self, other) yang membandingkan self.harga < other.harga.'],
        solution: 'from dataclasses import dataclass\n\n@dataclass\nclass Produk:\n    nama: str\n    harga: int\n\n    def __lt__(self, other):\n        return self.harga < other.harga'
      }
    },
    {
      id: 'm4-l6',
      title: 'Page Object Model (jembatan ke QA)',
      duration: 25,
      objectives: ['Memahami masalah selector yang tersebar', 'Menyusun class per halaman', 'Menguji alur dengan driver palsu'],
      quiz: [
        { id: 'm4-l6-q1', type: 'mcq', question: 'Masalah utama yang diselesaikan Page Object Model adalah ...', options: ['Test jalan lebih cepat', 'Selector UI tersebar di banyak file test', 'Browser jadi lebih ringan', 'Mengurangi jumlah test'], answer: 1,
          explanation: 'Dengan POM, perubahan selector cukup diperbaiki di satu tempat.' },
        { id: 'm4-l6-q2', type: 'mcq', question: 'Manakah yang TIDAK boleh ada di dalam page object?', options: ['Selector', 'Method aksi', 'Assertion', 'Referensi driver'], answer: 2,
          explanation: 'Assertion adalah tanggung jawab file test, bukan page object.' },
        { id: 'm4-l6-q3', type: 'true_false', question: 'Karena duck typing, kita bisa menguji page object dengan driver palsu tanpa browser.', answer: true,
          explanation: 'Objek palsu cukup punya method dengan nama yang sama.' }
      ],
      coding: {
        prompt: 'Buat class `LoginPage(driver)` dengan method `login(user, pw)` yang memanggil driver secara berurutan:\n\n1. `driver.isi("#user", user)`\n2. `driver.isi("#pw", pw)`\n3. `driver.klik("#submit")`',
        starter_code: 'class LoginPage:\n    INPUT_USER = "#user"\n    INPUT_PW = "#pw"\n    BTN_SUBMIT = "#submit"\n\n    # lengkapi __init__ dan login\n',
        tests: [
          { name: 'Urutan aksi benar', code: 'class DriverPalsu:\n    def __init__(self):\n        self.aksi = []\n    def isi(self, sel, teks):\n        self.aksi.append(("isi", sel, teks))\n    def klik(self, sel):\n        self.aksi.append(("klik", sel))\n\nd = DriverPalsu()\nLoginPage(d).login("a", "b")\nassert d.aksi == [("isi", "#user", "a"), ("isi", "#pw", "b"), ("klik", "#submit")], d.aksi' },
          { name: 'Driver disimpan sebagai atribut', code: 'class D2:\n    def isi(self, s, t): pass\n    def klik(self, s): pass\nd2 = D2()\nassert LoginPage(d2).driver is d2' },
          { name: 'Memakai konstanta selector', code: 'assert LoginPage.INPUT_USER == "#user" and LoginPage.BTN_SUBMIT == "#submit"' }
        ],
        hints: ['__init__(self, driver) menyimpan self.driver = driver.', 'Di login(), pakai konstanta class: self.driver.isi(self.INPUT_USER, user)'],
        solution: 'class LoginPage:\n    INPUT_USER = "#user"\n    INPUT_PW = "#pw"\n    BTN_SUBMIT = "#submit"\n\n    def __init__(self, driver):\n        self.driver = driver\n\n    def login(self, user, pw):\n        self.driver.isi(self.INPUT_USER, user)\n        self.driver.isi(self.INPUT_PW, pw)\n        self.driver.klik(self.BTN_SUBMIT)\n        return self'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 4 — OOP',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm4-x1', type: 'mcq', question: 'Konvensi penamaan class di Python adalah ...', options: ['snake_case', 'PascalCase', 'kebab-case', 'SCREAMING_CASE'], answer: 1,
        explanation: 'Misalnya LoginPage, RekeningBank.' },
      { id: 'm4-x2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'class A:\n    jumlah = 0\n    def __init__(self):\n        A.jumlah += 1\nA(); A()\nprint(A.jumlah)', answer: '2',
        explanation: 'Atribut class dibagi bersama semua objek.' },
      { id: 'm4-x3', type: 'mcq', question: 'Tanpa __eq__, perbandingan dua objek berisi data sama menghasilkan ...', options: ['True', 'False', 'Error', 'None'], answer: 1,
        explanation: 'Default-nya membandingkan identitas objek, bukan isinya.' },
      { id: 'm4-x4', type: 'true_false', question: 'Method page object sebaiknya mengembalikan page object halaman tujuan.', answer: true,
        explanation: 'Membuat alur test terbaca seperti perjalanan user.' }
    ],
    coding: [
      {
        id: 'm4-e-c1',
        prompt: 'Buat sistem perpustakaan sederhana:\n\n- `Buku(judul)` — punya atribut `judul` dan `dipinjam` (awalnya `False`)\n- `Anggota(nama)` — punya atribut `nama` dan `pinjaman` (list, awalnya kosong)\n- `Perpustakaan()` dengan:\n  - `pinjam(anggota, buku)` → `True` kalau berhasil. Gagal (`False`) kalau buku sedang dipinjam **atau** anggota sudah meminjam 3 buku.\n  - `kembalikan(anggota, buku)` → `True` kalau berhasil, `False` kalau buku itu tidak sedang dipinjam anggota tersebut.',
        starter_code: 'class Buku:\n    def __init__(self, judul):\n        self.judul = judul\n        self.dipinjam = False\n\n\nclass Anggota:\n    def __init__(self, nama):\n        self.nama = nama\n        self.pinjaman = []\n\n\nclass Perpustakaan:\n    def pinjam(self, anggota, buku):\n        pass\n\n    def kembalikan(self, anggota, buku):\n        pass\n',
        tests: [
          { name: 'Peminjaman pertama berhasil', code: 'p = Perpustakaan(); a = Anggota("A"); b = Buku("X")\nassert p.pinjam(a, b) is True and b.dipinjam is True and b in a.pinjaman' },
          { name: 'Buku yang dipinjam tidak bisa dipinjam lagi', code: 'p = Perpustakaan(); a = Anggota("A"); c = Anggota("C"); b = Buku("X")\np.pinjam(a, b)\nassert p.pinjam(c, b) is False' },
          { name: 'Maksimal 3 buku per anggota', code: 'p = Perpustakaan(); a = Anggota("A")\nbuku = [Buku(str(i)) for i in range(4)]\nhasil = [p.pinjam(a, b) for b in buku]\nassert hasil == [True, True, True, False], hasil' },
          { name: 'Pengembalian membebaskan buku', code: 'p = Perpustakaan(); a = Anggota("A"); b = Buku("X")\np.pinjam(a, b)\nassert p.kembalikan(a, b) is True\nassert b.dipinjam is False and b not in a.pinjaman' },
          { name: 'Mengembalikan buku yang tidak dipinjam -> False', code: 'p = Perpustakaan(); a = Anggota("A"); b = Buku("X")\nassert p.kembalikan(a, b) is False' }
        ],
        hints: ['Cek dua syarat di pinjam(): buku.dipinjam dan len(anggota.pinjaman) >= 3.', 'Jangan lupa mengubah buku.dipinjam dan memperbarui anggota.pinjaman di kedua method.'],
        solution: 'class Buku:\n    def __init__(self, judul):\n        self.judul = judul\n        self.dipinjam = False\n\n\nclass Anggota:\n    def __init__(self, nama):\n        self.nama = nama\n        self.pinjaman = []\n\n\nclass Perpustakaan:\n    MAKS = 3\n\n    def pinjam(self, anggota, buku):\n        if buku.dipinjam or len(anggota.pinjaman) >= self.MAKS:\n            return False\n        buku.dipinjam = True\n        anggota.pinjaman.append(buku)\n        return True\n\n    def kembalikan(self, anggota, buku):\n        if buku not in anggota.pinjaman:\n            return False\n        anggota.pinjaman.remove(buku)\n        buku.dipinjam = False\n        return True'
      }
    ]
  }
};
