import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import ComputerIcon from "@mui/icons-material/Computer";
import { CardContent } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface props {
  className?: string;
}
const CourseCard = ({ className }: props) => {
  return (
    <Card className={`w-[30%] min-h-60 ${className} `}>
      <CardTitle className="flex text-xl flex-col mt-3 gap-2 w-[95%] mx-auto">
        <img src="/courImg.png" className="w-full h-28 object-cover" alt="" />
        <h3>Python Course</h3>
      </CardTitle>
      <CardContent>
        <p>Lessons on design that cover the most recent developments.</p>
      </CardContent>
      <CardFooter>
        <p>
          Learn Now{" "}
          <ArrowForwardIosIcon
            fontSize="inherit"
            className="text-[0.5rem] ml-4"
          />
        </p>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
