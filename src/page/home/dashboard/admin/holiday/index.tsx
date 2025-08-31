import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Pencil, Trash2 } from "lucide-react";
import Dashboard from "@/components/sidebar";
import SecondaryHeader from "@/components/SecondaryHeader";
import { secondaryHeaderData } from "@/constants/secondaryHeaderData";
import HolidayPopUp from "./holidayPopup";
import axiosInstance from "@/lib/axios";
import DeletePopUp from "./deletePopup";
interface Holiday {
  id: string;
  name: string;
  date: string;
  location: string;
  shift: string;
  classification: string;
  description?: string;
}
const data = ["Onboard", "Holiday"];
const Holiday = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [deletePopUp, setdeletePopUp] = useState(false);
  const [holidayId, setHolidayId] = useState<string>("");
  const handleClick = () => {
    setShow(!show);
  };
  const handleDelete = (Id) => {
    setdeletePopUp(true);
    setHolidayId(Id);
  };

  const fetchHoilday = async () => {
    try {
      const response = await axiosInstance.get("/v1/holiday/all-holidays");
      setHolidays(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHoilday();
  }, []);

  // useEffect(() => {
  //   const filteredData = holidays.filter((item) =>
  //     item.name.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFiltered(filteredData);
  //   setPage(1);
  // }, [query, holidays]);

  // const handleEdit = (holiday: Holiday) => {
  //   setSelectedHoliday(holiday);
  //   setDrawerOpen(true);
  // };

  // const handleDelete = (id: string) => {
  //   const updated = holidays.filter((h) => h.id !== id);
  //   setHolidays(updated);
  // };

  return (
    <Dashboard>
      <SecondaryHeader data={secondaryHeaderData?.admin} />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Holidays</h1>
          <div className=" flex items-center gap-2 ">
            <Input
              placeholder="Search holiday name..."
              className="max-w-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              onClick={handleClick}
              className="border border-gray-800 bg-black text-white"
            >
              {" "}
              Add Holiday
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow className="grid grid-cols-4 text-sm text-gray-600 px-3">
                <TableHead className="flex items-center">Name</TableHead>
                <TableHead className="flex items-center">Date</TableHead>

                <TableHead className="flex items-center">Description</TableHead>
                <TableHead className="text-right flex items-center justify-end">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-sm">
              {holidays.map((item) => (
                <TableRow
                  key={item.id}
                  className="grid grid-cols-4 hover:bg-gray-100 transition px-3"
                >
                  <TableCell className="py-3 font-medium flex items-center">
                    {item.title}
                  </TableCell>
                  <TableCell className="py-3 flex items-center">
                    {item.date}
                  </TableCell>

                  <TableCell className="py-3 flex items-center">
                    {item.description || "-"}
                  </TableCell>
                  <TableCell className="py-3 text-right space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil size={16} className="text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        {/* <div className="flex justify-end items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div> */}

        {/* Drawer for Edit */}
        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          direction="right"
        >
          <DrawerContent className="bg-white">
            <DrawerHeader>
              <DrawerTitle>Edit Holiday</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              {selectedHoliday ? (
                <>
                  <p>
                    <strong>Name:</strong> {selectedHoliday.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedHoliday.date}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedHoliday.location}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedHoliday.description}
                  </p>
                  {/* Add form fields here later */}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {show && <HolidayPopUp setShow={setShow} />}
      {deletePopUp && (
        <DeletePopUp setdeletePopUp={setdeletePopUp} holidayId={holidayId} fetchHoilday={fetchHoilday} />
      )}
    </Dashboard>
  );
};

export default Holiday;
