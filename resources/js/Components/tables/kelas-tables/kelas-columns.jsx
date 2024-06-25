import { KelasCellAction } from "./kelas-cell-action";

export const KelasColumn = [
  {
    id: "row",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "nama_kelas",
    header: "NAMA KELAS",
  },
  {
    accessorKey: "tahun_ajaran",
    header: "TAHUN AJARAN",
  },
  {
    id: "actions",
    cell: ({ row }) => <KelasCellAction data={row.original} />,
  },
];
