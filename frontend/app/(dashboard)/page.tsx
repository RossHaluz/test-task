import { getProjects } from "@/actions/data";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AddProjecBtn from "./_components/add-project-btn";

export default async function Home() {
  const projects = await getProjects();

  console.log(projects);

  if (!projects) return redirect("/authorization");

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">
          Projects {projects?.length > 0 ? projects?.length : 0}
        </h1>

        <AddProjecBtn />
      </div>
      <DataTable columns={columns} data={projects} />
    </div>
  );
}
