import { Button } from "@/components/ui/button";

export default function LeaveCalender() {
  const leaveEntries = [
    {
      date: "29",
      month: "Aug",
      title: "Onam",
      subtitle: "Festival",
      action: "apply",
      bgColor: "bg-blue-200",
    },
    {
      date: "30",
      month: "Aug",
      title: "Earned Leave",
      subtitle: "Personal",
      action: "cancel",
      bgColor: "bg-green-200",
    },
    {
      date: "31",
      month: "Aug",
      title: "Carnaval des Français",
      subtitle: "Holiday this month",
      action: null,
      bgColor: "bg-blue-200",
    },
    {
      date: "26",
      month: "Sep",
      title: "Sick Leave",
      subtitle: "Medical Emergency",
      action: "cancel",
      bgColor: "bg-blue-200",
    },
  ];

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl bg-gray-50 ">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Leave Calendar
      </h1>
      <div className="space-y-4">
        {leaveEntries.map((entry, index) => (
          <div key={index} className="border-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`${entry.bgColor} rounded-lg p-3 text-center min-w-[60px]`}
                >
                  <div className="text-lg font-semibold text-gray-800">
                    {entry.date}
                  </div>
                  <div className="text-sm text-gray-600">{entry.month}</div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">{entry.title}</h3>
                  <p className="text-sm text-gray-500">{entry.subtitle}</p>
                </div>
              </div>

              <Button size="sm" className="bg-lime-400">
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
