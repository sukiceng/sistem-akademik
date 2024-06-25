import { Badge } from "@/Components/ui/badge";
import { KenaikanCellAction } from "./pindah-cell-action";

export const NaikKelasColumn = [
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
    accessorKey: "nisn",
    header: "NISN",
  },

  {
    id: "actions",
    cell: ({ row }) => <KenaikanCellAction data={row.original} />,
  },
];
