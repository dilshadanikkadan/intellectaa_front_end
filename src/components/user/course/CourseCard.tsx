"use client"
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import ComputerIcon from "@mui/icons-material/Computer";
import { CardContent } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
interface props{
    className?:string;
    course?:any;
  }
const CourseCard = ({className,course}:props) => {


  return (
    <>
    <Card className={` md:w-[23%] min-h-80 ${className} `}>
    <CardTitle className="flex text-xl flex-col mt-3 gap-2 w-[90%] mx-auto">

      <img src={course?.thumbnail} className="w-full object-cover" alt="" />
      <h3>{course?.title} </h3>
    </CardTitle>
    <CardContent>
      <p className="line-clamp-3">
        {course?.description}
      </p>
    </CardContent>
    <CardFooter>
      <Link href={`/courses/${course._id}`}>Learn Now <ArrowForwardIosIcon fontSize="inherit" className="text-[0.5rem] ml-4"/></Link>
    </CardFooter>
  </Card>
    </>
  )
}

export default CourseCard
