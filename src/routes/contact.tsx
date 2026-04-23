import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak — Media Konservasi" },
      {
        name: "description",
        content: "Informasi kontak redaksi Media Konservasi (alamat, telepon/faks, dan email).",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <main className="mx-auto w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Media Konservasi
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Kontak</h1>
          <p className="text-sm text-muted-foreground">
            Ada kritik dan masukan? Silakan hubungi redaksi Media Konservasi melalui informasi
            berikut.
          </p>
        </header>

        <section className="space-y-4 rounded-lg border bg-card p-5 text-sm text-muted-foreground">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Alamat Redaksi
            </p>
            <div className="text-sm leading-relaxed text-foreground">
              <p>
                Department of Forest Resource Conservation and Ecotourism, Faculty of Forestry, IPB
                University
              </p>
              <p>Kampus IPB Darmaga, Bogor 16680</p>
            </div>
          </div>

          <div className="grid gap-4 rounded-md bg-muted/20 p-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Phone/Fax
              </p>
              <p className="text-sm text-foreground">62-251-8621947</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                E-mail
              </p>
              <a
                href="mailto:media.konservasi@apps.ipb.ac.id"
                className="text-sm font-medium text-primary hover:underline"
              >
                media.konservasi@apps.ipb.ac.id
              </a>
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>Media Konservasi — Informasi kontak redaksi.</span>
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
