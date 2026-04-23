import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Kebijakan Privasi — Media Konservasi Crossmark XML" },
      {
        name: "description",
        content:
          "Penjelasan bagaimana aplikasi Media Konservasi Crossmark XML Generator memproses dan melindungi data pengguna.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <main className="mx-auto w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Media Konservasi
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Kebijakan Privasi Pengguna</h1>
          <p className="text-sm text-muted-foreground">
            Halaman ini menjelaskan bagaimana aplikasi ini memproses data yang Anda masukkan saat
            membuat berkas XML Crossref Crossmark.
          </p>
        </header>

        <section className="space-y-3 rounded-lg border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">
            1. Tidak menyimpan data pribadi
          </h2>
          <p>
            Aplikasi ini tidak menyimpan data pribadi apa pun, termasuk nama, alamat email, maupun
            informasi identitas lain. Seluruh isian form hanya diproses di sisi server untuk
            menghasilkan berkas XML yang dapat Anda unduh.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">
            2. Data input tidak dipertahankan
          </h2>
          <p>
            Setiap data yang Anda input akan dihapus segera setelah sesi penggunaan berakhir. Tidak
            ada database atau penyimpanan jangka panjang yang digunakan untuk menyimpan isi form
            atau berkas XML yang dihasilkan.
          </p>
          <p>
            Setelah Anda menutup tab browser, berpindah halaman, atau aplikasi berhenti berjalan di
            server, data yang pernah dikirim tidak lagi dipertahankan oleh sistem.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">
            3. Penggunaan hanya untuk keperluan pemrosesan Crossmark
          </h2>
          <p>
            Data yang Anda isi digunakan semata-mata untuk menyusun struktur XML deposit Crossref
            Crossmark sesuai skema yang berlaku. Data tersebut tidak digunakan untuk analitik,
            pelacakan, maupun dibagikan ke pihak lain oleh aplikasi ini.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">
            4. Tanggung jawab pengelolaan berkas
          </h2>
          <p>
            Setelah berkas XML diunduh, pengelolaan berkas sepenuhnya menjadi tanggung jawab
            pengguna dan pengelola jurnal. Pastikan berkas disimpan dan diperlakukan sesuai
            kebijakan internal jurnal dan ketentuan Crossref.
          </p>
        </section>

        <footer className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>Aplikasi pendukung Media Konservasi Crossmark XML Generator.</span>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Kembali ke beranda
          </Link>
        </footer>
      </main>
    </div>
  );
}
