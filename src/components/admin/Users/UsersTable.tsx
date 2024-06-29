"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUserHelper, userBlockHelper } from "@/helpers/user/userApiHelper";
import Modal from "@/styles/ui/Modal";
import { useQuery } from "@tanstack/react-query";
import UserBlockModal from "./UserDeleteModal";

const UsersTable = () => {
  const { data: AllUsers, isLoading, refetch } = useQuery({
    queryFn: getAllUserHelper,
    queryKey: ["users"],
  });

  return (
    <div className="w-[90%] mx-auto  relative">
      <Table className="relative z-0">
        <TableCaption>A list Users</TableCaption>
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
                  src="/avt.png"
                  className="w-14 h-w-14  object-cover"
                  alt=""
                />
              </TableCell>
              <TableCell className="font-medium ">{user?.username}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>{String(user?.isBlocked ? "blocked" :"active")}</TableCell>
              <TableCell className="text-right">
                <UserBlockModal
                  id={`modal_${user.email}`}
                  title="Block User"
                  content={<p>Are you sure you want to block this user?</p>}
                  buttonText={`${user?.isBlocked ? "Unblock" :"block"}   `}
                  email={user.email}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;