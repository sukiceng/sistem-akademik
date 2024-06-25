import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

import { NilaiSiswaTable } from "@/Components/tables/nilai-siswa-tables/nilai-table";
import { Heading } from "@/Components/ui/custom/heading";
import { Separator } from "@/Components/ui/separator";
import { useState } from "react";
import { Combobox } from "@/Components/ui/custom/ComboBox";

export default function Kelas({ auth, data }) {
  const { nilai, kelas } = data;

  const [tab, setTab] = useState("");
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`Nilai : ${data?.siswa?.nama}`} />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent />
        <div className="flex w-full justify-between">
          <Heading
            title={` ${data?.siswa?.nama}`}
            description={data?.siswa?.nisn}
          />
          <Combobox
            data={kelas.map((item) => ({
              value: `${item.kelas.id}`,
              label: `${item.kelas.nama_kelas}`,
            }))}
            placeholder="Pilih Kelas"
            value={tab}
            setValue={setTab}
          />
        </div>
        <Separator />
        <Tabs defaultValue="Gasal">
          <TabsList className="grid w-fit  grid-cols-2">
            <TabsTrigger value="Gasal">Gasal</TabsTrigger>
            <TabsTrigger value="Genap">Genap</TabsTrigger>
          </TabsList>
          <TabsContent value="Gasal">
            <NilaiSiswaTable
              tab={tab}
              dataNilai={nilai.filter((item) => item.semester === "Gasal")}
            />
          </TabsContent>
          <TabsContent value="Genap">
            <NilaiSiswaTable
              tab={tab}
              dataNilai={nilai.filter((item) => item.semester === "Genap")}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AuthenticatedLayout>
  );
}
