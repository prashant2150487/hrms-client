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

export const ClockInCard = () => {
  return (
    <Card className="border-0 bg-white rounded-3xl">
      <CardHeader>
        <CardTitle>
          <Calendar1 />
        </CardTitle>
        <CardDescription className="font-semibold">
          Time Today - Jun 26, 2025 Thu
        </CardDescription>
        <CardAction className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200">
          <ArrowUpRight className="size-5 text-gray-400" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-xs font-normal">CURRENT TIME</p>
          <h3 className="text-2xl font-bold">08:40:56am</h3>
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
