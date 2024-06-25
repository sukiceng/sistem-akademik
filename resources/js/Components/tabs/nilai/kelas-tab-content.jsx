import Header from "@/Components/layout/header";
import { Card } from "@/Components/ui/card";
import { Heading } from "@/Components/ui/custom/heading";
import { Link } from "@inertiajs/react";
import { User } from "lucide-react";

const KelasTabContent = ({ data, title, isKenaikan = false }) => {
  return (
    <div className="flex-col items-center justify-between space-y-10  p-4 px-8 w-full">
      <Heading
        title={`${title} (${data.length})`}
        description="Pilih Kelas Untuk Melihat Nilai"
      />
      <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {data?.map((item, index) => (
          <Link
            key={index}
            // eslint-disable-next-line no-undef
            href={route(`${isKenaikan ? "kenaikan-kelas.show" : "nilai.show"}`, item.id)}
          >
            <Card className="bg-slate-300">
              <div className=" p-10 flex-row items-center justify-center space">
                <p className="text-slate-500 text-2xl text-center">{item.nama_kelas}</p>
                <p className="text-slate-500 text-lg text-center">{item.tahun_ajaran}</p>
              </div>
              <div className="flex justify-between p-2">
                <p className="text-slate-500 text-sm ps-2 ">{`Siswa(${item.siswa.length})`}</p>
                <p className="text-slate-500 text-sm ps-2 flex items-center">
                  <User className="text-slate-500 text-sm ps-2 me-2" />
                  {item.wali?.nama_guru}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default KelasTabContent;
