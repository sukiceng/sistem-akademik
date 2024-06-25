import { Badge } from "@/Components/ui/badge";

export const NilaiSiswaColumn = [
  {
    id: "row",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "nama_siswa",
    header: "SISWA",
  },
  {
    accessorKey: "mapel",
    header: "MATA PELAJARAN",
  },
  {
    accessorKey: "nilai",
    header: "NILAI",
    cell: ({ row }) => {
      const nilai = row.getValue("nilai") || "-";
      let variant;
      switch (true) {
        case nilai === "-":
          variant = "secondary";
          break;
        case Number(nilai) < 75:
          variant = "warning";
          break;
        default:
          variant = "success";
          break;
      }
      return <Badge variant={variant}>{nilai}</Badge>;
    },
  },
  {
    accessorKey: "semester",
    header: "SEMESTER",
    cell: ({ row }) => {
      const status = row.getValue("semester");
      const variant = status === "Gasal" ? "default" : "secondary";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "tahun_ajaran",
    header: "TAHUN AJARAN",
  },
  {
    accessorKey: "kelas",
    header: "KELAS  ",
  },
];
