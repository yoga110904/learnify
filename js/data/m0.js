export default {
  id: 'm0',
  title: 'Persiapan',
  icon: '🚀',
  tagline: 'Kenalan dengan Python sebelum ngoding.',
  desc: 'Apa itu bahasa pemrograman, kenapa Python, dan cara menjalankan kode.',
  badge: { id: 'b-m0', icon: '🚀', name: 'Siap Berangkat', desc: 'Menyelesaikan modul Persiapan' },
  lessons: [
    {
      id: 'm0-l1',
      title: 'Apa itu Python?',
      duration: 12,
      objectives: [
        'Memahami apa itu bahasa pemrograman',
        'Tahu Python dipakai untuk apa saja',
        'Paham arti bahasa interpreted'
      ],
      quiz: [
        {
          id: 'm0-l1-q1', type: 'mcq',
          question: 'Python termasuk bahasa yang ...',
          options: ['Dikompilasi ke file .exe dulu baru bisa jalan', 'Diinterpretasi baris per baris', 'Hanya bisa dipakai untuk web', 'Hanya bisa dipakai untuk AI'],
          answer: 1,
          explanation: 'Python dijalankan oleh interpreter baris per baris, jadi tidak perlu proses build sebelum dijalankan.'
        },
        {
          id: 'm0-l1-q2', type: 'true_false',
          question: 'Python hanya bisa dipakai untuk data science.',
          answer: false,
          explanation: 'Python dipakai untuk web, otomasi, scripting, dan terutama data science & AI.'
        },
        {
          id: 'm0-l1-q3', type: 'mcq',
          question: 'Kenapa Python sering direkomendasikan sebagai bahasa pertama?',
          options: ['Karena paling cepat dieksekusi', 'Karena sintaksnya ringkas dan mirip bahasa Inggris', 'Karena satu-satunya bahasa gratis', 'Karena wajib dipakai di semua perusahaan'],
          answer: 1,
          explanation: 'Kelebihan utama Python adalah keterbacaan: sedikit kode untuk hasil yang sama.'
        }
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
      duration: 15,
      objectives: [
        'Tahu beda REPL, file .py, dan editor',
        'Bisa menjalankan file Python dari terminal',
        'Bisa menulis komentar'
      ],
      quiz: [
        {
          id: 'm0-l2-q1', type: 'mcq',
          question: 'Simbol untuk komentar satu baris di Python adalah ...',
          options: ['//', '#', '--', '/* */'],
          answer: 1,
          explanation: 'Python memakai # untuk komentar satu baris.'
        },
        {
          id: 'm0-l2-q2', type: 'mcq',
          question: 'Perintah terminal untuk menjalankan file app.py adalah ...',
          options: ['run app.py', 'python app.py', 'start app.py', 'py run app'],
          answer: 1,
          explanation: 'Formatnya: python <nama_file>. Di sebagian sistem perlu python3.'
        },
        {
          id: 'm0-l2-q3', type: 'predict_output',
          question: 'Apa output dari kode ini?',
          code: 'print("A")\n# print("B")\nprint("C")',
          answer: 'A\nC',
          explanation: 'Baris yang diawali # diabaikan Python, jadi "B" tidak ikut tercetak.'
        }
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
    }
  ]
};
