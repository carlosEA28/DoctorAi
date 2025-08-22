import { Button } from "@/components/ui/button";
import {
  PageAction,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { PlusIcon } from "lucide-react";

const DoctorsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>Gerencie os médicos da sua clínica</PageDescription>
        </PageHeaderContent>
        <PageAction>
          <Button>
            <PlusIcon />
            Adicionar médico
          </Button>
        </PageAction>
      </PageHeader>
      <PageContent>
        <h1>Médicos</h1>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
