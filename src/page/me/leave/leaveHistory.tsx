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
      </div>
    </>
  );
};

export default LeaveHistory;
