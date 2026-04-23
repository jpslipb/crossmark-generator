import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, FileCode, RotateCcw } from "lucide-react";

import { correctionSchema, type CorrectionFormValues } from "@/lib/crossmark-schema";
import { buildCorrectionXml } from "@/lib/crossmark-xml";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HelpTip } from "./HelpTip";
import { XmlOutput } from "./XmlOutput";

export function CorrectionForm() {
  const [xml, setXml] = useState<string | null>(null);

  const form = useForm<CorrectionFormValues>({
    resolver: zodResolver(correctionSchema),
    mode: "onChange",
    defaultValues: {
      depositorName: "",
      email: "",
      corrections: [
        {
          targetDoi: "",
          type: "correction",
          date: "",
          crossmarkPolicy: "",
          correctorDoi: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "corrections",
  });

  const onSubmit = (values: CorrectionFormValues) => {
    setXml(buildCorrectionXml(values));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Depositor
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="depositorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      Depositor name{" "}
                      <HelpTip text="Nama pengelola yang men-submit batch koreksi." />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: Arif" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      Email address <HelpTip text="Email jurnal/depositor." />
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@jurnal.ac.id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Koreksi ({fields.length})
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    targetDoi: "",
                    type: "correction",
                    date: "",
                    crossmarkPolicy: "",
                    correctorDoi: "",
                    description: "",
                  })
                }
              >
                <Plus className="size-4" />
                Tambah koreksi
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="rounded-lg border bg-muted/20 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Koreksi #{index + 1}
                    </span>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                        Hapus
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`corrections.${index}.targetDoi`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            DOI artikel yang dikoreksi{" "}
                            <HelpTip text="DOI artikel asli yang dikoreksi/dicabut." />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="10.29244/medkon.30.3.423" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`corrections.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            Jenis koreksi{" "}
                            <HelpTip text="correction (corrigendum), erratum, atau retraction." />
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="correction">correction (corrigendum)</SelectItem>
                              <SelectItem value="erratum">erratum</SelectItem>
                              <SelectItem value="retraction">retraction</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`corrections.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            Tanggal koreksi{" "}
                            <HelpTip text="Tanggal publikasi koreksi (YYYY-MM-DD)." />
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`corrections.${index}.crossmarkPolicy`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            DOI Crossmark Policy{" "}
                            <HelpTip text="DOI halaman kebijakan Crossmark jurnal." />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="10.29244/medkon.crossmark" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`corrections.${index}.correctorDoi`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5">
                          DOI artikel pengoreksi (opsional)
                          <HelpTip text="DOI artikel baru yang mengkoreksi artikel lama. Jika diisi, otomatis disisipkan ke deskripsi sebagai 'Corrigendum: doi.org/...'." />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10.29244/medkon.30.3.470"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`corrections.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5">
                          Deskripsi correction_item
                          <HelpTip text="Deskripsi singkat koreksi. Contoh: Correction on authors' name and affiliation." />
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Correction on authors' name and affiliation."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              form.reset();
              setXml(null);
            }}
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>
          <Button type="submit" size="lg" disabled={!form.formState.isValid}>
            <FileCode className="size-4" />
            Generate XML
          </Button>
        </div>
      </form>

      {xml && <XmlOutput xml={xml} filenamePrefix="crossmark-correction" />}
    </Form>
  );
}
