import React, { useEffect, useState } from "react";
import SecondaryHeader from "@/components/SecondaryHeader";
import Dashboard from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { CalendarPlusIcon, Phone, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddPopup from "./AddPopup";
const data = ["Onboard", "Holiday"];
const initialFormData = {
  firstName: "",
  lastName: "",
  password: "Psachan04@",
  confirmPassword: "",
  email: "",
  phone: "",
  role: "",
  AccountHolder: "",
  salary: "",
  reportingManger: "",
  department: "Engineering",
  designation: "Backend Developer",
  startDate: "",
  location: "Delhi",
  panCard: "",
  aadharCard: "",
  AccountNumber: "",
  IFCCode: "",
  BranchName: "",
  BankName: "",
  uanNumber: "",
  companyLocation: "",
  EmployementStatus: "",
  DateOFBirth: "",
  Age: "",
  Gender: "",
  MarriedStatus: "",
};
const Onboard = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [viewRole, setViewRole] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [designations, setDesignations] = useState<string[]>([]);
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [error, setError] = useState({
    firstName: "",

    lastName: "",
    email: "",
    Phone: "",
    password: "",
    confirmPassword: "",
  });
  const validation = () => {
    const newError = {
      firstName: "",
      lastName: "",
      email: "",
      Phone: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;
    if (!formData.firstName.trim()) {
      newError.firstName = "First name is requried";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newError.lastName = "Last name is requried";
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newError.email = "email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newError.email = "Email is not vaild";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newError.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newError.password = "password should 6 character";
      isValid = false;
    }
    if (!formData.confirmPassword.trim()) {
      newError.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "password does not match";
      isValid = false;
    }
    setError(newError);
    return isValid;
  };
  const handleUpdate = (
    stateName: "department" | "designation" | "role",
    value: string
  ) => {
    console.log(stateName, value);
    if (stateName === "department") {
      setDepartments([...departments, value]);
    } else if (stateName == "designation") {
      setDesignations([...designations, value]);
    } else if (stateName == "role") {
      setViewRole([...viewRole, value]);
    }
  };
  const handleAddPopup = (title) => {
    setPopupTitle(title);
    setShowAddPopup(!showAddPopup);
  };
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
    if (!validation()) {
      return;
    }
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
          <DialogContent
            showCloseButton={false}
            className="h-screen min-w-screen bg-[#EDF0F6] overflow-y-auto"
          >
            <div className="flex gap-2 items-end justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="outline"
                onClick={handleAddCandidate}
              >
                Save changes
              </Button>
            </div>
            <form
              onSubmit={handleAddCandidate}
              className="mt-2 flex flex-col gap-3"
            >
              <div className="rounded-md bg-white p-8 shadow-md ">
                <DialogHeader>
                  <DialogTitle>Basic Information</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 mt-5">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={
                          error.firstName
                            ? "border-red-500"
                            : "" + "border-gray-300"
                        }
                      />
                      {error.firstName && (
                        <p className="text-sm">{error.firstName}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={error.lastName ? "border-red-500" : ""}
                      />
                      {error.lastName && (
                        <p className="text-sm">{error.lastName}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={error.email ? "border-red-500" : ""}
                      />
                      {error.email && <p className="text-sm">{error.email}</p>}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Employee Id</Label>
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
                        className={error.Phone ? "border-red-500" : ""}
                      />
                      {error.Phone && <p className="text-sm">{error.Phone}</p>}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={error.password ? "border-red-500" : ""}
                      />
                      {error.password && (
                        <p className="text-sm">{error.password}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword"> Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={
                          error.confirmPassword ? "border-red-500" : ""
                        }
                      />
                      {error.confirmPassword && <p>{error.confirmPassword}</p>}
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
                </div>
              </div>
              <div className="rounded-md bg-white p-8 shadow-md">
                <DialogHeader>
                  <DialogTitle>Work Information</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-4 gap-4 mt-5">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="role">Role</Label>
                    </div>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <div className="flex items-center gap-2 justify-between">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <div className=" py-2 px-3 shadow border rounded-md">
                          <Plus
                            className="w-4 h-4"
                            onClick={() => handleAddPopup("Role")}
                          />
                        </div>
                      </div>
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
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, department: value })
                      }
                    >
                      <div className="flex items-center gap-2 justify-between">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <div
                          className=" cursor-pointer py-2 px-3 shadow border rounded-md"
                          onClick={() => handleAddPopup("department")}
                        >
                          <Plus className="w-4 h-4" />
                        </div>
                        {showAddPopup && (
                          <AddPopup
                            showAddPopup={showAddPopup}
                            setShowAddPopup={setShowAddPopup}
                            popupTitle={popupTitle}
                            handleUpdate={handleUpdate}
                          />
                        )}
                      </div>
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
                      <div className="flex items-center gap-2 justify-between">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a designation" />
                        </SelectTrigger>
                        <div className=" py-2 px-3 shadow border rounded-md">
                          <Plus
                            className="w-4 h-4"
                            onClick={() => handleAddPopup("Designation")}
                          />
                        </div>
                      </div>
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
                  <div className="grid gap-2">
                    <Label>Salary</Label>
                    <Input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Company Location</Label>
                    <div className="flex items-center gap-2 justify-between">
                      <Input
                        type="text"
                        name="companyLocation"
                        value={formData.companyLocation}
                        onChange={handleChange}
                      />
                      <div className=" py-2 px-3 shadow border rounded-md">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

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
                    <Label>Employement status</Label>
                    <Input
                      type="text"
                      name="EmployementStatus"
                      value={formData.EmployementStatus}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Reporting manager</Label>
                    <Input
                      type="text"
                      name="reportingManger"
                      value={formData.reportingManger}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-white p-8 shadow-md ">
                <DialogHeader>
                  <DialogTitle>Personal Information</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-4 gap-4 mt-5">
                  <div className="grid gap-2">
                    <Label htmlFor="panCard">Date of Birth</Label>
                    <Input
                      type="date"
                      id="DateOFBirth"
                      name="DateOFBirth"
                      value={formData.DateOFBirth}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="panCard">Age</Label>
                    <Input
                      type="number"
                      id="Age"
                      name="Age"
                      value={formData.Age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="Gender">Gender</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup className="">
                          <SelectItem value="Male" className="cursor-pointer">
                            Male
                          </SelectItem>
                          <SelectItem value="Female" className="cursor-pointer">
                            Female
                          </SelectItem>
                          <SelectItem value="Other" className="cursor-pointer">
                            Other
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="Gender">Married status</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup className="">
                          <SelectItem value="Male" className="cursor-pointer">
                            Single
                          </SelectItem>
                          <SelectItem value="Female" className="cursor-pointer">
                            Married
                          </SelectItem>
                          <SelectItem
                            value="divorced"
                            className="cursor-pointer"
                          >
                            Divorced
                          </SelectItem>
                          <SelectItem
                            value="widowed"
                            className="cursor-pointer"
                          >
                            Widowed
                          </SelectItem>
                          <SelectItem
                            value="separated"
                            className="cursor-pointer"
                          >
                            Separated
                          </SelectItem>
                          <SelectItem value="prefer_not_to_say" className="cursor-pointer">Prefer not to say</SelectItem>
                          <SelectItem value="Other" className="cursor-pointer">
                            Other
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-white p-8 shadow-md ">
                <DialogHeader>
                  <DialogTitle>Identity Information</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-4 gap-4 mt-5">
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
                  <div className="grid gap-2">
                    <Label htmlFor="aadharCard">Account Holder Name</Label>
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
                      id="AccountNumber"
                      name="AccountNumber"
                      value={formData.AccountNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="IFCCode"> IFC code</Label>
                    <Input
                      id="IFCCode"
                      name="IFCCode"
                      value={formData.IFCCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="BankName">Bank Name</Label>
                    <Input
                      id="BankName"
                      name="BankName"
                      value={formData.BankName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="BranchName">Branch Name</Label>
                    <Input
                      id="BranchName"
                      name="BranchName"
                      value={formData.BranchName}
                      onChange={handleChange}
                    />
                  </div>
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
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <AdminUserTable users={users} fetchUserData={fetchUserData} />
    </Dashboard>
  );
};

export default Onboard;
