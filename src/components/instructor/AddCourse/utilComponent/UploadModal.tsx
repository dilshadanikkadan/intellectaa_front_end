import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
interface Props{
    isOpen:boolean;
    onOpenChange:any;
    percentage:number;
}
  const UploadModal = ({percentage=0,isOpen,onOpenChange}:Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTrigger className="underline"></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Uploading Thumnail and Trailer</DialogTitle>
        <DialogDescription>
        <p>It will Take some Time To Complete...</p>
        <Progress value={percentage} className="mt-3 rounded-none transition-all duration-500"/>
     
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default UploadModal