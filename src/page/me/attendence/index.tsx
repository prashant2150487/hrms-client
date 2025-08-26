import SecondaryHeader from "@/components/SecondaryHeader";
import AttendanceTable from "./attendanceTable";
import { secondaryHeaderData } from "@/constants/secondaryHeaderData";



const Attendance = () => {
  return (
    <div>
       <SecondaryHeader data={secondaryHeaderData?.me} />
      <AttendanceTable />
    </div>
  );
};

export default Attendance;
