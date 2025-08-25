"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumberFormatBase } from "react-number-format";
import { useAction } from "next-safe-action/hooks";
import { upsertPatient } from "@/actions/upsert-patient";
import {
  UpsertPatientSchema,
  upsertPatientSchema,
} from "@/actions/upsert-patient/schema";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { patientsTable } from "@/db/schema";
import { useEffect } from "react";

interface UpserPatientProps {
  isOpen: boolean;
  onSuccess?: () => void;
  patient?: typeof patientsTable.$inferSelect;
}

export function UpsertPatientForm({
  onSuccess,
  isOpen,
  patient,
}: UpserPatientProps) {
  const form = useForm<UpsertPatientSchema>({
    resolver: zodResolver(upsertPatientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: undefined,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: patient?.name ?? "",
        email: patient?.email ?? "",
        phone: patient?.phoneNumber ?? "", // mapeia pro nome do form
        gender: (patient?.sex === "male"
          ? "Masculino"
          : patient?.sex === "female"
            ? "Feminino"
            : undefined) as "Masculino" | "Feminino" | undefined, // mapeia pro nome do form
      });
    }
  }, [isOpen, form, patient]);

  const { execute, status } = useAction(upsertPatient, {
    onSuccess: () => {
      toast.success("Paciente adicionado com sucesso");
      onSuccess?.();
      form.reset();
    },
    onError: () => {
      toast.error("Erro ao salvar paciente");
    },
  });

  const onSubmit = (values: UpsertPatientSchema) => {
    execute(values);
  };

  const isLoading = status === "executing";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Paciente</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Telefone</FormLabel>
              <FormControl>
                <NumberFormatBase
                  format={(val) => {
                    if (!val) return "";
                    const digits = val.replace(/\D/g, "");
                    const match = digits.match(/^(\d{2})(\d{5})(\d{4})$/);
                    if (match) {
                      return `(${match[1]}) ${match[2]}-${match[3]}`;
                    }
                    return val;
                  }}
                  className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="(00) 00000-0000"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Feminino">Feminino</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 size={16} className="h-4 w-4 animate-spin" />
          ) : (
            "Salvar Paciente"
          )}
        </Button>
      </form>
    </Form>
  );
}
