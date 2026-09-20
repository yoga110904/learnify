const SK = ['scikit-learn', 'numpy'];

export default {
  id: 'm9',
  title: 'Machine Learning Dasar',
  icon: '🤖',
  tagline: 'scikit-learn: regresi, klasifikasi, evaluasi, pipeline.',
  desc: 'Melatih model sungguhan — dari data mentah sampai skor yang bisa dipercaya.',
  badge: { id: 'b-m9', icon: '🤖', name: 'Pelatih Model', desc: 'Bisa melatih & mengevaluasi model ML' },
  lessons: [
    {
      id: 'm9-l1',
      title: 'Apa itu Machine Learning?',
      duration: 22,
      objectives: ['Membedakan program biasa dan machine learning', 'Mengenal supervised, unsupervised, reinforcement', 'Memahami pola fit/predict/score'],
      quiz: [
        { id: 'm9-l1-q1', type: 'mcq', question: 'Perbedaan inti machine learning dengan program biasa adalah ...', options: ['ML selalu lebih cepat', 'ML menemukan aturan dari data + jawaban, bukan aturan ditulis manusia', 'ML tidak butuh data', 'ML hanya jalan di GPU'], answer: 1,
          explanation: 'Program biasa: data + aturan → jawaban. ML: data + jawaban → aturan.' },
        { id: 'm9-l1-q2', type: 'mcq', question: 'Memprediksi harga rumah termasuk ...', options: ['Klasifikasi', 'Regresi', 'Clustering', 'Reinforcement learning'], answer: 1,
          explanation: 'Jawabannya berupa angka kontinu, bukan kategori.' },
        { id: 'm9-l1-q3', type: 'mcq', question: 'Mengelompokkan pelanggan mirip tanpa label termasuk ...', options: ['Supervised', 'Unsupervised (clustering)', 'Regresi', 'Klasifikasi'], answer: 1,
          explanation: 'Tidak ada jawaban yang diberikan; model mencari struktur sendiri.' },
        { id: 'm9-l1-q4', type: 'mcq', question: 'Urutan pola scikit-learn yang benar adalah ...', options: ['predict → fit → score', 'fit → predict → score', 'score → fit → predict', 'fit → score → transform'], answer: 1,
          explanation: 'Pola ini identik untuk semua model scikit-learn.' },
        { id: 'm9-l1-q5', type: 'true_false', question: 'Huruf besar X dipakai untuk fitur karena bentuknya matriks, huruf kecil y untuk label karena vektor.', answer: true,
          explanation: 'Konvensi ini dipakai hampir di semua kode ML.' }
      ],
      coding: {
        packages: SK,
        prompt: 'Buat fungsi `latih_dan_nilai(X, y)` yang melatih `LinearRegression` pada data yang diberikan, lalu mengembalikan tuple `(model, skor)` dengan `skor` berupa R² pada data itu sendiri (dibulatkan 3 angka).',
        starter_code: 'from sklearn.linear_model import LinearRegression\n\ndef latih_dan_nilai(X, y):\n    pass\n',
        tests: [
          { name: 'Mengembalikan model yang sudah dilatih', code: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\nX = np.array([[1.], [2.], [3.]]); y = np.array([2., 4., 6.])\nm, s = latih_dan_nilai(X, y)\nassert isinstance(m, LinearRegression) and hasattr(m, "coef_")' },
          { name: 'Data linear sempurna -> R² = 1.0', code: 'import numpy as np\nX = np.array([[1.], [2.], [3.]]); y = np.array([2., 4., 6.])\nassert latih_dan_nilai(X, y)[1] == 1.0' },
          { name: 'Model bisa memprediksi', code: 'import numpy as np\nX = np.array([[1.], [2.], [3.]]); y = np.array([2., 4., 6.])\nm, _ = latih_dan_nilai(X, y)\nassert abs(float(m.predict([[4.]])[0]) - 8.0) < 0.01' },
          { name: 'Skor dibulatkan 3 angka', code: 'import numpy as np\nX = np.array([[1.], [2.], [3.], [4.]]); y = np.array([2., 4.2, 5.9, 8.1])\ns = latih_dan_nilai(X, y)[1]\nassert round(s, 3) == s' }
        ],
        hints: ['model = LinearRegression(); model.fit(X, y)', 'Skor R² langsung tersedia lewat model.score(X, y).'],
        solution: 'from sklearn.linear_model import LinearRegression\n\ndef latih_dan_nilai(X, y):\n    model = LinearRegression()\n    model.fit(X, y)\n    return model, round(model.score(X, y), 3)'
      }
    },
    {
      id: 'm9-l2',
      title: 'Regresi Linear',
      duration: 26,
      objectives: ['Melatih model regresi dan membaca koefisiennya', 'Menghitung RMSE dan R²', 'Tahu kapan regresi linear tidak cocok'],
      quiz: [
        { id: 'm9-l2-q1', type: 'mcq', question: 'Kenapa X harus 2 dimensi di scikit-learn?', options: ['Supaya lebih cepat', 'Karena formatnya selalu (n_sampel, n_fitur)', 'Karena y juga 2 dimensi', 'Supaya bisa disimpan'], answer: 1,
          explanation: 'Untuk satu fitur, pakai reshape(-1, 1).' },
        { id: 'm9-l2-q2', type: 'mcq', question: 'R² bernilai negatif berarti ...', options: ['Perhitungan error', 'Model lebih buruk daripada sekadar menebak rata-rata', 'Model sempurna', 'Data terlalu sedikit'], answer: 1,
          explanation: 'R² = 0 setara menebak rata-rata; di bawah itu lebih buruk lagi.' },
        { id: 'm9-l2-q3', type: 'mcq', question: 'Kelebihan RMSE dibanding MSE adalah ...', options: ['Lebih cepat dihitung', 'Satuannya kembali ke satuan asli sehingga mudah dipahami', 'Tidak terpengaruh outlier', 'Selalu lebih kecil'], answer: 1,
          explanation: 'MSE satuannya kuadrat, sulit diceritakan ke orang lain.' },
        { id: 'm9-l2-q4', type: 'mcq', question: 'Lasso berbeda dari Ridge karena bisa ...', options: ['Membuat sebagian koefisien jadi nol (seleksi fitur)', 'Menangani data kategori', 'Bekerja tanpa pelatihan', 'Menambah fitur baru'], answer: 0,
          explanation: 'Ridge mengecilkan semua koefisien tapi jarang sampai nol.' }
      ],
      coding: {
        packages: SK,
        prompt: 'Buat fungsi `evaluasi_regresi(y_asli, y_pred)` yang mengembalikan dict:\n\n```python\n{"mae": ..., "rmse": ..., "r2": ...}\n```\n\nSemua nilainya dibulatkan 3 angka di belakang koma.',
        starter_code: 'import numpy as np\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\n\ndef evaluasi_regresi(y_asli, y_pred):\n    pass\n',
        tests: [
          { name: 'Prediksi sempurna', code: 'import numpy as np\ny = np.array([1., 2., 3.])\nh = evaluasi_regresi(y, y)\nassert h["mae"] == 0.0 and h["rmse"] == 0.0 and h["r2"] == 1.0' },
          { name: 'MAE dihitung benar', code: 'import numpy as np\nh = evaluasi_regresi(np.array([1., 2.]), np.array([2., 4.]))\nassert h["mae"] == 1.5' },
          { name: 'RMSE dihitung benar', code: 'import numpy as np\nh = evaluasi_regresi(np.array([0., 0.]), np.array([3., 4.]))\nassert h["rmse"] == 3.536, h["rmse"]' },
          { name: 'Punya tiga kunci', code: 'import numpy as np\nh = evaluasi_regresi(np.array([1., 2.]), np.array([1., 2.]))\nassert set(h.keys()) == {"mae", "rmse", "r2"}' }
        ],
        hints: ['RMSE = akar dari mean_squared_error.', 'Bungkus semuanya dengan round(..., 3).'],
        solution: 'import numpy as np\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\n\ndef evaluasi_regresi(y_asli, y_pred):\n    mse = mean_squared_error(y_asli, y_pred)\n    return {\n        "mae": round(float(mean_absolute_error(y_asli, y_pred)), 3),\n        "rmse": round(float(np.sqrt(mse)), 3),\n        "r2": round(float(r2_score(y_asli, y_pred)), 3)\n    }'
      }
    },
    {
      id: 'm9-l3',
      title: 'Klasifikasi',
      duration: 26,
      objectives: ['Melatih Logistic Regression dan Decision Tree', 'Memakai predict_proba dan menggeser ambang batas', 'Memilih model yang sesuai'],
      quiz: [
        { id: 'm9-l3-q1', type: 'mcq', question: 'Logistic Regression sebenarnya adalah algoritma ...', options: ['Regresi', 'Klasifikasi', 'Clustering', 'Reduksi dimensi'], answer: 1,
          explanation: 'Namanya menipu — keluarannya peluang kelas, bukan angka kontinu.' },
        { id: 'm9-l3-q2', type: 'mcq', question: 'Fungsi sigmoid dipakai untuk ...', options: ['Mempercepat pelatihan', 'Memeras nilai apa pun ke rentang 0–1', 'Menghapus outlier', 'Menambah fitur'], answer: 1,
          explanation: 'Sehingga hasilnya bisa dibaca sebagai peluang.' },
        { id: 'm9-l3-q3', type: 'mcq', question: 'Decision tree tanpa max_depth cenderung ...', options: ['Underfitting', 'Overfitting / menghafal data latih', 'Error', 'Lebih cepat'], answer: 1,
          explanation: 'Pohon akan tumbuh sampai tiap daun berisi satu sampel.' },
        { id: 'm9-l3-q4', type: 'mcq', question: 'Model yang WAJIB disamakan skala fiturnya adalah ...', options: ['Decision Tree', 'Random Forest', 'KNN', 'Semua tidak perlu'], answer: 2,
          explanation: 'KNN berbasis jarak, jadi fitur berskala besar akan mendominasi.' },
        { id: 'm9-l3-q5', type: 'mcq', question: 'predict_proba lebih berguna dari predict karena ...', options: ['Lebih cepat', 'Menunjukkan tingkat keyakinan, bukan cuma jawaban', 'Selalu lebih akurat', 'Tidak butuh pelatihan'], answer: 1,
          explanation: 'Keyakinan 0,51 dan 0,99 sangat berbeda artinya walau prediksinya sama.' }
      ],
      coding: {
        packages: SK,
        prompt: 'Buat fungsi `prediksi_dengan_ambang(model, X, ambang=0.5)` yang memakai `predict_proba` untuk menghasilkan prediksi kelas 0/1 berdasarkan ambang batas yang ditentukan.\n\nKembalikan array NumPy bertipe `int`.',
        starter_code: 'import numpy as np\n\ndef prediksi_dengan_ambang(model, X, ambang=0.5):\n    pass\n',
        setup: 'import numpy as np\nfrom sklearn.linear_model import LogisticRegression\n\n_X = np.array([[1.], [2.], [3.], [6.], [7.], [8.]])\n_y = np.array([0, 0, 0, 1, 1, 1])\nMODEL = LogisticRegression().fit(_X, _y)\n',
        tests: [
          { name: 'Ambang default memisahkan dua kelompok', code: 'import numpy as np\nh = prediksi_dengan_ambang(MODEL, np.array([[1.], [8.]]))\nassert h.tolist() == [0, 1]' },
          { name: 'Mengembalikan array bertipe int', code: 'import numpy as np\nh = prediksi_dengan_ambang(MODEL, np.array([[1.], [8.]]))\nassert isinstance(h, np.ndarray) and h.dtype.kind == "i"' },
          { name: 'Ambang rendah lebih mudah jadi kelas 1', code: 'import numpy as np\nX = np.array([[4.5]])\nrendah = prediksi_dengan_ambang(MODEL, X, 0.01).sum()\ntinggi = prediksi_dengan_ambang(MODEL, X, 0.99).sum()\nassert rendah >= tinggi' },
          { name: 'Ambang 0.99 sangat ketat', code: 'import numpy as np\nh = prediksi_dengan_ambang(MODEL, np.array([[4.0]]), 0.99)\nassert h.tolist() == [0]' }
        ],
        hints: ['Peluang kelas 1 ada di model.predict_proba(X)[:, 1].', 'Bandingkan dengan ambang lalu .astype(int).'],
        solution: 'import numpy as np\n\ndef prediksi_dengan_ambang(model, X, ambang=0.5):\n    peluang = model.predict_proba(X)[:, 1]\n    return (peluang >= ambang).astype(int)'
      }
    },
    {
      id: 'm9-l4',
      title: 'Train/Test Split & Overfitting',
      duration: 26,
      objectives: ['Memisahkan data latih dan uji dengan benar', 'Mengenali overfitting dan underfitting', 'Memakai cross-validation'],
      quiz: [
        { id: 'm9-l4-q1', type: 'mcq', question: 'Skor latih 0,99 tapi skor uji 0,62 menandakan ...', options: ['Underfitting', 'Overfitting', 'Model sempurna', 'Data bocor'], answer: 1,
          explanation: 'Model menghafal data latih, bukan mempelajari polanya.' },
        { id: 'm9-l4-q2', type: 'mcq', question: 'stratify=y pada train_test_split berguna untuk ...', options: ['Mengurutkan data', 'Menjaga proporsi tiap kelas tetap sama di data latih & uji', 'Mempercepat pembagian', 'Menghapus outlier'], answer: 1,
          explanation: 'Wajib untuk data yang kelasnya timpang.' },
        { id: 'm9-l4-q3', type: 'mcq', question: 'Data leakage terjadi kalau ...', options: ['Data hilang saat dibaca', 'Informasi dari data uji ikut dipakai saat melatih', 'File datanya bocor ke publik', 'Model terlalu besar'], answer: 1,
          explanation: 'Contoh klasik: menjalankan scaler pada seluruh data sebelum split.' },
        { id: 'm9-l4-q4', type: 'mcq', question: 'Kelebihan cross-validation dibanding satu kali split adalah ...', options: ['Lebih cepat', 'Estimasi lebih stabil plus terlihat sebaran skornya', 'Tidak butuh data uji', 'Menghindari overfitting otomatis'], answer: 1,
          explanation: 'Standar deviasi skor menunjukkan seberapa stabil modelmu.' },
        { id: 'm9-l4-q5', type: 'true_false', question: 'Scaler boleh di-fit pada data uji supaya hasilnya lebih pas.', answer: false,
          explanation: 'Itu data leakage. Data uji hanya boleh di-transform.' }
      ],
      coding: {
        packages: SK,
        prompt: 'Buat fungsi `bandingkan(model, X, y)` yang:\n\n1. Membagi data 80/20 dengan `random_state=42`\n2. Melatih model pada data latih\n3. Mengembalikan dict `{"latih": skor_latih, "uji": skor_uji, "overfit": bool}`\n\n`overfit` bernilai `True` kalau selisih skor latih dan uji lebih dari `0.2`. Skor dibulatkan 3 angka.',
        starter_code: 'from sklearn.model_selection import train_test_split\n\ndef bandingkan(model, X, y):\n    pass\n',
        tests: [
          { name: 'Mengembalikan tiga kunci', code: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\nX = np.arange(40, dtype=float).reshape(-1, 1); y = (2 * X.ravel() + 1)\nh = bandingkan(LinearRegression(), X, y)\nassert set(h.keys()) == {"latih", "uji", "overfit"}' },
          { name: 'Data linear rapi -> tidak overfit', code: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\nX = np.arange(40, dtype=float).reshape(-1, 1); y = (2 * X.ravel() + 1)\nh = bandingkan(LinearRegression(), X, y)\nassert h["overfit"] is False and h["uji"] > 0.99' },
          { name: 'Skor dibulatkan 3 angka', code: 'import numpy as np\nfrom sklearn.linear_model import LinearRegression\nX = np.arange(40, dtype=float).reshape(-1, 1); y = (2 * X.ravel() + 1)\nh = bandingkan(LinearRegression(), X, y)\nassert round(h["latih"], 3) == h["latih"]' },
          { name: 'Pohon tanpa batas pada data acak -> overfit', code: 'import numpy as np\nfrom sklearn.tree import DecisionTreeRegressor\nrng = np.random.default_rng(0)\nX = rng.random((60, 5)); y = rng.random(60)\nh = bandingkan(DecisionTreeRegressor(random_state=0), X, y)\nassert h["overfit"] is True, h' }
        ],
        hints: ['train_test_split(X, y, test_size=0.2, random_state=42)', 'overfit = (skor_latih - skor_uji) > 0.2'],
        solution: 'from sklearn.model_selection import train_test_split\n\ndef bandingkan(model, X, y):\n    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)\n    model.fit(X_tr, y_tr)\n    latih = round(float(model.score(X_tr, y_tr)), 3)\n    uji = round(float(model.score(X_te, y_te)), 3)\n    return {"latih": latih, "uji": uji, "overfit": bool((latih - uji) > 0.2)}'
      }
    },
    {
      id: 'm9-l5',
      title: 'Evaluasi Model',
      duration: 26,
      objectives: ['Membaca confusion matrix', 'Membedakan precision dan recall', 'Memilih metrik sesuai risikonya'],
      quiz: [
        { id: 'm9-l5-q1', type: 'mcq', question: 'Dari 1000 transaksi, 10 penipuan. Model yang selalu menjawab "bukan penipuan" punya akurasi ...', options: ['0%', '50%', '99%', 'Tidak bisa dihitung'], answer: 2,
          explanation: 'Dan tetap tidak berguna — inilah kenapa akurasi menyesatkan pada data timpang.' },
        { id: 'm9-l5-q2', type: 'mcq', question: 'Recall menjawab pertanyaan ...', options: ['Seberapa bisa dipercaya alarmnya?', 'Berapa banyak kasus positif yang berhasil tertangkap?', 'Berapa total datanya?', 'Seberapa cepat modelnya?'], answer: 1,
          explanation: 'Precision yang menjawab seberapa bisa dipercaya alarmnya.' },
        { id: 'm9-l5-q3', type: 'mcq', question: 'Untuk deteksi kanker, metrik yang paling diutamakan adalah ...', options: ['Precision', 'Recall', 'Akurasi', 'Kecepatan'], answer: 1,
          explanation: 'Melewatkan pasien yang benar-benar sakit jauh lebih fatal daripada alarm palsu.' },
        { id: 'm9-l5-q4', type: 'mcq', question: 'ROC-AUC bernilai 0,5 berarti ...', options: ['Model sempurna', 'Model setara menebak acak', 'Model terbalik', 'Data terlalu kecil'], answer: 1,
          explanation: 'Semakin mendekati 1 semakin baik pemisahannya.' },
        { id: 'm9-l5-q5', type: 'mcq', question: 'class_weight="balanced" dipakai untuk ...', options: ['Mempercepat pelatihan', 'Memberi bobot lebih pada kelas minoritas', 'Menyamakan skala fitur', 'Menghapus duplikat'], answer: 1,
          explanation: 'Satu parameter sederhana yang sering sudah cukup untuk data timpang.' }
      ],
      coding: {
        packages: SK,
        prompt: 'Buat fungsi `laporan(y_asli, y_pred)` yang mengembalikan dict:\n\n```python\n{"akurasi": ..., "precision": ..., "recall": ..., "f1": ..., "tp": ..., "fp": ..., "fn": ..., "tn": ...}\n```\n\nSemua metrik dibulatkan 3 angka, dan empat nilai confusion matrix bertipe `int`. Anggap kasus biner dengan kelas positif = 1.',
        starter_code: 'from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix\n\ndef laporan(y_asli, y_pred):\n    pass\n',
        tests: [
          { name: 'Prediksi sempurna', code: 'import numpy as np\ny = np.array([0, 1, 1, 0])\nh = laporan(y, y)\nassert h["akurasi"] == 1.0 and h["f1"] == 1.0' },
          { name: 'Confusion matrix benar', code: 'import numpy as np\nh = laporan(np.array([1, 1, 0, 0]), np.array([1, 0, 1, 0]))\nassert (h["tp"], h["fp"], h["fn"], h["tn"]) == (1, 1, 1, 1), h' },
          { name: 'Precision & recall benar', code: 'import numpy as np\nh = laporan(np.array([1, 1, 0, 0]), np.array([1, 0, 1, 0]))\nassert h["precision"] == 0.5 and h["recall"] == 0.5' },
          { name: 'Semua nilai confusion bertipe int', code: 'import numpy as np\nh = laporan(np.array([1, 0]), np.array([1, 0]))\nassert all(isinstance(h[k], int) for k in ["tp", "fp", "fn", "tn"])' },
          { name: 'Model yang tidak pernah menebak positif', code: 'import numpy as np\nh = laporan(np.array([1, 0, 0, 0]), np.array([0, 0, 0, 0]))\nassert h["recall"] == 0.0 and h["akurasi"] == 0.75' }
        ],
        hints: ['confusion_matrix menghasilkan [[tn, fp], [fn, tp]].', 'Pakai zero_division=0 pada precision_score supaya tidak muncul peringatan.'],
        solution: 'from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix\n\ndef laporan(y_asli, y_pred):\n    tn, fp, fn, tp = confusion_matrix(y_asli, y_pred, labels=[0, 1]).ravel()\n    return {\n        "akurasi": round(float(accuracy_score(y_asli, y_pred)), 3),\n        "precision": round(float(precision_score(y_asli, y_pred, zero_division=0)), 3),\n        "recall": round(float(recall_score(y_asli, y_pred, zero_division=0)), 3),\n        "f1": round(float(f1_score(y_asli, y_pred, zero_division=0)), 3),\n        "tp": int(tp), "fp": int(fp), "fn": int(fn), "tn": int(tn)\n    }'
      }
    },
    {
      id: 'm9-l6',
      title: 'Pipeline & Preprocessing',
      duration: 26,
      objectives: ['Membungkus preprocessing + model jadi satu pipeline', 'Mencegah data leakage', 'Mencari hyperparameter dengan GridSearchCV'],
      quiz: [
        { id: 'm9-l6-q1', type: 'mcq', question: 'Keuntungan utama Pipeline adalah ...', options: ['Modelnya jadi lebih akurat', 'Semua langkah preprocessing tersimpan & otomatis terulang, mencegah kebocoran', 'Lebih hemat memori', 'Tidak butuh data uji'], answer: 1,
          explanation: 'Tidak mungkin lupa satu langkah saat memproses data baru.' },
        { id: 'm9-l6-q2', type: 'mcq', question: 'Pada data uji, yang benar adalah ...', options: ['fit_transform', 'transform saja', 'fit saja', 'Tidak diapa-apakan'], answer: 1,
          explanation: 'fit hanya boleh melihat data latih.' },
        { id: 'm9-l6-q3', type: 'mcq', question: 'handle_unknown="ignore" pada OneHotEncoder berguna karena ...', options: ['Mempercepat encoding', 'Di produksi bisa muncul kategori yang belum pernah dilihat', 'Menghemat memori', 'Menghapus nilai kosong'], answer: 1,
          explanation: 'Tanpa itu, program error begitu ketemu kategori baru.' },
        { id: 'm9-l6-q4', type: 'mcq', question: 'Pada GridSearchCV, penulisan "model__C" berarti ...', options: ['Parameter C milik langkah bernama model', 'Dua model sekaligus', 'Nama kolom data', 'Konstanta C'], answer: 0,
          explanation: 'Dua garis bawah memisahkan nama langkah dari nama parameter.' },
        { id: 'm9-l6-q5', type: 'true_false', question: 'Menyimpan model saja (tanpa scaler-nya) sudah cukup untuk dipakai di produksi.', answer: false,
          explanation: 'Data baru harus melewati preprocessing yang sama. Simpan seluruh pipeline.' }
      ],
      coding: {
        packages: SK,
        prompt: 'Buat fungsi `buat_pipeline()` yang mengembalikan `Pipeline` berisi tiga langkah berurutan:\n\n1. `"imputer"` → `SimpleImputer(strategy="median")`\n2. `"scaler"` → `StandardScaler()`\n3. `"model"` → `LogisticRegression(max_iter=1000)`',
        starter_code: 'from sklearn.pipeline import Pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\ndef buat_pipeline():\n    pass\n',
        tests: [
          { name: 'Mengembalikan Pipeline', code: 'from sklearn.pipeline import Pipeline\nassert isinstance(buat_pipeline(), Pipeline)' },
          { name: 'Nama langkahnya benar', code: 'assert [n for n, _ in buat_pipeline().steps] == ["imputer", "scaler", "model"]' },
          { name: 'Imputer memakai median', code: 'assert buat_pipeline().named_steps["imputer"].strategy == "median"' },
          { name: 'Bisa dilatih walau ada nilai kosong', code: 'import numpy as np\nX = np.array([[1., 2.], [np.nan, 3.], [3., 4.], [4., 5.]])\ny = np.array([0, 0, 1, 1])\np = buat_pipeline()\np.fit(X, y)\nassert p.predict(X).shape == (4,)' }
        ],
        hints: ['Pipeline menerima list of tuple: [("nama", objek), ...]', 'Urutannya harus imputer → scaler → model.'],
        solution: 'from sklearn.pipeline import Pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\ndef buat_pipeline():\n    return Pipeline([\n        ("imputer", SimpleImputer(strategy="median")),\n        ("scaler", StandardScaler()),\n        ("model", LogisticRegression(max_iter=1000))\n    ])'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 9 — Machine Learning',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm9-x1', type: 'mcq', question: 'Model pembanding (baseline) yang baik untuk klasifikasi adalah ...', options: ['Neural network besar', 'Logistic Regression', 'Model acak', 'Tidak perlu baseline'], answer: 1,
        explanation: 'Kalau model rumitmu tidak mengalahkannya, kerumitannya sia-sia.' },
      { id: 'm9-x2', type: 'mcq', question: 'Untuk data tabel terstruktur, model yang sering jadi pemenang adalah ...', options: ['Random Forest / gradient boosting', 'Neural network dalam', 'KNN', 'Regresi linear'], answer: 0,
        explanation: 'Deep learning justru lebih unggul untuk gambar, audio, dan teks.' },
      { id: 'm9-x3', type: 'true_false', question: 'Kualitas data biasanya lebih menentukan hasil daripada pemilihan algoritma.', answer: true,
        explanation: 'Karena itu Modul 7 (pandas) sama pentingnya dengan modul ini.' },
      { id: 'm9-x4', type: 'mcq', question: 'random_state dipakai supaya ...', options: ['Model lebih akurat', 'Hasilnya bisa diulang persis', 'Pelatihan lebih cepat', 'Data teracak sempurna'], answer: 1,
        explanation: 'Tanpa itu, tiap kali dijalankan hasilnya berbeda dan sulit dibandingkan.' }
    ],
    coding: [
      {
        id: 'm9-e-c1',
        packages: SK,
        prompt: 'Buat fungsi `latih_klasifikasi(X, y)` sebagai alur ML lengkap:\n\n1. Split 80/20 dengan `random_state=42` dan `stratify=y`\n2. Pipeline: `StandardScaler` → `LogisticRegression(max_iter=1000)`\n3. Latih pada data latih\n4. Kembalikan dict `{"pipeline": ..., "akurasi": ..., "f1": ...}` — skor dihitung dari **data uji** dan dibulatkan 3 angka.',
        starter_code: 'from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, f1_score\n\ndef latih_klasifikasi(X, y):\n    pass\n',
        tests: [
          { name: 'Mengembalikan pipeline terlatih', code: 'import numpy as np\nfrom sklearn.pipeline import Pipeline\nrng = np.random.default_rng(0)\nX = np.vstack([rng.normal(0, 1, (40, 3)), rng.normal(3, 1, (40, 3))])\ny = np.array([0]*40 + [1]*40)\nh = latih_klasifikasi(X, y)\nassert isinstance(h["pipeline"], Pipeline) and h["pipeline"].predict(X).shape == (80,)' },
          { name: 'Data yang mudah dipisah -> akurasi tinggi', code: 'import numpy as np\nrng = np.random.default_rng(0)\nX = np.vstack([rng.normal(0, 1, (40, 3)), rng.normal(5, 1, (40, 3))])\ny = np.array([0]*40 + [1]*40)\nassert latih_klasifikasi(X, y)["akurasi"] > 0.9' },
          { name: 'Punya scaler di dalam pipeline', code: 'import numpy as np\nrng = np.random.default_rng(0)\nX = np.vstack([rng.normal(0, 1, (40, 3)), rng.normal(5, 1, (40, 3))])\ny = np.array([0]*40 + [1]*40)\np = latih_klasifikasi(X, y)["pipeline"]\nassert any("scal" in n.lower() for n, _ in p.steps), [n for n, _ in p.steps]' },
          { name: 'Skor dibulatkan 3 angka', code: 'import numpy as np\nrng = np.random.default_rng(1)\nX = np.vstack([rng.normal(0, 1, (30, 2)), rng.normal(2, 1, (30, 2))])\ny = np.array([0]*30 + [1]*30)\nh = latih_klasifikasi(X, y)\nassert round(h["akurasi"], 3) == h["akurasi"] and round(h["f1"], 3) == h["f1"]' }
        ],
        hints: ['Split dulu, baru fit pipeline pada data latih saja.', 'Skor dihitung dari prediksi terhadap X_test.'],
        solution: 'from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, f1_score\n\ndef latih_klasifikasi(X, y):\n    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)\n    pipe = Pipeline([\n        ("scaler", StandardScaler()),\n        ("model", LogisticRegression(max_iter=1000))\n    ])\n    pipe.fit(X_tr, y_tr)\n    pred = pipe.predict(X_te)\n    return {\n        "pipeline": pipe,\n        "akurasi": round(float(accuracy_score(y_te, pred)), 3),\n        "f1": round(float(f1_score(y_te, pred, average="macro", zero_division=0)), 3)\n    }'
      }
    ]
  }
};
