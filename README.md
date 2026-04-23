# Media Konservasi — Crossmark XML Generator

Aplikasi web untuk membantu pengelola jurnal **Media Konservasi** menghasilkan berkas **XML deposit Crossref Crossmark** dengan cepat untuk:

- **Initial metadata** (deposit awal Crossmark)
- **Correction item** (corrigendum / erratum / retraction / addendum)

Output mengikuti **schema Crossref 4.4.2** (Crossmark).

## Fitur

- Form terpisah untuk **Initial Metadata** dan **Correction**
- Mendukung input multi-item (tambah beberapa artikel/koreksi dalam satu kali generate)
- Validasi input berbasis schema (langsung memberi tahu field yang perlu dilengkapi)
- Tombol **Reset** untuk mengembalikan form ke kondisi awal
- Halaman **Kebijakan Privasi** dan **Kontak**

## Cara Pakai (Singkat)

1. Buka aplikasi.
2. Pilih tab **Initial Metadata** atau **Correction**.
3. Isi field yang diperlukan (mis. depositor, email, DOI Crossmark policy, DOI artikel, tanggal).
4. Klik **Generate XML** untuk membuat output XML.
5. Salin atau unduh XML yang dihasilkan untuk proses deposit ke Crossref.

Catatan:

- Tombol **Tambah artikel** / **Tambah koreksi** digunakan untuk menambahkan item baru.
- Tombol **Reset** akan menghapus isian form dan menghapus output XML yang sudah dibuat.

## Privasi

Aplikasi ini tidak menyimpan data pribadi (termasuk nama dan alamat email). Seluruh data yang diinput akan dihapus setelah sesi berakhir.

## Development

Persyaratan:

- Node.js **>= 22.12.0**

Menjalankan secara lokal:

```bash
npm install
npm run dev
```

Lint & format:

```bash
npm run lint
npm run format
```

Build:

```bash
npm run build
```

## Deploy

Repository ini disiapkan agar dapat dideploy di Vercel menggunakan konfigurasi `vercel.json`.
