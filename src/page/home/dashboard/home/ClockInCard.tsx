import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hideLoader, showLoader } from "@/features/loader";
import axiosInstance from "@/lib/axios";
import { getCurrentLocation } from "@/utils/getCurrentLocation";
import { ArrowUpRight, Calendar1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const ClockInCard = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);

  // Store today's date once on component mount
  const today = useRef(new Date().toDateString());

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch =useDispatch()
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(formattedTime);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  const fetchClockInStatus = async () => {
    try {
      dispatch(showLoader())
      const response = await axiosInstance("/v1/attendance/status");

      setIsClockedIn(response.data.isClockIn);
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(hideLoader())
    }
  };
  useEffect(() => {
    fetchClockInStatus();
  }, []);

  const handClockClick = async () => {
    try {
      dispatch(showLoader())  
      const { latitude, longitude } = await getCurrentLocation();
      if (isClockedIn) {
        const response = await axiosInstance.post("/v1/attendance/webClockOut");
        fetchClockInStatus();
      } else {
        const response = await axiosInstance.post("/v1/attendance/webCLockIn", {
          latitude,
          longitude,
        });
        await fetchClockInStatus();
      }
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(hideLoader())
    }
  };
  return (
    <Card className="border-0 bg-white rounded-3xl">
      <CardHeader>
        <CardTitle>
          <Calendar1 />
        </CardTitle>
        <CardDescription className="font-semibold">
          Time Today - {today.current}
        </CardDescription>
        <CardAction className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200">
          <ArrowUpRight className="size-5 text-gray-400" />
        </CardAction>
      </CardHeader>

      <CardContent>
        <div>
          <p className="text-xs font-normal">CURRENT TIME</p>
          <h3 className="text-2xl font-bold">{currentTime}</h3>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="bg-violet-200 ml-auto cursor-pointer hover:bg-violet-300"
          variant="secondary"
          onClick={() => handClockClick()}
        >
          {isClockedIn ? "Clock Out" : "web clock In"}
        </Button>
      </CardFooter>
    </Card>
  );
};
