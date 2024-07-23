import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import { Button } from "@/components/ui/button"
import { TOBE } from "@/types/constants/Tobe";
  
  export function InstrutorPagination({ setPageNumber, currentPage, totalPages }: TOBE) {
    const handlePrevious = () => {
        
      if (currentPage > 1) {
        setPageNumber((prev:TOBE) => prev - 1);
      }
    };
  
    const handleNext = () => {
        console.log("clicekd",totalPages);
        console.log("current page",currentPage);

      if (currentPage < totalPages) {
        setPageNumber((prev:TOBE) => prev + 1);
      }
    }; 
  
    return (
      <Pagination className="">
        <PaginationContent>
          <PaginationItem>
            <Button 
              onClick={handlePrevious} 
              disabled={currentPage === 1}
              variant="outline"
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                onClick={() => setPageNumber(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <Button 
              onClick={handleNext} 
              disabled={currentPage === totalPages}
              variant="outline"
            >
              <PaginationNext />
            </Button>  
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }