"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupFormComponent from "./components/signup-form";
import LoginFormComponent from "./components/login-form";

const AuthenticationPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[450px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar conta</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginFormComponent />
        </TabsContent>

        <TabsContent value="register">
          <SignupFormComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
