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

const PaymentPacks = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const {id} = useParams();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course",id],
    queryFn: getCourseeHelper,
  });
  console.log("___________________________",course);
  

    const handlePayment = async () => {
        try {
        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
        );

        if (!stripe) {
            console.error("Stripe failed to load");
            return;
        }

        const response = await axios.post(
            "http://localhost:5000/api/payment/stripeSession",
            {
            userId: user?._id,
            courseId: course?.payload._id,
            amount: 799,
            courseTitle:course?.payload.title,
            courseThumbnail:
                course?.payload.thumbnail,
                courseMode:"basic"
            },
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
    <div className="w-[60%] mx-auto mt-10">
      <div className="info flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-center">
          We create a monthly pricing package for all standard students
        </h3>
        <p className="text-center">
          Basically we create this package for those who are really interested
          and get benifited from our courses or books. We want to make a low
          cost package for them. So that they can purchase any courses with the
          package they buy from us. Also will get free books from every
          packages.
        </p>
      </div>
      <div className="w-full mt-5 flex gap-10 justify-center">
        <Card className="w-[35%] ">
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
              Access All Time
            </p>
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              Access All Time
            </p>
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              Access All Time
            </p>
            <h3 className="text-lg text-start font-semibold ml-[3%]">
              $ <span className="ml-3">799</span>
            </h3>
          </CardContent>
          <CardFooter>
            <button
              onClick={handlePayment}
              className="py-2 w-[90%] mx-auto text-[#20B486] border border-[#20B486]"
            >
              Buy Now
            </button>
          </CardFooter>
        </Card>

        <Card className="w-[35%] ">
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
              Access All Time
            </p>
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              Access All Time
            </p>
            <p>
              <VerifiedIcon className="text-[#20B486] mr-3" />
              Access All Time
            </p>
            <h3 className="text-lg text-start font-semibold ml-[3%]">
              $ <span className="ml-3">999</span>
            </h3>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <button className="py-2 w-[90%] mx-auto text-[#20B486] border border-[#20B486]">
              Buy Now
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPacks;
