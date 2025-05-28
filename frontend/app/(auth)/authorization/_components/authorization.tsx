import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

const Aauthorization = () => {
  return (
    <div className="p-4 rounded-md bg-white border border-solid shadow-2xl">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Ligin</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="w-full md:w-[400px]">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register" className="w-full md:w-[400px]">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Aauthorization;
