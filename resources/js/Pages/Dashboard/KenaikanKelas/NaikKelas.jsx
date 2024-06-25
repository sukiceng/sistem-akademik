import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";

import { useState } from "react";
import { Heading } from "@/Components/ui/custom/heading";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import { DataTable } from "@/Components/ui/custom/data-table";
import { NaikKelasColumn } from "@/Components/tables/pindah-kelas-table/pindah-columns";

export default function Kelas({ auth, data }) {
  const { nama_kelas, tahun_ajaran, wali, siswa } = data.data;
  const generateSiswaData = () => {
    return siswa.map((item) => {
      return {
        nisn: item.nisn,
        nama_siswa: item.nama,
        siswa_id: item.id,
        kelas_id: item.kelas_id,
        tahun_ajaran: tahun_ajaran,
      };
    });
  };

  const siswaData = generateSiswaData();
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Naik Kelas" />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent type={"detail"} />
        <div className="w-full space-x-10 flex justify-between">
          <Heading
            title={`${nama_kelas} (${tahun_ajaran})`}
            description={
              <div className="pt-3 space-y-2">
                <p>{`${wali?.nama_guru} (wali Kelas)`}</p>
              </div>
            }
          />
        </div>
        <Separator />
        <div className="w-full space-y-5">
          <DataTable
            searchKey="nama_siswa"
            searchPlaceholder="Nama Siswa"
            columns={NaikKelasColumn}
            data={siswaData}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
