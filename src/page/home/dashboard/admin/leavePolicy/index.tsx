import SecondaryHeader from "@/components/SecondaryHeader";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { secondaryHeaderData } from "@/constants/secondaryHeaderData";
import axiosInstance from "@/lib/axios";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import LeavePopup from "./leavePopup";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/features/loader";
import LeaveCreateConfirm from "./leaveCreateConfirm";
import { Badge } from "@/components/ui/badge";
const LeavePolicy = () => {
  const [polies, setPolies] = useState([]);
  const [query, setQuery] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [leaveCreate, setLeaveCreate] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPolicyData, setselectedPolicyData] = useState({});
  const dispatch = useDispatch();
  const fetchPolies = async () => {
    try {
      dispatch(showLoader());
      const response = await axiosInstance.get("/v1/policy");
      console.log(response.data.data);
      setPolies(response.data?.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoader());
  };
  useEffect(() => {
    fetchPolies();
  }, []);
  const handleLeaveCreate = (yearCreate) => {
    setSelectedYear(yearCreate);
    setLeaveCreate(!leaveCreate);
  };
  const handleEdit = (item) => {
    setShowCreatePopup(true);
    setselectedPolicyData(item);
  };
  return (
    <>
      <SecondaryHeader data={secondaryHeaderData?.admin} />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Leave Policy</h1>
          <div className=" flex items-center gap-2 ">
            <Input
              placeholder="Search holiday name..."
              className="max-w-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              onClick={() => setShowCreatePopup(true)}
              className="border border-gray-800 bg-black text-white"
            >
              Add Leave Policy
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow className="grid grid-cols-7 text-sm text-gray-600 px-3">
                <TableHead className="flex items-center">Year</TableHead>
                <TableHead className="flex items-center">PaidLeaves</TableHead>
                <TableHead className="flex items-center">SickLeaves</TableHead>
                <TableHead className="flex items-center">
                  EmergencyLeaves
                </TableHead>
                <TableHead className="flex items-center">
                  Apply Policy
                </TableHead>
                <TableHead className="flex items-center">IsActive</TableHead>
                <TableHead className="text-right flex items-center justify-end">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm">
              {polies?.map((item) => (
                <TableRow
                  key={item?._id}
                  className="grid grid-cols-7  transition px-3"
                >
                  <TableCell className="py-3 font-medium flex items-center">
                    {item.year}
                  </TableCell>
                  <TableCell className="py-3 font-medium flex items-center">
                    {item.paidLeaves}
                  </TableCell>
                  <TableCell className="py-3 flex items-center">
                    {item?.sickLeaves}
                  </TableCell>
                  <TableCell className="py-3 flex items-center">
                    {item.emergencyLeaves}
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Button
                      onClick={() => handleLeaveCreate(item.year)}
                      className=" cursor-pointer shadow-md border border-gray-800 bg-black text-white"
                    >
                      Apply Leave
                    </Button>
                  </TableCell>
                  <TableCell className="py-3 flex items-center">
                    <Badge
                      className={`px-2 py-1 rounded-md text-white ${
                        item.isActive ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-right space-x-1">
                    <Button
                      onClick={() => handleEdit(item)}
                      variant="ghost"
                      size="icon"
                    >
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
      {showCreatePopup && (
        <LeavePopup
          setShowCreatePopup={setShowCreatePopup}
          fetchPolies={fetchPolies}
          selectedPolicyData={selectedPolicyData}
        />
      )}
      {leaveCreate && (
        <LeaveCreateConfirm
          setLeaveCreate={setLeaveCreate}
          selectedYear={selectedYear}
          fetchPolies={fetchPolies}
        />
      )}
    </>
  );
};

export default LeavePolicy;
