export default {
  id: 'm6',
  title: 'Testing & Automation',
  icon: '🧪',
  tagline: 'pytest, fixture, mocking, API & UI automation.',
  desc: 'Spesialisasi QA: menulis test yang cepat, stabil, dan dipercaya tim.',
  badge: { id: 'b-m6', icon: '🧪', name: 'QA Engineer', desc: 'Menguasai dasar automation testing' },
  lessons: [
    {
      id: 'm6-l1',
      title: 'Dasar Unit Test dengan pytest',
      duration: 25,
      objectives: ['Memahami kenapa test otomatis penting', 'Menulis test dengan pytest', 'Membaca laporan kegagalan'],
      quiz: [
        { id: 'm6-l1-q1', type: 'mcq', question: 'Nama file yang otomatis dikenali pytest adalah ...', options: ['test_login.py', 'login.py', 'Login.test', 'pytest_login.py'], answer: 0,
          explanation: 'Konvensinya test_*.py atau *_test.py, dan fungsinya diawali test_.' },
        { id: 'm6-l1-q2', type: 'mcq', question: 'Pola penulisan test yang dianjurkan adalah ...', options: ['Arrange - Act - Assert', 'Init - Loop - Close', 'Given - Return', 'Setup - Print'], answer: 0,
          explanation: 'Siapkan data, jalankan yang diuji, lalu periksa hasilnya.' },
        { id: 'm6-l1-q3', type: 'mcq', question: 'Untuk menguji bahwa sebuah fungsi melempar ValueError, kita memakai ...', options: ['assert error', 'pytest.raises(ValueError)', 'try tanpa except', 'assert False'], answer: 1,
          explanation: 'with pytest.raises(ValueError): ... akan gagal kalau exception tidak dilempar.' },
        { id: 'm6-l1-q4', type: 'true_false', question: 'Test sebaiknya hanya menguji jalur normal (happy path).', answer: false,
          explanation: 'Kasus batas dan jalur gagal justru paling sering menyimpan bug.' }
      ],
      coding: {
        prompt: 'Fungsi `diskon(harga, persen)` sudah tersedia (mengembalikan harga setelah dipotong persen).\n\nTulis **minimal 3 fungsi test** yang namanya diawali `test_`, masing-masing memakai `assert`.\n\nPenilaiannya bergaya *mutation testing*: test kamu harus **lolos** pada implementasi yang benar, dan harus **menangkap** implementasi yang dirusak.',
        setup: 'def diskon(harga, persen):\n    return harga - harga * persen / 100\n',
        starter_code: '# diskon(harga, persen) sudah tersedia.\n# Contoh: diskon(100, 10) == 90\n\ndef test_diskon_10_persen():\n    assert diskon(100, 10) == 90\n\n# tambahkan minimal 2 fungsi test lagi\n',
        tests: [
          { name: 'Ada minimal 3 fungsi test_', code: `_fn = [k for k, v in list(globals().items()) if k.startswith("test_") and callable(v)]\nassert len(_fn) >= 3, f"Baru ada {len(_fn)} fungsi test_. Butuh minimal 3."` },
          { name: 'Semua test lolos pada implementasi yang benar', code: `_fn = [v for k, v in list(globals().items()) if k.startswith("test_") and callable(v)]\nfor _f in _fn:\n    _f()` },
          { name: 'Menangkap bug: diskon diabaikan', code: `_fn = [v for k, v in list(globals().items()) if k.startswith("test_") and callable(v)]\n_asli = diskon\ndef _rusak(harga, persen):\n    return harga\nglobals()["diskon"] = _rusak\n_gagal = 0\ntry:\n    for _f in _fn:\n        try:\n            _f()\n        except Exception:\n            _gagal += 1\nfinally:\n    globals()["diskon"] = _asli\nassert _gagal > 0, "Test kamu tetap lolos walau diskon tidak dipotong sama sekali. Tambah kasus dengan persen > 0."` },
          { name: 'Menangkap bug: persen dikurangi sebagai nominal', code: `_fn = [v for k, v in list(globals().items()) if k.startswith("test_") and callable(v)]\n_asli = diskon\ndef _rusak2(harga, persen):\n    return harga - persen\nglobals()["diskon"] = _rusak2\n_gagal = 0\ntry:\n    for _f in _fn:\n        try:\n            _f()\n        except Exception:\n            _gagal += 1\nfinally:\n    globals()["diskon"] = _asli\nassert _gagal > 0, "Test kamu tidak membedakan potongan persen dengan potongan nominal. Coba harga selain 100."` }
        ],
        hints: ['Variasikan harga, jangan semua memakai 100.', 'Uji juga kasus batas: persen 0 dan persen 100.', 'Contoh: assert diskon(200, 50) == 100'],
        solution: 'def test_diskon_10_persen():\n    assert diskon(100, 10) == 90\n\ndef test_diskon_setengah_harga():\n    assert diskon(200, 50) == 100\n\ndef test_diskon_nol_persen():\n    assert diskon(80, 0) == 80\n\ndef test_diskon_penuh():\n    assert diskon(150, 100) == 0'
      }
    },
    {
      id: 'm6-l2',
      title: 'Fixture & Parametrize',
      duration: 25,
      objectives: ['Menghapus duplikasi test dengan parametrize', 'Menyiapkan bahan test dengan fixture', 'Memakai marker'],
      quiz: [
        { id: 'm6-l2-q1', type: 'mcq', question: 'Kelebihan parametrize dibanding for loop di dalam satu test adalah ...', options: ['Lebih cepat', 'Tiap kasus dilaporkan terpisah', 'Tidak perlu assert', 'Otomatis paralel'], answer: 1,
          explanation: 'Kalau satu kasus gagal, kasus lainnya tetap dijalankan dan terlihat jelas.' },
        { id: 'm6-l2-q2', type: 'mcq', question: 'Kode setelah yield di dalam fixture berfungsi sebagai ...', options: ['Setup', 'Teardown / pembersihan', 'Assertion', 'Parameter'], answer: 1,
          explanation: 'Polanya sama seperti context manager.' },
        { id: 'm6-l2-q3', type: 'mcq', question: 'Fixture yang ditaruh di conftest.py ...', options: ['Harus di-import manual', 'Otomatis tersedia di semua test dalam folder itu', 'Hanya berlaku di file itu', 'Tidak akan dipakai pytest'], answer: 1,
          explanation: 'Itu tempat standar untuk fixture bersama.' },
        { id: 'm6-l2-q4', type: 'true_false', question: 'Fixture scope="session" aman dipakai untuk data yang diubah-ubah oleh test.', answer: false,
          explanation: 'Test jadi saling mempengaruhi dan melanggar prinsip Independent.' }
      ],
      coding: {
        prompt: 'Fungsi `cek_password(pw)` sudah tersedia (valid jika panjang ≥ 8 **dan** mengandung angka).\n\nBuat gaya parametrize secara manual:\n\n1. `KASUS` — list berisi minimal **5** tuple `(pw, harapan)`, harus mencakup kasus valid **dan** tidak valid.\n2. `test_cek_password(pw, harapan)` — satu fungsi yang memeriksa satu kasus dengan `assert`.',
        setup: 'def cek_password(pw):\n    return len(pw) >= 8 and any(c.isdigit() for c in pw)\n',
        starter_code: '# cek_password(pw) sudah tersedia.\n\nKASUS = [\n    ("abc", False),\n    # tambahkan minimal 4 kasus lagi\n]\n\n\ndef test_cek_password(pw, harapan):\n    pass\n',
        tests: [
          { name: 'KASUS berisi minimal 5 tuple', code: `assert isinstance(KASUS, list) and len(KASUS) >= 5, f"KASUS baru berisi {len(KASUS)} item."\nassert all(isinstance(k, tuple) and len(k) == 2 for k in KASUS), "Tiap kasus harus tuple (pw, harapan)."` },
          { name: 'Mencakup kasus valid dan tidak valid', code: `_h = [k[1] for k in KASUS]\nassert True in _h and False in _h, "Sertakan kasus yang valid dan yang tidak valid."` },
          { name: 'Semua kasus lolos', code: `for _pw, _harapan in KASUS:\n    test_cek_password(_pw, _harapan)` },
          { name: 'Harapan kasus memang benar', code: `for _pw, _harapan in KASUS:\n    assert cek_password(_pw) is bool(_harapan), f"Kasus {_pw!r} harapannya salah."` },
          { name: 'Fungsi test benar-benar memeriksa (bukan pass)', code: `_asli = cek_password\ndef _rusak(pw):\n    return True\nglobals()["cek_password"] = _rusak\n_gagal = 0\ntry:\n    for _pw, _harapan in KASUS:\n        try:\n            test_cek_password(_pw, _harapan)\n        except Exception:\n            _gagal += 1\nfinally:\n    globals()["cek_password"] = _asli\nassert _gagal > 0, "test_cek_password tidak benar-benar memeriksa hasil. Pakai assert."` }
        ],
        hints: ['Isi fungsi test dengan: assert cek_password(pw) is harapan', 'Kasus valid contohnya ("rahasia123", True).', 'Kasus tidak valid: terlalu pendek, atau panjang tapi tanpa angka.'],
        solution: 'KASUS = [\n    ("abc", False),\n    ("abcdefg", False),\n    ("abcdefgh", False),\n    ("rahasia123", True),\n    ("passw0rd", True),\n    ("12345678", True),\n]\n\n\ndef test_cek_password(pw, harapan):\n    assert cek_password(pw) is harapan'
      }
    },
    {
      id: 'm6-l3',
      title: 'Mocking',
      duration: 25,
      objectives: ['Memahami kenapa dependensi eksternal harus dipalsukan', 'Memakai Mock dan patch', 'Menguji jalur gagal'],
      quiz: [
        { id: 'm6-l3-q1', type: 'mcq', question: 'Alasan utama memakai mock dalam test adalah ...', options: ['Supaya kode lebih pendek', 'Menghilangkan ketergantungan pada jaringan/database agar test cepat & stabil', 'Menambah coverage otomatis', 'Menggantikan assert'], answer: 1,
          explanation: 'Mock membuat test deterministik dan bisa jalan di CI tanpa internet.' },
        { id: 'm6-l3-q2', type: 'mcq', question: 'Kalau modul cuaca.py menulis "from requests import get", target patch yang benar adalah ...', options: ['patch("requests.get")', 'patch("cuaca.get")', 'patch("get")', 'patch("requests")'], answer: 1,
          explanation: 'Patch di tempat nama itu dipakai, bukan tempat ia didefinisikan.' },
        { id: 'm6-l3-q3', type: 'mcq', question: 'Parameter side_effect pada Mock dipakai untuk ...', options: ['Mengubah nama mock', 'Melempar exception atau memberi nilai berbeda tiap pemanggilan', 'Menghitung coverage', 'Mempercepat test'], answer: 1,
          explanation: 'Sangat berguna untuk menguji skenario timeout atau error.' },
        { id: 'm6-l3-q4', type: 'true_false', question: 'Semakin banyak hal yang di-mock, semakin bagus test-nya.', answer: false,
          explanation: 'Mock berlebihan membuat test hanya menguji mock itu sendiri.' }
      ],
      coding: {
        prompt: 'Modul `cuaca` sudah tersedia dengan isi:\n\n```python\ndef panggil_api(kota):\n    raise RuntimeError("Tidak ada jaringan saat test!")\n\ndef ambil_cuaca(kota):\n    return panggil_api(kota)["suhu"]\n```\n\nTulis fungsi `test_ambil_cuaca()` yang memakai `unittest.mock.patch` untuk memalsukan `cuaca.panggil_api` agar mengembalikan `{"suhu": 30}`, lalu memastikan `cuaca.ambil_cuaca("Bandung")` bernilai `30`.',
        setup: 'import sys, types\n_m = types.ModuleType("cuaca")\nexec(\'def panggil_api(kota):\\n    raise RuntimeError("Tidak ada jaringan saat test!")\\n\\ndef ambil_cuaca(kota):\\n    return panggil_api(kota)["suhu"]\\n\', _m.__dict__)\nsys.modules["cuaca"] = _m\n',
        starter_code: 'from unittest.mock import patch\nimport cuaca\n\n\ndef test_ambil_cuaca():\n    pass\n',
        tests: [
          { name: 'Fungsi test_ambil_cuaca ada', code: `assert callable(globals().get("test_ambil_cuaca")), "Belum ada fungsi test_ambil_cuaca()."` },
          { name: 'Test berjalan dan lolos', code: `test_ambil_cuaca()` },
          { name: 'Memakai patch / Mock', code: `import inspect\n_src = inspect.getsource(test_ambil_cuaca)\nassert ("patch" in _src) or ("Mock" in _src), "Gunakan patch atau Mock, jangan menimpa fungsi secara permanen."` },
          { name: 'Fungsi asli dikembalikan setelah test', code: `import cuaca\ntry:\n    cuaca.panggil_api("X")\n    raise AssertionError("panggil_api asli seharusnya tetap melempar RuntimeError setelah patch selesai.")\nexcept RuntimeError:\n    pass` },
          { name: 'Memeriksa nilai hasilnya', code: `import inspect\nassert "30" in inspect.getsource(test_ambil_cuaca), "Pastikan test memeriksa nilai 30."` }
        ],
        hints: ['Bungkus dengan: with patch("cuaca.panggil_api") as fake:', 'Atur fake.return_value = {"suhu": 30}', 'Lalu assert cuaca.ambil_cuaca("Bandung") == 30'],
        solution: 'from unittest.mock import patch\nimport cuaca\n\n\ndef test_ambil_cuaca():\n    with patch("cuaca.panggil_api") as fake:\n        fake.return_value = {"suhu": 30}\n        assert cuaca.ambil_cuaca("Bandung") == 30\n        fake.assert_called_once_with("Bandung")'
      }
    },
    {
      id: 'm6-l4',
      title: 'API Testing dengan requests',
      duration: 25,
      runtime: 'pyodide-limited',
      objectives: ['Mengenal method dan status code HTTP', 'Memvalidasi response secara menyeluruh', 'Memahami schema validation'],
      quiz: [
        { id: 'm6-l4-q1', type: 'mcq', question: 'Status code untuk "resource berhasil dibuat" adalah ...', options: ['200', '201', '204', '404'], answer: 1,
          explanation: '201 Created biasanya jadi respons POST yang berhasil.' },
        { id: 'm6-l4-q2', type: 'mcq', question: 'Beda 401 dan 403 adalah ...', options: ['Tidak ada bedanya', '401 belum terautentikasi, 403 sudah dikenali tapi tidak berhak', '401 server error', '403 halaman tidak ditemukan'], answer: 1,
          explanation: '401 = "kamu siapa?", 403 = "aku tahu kamu, tapi tidak boleh".' },
        { id: 'm6-l4-q3', type: 'mcq', question: 'Selain status code, yang sebaiknya juga diperiksa dalam API test adalah ...', options: ['Warna response', 'Field wajib, tipe data, dan waktu respons', 'Nama server', 'Jumlah baris kode'], answer: 1,
          explanation: 'Status 200 dengan body kosong tetap sebuah bug.' },
        { id: 'm6-l4-q4', type: 'true_false', question: 'Memanggil requests tanpa timeout adalah praktik yang aman.', answer: false,
          explanation: 'Tanpa timeout, test bisa menggantung tanpa batas waktu.' }
      ],
      coding: {
        prompt: 'Buat fungsi `validasi_response(resp)` yang mengembalikan `True` hanya kalau:\n\n1. `resp["status"]` bernilai `200`, **dan**\n2. `resp["body"]` memiliki ketiga field wajib: `id`, `nama`, `email`.\n\nFungsinya harus aman dipakai walaupun kunci `status` atau `body` tidak ada.',
        starter_code: 'WAJIB = ("id", "nama", "email")\n\ndef validasi_response(resp):\n    pass\n',
        tests: [
          { name: 'Response lengkap -> True', code: 'assert validasi_response({"status": 200, "body": {"id": 1, "nama": "A", "email": "a@b.com"}}) is True' },
          { name: 'Status bukan 200 -> False', code: 'assert validasi_response({"status": 404, "body": {"id": 1, "nama": "A", "email": "a@b.com"}}) is False' },
          { name: 'Field kurang -> False', code: 'assert validasi_response({"status": 200, "body": {"id": 1}}) is False' },
          { name: 'Tanpa body -> False', code: 'assert validasi_response({"status": 200}) is False' },
          { name: 'Dict kosong -> False (tidak error)', code: 'assert validasi_response({}) is False' },
          { name: 'Field tambahan tetap boleh', code: 'assert validasi_response({"status": 200, "body": {"id": 1, "nama": "A", "email": "x", "extra": 9}}) is True' }
        ],
        hints: ['Pakai resp.get("status") supaya aman kalau kuncinya tidak ada.', 'body = resp.get("body") or {}', 'Gunakan all(k in body for k in WAJIB).'],
        solution: 'WAJIB = ("id", "nama", "email")\n\ndef validasi_response(resp):\n    if resp.get("status") != 200:\n        return False\n    body = resp.get("body") or {}\n    return all(k in body for k in WAJIB)'
      }
    },
    {
      id: 'm6-l5',
      title: 'UI Automation dengan Playwright',
      duration: 30,
      runtime: 'pyodide-limited',
      objectives: ['Memahami auto-wait dan locator', 'Menyusun POM di Playwright', 'Menjalankan test di GitHub Actions'],
      quiz: [
        { id: 'm6-l5-q1', type: 'mcq', question: 'Kelebihan auto-wait Playwright adalah ...', options: ['Mengurangi sleep manual dan test flaky', 'Membuat browser lebih ringan', 'Menghapus kebutuhan assertion', 'Mempercepat internet'], answer: 0,
          explanation: 'Locator menunggu elemen siap sebelum beraksi.' },
        { id: 'm6-l5-q2', type: 'mcq', question: 'Urutan prioritas locator yang dianjurkan adalah ...', options: ['XPath → CSS → role', 'role/label → text → test-id → CSS', 'id → class → tag', 'Acak saja'], answer: 1,
          explanation: 'Locator yang meniru cara user tidak gampang rusak saat HTML berubah.' },
        { id: 'm6-l5-q3', type: 'mcq', question: 'Kenapa memakai expect() lebih baik daripada assert biasa untuk kondisi UI?', options: ['Lebih pendek', 'expect() otomatis mencoba ulang selama beberapa detik', 'assert tidak ada di Python', 'expect() mencetak warna'], answer: 1,
          explanation: 'Retry bawaan mencegah kegagalan hanya karena elemen belum sempat muncul.' },
        { id: 'm6-l5-q4', type: 'true_false', question: 'Di GitHub Actions, upload laporan sebaiknya memakai if: always().', answer: true,
          explanation: 'Laporan justru paling dibutuhkan ketika test gagal.' }
      ],
      coding: null
    }
  ],
  exam: {
    title: 'Ujian Modul 6 — Testing & Automation',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm6-x1', type: 'mcq', question: 'Perintah menjalankan hanya test yang namanya mengandung kata "login" adalah ...', options: ['pytest -m login', 'pytest -k login', 'pytest --only login', 'pytest login'], answer: 1,
        explanation: '-k menyaring berdasarkan nama, -m berdasarkan marker.' },
      { id: 'm6-x2', type: 'mcq', question: 'Prinsip FIRST pada unit test — huruf I berarti ...', options: ['Integrated', 'Independent', 'Isolated build', 'Immediate'], answer: 1,
        explanation: 'Test tidak boleh bergantung pada urutan atau hasil test lain.' },
      { id: 'm6-x3', type: 'true_false', question: 'Test yang kadang lulus kadang gagal tanpa perubahan kode disebut flaky.', answer: true,
        explanation: 'Penyebab tersering: menunggu manual, data bersama, dan urutan eksekusi.' },
      { id: 'm6-x4', type: 'mcq', question: 'Dibanding UI test, API test umumnya ...', options: ['Lebih lambat dan rapuh', 'Lebih cepat dan stabil', 'Tidak bisa diotomatiskan', 'Hanya untuk frontend'], answer: 1,
        explanation: 'Karena itu jumlahnya lebih banyak di piramida testing.' }
    ],
    coding: [
      {
        id: 'm6-e-c1',
        prompt: 'Buat fungsi `ringkas_hasil(hasil)`.\n\nInput: list of dict, masing-masing `{"nama": str, "status": "pass"|"fail"|"skip"}`.\n\nKembalikan dict:\n\n```python\n{"total": int, "pass": int, "fail": int, "skip": int, "gagal": [nama test yang fail]}\n```',
        starter_code: 'def ringkas_hasil(hasil):\n    pass\n',
        tests: [
          { name: 'Menghitung dengan benar', code: 'data = [{"nama": "a", "status": "pass"}, {"nama": "b", "status": "fail"}, {"nama": "c", "status": "skip"}]\nassert ringkas_hasil(data) == {"total": 3, "pass": 1, "fail": 1, "skip": 1, "gagal": ["b"]}' },
          { name: 'Semua lulus', code: 'data = [{"nama": "a", "status": "pass"}]\nassert ringkas_hasil(data) == {"total": 1, "pass": 1, "fail": 0, "skip": 0, "gagal": []}' },
          { name: 'List kosong', code: 'assert ringkas_hasil([]) == {"total": 0, "pass": 0, "fail": 0, "skip": 0, "gagal": []}' },
          { name: 'Urutan nama yang gagal dipertahankan', code: 'data = [{"nama": "x", "status": "fail"}, {"nama": "y", "status": "pass"}, {"nama": "z", "status": "fail"}]\nassert ringkas_hasil(data)["gagal"] == ["x", "z"]' }
        ],
        hints: ['Siapkan dict hasil dengan nilai awal 0 dan list kosong.', 'Loop sekali saja sambil menambah penghitung yang sesuai.'],
        solution: 'def ringkas_hasil(hasil):\n    ringkas = {"total": len(hasil), "pass": 0, "fail": 0, "skip": 0, "gagal": []}\n    for t in hasil:\n        status = t.get("status")\n        if status in ("pass", "fail", "skip"):\n            ringkas[status] += 1\n        if status == "fail":\n            ringkas["gagal"].append(t.get("nama"))\n    return ringkas'
      }
    ]
  }
};
