"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";

export type Project = {
  id: string;
  name: string;
  owner: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "stars",
    header: "Stars",
  },
  {
    accessorKey: "forks",
    header: "Forks",
  },
  {
    accessorKey: "issues",
    header: "Issues",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      const createdAt = new Date(row?.original?.createdAt).toLocaleDateString(
        "uk-UA",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );

      return createdAt;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {

      return <Actions projectId={row?.original?.id} />;
    },
  },
];
