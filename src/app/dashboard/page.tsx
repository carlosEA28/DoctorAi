import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignoutButtonComponent from "./signOutButton";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
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
