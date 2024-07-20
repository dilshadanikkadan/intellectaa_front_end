import Foooter from "@/components/common/Foooter";
import NavBar from "@/components/common/NavBar";
import SinglePost from "@/components/user/Blogs/SinglePost";
import React from "react";

const page = () => {
  return (
    <div>
      <NavBar />
      <SinglePost />
      <Foooter />
    </div>
  );
};

export default page;
