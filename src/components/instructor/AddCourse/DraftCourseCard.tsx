"use client"
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import ComputerIcon from "@mui/icons-material/Computer";
import { CardContent } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { UseLocalStroageValue } from "@/hooks/UseLocalStorage";
import { useRouter } from "next/navigation";
const DraftCourseCard = () => {
    const {title,description,thumbnail} = UseLocalStroageValue("courseDraft")
    const router = useRouter()
  return (
    <Card className={`w-[30%] min-h-60   cursor-pointer`}>
      <CardTitle className="flex text-xl flex-col mt-3 gap-2 w-[90%] mx-auto hover:bg[#518eca]">
        <img src={thumbnail} className="w-full h-32 object-cover" alt="" />
        <h3>{title} </h3>
      </CardTitle>
      <CardContent>
        <p className="line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="cursor-pointer">
        <p onClick={()=> router.push('/instructor/myCourses/addCourse/addLesson')}>
          Continue{" "}
          <ArrowForwardIosIcon
            fontSize="inherit"
            className="text-[0.5rem] ml-4 hover:ml-6 transition-all duration-1000 "
          />
        </p>
      </CardFooter>
    </Card>
  );
};

export default DraftCourseCard;
