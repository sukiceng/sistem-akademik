"use client";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/custom/data-table";
import { Separator } from "@/Components/ui/separator";
import { Plus } from "lucide-react";
import { router } from "@inertiajs/react";
import { columns } from "./columns";
import { Heading } from "@/Components/ui/custom/heading";

export const UserClient = ({ data }) => {
  return (
    <div className="flex-col space-y-6">
      <div className="flex items-start justify-between space-y-4">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users "
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.get(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="username"
        columns={columns}
        data={data}
      />
    </div>
  );
};
