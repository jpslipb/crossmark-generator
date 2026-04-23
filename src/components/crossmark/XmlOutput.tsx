import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Download, Check } from "lucide-react";

interface XmlOutputProps {
  xml: string;
  filenamePrefix: "crossmark-initial" | "crossmark-correction";
}

export function XmlOutput({ xml, filenamePrefix }: XmlOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(xml);
      setCopied(true);
      toast.success("XML disalin ke clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin");
    }
  };

  const handleDownload = () => {
    const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filenamePrefix}-${ts}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File XML diunduh");
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-sm font-semibold">Hasil XML</h3>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Disalin" : "Salin"}
            </Button>
            <Button type="button" size="sm" onClick={handleDownload}>
              <Download className="size-4" />
              Download .xml
            </Button>
          </div>
        </div>
        <pre className="max-h-[480px] overflow-auto rounded-md border bg-muted/50 p-4 text-xs font-mono leading-relaxed whitespace-pre">
          {xml}
        </pre>
      </CardContent>
    </Card>
  );
}
