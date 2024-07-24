import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import { monthNames } from "@/types/constants/Months";
import { TOBE } from "@/types/constants/Tobe";
import { Card } from "@/components/ui/card";
import { getEntrollAnalatytics } from "@/helpers/course/courseApiHelper";

const CourseGraph = () => {
  const { data: courseDataAnalstics } = useQuery({
    queryKey: ["course Analytics"],
    queryFn: getEntrollAnalatytics,
  });

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Instructor Analystics",
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
    if (courseDataAnalstics) {
      const userDataAnalysed = courseDataAnalstics.payload
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
  }, [courseDataAnalstics]);

  return (
    <div>
      <p className="font-bold text-2xl ">Course Analytics</p>
      <Card className="w-[75%] mt-10   px-2">
        <Line data={userData} />
      </Card>
    </div>
  );
};

export default CourseGraph;
