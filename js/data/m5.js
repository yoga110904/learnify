export default {
  id: 'm5',
  title: 'Advance',
  icon: '🚀',
  tagline: 'Generator, decorator, context manager, regex, async.',
  desc: 'Fitur Python yang bikin kodemu terlihat seperti ditulis orang berpengalaman.',
  badge: { id: 'b-m5', icon: '🚀', name: 'Python Ninja', desc: 'Menguasai fitur advance Python' },
  lessons: [
    {
      id: 'm5-l1',
      title: 'Iterator & Generator',
      duration: 22,
      objectives: ['Memahami protokol iterator', 'Membuat generator dengan yield', 'Menghemat memori dengan lazy evaluation'],
      quiz: [
        { id: 'm5-l1-q1', type: 'mcq', question: 'Generator menghasilkan nilai secara ...', options: ['Sekaligus di awal', 'Satu per satu saat diminta', 'Acak', 'Hanya saat program selesai'], answer: 1,
          explanation: 'Itulah yang membuatnya hemat memori (lazy evaluation).' },
        { id: 'm5-l1-q2', type: 'mcq', question: 'Perbedaan yield dan return adalah ...', options: ['yield menghentikan fungsi selamanya', 'yield menjeda fungsi dan mengingat posisinya', 'yield hanya untuk angka', 'Tidak ada bedanya'], answer: 1,
          explanation: 'Eksekusi dilanjutkan dari baris setelah yield saat item berikutnya diminta.' },
        { id: 'm5-l1-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def g():\n    yield 1\n    yield 2\nprint(list(g()))', answer: '[1, 2]',
          explanation: 'list() mengambil semua nilai yang di-yield.' },
        { id: 'm5-l1-q4', type: 'true_false', question: 'Generator bisa dilewati (di-loop) berkali-kali.', answer: false,
          explanation: 'Generator habis sekali pakai. Buat ulang atau simpan hasilnya ke list.' }
      ],
      coding: {
        prompt: 'Buat generator `fib_gen(n)` yang menghasilkan `n` angka Fibonacci pertama (dimulai dari 0).',
        starter_code: 'def fib_gen(n):\n    pass\n',
        tests: [
          { name: 'Enam angka pertama', code: 'assert list(fib_gen(6)) == [0, 1, 1, 2, 3, 5]' },
          { name: 'n = 1', code: 'assert list(fib_gen(1)) == [0]' },
          { name: 'n = 0 menghasilkan kosong', code: 'assert list(fib_gen(0)) == []' },
          { name: 'Benar-benar generator (memakai yield)', code: 'import inspect\nassert inspect.isgeneratorfunction(fib_gen), "Gunakan yield, bukan return list."' }
        ],
        hints: ['Mulai dengan a, b = 0, 1.', 'Di dalam loop: yield a lalu a, b = b, a + b'],
        solution: 'def fib_gen(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b'
      }
    },
    {
      id: 'm5-l2',
      title: 'Decorator',
      duration: 25,
      objectives: ['Memahami fungsi sebagai objek & closure', 'Menulis decorator sendiri', 'Memakai functools.wraps'],
      quiz: [
        { id: 'm5-l2-q1', type: 'mcq', question: 'Sintaks @catat di atas sebuah fungsi setara dengan ...', options: ['catat()', 'tambah = catat(tambah)', 'import catat', 'catat.tambah()'], answer: 1,
          explanation: 'Decorator membungkus fungsi lalu menugaskan hasilnya ke nama yang sama.' },
        { id: 'm5-l2-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'def tanda(fn):\n    def w():\n        return fn() + "!"\n    return w\n\n@tanda\ndef sapa():\n    return "Halo"\n\nprint(sapa())', answer: 'Halo!',
          explanation: 'Pembungkus memanggil fungsi asli lalu menambahkan tanda seru.' },
        { id: 'm5-l2-q3', type: 'mcq', question: 'Kegunaan @functools.wraps(fn) adalah ...', options: ['Mempercepat fungsi', 'Menjaga nama & docstring fungsi asli', 'Menjalankan fungsi dua kali', 'Menambah cache'], answer: 1,
          explanation: 'Tanpa itu, __name__ fungsi berubah menjadi nama pembungkusnya.' },
        { id: 'm5-l2-q4', type: 'true_false', question: 'Pembungkus decorator sebaiknya memakai *args dan **kwargs agar cocok untuk fungsi apa pun.', answer: true,
          explanation: 'Dengan begitu decorator bisa dipakai ulang di banyak fungsi.' }
      ],
      coding: {
        prompt: 'Buat decorator `hitung_panggilan` yang mencatat berapa kali fungsi dipanggil di atribut `fungsi.jumlah`.\n\n```python\n@hitung_panggilan\ndef halo():\n    pass\n\nhalo(); halo(); halo()\nprint(halo.jumlah)   # 3\n```',
        starter_code: 'from functools import wraps\n\ndef hitung_panggilan(fn):\n    pass\n',
        tests: [
          { name: 'Menghitung 3 pemanggilan', code: '@hitung_panggilan\ndef halo():\n    return "hai"\nhalo(); halo(); halo()\nassert halo.jumlah == 3, halo.jumlah' },
          { name: 'Mulai dari 0', code: '@hitung_panggilan\ndef f():\n    pass\nassert f.jumlah == 0' },
          { name: 'Nilai return tetap diteruskan', code: '@hitung_panggilan\ndef g(a, b):\n    return a + b\nassert g(2, 3) == 5' },
          { name: 'Nama fungsi asli terjaga (@wraps)', code: '@hitung_panggilan\ndef namaku():\n    pass\nassert namaku.__name__ == "namaku"' }
        ],
        hints: ['Di dalam decorator, buat fungsi pembungkus(*args, **kwargs).', 'Setel pembungkus.jumlah = 0 sebelum return pembungkus.', 'Jangan lupa return fn(*args, **kwargs).'],
        solution: 'from functools import wraps\n\ndef hitung_panggilan(fn):\n    @wraps(fn)\n    def pembungkus(*args, **kwargs):\n        pembungkus.jumlah += 1\n        return fn(*args, **kwargs)\n    pembungkus.jumlah = 0\n    return pembungkus'
      }
    },
    {
      id: 'm5-l3',
      title: 'Context Manager',
      duration: 20,
      objectives: ['Memahami cara kerja with', 'Membuat context manager dengan class', 'Memakai @contextmanager'],
      quiz: [
        { id: 'm5-l3-q1', type: 'mcq', question: 'Dua method yang dibutuhkan context manager gaya class adalah ...', options: ['__start__ dan __stop__', '__enter__ dan __exit__', '__open__ dan __close__', '__init__ dan __del__'], answer: 1,
          explanation: '__exit__ selalu dijalankan, termasuk saat terjadi exception.' },
        { id: 'm5-l3-q2', type: 'mcq', question: 'Nilai yang diterima variabel setelah kata as berasal dari ...', options: ['__init__', 'return __enter__', 'return __exit__', 'Parameter with'], answer: 1,
          explanation: 'Karena itu __enter__ biasanya mengembalikan self.' },
        { id: 'm5-l3-q3', type: 'true_false', question: 'Di @contextmanager, bagian cleanup sebaiknya ditaruh di blok finally.', answer: true,
          explanation: 'Supaya tetap dijalankan walaupun blok with melempar error.' }
      ],
      coding: {
        prompt: 'Buat context manager `Timer` yang menyimpan lama eksekusi blok `with` di atribut `durasi`.\n\n```python\nwith Timer() as t:\n    pass\nprint(t.durasi)   # angka >= 0\n```',
        starter_code: 'import time\n\nclass Timer:\n    pass\n',
        tests: [
          { name: 'Atribut durasi terisi', code: 'with Timer() as t:\n    pass\nassert hasattr(t, "durasi") and t.durasi >= 0' },
          { name: 'Durasi bertipe angka', code: 'with Timer() as t:\n    sum(range(1000))\nassert isinstance(t.durasi, float)' },
          { name: 'Tetap terisi walau ada error', code: 'try:\n    with Timer() as t:\n        raise ValueError("x")\nexcept ValueError:\n    pass\nassert t.durasi >= 0' }
        ],
        hints: ['__enter__ mencatat waktu mulai dan return self.', '__exit__(self, exc_type, exc, tb) menghitung selisih waktu.', 'Pakai time.perf_counter().'],
        solution: 'import time\n\nclass Timer:\n    def __enter__(self):\n        self.mulai = time.perf_counter()\n        return self\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        self.durasi = time.perf_counter() - self.mulai\n        return False'
      }
    },
    {
      id: 'm5-l4',
      title: 'Type Hints',
      duration: 18,
      objectives: ['Menulis anotasi tipe dasar', 'Memakai Optional dan Union', 'Memahami peran mypy'],
      quiz: [
        { id: 'm5-l4-q1', type: 'true_false', question: 'Type hints membuat Python melempar error saat runtime kalau tipenya salah.', answer: false,
          explanation: 'Hint hanya catatan. Pengecekan dilakukan tool seperti mypy, bukan Python sendiri.' },
        { id: 'm5-l4-q2', type: 'mcq', question: 'Anotasi untuk nilai yang boleh None adalah ...', options: ['Maybe[str]', 'Optional[str]', 'Null[str]', 'str?'], answer: 1,
          explanation: 'Sejak Python 3.10 bisa juga ditulis str | None.' },
        { id: 'm5-l4-q3', type: 'mcq', question: 'Anotasi untuk fungsi yang tidak mengembalikan apa-apa adalah ...', options: ['-> void', '-> None', '-> empty', 'tidak perlu ditulis'], answer: 1,
          explanation: 'Fungsi tanpa return mengembalikan None.' }
      ],
      coding: {
        prompt: 'Lengkapi type hints fungsi `cari_user` berikut:\n\n- `users` bertipe `dict[int, str]`\n- `id` bertipe `int`\n- nilai kembalian bertipe `Optional[str]` (boleh `None`)',
        starter_code: 'from typing import Optional\n\ndef cari_user(users, id):\n    return users.get(id)\n',
        tests: [
          { name: 'Parameter users dianotasi dict[int, str]', code: 'a = cari_user.__annotations__\nassert a.get("users") == dict[int, str], a' },
          { name: 'Parameter id dianotasi int', code: 'assert cari_user.__annotations__.get("id") is int' },
          { name: 'Return dianotasi Optional[str]', code: 'from typing import Optional\nassert cari_user.__annotations__.get("return") == Optional[str]' },
          { name: 'Fungsinya tetap bekerja', code: 'assert cari_user({1: "a"}, 1) == "a" and cari_user({}, 9) is None' }
        ],
        hints: ['Formatnya: def f(nama: tipe, ...) -> tipe_kembalian:', 'dict[int, str] ditulis apa adanya sebagai anotasi.'],
        solution: 'from typing import Optional\n\ndef cari_user(users: dict[int, str], id: int) -> Optional[str]:\n    return users.get(id)'
      }
    },
    {
      id: 'm5-l5',
      title: 'Functional Tools',
      duration: 20,
      objectives: ['Memakai map, filter, reduce', 'Mengenal itertools', 'Membuat kombinasi data'],
      quiz: [
        { id: 'm5-l5-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))', answer: '[2, 4]',
          explanation: 'filter menyimpan elemen yang membuat fungsinya bernilai True.' },
        { id: 'm5-l5-q2', type: 'mcq', question: 'combinations([1,2,3], 2) menghasilkan ...', options: ['[(1,2), (1,3), (2,3)]', '[(1,2), (2,1), (1,3)]', '[1, 2, 3]', '[(1,1), (2,2)]'], answer: 0,
          explanation: 'Pada combinations, urutan tidak dianggap berbeda (beda dengan permutations).' },
        { id: 'm5-l5-q3', type: 'true_false', question: 'itertools.groupby bekerja benar hanya kalau datanya sudah diurutkan berdasarkan kuncinya.', answer: true,
          explanation: 'Kalau belum diurutkan, satu kelompok bisa muncul berkali-kali.' },
        { id: 'm5-l5-q4', type: 'mcq', question: 'reduce(lambda a, b: a * b, [1, 2, 3, 4]) menghasilkan ...', options: ['10', '24', '[1,2,3,4]', '4'], answer: 1,
          explanation: 'Perkalian bertahap: ((1*2)*3)*4 = 24.' }
      ],
      coding: {
        prompt: 'Buat fungsi `semua_pasangan(data)` yang mengembalikan **list** berisi semua kombinasi 2 elemen dari `data`.\n\nContoh: `[1, 2, 3]` → `[(1, 2), (1, 3), (2, 3)]`',
        starter_code: 'from itertools import combinations\n\ndef semua_pasangan(data):\n    pass\n',
        tests: [
          { name: 'Tiga elemen', code: 'assert semua_pasangan([1, 2, 3]) == [(1, 2), (1, 3), (2, 3)]' },
          { name: 'Dua elemen', code: 'assert semua_pasangan(["a", "b"]) == [("a", "b")]' },
          { name: 'Kurang dari 2 elemen -> []', code: 'assert semua_pasangan([1]) == [] and semua_pasangan([]) == []' }
        ],
        hints: ['combinations menghasilkan iterator — bungkus dengan list().'],
        solution: 'from itertools import combinations\n\ndef semua_pasangan(data):\n    return list(combinations(data, 2))'
      }
    },
    {
      id: 'm5-l6',
      title: 'Regular Expression',
      duration: 25,
      objectives: ['Menulis pola regex dasar', 'Memakai search, findall, sub', 'Mengambil bagian teks dengan grup'],
      quiz: [
        { id: 'm5-l6-q1', type: 'mcq', question: 'Pola \\d{4} cocok dengan ...', options: ['Empat digit angka', 'Angka 4', 'Empat huruf', 'Empat spasi'], answer: 0,
          explanation: '\\d adalah digit, {4} berarti tepat empat kali.' },
        { id: 'm5-l6-q2', type: 'mcq', question: 'Kenapa pola regex sebaiknya ditulis r"..."?', options: ['Supaya lebih cepat', 'Supaya backslash tidak diartikan sebagai escape oleh Python', 'Supaya huruf besar diabaikan', 'Supaya bisa multiline'], answer: 1,
          explanation: 'Raw string membuat \\d sampai apa adanya ke mesin regex.' },
        { id: 'm5-l6-q3', type: 'mcq', question: 'Beda re.match dan re.search adalah ...', options: ['Tidak ada', 'match hanya mencocokkan dari awal teks', 'search hanya untuk angka', 'match mengembalikan list'], answer: 1,
          explanation: 'search mencari di posisi mana pun; fullmatch mengharuskan seluruh teks cocok.' },
        { id: 'm5-l6-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import re\nprint(re.findall(r"\\d+", "a1 b22 c333"))', answer: "['1', '22', '333']",
          explanation: '\\d+ mengambil satu atau lebih digit berurutan.' }
      ],
      coding: {
        prompt: 'Buat fungsi `valid_email(s)` yang mengembalikan `True`/`False` untuk format email sederhana (ada nama, `@`, domain, dan titik + akhiran).',
        starter_code: 'import re\n\ndef valid_email(s):\n    pass\n',
        tests: [
          { name: '"a@b.com" valid', code: 'assert valid_email("a@b.com") is True' },
          { name: '"a@b" tidak valid', code: 'assert valid_email("a@b") is False' },
          { name: '"@b.com" tidak valid', code: 'assert valid_email("@b.com") is False' },
          { name: 'Email panjang valid', code: 'assert valid_email("salsa.dev+test@mail.co.id") is True' },
          { name: 'Ada spasi -> tidak valid', code: 'assert valid_email("a b@c.com") is False' }
        ],
        hints: ['Pakai re.fullmatch supaya seluruh teks harus cocok.', 'Pola awal yang bisa dipakai: r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+"', 'Bungkus hasilnya: return re.fullmatch(...) is not None'],
        solution: 'import re\n\nPOLA = r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+"\n\ndef valid_email(s):\n    return re.fullmatch(POLA, s) is not None'
      }
    },
    {
      id: 'm5-l7',
      title: 'Concurrency & Async',
      duration: 25,
      runtime: 'pyodide-limited',
      objectives: ['Membedakan threading, multiprocessing, asyncio', 'Memahami I/O-bound vs CPU-bound', 'Menjalankan coroutine bersamaan dengan gather'],
      quiz: [
        { id: 'm5-l7-q1', type: 'mcq', question: 'Untuk melakukan banyak request HTTP sekaligus, pendekatan paling cocok adalah ...', options: ['multiprocessing', 'asyncio', 'rekursi', 'generator'], answer: 1,
          explanation: 'Request HTTP bersifat I/O-bound — kebanyakan waktunya menunggu.' },
        { id: 'm5-l7-q2', type: 'mcq', question: 'GIL menyebabkan threading TIDAK membantu untuk pekerjaan ...', options: ['Membaca file', 'Request jaringan', 'Perhitungan berat (CPU-bound)', 'Menunggu input user'], answer: 2,
          explanation: 'Untuk CPU-bound, pakai multiprocessing.' },
        { id: 'm5-l7-q3', type: 'mcq', question: 'asyncio.gather dipakai untuk ...', options: ['Menjalankan coroutine satu per satu', 'Menjalankan banyak coroutine bersamaan', 'Membuat thread baru', 'Menutup event loop'], answer: 1,
          explanation: 'Hasilnya dikembalikan sesuai urutan argumen, bukan urutan selesainya.' },
        { id: 'm5-l7-q4', type: 'true_false', question: 'Memakai time.sleep() di dalam coroutine adalah praktik yang benar.', answer: false,
          explanation: 'time.sleep memblokir seluruh event loop. Pakai await asyncio.sleep().' }
      ],
      coding: {
        prompt: 'Fungsi `ambil(x)` sudah disediakan:\n\n```python\nasync def ambil(x):\n    await asyncio.sleep(0)\n    return x * 2\n```\n\nBuat `ambil_semua(nilai)` — sebuah **coroutine** yang memanggil `ambil` untuk setiap nilai **secara bersamaan** dengan `asyncio.gather`, lalu mengembalikan list hasilnya.',
        setup: 'import asyncio\n\nasync def ambil(x):\n    await asyncio.sleep(0)\n    return x * 2\n',
        starter_code: 'import asyncio\n\nasync def ambil_semua(nilai):\n    pass\n',
        tests: [
          { name: '[1,2,3] -> [2,4,6]', code: 'hasil = await ambil_semua([1, 2, 3])\nassert list(hasil) == [2, 4, 6], hasil' },
          { name: 'List kosong -> []', code: 'assert list(await ambil_semua([])) == []' },
          { name: 'Urutan hasil sesuai input', code: 'assert list(await ambil_semua([5, 1])) == [10, 2]' },
          { name: 'Ditulis sebagai coroutine', code: 'import inspect\nassert inspect.iscoroutinefunction(ambil_semua), "ambil_semua harus async def"' }
        ],
        hints: ['Buat daftar coroutine: [ambil(x) for x in nilai]', 'Bongkar dengan bintang: await asyncio.gather(*daftar)', 'Jangan lupa return hasilnya.'],
        solution: 'import asyncio\n\nasync def ambil_semua(nilai):\n    return await asyncio.gather(*[ambil(x) for x in nilai])'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 5 — Advance',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm5-x1', type: 'mcq', question: '(x for x in data) dengan kurung biasa menghasilkan ...', options: ['tuple', 'generator', 'list', 'set'], answer: 1,
        explanation: 'Itu generator expression, bukan tuple comprehension.' },
      { id: 'm5-x2', type: 'mcq', question: 'Decorator yang menyimpan hasil pemanggilan agar tidak dihitung ulang adalah ...', options: ['@property', '@lru_cache', '@staticmethod', '@wraps'], answer: 1,
        explanation: 'Sangat membantu untuk fungsi rekursif seperti fibonacci.' },
      { id: 'm5-x3', type: 'true_false', question: 'contextlib.suppress dipakai untuk mengabaikan exception tertentu.', answer: true,
        explanation: 'Contohnya menghapus file yang mungkin tidak ada.' },
      { id: 'm5-x4', type: 'mcq', question: 'Pola r"^\\d+$" cocok dengan ...', options: ['Teks yang seluruhnya angka', 'Teks yang diawali angka', 'Teks berisi spasi', 'Teks apa pun'], answer: 0,
        explanation: '^ dan $ mengunci awal dan akhir teks.' }
    ],
    coding: [
      {
        id: 'm5-e-c1',
        prompt: 'Buat decorator `retry(n)` yang mengulang pemanggilan fungsi sampai maksimal `n` kali kalau terjadi exception. Kalau sampai percobaan terakhir masih gagal, exception terakhir dilempar keluar.',
        starter_code: 'from functools import wraps\n\ndef retry(n):\n    pass\n',
        tests: [
          { name: 'Berhasil di percobaan ketiga', code: 'percobaan = {"n": 0}\n\n@retry(3)\ndef kadang_gagal():\n    percobaan["n"] += 1\n    if percobaan["n"] < 3:\n        raise ValueError("belum")\n    return "sukses"\n\nassert kadang_gagal() == "sukses" and percobaan["n"] == 3' },
          { name: 'Fungsi normal tetap jalan sekali', code: 'hitung = {"n": 0}\n\n@retry(3)\ndef aman():\n    hitung["n"] += 1\n    return 42\n\nassert aman() == 42 and hitung["n"] == 1' },
          { name: 'Selalu gagal -> exception dilempar', code: '@retry(2)\ndef selalu_gagal():\n    raise RuntimeError("boom")\n\ntry:\n    selalu_gagal()\n    raise AssertionError("Seharusnya melempar RuntimeError")\nexcept RuntimeError:\n    pass' },
          { name: 'Argumen fungsi diteruskan', code: '@retry(2)\ndef tambah(a, b=0):\n    return a + b\n\nassert tambah(2, b=3) == 5' }
        ],
        hints: ['retry(n) mengembalikan decorator, decorator mengembalikan pembungkus (tiga tingkat).', 'Di pembungkus, loop range(n) dengan try/except; simpan exception terakhir.', 'Setelah loop habis, raise exception terakhir.'],
        solution: 'from functools import wraps\n\ndef retry(n):\n    def decorator(fn):\n        @wraps(fn)\n        def pembungkus(*args, **kwargs):\n            terakhir = None\n            for _ in range(n):\n                try:\n                    return fn(*args, **kwargs)\n                except Exception as e:\n                    terakhir = e\n            raise terakhir\n        return pembungkus\n    return decorator'
      }
    ]
  }
};
