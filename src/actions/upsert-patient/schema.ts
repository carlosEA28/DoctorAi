import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Número de telefone é obrigatório"),
  gender: z.enum(["Masculino", "Feminino"], {
    invalid_type_error: "Sexo é obrigatório",
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
