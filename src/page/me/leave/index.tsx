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
import { useState } from "react";
import Chart from "./chart";
import { Calendar } from "@/components/ui/calendar";
import "react-day-picker/dist/style.css";

import type { DateRange } from "react-day-picker";
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
type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

const Leave = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showCalender, setShowCalender] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 17),
    to: new Date(2025, 5, 20),
  });

  console.log(dateRange);

  return (
    <div className="p-3">
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
            <div className="border-1 grid grid-cols-2 p-4 m-4 rounded-md">
              <div className="flex flex-col items-start justify-center">
                <p className="text-gray-600 text-sm">From</p>
                <p className="text-base">Select Date</p>
              </div>
              <div className="flex flex-col items-end center">
                <p className="text-gray-600 text-sm">To</p>
                <p className="text-base">Select Date</p>
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[100] mx-4">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-md">
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
              <Textarea placeholder="Type your message here." id="message" />
            </div>
            <div className="grid w-[100]  m-4 items-center gap-3">
              <Label htmlFor="picture">Picture</Label>
              <Input />
            </div>
            {/* <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              disabled={{ dayOfWeek: [0, 6] }}
              className=" border-0 shadow-md bg-red"
              classNames={{
                range_start: "bg-black text-white rounded-md text-bold",
                range_end: "bg-black text-white rounded-md",
                selected: "border-0 rounded-md bg-black text-white",
                day: "border-0",
              }}
              excludeDisabled
            /> */}
            <DrawerFooter className="flex flex-row justify-end items-center border-t-1 border-gray-300">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button variant="destructive" className="bg-black text-white">Request</Button>
              
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-3">
        <LeaveHistory />
        <LeaveCalender />
        <OtherLeaves />
      </div>
    </div>
  );
};

export default Leave;
