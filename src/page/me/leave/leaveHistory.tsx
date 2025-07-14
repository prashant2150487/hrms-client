import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
const LeaveHistory = () => {
  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Leave History</h2>
          <Button
            variant="secondary"
            size="icon"
            className=" shadow rounded-full  text-gray-400 hover:text-gray-600"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Button>
        </div>
        {/* <div className="flex flex-col gap-2 items-start"> */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-600 text-xl font-semibold">
              Casual/Sick Leave
            </h2>
            <p className="text-gray-300 text-[17px] font-normal">
              Medial Emergency
            </p>
          </div>
          <div className="flex gap-2 justify-between items-start">
            <Button variant="secondary" className=" shadow rounded-full">
              Sep 28,2023
            </Button>

            <div className="flex flex-wrap items-center gap-2 md:flex-row">
              <Button className="bg-green-200 rounded-full">Approved</Button>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-600 text-xl font-semibold">
              Earned Leave
            </h2>
            <p className="text-gray-300 text-[17px] font-normal">
              Medial Emergency
            </p>
          </div>
          <div className="flex gap-2 justify-between items-start">
            <Button variant="secondary" className=" shadow rounded-full">
              Sep 28,2023
            </Button>

            <div className="flex flex-wrap items-center gap-2 md:flex-row">
              <Button className="bg-pink-100 rounded-full">Pending</Button>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-600 text-xl font-semibold">
              Earned Leave
            </h2>
            <p className="text-gray-300 text-[17px] font-normal">
              Medial Emergency
            </p>
          </div>
          <div className="flex gap-2 justify-between items-start">
            <Button variant="secondary" className=" shadow rounded-full">
              Sep 28,2023
            </Button>

            <div className="flex flex-wrap items-center gap-2 md:flex-row">
              <Button className="bg-green-200 rounded-full">Approved</Button>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-600 text-xl font-semibold">
              Earned Leave
            </h2>
            <p className="text-gray-300 text-[17px] font-normal">
              Medial Emergency
            </p>
          </div>
          <div className="flex gap-2 justify-between items-start">
            <Button variant="secondary" className=" shadow rounded-full">
              Sep 28,2023
            </Button>

            <div className="flex flex-wrap items-center gap-2 md:flex-row">
              <Button className="bg-pink-100 rounded-full">Pending</Button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default LeaveHistory;
