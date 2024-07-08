import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import ComputerIcon from "@mui/icons-material/Computer";
import { CardContent } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface props {
  className?: string;
  item:any
}
const CourseCard = ({ className ,item}: props) => {
  return (
    <Card className={`w-[30%] min-h-60 ${className} `}>
      <CardTitle className="flex text-xl flex-col mt-3 gap-2 w-[95%] mx-auto">
        <img src={item.thumbnail} className="w-full h-28 object-cover" alt="" />
        <h3>{item?.tilte}</h3>
      </CardTitle>
      <CardContent>
        <p className="line-clamp-3 ">{item?.description}</p>
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
