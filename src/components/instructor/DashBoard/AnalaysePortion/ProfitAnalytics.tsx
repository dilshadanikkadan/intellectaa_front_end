"use client";
import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { monthNames } from "@/types/constants/Months";
import { TOBE } from "@/types/constants/Tobe";
import { Card } from "@/components/ui/card";
import { getInstructorOwnAnalytics } from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";

const ProfitAnalaytics = () => {
  const user = useUserStore((state) => state.user);
  const { data: userDataAnalstics } = useQuery({
    queryKey: ["instructor Course Analaystics"],
    queryFn: () => getInstructorOwnAnalytics(user?._id),
  });

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Profit Achieved",
        data: [],
        backgroundColor: [
          "#3498db",
          "#2ecc71",
          "#e74c3c",
          "#f39c12",
          "#9b59b6",
          "#1abc9c",
          "#34495e",
          "#e67e22",
        ],
        borderColor: "black",
        borderWidth: 1,
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
            data: userDataAnalysed.map((data: TOBE) => data.profit),
          },
        ],
      });
    }
  }, [userDataAnalstics]);

  return (
    <>
      <div>
        <p className="font-bold text-2xl mb-10">Profit Analaytics</p>
        <Card className="w-full h-auto md:w-[75%] mt-10   px-2">
          <Line data={userData} />
        </Card>
      </div>
    </>
  );
};

export default ProfitAnalaytics;
