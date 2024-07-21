"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUserHelper } from "@/helpers/api/auth/authApiHelper";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const InstructorDashboard = ({}) => {
  const user = useUserStore((state) => state.user);
  const { data: currentUser } = useQuery({
    queryKey: ["current"],
    queryFn: () =>
      currentUserHelper({
        email: user?.email,
      }),
  });

  return (
    <div className="w-[90%] mx-auto  flex gap-5">
      <Card className="w-[30%]  h-32 mb-5">
        <CardHeader>
          <CardTitle>Profit</CardTitle>
          <CardContent>$ {currentUser?.payload?.profit}</CardContent>
        </CardHeader>
      </Card>

      <Card className="w-[30%]  h-32 mb-5 ">
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardContent>7</CardContent>
        </CardHeader>
      </Card>

      <Card className="w-[30%]  h-32 mb-5">
        <CardHeader>
          <CardTitle>Total Course</CardTitle>
          <CardContent>10</CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default InstructorDashboard;
