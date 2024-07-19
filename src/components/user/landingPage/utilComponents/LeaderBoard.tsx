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
const LeaderBoard = () => {
  return (
    <Card className="w-[98%] mt-3 ml-5 ">
        <p className="py-2 font-semibold  ml-3 *:">Leader Board</p>
      <Table className=" z-0">
        <TableCaption>A list of Users</TableCaption>
        <TableHeader className=" ">
          <TableRow>
            <TableHead className=" h-4 ">
              Profile
            </TableHead>
            <TableHead className="w-[100px]  h-4 font-semibold">
              Name
            </TableHead>
            <TableHead className=" h-4 font-semibold">
              Submission
            </TableHead>
            <TableHead className=" h-4 font-semibold">
              Likes
            </TableHead>


          </TableRow>
        </TableHeader>
        <TableBody>
   {
    [...Array(6).fill('.')].map((x)=>(
        <TableRow className=" p-2   ">
        <TableCell className="font-medium p-2  ">
          <img
            src={"/avt.png"}
            className="w-7 h-7 object-cover"
            alt=""
          />
        </TableCell>
        <TableCell className="font-medium p-2   ">{"dilshad"}</TableCell>
        <TableCell className="font-medium p-2  ">{"10"}</TableCell>
        <TableCell className="font-medium p-2  ">{"20"}</TableCell>
      </TableRow>
    ))
   }
        </TableBody>
      </Table>
    </Card>
  );
};

export default LeaderBoard;
