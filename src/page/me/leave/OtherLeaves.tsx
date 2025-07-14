import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const OtherLeaves = () => {
  return (
    <>
      <div className="col-span-3  bg-white rounded-2xl shadow-md p-6 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">OtherLeaves</h2>
        </div>
   
        <div className="flex shadow p-1 rounded-md items-center justify-between">
          <h2 className="text-gray-600 font-medium text-sm ">Covid Leave</h2>
          <Button
            variant="secondary"
            size="icon"
            className="shadow rounded-full bg-lime-400  border border-lime-800 text-gray-400 hover:text-gray-600"
          >
            <ArrowUpRight className="w-4 h-4 text-black" />
          </Button>
        </div>
        <div className="flex shadow p-1 rounded-md items-center justify-between">
          <h2 className="text-gray-600 font-medium text-sm ">Paternity Leave</h2>
          <Button
            variant="secondary"
            size="icon"
            className="shadow rounded-full bg-lime-400  border border-lime-800 text-gray-400 hover:text-gray-600"
          >
            <ArrowUpRight className="w-4 h-4 text-black" />
          </Button>
        </div>
        <div className="flex shadow p-1 rounded-md items-center justify-between">
          <h2 className="text-gray-600 font-medium text-sm">Leave Without Pay</h2>
          <Button
            variant="secondary"
            size="icon"
            className="shadow rounded-full bg-lime-400 border border-lime-800 text-gray-400 hover:text-gray-600"
          >
            <ArrowUpRight className="w-4 h-4 text-black" />
          </Button>
        </div>
        <div className="flex shadow p-1 rounded-md items-center justify-between">
          <h2 className="text-gray-600 font-medium text-sm ">Leave Exceptions</h2>
          <Button
            variant="secondary"
            size="icon"
            className="shadow rounded-full bg-lime-400  border border-lime-800 text-gray-400 hover:text-gray-600"
          >
            <ArrowUpRight className="w-4 h-4 text-black" />
          </Button>
        </div>  
      </div>

    </>
  );
};

export default OtherLeaves;
