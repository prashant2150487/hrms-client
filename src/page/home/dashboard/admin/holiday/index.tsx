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
  const [filtered, setFiltered] = useState<Holiday[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 15;

  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const dummy: Holiday[] = [
      {
        id: "1",
        name: "Diwali",
        date: "31-Jul-2025, Thu",
        location: "-",
        shift: "General",
        classification: "Holiday",
        description: "Festival of Lights",
      },
      {
        id: "2",
        name: "Holi",
        date: "17-Mar-2025, Mon",
        location: "All India",
        shift: "General",
        classification: "Holiday",
        description: "Festival of Colors",
      },
      {
        id: "3",
        name: "Christmas",
        date: "25-Dec-2025, Thu",
        location: "Global",
        shift: "General",
        classification: "Holiday",
        description: "Celebration of birth of Jesus",
      },
      {
        id: "4",
        name: "Independence Day",
        date: "15-Aug-2025, Fri",
        location: "India",
        shift: "General",
        classification: "Holiday",
        description: "India's independence from British rule",
      },
      {
        id: "5",
        name: "Republic Day",
        date: "26-Jan-2025, Sun",
        location: "India",
        shift: "General",
        classification: "Holiday",
        description: "Adoption of the Indian constitution",
      },
      {
        id: "6",
        name: "Eid al-Fitr",
        date: "31-Mar-2025, Mon",
        location: "All",
        shift: "General",
        classification: "Holiday",
        description: "End of Ramadan",
      },
      {
        id: "7",
        name: "Gandhi Jayanti",
        date: "02-Oct-2025, Thu",
        location: "India",
        shift: "General",
        classification: "Holiday",
        description: "Birth of Mahatma Gandhi",
      },
      {
        id: "8",
        name: "New Year's Day",
        date: "01-Jan-2025, Wed",
        location: "Global",
        shift: "General",
        classification: "Holiday",
        description: "First day of the year",
      },
    ];
    setHolidays(dummy);
    setFiltered(dummy);
  }, []);

  useEffect(() => {
    const filteredData = holidays.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filteredData);
    setPage(1);
  }, [query, holidays]);

  const handleEdit = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setDrawerOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = holidays.filter((h) => h.id !== id);
    setHolidays(updated);
  };

  const paginatedData = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

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
            <Button className="border border-gray-800 bg-black text-white"> Add Holiday</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow className="grid grid-cols-7 text-sm text-gray-600 px-3">
                <TableHead className="flex items-center">Name</TableHead>
                <TableHead className="flex items-center">Date</TableHead>
                <TableHead className="flex items-center">Location</TableHead>
                <TableHead className="flex items-center">Shifts</TableHead>
                <TableHead className="flex items-center">
                  Classification
                </TableHead>
                <TableHead className="flex items-center">Description</TableHead>
                <TableHead className="text-right flex items-center justify-end">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-sm">
              {paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  className="grid grid-cols-7 hover:bg-gray-100 transition px-3"
                >
                  <TableCell className="py-3 font-medium flex items-center">
                    {item.name}
                  </TableCell>
                  <TableCell className="py-3 flex items-center">
                    {item.date}
                  </TableCell>
                  <TableCell className="py-3 flex items-center">
                    <Badge variant="outline">{item.location || "-"}</Badge>
                  </TableCell>
                  <TableCell className="py-3 flex items-center">
                    <Badge variant="secondary">{item.shift}</Badge>
                  </TableCell>
                  <TableCell className="py-3 flex items-center">
                    <Badge variant="secondary">{item.classification}</Badge>
                  </TableCell>
                  <TableCell className="py-3 flex items-center">
                    {item.description || "-"}
                  </TableCell>
                  <TableCell className="py-3 text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
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
        <div className="flex justify-end items-center gap-2">
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
        </div>

        {/* Drawer for Edit */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
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
    </Dashboard>
  );
};

export default Holiday;
