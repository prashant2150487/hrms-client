import Dashboard from "@/components/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Calendar1 } from "lucide-react";
import { ClockInCard } from "./ClockInCard";
import SecondaryHeader from "@/components/SecondaryHeader";

const data = ["Dashboard", "Me", ];
const Home = () => {
  return (
    <Dashboard>
      <SecondaryHeader data={data} />
      <div className="grid grid-cols-4 gap-4 p-4">
        <Card className="border-0 bg-white rounded-3xl">
          <CardHeader>
            <CardTitle>
              <Calendar1 />
            </CardTitle>
            <CardDescription className="font-semibold">
              On Leave Today
            </CardDescription>
            <CardAction className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200">
              <ArrowUpRight className="size-5 text-gray-400" />
            </CardAction>
          </CardHeader>
          <CardFooter className="mt-auto">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>

            <h1 className="text-5xl font-bold ml-auto">289</h1>
          </CardFooter>
        </Card>
        <ClockInCard />
        <Card className="border-0 bg-white rounded-3xl"></Card>
        <Card className="border-0 bg-white rounded-3xl"></Card>
      </div>
    </Dashboard>
  );
};

export default Home;
