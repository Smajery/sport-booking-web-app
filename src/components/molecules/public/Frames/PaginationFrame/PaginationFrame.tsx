"use client";

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React from "react";
import ReactPaginate from "react-paginate";
import { Input } from "@/components/ui/input";

interface IPaginationFrame {
  totalItems: number;
  handlePageChange: (value: any) => void;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  isFetchLoading: boolean;
}

const PaginationFrame: React.FC<IPaginationFrame> = ({
  totalItems,
  handlePageChange,
  totalPages,
  currentPage,
  setCurrentPage,
  isFetchLoading,
}) => {
  const paginationTypingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [numPage, setNumPage] = React.useState<string>("");

  const handleType = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const pageNumber = parseInt(inputValue, 10);

      if (paginationTypingTimeoutRef.current) {
        clearTimeout(paginationTypingTimeoutRef.current);
      }

      if (pageNumber <= totalPages) {
        paginationTypingTimeoutRef.current = setTimeout(() => {
          setCurrentPage(pageNumber || 0);
        }, 1000);
        setNumPage(inputValue);
      }
    },
    [setCurrentPage, totalPages],
  );

  React.useEffect(() => {
    return () => {
      if (paginationTypingTimeoutRef.current) {
        clearTimeout(paginationTypingTimeoutRef.current);
      }
    };
  }, []);

  if (totalPages <= 1 || isFetchLoading) return null;

  return (
    <div className="flex items-center justify-center gap-x-2 mt-10 mb-5">
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageChange}
        forcePage={currentPage}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        containerClassName="flex gap-x-2"
        pageClassName="rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
        pageLinkClassName="max-h-[44px] flex items-center justify-center px-6 py-3"
        previousClassName="flex items-center justify-center"
        previousLinkClassName={`${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
        nextClassName="flex items-center justify-center"
        nextLinkClassName={`${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
        breakClassName="flex items-end pb-2"
        breakLinkClassName=""
        activeClassName="bg-primary text-primary-foreground"
        previousLabel={<ArrowLeftCircle className="w-8 h-8" strokeWidth={1} />}
        nextLabel={<ArrowRightCircle className="w-8 h-8" strokeWidth={1} />}
        renderOnZeroPageCount={null}
      />
      <p className="ml-5">Go To</p>
      <Input
        name="page"
        type="number"
        value={numPage}
        onChange={handleType}
        min={1}
        placeholder="Page"
        className="w-[100px]"
      />
    </div>
  );
};

export default PaginationFrame;
