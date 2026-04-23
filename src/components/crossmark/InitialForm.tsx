import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, FileCode } from "lucide-react";

import { initialSchema, type InitialFormValues } from "@/lib/crossmark-schema";
import { buildInitialXml } from "@/lib/crossmark-xml";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HelpTip } from "./HelpTip";
import { XmlOutput } from "./XmlOutput";

export function InitialForm() {
  const [xml, setXml] = useState<string | null>(null);

  const form = useForm<InitialFormValues>({
    resolver: zodResolver(initialSchema),
    mode: "onChange",
    defaultValues: {
      depositorName: "",
      email: "",
      crossmarkPolicy: "",
      articles: [
        {
          doi: "",
          submitted: "",
          finalRevised: "",
          accepted: "",
          publishedOnline: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "articles",
  });

  const onSubmit = (values: InitialFormValues) => {
    setXml(buildInitialXml(values));
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
                      <HelpTip text="Nama pengelola yang men-submit batch (boleh siapa saja)." />
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
                      Email address{" "}
                      <HelpTip text="Email jurnal/depositor untuk notifikasi Crossref." />
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@jurnal.ac.id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="crossmarkPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5">
                    DOI Crossmark Policy{" "}
                    <HelpTip text="DOI halaman kebijakan Crossmark jurnal. Contoh: 10.29244/medkon.crossmark" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="10.29244/medkon.crossmark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Artikel ({fields.length})
              </h3>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-lg border bg-muted/20 p-4 space-y-4 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Artikel #{index + 1}
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

                  <FormField
                    control={form.control}
                    name={`articles.${index}.doi`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5">
                          DOI artikel{" "}
                          <HelpTip text="DOI artikel yang akan didepositkan. Contoh: 10.29244/medkon.31.2.72" />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="10.29244/medkon.31.2.72" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
                      Publication history (opsional){" "}
                      <HelpTip text="Format YYYY-MM-DD. Field yang diisi akan dimasukkan ke custom_metadata." />
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(
                        [
                          ["submitted", "Submitted"],
                          ["finalRevised", "Final Revised"],
                          ["accepted", "Accepted"],
                          ["publishedOnline", "Published Online"],
                        ] as const
                      ).map(([name, label]) => (
                        <FormField
                          key={name}
                          control={form.control}
                          name={`articles.${index}.${name}` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">{label}</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} value={field.value ?? ""} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    doi: "",
                    submitted: "",
                    finalRevised: "",
                    accepted: "",
                    publishedOnline: "",
                  })
                }
              >
                <Plus className="size-4" />
                Tambah artikel
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={!form.formState.isValid}>
            <FileCode className="size-4" />
            Generate XML
          </Button>
        </div>
      </form>

      {xml && <XmlOutput xml={xml} filenamePrefix="crossmark-initial" />}
    </Form>
  );
}
