import { useEffect, useState } from "react";
import SecondaryHeader from "@/components/SecondaryHeader";
import Dashboard from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/lib/axios";
import { Delete, DeleteIcon, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const data = ["Onboard"];

const initialFormData = {
  firstName: "",
  lastName: "",
  password: "Psachan04@",
  email: "",
  phone: "",
  role: "",
  department: "Engineering",
  designation: "Backend Developer",
  startDate: "",
  location: "Delhi",
  panCard: "",
  aadharCard: "",
  uanNumber: "",
};

const onboardData = [
  {
    firstName: "John",
    lastName: "Doe",
    emailId: "john.doe@gmail.com",
    officialEmail: "john.doe@company.com",
    department: "HR",
    sourceHire: "LinkedIn",
    panCard: "ABCDE1234F",
    aadhaarCard: "1234-5678-9012",
    uanNumber: "100200300400",
    action: "View",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    emailId: "jane.smith@gmail.com",
    officialEmail: "jane.smith@company.com",
    department: "Finance",
    sourceHire: "Referral",
    panCard: "XYZAB9876K",
    aadhaarCard: "2345-6789-0123",
    uanNumber: "200300400500",
    action: "View",
  },
];

const Onboard = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/v1/admin/users", formData);

      alert("Candidate added successfully");

      // Optionally reset form
      setFormData(initialFormData);
      setDialogOpen(false);
      fetchUserData();

      // You can refresh or update onboardData here dynamically if needed
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
  }, []);
  // console.log(users, "user");
  return (
    <Dashboard>
      <SecondaryHeader data={data} />
      <div className="flex justify-end w-full mb-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add Candidate</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white">
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
                    <Input
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
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
                {/* Row 6 - panCard, aadharCard */}
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
                {/* Row 7 - uanNumber */}
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
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email Id</TableHead>
            <TableHead className="text-right">Official Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Source Hire</TableHead>
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
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="text-right">{item.officialEmail}</TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>{item.sourceHire}</TableCell>
              <TableCell className="text-right">{item.panCard}</TableCell>
              <TableCell className="text-right">{item.aadhaarCard}</TableCell>
              <TableCell>{item.uanNumber}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-white">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Edit
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <Separator orientation="horizontal" className="border-t border-gray-400" />

                      <DropdownMenuItem>
                        Delete
                        <DropdownMenuShortcut><DeleteIcon/></DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Dashboard>
  );
};

export default Onboard;
