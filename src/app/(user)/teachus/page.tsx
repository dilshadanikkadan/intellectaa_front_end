import Foooter from "@/components/common/Foooter";
import NavBar from "@/components/common/NavBar";
import ApplyDoctor from "@/components/user/teachus/ApplyDoctor";
import HowToApply from "@/components/user/teachus/HowToApply";
import TachUsBreakcrumbs from "@/components/user/teachus/TachUsBreakcrumbs";

const page = () => {
  return (
    <>
      <TachUsBreakcrumbs />
      <ApplyDoctor />
      <HowToApply />
    </>
  );
};

export default page;
