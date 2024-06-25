import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import { MapelTable } from "@/Components/tables/mapel-tables/mapel-table";
import { KelasTable } from "@/Components/tables/kelas-tables/kelas-table";
import { useEffect, useState } from "react";
import { useGuruDataStore } from "@/hooks/useGuruData";
import KelasAddModal from "@/Components/tables/kelas-tables/kelas-add-modal";
import { MapelAddModal } from "@/Components/tables/mapel-tables/mapel-add-modal";
import { useKelasDataStore } from "@/hooks/useKelasData";
import { useMapelDataStore } from "@/hooks/useMapelData";

export default function KelasMapel(props) {
  const [mapelModal, setMapelModal] = useState(false);
  const [kelasModal, setKelasModal] = useState(false);
  return (
    <AuthenticatedLayout user={props.auth.user}>
      <Head title="Kelas & Mapel" />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent />

        <div className="flex-col items-center justify-between space-y-10 space-x-10 p-4 px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full space-x-10">
            <MapelTable
              data={props.mapel}
              setOpenModal={setMapelModal}
            />
            <KelasTable
              data={props.kelas}
              setOpenModal={setKelasModal}
            />
          </div>
        </div>
      </div>
      {mapelModal && (
        <>
          <MapelAddModal
            isOpen={mapelModal}
            onClose={() => setMapelModal(false)}
          />
        </>
      )}

      {kelasModal && (
        <>
          <KelasAddModal
            isOpen={kelasModal}
            onClose={() => setKelasModal(false)}
          />
        </>
      )}
    </AuthenticatedLayout>
  );
}
