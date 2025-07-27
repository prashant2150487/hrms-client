import { Button } from "@/components/ui/button";
import LeaveCalender from "./leaveCalender";
import LeaveHistory from "./leaveHistory";
import OtherLeaves from "./OtherLeaves";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { useState } from "react";
<<<<<<< HEAD
import Chart from "./chart";
=======
import { Calendar } from "@/components/ui/calendar";
import "react-day-picker/dist/style.css";


type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};
>>>>>>> 2f9140525592c3272d1bbf8956dc7cdbffa2ae10

const Leave = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 17),
    to: new Date(2025, 5, 20),
  });

  console.log(dateRange);

  return (
    <div className="p-3">
<<<<<<< HEAD
      <Chart/> 
        <Drawer open={open} onOpenChange={setOpen}>
=======
      <div className="flex justify-end">
        <Drawer open={open} onOpenChange={setOpen} direction="right" >
>>>>>>> 2f9140525592c3272d1bbf8956dc7cdbffa2ae10
          <DrawerTrigger asChild>
            <Button
              variant={"ghost"}
              className="shadow rounded-md bg-lime-400 text-gray-800 hover:text-gray-600 ml-auto"
            >
              Apply Leave
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-full max-width-900px bg-white shadow-lg transition-transform duration-300 ">
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
            <div>
              <div className="grid grid-cols-2"></div>
            </div>
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              disabled={{ dayOfWeek: [0, 6] }}
              className=" border-0 shadow-md bg-red"
              classNames={{
                range_start:"bg-black text-white rounded-md text-bold",
                range_end:"bg-black text-white rounded-md",
                selected:"border-0 rounded-md bg-black text-white",
                day:"border-0"
              }}
              excludeDisabled
              size="sm"
              width={200}
            />
          </DrawerContent>
        </Drawer>
<<<<<<< HEAD
=======
      </div>

>>>>>>> 2f9140525592c3272d1bbf8956dc7cdbffa2ae10
      <div className="grid grid-cols-12 gap-4 mt-3">
        <LeaveHistory />
        <LeaveCalender />
        <OtherLeaves />
      </div>
    </div>
  );
};

export default Leave;
