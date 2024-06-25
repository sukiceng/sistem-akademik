import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/custom/data-table";
import { Separator } from "@/Components/ui/separator";
import { Plus } from "lucide-react";
import { Heading } from "@/Components/ui/custom/heading";
import { MapelColumn } from "./mapel-columns";

export const MapelTable = ({ data, setOpenModal }) => {
  return (
    <div className="flex-col space-y-6">
      <div className="flex items-start justify-between">
        <Heading
          title={`Mata Pelajaran (${data.length})`}
          description="Manage Mata Pelajaran"
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
        searchKey="nama_mata_pelajaran"
        searchPlaceholder="Mata Pelajaran"
        columns={MapelColumn}
        data={data}
      />
    </div>
  );
};
