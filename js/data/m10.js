const NP = ['numpy'];

export default {
  id: 'm10',
  title: 'Neural Network dari Nol',
  icon: '🧠',
  tagline: 'Neuron, aktivasi, forward pass, backprop, training loop.',
  desc: 'Membangun jaringan saraf pakai NumPy saja — supaya paham apa yang terjadi di balik framework.',
  badge: { id: 'b-m10', icon: '🧠', name: 'Perakit Jaringan', desc: 'Membangun neural network dari nol' },
  lessons: [
    {
      id: 'm10-l1',
      title: 'Neuron & Perceptron',
      duration: 24,
      objectives: ['Memahami tiga langkah kerja satu neuron', 'Membuat perceptron untuk gerbang logika', 'Tahu kenapa XOR butuh lapisan tersembunyi'],
      quiz: [
        { id: 'm10-l1-q1', type: 'mcq', question: 'Urutan kerja satu neuron adalah ...', options: ['Aktivasi → kalikan bobot → jumlahkan', 'Kalikan bobot → tambah bias → aktivasi', 'Jumlahkan → bagi → aktivasi', 'Aktivasi → bias → bobot'], answer: 1,
          explanation: 'z = x @ w + b, lalu a = f(z).' },
        { id: 'm10-l1-q2', type: 'mcq', question: 'Fungsi bias pada neuron adalah ...', options: ['Mempercepat perhitungan', 'Menggeser ambang sehingga neuron tidak dipaksa melewati titik nol', 'Menormalkan input', 'Mencegah overfitting'], answer: 1,
          explanation: 'Tanpa bias, fleksibilitas model berkurang drastis.' },
        { id: 'm10-l1-q3', type: 'mcq', question: 'Satu perceptron tidak bisa menyelesaikan XOR karena ...', options: ['Terlalu lambat', 'XOR tidak bisa dipisahkan oleh satu garis lurus', 'Inputnya terlalu banyak', 'Biasnya nol'], answer: 1,
          explanation: 'Butuh lapisan tersembunyi untuk membentuk lebih dari satu garis pemisah.' },
        { id: 'm10-l1-q4', type: 'true_false', question: 'Bobot dan bias adalah nilai yang dipelajari dari data, bukan ditentukan manusia.', answer: true,
          explanation: 'Awalnya acak, lalu diperbaiki lewat gradient descent.' }
      ],
      coding: {
        packages: NP,
        prompt: 'Buat fungsi `perceptron(X, w, b)` yang menghitung `X @ w + b` lalu mengembalikan array `int` berisi 1 kalau hasilnya **lebih besar dari 0**, dan 0 kalau tidak.\n\n`X` berbentuk `(n_sampel, n_fitur)`.',
        starter_code: 'import numpy as np\n\ndef perceptron(X, w, b):\n    pass\n',
        tests: [
          { name: 'Gerbang AND bekerja', code: 'import numpy as np\nX = np.array([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])\nassert perceptron(X, np.array([1., 1.]), -1.5).tolist() == [0, 0, 0, 1]' },
          { name: 'Gerbang OR bekerja', code: 'import numpy as np\nX = np.array([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])\nassert perceptron(X, np.array([1., 1.]), -0.5).tolist() == [0, 1, 1, 1]' },
          { name: 'Mengembalikan array bertipe int', code: 'import numpy as np\nh = perceptron(np.array([[1., 1.]]), np.array([1., 1.]), 0.)\nassert isinstance(h, np.ndarray) and h.dtype.kind == "i"' },
          { name: 'Tepat nol dianggap 0', code: 'import numpy as np\nassert perceptron(np.array([[0., 0.]]), np.array([1., 1.]), 0.).tolist() == [0]' }
        ],
        hints: ['z = X @ w + b menghitung semua sampel sekaligus.', 'Pakai (z > 0).astype(int).'],
        solution: 'import numpy as np\n\ndef perceptron(X, w, b):\n    z = X @ w + b\n    return (z > 0).astype(int)'
      }
    },
    {
      id: 'm10-l2',
      title: 'Fungsi Aktivasi',
      duration: 24,
      objectives: ['Paham kenapa aktivasi non-linear wajib ada', 'Mengenal sigmoid, ReLU, tanh, softmax', 'Memilih aktivasi sesuai posisinya'],
      quiz: [
        { id: 'm10-l2-q1', type: 'mcq', question: 'Tanpa fungsi aktivasi non-linear, jaringan berlapis-lapis akan setara dengan ...', options: ['Jaringan yang lebih kuat', 'Satu lapisan linear saja', 'Decision tree', 'Model acak'], answer: 1,
          explanation: 'Gabungan fungsi linear tetap linear, jadi kedalamannya sia-sia.' },
        { id: 'm10-l2-q2', type: 'mcq', question: 'Aktivasi default untuk lapisan tersembunyi saat ini adalah ...', options: ['Sigmoid', 'ReLU', 'Softmax', 'Tanpa aktivasi'], answer: 1,
          explanation: 'Cepat dan tidak mengalami vanishing gradient di sisi positif.' },
        { id: 'm10-l2-q3', type: 'mcq', question: 'Softmax dipakai di lapisan keluaran untuk ...', options: ['Regresi', 'Klasifikasi banyak kelas', 'Klasifikasi biner', 'Lapisan tersembunyi'], answer: 1,
          explanation: 'Mengubah skor jadi peluang yang totalnya 1.' },
        { id: 'm10-l2-q4', type: 'mcq', question: 'Sebelum np.exp di softmax, nilai maksimum dikurangi supaya ...', options: ['Hasilnya lebih akurat', 'Tidak terjadi overflow menjadi inf', 'Lebih cepat', 'Jumlahnya jadi 1'], answer: 1,
          explanation: 'Hasil softmax-nya tidak berubah, tapi perhitungannya jadi aman.' },
        { id: 'm10-l2-q5', type: 'mcq', question: 'Untuk keluaran model REGRESI, aktivasi yang tepat adalah ...', options: ['Sigmoid', 'Softmax', 'ReLU', 'Tanpa aktivasi'], answer: 3,
          explanation: 'Membatasi keluaran akan membuat model tidak bisa memprediksi nilai di luar rentang itu.' }
      ],
      coding: {
        packages: NP,
        prompt: 'Implementasikan tiga fungsi aktivasi:\n\n- `relu(z)` → `max(0, z)` per elemen\n- `sigmoid(z)` → `1 / (1 + exp(-z))`, aman dari overflow (pakai `np.clip`)\n- `softmax(z)` → peluang per **baris** yang totalnya 1, kurangi nilai maksimum dulu',
        starter_code: 'import numpy as np\n\ndef relu(z):\n    pass\n\n\ndef sigmoid(z):\n    pass\n\n\ndef softmax(z):\n    pass\n',
        tests: [
          { name: 'ReLU benar', code: 'import numpy as np\nassert np.allclose(relu(np.array([-2., 0., 3.])), [0., 0., 3.])' },
          { name: 'Sigmoid benar', code: 'import numpy as np\nassert abs(float(sigmoid(np.array([0.]))[0]) - 0.5) < 1e-9' },
          { name: 'Sigmoid aman dari overflow', code: 'import numpy as np\nh = sigmoid(np.array([-1000., 1000.]))\nassert not np.isnan(h).any() and h[0] < 0.01 and h[1] > 0.99' },
          { name: 'Softmax berjumlah 1 per baris', code: 'import numpy as np\nz = np.array([[2., 1., 0.1], [1., 1., 1.]])\nassert np.allclose(softmax(z).sum(axis=1), 1.0)' },
          { name: 'Softmax stabil untuk nilai besar', code: 'import numpy as np\nh = softmax(np.array([[1000., 1001.]]))\nassert not np.isnan(h).any() and h[0, 1] > h[0, 0]' }
        ],
        hints: ['np.maximum(0, z) untuk ReLU.', 'Di sigmoid, bungkus dengan np.clip(z, -500, 500) sebelum np.exp.', 'Di softmax: z = z - z.max(axis=-1, keepdims=True), lalu bagi dengan jumlahnya.'],
        solution: 'import numpy as np\n\ndef relu(z):\n    return np.maximum(0, z)\n\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))\n\n\ndef softmax(z):\n    z = z - np.max(z, axis=-1, keepdims=True)\n    e = np.exp(z)\n    return e / e.sum(axis=-1, keepdims=True)'
      }
    },
    {
      id: 'm10-l3',
      title: 'Forward Pass & Layer',
      duration: 24,
      objectives: ['Menghitung satu lapisan dengan perkalian matriks', 'Menyusun forward pass dua lapisan', 'Menginisialisasi bobot dengan benar'],
      quiz: [
        { id: 'm10-l3-q1', type: 'mcq', question: 'Bentuk matriks bobot satu lapisan adalah ...', options: ['(n_neuron, n_input)', '(n_input, n_neuron)', '(n_sampel, n_neuron)', '(n_neuron,)'], answer: 1,
          explanation: 'Supaya X (n_sampel, n_input) @ W menghasilkan (n_sampel, n_neuron).' },
        { id: 'm10-l3-q2', type: 'mcq', question: 'Menginisialisasi semua bobot dengan nol itu buruk karena ...', options: ['Perhitungan jadi lambat', 'Semua neuron menghitung hal yang sama dan tetap identik selamanya', 'Memori boros', 'Bias jadi tidak berguna'], answer: 1,
          explanation: 'Disebut symmetry problem — jaringan jadi tidak lebih baik dari satu neuron.' },
        { id: 'm10-l3-q3', type: 'mcq', question: 'He initialization dipasangkan dengan aktivasi ...', options: ['Sigmoid', 'ReLU', 'Softmax', 'Tanpa aktivasi'], answer: 1,
          explanation: 'Untuk tanh/sigmoid, Xavier lebih cocok.' },
        { id: 'm10-l3-q4', type: 'true_false', question: 'Nilai antara (cache) perlu disimpan saat forward pass karena dibutuhkan backpropagation.', answer: true,
          explanation: 'Itulah kenapa melatih model butuh memori jauh lebih besar daripada memakainya.' }
      ],
      coding: {
        packages: NP,
        prompt: 'Buat fungsi `forward(X, W1, b1, W2, b2)` untuk jaringan dua lapisan:\n\n1. `Z1 = X @ W1 + b1`\n2. `A1 = relu(Z1)`\n3. `Z2 = A1 @ W2 + b2`\n4. `A2 = sigmoid(Z2)`\n\nKembalikan tuple `(A2, cache)` dengan `cache` berupa dict berisi `Z1`, `A1`, `Z2`, `A2`.',
        starter_code: 'import numpy as np\n\ndef forward(X, W1, b1, W2, b2):\n    pass\n',
        tests: [
          { name: 'Bentuk keluaran benar', code: 'import numpy as np\nX = np.zeros((5, 3)); W1 = np.zeros((3, 4)); b1 = np.zeros(4); W2 = np.zeros((4, 1)); b2 = np.zeros(1)\nA2, c = forward(X, W1, b1, W2, b2)\nassert A2.shape == (5, 1)' },
          { name: 'Cache berisi empat kunci', code: 'import numpy as np\nX = np.zeros((5, 3)); W1 = np.zeros((3, 4)); b1 = np.zeros(4); W2 = np.zeros((4, 1)); b2 = np.zeros(1)\n_, c = forward(X, W1, b1, W2, b2)\nassert set(c.keys()) >= {"Z1", "A1", "Z2", "A2"}' },
          { name: 'Semua nol menghasilkan sigmoid 0.5', code: 'import numpy as np\nX = np.zeros((2, 3)); W1 = np.zeros((3, 4)); b1 = np.zeros(4); W2 = np.zeros((4, 1)); b2 = np.zeros(1)\nA2, _ = forward(X, W1, b1, W2, b2)\nassert np.allclose(A2, 0.5)' },
          { name: 'ReLU benar-benar diterapkan', code: 'import numpy as np\nX = np.array([[-1.]]); W1 = np.array([[1.]]); b1 = np.zeros(1); W2 = np.array([[1.]]); b2 = np.zeros(1)\n_, c = forward(X, W1, b1, W2, b2)\nassert c["A1"].item() == 0.0 and c["Z1"].item() == -1.0' }
        ],
        hints: ['Bangun cache sambil menghitung, jangan dihitung ulang di akhir.', 'sigmoid(z) = 1 / (1 + np.exp(-np.clip(z, -500, 500)))'],
        solution: 'import numpy as np\n\ndef forward(X, W1, b1, W2, b2):\n    Z1 = X @ W1 + b1\n    A1 = np.maximum(0, Z1)\n    Z2 = A1 @ W2 + b2\n    A2 = 1 / (1 + np.exp(-np.clip(Z2, -500, 500)))\n    return A2, {"X": X, "Z1": Z1, "A1": A1, "Z2": Z2, "A2": A2}'
      }
    },
    {
      id: 'm10-l4',
      title: 'Loss & Backpropagation',
      duration: 26,
      objectives: ['Menghitung MSE dan binary cross-entropy', 'Memahami aturan rantai pada backprop', 'Menghitung gradien tiap lapisan'],
      quiz: [
        { id: 'm10-l4-q1', type: 'mcq', question: 'Untuk klasifikasi biner, loss yang tepat adalah ...', options: ['MSE', 'Binary cross-entropy', 'MAE', 'R²'], answer: 1,
          explanation: 'Cross-entropy menghukum keyakinan yang salah jauh lebih keras.' },
        { id: 'm10-l4-q2', type: 'mcq', question: 'np.clip dipakai pada cross-entropy untuk ...', options: ['Mempercepat hitungan', 'Mencegah log(0) yang menghasilkan -inf', 'Menormalkan data', 'Membatasi jumlah epoch'], answer: 1,
          explanation: 'Satu log(0) saja bisa merusak seluruh pelatihan.' },
        { id: 'm10-l4-q3', type: 'mcq', question: 'Gradien keluaran untuk kombinasi sigmoid + BCE adalah ...', options: ['(A - y) / n', 'A * (1 - A)', 'log(A)', '2 * (A - y)'], answer: 0,
          explanation: 'Suku-sukunya saling menghapus sehingga tersisa selisih sederhana.' },
        { id: 'm10-l4-q4', type: 'mcq', question: 'Turunan ReLU diimplementasikan sebagai ...', options: ['dA * A', 'dA * (Z > 0)', 'dA / Z', 'dA * (1 - A)'], answer: 1,
          explanation: 'Gradien mengalir hanya lewat neuron yang aktif.' },
        { id: 'm10-l4-q5', type: 'true_false', question: 'Backpropagation adalah penerapan aturan rantai kalkulus, dihitung mundur dari keluaran.', answer: true,
          explanation: 'Karena itu namanya "back"-propagation.' }
      ],
      coding: {
        packages: NP,
        prompt: 'Buat dua fungsi:\n\n- `mse(y_pred, y_asli)` → rata-rata kuadrat selisih\n- `bce(y_pred, y_asli)` → binary cross-entropy, aman dari `log(0)` (clip ke `1e-9`)\n\nKeduanya mengembalikan `float`.',
        starter_code: 'import numpy as np\n\ndef mse(y_pred, y_asli):\n    pass\n\n\ndef bce(y_pred, y_asli):\n    pass\n',
        tests: [
          { name: 'MSE prediksi sempurna = 0', code: 'import numpy as np\ny = np.array([1., 2., 3.])\nassert abs(mse(y, y)) < 1e-12' },
          { name: 'MSE dihitung benar', code: 'import numpy as np\nassert abs(mse(np.array([0., 0.]), np.array([3., 4.])) - 12.5) < 1e-9' },
          { name: 'BCE prediksi sempurna mendekati 0', code: 'import numpy as np\nassert bce(np.array([0.999999, 0.000001]), np.array([1., 0.])) < 1e-5' },
          { name: 'BCE aman dari log(0)', code: 'import numpy as np\nh = bce(np.array([0.0, 1.0]), np.array([1., 0.]))\nassert not np.isnan(h) and not np.isinf(h)' },
          { name: 'BCE tebakan 0.5 sekitar 0.693', code: 'import numpy as np\nassert abs(bce(np.array([0.5, 0.5]), np.array([1., 0.])) - 0.6931) < 1e-3' }
        ],
        hints: ['MSE: np.mean((y_pred - y_asli) ** 2)', 'BCE: clip dulu, lalu -mean(y*log(p) + (1-y)*log(1-p))'],
        solution: 'import numpy as np\n\ndef mse(y_pred, y_asli):\n    return float(np.mean((y_pred - y_asli) ** 2))\n\n\ndef bce(y_pred, y_asli, eps=1e-9):\n    p = np.clip(y_pred, eps, 1 - eps)\n    return float(-np.mean(y_asli * np.log(p) + (1 - y_asli) * np.log(1 - p)))'
      }
    },
    {
      id: 'm10-l5',
      title: 'Melatih Jaringan',
      duration: 28,
      objectives: ['Menulis training loop lengkap', 'Memahami epoch, batch, dan iterasi', 'Membaca grafik loss untuk diagnosis'],
      quiz: [
        { id: 'm10-l5-q1', type: 'mcq', question: 'Urutan satu iterasi pelatihan adalah ...', options: ['Loss → forward → update → backward', 'Forward → loss → backward → update', 'Backward → forward → loss → update', 'Update → forward → backward → loss'], answer: 1,
          explanation: 'Empat langkah ini diulang ribuan kali.' },
        { id: 'm10-l5-q2', type: 'mcq', question: 'Satu epoch artinya ...', options: ['Satu kali update bobot', 'Satu putaran penuh melihat seluruh data latih', 'Satu batch', 'Satu lapisan'], answer: 1,
          explanation: 'Dalam satu epoch bisa ada banyak iterasi, tergantung ukuran batch.' },
        { id: 'm10-l5-q3', type: 'mcq', question: 'Loss menjadi NaN di awal pelatihan. Penyebab paling mungkin ...', options: ['Data terlalu sedikit', 'Learning rate terlalu besar atau ada log(0)', 'Model terlalu kecil', 'Epoch kurang'], answer: 1,
          explanation: 'Dua tersangka utama yang harus dicek lebih dulu.' },
        { id: 'm10-l5-q4', type: 'mcq', question: 'Ukuran mini-batch yang umum dipakai di industri adalah ...', options: ['1', '32–128', 'Seluruh data', '10.000'], answer: 1,
          explanation: 'Seimbang antara kestabilan, kecepatan, dan pemakaian memori GPU.' },
        { id: 'm10-l5-q5', type: 'mcq', question: 'Optimizer default yang paling umum dipakai sekarang adalah ...', options: ['SGD biasa', 'Adam', 'Newton', 'Genetic algorithm'], answer: 1,
          explanation: 'Adam menggabungkan momentum dan penyesuaian langkah per parameter.' }
      ],
      coding: {
        packages: NP,
        prompt: 'Buat fungsi `latih_xor(epoch=3000, lr=0.5, seed=42)` yang melatih jaringan 2 → 4 → 1 untuk menyelesaikan XOR, lalu mengembalikan array prediksi **bulat** untuk keempat masukan XOR.\n\nTarget: `[0, 1, 1, 0]`.',
        starter_code: 'import numpy as np\n\nX = np.array([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])\nY = np.array([[0.], [1.], [1.], [0.]])\n\n\ndef latih_xor(epoch=3000, lr=0.5, seed=42):\n    pass\n',
        tests: [
          { name: 'XOR berhasil dipelajari', code: 'import numpy as np\nassert np.asarray(latih_xor()).ravel().tolist() == [0, 1, 1, 0]' },
          { name: 'Mengembalikan empat nilai', code: 'import numpy as np\nassert len(np.asarray(latih_xor()).ravel()) == 4' },
          { name: 'Hasilnya hanya 0 dan 1', code: 'import numpy as np\nh = set(np.asarray(latih_xor()).ravel().tolist())\nassert h <= {0, 1}' },
          { name: 'Hasil konsisten karena seed', code: 'import numpy as np\na = np.asarray(latih_xor()).ravel().tolist()\nb = np.asarray(latih_xor()).ravel().tolist()\nassert a == b' }
        ],
        hints: ['Inisialisasi W1 (2,4) dan W2 (4,1) dengan rng.normal, bias nol.', 'Forward: ReLU di lapisan tersembunyi, sigmoid di keluaran.', 'Backward: dZ2 = (A2 - Y)/n, dZ1 = (dZ2 @ W2.T) * (Z1 > 0).'],
        solution: 'import numpy as np\n\nX = np.array([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])\nY = np.array([[0.], [1.], [1.], [0.]])\n\n\ndef latih_xor(epoch=3000, lr=0.5, seed=42):\n    rng = np.random.default_rng(seed)\n    W1 = rng.normal(0, np.sqrt(2 / 2), (2, 4))\n    b1 = np.zeros(4)\n    W2 = rng.normal(0, np.sqrt(2 / 4), (4, 1))\n    b2 = np.zeros(1)\n    n = X.shape[0]\n\n    for _ in range(epoch):\n        Z1 = X @ W1 + b1\n        A1 = np.maximum(0, Z1)\n        Z2 = A1 @ W2 + b2\n        A2 = 1 / (1 + np.exp(-np.clip(Z2, -500, 500)))\n\n        dZ2 = (A2 - Y) / n\n        dW2 = A1.T @ dZ2\n        db2 = dZ2.sum(axis=0)\n        dZ1 = (dZ2 @ W2.T) * (Z1 > 0)\n        dW1 = X.T @ dZ1\n        db1 = dZ1.sum(axis=0)\n\n        W1 -= lr * dW1; b1 -= lr * db1\n        W2 -= lr * dW2; b2 -= lr * db2\n\n    Z1 = X @ W1 + b1\n    A1 = np.maximum(0, Z1)\n    A2 = 1 / (1 + np.exp(-np.clip(A1 @ W2 + b2, -500, 500)))\n    return (A2 > 0.5).astype(int).ravel()'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 10 — Neural Network',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm10-x1', type: 'mcq', question: 'Vanishing gradient terjadi ketika ...', options: ['Gradien mengecil terus sampai lapisan awal berhenti belajar', 'Gradien jadi tak hingga', 'Data habis', 'Bobot terlalu banyak'], answer: 0,
        explanation: 'Karena gradien dikalikan berulang saat melewati banyak lapisan.' },
      { id: 'm10-x2', type: 'mcq', question: 'Jaringan 3 → 5 → 1 punya berapa parameter total?', options: ['15', '20', '26', '9'], answer: 2,
        explanation: 'W1 3×5=15, b1 5, W2 5×1=5, b2 1 → total 26.' },
      { id: 'm10-x3', type: 'true_false', question: 'PyTorch menghitung backpropagation otomatis lewat autograd.', answer: true,
        explanation: 'Tapi memahami perhitungan manualnya membuat debugging jauh lebih mudah.' },
      { id: 'm10-x4', type: 'mcq', question: 'Data sebaiknya diacak tiap epoch supaya ...', options: ['Lebih cepat', 'Model tidak belajar urutan datanya, melainkan polanya', 'Memori hemat', 'Loss lebih kecil'], answer: 1,
        explanation: 'Tanpa pengacakan, urutan batch bisa ikut terpelajari.' }
    ],
    coding: [
      {
        id: 'm10-e-c1',
        packages: NP,
        prompt: 'Buat fungsi `backward(cache, Y, W2)` yang mengembalikan dict gradien `{"W1","b1","W2","b2"}` untuk jaringan dua lapisan (ReLU → sigmoid + BCE).\n\n`cache` berisi `X`, `Z1`, `A1`, `A2`.\n\nRumusnya:\n```\nn   = X.shape[0]\ndZ2 = (A2 - Y) / n\ndW2 = A1.T @ dZ2 ; db2 = dZ2.sum(axis=0)\ndZ1 = (dZ2 @ W2.T) * (Z1 > 0)\ndW1 = X.T @ dZ1  ; db1 = dZ1.sum(axis=0)\n```',
        starter_code: 'import numpy as np\n\ndef backward(cache, Y, W2):\n    pass\n',
        tests: [
          { name: 'Bentuk gradien cocok dengan bobotnya', code: 'import numpy as np\nX = np.ones((4, 2)); Z1 = np.ones((4, 3)); A1 = np.ones((4, 3)); A2 = np.full((4, 1), 0.5)\nW2 = np.ones((3, 1)); Y = np.array([[0.], [1.], [1.], [0.]])\ng = backward({"X": X, "Z1": Z1, "A1": A1, "A2": A2}, Y, W2)\nassert g["W1"].shape == (2, 3) and g["W2"].shape == (3, 1)' },
          { name: 'Bentuk gradien bias benar', code: 'import numpy as np\nX = np.ones((4, 2)); Z1 = np.ones((4, 3)); A1 = np.ones((4, 3)); A2 = np.full((4, 1), 0.5)\nW2 = np.ones((3, 1)); Y = np.array([[0.], [1.], [1.], [0.]])\ng = backward({"X": X, "Z1": Z1, "A1": A1, "A2": A2}, Y, W2)\nassert g["b1"].shape == (3,) and g["b2"].shape == (1,)' },
          { name: 'Prediksi sempurna -> gradien nol', code: 'import numpy as np\nX = np.ones((2, 2)); Z1 = np.ones((2, 3)); A1 = np.ones((2, 3))\nY = np.array([[1.], [0.]]); A2 = Y.copy(); W2 = np.ones((3, 1))\ng = backward({"X": X, "Z1": Z1, "A1": A1, "A2": A2}, Y, W2)\nassert np.allclose(g["W2"], 0) and np.allclose(g["W1"], 0)' },
          { name: 'Neuron mati (Z1 <= 0) tidak mengalirkan gradien', code: 'import numpy as np\nX = np.ones((2, 2)); Z1 = -np.ones((2, 3)); A1 = np.zeros((2, 3)); A2 = np.full((2, 1), 0.9)\nW2 = np.ones((3, 1)); Y = np.zeros((2, 1))\ng = backward({"X": X, "Z1": Z1, "A1": A1, "A2": A2}, Y, W2)\nassert np.allclose(g["W1"], 0)' }
        ],
        hints: ['Ambil X, Z1, A1, A2 dari cache lebih dulu.', 'Jangan lupa membagi n pada dZ2.'],
        solution: 'import numpy as np\n\ndef backward(cache, Y, W2):\n    X, Z1, A1, A2 = cache["X"], cache["Z1"], cache["A1"], cache["A2"]\n    n = X.shape[0]\n    dZ2 = (A2 - Y) / n\n    dW2 = A1.T @ dZ2\n    db2 = dZ2.sum(axis=0)\n    dZ1 = (dZ2 @ W2.T) * (Z1 > 0)\n    dW1 = X.T @ dZ1\n    db1 = dZ1.sum(axis=0)\n    return {"W1": dW1, "b1": db1, "W2": dW2, "b2": db2}'
      }
    ]
  }
};
