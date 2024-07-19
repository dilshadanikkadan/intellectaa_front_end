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
  getAllUserHelper,
  userBlockHelper,
} from "@/helpers/user/userApiHelper";
import { useQuery } from "@tanstack/react-query";
import UserBlockModal from "./UserDeleteModal";
import { UserTablePagination } from "./UserTablePagination";

const UsersTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 4;

  const {
    data: AllUsers,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getAllUserHelper(pageNumber, limit),
    queryKey: ["users", pageNumber, limit],
  });

  const totalPages = Math.ceil((AllUsers?.totalCount || 0) / limit);

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
                  src={user?.profile || "/avt.png"}
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
              <TableCell className="text-right">
                <UserBlockModal
                  id={`modal_${user.email}`}
                  title="Block User"
                  content={<p>Are you sure you want to block this user?</p>}
                  buttonText={`${user?.isBlocked ? "Unblock" : "block"}`}
                  email={user.email}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UserTablePagination
        setPageNumber={setPageNumber}
        currentPage={pageNumber}
        totalPages={totalPages}
      />
    </div>
  );
};

export default UsersTable;
