import React from 'react';

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

  const getItemsToDisplay = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    return Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i + 1);
  };

  const items = getItemsToDisplay();

  return (
     
      <div className="flex justify-end">
        <button onClick={handlePrevious} className={`mx-1 px-3 py-2 rounded-xl pbgColor`} disabled={currentPage === 1}>
          Previous
        </button>
        <span className='text-white mt-2'>
          Page {currentPage} of {Math.round(totalPages)}
        </span>
        <button onClick={handleNext} className={`mx-1 px-3 py-2 rounded-xl pbgColor`} disabled={currentPage === Math.round(totalPages)}>
          Next
        </button>
      </div>
  );
};

export default CustomPagination;
