import { MapelCellAction } from "./mapel-cell-action";

export const MapelColumn = [
  {
    id: "row",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "nama_mata_pelajaran",
    header: "NAMA MATA PELAJARAN",
  },

  {
    id: "actions",
    cell: ({ row }) => <MapelCellAction data={row.original} />,
  },
];
