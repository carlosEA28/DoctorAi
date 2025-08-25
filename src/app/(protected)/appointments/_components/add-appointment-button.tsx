"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { NewAppointmentForm } from "./new-appointment-form";
import { doctorsTable, patientsTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useState } from "react";

type Doctors = InferSelectModel<typeof doctorsTable>;
type Patients = InferSelectModel<typeof patientsTable>;

type AddAppointmentButtonProps = {
  doctors: Doctors[];
  patients: Patients[];
};

export function AddAppointmentButton({
  doctors,
  patients,
}: AddAppointmentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Novo Agendamento
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo agendamento</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar um novo agendamento.
          </DialogDescription>
        </DialogHeader>

        <NewAppointmentForm
          isOpen={isOpen}
          patients={patients}
          doctors={doctors}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
