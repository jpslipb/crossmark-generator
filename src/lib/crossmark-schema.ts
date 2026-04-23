import { z } from "zod";

const doiRegex = /^10\.\d{4,9}\/.+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const optionalDate = z
  .string()
  .trim()
  .optional()
  .refine((v) => !v || dateRegex.test(v), {
    message: "Format tanggal harus YYYY-MM-DD",
  });

const doiField = z
  .string()
  .trim()
  .min(1, "DOI wajib diisi")
  .regex(doiRegex, "Format DOI tidak valid (contoh: 10.1234/abc.123)");

const optionalDoi = z
  .string()
  .trim()
  .optional()
  .refine((v) => !v || doiRegex.test(v), {
    message: "Format DOI tidak valid",
  });

export const initialSchema = z.object({
  depositorName: z.string().trim().min(1, "Nama depositor wajib").max(200),
  email: z.string().trim().email("Email tidak valid").max(255),
  crossmarkPolicy: doiField,
  articles: z
    .array(
      z.object({
        doi: doiField,
        submitted: optionalDate,
        finalRevised: optionalDate,
        accepted: optionalDate,
        publishedOnline: optionalDate,
      }),
    )
    .min(1, "Minimal satu artikel"),
});

export type InitialFormValues = z.infer<typeof initialSchema>;

export const correctionSchema = z.object({
  depositorName: z.string().trim().min(1, "Nama depositor wajib").max(200),
  email: z.string().trim().email("Email tidak valid").max(255),
  corrections: z
    .array(
      z.object({
        targetDoi: doiField,
        type: z.enum(["correction", "erratum", "retraction", "addendum"]),
        date: z
          .string()
          .trim()
          .min(1, "Tanggal wajib diisi")
          .regex(dateRegex, "Format tanggal harus YYYY-MM-DD"),
        crossmarkPolicy: doiField,
        correctorDoi: optionalDoi,
        description: z
          .string()
          .trim()
          .min(1, "Deskripsi wajib diisi")
          .max(2000, "Maksimal 2000 karakter"),
      }),
    )
    .min(1, "Minimal satu entri koreksi"),
});

export type CorrectionFormValues = z.infer<typeof correctionSchema>;
