import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CellAction } from "./cell-action";
import { getInitials } from "@/lib/getInitials";
import { Button } from "@/Components/ui/button";

export const columns = [
  {
    id: "row",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "username",
    header: "NAME",
    cell: ({ row }) => {
      const name = row.getValue("username");
      return (
        <div className="flex items-center space-x-1">
          <Button
            variant="secondary"
            className="relative h-8 w-8 rounded-full"
          >
            <Avatar className="h-8 w-8 flex items-center">
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
          </Button>
          <p>{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ row }) => {
      const role = row.getValue("role");
      let className = "text-sl";
      if (role === "guru") {
        className += " text-green-700";
      } else if (role === "siswa") {
        className += " text-yellow-700";
      } else {
        className += " text-sky-700";
      }

      return (
        <div className={className}>
          <span>{role}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "join_date",
    header: "JOIN",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
