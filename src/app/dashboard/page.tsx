import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignoutButtonComponent from "./components/signOutButton";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersToClinicsTable } from "@/db/schema";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  //pegar as clinicas do user
  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1>dashboard</h1>
      <h1>{session?.user?.name}</h1>
      <SignoutButtonComponent />
    </div>
  );
};

export default DashboardPage;
