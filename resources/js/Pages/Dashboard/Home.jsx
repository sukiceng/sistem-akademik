import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { GraduationCap, School, SquareLibrary, Users } from "lucide-react";

export default function Home({ auth, data }) {
  console.log("🚀 ~ Home ~ data:", data);
  const adminCount = data?.User.filter((user) => user.role_id == 3).length;
  const guruCount = data?.User.filter((user) => user.role_id == 2).length;
  const siswaCount = data?.User.filter((user) => user.role_id == 1).length;
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Home" />

      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
            <p className="text-xl font-bold">{auth.user.username}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                <Users className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.User.length} Pengguna</div>
                <p className="text-xs text-muted-foreground">
                  {`(${adminCount}) Admin, (${guruCount}) Guru, (${siswaCount}) Siswa`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pengajar</CardTitle>
                <GraduationCap className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{guruCount}</div>
                <p className="text-xs text-muted-foreground">profesional, kreatif, religius </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kelas</CardTitle>
                <School className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.KelasCount}++</div>
                <p className="text-xs text-muted-foreground">more class coming soon</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mata Pelajaran</CardTitle>
                <SquareLibrary className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{data.MapelCount}</div>
                <p className="text-xs text-muted-foreground italic">Learn more</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </AuthenticatedLayout>
  );
}
