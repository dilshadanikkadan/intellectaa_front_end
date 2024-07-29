"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUserHelper } from "@/helpers/api/auth/authApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import InstructorAnalaytics from "./InstructorAnalaytics";
import ProfitAnalaytics from "./ProfitAnalytics";
import Analaysis from "./Analaysis";
import { TOBE } from "@/types/constants/Tobe";

const InstructorDashboard = ({ totalCourse }: { totalCourse: TOBE }) => {
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const user = useUserStore((state) => state.user);
  const { data: currentUser } = useQuery({
    queryKey: ["current"],
    queryFn: () =>
      currentUserHelper({
        email: user?.email,
      }),
  });

  useEffect(() => {
    if (Array.isArray(totalCourse)) {
      const count = totalCourse.reduce(
        (acc: number, curr: { enrollmentCount?: number }) => 
          acc + (curr?.enrollmentCount || 0),
        0
      );
      setTotalStudents(count);
    }
  }, [totalCourse]);
  return (
    <>
      <div>
        <Analaysis
          totalCourse={totalCourse?.length}
          totalUsers={10}
          totalProfit={currentUser?.payload?.profit}
          totalStudent={totalStudents}
        />
        <div className="w-[90%] mx-auto  flex flex-col md:flex-row gap-5 overflow-hidden">
          <Card className="w-[70%] md:w-[30%]  h-32 mb-5">
            <CardHeader>
              <CardTitle>Profit</CardTitle>
              <CardContent>$ {currentUser?.payload?.profit}</CardContent>
            </CardHeader>
          </Card>

          <Card className="w-[70%] md:w-[30%]  h-32 mb-5 ">
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardContent>{totalStudents}</CardContent>
            </CardHeader>
          </Card>

          <Card className="w-[70%] md:w-[30%]  h-32 mb-5">
            <CardHeader>
              <CardTitle>Total Course</CardTitle>
              <CardContent>{totalCourse?.length}</CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className="w-[90%] mx-auto">
          <InstructorAnalaytics />
        </div>
        <div className="w-[90%] mx-auto">
          <ProfitAnalaytics />
        </div>
      </div>
    </>
  );
};

export default InstructorDashboard;
