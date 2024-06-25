import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import SiswaForm from "./user/siswa-form";
import GuruForm from "./user/guru-form";
import AdminForm from "./user/admin-form";

export function UserForm() {
  return (
    <Tabs defaultValue="Siswa">
      <TabsList className="grid w-fit  grid-cols-3">
        <TabsTrigger value="Siswa">Siswa</TabsTrigger>
        <TabsTrigger value="Guru">Guru</TabsTrigger>
        <TabsTrigger value="Admin">Admin</TabsTrigger>
      </TabsList>
      <TabsContent value="Siswa">
        <SiswaForm />
      </TabsContent>
      <TabsContent value="Guru">
        <GuruForm />
      </TabsContent>
      <TabsContent value="Admin">
        <AdminForm />
      </TabsContent>
    </Tabs>
  );
}
