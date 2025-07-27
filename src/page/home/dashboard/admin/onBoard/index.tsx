import React, { useEffect, useState } from "react";
import SecondaryHeader from "@/components/SecondaryHeader";
import Dashboard from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";
import AdminUserTable from "./AdminUserTable";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CalendarPlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const data = ["Onboard"];
const initialFormData = {
  firstName: "",
  lastName: "",
  password: "Psachan04@",
  email: "",
  phone: "",
  role: "",
  AccountHolder:"",
  salary: "",
  reportingManger: "",
  department: "Engineering",
  designation: "Backend Developer",
  startDate: "",
  location: "Delhi",
  panCard: "",
  aadharCard: "",
  AccountName:"",
  uanNumber: "",
};
const Onboard = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [viewRole, setViewRole] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const fetchDepartmentData = async () => {
    try {
      const response = await axiosInstance.get("/v1/admin/users/departments");
      setDepartments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRoleData = async () => {
    try {
      const response = await axiosInstance.get("/v1/admin/users/roles");
      setViewRole(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataDesgination = async () => {
    try {
      const response = await axiosInstance.get(
        `/v1/admin/users/departments/${formData.department}/designations`
      );
      setDesignations(response.data?.data); // Expecting an array here
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/v1/admin/users", formData);
      alert("Candidate added successfully");
      setFormData(initialFormData);
      setDate(undefined);
      setDialogOpen(false);
      fetchUserData();
    } catch (err: any) {
      console.error("Error: " + err.message);
    }
  };
  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/users");
      setUsers(res.data?.data);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUserData();
    fetchRoleData();
    fetchDepartmentData();
    fetchDataDesgination();
  }, []);
  return (
    <Dashboard>
      <SecondaryHeader data={data} />
      <div className="flex justify-end w-full mb-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className=" cursor-pointer">
              Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="h-screen min-w-screen bg-white">
            <form onSubmit={handleAddCandidate}>
              <DialogHeader>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogDescription>
                  Fill in the candidate details below and click save.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Role</SelectLabel>
                          {viewRole.map((item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Row 4 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, department: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Department</SelectLabel>
                          {departments.map((item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, designation: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Designation</SelectLabel>
                          {designations.map((item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Salary</Label>
                    <Input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label>Reporting manager</Label>
                    <Input
                      type="text"
                      name="reportingManger"
                      value={formData.reportingManger}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Drawer open={open} onOpenChange={setOpen}>
                      <DrawerTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between font-normal cursor-pointer"
                        >
                          {formData.startDate
                            ? new Date(formData.startDate).toLocaleDateString()
                            : "Select date"}
                          <CalendarPlusIcon className="ml-2" />
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="w-full  mx-auto bg-white text-black rounded-t-lg p-4 shadow-lg">
                        <DrawerHeader>
                          <DrawerTitle className="text-lg font-semibold mb-2 text-black">
                            Select Start Date
                          </DrawerTitle>
                          <DrawerDescription className="text-sm text-muted-foreground mb-4">
                            Choose the employee's start date
                          </DrawerDescription>
                        </DrawerHeader>
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            setFormData((prev) => ({
                              ...prev,
                              startDate: selectedDate
                                ? selectedDate.toISOString()
                                : "",
                            }));
                            setOpen(false);
                          }}
                          className="mx-auto border rounded-md p-2 "
                        />
                      </DrawerContent>
                    </Drawer>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="panCard">PAN Card</Label>
                    <Input
                      id="panCard"
                      name="panCard"
                      value={formData.panCard}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="aadharCard">Aadhaar Card</Label>
                    <Input
                      id="aadharCard"
                      name="aadharCard"
                      value={formData.aadharCard}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="aadharCard">AccountHolder Name</Label>
                    <Input
                      id="AccountHolder"
                      name="AccountHolder"
                      value={formData.AccountHolder}
                      onChange={handleChange}
                    />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="Account Number"
                      name="Account Number"
                      value={formData.AccountName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="aadharCard"> IFC code</Label>
                    <Input
                      id="AccountHolder"
                      name="AccountHolder"
                      value={formData.AccountHolder}
                      onChange={handleChange}
                    />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="Account Number"
                      name="Account Number"
                      value={formData.AccountName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 7 */}
                <div className="grid gap-2">
                  <Label htmlFor="uanNumber">UAN Number</Label>
                  <Input
                    id="uanNumber"
                    name="uanNumber"
                    value={formData.uanNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" variant="outline">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <AdminUserTable users={users} fetchUserData={fetchUserData} />
    </Dashboard>
  );
};

export default Onboard;
