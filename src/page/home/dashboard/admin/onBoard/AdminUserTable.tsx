import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DropDownAction from "./DropDownAction";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
const AdminUserTable = ({ users, fetchUserData }) => {

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email Id</TableHead>
            <TableHead className="text-right">Official Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Is Active</TableHead>
             <TableHead>Role</TableHead>
            <TableHead className="text-right">PAN card number</TableHead>
            <TableHead className="text-right">Aadhaar card number</TableHead>
            <TableHead>UAN number</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{item.firstName + " " + item.lastName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="text-right">{item.officialEmail}</TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>
                <Badge
                  color={item.isActive ? "green" : "red"}
                  className={`${item.isActive ? "bg-green-400 text-xs" : "bg-red-100"} text-sm`}
                  variant={item.isActive ? "default" : "destructive"}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>{item?.role}</TableCell>
              <TableCell className="text-right">{item.panCard}</TableCell>
              <TableCell className="text-right">{item.aadhaarCard}</TableCell>
              <TableCell>{item.uanNumber}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <DropDownAction
                  userId={item._id}
                  fetchUserData={fetchUserData}
                  isActive={item?.isActive}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default AdminUserTable;