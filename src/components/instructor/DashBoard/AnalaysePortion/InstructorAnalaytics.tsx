"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { monthNames } from "@/types/constants/Months";
import { TOBE } from "@/types/constants/Tobe";
import { Card } from "@/components/ui/card";
import { getInstructorOwnAnalytics } from "@/helpers/course/courseApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";

const InstructorAnalaytics = () => {
  const user = useUserStore((state) => state.user);
  const { data: userDataAnalstics } = useQuery({
    queryKey: ["instructor Course Analaystics"],
    queryFn: () => getInstructorOwnAnalytics(user?._id),
  });

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Course Purchased",
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
        // borderColor: "black",
        // borderWidth: 1,
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
    <>
    <div>
      <p className="font-bold text-2xl mb-10 ">Course Analaytics</p>
      <Card className="w-full h-auto md:w-[75%] mt-10   px-2">
        <Bar data={userData} />
      </Card>
    </div>
    </>
  );
};

export default InstructorAnalaytics;
