import { Button } from "@/components/ui/button";
import LeaveCalender from "./leaveCalender";
import LeaveHistory from "./leaveHistory";
import OtherLeaves from "./OtherLeaves";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X } from "lucide-react"; // Add this import
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const Leave = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
  return (
    <div className="p-3">
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
          <DrawerContent className=" w-full max-w-5xl bg-white shadow-lg transition-transform duration-300 ">
            <DrawerHeader className="flex flex-row items-center justify-between border-b-1 border-gray-300">
              <DrawerTitle>Request Leave?</DrawerTitle>
              <Button
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-gray-100 focus:outline-none shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </Button>
            </DrawerHeader>
            <Calendar
              mode="single"
              defaultMonth={date}
              numberOfMonths={2}
              selected={date}
              onSelect={setDate}
              className="rounded-lg border shadow-sm"
            />
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
