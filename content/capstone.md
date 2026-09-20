## Proyek Akhir: Sistem AI Sederhana

Selamat — kamu sudah menuntaskan jalur Python → Data → Machine Learning → Neural Network → LLM.
Sekarang saatnya membangun satu sistem utuh yang bisa dipajang di CV.

## Pilih satu jalur

### 🅰️ Klasifikasi End-to-End
Bangun model prediksi dari dataset tabel.

- Dataset: Titanic, Telco Churn, Heart Disease, atau data yang kamu kumpulkan sendiri
- Analisis data (EDA) → pembersihan → rekayasa fitur → pemodelan → evaluasi
- Bandingkan minimal 3 model, laporkan metrik yang sesuai (bukan cuma akurasi)
- Bungkus dalam `Pipeline` dan simpan dengan `joblib`

### 🅱️ Mini RAG Chatbot
Chatbot yang menjawab dari dokumenmu sendiri.

- Kumpulkan 10–50 dokumen (PDF, Markdown, catatan kuliah)
- Chunking → embedding → simpan di vector store (Chroma/FAISS)
- Retrieval + prompt yang mewajibkan jawaban bersumber dari konteks
- Antarmuka sederhana (Streamlit atau CLI)

### 🅲 Neural Network dari Nol
Klasifikasi gambar tanpa framework deep learning.

- Dataset: MNIST atau Fashion-MNIST
- Bangun jaringan multi-layer memakai **NumPy saja**
- Implementasikan forward, backward, mini-batch, dan optimizer
- Target minimal 90% akurasi pada data uji

## Struktur proyek yang disarankan

```
proyek-ai/
├── README.md
├── requirements.txt
├── data/
│   ├── raw/
│   └── processed/
├── notebooks/
│   └── 01_eksplorasi.ipynb
├── src/
│   ├── data.py          # memuat & membersihkan
│   ├── features.py      # rekayasa fitur
│   ├── model.py         # melatih & evaluasi
│   └── predict.py       # inferensi
├── models/
│   └── model.pkl
└── app.py               # antarmuka (opsional)
```

## Checklist penilaian

Centang tiap item di panel sebelah setelah benar-benar selesai. Semua tercentang = sertifikat kurikulum terbuka.

1. **Struktur proyek rapi** — ada `README.md`, `requirements.txt`, dan pemisahan kode/data.
2. **Eksplorasi data (EDA)** — statistik deskriptif, nilai kosong, distribusi, minimal 3 visualisasi.
3. **Pembersihan & rekayasa fitur** — penanganan nilai kosong, encoding, penyamaan skala, minimal satu fitur turunan.
4. **Pemisahan data yang benar** — train/test split (atau cross-validation), **tanpa data leakage**.
5. **Minimal 3 model dibandingkan** — lengkap dengan tabel hasilnya.
6. **Evaluasi memakai metrik yang tepat** — bukan cuma akurasi; jelaskan kenapa metrik itu dipilih.
7. **Pipeline / kode bisa diulang** — orang lain bisa menjalankan ulang dan dapat hasil yang sama.
8. **Model tersimpan & bisa dipakai** — ada `predict.py` atau antarmuka sederhana.
9. **README menjelaskan hasil** — masalah, data, metode, hasil, keterbatasan.
10. **Link repo GitHub dikumpulkan** — tempel di kolom yang tersedia.

## Tips supaya nilainya bagus

- **README itu etalase.** Tulis masalahnya, angkanya, dan grafiknya — bukan cuma cara install.
- **Laporkan keterbatasan.** "Model ini lemah pada kelas minoritas karena datanya cuma 3%" menunjukkan kamu paham, bukan kelemahan.
- **Jangan kejar akurasi buta.** Model sederhana yang dipahami lebih berharga daripada tumpukan model yang tidak kamu mengerti.
- **Pastikan `random_state` dipasang** di semua tempat supaya hasilnya bisa diulang.
- **Jangan commit dataset besar.** Sertakan skrip pengunduhnya.
- **Periksa data leakage sekali lagi.** Skor yang terlalu bagus hampir selalu berarti ada kebocoran.

## Setelah selesai

Kamu sudah punya: Python yang kuat, kemampuan mengolah data, pemahaman ML dan neural network sampai ke tingkat matematikanya, plus pengalaman membangun sistem LLM. Langkah berikutnya yang masuk akal:

- **PyTorch / TensorFlow** — sekarang framework-nya akan terasa mudah karena kamu tahu isinya
- **Computer vision** (CNN) atau **NLP** (transformer) untuk pendalaman
- **MLOps** — deployment, monitoring, dan menjaga model tetap sehat di produksi
- **Kaggle** — berkompetisi untuk mengasah kemampuan di data nyata
