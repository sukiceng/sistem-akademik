import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import KelasTabContent from "@/Components/tabs/nilai/kelas-tab-content";
import { useState } from "react";

export default function KenaikanKelas({ auth, data }) {
  const [tab, setTab] = useState("all");
  const tahunAjar = data?.tahun_ajar;
  const kelas = data?.kelas;
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Kenaikan Kelas" />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent />

        <div className="w-full space-x-10">
          <Tabs defaultValue="all">
            <TabsList className="grid w-fit grid-flow-col auto-cols-max">
              <TabsTrigger
                value="all"
                onClick={() => setTab("all")}
              >
                All
              </TabsTrigger>
              {tahunAjar
                ?.slice()
                .reverse()
                .map((item, index) => (
                  <TabsTrigger
                    key={index}
                    value={item.tahun_ajaran}
                    onClick={() => setTab(item.tahun_ajaran)}
                  >
                    {item.tahun_ajaran}
                  </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="all">
              <KelasTabContent
                data={kelas}
                title="Semua Kelas"
                isKenaikan={true}
              />
            </TabsContent>
            {tahunAjar.map((item, index) => (
              <TabsContent
                key={index}
                value={item.tahun_ajaran}
              >
                <KelasTabContent
                  data={kelas.filter((item) => item.tahun_ajaran === tab)}
                  title={item.tahun_ajaran}
                  isKenaikan={true}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
