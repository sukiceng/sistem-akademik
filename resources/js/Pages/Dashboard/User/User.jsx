import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import { UserClient } from "@/Components/tables/user-tables/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import SiswaForm from "@/Components/form/user/siswa-form";
import GuruForm from "@/Components/form/user/guru-form";
import AdminForm from "@/Components/form/user/admin-form";

export default function User(props) {
  const { users } = props;
  const guru = users.filter((item) => item.role === "guru");
  const siswa = users.filter((item) => item.role === "siswa");
  const admin = users.filter((item) => item.role === "admin");
  return (
    <AuthenticatedLayout user={props.auth.user}>
      <Head title="User Page" />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent />

        <Tabs defaultValue="All">
          <TabsList className="grid w-fit  grid-cols-4">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Siswa">Siswa</TabsTrigger>
            <TabsTrigger value="Guru">Guru</TabsTrigger>
            <TabsTrigger value="Admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="All">
            <UserClient data={users} />
          </TabsContent>
          <TabsContent value="Siswa">
            <UserClient data={siswa} />
          </TabsContent>
          <TabsContent value="Guru">
            <UserClient data={guru} />
          </TabsContent>
          <TabsContent value="Admin">
            <UserClient data={admin} />
          </TabsContent>
        </Tabs>
      </div>
    </AuthenticatedLayout>
  );
}
