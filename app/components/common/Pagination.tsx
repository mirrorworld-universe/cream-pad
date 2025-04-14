"use client";
import clsx from "clsx";
import ReactPaginate from "react-paginate";
import ArrowIcon from "../icons/ArrowIcon";

interface IPagination {
  total: number;
  className?: string;
  onPageChange?: (params: { selected: number }) => void;
  initialPage?: number;
}

export default function Pagination({
  total,
  onPageChange,
  className,
  initialPage
}: IPagination) {
  return (
    <>
      <ReactPaginate
        className={clsx("react-paginate font-orbitron", className)}
        breakLabel={"..."}
        nextLabel={<ArrowIcon />}
        onPageChange={onPageChange}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        pageCount={total}
        previousLabel={<ArrowIcon className="rotate-180" />}
        renderOnZeroPageCount={null}
        initialPage={initialPage}
      />
    </>
  );
}
