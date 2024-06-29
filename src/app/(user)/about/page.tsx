import Foooter from "@/components/common/Foooter";
import NavBar from "@/components/common/NavBar";
import BreadCrumbs from "@/components/user/about/BreadCrumbs";
import OurService from "@/components/user/about/OurService";
import QuateBanner from "@/components/user/about/QuateBanner";
import React from "react";

const page = () => {
  return (
    <>
      <NavBar />
      <BreadCrumbs />
      <OurService />
      <QuateBanner />
      <Foooter />
    </>
  );
};

export default page;
