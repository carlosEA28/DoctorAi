import {
  PageAction,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { AddPatientButton } from "./_components/add-patient-button";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/db";
import { patientsTable } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { patientsColumnsTable } from "./_components/patient-columns";

export default async function PatientsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user.clinic) {
    redirect("/clinic-form");
  }
  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session.user.clinic.id),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageAction>
          <AddPatientButton />
        </PageAction>
      </PageHeader>
      <PageContent>
        <DataTable data={patients} columns={patientsColumnsTable} />
      </PageContent>
    </PageContainer>
  );
}
