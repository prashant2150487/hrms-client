import SecondaryHeader from "@/components/SecondaryHeader";
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
import { hideLoader, showLoader } from "@/features/loader";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RejectPopup from "./RejectPopup";
import { secondaryHeaderData } from "@/constants/secondaryHeaderData";
const ManageLeaves = () => {
  const [allLeaves, setAllLeaves] = useState([]);
  const [rejectLeaveId, setRejectLeaveId] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllLeaves();
  }, []);
  const fetchAllLeaves = async () => {
    try {
      dispatch(showLoader());
      const response = await axiosInstance.get("/v1/leave/all-leaves");
      console.log(response.data.data);
      setAllLeaves(response.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };
  const handleApprove = async (leaveId) => {
    try {
      dispatch(showLoader());
      const response = await axiosInstance.put(`/v1/leave/${leaveId}/status`, {
        status: "Approved",
      });
      fetchAllLeaves();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };
  const handleReject = (leaveId) => {
    setRejectLeaveId(leaveId)
    setShow(true);
  };
  return (
    <>
      <SecondaryHeader data={secondaryHeaderData.admin} />
      {show && <RejectPopup setShow={setShow} rejectLeaveId={rejectLeaveId} fetchAllLeaves={fetchAllLeaves} />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email Id</TableHead>
            <TableHead>leaveType</TableHead>
            <TableHead>reason</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allLeaves?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                {item.user.firstName + " " + item.user.lastName}
              </TableCell>
              <TableCell>{item.user.email}</TableCell>
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
              </TableCell>
              <TableCell className="flex justify-end items-center gap-2">
                {item.status === "Approved" && (
                  <Button
                    onClick={() => handleReject(item?._id)}
                    className="bg-red-600 text-white shadow"
                  >
                    Reject
                  </Button>
                )}
                {item.status == "Pending" && (
                  <>
                    <Button
                      onClick={() => handleReject(item?._id)}
                      className="bg-red-600 text-white shadow"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(item._id)}
                      className="bg-green-600 text-black shadow"
                    >
                      Approved
                    </Button>
                  </>
                )}
                {item.status == "Reject" && (
                  <Button
                    onClick={() => handleApprove(item._id)}
                    className="bg-green-600 text-black shadow"
                  >
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

export default ManageLeaves;
