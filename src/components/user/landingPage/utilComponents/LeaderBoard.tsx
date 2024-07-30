"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardHelper } from "@/helpers/course/courseApiHelper";
import { TOBE } from "@/types/constants/Tobe";
import { ThumbUp } from "@mui/icons-material";
const LeaderBoard = () => {
  const { data: leaderBoard } = useQuery({
    queryKey: ["leaderBoard"],
    queryFn: getLeaderBoardHelper,
  });
  return (
    <Card className="w-[90%] mx-auto mb-10 md:w-[98%] mt-3 ml-5 ">
      <p className="py-2 font-semibold  ml-3 *:">Leader Board</p>
      <Table className=" z-0">
        <TableCaption>A list of Users</TableCaption>
        <TableHeader className=" ">
          <TableRow>
            <TableHead className=" h-4 ">Profile</TableHead>
            <TableHead className="w-[100px]  h-4 font-semibold">Name</TableHead>
            <TableHead className=" h-4 font-semibold">Submission</TableHead>
            <TableHead className=" h-4 font-semibold">Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderBoard?.payload.map((user: TOBE, i: number) => (
            <TableRow key={i} className=" p-2   ">
              <TableCell className="font-medium p-2  ">
                <img
                  src={user?.profile || "/avt.png"}
                  className="w-7 h-7 object-cover rounded-full"
                  alt=""
                />
              </TableCell>
              <TableCell className="font-medium p-2 text-nowrap   text-[1rem] ">
                {user?.userName}
              </TableCell>
              <TableCell className="font-medium p-2  ">
                {user?.totalSubmissions}
              </TableCell>
              <TableCell className="font-medium p-2  ">
                {user?.totalLikes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default LeaderBoard;
