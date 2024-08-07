"use client";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import React from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { getCourseeHelper } from "@/helpers/course/courseApiHelper";
import { useQuery } from "@tanstack/react-query";
import { TOBE } from "@/types/constants/Tobe";

const PaymentPacks = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const { id } = useParams();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: getCourseeHelper,
  });
  console.log(
    "__________________________%%%%%%%%%%###############_",
    course?.payload
  );

  const handlePayment = async (payload: TOBE) => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );

      if (!stripe) {
        console.error("Stripe failed to load");
        return;
      }

      const response = await axios.post(
        "https://www.medifly.site/api/payment/stripeSession",
        {
          userId: user?._id,
          courseId: course?.payload._id,
          instructor: course?.payload?.instructor?._id,
          amount: payload.amount,
          courseTitle: course?.payload.title,
          courseThumbnail: course?.payload.thumbnail,
          courseMode: payload?.mode,
        }
      );

      console.log("+++++++++++", response.data.data.sessionId);

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.data?.sessionId,
      });

      if (result.error) {
        console.error("Stripe checkout error:", result.error.message);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div  className="w-[85%] md:w-[60%] mx-auto mt-10">
      <div data-aos="fade-up" className="info flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-center">
          We create a monthly pricing package for all standard students
        </h3>
        <p className="text-center">
          Basically we create this package for those who are really interested
          and get benifited from our courses or books. We want to make a low
          cost package for them. So that they can purchase TOBE courses with the
          package they buy from us. Also will get free books from every
          packages.
        </p>
      </div>
      <div className="w-full mt-5 flex flex-col md:flex-row gap-10 justify-center">
        <Card data-aos="fade-left" className=" md:w-[35%] ">
          <CardTitle className="flex text-xl mt-7 gap-4 w-[90%] mx-auto">
            <Inventory2Icon className="text-[#20B486]" fontSize="large" />
            <h3>Basic Pack</h3>
          </CardTitle>

          <CardContent className="mt-10 flex flex-col gap-5">
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              Access All Time
            </p>

            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              Questions With lessons
            </p>
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              View LeaderBoard
            </p>
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              Read Blogs
            </p>
            <h3 className="text-lg text-start text-[#20B486] font-bold ml-[3%]">
            ₹ <span className="ml-1 font-bold">799</span>
            </h3>
          </CardContent>
          <CardFooter>
            <button
              onClick={() =>
                handlePayment({
                  amount: 799,
                  mode: "basic",
                })
              }
              className="py-2 w-[90%] hover:bg-[#20B486] hover:text-white transition-all duration-300 mx-auto text-[#20B486] border border-[#20B486]"
            >
              Buy Now
            </button>
          </CardFooter>
        </Card>

        <Card data-aos="fade-right" className="md:w-[35%] ">
          <CardTitle className="flex text-xl mt-7 gap-4 w-[90%] mx-auto">
            <Inventory2Icon className="text-[#20B486]" fontSize="large" />
            <h3>Premium Pack</h3>
          </CardTitle>

          <CardContent className="mt-10 flex flex-col gap-5">
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              Access All Time
            </p>
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              Questions during Lesson
            </p>
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              chat With instructor
            </p>
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              chat Room
            </p>

            <h3 className="text-lg text-start font-semibold ml-[3%]">
            ₹ <span className="ml-3">999</span>
            </h3>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <button
              onClick={() =>
                handlePayment({
                  amount: 999,
                  mode: "premium",
                })
              }
              className="py-2 w-[90%] mx-auto hover:bg-[#20B486] hover:text-white transition-all duration-300 text-[#20B486] border border-[#20B486]"
            >
              Buy Now
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPacks;
