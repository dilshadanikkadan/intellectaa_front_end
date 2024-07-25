import { ContainerFuild } from "@/styles/layouts/Wrappers";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
const Foooter = () => {
  return (
    <div className="mt-36">
      <ContainerFuild>
        <div className="w-full  border-b border-t border-[#20B486] flex md:[60vh]  pb-20 md:mb-5 ">
          <div className="wrapper h-[90%] w-full flex flex-col gap-8 md:gap-0 md:flex-row m-auto">
            <div className="Desc flex-[1] flex  flex-col justify-center gap-7">
              <img
                className="w-28 h-14 object-cover"
                src="/finalLogoDark.png"
                alt=""
              />
              <p>
                Our “Learn from Online Feels Like Real Class” feature brings the
                classroom experience to your screen with unmatched authenticity
                and interactivity. Designed to bridge the gap between virtual
              </p>
              <div className="iconWrapper flex gap-3">
                <div className="h-10 w-10 rounded-full bg-[#20B486] flex items-center justify-center">
                  <InstagramIcon className="text-white" />
                </div>

                <div className="h-10 w-10 rounded-full bg-[#20B486] flex items-center justify-center">
                  <FacebookIcon className="text-white" />
                </div>

                <div className="h-10 w-10 rounded-full bg-[#20B486] flex items-center justify-center">
                  <XIcon className="text-white" />
                </div>
              </div>
            </div>
            <div className="QuickLinks flex-[1] flex flex-col justify-center ml-5    ">
              <h3 className="text-[1.5rem] ">Quick Links</h3>
              <ul className="flex gap-2 flex-col text-[1.1rem] mt-5">
                <Link href={"/"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" /> Home
                </Link>
                <Link href={"/about"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" /> About
                </Link>
                <Link href={"/courses"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" /> Courses
                </Link>
                <Link href={"/blogs"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" /> Blogs
                </Link>
                <Link href={"/Instructor"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" />{" "}
                  Instructor
                </Link>
              </ul>
            </div>
            <div className="QuickLinks flex-[1] flex flex-col justify-center ml-5    ">
              <h3 className="text-[1.5rem] ">Quick Links</h3>
              <ul className="flex gap-2 flex-col text-[1.1rem] mt-5">
                <Link href={"/"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" /> Home
                </Link>
                <Link href={"/about"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" /> About
                </Link>
                <Link href={"/courses"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" /> Courses
                </Link>
                <Link href={"/blogs"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" /> Blogs
                </Link>
                <Link href={"/Instructor"}>
                  <ArrowForwardIcon className="text-[#20B486] mr-2" />{" "}
                  Instructor
                </Link>
              </ul>
            </div>
            <div className="Contact flex-[1] flex flex-col justify-center ml-">
              <h3 className="text-[1.5rem] ">Contact Us</h3>
              <ul className="flex gap-2 flex-col text-[1rem] mt-5">
                <li>
                  <AddLocationIcon className="text-[#20B486] mr-2" />
                  kozhikkode
                </li>
                <li>
                  <LocalPhoneIcon className="text-[#20B486] mr-2" /> +971
                  42711008
                </li>
                <li>
                  <EmailIcon className="text-[#20B486] mr-2" />{" "}
                  dishad3312@gmail.com
                </li>
                <li>
                  <EmailIcon className="text-[#20B486] mr-2" /> Contact Us
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContainerFuild>
    </div>
  );
};

export default Foooter;
