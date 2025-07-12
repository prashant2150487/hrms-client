import { Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axios";

const DropDownAction = ({userId,fetchUserData}) => {
  console.log(userId,"diksha")
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/v1/admin/users/${userId}`);
      fetchUserData()
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56 bg-white border-none shadow-lg p-2 mr-15"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
            Edit
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <Separator
            orientation="horizontal"
            className="border-t border-gray-300"
          />

          <DropdownMenuItem
            onClick={() => handleDelete()}
            className="cursor-pointer hover:bg-gray-100"
          >
            Delete
            <DropdownMenuShortcut>
              <Trash />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropDownAction;
