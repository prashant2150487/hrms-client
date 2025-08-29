import { Button } from "@/components/ui/button";
import LeaveCalender from "./leaveCalender";
import LeaveHistory from "./leaveHistory";
import OtherLeaves from "./OtherLeaves";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Chart from "./chart";
import { Calendar } from "@/components/ui/calendar";
import "react-day-picker/dist/style.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SecondaryHeader from "@/components/SecondaryHeader";
import { secondaryHeaderData } from "@/constants/secondaryHeaderData";
import LeavesHistoryTable from "./leavesHistoryTable";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
};
const Leave = () => {
  const [open, setOpen] = useState<boolean>(false);
  // const [show, setShow] = useState<boolean>(false);
  const [notifyText, setNotifyText] = useState<string>("");
  const [notifyUsers, setNotifyUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  // const [open, setOpen] = React.useState(false)
  const [startShowCalender, setStartShowCalender] = useState<boolean>(false);
  const [endShowCalender, setEndShowCalender] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const handleRequest = async () => {
    try {
      const response = await axiosInstance.post("/v1/leave/apply-leave", {
        startDate: "2025-08-10",
        endDate: "2025-08-15",
        leaveType: "Sick Leave",
        reason: "Medical treatment",
        notifyTo: ["6890e366fc5d02e19d3c216a"],
      });
      if (response.status === 201) {
        toast.success("Leave request sent successfully");
        setOpen(false);
      }
    } catch (err) {
      console.log(err, "error");
    }
  };
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select Date";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  console.log(startDate, "dfgdfg");
  const getNotifyUser = async () => {
    // setShow(true);
    // setNotifyText(e.target.value);
    // if (e.length < 3) {
    //   return;
    // }
    try {
      const response = await axiosInstance(
        `/v1/leave/notifyUser?search=${notifyText}`
      );
      if (response.status === 200) {
        setNotifyUsers(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(notifyUsers, "terter");
  useEffect(() => {
    if (notifyText.length < 3) return;
    const handler = setTimeout(() => {
      getNotifyUser();
    }, 1000);
    return () => clearTimeout(handler);
  }, [notifyText]);

  const handleSelect = (item: User) => {
    setSelectedUsers([...selectedUsers, item]);
    setNotifyText("");
    setNotifyUsers([]);
  };

  const handleRemoveUser = (index: number) => {
    setSelectedUsers([
      ...selectedUsers.slice(0, index),
      ...selectedUsers.slice(index + 1),
    ]);
  };
  const handleSelectDate = (date: Date) => {
    if (startShowCalender) {
      setStartDate(date);
      setStartShowCalender(false);
    }
    if (endShowCalender) {
      setEndDate(date);
      setEndShowCalender(false);
    }
  };
  return (
    <div className="p-3">
      <SecondaryHeader data={secondaryHeaderData?.me} />
      <Chart />
      <div className="flex justify-end">
        <Drawer open={open} onOpenChange={setOpen} direction="right">
          <DrawerTrigger asChild>
            <Button
              variant={"ghost"}
              className="shadow rounded-md bg-lime-400 text-gray-800 hover:text-gray-600 ml-auto"
            >
              Apply Leave
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-full width-900px bg-white shadow-lg transition-transform duration-300 ">
            <DrawerHeader className="flex flex-row items-center justify-between border-b-1 border-gray-300">
              <DrawerTitle>Request Leave</DrawerTitle>
              <Button
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-gray-100 focus:outline-none shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </Button>
            </DrawerHeader>
            <div className="border-1 border-gray-300 grid grid-cols-2 p-4 m-4 rounded-md">
              <div
                className="flex flex-col items-start justify-center cursor-pointer"
                onClick={() => setStartShowCalender(!startShowCalender)}
              >
                <p className="text-gray-600 text-sm">From</p>
                <p className="text-base">{formatDate(startDate)}</p>
              </div>
              <div
                className="flex flex-col items-end center"
                onClick={() => setEndShowCalender(!endShowCalender)}
              >
                <p className="text-gray-600 text-sm">To </p>
                <p className="text-base">{formatDate(endDate)}</p>
              </div>
            </div>
            {(startShowCalender || endShowCalender) && (
              <Calendar
                mode="single"
                selected={startShowCalender ? startDate : endDate}
                onSelect={(date) => handleSelectDate(date as Date)}
                className="rounded-md border shadow-sm"
                captionLayout="dropdown"
                disabled={{ dayOfWeek: [0, 6] }}
                classNames={{
                  range_start: "bg-black text-white rounded-md text-bold",
                  range_end: "bg-black text-white rounded-md",
                  selected: "border-0 rounded-md bg-black text-white",
                  day: "border-0",
                  today: "bg-blue-500 text-white rounded-md",
                }}
              />
            )}

            <Select>
              <SelectTrigger className="w-[100] mx-4 border-gray-300">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-md border-gray-300">
                <SelectGroup>
                  <SelectLabel>Leave Types</SelectLabel>
                  <SelectItem value="comp-off">Comp off</SelectItem>
                  <SelectItem value="sick-leave">Sick Leave</SelectItem>
                  <SelectItem value="casual-leave">Casual Leave</SelectItem>
                  <SelectItem value="special-leave">Special Leave</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="grid w-[100] mx-4 mt-4 gap-3">
              <Label htmlFor="message">Your message</Label>
              <Textarea placeholder="Type here" className="border-gray-300" />
            </div>
            <div className="grid w-[100]  m-4 items-center gap-3">
              <Label htmlFor="picture">Notify</Label>
              <div className="flex items-center gap-1 border-1 px-2 py-1 rounded-md">
                {selectedUsers.map((item, index) => (
                  <Badge
                    key={index}
                    variant="default"
                    className="bg-gray-200 cursor-pointer"
                    onClick={() => handleRemoveUser(index)}
                  >
                    {item?.firstName + " " + item?.lastName}
                    <X />
                  </Badge>
                ))}

                <Input
                  onChange={(e) => setNotifyText(e.target.value)}
                  placeholder="Search Employee"
                  value={notifyText}
                  className="border-gray-300 border-0 focus:outline-none outline-none focus-visible:ring-0"
                />
              </div>
              {notifyUsers.length > 0 && notifyText.length > 2 && (
                <ul className="divide-y divide-gray-200 border-1 border-gray-300 p-3 max-w-md rounded-lg">
                  {notifyUsers.map((item, index) => (
                    <li
                      key={index}
                      className="pb-3 sm:pb-4 cursor-pointer"
                      onClick={() => handleSelect(item)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="shrink-0">
                          <img
                            className="w-9 h-9 rounded-full "
                            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="Prashant"
                          />
                        </div>
                        <div className="flex-1 min-w-0 gap-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item?.firstName + item?.lastName}
                          </p>
                          <p className="text-sm font-medium text-gray-500">
                            {item?.email}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <DrawerFooter className="flex flex-row justify-end items-center border-t-1 border-gray-300">
              <DrawerClose asChild>
                <Button variant="outline" className="border-gray-300">
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                onClick={handleRequest}
                variant="destructive"
                className="bg-black text-white"
              >
                Request
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-3">
        <LeaveHistory />
        <LeaveCalender />
        <OtherLeaves />
      </div>
      <LeavesHistoryTable />
    </div>
  );
};

export default Leave;
