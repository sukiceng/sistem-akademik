import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/custom/data-table";
import { Separator } from "@/Components/ui/separator";
import { Plus } from "lucide-react";
import { Heading } from "@/Components/ui/custom/heading";
import { KelasColumn } from "./kelas-columns";

export const KelasTable = ({ data, setOpenModal }) => {
  console.log("🚀 ~ KelasTable ~ data:", data);
  return (
    <div className="flex-col space-y-6">
      <div className="flex items-start justify-between">
        <Heading
          title={`Kelas (${data.length})`}
          description="Manage Kelas"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="nama_kelas"
        searchPlaceholder="Nama Kelas"
        columns={KelasColumn}
        data={data}
      />
    </div>
  );
};
