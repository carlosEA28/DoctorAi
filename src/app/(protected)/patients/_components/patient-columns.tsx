"use client";

import { patientsTable } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import PatientTableActionsComponent from "./table-actions";
import PatientsTableActions from "./table-actions";

type Patient = typeof patientsTable.$inferInsert;

export const patientsColumnsTable: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => {
      const patient = params.row.original;
      return patient.sex === "male" ? "Masculino" : "Feminino";
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <PatientsTableActions
          patient={
            row.original as typeof patientsTable.$inferSelect & { id: string }
          }
        />
      );
    },
  },
];
