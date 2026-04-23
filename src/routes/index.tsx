import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileCode2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { InitialForm } from "@/components/crossmark/InitialForm";
import { CorrectionForm } from "@/components/crossmark/CorrectionForm";
import mediaKonservasiLogo from "@/assets/media-konservasi.svg?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Media Konservasi — Crossmark XML Generator" },
      {
        name: "description",
        content:
          "Generator XML deposit Crossref Crossmark untuk Media Konservasi: metadata awal dan koreksi (corrigendum/erratum/retraction). Schema 4.4.2.",
      },
      { property: "og:title", content: "Media Konservasi — Crossmark XML Generator" },
      {
        property: "og:description",
        content: "Buat file XML deposit Crossmark dengan mudah — initial metadata & corrections.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/40">
          <div className="mx-auto max-w-5xl px-4 py-6 md:py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
                  <img
                    src={mediaKonservasiLogo}
                    alt="Media Konservasi"
                    className="h-12 w-auto md:h-14"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold tracking-wide text-primary">
                    Media Konservasi
                  </p>
                  <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                    Crossmark XML Generator
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Bangun file XML deposit Crossmark untuk metadata awal maupun koreksi
                    (corrigendum / erratum / retraction). Output mengikuti schema Crossref 4.4.2.
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <a
                      href="https://www.crossref.org/documentation/crossmark/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      Dokumentasi Crossmark Crossref
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start md:self-auto">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileCode2 className="size-5" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6 md:py-8">
          <Tabs defaultValue="initial" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="initial">Initial Metadata</TabsTrigger>
              <TabsTrigger value="correction">Correction</TabsTrigger>
            </TabsList>

            <TabsContent value="initial" className="mt-6">
              <InitialForm />
            </TabsContent>

            <TabsContent value="correction" className="mt-6">
              <CorrectionForm />
            </TabsContent>
          </Tabs>
        </main>
        <footer className="border-t bg-card/40">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p>
                Aplikasi ini tidak menyimpan data pribadi. Semua data form dihapus setelah sesi
                berakhir.
              </p>
              <p>
                Dikembangkan oleh Media Konservasi (2026). Aplikasi ini dapat digunakan secara
                gratis oleh siapa saja.
              </p>
            </div>
            <a
              href="/privacy"
              className="shrink-0 text-xs font-medium text-primary hover:underline"
            >
              Kebijakan privasi
            </a>
          </div>
        </footer>

        <Toaster richColors closeButton position="top-right" />
      </div>
    </TooltipProvider>
  );
}
