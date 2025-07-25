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
import { Trash2 } from "lucide-react";
import { useState } from "react";
const DropDownAction = ({ userId, fetchUserData, isActive }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const DeletefetchData = async () => {
    try {
      const response = await axiosInstance.delete(`/v1/admin/users/delete/${userId}`);
      console.log(response.data);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowPopUp = () => {
    setShowPopUp(!showPopUp);
  };
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/v1/admin/users/${userId}`);
      fetchUserData();
      setShowPopUp(false);
      console.log(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <>
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
              className="cursor-pointer hover:bg-gray-100  border-b border-b-gray-300"
            >
              {isActive ? "Deactivate" : "Activate"}
              <DropdownMenuShortcut>
                <Trash />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-100"
              onClick={handleShowPopUp}
            >
              Delete
              <DropdownMenuShortcut>
                <Trash2 className="text-red-800" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {showPopUp && (
        <div
          id="popup-modal"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                onClick={handleShowPopUp}
                type="button"
                className="absolute cursor-pointer top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center ">
                <svg
                  className="mx-auto mb-4  text-gray-400 w-12 h-12 dark:text-gray-200 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this permantely?
                </h3>
                <button
                onClick={DeletefetchData}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white cursor-pointer bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={handleShowPopUp}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5  cursor-pointer px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DropDownAction;
