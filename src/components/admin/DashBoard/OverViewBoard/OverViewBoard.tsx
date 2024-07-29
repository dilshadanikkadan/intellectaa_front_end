"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUserHelper } from "@/helpers/api/auth/authApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { CiWavePulse1 } from "react-icons/ci";
import UserGraph from "../Analytics/UserAnalytics";
import InstructorGraph from "../Analytics/InstryuctorAnalytics";
import CourseGraph from "../Analytics/CourseAnalaytics";
const OverViewBoard = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [instructorCount, setInstructorCount] = useState<number>(0);
  const user = useUserStore((state) => state.user);
  const { data: currentUser } = useQuery({
    queryKey: ["current"],
    queryFn: () =>
      currentUserHelper({
        email: user?.email,
      }),
  });
  return (
    <section className="w-[90%] mx-auto flex flex-col gap-6 mt-5">
      <div className="flex w-full">
        <div className="w-[22%]  border-l-2 border-gray-600 h-20 flex items-center gap-8   ">
          <div className="ml-10 flex gap-2 flex-col text-gray-700">
            <h3 className="font-semibold ml-3">Total Users</h3>
            <span className="ml-3 font-semibold">{userCount}</span>
          </div>
          <CiWavePulse1 className="text-5xl ml-2 " />
        </div>

        <div className="w-[22%]  border-l-2 border-gray-600 h-20 flex items-center gap-8   ">
          <div className="ml-10 flex gap-2 flex-col text-gray-700">
            <h3 className="font-semibold ml-3">Total Profit</h3>
            <span className="ml-3 font-semibold">
              {currentUser?.payload?.profit}
            </span>
          </div>
          <CiWavePulse1 className="text-5xl ml-2 " />
        </div>
        <div className="w-[22%]  border-l-2 border-gray-600 h-20 flex items-center gap-8   ">
          <div className="ml-10 flex gap-2 flex-col text-gray-700">
            <h3 className="font-semibold ml-3">Total Instrcutor</h3>
            <span className="ml-3 font-semibold">{instructorCount}</span>
          </div>
          <CiWavePulse1 className="text-5xl ml-2 " />
        </div>
        <div className="w-[22%]  border-l-2 border-gray-600 h-20 flex items-center gap-8   ">
          <div className="ml-10 flex gap-2 flex-col text-gray-700">
            <h3 className="font-semibold ml-3">Total Courses</h3>
            <span className="ml-3 font-semibold">{instructorCount}</span>
          </div>
          <CiWavePulse1 className="text-5xl ml-2 " />
        </div>
      </div>

      <div className="w-[90%] mx-auto  flex gap-5">
        <Card className="w-[30%]  h-32 mb-5">
          <CardHeader>
            <CardTitle>Profit</CardTitle>
            <CardContent className="font-semibold">
              $ {currentUser?.payload?.profit}
            </CardContent>
          </CardHeader>
        </Card>

        <Card className="w-[30%]  h-32 mb-5 ">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardContent className="font-semibold">{userCount}</CardContent>
          </CardHeader>
        </Card>

        <Card className="w-[30%]  h-32 mb-5">
          <CardHeader>
            <CardTitle>Total Course</CardTitle>
            <CardContent className="font-semibold">
              {instructorCount}
            </CardContent>
          </CardHeader>
        </Card>
      </div>
      <div className="w-[90%] mx-auto">
        <UserGraph setUserCount={setUserCount} />
      </div>
      <div className="w-[90%] mx-auto">
        <InstructorGraph setInstructorCount={setInstructorCount} />
      </div>
      <div className="w-[90%] mx-auto">
        <CourseGraph />
      </div>
    </section>
  );
};

export default OverViewBoard;
