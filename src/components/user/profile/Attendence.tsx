"use client"
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getMyAttendenceHelper } from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";

interface ActivityData {
  [date: string]: number;
}

interface ActivitySquareProps {
  date: string;
  activity: number;
}

const ActivitySquare: React.FC<ActivitySquareProps> = ({ date, activity }) => {
  const getColor = (value: number): string => {
    if (value === 0) return "bg-gray-100";
    if (value === 1) return "bg-green-300";
    if (value === 2) return "bg-green-400";
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
          <p>{`${date}: ${activity} Submission`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ActivityTracker: React.FC = () => {
  const user = useUserStore(state => state.user);

  const { data: myAttendance } = useQuery({
    queryKey: ['myAttendance', user?._id],
    queryFn: getMyAttendenceHelper
  });

  const generateActivityData = (attendanceData: any): ActivityData => {
    const data: ActivityData = {};
    const startDate = new Date('2024-01-01');
    for (let i = 0; i < 180; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      data[date.toISOString().split('T')[0]] = 0;
    }

    attendanceData?.forEach((entry: any) => {
      const date = entry._id;
      const submissions = entry.submissionByDate.length;
      data[date] = submissions;
    });

    return data;
  };

  const activityData: ActivityData = generateActivityData(myAttendance?.payload);

  return (
    <Card className="w-[95%] max-w-4xl ml-10 mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-gray-600">What You have Done</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {Object.entries(activityData)?.map(([date, activity]) => (
            <ActivitySquare key={date} date={date} activity={activity} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-4 ">
          <span className="text-sm text-gray-500">Less</span>
          <div className="flex items-center space-x-1">
            {[100, 200, 300, 400, 500, 600]?.map((shade: number) => (
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
