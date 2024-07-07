"use client"
import { Card } from "@/components/ui/card";
import { UseLocalStroageValue } from "@/hooks/UseLocalStorage";
import React from "react";
import PreCuationModal from "./utilComponent/PreCuationModal";
import { Progress } from "@/components/ui/progress";
import { useCurrentUser } from "@/hooks/UseCurrentUser";
import { useMutation } from "@tanstack/react-query";
import { submitCourseHelper } from "@/helpers/course/courseApiHelper";
import { useRouter } from "next/navigation";
import { PiSpinnerBold } from "react-icons/pi";

const PreViewPage = () => {
    const myCourse= UseLocalStroageValue("courseDraft");
    const router = useRouter()
    const {lessons}= UseLocalStroageValue("lessonDraft");
    const user = useCurrentUser();
 

     const {mutate:sumbutMuate,isPending} = useMutation({
        mutationFn:submitCourseHelper,
        onSuccess:(data)=>{
            router.push("/instructor/myCourses");
        }
     })
     const handleSubmit=()=>{
        console.log("****************************",);
       console.log({
           ...myCourse,
          lessons,
          instructor:user?._id
       });
       sumbutMuate({
        ...myCourse,
        lessons,
        instructor:user?._id
       })
    } 
  return (
    <div className="w-[90%] mx-auto flex  flex-col">
        <Progress value={100} className="ml-10 mb-4 h-2"/>
        <div className="w-full flex">

      <div className="left flex-[1]">
        <div className="w-[90%] mx-auto">
          <h3 className="text-xl mb-5">{myCourse?.title}</h3>
          <h3>Thumbnail</h3>
          <Card className="w-[100%] mt-3 mx-auto h-60 flex items-center justify-center">
            <img className="w-[95%] h-[95%] object-cover " src={myCourse?.thumbnail} alt="" />
          </Card>
        </div>
      </div>
      <div className="left flex-[1] mt-10">
        <div className="w-[90%] mx-auto">
          <h3>Python Course</h3>
          <Card className="w-[100%] mt-5 mx-auto h-60">
            <video src={myCourse?.trailer} className="w-[95%] h-[95%] " autoPlay></video>
          </Card>
        </div>
      </div>
      </div>
      <div className="info w-[95%] mx-auto mt-10" >
         <h3 className="mb-4 text-xl">Description</h3>
        <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione deserunt cumque deleniti ea. Neque beatae quis ipsa et. Suscipit quibusdam eius blanditiis explicabo quas natus sequi, fuga et culpa ad? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse nostrum ratione ex rem sunt eligendi repellendus, id iste aspernatur qui nisi, nemo provident fuga? Similique accusantium quia fugiat fuga reprehenderit?</p>
      </div>
      <div className="info w-[95%] mx-auto mt-5 flex items-center justify-between mb-10" >
        <PreCuationModal/>
        <button
        onClick={handleSubmit}
            className="800 mt-7 flex items-center justify-center text-white bg-gray-900 w-[20%] py-[6px] mr-16"
          >
          Submit For Review
          {isPending && (
                  <PiSpinnerBold className="text-xl ml-2 animate-spin" />
                )}
          </button>
        </div>
    </div>
  );
};

export default PreViewPage;
