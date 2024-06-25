import AdminForm from "@/Components/form/user/admin-form";
import GuruForm from "@/Components/form/user/guru-form";
import SiswaForm from "@/Components/form/user/siswa-form";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useKelasDataStore } from "@/hooks/useKelasData";
import { useMapelDataStore } from "@/hooks/useMapelData";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

const Update = (props) => {
  useEffect(() => {
    props.data.kelas && useKelasDataStore.setState({ kelas: props.data.kelas });
    props.data.mapel && useMapelDataStore.setState({ mapel: props.data.mapel });
  }, [props.data.kelas, props.data.mapel]);

  return (
    <Authenticated user={props.auth.user}>
      <Head title="Update User Page" />
      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent type={"detail"} />
        <div className="flex-1 space-y-6 p-6 md:p-10">
          {props.data.user.role_id === 1 && <SiswaForm data={props.data} />}
          {props.data.user.role_id === 2 && <GuruForm data={props.data} />}
          {props.data.user.role_id === 3 && <AdminForm data={props.data} />}
        </div>
      </div>
    </Authenticated>
  );
};
export default Update;
