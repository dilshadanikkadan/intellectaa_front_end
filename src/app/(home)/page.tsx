import LandingPageView from "@/components/user/landingPage/LandingPage";
import ProfilePage from "@/components/user/landingPage/LandingProfilePage";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
    <Suspense fallback={"loading........"} >
      <LandingPageView />
      <ProfilePage />
    </Suspense>
    </>
  );
}
