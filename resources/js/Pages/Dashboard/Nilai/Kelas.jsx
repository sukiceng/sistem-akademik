import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import KelasTabContent from "@/Components/tabs/nilai/kelas-tab-content";
import { useState } from "react";
import { Heading } from "@/Components/ui/custom/heading";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { Combobox } from "@/Components/ui/custom/ComboBox";
import { NilaiTable } from "@/Components/tables/nilai-tables/nilai-table";

export default function Kelas({ auth, data }) {
  const { nama_kelas, tahun_ajaran, wali, mapel, siswa, guru_mapel } = data.data;
  console.log("🚀 ~ Kelas ~ data.data:", data.data);
  const { nilai } = data;
  let dataMapel = mapel;
  const [tab, setTab] = useState("");
  // guru_mapel
  if (auth.user.role_id === 2 && auth.user.id !== wali?.user_id) {
    const dataGuruMapel = guru_mapel.find((value) => value.user_id === auth.user.id);
    dataMapel = mapel.filter((value) => value.id === dataGuruMapel?.mapel_id);
  }

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={`Nilai : ${nama_kelas}`} />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent type={"detail"} />
        <div className="w-full space-x-10 flex justify-between">
          <Heading
            title={`${nama_kelas} (${tahun_ajaran})`}
            description={
              <div className="pt-3 space-y-2">
                <p>{`${wali?.nama_guru} (wali Kelas)`}</p>
                {mapel.map((item, index) => (
                  <Badge key={index}>{item.nama_mata_pelajaran}</Badge>
                ))}
              </div>
            }
          />
          <Combobox
            data={dataMapel.map((item) => ({
              value: `${item.id}`,
              label: `${item.nama_mata_pelajaran}`,
            }))}
            placeholder="Pilih Mata Pelajaran"
            value={tab}
            setValue={setTab}
          />
        </div>
        <Separator />
        <div className="w-full space-y-5">
          {tab ? (
            <Tabs defaultValue="Gasal">
              <TabsList className="grid w-fit  grid-cols-2">
                <TabsTrigger value="Gasal">Gasal</TabsTrigger>
                <TabsTrigger value="Genap">Genap</TabsTrigger>
              </TabsList>
              <TabsContent value="Gasal">
                <NilaiTable
                  tab={tab}
                  data={{
                    mapel: dataMapel,
                    siswa,
                    nilai,
                    guru_mapel,
                    semester: "Gasal",
                    tahun_ajaran,
                    kelas_id: data.data.id,
                  }}
                />
              </TabsContent>
              <TabsContent value="Genap">
                <NilaiTable
                  tab={tab}
                  data={{
                    mapel: dataMapel,
                    siswa,
                    nilai,
                    guru_mapel,
                    semester: "Genap",
                    tahun_ajaran,
                    kelas_id: data.data.id,
                  }}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="w-full flex-1">
              <p className="text-center text-slate-500 text-xl">Pilih Mata Pelajaran Terlebih Dahulu</p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
