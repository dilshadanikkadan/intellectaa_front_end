"use client";

import { useUserStore } from "@/store/storeProviders/UseUserStore";
import NavBar from "@/components/common/NavBar";
import TutorialHell from "@/components/user/Home/TutorialHell/TutorialHell";
import MainBanner from "@/components/user/Home/Banner/MainBanner";
import AboutSection from "@/components/user/Home/about/AboutSection";
import OneToOne from "@/components/user/Home/OneToOne/OneToOne";
import AboutGoals from "@/components/user/Home/about/AboutGoals";
import Productivity from "@/components/user/Home/productivity/Productivity";
import WhyUs from "@/components/user/Home/whyUs/WhyUs";
import GlobWithchild from "@/components/user/Home/GlobWithChild/GlobWithchild";
import Foooter from "@/components/common/Foooter";
import { Wrapper } from "@/styles/layouts/Wrappers";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ThemeProvider } from "@/store/storeProviders/ThemeProvider";

export default function LandingPageView() {
  const { data: session, status } = useSession();
  const { isAuthenticated, loginSuccess, logoutSuccess, user ,googleAuthSucess} = useUserStore(
    (state) => state
  );
 
  if(user){
    return null
  }

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="w-full overflow-hidden">
        {/* < />   */}
        <TutorialHell />
        <Wrapper>
          <MainBanner />
        </Wrapper>
        <AboutSection />
        <OneToOne />
        <AboutGoals />
        <Productivity />
        <WhyUs />
        <GlobWithchild />   
        <Foooter />
      </div>
      </ThemeProvider>

    </>
  );
}
