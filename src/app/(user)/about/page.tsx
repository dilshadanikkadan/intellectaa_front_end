import Foooter from "@/components/common/Foooter";
import NavBar from "@/components/common/NavBar";
import BreadCrumbs from "@/components/user/about/BreadCrumbs";
import OurService from "@/components/user/about/OurService";
import QuateBanner from "@/components/user/about/QuateBanner";
import AboutGoals from "@/components/user/Home/about/AboutGoals";
import OneToOne from "@/components/user/Home/OneToOne/OneToOne";
import React from "react";

const page = () => {
  return (
    <>
      <NavBar />
      <BreadCrumbs />
      <OurService />
      <QuateBanner />
      <OneToOne/>
      <AboutGoals/>
      <Foooter />
    </>
  );
};

export default page;
