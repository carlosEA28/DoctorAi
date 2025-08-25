"use server";

import { db } from "@/db";
import { patientsTable, patientSexEnum } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { UpsertPatientSchema, upsertPatientSchema } from "./schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const upsertPatient = actionClient
  .inputSchema(upsertPatientSchema)
  .action(async ({ parsedInput }: { parsedInput: UpsertPatientSchema }) => {
    const input = parsedInput;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.clinic?.id) {
      throw new Error("Clínica não encontrada na sessão");
    }

    const patientData = {
      id: input.id || undefined,
      name: input.name,
      email: input.email,
      phoneNumber: input.phone,
      sex: (input.gender === "Masculino"
        ? "male"
        : "female") as (typeof patientSexEnum.enumValues)[number],
      clinicId: session.user.clinic.id,
    };

    await db
      .insert(patientsTable)
      .values(patientData)
      .onConflictDoUpdate({
        target: patientsTable.id,
        set: {
          name: patientData.name,
          email: patientData.email,
          phoneNumber: patientData.phoneNumber,
          sex: patientData.sex,
          updatedAt: new Date(),
        },
        where: input.id ? eq(patientsTable.id, input.id) : undefined,
      });

    revalidatePath("/patients");

    return {
      success: true,
      message: input.id
        ? "Paciente atualizado com sucesso!"
        : "Paciente criado com sucesso!",
    };
  });
