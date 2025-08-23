import z from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
    specialty: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória" }),
    appointmentPriceInCents: z.number().min(1, {
      message: "Preço é obrigatório",
    }),
    availableFromWeekDay: z.number(),
    availableToWeekDay: z.number(),
    availableFromTime: z
      .string()
      .trim()
      .min(1, { message: "O horário de início é obrigatório" }),
    availableToTime: z
      .string()
      .trim()
      .min(1, { message: "O horário de término é obrigatório" }),
  })
  .refine((data) => data.availableFromTime < data.availableToTime, {
    message: "O horário de início deve ser anterior ao horário de término",
    path: ["availableToTime"],
  });

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
