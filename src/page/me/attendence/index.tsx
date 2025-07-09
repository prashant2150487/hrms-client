import SecondaryHeader from "@/components/SecondaryHeader";
import AttendanceTable from "./attendanceTable";



const data = ["Attendance", "leave"];
const Attendance = () => {
  return (
    <div>
       <SecondaryHeader data={data} />
      <AttendanceTable />
    </div>
  );
};

export default Attendance;
