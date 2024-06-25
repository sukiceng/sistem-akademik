import { DataTable } from "@/Components/ui/custom/data-table";
import { Heading } from "@/Components/ui/custom/heading";
import { NilaiSiswaColumn } from "./nilai-columns";

export const NilaiSiswaTable = ({ dataNilai, tab }) => {
  // NOTE : tab is mapel id
  if (tab) {
    dataNilai = dataNilai.filter((item) => item.kelas_id === Number(tab));
  }
  const generateNilaiData = () => {
    return dataNilai?.map((item) => {
      return {
        nama_siswa: item.siswa.nama,
        mapel: item.mapel.nama_mata_pelajaran,
        nilai: item.nilai,
        semester: item.semester,
        tahun_ajaran: item.tahun_ajaran,
        kelas: item.kelas.nama_kelas,
      };
    });
  };

  const siswaData = generateNilaiData() || [];
  return (
    <div className="flex-col space-y-6">
      <DataTable
        searchKey="mapel"
        searchPlaceholder="Nama Mata Pelajaran"
        columns={NilaiSiswaColumn}
        data={siswaData}
      />
    </div>
  );
};
