import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import ComputerIcon from "@mui/icons-material/Computer";
import { CardContent } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface props{
  className?:string;
}
const ServiceCard = ({className}:props) => {
  return (
    <Card className={`md:w-[23%] h-56 ${className} `}>
    <CardTitle className="flex text-xl mt-3 gap-2 w-[80%] mx-auto">
      <ComputerIcon />
      <h3>Intractive Learning</h3>
    </CardTitle>
    <CardContent>
      <p>
        Lessons on design that cover the most recent developments.
      </p>
    </CardContent>
    <CardFooter>
      <p>Learn Now <ArrowForwardIosIcon fontSize="inherit" className="text-[0.5rem] ml-4"/></p>
    </CardFooter>
  </Card>
  )
}

export default ServiceCard
