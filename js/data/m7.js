export default {
  id: 'm7',
  title: 'Pandas — Mengolah Data',
  icon: '🗃️',
  tagline: 'DataFrame, seleksi, pembersihan, groupby, merge.',
  desc: '70% waktu proyek AI habis di sini: menyiapkan data sampai layak dipakai model.',
  badge: { id: 'b-m7', icon: '🗃️', name: 'Pawang Data', desc: 'Menguasai pandas untuk menyiapkan data' },
  lessons: [
    {
      id: 'm7-l1',
      title: 'Series & DataFrame',
      duration: 22,
      objectives: ['Membuat Series dan DataFrame', 'Mengintip data dengan head/info/describe', 'Membuat kolom baru'],
      quiz: [
        { id: 'm7-l1-q1', type: 'mcq', question: 'Perbedaan df["nilai"] dan df[["nilai"]] adalah ...', options: ['Tidak ada', 'Yang pertama Series, yang kedua DataFrame', 'Yang pertama error', 'Yang kedua mengurutkan data'], answer: 1,
          explanation: 'Dua kurung siku selalu menghasilkan DataFrame, walaupun kolomnya cuma satu.' },
        { id: 'm7-l1-q2', type: 'mcq', question: 'Perintah untuk melihat tipe tiap kolom sekaligus jumlah nilai yang terisi adalah ...', options: ['df.head()', 'df.info()', 'df.shape', 'df.columns'], answer: 1,
          explanation: 'info() langsung menunjukkan kolom mana yang punya nilai kosong.' },
        { id: 'm7-l1-q3', type: 'mcq', question: 'value_counts() dipakai untuk ...', options: ['Menghitung jumlah kolom', 'Menghitung frekuensi tiap nilai unik', 'Menghapus duplikat', 'Mengurutkan data'], answer: 1,
          explanation: 'Cara tercepat mengecek apakah label datamu seimbang.' },
        { id: 'm7-l1-q4', type: 'true_false', question: 'Semua kolom DataFrame harus bertipe sama, seperti array NumPy.', answer: false,
          explanation: 'Justru kelebihan DataFrame: tiap kolom boleh punya tipe berbeda.' }
      ],
      coding: {
        packages: ['pandas'],
        prompt: 'Buat fungsi `buat_tabel(nama, nilai)` yang menerima dua list dan mengembalikan DataFrame dengan kolom:\n\n- `nama`\n- `nilai`\n- `lulus` → `True` kalau nilai ≥ 75',
        starter_code: 'import pandas as pd\n\ndef buat_tabel(nama, nilai):\n    pass\n',
        tests: [
          { name: 'Mengembalikan DataFrame', code: 'import pandas as pd\nassert isinstance(buat_tabel(["A"], [80]), pd.DataFrame)' },
          { name: 'Punya tiga kolom yang benar', code: 'df = buat_tabel(["A", "B"], [80, 60])\nassert list(df.columns) == ["nama", "nilai", "lulus"], list(df.columns)' },
          { name: 'Kolom lulus benar', code: 'df = buat_tabel(["A", "B"], [80, 60])\nassert list(df["lulus"]) == [True, False]' },
          { name: 'Batas 75 dianggap lulus', code: 'df = buat_tabel(["C"], [75])\nassert bool(df["lulus"].iloc[0]) is True' }
        ],
        hints: ['Buat DataFrame dari dict: pd.DataFrame({"nama": nama, "nilai": nilai})', 'Kolom baru: df["lulus"] = df["nilai"] >= 75'],
        solution: 'import pandas as pd\n\ndef buat_tabel(nama, nilai):\n    df = pd.DataFrame({"nama": nama, "nilai": nilai})\n    df["lulus"] = df["nilai"] >= 75\n    return df'
      }
    },
    {
      id: 'm7-l2',
      title: 'Seleksi & Filter Data',
      duration: 24,
      objectives: ['Membedakan .loc dan .iloc', 'Menyaring baris dengan kondisi', 'Mengurutkan dan mengambil data teratas'],
      quiz: [
        { id: 'm7-l2-q1', type: 'mcq', question: 'Perbedaan .loc dan .iloc adalah ...', options: ['.loc pakai label, .iloc pakai posisi angka', '.loc untuk kolom, .iloc untuk baris', 'Tidak ada bedanya', '.iloc hanya untuk angka'], answer: 0,
          explanation: 'Dan .loc inklusif di ujung slicing, sementara .iloc eksklusif.' },
        { id: 'm7-l2-q2', type: 'mcq', question: 'Cara benar menggabungkan dua kondisi filter DataFrame adalah ...', options: ['df[df.a > 1 and df.b < 5]', 'df[(df.a > 1) & (df.b < 5)]', 'df[df.a > 1 && df.b < 5]', 'df.filter(a>1, b<5)'], answer: 1,
          explanation: 'Pakai & dengan kurung di tiap kondisi.' },
        { id: 'm7-l2-q3', type: 'mcq', question: 'df["kota"].isin(["Bandung", "Jakarta"]) menghasilkan ...', options: ['DataFrame hasil filter', 'Series berisi True/False', 'Daftar kota unik', 'Jumlah kemunculan'], answer: 1,
          explanation: 'Hasilnya mask, yang lalu dipakai untuk menyaring: df[mask].' },
        { id: 'm7-l2-q4', type: 'mcq', question: 'SettingWithCopyWarning muncul karena ...', options: ['Kolom tidak ada', 'Mengubah hasil filter yang belum jelas salinan atau bukan', 'Data terlalu besar', 'Nama kolom mengandung spasi'], answer: 1,
          explanation: 'Solusinya .copy() atau ubah langsung lewat df.loc[kondisi, kolom].' }
      ],
      coding: {
        packages: ['pandas'],
        prompt: 'Buat fungsi `siswa_terbaik(df, n)` yang mengembalikan DataFrame berisi `n` siswa dengan nilai tertinggi, **hanya kolom** `nama` dan `nilai`, terurut dari nilai terbesar.',
        starter_code: 'import pandas as pd\n\ndef siswa_terbaik(df, n):\n    pass\n',
        tests: [
          { name: 'Jumlah baris sesuai n', code: 'import pandas as pd\ndf = pd.DataFrame({"nama": list("ABCD"), "nilai": [70, 90, 80, 60], "umur": [20, 21, 22, 23]})\nassert len(siswa_terbaik(df, 2)) == 2' },
          { name: 'Hanya dua kolom', code: 'import pandas as pd\ndf = pd.DataFrame({"nama": list("ABCD"), "nilai": [70, 90, 80, 60], "umur": [20, 21, 22, 23]})\nassert list(siswa_terbaik(df, 2).columns) == ["nama", "nilai"]' },
          { name: 'Urutan dari terbesar', code: 'import pandas as pd\ndf = pd.DataFrame({"nama": list("ABCD"), "nilai": [70, 90, 80, 60], "umur": [20, 21, 22, 23]})\nassert list(siswa_terbaik(df, 3)["nama"]) == ["B", "C", "A"]' },
          { name: 'n lebih besar dari jumlah data tetap aman', code: 'import pandas as pd\ndf = pd.DataFrame({"nama": ["A"], "nilai": [50], "umur": [20]})\nassert len(siswa_terbaik(df, 5)) == 1' }
        ],
        hints: ['sort_values("nilai", ascending=False) lalu head(n).', 'Pilih kolom dengan dua kurung siku: [["nama", "nilai"]]'],
        solution: 'import pandas as pd\n\ndef siswa_terbaik(df, n):\n    return df.sort_values("nilai", ascending=False).head(n)[["nama", "nilai"]]'
      }
    },
    {
      id: 'm7-l3',
      title: 'Membersihkan Data',
      duration: 26,
      objectives: ['Mendeteksi & menangani nilai kosong', 'Membuang duplikat', 'Memperbaiki tipe data yang salah'],
      quiz: [
        { id: 'm7-l3-q1', type: 'mcq', question: 'Perintah untuk melihat jumlah nilai kosong tiap kolom adalah ...', options: ['df.isna().sum()', 'df.dropna()', 'df.count()', 'df.empty'], answer: 0,
          explanation: 'isna() menghasilkan tabel True/False, sum() menghitungnya per kolom.' },
        { id: 'm7-l3-q2', type: 'mcq', question: 'Untuk mengisi nilai kosong pada data numerik, median biasanya lebih aman dari mean karena ...', options: ['Lebih cepat dihitung', 'Tidak terpengaruh nilai ekstrem', 'Selalu bilangan bulat', 'Menghemat memori'], answer: 1,
          explanation: 'Satu outlier besar bisa menggeser mean jauh, median tidak.' },
        { id: 'm7-l3-q3', type: 'mcq', question: 'pd.to_numeric(x, errors="coerce") akan ...', options: ['Membuang baris yang gagal', 'Mengubah nilai yang gagal jadi NaN', 'Melempar error', 'Mengubah semua jadi string'], answer: 1,
          explanation: 'Program tidak mati; nilai bermasalah ditandai NaN untuk ditangani belakangan.' },
        { id: 'm7-l3-q4', type: 'true_false', question: 'Nilai pengisi (mean/median) sebaiknya dihitung dari seluruh data termasuk data uji.', answer: false,
          explanation: 'Itu data leakage. Hitung dari data latih saja, lalu terapkan ke data uji.' }
      ],
      coding: {
        packages: ['pandas', 'numpy'],
        prompt: 'Buat fungsi `bersihkan(df)` yang:\n\n1. Membuang baris duplikat\n2. Mengisi nilai kosong pada kolom `umur` dengan **median**-nya\n3. Membuang baris yang kolom `nama`-nya kosong\n4. Merapikan `nama`: hilangkan spasi di ujung dan ubah jadi Title Case\n\nKembalikan DataFrame baru (jangan mengubah `df` aslinya).',
        starter_code: 'import pandas as pd\nimport numpy as np\n\ndef bersihkan(df):\n    pass\n',
        tests: [
          { name: 'Duplikat terbuang', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"nama": ["budi", "budi", "ani"], "umur": [20., 20., 30.]})\nassert len(bersihkan(df)) == 2' },
          { name: 'Umur kosong diisi median', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"nama": ["a", "b", "c"], "umur": [10., np.nan, 30.]})\nassert bersihkan(df)["umur"].tolist() == [10.0, 20.0, 30.0]' },
          { name: 'Baris tanpa nama dibuang', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"nama": ["a", None], "umur": [10., 20.]})\nassert len(bersihkan(df)) == 1' },
          { name: 'Nama dirapikan', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"nama": ["  budi santoso "], "umur": [20.]})\nassert bersihkan(df)["nama"].iloc[0] == "Budi Santoso"' },
          { name: 'DataFrame asli tidak berubah', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"nama": ["  budi "], "umur": [20.]})\nbersihkan(df)\nassert df["nama"].iloc[0] == "  budi "' }
        ],
        hints: ['Mulai dengan df = df.copy() supaya aslinya aman.', 'Urutan aman: drop_duplicates → fillna(median) → dropna(subset) → .str.strip().str.title()'],
        solution: 'import pandas as pd\nimport numpy as np\n\ndef bersihkan(df):\n    hasil = df.copy()\n    hasil = hasil.drop_duplicates()\n    hasil["umur"] = hasil["umur"].fillna(hasil["umur"].median())\n    hasil = hasil.dropna(subset=["nama"])\n    hasil["nama"] = hasil["nama"].str.strip().str.title()\n    return hasil.reset_index(drop=True)'
      }
    },
    {
      id: 'm7-l4',
      title: 'Groupby & Agregasi',
      duration: 24,
      objectives: ['Mengelompokkan data dan menghitung ringkasannya', 'Memakai agg dengan nama kolom sendiri', 'Membedakan agg dan transform'],
      quiz: [
        { id: 'm7-l4-q1', type: 'mcq', question: 'Pola kerja groupby adalah ...', options: ['Urutkan → saring → simpan', 'Belah → hitung → gabung', 'Salin → ubah → hapus', 'Baca → tulis → tutup'], answer: 1,
          explanation: 'Dikenal sebagai split-apply-combine.' },
        { id: 'm7-l4-q2', type: 'mcq', question: 'Beda agg dan transform adalah ...', options: ['Tidak ada', 'agg meringkas jadi sedikit baris, transform mengembalikan sepanjang data asli', 'transform lebih cepat', 'agg hanya untuk teks'], answer: 1,
          explanation: 'transform dipakai untuk membuat kolom fitur baru.' },
        { id: 'm7-l4-q3', type: 'mcq', question: 'reset_index() setelah groupby berguna untuk ...', options: ['Mengurutkan hasil', 'Mengubah hasil kembali jadi DataFrame biasa dengan kolom kunci', 'Menghapus duplikat', 'Mengganti nama kolom'], answer: 1,
          explanation: 'Tanpa itu, kolom kuncinya berada di index, bukan di kolom.' },
        { id: 'm7-l4-q4', type: 'predict_output', question: 'Ada 4 baris: Bandung 10, Jakarta 20, Bandung 30, Jakarta 40. Apa hasil groupby("kota")["jumlah"].sum() untuk Bandung?', code: 'df.groupby("kota")["jumlah"].sum()["Bandung"]', answer: '40',
          explanation: '10 + 30 = 40.' }
      ],
      coding: {
        packages: ['pandas'],
        prompt: 'Buat fungsi `ringkas_kota(df)` dari DataFrame berkolom `kota` dan `jumlah`.\n\nKembalikan DataFrame dengan kolom:\n\n- `kota`\n- `total` → jumlah seluruhnya\n- `rata` → rata-rata\n- `n` → banyaknya transaksi\n\nUrutkan dari `total` terbesar, dan pastikan `kota` jadi kolom biasa (bukan index).',
        starter_code: 'import pandas as pd\n\ndef ringkas_kota(df):\n    pass\n',
        tests: [
          { name: 'Kolomnya benar', code: 'import pandas as pd\ndf = pd.DataFrame({"kota": ["A", "B", "A"], "jumlah": [10, 50, 30]})\nassert list(ringkas_kota(df).columns) == ["kota", "total", "rata", "n"]' },
          { name: 'Total dihitung benar', code: 'import pandas as pd\ndf = pd.DataFrame({"kota": ["A", "B", "A"], "jumlah": [10, 50, 30]})\nh = ringkas_kota(df).set_index("kota")\nassert h.loc["A", "total"] == 40 and h.loc["B", "total"] == 50' },
          { name: 'Rata-rata benar', code: 'import pandas as pd\ndf = pd.DataFrame({"kota": ["A", "B", "A"], "jumlah": [10, 50, 30]})\nh = ringkas_kota(df).set_index("kota")\nassert h.loc["A", "rata"] == 20' },
          { name: 'Terurut dari total terbesar', code: 'import pandas as pd\ndf = pd.DataFrame({"kota": ["A", "B", "A"], "jumlah": [10, 50, 30]})\nassert list(ringkas_kota(df)["kota"]) == ["B", "A"]' }
        ],
        hints: ['Pakai named aggregation: .agg(total=("jumlah", "sum"), rata=("jumlah", "mean"), n=("jumlah", "count"))', 'Jangan lupa reset_index() dan sort_values("total", ascending=False).'],
        solution: 'import pandas as pd\n\ndef ringkas_kota(df):\n    hasil = df.groupby("kota").agg(\n        total=("jumlah", "sum"),\n        rata=("jumlah", "mean"),\n        n=("jumlah", "count")\n    ).reset_index()\n    return hasil.sort_values("total", ascending=False).reset_index(drop=True)'
      }
    },
    {
      id: 'm7-l5',
      title: 'Merge & Rekayasa Fitur',
      duration: 26,
      objectives: ['Menyatukan tabel dengan merge', 'Membuat fitur baru dari kolom yang ada', 'Mengubah kategori jadi angka'],
      quiz: [
        { id: 'm7-l5-q1', type: 'mcq', question: 'how="left" pada merge berarti ...', options: ['Hanya baris yang cocok di kedua tabel', 'Semua baris tabel kiri dipertahankan', 'Semua baris tabel kanan dipertahankan', 'Gabungan keduanya'], answer: 1,
          explanation: 'Yang tidak punya pasangan diisi NaN.' },
        { id: 'm7-l5-q2', type: 'mcq', question: 'Setelah merge, jumlah baris tiba-tiba membengkak. Penyebab paling mungkin ...', options: ['Salah menulis nama kolom', 'Kunci merge tidak unik sehingga baris berlipat', 'Tipe data berbeda', 'Data terlalu besar'], answer: 1,
          explanation: 'Selalu cek jumlah baris sebelum dan sesudah merge.' },
        { id: 'm7-l5-q3', type: 'mcq', question: 'Untuk kategori BERURUTAN seperti rendah/sedang/tinggi, cara terbaik adalah ...', options: ['pd.get_dummies', 'Memetakan ke angka dengan .map()', 'Menghapus kolomnya', 'Membiarkan sebagai teks'], answer: 1,
          explanation: 'One-hot menghilangkan informasi urutan, padahal urutannya bermakna.' },
        { id: 'm7-l5-q4', type: 'mcq', question: 'drop_first=True pada get_dummies berguna untuk ...', options: ['Menghemat memori dan menghindari kolom yang saling bergantung sempurna', 'Membuang baris pertama', 'Mengurutkan kategori', 'Menghapus nilai kosong'], answer: 0,
          explanation: 'Informasi kolom yang dibuang sudah bisa disimpulkan dari sisanya.' }
      ],
      coding: {
        packages: ['pandas'],
        prompt: 'Buat fungsi `gabung_dan_fitur(siswa, nilai)`:\n\n1. Gabungkan `siswa` dan `nilai` lewat kolom `id`, **pertahankan semua baris `siswa`**\n2. Isi `skor` yang kosong dengan `0`\n3. Tambah kolom `predikat`: ≥85 `"A"`, ≥70 `"B"`, selain itu `"C"`',
        starter_code: 'import pandas as pd\n\ndef gabung_dan_fitur(siswa, nilai):\n    pass\n',
        tests: [
          { name: 'Semua baris siswa dipertahankan', code: 'import pandas as pd\ns = pd.DataFrame({"id": [1, 2, 3], "nama": list("ABC")})\nn = pd.DataFrame({"id": [1, 2], "skor": [90., 60.]})\nassert len(gabung_dan_fitur(s, n)) == 3' },
          { name: 'Skor kosong jadi 0', code: 'import pandas as pd\ns = pd.DataFrame({"id": [1, 2, 3], "nama": list("ABC")})\nn = pd.DataFrame({"id": [1, 2], "skor": [90., 60.]})\nassert gabung_dan_fitur(s, n)["skor"].tolist() == [90.0, 60.0, 0.0]' },
          { name: 'Predikat benar', code: 'import pandas as pd\ns = pd.DataFrame({"id": [1, 2, 3], "nama": list("ABC")})\nn = pd.DataFrame({"id": [1, 2], "skor": [90., 60.]})\nassert gabung_dan_fitur(s, n)["predikat"].tolist() == ["A", "C", "C"]' },
          { name: 'Batas 70 dapat B', code: 'import pandas as pd\ns = pd.DataFrame({"id": [1], "nama": ["A"]})\nn = pd.DataFrame({"id": [1], "skor": [70.]})\nassert gabung_dan_fitur(s, n)["predikat"].iloc[0] == "B"' }
        ],
        hints: ['pd.merge(siswa, nilai, on="id", how="left")', 'Buat predikat lewat fungsi biasa + .apply(), atau pakai pd.cut.'],
        solution: 'import pandas as pd\n\ndef gabung_dan_fitur(siswa, nilai):\n    df = pd.merge(siswa, nilai, on="id", how="left")\n    df["skor"] = df["skor"].fillna(0)\n\n    def predikat(s):\n        if s >= 85:\n            return "A"\n        if s >= 70:\n            return "B"\n        return "C"\n\n    df["predikat"] = df["skor"].apply(predikat)\n    return df'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 7 — Pandas',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm7-x1', type: 'mcq', question: 'Perintah pertama yang sebaiknya dijalankan saat bertemu dataset baru adalah ...', options: ['df.sort_values()', 'df.info() dan df.isna().sum()', 'df.to_csv()', 'df.drop()'], answer: 1,
        explanation: 'Kenali dulu bentuk, tipe, dan lubang datanya sebelum diapa-apakan.' },
      { id: 'm7-x2', type: 'mcq', question: 'pd.concat([a, b], ignore_index=True) dipakai untuk ...', options: ['Menggabung ke samping berdasarkan kunci', 'Menumpuk data ke bawah dengan penomoran ulang', 'Menghapus kolom', 'Mengganti index jadi tanggal'], answer: 1,
        explanation: 'Merge menyatukan ke samping, concat menumpuk ke bawah.' },
      { id: 'm7-x3', type: 'true_false', question: 'Rekayasa fitur yang baik sering lebih menentukan hasil daripada memilih model yang canggih.', answer: true,
        explanation: 'Model sederhana dengan fitur bagus biasanya mengalahkan model canggih dengan fitur jelek.' },
      { id: 'm7-x4', type: 'mcq', question: 'pd.cut dipakai untuk ...', options: ['Memotong string', 'Mengubah kolom angka menjadi kategori berdasarkan rentang', 'Menghapus baris', 'Membagi data latih dan uji'], answer: 1,
        explanation: 'pd.qcut versinya yang membagi berdasarkan kuantil.' }
    ],
    coding: [
      {
        id: 'm7-e-c1',
        packages: ['pandas', 'numpy'],
        prompt: 'Buat fungsi `siapkan_data(df)` sebagai pipeline lengkap. DataFrame masuk punya kolom `umur`, `kota`, `gaji`.\n\n1. Isi `gaji` kosong dengan median\n2. Buang baris duplikat\n3. Tambah kolom `gaji_per_umur` = `gaji / umur`\n4. One-hot kolom `kota` dengan prefix `kota` (jangan pakai `drop_first`)\n5. Kembalikan DataFrame tanpa kolom `kota` aslinya',
        starter_code: 'import pandas as pd\nimport numpy as np\n\ndef siapkan_data(df):\n    pass\n',
        tests: [
          { name: 'Kolom kota asli hilang', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"umur": [20., 40.], "kota": ["A", "B"], "gaji": [100., 200.]})\nassert "kota" not in siapkan_data(df).columns' },
          { name: 'Kolom one-hot muncul', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"umur": [20., 40.], "kota": ["A", "B"], "gaji": [100., 200.]})\nk = siapkan_data(df).columns\nassert "kota_A" in k and "kota_B" in k, list(k)' },
          { name: 'gaji_per_umur benar', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"umur": [20., 40.], "kota": ["A", "B"], "gaji": [100., 200.]})\nassert siapkan_data(df)["gaji_per_umur"].tolist() == [5.0, 5.0]' },
          { name: 'Gaji kosong terisi median', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"umur": [10., 20., 30.], "kota": ["A", "B", "C"], "gaji": [100., np.nan, 300.]})\nassert siapkan_data(df)["gaji"].tolist() == [100.0, 200.0, 300.0]' },
          { name: 'Duplikat terbuang', code: 'import pandas as pd, numpy as np\ndf = pd.DataFrame({"umur": [20., 20.], "kota": ["A", "A"], "gaji": [100., 100.]})\nassert len(siapkan_data(df)) == 1' }
        ],
        hints: ['Buang duplikat sebelum membuat kolom turunan.', 'pd.get_dummies(df, columns=["kota"], prefix="kota") otomatis membuang kolom aslinya.'],
        solution: 'import pandas as pd\nimport numpy as np\n\ndef siapkan_data(df):\n    hasil = df.copy().drop_duplicates()\n    hasil["gaji"] = hasil["gaji"].fillna(hasil["gaji"].median())\n    hasil["gaji_per_umur"] = hasil["gaji"] / hasil["umur"]\n    hasil = pd.get_dummies(hasil, columns=["kota"], prefix="kota")\n    return hasil.reset_index(drop=True)'
      }
    ]
  }
};
