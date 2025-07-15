import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
const LeaveHistory = () => {
  return (
    <>
      <div className="col-span-5  bg-white rounded-2xl shadow-md p-6 space-y-5">
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
            <h2 className="text-gray-600 text-medium font-semibold">
              Casual/Sick Leave
            </h2>
            <p className="text-gray-300 text-sm font-normal">
              Medial Emergency
            </p>
          </div>
          <div className="flex gap-2 justify-between items-start">
            <Badge className="bg-gray-200 rounded-full text-xs">
              Sep 28,2023
            </Badge>
            <Badge className="bg-green-200 rounded-full text-xs">
              Approved
            </Badge>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-600 text-medium font-semibold">
              Earned Leave
            </h2>
            <p className="text-gray-300 text-sm font-normal">
              Medial Emergency
            </p>
          </div>
          <div className="flex gap-2 justify-between items-start">
            <Badge className="bg-gray-200 rounded-full text-xs">
              Sep 28,2023
            </Badge>
            <Badge className="bg-green-200 rounded-full text-xs">
              Approved
            </Badge>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-600 text-medium font-semibold">
              Earned Leave
            </h2>
            <p className="text-gray-300 text-sm font-normal">
              Medial Emergency
            </p>
          </div>
          <div className="flex gap-2 justify-between items-start">
            <Badge className="bg-gray-200 rounded-full text-xs">
              Sep 28,2023
            </Badge>
            <Badge className="bg-green-200 rounded-full text-xs">
              Approved
            </Badge>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-600 text-medium font-semibold">
              Earned Leave
            </h2>
            <p className="text-gray-300 text-sm font-normal">
              Medial Emergency
            </p>
          </div>
          <div className="flex gap-2 justify-between items-start">
            <Badge className="bg-gray-200 rounded-full text-xs">
              Sep 28,2023
            </Badge>
            <Badge className="bg-green-200 rounded-full text-xs">
              Approved
            </Badge>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default LeaveHistory;
