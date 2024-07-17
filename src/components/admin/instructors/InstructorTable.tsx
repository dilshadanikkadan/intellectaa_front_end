"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllInstructorHelper,
  getAllUserHelper,
  userBlockHelper,
} from "@/helpers/user/userApiHelper";
import { useQuery } from "@tanstack/react-query";

const InstroctorTable = () => {
  const {
    data: AllUsers,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: getAllInstructorHelper,
    queryKey: ["users"],
  });

  return (
    <div className="w-[90%] mx-auto relative">
      <Table className="relative z-0">
        <TableCaption>A list of Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllUsers?.payload.map((user: any) => (
            <TableRow key={user.email} className="shadow-sm">
              <TableCell className="font-medium">
                <img
                  src={ user?.profile || "/avt.png"}
                  className="w-14 h-w-14 object-cover"
                  alt=""
                />
              </TableCell>
              <TableCell className="font-medium ">{user?.username}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>
                {String(user?.isBlocked ? "blocked" : "active")}
              </TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InstroctorTable;
