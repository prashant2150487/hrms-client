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
import Chart from "./chart";

const Leave = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-3">
      <Chart/> 
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant={"ghost"}
              className="shadow rounded-md bg-lime-400 text-gray-800 hover:text-gray-600 ml-auto"
            >
              Apply Leave
            </Button>
          </DrawerTrigger>
          <DrawerContent className="fixed h-screen right-0 top-0 h-full w-full max-w-md bg-white shadow-lg transition-transform duration-300 ml-auto">
            <DrawerHeader className="flex flex-row items-center justify-between">
              <div>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-gray-100 focus:outline-none"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      <div className="grid grid-cols-12 gap-4 mt-3">
        <LeaveHistory />
        <LeaveCalender />
        <OtherLeaves />
      </div>
    </div>
  );
};

export default Leave;
