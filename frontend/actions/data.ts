import { Project } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

axios.defaults.baseURL = `${process.env.BACKEND_URL}/api`;

export const getProjects = async (): Promise<Project[] | null> => {
  const token = (await cookies()).get("token")?.value;
  console.log(token);

  try {
    const { data } = await axios.get("/project", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
