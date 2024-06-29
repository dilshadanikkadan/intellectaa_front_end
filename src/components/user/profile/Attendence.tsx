import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityData {
  [date: string]: number;
}

const generateActivityData = (): ActivityData => {
  const data: ActivityData = {};
  const today = new Date();
  for (let i = 179; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    data[date.toISOString().split('T')[0]] = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
  }
  return data;
};

interface ActivitySquareProps {
  date: string;
  activity: number;
}

const ActivitySquare: React.FC<ActivitySquareProps> = ({ date, activity }) => {
  const getColor = (value: number): string => {
    if (value === 0) return "bg-gray-100";
    if (value === 1) return "bg-green-200";
    if (value === 2) return "bg-green-300";
    if (value === 3) return "bg-green-400";
    if (value === 4) return "bg-green-500";
    return "bg-green-600";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`w-3 h-3 ${getColor(activity)} rounded-sm`} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{`${date}: ${activity} contributions`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ActivityTracker: React.FC = () => {
  const activityData: ActivityData = generateActivityData();

  return (
    <Card className="w-[95%] max-w-4xl ml-10 mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-gray-600">What You have Done</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {Object.entries(activityData).map(([date, activity]) => (
            <ActivitySquare key={date} date={date} activity={activity} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-4 ">
          <span className="text-sm text-gray-500">Less</span>
          <div className="flex items-center space-x-1">
            {[100, 200, 300, 400, 500, 600].map((shade: number) => (
              <div key={shade} className={`w-3 h-3 bg-green-${shade} rounded-sm`} />
            ))}
          </div>
          <span className="text-sm text-gray-500">More</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTracker;