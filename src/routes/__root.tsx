import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import ipbFavicon from "../assets/ipb-favicon.svg?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Media Konservasi — Crossmark XML Generator" },
      {
        name: "description",
        content:
          "Generator Crossref Crossmark XML untuk Media Konservasi: initial metadata dan corrections (corrigendum/erratum/retraction/addendum).",
      },
      { name: "author", content: "Media Konservasi" },
      { property: "og:title", content: "Media Konservasi — Crossmark XML Generator" },
      {
        property: "og:description",
        content:
          "Buat file XML deposit Crossmark untuk metadata awal maupun koreksi dengan mudah. Output mengikuti schema Crossref 4.4.2.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Media Konservasi — Crossmark XML Generator" },
      {
        name: "twitter:description",
        content:
          "Generator Crossref Crossmark XML untuk Media Konservasi: initial metadata dan corrections.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: ipbFavicon },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
