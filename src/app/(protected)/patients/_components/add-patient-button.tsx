"use client";

import { Button } from "@/components/ui/button";
import { UpsertPatientForm } from "./upsert-patient-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function AddPatientButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8">
          <PlusIcon className="mr-2 h-4 w-4" />
          Adicionar Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Paciente</DialogTitle>
        </DialogHeader>
        <UpsertPatientForm isOpen={isOpen} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
