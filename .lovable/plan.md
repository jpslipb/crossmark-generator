# Crossref Crossmark XML Generator

Aplikasi web untuk pengelola jurnal ilmiah membuat file XML deposit Crossmark, baik untuk metadata awal maupun koreksi (corrigendum/erratum/retraction). Semua output mengikuti schema Crossref **4.4.2**.

## Halaman utama (`/`)

Single-page form dengan dua mode dipilih lewat tab di atas:

### Tab 1 — Initial Metadata

Bagian **Depositor** (sekali isi, dipakai untuk seluruh batch):

- Depositor name _(wajib)_
- Email address _(wajib, validasi format email)_
- DOI Crossmark Policy _(wajib, contoh: `10.29244/medkon.crossmark`)_

Bagian **Artikel** — daftar dinamis (tombol "Tambah artikel" / hapus per baris). Setiap artikel:

- DOI artikel _(wajib)_
- Publication history _(semua opsional, input tanggal `YYYY-MM-DD`)_:
  - Submitted
  - Final Revised
  - Accepted
  - Published Online

Jika satu pun field publication history diisi → blok `<custom_metadata>` dengan `<assertion>` yang relevan akan dimasukkan (mengikuti pola file `medkon-crossmark-metadata.xml`, tanpa fundref dan tanpa `crossmark_domains`). Jika kosong → hanya `crossmark_version` + `crossmark_policy`.

### Tab 2 — Correction (Corrigendum / Erratum / Retraction)

Bagian **Depositor** (sama seperti di atas, minus DOI policy yang tidak diperlukan untuk koreksi — mengikuti contoh `crossmark-correction-30.3.423.xml`).

Bagian **Koreksi** — daftar dinamis. Setiap entri:

- DOI artikel yang dikoreksi _(wajib)_ — jadi target `<doi>` & `<update>`
- Jenis koreksi _(wajib, dropdown)_: `correction`, `erratum`, `retraction`
- Tanggal koreksi _(wajib, `YYYY-MM-DD`)_
- DOI Crossmark Policy _(wajib)_
- DOI artikel pengoreksi _(opsional)_ — jika diisi, ikut disisipkan ke teks `correction_item`
- Deskripsi correction*item *(wajib, textarea)\_ — contoh: "Correction on authors' name and affiliation."

XML yang dihasilkan mengikuti struktur file koreksi contoh: `<crossmark>` berisi `<crossmark_policy>`, `<updates><update type="…" date="…">DOI</update></updates>`, dan `<custom_metadata><assertion name="correction_item" …>`.

## Output panel

Di bawah form, muncul setelah klik **Generate XML**:

- Preview XML berformat rapi (monospace, syntax-highlighted ringan, scrollable)
- Tombol **Copy to clipboard** (toast konfirmasi)
- Tombol **Download .xml** dengan nama otomatis:
  - Initial: `crossmark-initial-<timestamp>.xml`
  - Correction: `crossmark-correction-<timestamp>.xml`

## Validasi & UX

- Validasi sisi-klien dengan zod + react-hook-form: required, format email, format DOI (`^10\.\d{4,9}/.+`), format tanggal.
- Pesan error inline di tiap field; tombol Generate disabled sampai form valid.
- Tooltip "?" singkat di tiap label menjelaskan isi field (contoh DOI, format tanggal).
- Header singkat menjelaskan tujuan tool + link kecil ke dokumentasi Crossmark Crossref.
- Dukungan dark mode otomatis lewat token desain yang sudah ada.

## Struktur teknis

- Route baru: `src/routes/index.tsx` (ganti placeholder).
- Komponen: `CrossmarkForm` (tabs), `InitialForm`, `CorrectionForm`, `ArticleRow`, `CorrectionRow`, `XmlOutput`.
- Builder murni TypeScript di `src/lib/crossmark-xml.ts` (dua fungsi: `buildInitialXml(data)` & `buildCorrectionXml(data)`) — escape karakter `& < > " '` dengan benar; output ter-indent 2 spasi.
- Skema validasi di `src/lib/crossmark-schema.ts` (zod).
- Memakai komponen shadcn yang sudah ada: `tabs`, `card`, `input`, `textarea`, `button`, `select`, `label`, `form`, `tooltip`, `sonner` untuk toast.

Setelah disetujui, saya akan membangun semuanya dalam satu pass.
