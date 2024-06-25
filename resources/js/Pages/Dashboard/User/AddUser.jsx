import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import { UserForm } from "@/Components/form/add-user";
import { useEffect } from "react";
import { useKelasDataStore } from "@/hooks/useKelasData";
import { useMapelDataStore } from "@/hooks/useMapelData";
import { useErrorDataStore } from "@/hooks/useErrorData";

export default function AddUser(props) {
  useEffect(() => {
    props.kelas && useKelasDataStore.setState({ kelas: props.kelas });
    props.mapel && useMapelDataStore.setState({ mapel: props.mapel });
    props.errors && useErrorDataStore.setState({ error: props.errors });
  }, [props.kelas, props.mapel, props.errors]);

  return (
    <AuthenticatedLayout user={props.auth.user}>
      <Head title="Add User Page" />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent />
        <div className="flex-1 space-y-6 p-6 md:p-10">
          <UserForm />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
