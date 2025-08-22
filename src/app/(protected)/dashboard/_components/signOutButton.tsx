"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";

const SignoutButtonComponent = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/authentication");
            },
          },
        })
      }
    >
      Sair
    </Button>
  );
};

export default SignoutButtonComponent;
