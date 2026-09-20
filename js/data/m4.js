export default {
  id: 'm4',
  title: 'Object-Oriented Programming',
  icon: '🧩',
  tagline: 'Class, inheritance, polymorphism, pola fit/transform.',
  desc: 'Cara menyusun program besar agar tetap rapi — plus pola class yang dipakai semua library AI.',
  badge: { id: 'b-m4', icon: '🧩', name: 'Arsitek Objek', desc: 'Menguasai OOP sampai pola library AI' },
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
      title: 'Class untuk Pipeline AI',
      duration: 25,
      objectives: ['Memahami kenapa library AI memakai class', 'Menerapkan kontrak fit/transform', 'Mencegah data leakage lewat parameter yang tersimpan'],
      quiz: [
        { id: 'm4-l6-q1', type: 'mcq', question: 'Kenapa scikit-learn memakai class, bukan fungsi biasa?', options: ['Supaya kodenya panjang', 'Karena fit menghasilkan parameter yang harus diingat untuk dipakai lagi', 'Karena Python mewajibkannya', 'Supaya lebih cepat'], answer: 1,
          explanation: 'Objek jadi tempat menyimpan hasil belajar seperti mean_ dan scale_.' },
        { id: 'm4-l6-q2', type: 'mcq', question: 'Dalam kontrak scikit-learn, method yang MENYIMPAN parameter ke self adalah ...', options: ['transform', 'predict', 'fit', 'score'], answer: 2,
          explanation: 'transform dan predict hanya menerapkan, tidak belajar.' },
        { id: 'm4-l6-q3', type: 'mcq', question: 'Atribut dengan akhiran garis bawah seperti mean_ menandakan ...', options: ['Atribut privat', 'Nilai hasil belajar dari data', 'Konstanta', 'Atribut class'], answer: 1,
          explanation: 'Konvensi ini membedakan hasil pelatihan dari pengaturan.' },
        { id: 'm4-l6-q4', type: 'true_false', question: 'Menjalankan fit() pada data uji termasuk data leakage.', answer: true,
          explanation: 'Data uji hanya boleh di-transform memakai parameter dari data latih.' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Buat class `ScalerSederhana` yang meniru `StandardScaler` scikit-learn:\n\n- `fit(X)` → simpan `self.mean_` dan `self.scale_` (std per kolom; std 0 diganti 1), lalu kembalikan `self`\n- `transform(X)` → kembalikan `(X - mean_) / scale_`; kalau `fit` belum dipanggil, `raise ValueError`\n- `fit_transform(X)` → jalan pintas fit lalu transform',
        starter_code: 'import numpy as np\n\nclass ScalerSederhana:\n    def __init__(self):\n        self.mean_ = None\n        self.scale_ = None\n\n    # lengkapi fit, transform, dan fit_transform\n',
        tests: [
          { name: 'fit_transform menghasilkan mean 0', code: 'import numpy as np\nX = np.array([[1., 100.], [2., 200.], [3., 300.]])\nh = ScalerSederhana().fit_transform(X)\nassert np.allclose(h.mean(axis=0), 0, atol=1e-9)' },
          { name: 'fit_transform menghasilkan std 1', code: 'import numpy as np\nX = np.array([[1., 100.], [2., 200.], [3., 300.]])\nh = ScalerSederhana().fit_transform(X)\nassert np.allclose(h.std(axis=0), 1, atol=1e-9)' },
          { name: 'fit mengembalikan self agar bisa dirangkai', code: 'import numpy as np\nX = np.array([[1.], [2.], [3.]])\ns = ScalerSederhana()\nassert s.fit(X) is s' },
          { name: 'transform sebelum fit -> ValueError', code: 'import numpy as np\ntry:\n    ScalerSederhana().transform(np.array([[1.]]))\n    raise AssertionError("Seharusnya ValueError")\nexcept ValueError:\n    pass' },
          { name: 'Data uji memakai parameter data latih', code: 'import numpy as np\ntrain = np.array([[0.], [10.]])\ns = ScalerSederhana().fit(train)\nassert np.allclose(s.transform(np.array([[5.]])), [[0.]])' },
          { name: 'Kolom konstan tidak menghasilkan NaN', code: 'import numpy as np\nX = np.array([[5., 1.], [5., 2.]])\nassert not np.isnan(ScalerSederhana().fit_transform(X)).any()' }
        ],
        hints: ['Di fit: self.mean_ = X.mean(axis=0), lalu std = X.std(axis=0).', 'Ganti std nol: self.scale_ = np.where(std == 0, 1, std)', 'Di transform, cek dulu if self.mean_ is None lalu raise ValueError.'],
        solution: 'import numpy as np\n\nclass ScalerSederhana:\n    def __init__(self):\n        self.mean_ = None\n        self.scale_ = None\n\n    def fit(self, X):\n        self.mean_ = X.mean(axis=0)\n        std = X.std(axis=0)\n        self.scale_ = np.where(std == 0, 1, std)\n        return self\n\n    def transform(self, X):\n        if self.mean_ is None:\n            raise ValueError("Panggil fit() dulu sebelum transform()")\n        return (X - self.mean_) / self.scale_\n\n    def fit_transform(self, X):\n        return self.fit(X).transform(X)'
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
