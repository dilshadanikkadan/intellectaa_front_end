import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { monthNames } from "@/types/constants/Months";
import { userAnalyticsHelper } from "@/helpers/user/userApiHelper";
import { TOBE } from "@/types/constants/Tobe";
import { Card } from "@/components/ui/card";

const UserGraph = () => {
  const { data: userDataAnalstics } = useQuery({
    queryKey: ["user Analaystics"],
    queryFn: userAnalyticsHelper,
  });

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Analystics",
        data: [],
        backgroundColor: [
          "#3498db", // Bright blue
          "#2ecc71", // Emerald green
          "#e74c3c", // Soft red
          "#f39c12", // Orange
          "#9b59b6", // Purple
          "#1abc9c", // Turquoise
          "#34495e", // Dark blue-gray
          "#e67e22", // Dark orange
        ],
    
      },
    ],
  });

  useEffect(() => {
    if (userDataAnalstics) {
      const userDataAnalysed = userDataAnalstics.payload
        .map((x: TOBE) => ({
          ...x,
          monthCurrent: monthNames[x.month - 1],
        }))
        .sort((a: TOBE, b: TOBE) => a.month - b.month);

      setUserData({
        labels: userDataAnalysed.map((data: TOBE) => data.monthCurrent),
        datasets: [
          {
            ...userData.datasets[0],
            data: userDataAnalysed.map((data: TOBE) => data.count),
          },
        ],
      });
    }
  }, [userDataAnalstics]);

  return (
    <div>
      <p className="font-bold text-2xl ">User Analaytics</p>
      <Card className="w-[75%] mt-10   px-2">
        <Bar data={userData} />
      </Card>
    </div>
  );
};

export default UserGraph;
