export default {
  id: 'm0',
  title: 'Persiapan',
  icon: '🚀',
  tagline: 'Kenalan dengan Python, error, dan cara belajar yang benar.',
  desc: 'Bekal sebelum ngoding: apa itu Python, cara menjalankannya, membaca error, dan cara belajar yang efektif.',
  badge: { id: 'b-m0', icon: '🚀', name: 'Siap Berangkat', desc: 'Menyelesaikan modul Persiapan' },
  lessons: [
    {
      id: 'm0-l1',
      title: 'Apa itu Python?',
      duration: 15,
      objectives: [
        'Memahami apa itu bahasa pemrograman',
        'Tahu kenapa Python jadi bahasa utama AI',
        'Paham arti bahasa interpreted dan akibatnya'
      ],
      quiz: [
        { id: 'm0-l1-q1', type: 'mcq', question: 'Python termasuk bahasa yang ...', options: ['Dikompilasi ke file .exe dulu baru bisa jalan', 'Diinterpretasi baris per baris', 'Hanya bisa dipakai untuk web', 'Hanya bisa dipakai untuk AI'], answer: 1,
          explanation: 'Python dijalankan oleh interpreter baris per baris, jadi tidak perlu proses build sebelum dijalankan.' },
        { id: 'm0-l1-q2', type: 'true_false', question: 'Python hanya bisa dipakai untuk data science.', answer: false,
          explanation: 'Python dipakai untuk web, otomasi, scripting, keuangan, dan terutama AI.' },
        { id: 'm0-l1-q3', type: 'mcq', question: 'Kenapa Python sering direkomendasikan sebagai bahasa pertama?', options: ['Karena paling cepat dieksekusi', 'Karena sintaksnya ringkas dan mirip bahasa Inggris', 'Karena satu-satunya bahasa gratis', 'Karena wajib dipakai di semua perusahaan'], answer: 1,
          explanation: 'Kelebihan utama Python adalah keterbacaan: sedikit kode untuk hasil yang sama.' },
        { id: 'm0-l1-q4', type: 'mcq', question: 'Python "lambat" tapi tetap jadi bahasa utama AI. Kenapa?', options: ['Karena AI memang tidak butuh kecepatan', 'Karena perhitungan beratnya dijalankan kode C/GPU, Python cuma jadi remote control-nya', 'Karena Python otomatis dikompilasi', 'Karena datanya selalu kecil'], answer: 1,
          explanation: 'Kamu dapat kenyamanan Python dengan kecepatan C.' },
        { id: 'm0-l1-q5', type: 'predict_output', question: 'Apa output kode berikut?', code: 'print("baris 1")\nprin("baris 2")\nprint("baris 3")', answer: 'baris 1',
          explanation: 'Interpreter menjalankan baris 1 dulu, lalu berhenti di baris 2 karena NameError. Baris 3 tidak pernah dijalankan.' },
        { id: 'm0-l1-q6', type: 'mcq', question: 'Tutorial yang menulis print "halo" tanpa kurung itu memakai ...', options: ['Python 3 versi lama', 'Python 2 yang sudah pensiun', 'Sintaks yang masih valid', 'Bahasa lain'], answer: 1,
          explanation: 'Python 2 resmi pensiun sejak 2020. Di Python 3 wajib pakai kurung.' }
      ],
      coding: {
        prompt: 'Tampilkan teks **Halo Dunia** ke layar menggunakan `print()`.',
        starter_code: '# tulis kode di sini\n',
        tests: [
          { name: 'Output-nya "Halo Dunia"', code: 'assert OUTPUT == "Halo Dunia", f"Output kamu: {OUTPUT!r}"' }
        ],
        hints: ['Gunakan fungsi print().', 'Teks harus diapit tanda kutip: print("Halo Dunia")'],
        solution: 'print("Halo Dunia")'
      }
    },
    {
      id: 'm0-l2',
      title: 'Menjalankan Kode Python',
      duration: 18,
      objectives: [
        'Tahu beda REPL, file .py, dan editor',
        'Bisa menjalankan file Python dari terminal',
        'Menulis komentar yang berguna'
      ],
      quiz: [
        { id: 'm0-l2-q1', type: 'mcq', question: 'Simbol untuk komentar satu baris di Python adalah ...', options: ['//', '#', '--', '/* */'], answer: 1,
          explanation: 'Python memakai # untuk komentar satu baris.' },
        { id: 'm0-l2-q2', type: 'mcq', question: 'Perintah terminal untuk menjalankan file app.py adalah ...', options: ['run app.py', 'python3 app.py', 'start app.py', 'py run app'], answer: 1,
          explanation: 'Formatnya: python3 <nama_file>. Di Windows biasanya cukup python.' },
        { id: 'm0-l2-q3', type: 'predict_output', question: 'Apa output dari kode ini?', code: 'print("A")\n# print("B")\nprint("C")', answer: 'A\nC',
          explanation: 'Baris yang diawali # diabaikan Python, jadi "B" tidak ikut tercetak.' },
        { id: 'm0-l2-q4', type: 'mcq', question: 'Di REPL kamu ketik 5 * 3 dan langsung muncul 15. Di file .py hal yang sama tidak muncul apa-apa. Kenapa?', options: ['File .py lebih lambat', 'REPL otomatis mencetak hasil ekspresi, file .py tidak', 'Sintaksnya berbeda', 'File .py perlu dikompilasi'], answer: 1,
          explanation: 'Huruf P di REPL berarti Print. Di file, harus eksplisit print().' },
        { id: 'm0-l2-q5', type: 'mcq', question: 'Komentar yang baik menjelaskan ...', options: ['Apa yang kode lakukan', 'Kenapa kode itu ada / alasannya', 'Siapa yang menulisnya', 'Kapan ditulis'], answer: 1,
          explanation: 'Komentar yang cuma mengulang "apa" biasanya tanda nama variabelnya perlu diperbaiki.' },
        { id: 'm0-l2-q6', type: 'true_false', question: 'Error "python: command not found" bisa terjadi karena lupa mencentang "Add Python to PATH" saat install.', answer: true,
          explanation: 'Ini penyebab nomor satu di Windows. Solusinya install ulang dengan opsi itu dicentang.' }
      ],
      coding: {
        prompt: 'Tampilkan dua baris teks:\n\n```\nNama: Budi\nHobi: Coding\n```',
        starter_code: '',
        tests: [
          { name: 'Baris pertama benar', code: 'assert len(LINES) >= 1 and LINES[0] == "Nama: Budi", f"Output kamu: {STDOUT!r}"' },
          { name: 'Baris kedua benar', code: 'assert len(LINES) >= 2 and LINES[1] == "Hobi: Coding", f"Output kamu: {STDOUT!r}"' }
        ],
        hints: ['Butuh dua kali print().', 'Bisa juga satu print dengan \\n di tengahnya.'],
        solution: 'print("Nama: Budi")\nprint("Hobi: Coding")'
      }
    },
    {
      id: 'm0-l3',
      title: 'Membaca Error & Dokumentasi',
      duration: 22,
      objectives: [
        'Membaca traceback dari bawah ke atas',
        'Mengenali jenis error yang paling sering muncul',
        'Punya resep debugging yang runtut'
      ],
      quiz: [
        { id: 'm0-l3-q1', type: 'mcq', question: 'Traceback Python sebaiknya dibaca ...', options: ['Dari atas ke bawah', 'Dari bawah ke atas', 'Acak saja', 'Cukup baris tengahnya'], answer: 1,
          explanation: 'Baris terakhir memuat jenis error dan penjelasannya — itu yang paling informatif.' },
        { id: 'm0-l3-q2', type: 'mcq', question: 'int("abc") menghasilkan error jenis ...', options: ['SyntaxError', 'ValueError', 'TypeError', 'NameError'], answer: 1,
          explanation: 'Tipenya sudah benar (string), tapi isinya tidak bisa dijadikan angka.' },
        { id: 'm0-l3-q3', type: 'mcq', question: 'Memakai variabel yang belum pernah dibuat menghasilkan ...', options: ['NameError', 'ValueError', 'KeyError', 'IndexError'], answer: 0,
          explanation: 'Pesan lengkapnya: name \'x\' is not defined.' },
        { id: 'm0-l3-q4', type: 'mcq', question: 'Untuk memastikan isi sebenarnya sebuah variabel saat debugging, baris yang paling berguna adalah ...', options: ['print(x)', 'print(type(x), repr(x))', 'del x', 'x = None'], answer: 1,
          explanation: 'repr() membedakan "20" (string) dari 20 (angka) yang kalau di-print biasa terlihat sama.' },
        { id: 'm0-l3-q5', type: 'mcq', question: 'IndentationError sering disebabkan oleh ...', options: ['Nama variabel terlalu panjang', 'Campuran tab dan spasi', 'Kurang komentar', 'File terlalu besar'], answer: 1,
          explanation: 'Setel editor untuk selalu memakai 4 spasi.' },
        { id: 'm0-l3-q6', type: 'mcq', question: 'Pada dokumentasi str.split(sep=None, maxsplit=-1), argumen sep itu ...', options: ['Wajib diisi', 'Opsional karena punya nilai default', 'Tidak boleh diisi', 'Hanya untuk angka'], answer: 1,
          explanation: 'Tanda = pada tanda tangan fungsi menandakan argumen itu opsional.' },
        { id: 'm0-l3-q7', type: 'true_false', question: 'Saat bertanya di forum, cukup mengirim screenshot error tanpa kodenya.', answer: false,
          explanation: 'Sertakan tujuan, kode minimal yang masih error, traceback lengkap sebagai teks, dan yang sudah dicoba.' }
      ],
      coding: {
        prompt: 'Kode di editor punya **tiga bug**. Perbaiki supaya `hitung_rata(nilai)` mengembalikan rata-rata isi list, dan mengembalikan `0` kalau listnya kosong.\n\nJalankan dulu untuk melihat error-nya, lalu perbaiki satu per satu.',
        starter_code: 'def hitung_rata(nilai)\n    total = 0\n    for n in nilai:\n        Total = total + n\n    return total / len(nilai)\n',
        tests: [
          { name: 'Rata-rata dihitung benar', code: 'assert hitung_rata([2, 4, 6]) == 4' },
          { name: 'Satu elemen', code: 'assert hitung_rata([5]) == 5' },
          { name: 'List kosong menghasilkan 0 (tanpa error)', code: 'assert hitung_rata([]) == 0' },
          { name: 'Rata-rata desimal benar', code: 'assert abs(hitung_rata([1, 2]) - 1.5) < 1e-9' }
        ],
        hints: [
          'Bug 1 — SyntaxError: baris def kurang sesuatu di ujungnya.',
          'Bug 2 — NameError: Python membedakan huruf besar dan kecil. Perhatikan "Total" dan "total".',
          'Bug 3 — ZeroDivisionError: tambahkan penjagaan kalau list-nya kosong sebelum membagi.'
        ],
        solution: 'def hitung_rata(nilai):\n    if not nilai:\n        return 0\n    total = 0\n    for n in nilai:\n        total = total + n\n    return total / len(nilai)'
      }
    },
    {
      id: 'm0-l4',
      title: 'Cara Belajar Coding yang Efektif',
      duration: 15,
      objectives: [
        'Membedakan belajar aktif dan pasif',
        'Punya aturan kapan boleh melihat solusi',
        'Menyusun jadwal belajar yang realistis'
      ],
      quiz: [
        { id: 'm0-l4-q1', type: 'mcq', question: 'Cara belajar yang paling efektif adalah ...', options: ['Menonton video sebanyak mungkin', 'Mengambil informasi dari kepala: menebak output, menulis ulang dari ingatan', 'Membaca dokumentasi dari A sampai Z', 'Menyalin kode sebanyak-banyaknya'], answer: 1,
          explanation: 'Belajar aktif membuat ingatan jauh lebih melekat daripada menerima informasi secara pasif.' },
        { id: 'm0-l4-q2', type: 'mcq', question: 'Setelah membaca solusi yang tadi tidak bisa kamu kerjakan, langkah berikutnya adalah ...', options: ['Lanjut ke lesson berikutnya', 'Menutup solusinya lalu menulis ulang dari nol', 'Menyalin solusinya ke catatan', 'Mengulang membacanya 3 kali'], answer: 1,
          explanation: 'Mengenali solusi jauh lebih mudah daripada memproduksinya — itu namanya illusion of competence.' },
        { id: 'm0-l4-q3', type: 'mcq', question: 'Mana jadwal belajar yang lebih efektif?', options: ['5 jam tiap Sabtu', '30 menit tiap hari', '10 jam sekali sebulan', 'Kapan saja saat mood bagus'], answer: 1,
          explanation: 'Pengulangan berjarak memindahkan informasi ke ingatan jangka panjang.' },
        { id: 'm0-l4-q4', type: 'true_false', question: 'Mengetik ulang kode contoh lebih berguna daripada copy-paste.', answer: true,
          explanation: 'Kamu terpaksa membaca tiap karakter, dan typo yang muncul melatihmu membaca error.' },
        { id: 'm0-l4-q5', type: 'mcq', question: 'Aturan "ubah satu hal" artinya ...', options: ['Menulis ulang seluruh kode', 'Mengubah satu bagian, menebak akibatnya, lalu menjalankan', 'Mengganti nama semua variabel', 'Menghapus komentar'], answer: 1,
          explanation: 'Tiga eksperimen 10 detik mengajarkan lebih banyak daripada satu paragraf penjelasan.' },
        { id: 'm0-l4-q6', type: 'mcq', question: 'Kamu mentok di sebuah tantangan. Berapa lama sebaiknya mencoba sendiri sebelum membuka Petunjuk?', options: ['Langsung buka', 'Sekitar 15 menit', '3 jam', 'Tidak usah dibuka sama sekali'], answer: 1,
          explanation: 'Kesulitan yang wajar itu bagian dari proses belajarnya; terlalu lama mentok juga tidak produktif.' }
      ],
      coding: null
    }
  ]
};
