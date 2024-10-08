import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import ComputerIcon from "@mui/icons-material/Computer";
import { CardContent } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { TOBE } from "@/types/constants/Tobe";
import Link from "next/link";
interface props {
  className?: string;
  item?: TOBE;
  i?: TOBE;
}
const ServiceCard = ({ className, item, i }: props) => {
  return (
    <Card
      className={`md:full h-56 hover:scale-110 transition-all duration-500 cursor-pointer ${i == 0 ? " bg-[#4AC8AE] text-white" : ""} `}
    >
      <CardTitle className="flex text-xl mt-3 gap-2 w-[80%] mx-auto  ">
        <ComputerIcon />
        <h3>{item?.title}</h3>
      </CardTitle>
      <CardContent>
        <p>{item?.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={'/courses'} className="hover:animate-accordion-up">
          Learn Now{" "}
          <ArrowForwardIosIcon
            fontSize="inherit"
            className="text-[0.5rem] ml-4"
          />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
