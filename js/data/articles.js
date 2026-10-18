/* Data artikel demo */
const J = [
  {
    id: 1,
    slug: "belajar-flexbox-grid",
    title: "Catatan: Kapan Memakai Grid vs Flexbox",
    category: "web",
    excerpt: "Aturan praktis memilih layout satu dimensi atau dua dimensi.",
    publishedAt: "2026-10-08",
    tags: ["css"],
    content: [
      "Flexbox cocok untuk satu arah: baris tombol, navigasi. Grid cocok untuk dua arah: katalog dan halaman.",
      "Mulailah dari kebutuhan konten, bukan dari kebiasaan.",
    ],
  },
  {
    id: 2,
    slug: "hirarki-tipografi",
    title: "Catatan: Hierarki Tipografi yang Sederhana",
    category: "design",
    excerpt: "Tiga ukuran huruf sering cukup untuk halaman yang jelas.",
    publishedAt: "2026-09-25",
    tags: ["tipografi"],
    content: [
      "Batasi diri pada judul, subjudul, dan isi. Bedakan dengan ukuran dan bobot, bukan dengan banyak warna.",
      "Konsistensi lebih penting daripada variasi.",
    ],
  },
  {
    id: 3,
    slug: "xlookup-vs-vlookup",
    title: "Catatan: XLOOKUP vs VLOOKUP",
    category: "excel",
    excerpt: "Mengapa XLOOKUP lebih aman saat kolom bertambah.",
    publishedAt: "2026-09-15",
    tags: ["formula"],
    content: [
      "VLOOKUP bergantung pada nomor kolom, sehingga mudah rusak saat kolom disisipkan. XLOOKUP merujuk langsung ke rentang.",
      "Contoh: <code>=XLOOKUP(A2, Produk[Kode], Produk[Harga])</code>",
    ],
  },
];
