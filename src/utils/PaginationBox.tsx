import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from '@/components/ui/pagination'
import { useEffect, useState } from 'react'

interface PaginationBoxProps {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}

const PaginationBox: React.FC<PaginationBoxProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [isLaptop, setIsLaptop] = useState(window.innerWidth > 768)

  useEffect(() => {
    const handleResize = () => setIsLaptop(window.innerWidth > 768)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [window.innerWidth])

  const pageRange = () => {
    let pageNumbers: any[] = []

    if (totalPages > 6) {
      if (currentPage <= 3) {
        pageNumbers = Array.from({ length: 5 }, (_, index) => index + 1)
        pageNumbers.push('ellipsis')
        pageNumbers.push(totalPages)
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(1)
        pageNumbers.push('ellipsis')
        pageNumbers = [
          ...pageNumbers,
          ...Array.from({ length: 5 }, (_, index) => totalPages - 4 + index),
        ]
      } else {
        pageNumbers.push(1)
        pageNumbers.push('ellipsis')
        pageNumbers = [
          ...pageNumbers,
          ...Array.from({ length: 3 }, (_, index) => currentPage - 1 + index),
        ]
        pageNumbers.push('ellipsis')
        pageNumbers.push(totalPages)
      }
    } else pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)
    
    return pageNumbers
  }
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {isLaptop ? pageRange().map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        }) :
          <PaginationItem className="relative">
            <PaginationLink
              href="#"
              isActive={true}
              className="flex"
            >
              {currentPage}
            </PaginationLink>
            <span className="absolute w-full top-[125%] left-[50%] translate-x-[-50%] text-center text-sm text-secondary-foreground">of {totalPages}</span>

          </PaginationItem>
        }

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationBox