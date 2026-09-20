## Framework Automation Test untuk Web Demo

Selamat — kamu sudah menuntaskan seluruh kurikulum. Sekarang saatnya membuktikannya lewat satu proyek utuh yang bisa dipajang di CV.

## Yang harus dibuat

Sebuah framework automation testing untuk sebuah situs demo publik. Pilih salah satu:

- [saucedemo.com](https://www.saucedemo.com) — toko online, cocok untuk alur login → keranjang → checkout
- [the-internet.herokuapp.com](https://the-internet.herokuapp.com) — kumpulan skenario UI yang menantang
- [reqres.in](https://reqres.in) atau [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) — untuk bagian API

## Struktur proyek yang disarankan

```
qa-framework/
├── README.md
├── requirements.txt
├── pytest.ini
├── conftest.py
├── pages/
│   ├── base_page.py
│   ├── login_page.py
│   ├── inventory_page.py
│   └── cart_page.py
├── tests/
│   ├── ui/
│   │   ├── test_login.py
│   │   └── test_checkout.py
│   └── api/
│       └── test_users.py
├── data/
│   └── users.json
├── utils/
│   └── logger.py
└── .github/workflows/test.yml
```

## Checklist penilaian

Centang tiap item di panel sebelah setelah benar-benar selesai. Semua tercentang = sertifikat kurikulum terbuka.

1. **Struktur proyek rapi** — ada package, `requirements.txt`, dan `README.md` berisi cara menjalankan.
2. **Page Object Model minimal 3 halaman** — selector jadi konstanta, tidak ada `assert` di dalam page object.
3. **Minimal 10 test UI** dengan Playwright, termasuk jalur gagal.
4. **Minimal 5 test API** — periksa status code, field wajib, dan jalur negatif.
5. **Data test dari file JSON/CSV** — kredensial dan data uji tidak ditulis keras di dalam test.
6. **Fixture & parametrize dipakai** — fixture di `conftest.py`, minimal satu test `parametrize`.
7. **Logging dan laporan HTML** — `pytest --html=report.html` menghasilkan laporan.
8. **Berjalan otomatis di GitHub Actions** — badge hijau di README.
9. **Link repo GitHub dikumpulkan** — tempel di kolom yang tersedia.

## Tips supaya nilainya bagus

- **README itu etalase.** Tulis: apa yang ditest, cara menjalankan, struktur folder, dan screenshot laporan.
- **Commit bertahap** dengan pesan bermakna, bukan satu commit "final" raksasa.
- **Test harus hijau di mesin orang lain.** Jangan bergantung pada file atau path yang cuma ada di laptopmu.
- **Tulis test yang gagal dengan benar.** Coba rusak satu selector dan pastikan laporannya jelas menunjukkan penyebabnya.
- **Jangan lupa `.gitignore`** — `venv/`, `__pycache__/`, `.env`, `report.html`.

## Setelah selesai

Kamu sudah punya: dasar Python yang kuat, OOP, fitur advance, dan framework testing sungguhan di GitHub. Langkah berikutnya yang masuk akal: CI/CD lebih dalam, performance testing (k6/Locust), atau Playwright dengan visual regression.
