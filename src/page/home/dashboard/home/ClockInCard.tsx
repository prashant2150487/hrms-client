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
import { ArrowUpRight, Calendar1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const ClockInCard = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  // Store today's date once on component mount
  const today = useRef(new Date().toDateString());

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
          className="bg-violet-200 ml-auto cursor-pointer"
          variant="secondary"
        >
          Web Clock in
        </Button>
      </CardFooter>
    </Card>
  );
};
