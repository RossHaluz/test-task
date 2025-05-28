import React from "react";
import Aauthorization from "./_components/authorization";
import { getProjects } from "@/actions/data";
import { redirect } from "next/navigation";

const AuthorizationPage = async () => {
  const projects = await getProjects();
  if (projects) return redirect("/");

  return <Aauthorization />;
};

export default AuthorizationPage;
