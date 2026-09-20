export default {
  id: 'm6',
  title: 'NumPy — Fondasi Komputasi AI',
  icon: '🔢',
  tagline: 'Array, broadcasting, agregasi, dan matriks.',
  desc: 'Semua library AI dibangun di atas NumPy. Ini bahasa dasar buat ngomong sama data.',
  badge: { id: 'b-m6', icon: '🔢', name: 'Tukang Array', desc: 'Menguasai NumPy untuk komputasi numerik' },
  lessons: [
    {
      id: 'm6-l1',
      title: 'Kenapa NumPy?',
      duration: 22,
      objectives: ['Paham kenapa array NumPy jauh lebih cepat dari list', 'Membuat array dengan berbagai cara', 'Membaca shape, ndim, dan dtype'],
      quiz: [
        { id: 'm6-l1-q1', type: 'mcq', question: 'Kenapa NumPy jauh lebih cepat dari list Python untuk operasi angka?', options: ['Karena ditulis pakai Python terbaru', 'Karena angkanya disimpan berdampingan dalam satu blok memori bertipe sama', 'Karena otomatis memakai GPU', 'Karena datanya dikompres'], answer: 1,
          explanation: 'Memori yang rapat + loop yang dijalankan di C membuatnya puluhan kali lebih cepat.' },
        { id: 'm6-l1-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nx = np.array([[1, 2, 3], [4, 5, 6]])\nprint(x.shape)', answer: '(2, 3)',
          explanation: 'shape dibaca sebagai (jumlah baris, jumlah kolom).' },
        { id: 'm6-l1-q3', type: 'mcq', question: 'np.array([1, 2, 3.5]) menghasilkan dtype ...', options: ['int64', 'float64', 'object', 'campuran'], answer: 1,
          explanation: 'Semua elemen NumPy harus satu tipe, jadi int dinaikkan jadi float.' },
        { id: 'm6-l1-q4', type: 'mcq', question: 'Array 2 dimensi (baris × kolom) biasanya disebut ...', options: ['skalar', 'vektor', 'matriks', 'tensor'], answer: 2,
          explanation: '0D skalar, 1D vektor, 2D matriks, 3D ke atas tensor.' },
        { id: 'm6-l1-q5', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nprint(np.arange(0, 10, 3))', answer: '[0 3 6 9]',
          explanation: 'arange(start, stop, step) — nilai stop tidak ikut.' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Buat fungsi `info_array(data)` yang menerima list biasa, mengubahnya jadi array NumPy bertipe `float`, lalu mengembalikan **tuple** `(array, shape, jumlah_elemen)`.',
        starter_code: 'import numpy as np\n\ndef info_array(data):\n    pass\n',
        tests: [
          { name: 'Mengembalikan tuple berisi 3 hal', code: 'h = info_array([[1, 2], [3, 4]])\nassert isinstance(h, tuple) and len(h) == 3' },
          { name: 'Array bertipe float', code: 'import numpy as np\narr, _, _ = info_array([[1, 2], [3, 4]])\nassert isinstance(arr, np.ndarray) and arr.dtype == np.float64' },
          { name: 'Shape benar', code: 'assert info_array([[1, 2, 3], [4, 5, 6]])[1] == (2, 3)' },
          { name: 'Jumlah elemen benar', code: 'assert info_array([[1, 2, 3], [4, 5, 6]])[2] == 6' }
        ],
        hints: ['np.array(data, dtype=float) langsung memaksa tipenya.', 'Ukuran total ada di atribut .size'],
        solution: 'import numpy as np\n\ndef info_array(data):\n    arr = np.array(data, dtype=float)\n    return arr, arr.shape, arr.size'
      }
    },
    {
      id: 'm6-l2',
      title: 'Indexing, Slicing & Boolean Mask',
      duration: 24,
      objectives: ['Mengakses array 2D dengan [baris, kolom]', 'Menyaring data dengan boolean mask', 'Memahami beda view dan copy'],
      quiz: [
        { id: 'm6-l2-q1', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nx = np.array([[1, 2, 3], [4, 5, 6]])\nprint(x[:, 1])', answer: '[2 5]',
          explanation: 'Tanda : berarti semua baris, angka 1 memilih kolom index 1.' },
        { id: 'm6-l2-q2', type: 'mcq', question: 'Untuk menggabungkan dua kondisi pada boolean mask, operator yang benar adalah ...', options: ['and / or', '& / |', '&& / ||', 'plus / minus'], answer: 1,
          explanation: 'and/or bekerja pada satu nilai boolean, bukan per elemen array.' },
        { id: 'm6-l2-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nx = np.array([10, 25, 5, 40])\nprint(x[x > 20])', answer: '[25 40]',
          explanation: 'Mask menyaring hanya elemen yang memenuhi kondisi.' },
        { id: 'm6-l2-q4', type: 'true_false', question: 'Hasil slicing NumPy adalah salinan baru, jadi aman diubah tanpa mempengaruhi array asli.', answer: false,
          explanation: 'Slicing menghasilkan view. Pakai .copy() kalau butuh salinan sungguhan.' },
        { id: 'm6-l2-q5', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nx = np.array([1, 5, 9])\nprint(np.where(x > 4, 1, 0))', answer: '[0 1 1]',
          explanation: 'np.where adalah if/else per elemen.' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Sebuah tabel data punya fitur di semua kolom kecuali kolom terakhir, dan label di kolom terakhir.\n\nBuat fungsi `pisah_fitur_label(data)` yang mengembalikan tuple `(X, y)` — `X` berisi semua kolom kecuali terakhir, `y` berisi kolom terakhir.',
        starter_code: 'import numpy as np\n\ndef pisah_fitur_label(data):\n    pass\n',
        tests: [
          { name: 'Bentuk X benar', code: 'import numpy as np\nd = np.array([[1., 2., 0.], [3., 4., 1.]])\nX, y = pisah_fitur_label(d)\nassert X.shape == (2, 2)' },
          { name: 'Bentuk y benar (1 dimensi)', code: 'import numpy as np\nd = np.array([[1., 2., 0.], [3., 4., 1.]])\nX, y = pisah_fitur_label(d)\nassert y.shape == (2,)' },
          { name: 'Isi X benar', code: 'import numpy as np\nd = np.array([[1., 2., 0.], [3., 4., 1.]])\nX, y = pisah_fitur_label(d)\nassert np.allclose(X, [[1, 2], [3, 4]])' },
          { name: 'Isi y benar', code: 'import numpy as np\nd = np.array([[1., 2., 0.], [3., 4., 1.]])\nX, y = pisah_fitur_label(d)\nassert np.allclose(y, [0, 1])' }
        ],
        hints: ['Semua kolom kecuali terakhir: data[:, :-1]', 'Kolom terakhir saja: data[:, -1]'],
        solution: 'import numpy as np\n\ndef pisah_fitur_label(data):\n    return data[:, :-1], data[:, -1]'
      }
    },
    {
      id: 'm6-l3',
      title: 'Broadcasting & Operasi Vektor',
      duration: 24,
      objectives: ['Menghitung tanpa loop lewat vektorisasi', 'Memahami aturan broadcasting', 'Menstandardisasi data'],
      quiz: [
        { id: 'm6-l3-q1', type: 'mcq', question: 'Untuk dua array NumPy, operator * melakukan ...', options: ['Perkalian matriks', 'Perkalian per elemen', 'Penggabungan array', 'Error'], answer: 1,
          explanation: 'Perkalian matriks memakai @ atau np.dot.' },
        { id: 'm6-l3-q2', type: 'mcq', question: 'Broadcasting membandingkan shape mulai dari ...', options: ['Kiri ke kanan', 'Kanan ke kiri', 'Dimensi terbesar', 'Urutan acak'], answer: 1,
          explanation: 'Dua dimensi cocok kalau angkanya sama atau salah satunya 1.' },
        { id: 'm6-l3-q3', type: 'mcq', question: 'Array shape (3, 4) dijumlahkan dengan shape (3,) akan ...', options: ['Berhasil', 'Error broadcasting', 'Menghasilkan (3, 3)', 'Menghasilkan skalar'], answer: 1,
          explanation: 'Dari kanan: 4 vs 3 tidak cocok. Perlu reshape jadi (3, 1) dulu.' },
        { id: 'm6-l3-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nx = np.array([1, 2, 3])\nprint(x * 2 + 1)', answer: '[3 5 7]',
          explanation: 'Operasi berlaku ke seluruh elemen sekaligus.' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Buat fungsi `standardisasi(data)` yang mengubah tiap **kolom** supaya punya rata-rata 0 dan standar deviasi 1:\n\n```\nhasil = (data - rata_kolom) / std_kolom\n```\n\nKalau ada kolom yang std-nya 0, biarkan kolom itu jadi 0 (jangan sampai muncul `NaN`).',
        starter_code: 'import numpy as np\n\ndef standardisasi(data):\n    pass\n',
        tests: [
          { name: 'Rata-rata tiap kolom jadi 0', code: 'import numpy as np\nd = np.array([[1., 100.], [2., 200.], [3., 300.]])\nassert np.allclose(standardisasi(d).mean(axis=0), 0, atol=1e-9)' },
          { name: 'Std tiap kolom jadi 1', code: 'import numpy as np\nd = np.array([[1., 100.], [2., 200.], [3., 300.]])\nassert np.allclose(standardisasi(d).std(axis=0), 1, atol=1e-9)' },
          { name: 'Bentuk tidak berubah', code: 'import numpy as np\nd = np.array([[1., 100.], [2., 200.], [3., 300.]])\nassert standardisasi(d).shape == (3, 2)' },
          { name: 'Kolom konstan tidak menghasilkan NaN', code: 'import numpy as np\nd = np.array([[5., 1.], [5., 2.], [5., 3.]])\nh = standardisasi(d)\nassert not np.isnan(h).any(), h' }
        ],
        hints: ['data.mean(axis=0) memberi rata-rata tiap kolom.', 'Ganti std yang 0 jadi 1 sebelum membagi: std[std == 0] = 1'],
        solution: 'import numpy as np\n\ndef standardisasi(data):\n    rata = data.mean(axis=0)\n    std = data.std(axis=0)\n    std = np.where(std == 0, 1, std)\n    return (data - rata) / std'
      }
    },
    {
      id: 'm6-l4',
      title: 'Agregasi & Axis',
      duration: 22,
      objectives: ['Meringkas array dengan sum/mean/std', 'Memakai axis dengan benar', 'Menghitung akurasi dari array boolean'],
      quiz: [
        { id: 'm6-l4-q1', type: 'mcq', question: 'Pada array 2D, x.sum(axis=0) menghasilkan ...', options: ['Satu nilai per baris', 'Satu nilai per kolom', 'Satu angka saja', 'Array dengan bentuk sama'], answer: 1,
          explanation: 'axis adalah dimensi yang dilenyapkan; axis=0 melenyapkan baris, sisa kolom.' },
        { id: 'm6-l4-q2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nx = np.array([[1, 2, 3], [4, 5, 6]])\nprint(x.sum(axis=1))', answer: '[ 6 15]',
          explanation: 'axis=1 menjumlah ke samping, satu nilai per baris.' },
        { id: 'm6-l4-q3', type: 'mcq', question: 'Beda max dan argmax adalah ...', options: ['Tidak ada', 'max memberi nilai, argmax memberi index', 'argmax hanya untuk float', 'max hanya untuk 1 dimensi'], answer: 1,
          explanation: 'argmax dipakai model klasifikasi untuk memilih kelas dengan peluang tertinggi.' },
        { id: 'm6-l4-q4', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nprediksi = np.array([1, 0, 1, 1])\nlabel = np.array([1, 0, 0, 1])\nprint((prediksi == label).mean())', answer: '0.75',
          explanation: 'True dihitung 1, jadi mean-nya langsung menjadi akurasi.' },
        { id: 'm6-l4-q5', type: 'mcq', question: 'keepdims=True dipakai supaya ...', options: ['Hasilnya lebih cepat', 'Dimensi tetap terjaga agar bisa di-broadcast kembali', 'Nilai NaN diabaikan', 'Array jadi read-only'], answer: 1,
          explanation: 'Dipakai misalnya saat membagi tiap baris dengan totalnya (softmax).' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Buat fungsi `ringkas(data)` yang mengembalikan **dict**:\n\n```python\n{\n  "rata_kolom": array rata-rata tiap kolom,\n  "rata_baris": array rata-rata tiap baris,\n  "total": jumlah seluruh elemen (float),\n  "kolom_terbesar": index kolom dengan total terbesar\n}\n```',
        starter_code: 'import numpy as np\n\ndef ringkas(data):\n    pass\n',
        tests: [
          { name: 'Rata-rata kolom benar', code: 'import numpy as np\nd = np.array([[1., 2.], [3., 4.]])\nassert np.allclose(ringkas(d)["rata_kolom"], [2., 3.])' },
          { name: 'Rata-rata baris benar', code: 'import numpy as np\nd = np.array([[1., 2.], [3., 4.]])\nassert np.allclose(ringkas(d)["rata_baris"], [1.5, 3.5])' },
          { name: 'Total benar', code: 'import numpy as np\nd = np.array([[1., 2.], [3., 4.]])\nassert abs(ringkas(d)["total"] - 10.0) < 1e-9' },
          { name: 'Kolom terbesar benar', code: 'import numpy as np\nd = np.array([[1., 9.], [3., 9.]])\nassert int(ringkas(d)["kolom_terbesar"]) == 1' }
        ],
        hints: ['axis=0 untuk per kolom, axis=1 untuk per baris.', 'Total kolom dulu (sum(axis=0)), baru cari argmax-nya.'],
        solution: 'import numpy as np\n\ndef ringkas(data):\n    return {\n        "rata_kolom": data.mean(axis=0),\n        "rata_baris": data.mean(axis=1),\n        "total": float(data.sum()),\n        "kolom_terbesar": int(data.sum(axis=0).argmax())\n    }'
      }
    },
    {
      id: 'm6-l5',
      title: 'Reshape & Operasi Matriks',
      duration: 24,
      objectives: ['Mengubah bentuk array dengan reshape', 'Membedakan * dan @', 'Memahami aturan bentuk perkalian matriks'],
      quiz: [
        { id: 'm6-l5-q1', type: 'mcq', question: 'Pada reshape, angka -1 berarti ...', options: ['Dimensi dibalik', 'Ukurannya dihitung otomatis', 'Array dikosongkan', 'Error'], answer: 1,
          explanation: 'reshape(-1, 1) mengubah apa pun menjadi satu kolom.' },
        { id: 'm6-l5-q2', type: 'mcq', question: 'Hasil perkalian matriks (100, 4) @ (4, 3) berbentuk ...', options: ['(100, 3)', '(4, 4)', '(100, 4)', 'Error'], answer: 0,
          explanation: 'Angka tengah harus sama dan justru lenyap: (m,n) @ (n,p) -> (m,p).' },
        { id: 'm6-l5-q3', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(a @ b)', answer: '32',
          explanation: 'Dot product: 1*4 + 2*5 + 3*6 = 32.' },
        { id: 'm6-l5-q4', type: 'true_false', question: 'x.T menukar baris dan kolom sebuah matriks.', answer: true,
          explanation: 'Sering dipakai supaya angka tengah perkalian matriks jadi cocok.' }
      ],
      coding: {
        packages: ['numpy'],
        prompt: 'Buat fungsi `lapisan(X, W, b)` yang menghitung satu lapis jaringan saraf:\n\n```\nkeluaran = X @ W + b\n```\n\n- `X` bentuknya `(n_sampel, n_fitur)`\n- `W` bentuknya `(n_fitur, n_neuron)`\n- `b` bentuknya `(n_neuron,)`\n\nKalau bentuk `X` dan `W` tidak cocok, lempar `ValueError`.',
        starter_code: 'import numpy as np\n\ndef lapisan(X, W, b):\n    pass\n',
        tests: [
          { name: 'Bentuk keluaran benar', code: 'import numpy as np\nX = np.ones((10, 4)); W = np.ones((4, 3)); b = np.zeros(3)\nassert lapisan(X, W, b).shape == (10, 3)' },
          { name: 'Nilai keluaran benar', code: 'import numpy as np\nX = np.array([[1., 2.]]); W = np.array([[1., 0.], [0., 1.]]); b = np.array([10., 20.])\nassert np.allclose(lapisan(X, W, b), [[11., 22.]])' },
          { name: 'Bias ikut di-broadcast ke semua baris', code: 'import numpy as np\nX = np.zeros((3, 2)); W = np.zeros((2, 2)); b = np.array([1., 2.])\nassert np.allclose(lapisan(X, W, b), [[1., 2.], [1., 2.], [1., 2.]])' },
          { name: 'Bentuk tidak cocok -> ValueError', code: 'import numpy as np\nX = np.ones((10, 4)); W = np.ones((5, 3)); b = np.zeros(3)\ntry:\n    lapisan(X, W, b)\n    raise AssertionError("Seharusnya ValueError")\nexcept ValueError:\n    pass' }
        ],
        hints: ['Cek dulu X.shape[1] == W.shape[0], kalau tidak raise ValueError.', 'Operator perkalian matriks adalah @, bukan *.'],
        solution: 'import numpy as np\n\ndef lapisan(X, W, b):\n    if X.shape[1] != W.shape[0]:\n        raise ValueError(f"Bentuk tidak cocok: {X.shape} @ {W.shape}")\n    return X @ W + b'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 6 — NumPy',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm6-x1', type: 'mcq', question: 'Atribut apa yang pertama kali dicek saat kode NumPy error?', options: ['dtype', 'shape', 'size', 'ndim'], answer: 1,
        explanation: 'Mayoritas bug NumPy berasal dari bentuk array yang tidak cocok.' },
      { id: 'm6-x2', type: 'predict_output', question: 'Apa output kode berikut?', code: 'import numpy as np\nx = np.arange(6).reshape(2, 3)\nprint(x.T.shape)', answer: '(3, 2)',
        explanation: 'Transpose menukar baris dan kolom.' },
      { id: 'm6-x3', type: 'mcq', question: 'np.nanmean dipakai untuk ...', options: ['Menghitung rata-rata sambil mengabaikan NaN', 'Mengubah NaN jadi 0', 'Menghapus baris berisi NaN', 'Mendeteksi NaN'], answer: 0,
        explanation: 'mean biasa akan menghasilkan NaN kalau ada satu saja nilai kosong.' },
      { id: 'm6-x4', type: 'true_false', question: 'Menulis loop for di atas array NumPy biasanya tanda ada cara yang lebih baik.', answer: true,
        explanation: 'Operasi vektorisasi jauh lebih cepat dan lebih ringkas.' }
    ],
    coding: [
      {
        id: 'm6-e-c1',
        packages: ['numpy'],
        prompt: 'Buat fungsi `normalisasi_minmax(data)` yang menskalakan tiap **kolom** ke rentang 0–1:\n\n```\nhasil = (data - min_kolom) / (max_kolom - min_kolom)\n```\n\nKolom yang semua isinya sama harus menghasilkan 0, bukan `NaN`.',
        starter_code: 'import numpy as np\n\ndef normalisasi_minmax(data):\n    pass\n',
        tests: [
          { name: 'Nilai minimum jadi 0', code: 'import numpy as np\nd = np.array([[1., 10.], [2., 20.], [3., 30.]])\nassert np.allclose(normalisasi_minmax(d).min(axis=0), 0)' },
          { name: 'Nilai maksimum jadi 1', code: 'import numpy as np\nd = np.array([[1., 10.], [2., 20.], [3., 30.]])\nassert np.allclose(normalisasi_minmax(d).max(axis=0), 1)' },
          { name: 'Nilai tengah benar', code: 'import numpy as np\nd = np.array([[0.], [5.], [10.]])\nassert np.allclose(normalisasi_minmax(d).ravel(), [0., 0.5, 1.])' },
          { name: 'Kolom konstan tidak NaN', code: 'import numpy as np\nd = np.array([[7., 1.], [7., 2.]])\nassert not np.isnan(normalisasi_minmax(d)).any()' }
        ],
        hints: ['Hitung rentang = max - min per kolom.', 'Ganti rentang yang 0 jadi 1 sebelum membagi.'],
        solution: 'import numpy as np\n\ndef normalisasi_minmax(data):\n    mn = data.min(axis=0)\n    rentang = data.max(axis=0) - mn\n    rentang = np.where(rentang == 0, 1, rentang)\n    return (data - mn) / rentang'
      },
      {
        id: 'm6-e-c2',
        packages: ['numpy'],
        prompt: 'Buat fungsi `one_hot(label, n_kelas)` yang mengubah array label bilangan bulat menjadi matriks one-hot.\n\nContoh: `one_hot([0, 2, 1], 3)` →\n```\n[[1, 0, 0],\n [0, 0, 1],\n [0, 1, 0]]\n```',
        starter_code: 'import numpy as np\n\ndef one_hot(label, n_kelas):\n    pass\n',
        tests: [
          { name: 'Bentuk hasil benar', code: 'import numpy as np\nassert one_hot(np.array([0, 2, 1]), 3).shape == (3, 3)' },
          { name: 'Isi benar', code: 'import numpy as np\nassert np.allclose(one_hot(np.array([0, 2, 1]), 3), [[1,0,0],[0,0,1],[0,1,0]])' },
          { name: 'Tiap baris jumlahnya 1', code: 'import numpy as np\nassert np.allclose(one_hot(np.array([1, 1, 0]), 2).sum(axis=1), 1)' },
          { name: 'Jumlah kelas boleh lebih banyak dari label yang muncul', code: 'import numpy as np\nassert one_hot(np.array([0, 1]), 5).shape == (2, 5)' }
        ],
        hints: ['Buat matriks nol berukuran (len(label), n_kelas) dulu.', 'np.eye(n_kelas)[label] adalah cara satu baris.'],
        solution: 'import numpy as np\n\ndef one_hot(label, n_kelas):\n    return np.eye(n_kelas)[np.asarray(label).astype(int)]'
      }
    ]
  }
};
