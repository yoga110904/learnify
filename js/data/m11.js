const NP = ['numpy'];

export default {
  id: 'm11',
  title: 'LLM & AI Generatif',
  icon: '✨',
  tagline: 'Token, embedding, prompt, RAG, dan API LLM.',
  desc: 'Memahami cara kerja model bahasa dan membangun sistem di atasnya.',
  badge: { id: 'b-m11', icon: '✨', name: 'Penjinak LLM', desc: 'Paham cara kerja & cara membangun dengan LLM' },
  lessons: [
    {
      id: 'm11-l1',
      title: 'Cara Kerja LLM',
      duration: 24,
      objectives: ['Memahami prediksi token berikutnya', 'Mengenal token, context window, dan temperature', 'Tahu kenapa model berhalusinasi'],
      quiz: [
        { id: 'm11-l1-q1', type: 'mcq', question: 'Inti cara kerja model bahasa besar adalah ...', options: ['Mencari jawaban di internet', 'Memprediksi token berikutnya yang paling mungkin, berulang kali', 'Mencocokkan pertanyaan dengan basis data', 'Menjalankan aturan yang ditulis manusia'], answer: 1,
          explanation: 'Semua kemampuannya muncul dari melakukan tugas ini sangat baik pada data yang sangat banyak.' },
        { id: 'm11-l1-q2', type: 'mcq', question: 'Perkiraan kasar 1 token setara dengan ...', options: ['1 huruf', '4 karakter / 0,75 kata', '1 kalimat', '1 paragraf'], answer: 1,
          explanation: 'Karena itu harga API dihitung per token, bukan per kata.' },
        { id: 'm11-l1-q3', type: 'mcq', question: 'Untuk ekstraksi data yang harus konsisten, temperature sebaiknya ...', options: ['0', '0,7', '1,5', '2'], answer: 0,
          explanation: 'Temperature 0 selalu memilih token dengan peluang tertinggi.' },
        { id: 'm11-l1-q4', type: 'mcq', question: 'Model berhalusinasi karena ...', options: ['Datanya rusak', 'Tugasnya menghasilkan teks yang masuk akal, bukan yang pasti benar', 'Kurang RAM', 'Temperature selalu tinggi'], answer: 1,
          explanation: 'Ini sifat bawaan cara kerjanya; sistem harus dirancang memperhitungkannya.' },
        { id: 'm11-l1-q5', type: 'true_false', question: 'LLM mengingat percakapan sebelumnya secara otomatis di server.', answer: false,
          explanation: 'Riwayat dikirim ulang setiap permintaan. Yang terasa "ingat" sebenarnya teks lama yang dikirim lagi.' }
      ],
      coding: {
        packages: [],
        prompt: 'Buat fungsi `perkiraan_token(teks)` yang memperkirakan jumlah token dengan aturan **1 token ≈ 4 karakter**, dibulatkan ke atas.\n\nLalu buat `muat_konteks(teks, batas)` yang mengembalikan `True` kalau perkiraan tokennya masih di bawah atau sama dengan `batas`.',
        starter_code: 'import math\n\ndef perkiraan_token(teks):\n    pass\n\n\ndef muat_konteks(teks, batas):\n    pass\n',
        tests: [
          { name: '8 karakter -> 2 token', code: 'assert perkiraan_token("abcdefgh") == 2' },
          { name: 'Dibulatkan ke atas', code: 'assert perkiraan_token("abcde") == 2' },
          { name: 'Teks kosong -> 0 token', code: 'assert perkiraan_token("") == 0' },
          { name: 'muat_konteks benar', code: 'assert muat_konteks("abcdefgh", 2) is True and muat_konteks("abcdefgh", 1) is False' }
        ],
        hints: ['math.ceil(len(teks) / 4)', 'muat_konteks tinggal membandingkan hasilnya dengan batas.'],
        solution: 'import math\n\ndef perkiraan_token(teks):\n    return math.ceil(len(teks) / 4)\n\n\ndef muat_konteks(teks, batas):\n    return perkiraan_token(teks) <= batas'
      }
    },
    {
      id: 'm11-l2',
      title: 'Tokenisasi & Embedding',
      duration: 26,
      objectives: ['Memahami alur teks → token → embedding', 'Tahu kenapa embedding menangkap makna', 'Mencari teks mirip dengan cosine similarity'],
      quiz: [
        { id: 'm11-l2-q1', type: 'mcq', question: 'Subword tokenization dipakai supaya ...', options: ['Kosakata tetap kecil tapi bisa menangani kata apa pun', 'Teks jadi lebih pendek', 'Model lebih akurat', 'Tidak perlu embedding'], answer: 0,
          explanation: 'Kata umum jadi satu token, kata jarang dipecah jadi potongan.' },
        { id: 'm11-l2-q2', type: 'mcq', question: 'Embedding berbeda dari token ID karena ...', options: ['Lebih pendek', 'Berupa vektor yang menangkap makna, bukan sekadar nomor urut', 'Selalu bilangan bulat', 'Tidak perlu dipelajari'], answer: 1,
          explanation: 'Kata bermakna serupa berakhir berdekatan di ruang vektor.' },
        { id: 'm11-l2-q3', type: 'mcq', question: 'Pencarian semantik unggul dibanding pencarian kata kunci untuk ...', options: ['Kode produk', 'Sinonim dan parafrase', 'Angka persis', 'Nama file'], answer: 1,
          explanation: 'Untuk kecocokan persis, pencarian kata kunci justru lebih tepat.' },
        { id: 'm11-l2-q4', type: 'true_false', question: 'Embedding dari dua model berbeda boleh dibandingkan langsung.', answer: false,
          explanation: 'Tiap model punya ruang vektor sendiri; nilainya tidak sebanding.' }
      ],
      coding: {
        packages: NP,
        prompt: 'Buat fungsi `cari_dokumen(kueri_vec, index, k=3)` yang mengembalikan list `(index_dokumen, skor)` untuk `k` dokumen paling mirip, terurut dari skor tertinggi.\n\n`index` berbentuk `(n_dokumen, n_dimensi)`. Skor memakai cosine similarity, dibulatkan 4 angka. Vektor nol menghasilkan skor `0.0`.',
        starter_code: 'import numpy as np\n\ndef cari_dokumen(kueri_vec, index, k=3):\n    pass\n',
        tests: [
          { name: 'Menemukan dokumen termirip', code: 'import numpy as np\nq = np.array([1., 0.])\nidx = np.array([[0., 1.], [1., 0.1], [-1., 0.]])\nassert cari_dokumen(q, idx, 1)[0][0] == 1' },
          { name: 'Mengembalikan pasangan (index, skor)', code: 'import numpy as np\nq = np.array([1., 0.])\nidx = np.array([[1., 0.]])\nh = cari_dokumen(q, idx, 1)\nassert isinstance(h[0], tuple) and len(h[0]) == 2 and abs(h[0][1] - 1.0) < 1e-6' },
          { name: 'Terurut dari skor tertinggi', code: 'import numpy as np\nq = np.array([1., 0.])\nidx = np.array([[-1., 0.], [1., 0.1], [0., 1.]])\nassert [i for i, _ in cari_dokumen(q, idx, 3)] == [1, 2, 0]' },
          { name: 'Vektor nol tidak menghasilkan NaN', code: 'import numpy as np\nq = np.array([1., 0.])\nidx = np.array([[0., 0.], [1., 0.]])\nh = dict(cari_dokumen(q, idx, 2))\nassert h[0] == 0.0 and not np.isnan(h[0])' }
        ],
        hints: ['Hitung norm kueri dan norm tiap baris index.', 'Ganti penyebut yang 0 jadi 1, lalu paksa skornya jadi 0.'],
        solution: 'import numpy as np\n\ndef cari_dokumen(kueri_vec, index, k=3):\n    nq = np.linalg.norm(kueri_vec)\n    nd = np.linalg.norm(index, axis=1)\n    penyebut = nq * nd\n    aman = np.where(penyebut == 0, 1, penyebut)\n    skor = np.where(penyebut == 0, 0.0, (index @ kueri_vec) / aman)\n    urut = np.argsort(-skor)[:k]\n    return [(int(i), round(float(skor[i]), 4)) for i in urut]'
      }
    },
    {
      id: 'm11-l3',
      title: 'Prompt Engineering',
      duration: 26,
      objectives: ['Menyusun prompt yang spesifik dan terstruktur', 'Memakai few-shot dan chain-of-thought', 'Menguraikan keluaran JSON dengan aman'],
      quiz: [
        { id: 'm11-l3-q1', type: 'mcq', question: 'Bagian prompt yang paling menentukan hasil adalah ...', options: ['Kalimat sopan', 'Tugas spesifik, format keluaran, dan batasan', 'Panjang prompt', 'Jumlah tanda seru'], answer: 1,
          explanation: 'Setiap hal yang dibiarkan ambigu akan diisi tebakan oleh model.' },
        { id: 'm11-l3-q2', type: 'mcq', question: 'Few-shot prompting berarti ...', options: ['Memberi beberapa contoh di dalam prompt', 'Memakai model kecil', 'Membatasi jumlah token', 'Menjalankan beberapa kali'], answer: 0,
          explanation: 'Sangat efektif untuk menjaga konsistensi format keluaran.' },
        { id: 'm11-l3-q3', type: 'mcq', question: 'Peran "system" pada API chat berfungsi untuk ...', options: ['Menyimpan riwayat', 'Mengatur perilaku model sepanjang percakapan', 'Membatasi biaya', 'Mempercepat jawaban'], answer: 1,
          explanation: 'Aturan main yang berlaku untuk seluruh sesi.' },
        { id: 'm11-l3-q4', type: 'mcq', question: 'Prompt injection dicegah dengan ...', options: ['Menaikkan temperature', 'Memisahkan data pengguna dengan pembatas dan menegaskan itu data, bukan perintah', 'Memakai model lebih besar', 'Mematikan streaming'], answer: 1,
          explanation: 'Dan jangan pernah menaruh rahasia di dalam prompt.' },
        { id: 'm11-l3-q5', type: 'true_false', question: 'Keluaran LLM yang diminta berupa JSON selalu bisa langsung di-json.loads().', answer: false,
          explanation: 'Model kadang membungkusnya dengan blok kode atau menambah kalimat pembuka.' }
      ],
      coding: {
        packages: [],
        prompt: 'Buat fungsi `ambil_json(teks)` yang menguraikan JSON dari keluaran LLM yang berantakan.\n\n1. Coba `json.loads` langsung\n2. Kalau gagal, ambil bagian antara `{` pertama dan `}` terakhir lalu coba lagi\n3. Kalau tetap gagal, kembalikan `None`',
        starter_code: 'import json\n\ndef ambil_json(teks):\n    pass\n',
        tests: [
          { name: 'JSON bersih', code: 'assert ambil_json(\'{"a": 1}\') == {"a": 1}' },
          { name: 'JSON dibungkus blok kode', code: 'assert ambil_json(\'```json\\n{"a": 1}\\n```\') == {"a": 1}' },
          { name: 'Ada kalimat pembuka', code: 'assert ambil_json(\'Tentu! Ini hasilnya: {"nama": "Budi", "umur": 20}\') == {"nama": "Budi", "umur": 20}' },
          { name: 'Bukan JSON -> None', code: 'assert ambil_json("maaf saya tidak bisa") is None' },
          { name: 'JSON bersarang tetap utuh', code: 'assert ambil_json(\'catatan {"a": {"b": [1, 2]}} selesai\') == {"a": {"b": [1, 2]}}' }
        ],
        hints: ['Bungkus json.loads dengan try/except json.JSONDecodeError.', 'teks.find("{") dan teks.rfind("}") untuk mencari batasnya.'],
        solution: 'import json\n\ndef ambil_json(teks):\n    try:\n        return json.loads(teks)\n    except (json.JSONDecodeError, TypeError):\n        pass\n    mulai, selesai = teks.find("{"), teks.rfind("}")\n    if mulai != -1 and selesai > mulai:\n        try:\n            return json.loads(teks[mulai:selesai + 1])\n        except json.JSONDecodeError:\n            return None\n    return None'
      }
    },
    {
      id: 'm11-l4',
      title: 'RAG — Retrieval Augmented Generation',
      duration: 28,
      objectives: ['Memahami alur RAG', 'Memotong dokumen jadi chunk yang tepat', 'Menyusun prompt yang bersumber pada konteks'],
      quiz: [
        { id: 'm11-l4-q1', type: 'mcq', question: 'RAG dipilih dibanding fine-tuning ketika ...', options: ['Ingin mengubah gaya bicara model', 'Ingin model tahu isi dokumen kita', 'Ingin model lebih cepat', 'Ingin model lebih kecil'], answer: 1,
          explanation: 'Fine-tuning untuk mengubah perilaku, RAG untuk menambah pengetahuan faktual.' },
        { id: 'm11-l4-q2', type: 'mcq', question: 'Urutan alur RAG yang benar adalah ...', options: ['Generate → retrieve → chunk', 'Chunk → embed → retrieve → generate', 'Embed → generate → chunk', 'Retrieve → chunk → embed'], answer: 1,
          explanation: 'Cari dulu potongan yang relevan, baru minta model menjawab dari situ.' },
        { id: 'm11-l4-q3', type: 'mcq', question: 'Chunk yang terlalu besar menyebabkan ...', options: ['Konteks jadi berisi banyak informasi tidak relevan', 'Model error', 'Pencarian gagal total', 'Biaya jadi nol'], answer: 0,
          explanation: 'Terlalu kecil pun bermasalah: konteksnya terputus.' },
        { id: 'm11-l4-q4', type: 'mcq', question: 'Kalau jawaban RAG ngawur, yang pertama diperiksa adalah ...', options: ['Ganti model yang lebih besar', 'Potongan dokumen yang berhasil diambil', 'Temperature', 'Ukuran max_tokens'], answer: 1,
          explanation: 'Kalau manusia saja tidak bisa menjawab dari potongan itu, model juga tidak bisa.' },
        { id: 'm11-l4-q5', type: 'true_false', question: 'Prompt RAG sebaiknya memerintahkan model mengaku kalau jawabannya tidak ada di konteks.', answer: true,
          explanation: 'Tanpa itu, model akan kembali mengarang.' }
      ],
      coding: {
        packages: [],
        prompt: 'Buat fungsi `potong(teks, ukuran=500, tumpang=100)` yang memecah teks jadi list potongan dengan tumpang tindih.\n\n- Tiap potongan panjangnya maksimal `ukuran`\n- Potongan berikutnya dimulai `ukuran - tumpang` karakter setelah potongan sebelumnya\n- Teks kosong menghasilkan list kosong',
        starter_code: 'def potong(teks, ukuran=500, tumpang=100):\n    pass\n',
        tests: [
          { name: 'Teks pendek jadi satu potongan', code: 'assert potong("halo", 500, 100) == ["halo"]' },
          { name: 'Teks kosong -> list kosong', code: 'assert potong("", 500, 100) == []' },
          { name: 'Pemotongan dengan tumpang tindih', code: 'h = potong("abcdefghij", 5, 2)\nassert h[0] == "abcde" and h[1] == "defgh", h' },
          { name: 'Tidak ada potongan yang melebihi ukuran', code: 'h = potong("x" * 1000, 300, 50)\nassert all(len(p) <= 300 for p in h)' },
          { name: 'Seluruh teks tercakup', code: 'teks = "".join(str(i % 10) for i in range(250))\nh = potong(teks, 100, 20)\nassert h[-1].endswith(teks[-5:])' }
        ],
        hints: ['Pakai while i < len(teks) dan naikkan i sebesar (ukuran - tumpang).', 'Jaga agar langkahnya tidak nol atau negatif.'],
        solution: 'def potong(teks, ukuran=500, tumpang=100):\n    if not teks:\n        return []\n    langkah = max(1, ukuran - tumpang)\n    potongan = []\n    i = 0\n    while i < len(teks):\n        potongan.append(teks[i:i + ukuran])\n        if i + ukuran >= len(teks):\n            break\n        i += langkah\n    return potongan'
      }
    },
    {
      id: 'm11-l5',
      title: 'Memakai API LLM',
      duration: 26,
      runtime: 'pyodide-limited',
      objectives: ['Memanggil API LLM dengan aman', 'Mengelola riwayat & biaya', 'Menangani rate limit dan kegagalan'],
      quiz: [
        { id: 'm11-l5-q1', type: 'mcq', question: 'API key sebaiknya disimpan di ...', options: ['Langsung di dalam kode', 'Environment variable / file .env yang di-gitignore', 'Nama file', 'Komentar kode'], answer: 1,
          explanation: 'Key yang ter-push ke repo publik biasanya ditemukan bot dalam hitungan menit.' },
        { id: 'm11-l5-q2', type: 'mcq', question: 'Kode error 429 artinya ...', options: ['Key salah', 'Kena rate limit — tunggu lalu coba lagi', 'Server rusak permanen', 'Permintaan tidak valid'], answer: 1,
          explanation: '429 dan 5xx layak di-retry; 400 dan 401 tidak.' },
        { id: 'm11-l5-q3', type: 'mcq', question: 'Exponential backoff berarti ...', options: ['Mengulang secepat mungkin', 'Jeda antar percobaan makin lama: 1s, 2s, 4s', 'Membatalkan permintaan', 'Memakai beberapa key'], answer: 1,
          explanation: 'Memberi waktu server pulih dan menghindari membanjiri rate limit.' },
        { id: 'm11-l5-q4', type: 'mcq', question: 'Agar biaya percakapan panjang tidak membengkak, yang dilakukan adalah ...', options: ['Menaikkan temperature', 'Memangkas atau meringkas riwayat lama', 'Mematikan streaming', 'Memakai prompt lebih panjang'], answer: 1,
          explanation: 'Seluruh riwayat ikut terkirim tiap permintaan dan ditagih sebagai token input.' },
        { id: 'm11-l5-q5', type: 'true_false', question: 'Streaming membuat total waktu pemrosesan jadi lebih cepat.', answer: false,
          explanation: 'Totalnya sama — yang berubah adalah teks mulai terlihat lebih cepat.' }
      ],
      coding: {
        packages: [],
        prompt: 'Buat dua fungsi:\n\n- `perlu_retry(kode)` → `True` untuk kode `429` dan semua `5xx`, `False` untuk sisanya\n- `pangkas_riwayat(riwayat, maks_pesan)` → kembalikan `maks_pesan` **pesan terakhir**, tapi kalau pesan pertama ber-`role` `"system"`, pesan itu harus selalu dipertahankan di posisi awal.',
        starter_code: 'def perlu_retry(kode):\n    pass\n\n\ndef pangkas_riwayat(riwayat, maks_pesan):\n    pass\n',
        tests: [
          { name: '429 dan 5xx perlu retry', code: 'assert perlu_retry(429) and perlu_retry(500) and perlu_retry(529)' },
          { name: '400 dan 401 tidak di-retry', code: 'assert not perlu_retry(400) and not perlu_retry(401) and not perlu_retry(200)' },
          { name: 'Memangkas ke pesan terakhir', code: 'r = [{"role": "user", "content": str(i)} for i in range(5)]\nassert [m["content"] for m in pangkas_riwayat(r, 2)] == ["3", "4"]' },
          { name: 'System prompt dipertahankan', code: 'r = [{"role": "system", "content": "aturan"}] + [{"role": "user", "content": str(i)} for i in range(5)]\nh = pangkas_riwayat(r, 3)\nassert h[0]["role"] == "system" and len(h) == 3 and h[-1]["content"] == "4"' },
          { name: 'Riwayat pendek tidak berubah', code: 'r = [{"role": "user", "content": "a"}]\nassert pangkas_riwayat(r, 5) == r' }
        ],
        hints: ['perlu_retry: kode == 429 atau 500 <= kode < 600.', 'Kalau ada system prompt, sisakan (maks_pesan - 1) pesan terakhir lalu tempelkan system di depan.'],
        solution: 'def perlu_retry(kode):\n    return kode == 429 or 500 <= kode < 600\n\n\ndef pangkas_riwayat(riwayat, maks_pesan):\n    if len(riwayat) <= maks_pesan:\n        return riwayat\n    if riwayat and riwayat[0].get("role") == "system":\n        sisa = max(0, maks_pesan - 1)\n        return [riwayat[0]] + riwayat[len(riwayat) - sisa:]\n    return riwayat[len(riwayat) - maks_pesan:]'
      }
    }
  ],
  exam: {
    title: 'Ujian Modul 11 — LLM & AI Generatif',
    questionCount: 10,
    passScore: 75,
    extraQuestions: [
      { id: 'm11-x1', type: 'mcq', question: 'Tahap pelatihan LLM yang memberi pengetahuan luas adalah ...', options: ['Pre-training', 'Fine-tuning', 'RLHF', 'Prompting'], answer: 0,
        explanation: 'Fine-tuning dan RLHF mengajarkan kepatuhan dan gaya, bukan menambah pengetahuan.' },
      { id: 'm11-x2', type: 'mcq', question: 'Bahasa Indonesia umumnya butuh token LEBIH BANYAK dari bahasa Inggris untuk teks setara, artinya ...', options: ['Lebih murah', 'Sedikit lebih mahal', 'Tidak berpengaruh', 'Tidak bisa diproses'], answer: 1,
        explanation: 'Tokenizer sebagian besar model dilatih dominan pada bahasa Inggris.' },
      { id: 'm11-x3', type: 'true_false', question: 'Halusinasi bisa dihilangkan sepenuhnya dengan prompt yang tepat.', answer: false,
        explanation: 'Bisa dikurangi drastis, tapi ini sifat bawaan cara kerja model.' },
      { id: 'm11-x4', type: 'mcq', question: 'Hybrid search menggabungkan ...', options: ['Dua model LLM', 'Pencarian kata kunci dan pencarian semantik', 'RAG dan fine-tuning', 'Dua vector database'], answer: 1,
        explanation: 'Menutupi kelemahan masing-masing pendekatan.' }
    ],
    coding: [
      {
        id: 'm11-e-c1',
        packages: NP,
        prompt: 'Bangun mini RAG. Buat fungsi `jawab(pertanyaan, pertanyaan_vec, potongan, index, k=2)` yang:\n\n1. Mencari `k` potongan paling mirip dengan `pertanyaan_vec` (cosine similarity)\n2. Menyusun prompt berisi potongan itu, dinomori `[1]`, `[2]`, dst.\n3. Mengembalikan dict `{"prompt": str, "sumber": [index...]}`\n\nPrompt wajib memuat kalimat `"HANYA berdasarkan konteks"` dan teks pertanyaannya.',
        starter_code: 'import numpy as np\n\ndef jawab(pertanyaan, pertanyaan_vec, potongan, index, k=2):\n    pass\n',
        tests: [
          { name: 'Mengembalikan dua kunci', code: 'import numpy as np\np = ["tentang kucing", "tentang mobil"]\nidx = np.array([[1., 0.], [0., 1.]])\nh = jawab("kucing?", np.array([1., 0.]), p, idx, 1)\nassert set(h.keys()) == {"prompt", "sumber"}' },
          { name: 'Sumber yang dipilih benar', code: 'import numpy as np\np = ["tentang kucing", "tentang mobil"]\nidx = np.array([[1., 0.], [0., 1.]])\nassert jawab("mobil?", np.array([0., 1.]), p, idx, 1)["sumber"] == [1]' },
          { name: 'Potongan masuk ke prompt', code: 'import numpy as np\np = ["tentang kucing", "tentang mobil"]\nidx = np.array([[1., 0.], [0., 1.]])\nassert "tentang kucing" in jawab("kucing?", np.array([1., 0.]), p, idx, 1)["prompt"]' },
          { name: 'Pertanyaan ikut masuk ke prompt', code: 'import numpy as np\np = ["a", "b"]\nidx = np.array([[1., 0.], [0., 1.]])\nassert "Berapa lama cutinya?" in jawab("Berapa lama cutinya?", np.array([1., 0.]), p, idx, 1)["prompt"]' },
          { name: 'Prompt memuat instruksi pembatas', code: 'import numpy as np\np = ["a", "b"]\nidx = np.array([[1., 0.], [0., 1.]])\nassert "HANYA berdasarkan konteks" in jawab("q", np.array([1., 0.]), p, idx, 1)["prompt"]' },
          { name: 'Potongan dinomori', code: 'import numpy as np\np = ["aaa", "bbb"]\nidx = np.array([[1., 0.], [0.9, 0.1]])\npr = jawab("q", np.array([1., 0.]), p, idx, 2)["prompt"]\nassert "[1]" in pr and "[2]" in pr' }
        ],
        hints: ['Hitung cosine similarity pertanyaan_vec terhadap tiap baris index, lalu np.argsort(-skor)[:k].', 'Susun konteks dengan enumerate supaya nomornya mulai dari 1.', 'Jangan lupa menyisipkan teks pertanyaan ke dalam prompt.'],
        solution: 'import numpy as np\n\ndef jawab(pertanyaan, pertanyaan_vec, potongan, index, k=2):\n    nq = np.linalg.norm(pertanyaan_vec)\n    nd = np.linalg.norm(index, axis=1)\n    penyebut = nq * nd\n    aman = np.where(penyebut == 0, 1, penyebut)\n    skor = np.where(penyebut == 0, 0.0, (index @ pertanyaan_vec) / aman)\n    terpilih = [int(i) for i in np.argsort(-skor)[:k]]\n\n    konteks = "\\n\\n".join(f"[{n + 1}] {potongan[i]}" for n, i in enumerate(terpilih))\n    prompt = (\n        "Jawab pertanyaan HANYA berdasarkan konteks di bawah.\\n"\n        "Kalau jawabannya tidak ada, katakan: Tidak ada informasinya di dokumen.\\n\\n"\n        f"Konteks:\\n{konteks}\\n\\nPertanyaan: {pertanyaan}\\nJawaban:"\n    )\n    return {"prompt": prompt, "sumber": terpilih}'
      }
    ]
  }
};
