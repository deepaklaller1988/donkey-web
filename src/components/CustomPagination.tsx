import React, { useEffect, useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange
}) => {
  const [pages, setPages] = useState(Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    const updatedTotalPages = Math.ceil(totalItems / itemsPerPage);
    setPages(updatedTotalPages);

    if (currentPage > updatedTotalPages) {
      onPageChange(updatedTotalPages);
    }
  }, [totalItems, itemsPerPage, currentPage, onPageChange]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.round(totalPages)) {
      onPageChange(currentPage + 1);
    }
  };
  const shouldShowPagination = totalItems > 0;

  const calculatedTotalPages = Math.ceil(totalPages / itemsPerPage);


  return (
    <div className="flex justify-end">
      {shouldShowPagination && (
        <>
          <button
            onClick={handlePrevious}
            className={`mx-1 px-3 py-2 rounded-xl pbgColor ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed opacity-60" : ""} `}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className='text-white mt-2'>
            Page {currentPage} of {Math.round(totalPages)}
          </span>
          <button
            onClick={handleNext}
            className={`mx-1 px-3 py-2 rounded-xl pbgColor ${currentPage === calculatedTotalPages ? "bg-gray-400 cursor-not-allowed opacity-60" : ""}`}
            disabled={currentPage === calculatedTotalPages}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default CustomPagination;
