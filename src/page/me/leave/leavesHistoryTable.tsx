import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

const LeavesHistoryTable = () => {
  const [showAllLeaves, setShowAllLeaves] = useState([]);
  useEffect(() => {
    leaveHistory();
  }, []);
  const leaveHistory = async () => {
    try {
      const respone = await axiosInstance.get("/v1/leave/my");
      setShowAllLeaves(respone.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Table className=" bg-white rounded-md shadow mt-7">
        <TableHeader className="">
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>Leave Date</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showAllLeaves?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="">
                  {item.startDate}
                  <h2 className="text-[12px]">1 Day</h2>
                </div>
                
              </TableCell>
              <TableCell className="">{item.leaveType}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>
                <Badge
                  className={`rounded-full ${
                    item.status == "Approved" ? "bg-green-600" : "bg-yellow-500"
                  }`}
                >
                  {item.status}
                </Badge>
                <h1 className="text-xs font-semibold">By prashant</h1>
              </TableCell>
              <TableCell className="flex justify-end items-center gap-2">
                {item.status === "Approved" && (
                  <Button className="bg-red-600 text-white shadow px-2 py-1 text-sm">
                    cancel
                  </Button>
                )}
                {item.status == "Pending" && (
                  <>
                    <Button className="bg-red-600 text-white shadow">
                      cancel
                    </Button>
                    <Button className="bg-green-600 text-black shadow">
                      Approved
                    </Button>
                  </>
                )}
                {item.status == "Reject" && (
                  <Button className="bg-green-600 text-black shadow">
                    Approved
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default LeavesHistoryTable;
