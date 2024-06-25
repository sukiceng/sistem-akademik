import { DataTable } from "@/Components/ui/custom/data-table";
import { Heading } from "@/Components/ui/custom/heading";
import { NilaiColumn } from "./nilai-columns";

export const NilaiTable = ({ tab, data }) => {
  // NOTE : tab is mapel id
  const { mapel, siswa, nilai, guru_mapel, semester, tahun_ajaran } = data;
  const mapelData = mapel.find((value) => value.id === Number(tab));
  const guruMapelData = guru_mapel.find((value) => value.mapel_id === Number(tab));
  const generateSiswaData = () => {
    return siswa.map((item) => {
      const nilaiSiswa = nilai.find(
        (value) =>
          value.siswa_id === item.id &&
          value.mapel_id === Number(tab) &&
          value.kelas_id === Number(item.kelas_id) &&
          value.semester === semester
      );
      return {
        nilai_id: nilaiSiswa?.id,
        nisn: item.nisn,
        nama_siswa: item.nama,

        siswa_id: item.id,
        kelas_id: item.kelas_id,
        mapel_id: mapelData?.id,
        guru_id: guruMapelData?.id,

        tahun_ajaran: tahun_ajaran,
        nilai: nilaiSiswa?.nilai,
        semester: semester,
        status: nilaiSiswa ? "Sudah" : "Belum",
      };
    });
  };

  const siswaData = generateSiswaData();
  return (
    <div className="flex-col space-y-6">
      <div className="flex items-start justify-between">
        <Heading
          title={mapel.find((value) => value.id === Number(tab))?.nama_mata_pelajaran}
          description={guruMapelData?.nama_guru}
        />
      </div>

      <DataTable
        searchKey="nama_siswa"
        searchPlaceholder="Nama Siswa"
        columns={NilaiColumn}
        data={siswaData}
      />
    </div>
  );
};
