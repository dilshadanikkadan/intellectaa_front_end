import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import ComputerIcon from "@mui/icons-material/Computer";
import { CardContent } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PeopleIcon from "@mui/icons-material/People";
interface props {
  className?: string;
  item?: any;
}
const CourseCard = ({ className, item }: props) => {
  return (
    <>
      <Card className={` md:w-[23%] min-h-80 ${className} `}>
        <CardTitle className="flex text-xl flex-col mt-3 gap-2 w-[90%] mx-auto">
          <img
            src={item?.courseTitle?.thumbnail}
            className="w-full object-cover"
            alt=""
          />
          <h3>{item?.courseTitle?.title}</h3>
        </CardTitle>
        <CardContent>
          <p className="line-clamp-2">{item?.courseTitle?.description}</p>
        </CardContent>
        <CardFooter>
          <p>
            Enrolled By{" "}
            <span className="font-semibold">{item?.enrollmentCount}</span>
            <PeopleIcon fontSize="inherit" className="ml-2 text-[1rem]" />
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default CourseCard;
