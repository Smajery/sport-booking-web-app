"use client";

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React from "react";
import ReactPaginate from "react-paginate";
import { Input } from "@/components/ui/input";

interface IPaginationFrame {
  handlePageChange: (value: any) => void;
  totalPages: number;
  currentPage: number;
  isFetchLoading: boolean;
}

const PaginationFrame: React.FC<IPaginationFrame> = ({
  handlePageChange,
  totalPages,
  currentPage,
  isFetchLoading,
}) => {
  const paginationTypingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (paginationTypingTimeoutRef.current) {
        clearTimeout(paginationTypingTimeoutRef.current);
      }
    };
  }, []);

  if (totalPages <= 1 || isFetchLoading) return null;

  return (
    <div className="flex justify-center p-10">
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageChange}
        forcePage={currentPage - 1}
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
    </div>
  );
};

export default PaginationFrame;
