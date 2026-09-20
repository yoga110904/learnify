export default {
  id: 'm8',
  title: 'Matematika & Statistik untuk AI',
  icon: '📐',
  tagline: 'Vektor, matriks, statistik, Bayes, gradient descent.',
  desc: 'Matematika secukupnya — yang benar-benar dipakai model, dijelaskan lewat kode.',
  badge: { id: 'b-m8', icon: '📐', name: 'Pembaca Rumus', desc: 'Menguasai matematika dasar di balik model AI' },
  lessons: [
    {
      id: 'm8-l1',
      title: 'Vektor, Norm & Cosine Similarity',
      duration: 24,
      objectives: ['Merepresentasikan data sebagai vektor', 'Menghitung panjang dan jarak vektor', 'Mengukur kemiripan dengan cosine similarity'],
      quiz: [
        { id: 'm8-l1-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nprint(np.linalg.norm(np.array([3.0, 4.0])))', answer: '5.0',
          explanation: 'Akar dari 3² + 4² = 5 — teorema Pythagoras.' },
        { id: 'm8-l1-q2', type: 'mcq', question: 'Cosine similarity mengukur ...', options: ['Panjang vektor', 'Sudut antar vektor tanpa memperhitungkan panjangnya', 'Jumlah elemen', 'Selisih rata-rata'], answer: 1,
          explanation: 'Karena itu dokumen panjang dan pendek tetap bisa dibandingkan dengan adil.' },
        { id: 'm8-l1-q3', type: 'mcq', question: 'Cosine similarity bernilai 0 berarti ...', options: ['Sangat mirip', 'Berlawanan', 'Tegak lurus / tidak berhubungan', 'Salah satu vektor kosong'], answer: 2,
          explanation: 'Rentangnya −1 (berlawanan) sampai 1 (identik arah).' },
        { id: 'm8-l1-q4', type: 'mcq', question: 'Algoritma K-Nearest Neighbors bekerja berdasarkan ...', options: ['Jarak antar data', 'Turunan fungsi', 'Teorema Bayes', 'Perkalian matriks'], answer: 0,
          explanation: 'Cari tetangga terdekat, lalu ikuti label mayoritasnya.' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Buat fungsi `cosine_similarity(a, b)` yang mengembalikan kemiripan kosinus dua vektor.\n\nKalau salah satu vektor semuanya nol, kembalikan `0.0` (jangan sampai `NaN`).',
        starter_code: 'import numpy as np\n\ndef cosine_similarity(a, b):\n    pass\n',
        tests: [
          { name: 'Vektor searah -> 1.0', code: 'import numpy as np\nassert abs(cosine_similarity(np.array([1., 2., 3.]), np.array([2., 4., 6.])) - 1.0) < 1e-9' },
          { name: 'Vektor tegak lurus -> 0.0', code: 'import numpy as np\nassert abs(cosine_similarity(np.array([1., 0.]), np.array([0., 1.]))) < 1e-9' },
          { name: 'Vektor berlawanan -> -1.0', code: 'import numpy as np\nassert abs(cosine_similarity(np.array([1., 0.]), np.array([-1., 0.])) + 1.0) < 1e-9' },
          { name: 'Vektor nol -> 0.0 tanpa NaN', code: 'import numpy as np\nh = cosine_similarity(np.array([0., 0.]), np.array([1., 2.]))\nassert h == 0.0 and not np.isnan(h)' }
        ],
        hints: ['Rumusnya (a @ b) / (norm(a) * norm(b)).', 'Cek dulu apakah salah satu norm bernilai 0.'],
        solution: 'import numpy as np\n\ndef cosine_similarity(a, b):\n    na = np.linalg.norm(a)\n    nb = np.linalg.norm(b)\n    if na == 0 or nb == 0:\n        return 0.0\n    return float((a @ b) / (na * nb))'
      }
    },
    {
      id: 'm8-l2',
      title: 'Matriks & Transformasi Linear',
      duration: 22,
      objectives: ['Menyusun data sebagai matriks sampel × fitur', 'Memahami perkalian matriks sebagai transformasi', 'Menyelesaikan sistem persamaan linear'],
      quiz: [
        { id: 'm8-l2-q1', type: 'mcq', question: 'Konvensi penyusunan data di machine learning adalah ...', options: ['Baris = fitur, kolom = sampel', 'Baris = sampel, kolom = fitur', 'Bebas', 'Selalu 1 dimensi'], answer: 1,
          explanation: 'Semua library (scikit-learn, PyTorch) mengikuti konvensi ini.' },
        { id: 'm8-l2-q2', type: 'mcq', question: 'Untuk menyelesaikan A @ x = b, cara yang dianjurkan adalah ...', options: ['np.linalg.inv(A) @ b', 'np.linalg.solve(A, b)', 'A / b', 'np.transpose(A) @ b'], answer: 1,
          explanation: 'solve lebih cepat dan jauh lebih stabil secara numerik.' },
        { id: 'm8-l2-q3', type: 'mcq', question: 'Error "shapes not aligned" paling sering diselesaikan dengan ...', options: ['Mengganti * jadi +', 'Menambahkan .T di salah satu sisi', 'Menghapus satu baris', 'Mengubah dtype'], answer: 1,
          explanation: 'Angka tengah pada (m,n) @ (n,p) harus sama.' },
        { id: 'm8-l2-q4', type: 'true_false', question: 'Perkalian matriks dipakai GPU karena bisa dihitung sangat paralel.', answer: true,
          explanation: 'Itulah alasan GPU jadi tulang punggung deep learning.' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Buat fungsi `transformasi(X, W)` yang mengalikan matriks data dengan bobot.\n\n- Kalau bentuknya sudah cocok, kembalikan `X @ W`\n- Kalau `X.T @ W` yang cocok, kembalikan itu\n- Kalau dua-duanya tidak cocok, lempar `ValueError`',
        starter_code: 'import numpy as np\n\ndef transformasi(X, W):\n    pass\n',
        tests: [
          { name: 'Bentuk cocok langsung', code: 'import numpy as np\nX = np.ones((5, 3)); W = np.ones((3, 2))\nassert transformasi(X, W).shape == (5, 2)' },
          { name: 'Perlu transpose', code: 'import numpy as np\nX = np.ones((3, 5)); W = np.ones((3, 2))\nassert transformasi(X, W).shape == (5, 2)' },
          { name: 'Nilai perkalian benar', code: 'import numpy as np\nX = np.array([[1., 2.]]); W = np.array([[3.], [4.]])\nassert np.allclose(transformasi(X, W), [[11.]])' },
          { name: 'Tidak cocok -> ValueError', code: 'import numpy as np\nX = np.ones((5, 3)); W = np.ones((7, 2))\ntry:\n    transformasi(X, W)\n    raise AssertionError("Seharusnya ValueError")\nexcept ValueError:\n    pass' }
        ],
        hints: ['Bandingkan X.shape[1] dengan W.shape[0] dulu.', 'Kalau gagal, coba X.shape[0] == W.shape[0] lalu pakai X.T.'],
        solution: 'import numpy as np\n\ndef transformasi(X, W):\n    if X.shape[1] == W.shape[0]:\n        return X @ W\n    if X.shape[0] == W.shape[0]:\n        return X.T @ W\n    raise ValueError(f"Bentuk tidak cocok: {X.shape} dan {W.shape}")'
      }
    },
    {
      id: 'm8-l3',
      title: 'Statistik Deskriptif & Distribusi',
      duration: 24,
      objectives: ['Membedakan mean, median, dan modus', 'Mengukur sebaran dengan std dan IQR', 'Menormalisasi & menstandardisasi data'],
      quiz: [
        { id: 'm8-l3-q1', type: 'mcq', question: 'Kalau mean jauh lebih besar dari median, kemungkinan besar data ...', options: ['Terdistribusi normal', 'Punya outlier besar / miring ke kanan', 'Semua nilainya sama', 'Salah input'], answer: 1,
          explanation: 'Mean tertarik outlier, median tidak.' },
        { id: 'm8-l3-q2', type: 'mcq', question: 'Pada distribusi normal, berapa persen data berada dalam 2 standar deviasi dari mean?', options: ['50%', '68%', '95%', '99,7%'], answer: 2,
          explanation: 'Aturan 68–95–99,7.' },
        { id: 'm8-l3-q3', type: 'mcq', question: 'Standardisasi (z-score) mengubah data menjadi ...', options: ['Rentang 0–1', 'Mean 0 dan std 1', 'Bilangan bulat', 'Kategori'], answer: 1,
          explanation: 'Min-max yang mengubah ke rentang 0–1.' },
        { id: 'm8-l3-q4', type: 'true_false', question: 'Korelasi mendekati 0 pasti berarti dua variabel tidak berhubungan sama sekali.', answer: false,
          explanation: 'Korelasi hanya mengukur hubungan linear; hubungan melengkung bisa terlewat.' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Buat fungsi `deteksi_outlier(data)` yang mengembalikan array berisi nilai-nilai outlier dengan metode IQR:\n\n```\nbatas_bawah = Q1 - 1.5 * IQR\nbatas_atas  = Q3 + 1.5 * IQR\n```\n\nOutlier adalah nilai di luar kedua batas itu.',
        starter_code: 'import numpy as np\n\ndef deteksi_outlier(data):\n    pass\n',
        tests: [
          { name: 'Menemukan outlier besar', code: 'import numpy as np\nd = np.array([3., 4., 4., 5., 5., 5., 6., 50.])\nassert 50.0 in deteksi_outlier(d)' },
          { name: 'Data normal tidak punya outlier', code: 'import numpy as np\nd = np.array([10., 11., 12., 13., 14.])\nassert len(deteksi_outlier(d)) == 0' },
          { name: 'Menemukan outlier kecil', code: 'import numpy as np\nd = np.array([-100., 10., 11., 12., 13., 14.])\nassert -100.0 in deteksi_outlier(d)' },
          { name: 'Mengembalikan array NumPy', code: 'import numpy as np\nassert isinstance(deteksi_outlier(np.array([1., 2., 3.])), np.ndarray)' }
        ],
        hints: ['np.percentile(data, 25) dan np.percentile(data, 75).', 'Pakai boolean mask: data[(data < bawah) | (data > atas)]'],
        solution: 'import numpy as np\n\ndef deteksi_outlier(data):\n    q1 = np.percentile(data, 25)\n    q3 = np.percentile(data, 75)\n    iqr = q3 - q1\n    bawah = q1 - 1.5 * iqr\n    atas = q3 + 1.5 * iqr\n    return data[(data < bawah) | (data > atas)]'
      }
    },
    {
      id: 'm8-l4',
      title: 'Probabilitas & Teorema Bayes',
      duration: 24,
      objectives: ['Membaca keluaran model sebagai peluang', 'Memahami probabilitas bersyarat', 'Menerapkan teorema Bayes'],
      quiz: [
        { id: 'm8-l4-q1', type: 'mcq', question: 'P(A|B) dibaca sebagai ...', options: ['Peluang A dan B', 'Peluang A jika diketahui B terjadi', 'Peluang A atau B', 'Peluang B jika diketahui A'], answer: 1,
          explanation: 'Urutannya penting — P(A|B) tidak sama dengan P(B|A).' },
        { id: 'm8-l4-q2', type: 'mcq', question: 'Pada penyakit langka, tes dengan akurasi 90% memberi hasil positif. Peluang benar-benar sakit ...', options: ['Tetap 90%', 'Jauh lebih kecil dari 90%', 'Pasti 100%', 'Tidak bisa dihitung'], answer: 1,
          explanation: 'Karena kelompok sehat jauh lebih besar, positif palsu mendominasi.' },
        { id: 'm8-l4-q3', type: 'mcq', question: 'Naive Bayes disebut "naive" karena ...', options: ['Algoritmanya sederhana', 'Menganggap semua fitur saling independen', 'Hanya untuk data kecil', 'Tidak butuh pelatihan'], answer: 1,
          explanation: 'Asumsi itu hampir selalu salah, tapi hasilnya tetap bagus dan sangat cepat.' },
        { id: 'm8-l4-q4', type: 'mcq', question: 'Mengalikan banyak peluang kecil berisiko underflow. Solusinya ...', options: ['Membulatkan hasilnya', 'Menjumlahkan logaritmanya', 'Memakai integer', 'Mengurutkan dulu'], answer: 1,
          explanation: 'log(a*b) = log(a) + log(b), jadi perkalian jadi penjumlahan yang stabil.' }
      ],
      coding: {
        packages: [],
        prompt: 'Buat fungsi `bayes(prior, benar_positif, positif_palsu)` yang mengembalikan peluang benar-benar sakit jika hasil tes positif.\n\n- `prior` → peluang sakit di populasi\n- `benar_positif` → P(positif | sakit)\n- `positif_palsu` → P(positif | sehat)\n\nKembalikan hasilnya dibulatkan 4 angka di belakang koma.',
        starter_code: 'def bayes(prior, benar_positif, positif_palsu):\n    pass\n',
        tests: [
          { name: 'Kasus klasik penyakit langka', code: 'assert bayes(0.01, 0.9, 0.1) == 0.0833' },
          { name: 'Tes sempurna tanpa positif palsu -> 1.0', code: 'assert bayes(0.5, 1.0, 0.0) == 1.0' },
          { name: 'Prior tinggi menaikkan hasil', code: 'assert bayes(0.5, 0.9, 0.1) == 0.9' },
          { name: 'Hasilnya selalu antara 0 dan 1', code: 'h = bayes(0.2, 0.8, 0.3)\nassert 0 <= h <= 1' }
        ],
        hints: ['P(positif) = benar_positif*prior + positif_palsu*(1-prior)', 'Hasil = benar_positif * prior / P(positif), lalu round(..., 4).'],
        solution: 'def bayes(prior, benar_positif, positif_palsu):\n    p_positif = benar_positif * prior + positif_palsu * (1 - prior)\n    if p_positif == 0:\n        return 0.0\n    return round(benar_positif * prior / p_positif, 4)'
      }
    },
    {
      id: 'm8-l5',
      title: 'Turunan & Gradient Descent',
      duration: 26,
      objectives: ['Memahami turunan sebagai kemiringan', 'Menjalankan gradient descent', 'Mengenali efek learning rate'],
      quiz: [
        { id: 'm8-l5-q1', type: 'mcq', question: 'Inti pembaruan parameter pada gradient descent adalah ...', options: ['params = params + lr * gradien', 'params = params - lr * gradien', 'params = gradien / lr', 'params = params * gradien'], answer: 1,
          explanation: 'Bergerak berlawanan arah gradien untuk menuruni bukit loss.' },
        { id: 'm8-l5-q2', type: 'mcq', question: 'Loss tiba-tiba jadi NaN saat training. Tersangka pertama adalah ...', options: ['Data terlalu sedikit', 'Learning rate terlalu besar', 'Model terlalu sederhana', 'Terlalu banyak epoch'], answer: 1,
          explanation: 'Langkah kebesaran membuat nilai melompat dan meledak.' },
        { id: 'm8-l5-q3', type: 'mcq', question: 'Kalau turunan di titik x bernilai positif, untuk MENGECILKAN fungsi kita harus ...', options: ['Menaikkan x', 'Menurunkan x', 'Membiarkan x', 'Mengalikan x dengan 0'], answer: 1,
          explanation: 'Turunan positif berarti fungsi naik ke kanan, jadi bergeraklah ke kiri.' },
        { id: 'm8-l5-q4', type: 'true_false', question: 'Learning rate yang terlalu kecil membuat pelatihan lambat dan bisa berhenti sebelum sampai titik terbaik.', answer: true,
          explanation: 'Karena itu learning rate jadi hyperparameter yang paling sering disetel.' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Buat fungsi `latih_regresi(X, y, lr=0.05, epoch=500)` yang mencari `w` dan `b` untuk `y ≈ w*x + b` memakai gradient descent.\n\n- `X` array 1 dimensi\n- Kembalikan tuple `(w, b)` sebagai float\n\nGradien MSE: `dw = 2*mean(error * X)`, `db = 2*mean(error)` dengan `error = pred - y`.',
        starter_code: 'import numpy as np\n\ndef latih_regresi(X, y, lr=0.05, epoch=500):\n    pass\n',
        tests: [
          { name: 'Menemukan y = 2x + 1', code: 'import numpy as np\nX = np.array([1., 2., 3., 4.]); y = 2 * X + 1\nw, b = latih_regresi(X, y)\nassert abs(w - 2) < 0.05 and abs(b - 1) < 0.05, (w, b)' },
          { name: 'Menemukan y = -3x + 5', code: 'import numpy as np\nX = np.array([0., 1., 2., 3.]); y = -3 * X + 5\nw, b = latih_regresi(X, y, lr=0.05, epoch=2000)\nassert abs(w + 3) < 0.1 and abs(b - 5) < 0.1, (w, b)' },
          { name: 'Mengembalikan dua float', code: 'import numpy as np\nX = np.array([1., 2.]); y = np.array([1., 2.])\nw, b = latih_regresi(X, y)\nassert isinstance(w, float) and isinstance(b, float)' },
          { name: 'Tidak menghasilkan NaN', code: 'import numpy as np\nX = np.array([1., 2., 3.]); y = np.array([2., 4., 6.])\nw, b = latih_regresi(X, y)\nassert not (np.isnan(w) or np.isnan(b))' }
        ],
        hints: ['Mulai dengan w = 0.0 dan b = 0.0.', 'Di tiap epoch: pred = X*w + b, error = pred - y, lalu perbarui w dan b.'],
        solution: 'import numpy as np\n\ndef latih_regresi(X, y, lr=0.05, epoch=500):\n    w, b = 0.0, 0.0\n    for _ in range(epoch):\n        pred = X * w + b\n        error = pred - y\n        dw = 2 * (error * X).mean()\n        db = 2 * error.mean()\n        w -= lr * dw\n        b -= lr * db\n    return float(w), float(b)'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 8 — Matematika untuk AI',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm8-x1', type: 'mcq', question: 'Dot product dua vektor menghasilkan ...', options: ['Vektor baru', 'Satu angka', 'Matriks', 'Boolean'], answer: 1,
        explanation: 'Angka itu mengukur seberapa searah keduanya.' },
      { id: 'm8-x2', type: 'mcq', question: 'IQR lebih disukai dari standar deviasi untuk mendeteksi outlier karena ...', options: ['Lebih cepat', 'Lebih tahan terhadap nilai ekstrem', 'Selalu bilangan bulat', 'Hanya butuh satu nilai'], answer: 1,
        explanation: 'Std sendiri ikut membesar kalau ada outlier.' },
      { id: 'm8-x3', type: 'true_false', question: 'Korelasi tinggi membuktikan hubungan sebab-akibat.', answer: false,
        explanation: 'Korelasi hanya menunjukkan dua hal bergerak bersamaan.' },
      { id: 'm8-x4', type: 'mcq', question: 'Skala fitur yang sangat berbeda menyulitkan gradient descent karena ...', options: ['Memori habis', 'Gradiennya timpang sehingga sulit konvergen', 'Datanya jadi hilang', 'Tidak ada pengaruh'], answer: 1,
        explanation: 'Karena itu standardisasi hampir selalu jadi langkah wajib.' }
    ],
    coding: [
      {
        id: 'm8-e-c1',
        packages: ['numpy'],
        prompt: 'Buat fungsi `cari_termirip(kueri, dokumen, k=1)`.\n\n- `kueri` → vektor 1 dimensi\n- `dokumen` → matriks `(n_dokumen, n_dimensi)`\n- Kembalikan **list index** `k` dokumen dengan cosine similarity tertinggi, terurut dari paling mirip.\n\nIni inti dari pencarian semantik dan RAG.',
        starter_code: 'import numpy as np\n\ndef cari_termirip(kueri, dokumen, k=1):\n    pass\n',
        tests: [
          { name: 'Menemukan dokumen paling mirip', code: 'import numpy as np\nq = np.array([1., 0.])\nd = np.array([[0., 1.], [1., 0.1], [-1., 0.]])\nassert cari_termirip(q, d, 1) == [1]' },
          { name: 'Mengembalikan k dokumen', code: 'import numpy as np\nq = np.array([1., 0.])\nd = np.array([[0., 1.], [1., 0.1], [-1., 0.]])\nassert len(cari_termirip(q, d, 2)) == 2' },
          { name: 'Terurut dari paling mirip', code: 'import numpy as np\nq = np.array([1., 0.])\nd = np.array([[-1., 0.], [1., 0.1], [0., 1.]])\nassert cari_termirip(q, d, 3) == [1, 2, 0]' },
          { name: 'Panjang vektor tidak mempengaruhi urutan', code: 'import numpy as np\nq = np.array([1., 1.])\nd = np.array([[100., 100.], [1., -1.]])\nassert cari_termirip(q, d, 1) == [0]' }
        ],
        hints: ['Hitung cosine similarity kueri terhadap tiap baris dokumen.', 'np.argsort(-skor)[:k] memberi index terurut dari nilai terbesar.'],
        solution: 'import numpy as np\n\ndef cari_termirip(kueri, dokumen, k=1):\n    nq = np.linalg.norm(kueri)\n    nd = np.linalg.norm(dokumen, axis=1)\n    penyebut = nq * nd\n    penyebut = np.where(penyebut == 0, 1, penyebut)\n    skor = (dokumen @ kueri) / penyebut\n    return [int(i) for i in np.argsort(-skor)[:k]]'
      }
    ]
  }
};
