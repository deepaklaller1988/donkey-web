import React from 'react';

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange, currentPage }) => {
    const maxPages = Math.min(totalPages, 500);

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pagesToShow = 5;
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        let endPage = Math.min(startPage + pagesToShow - 1, maxPages);

        if (endPage - startPage + 1 < pagesToShow) {
            startPage = Math.max(1, endPage - pagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`w-10 h-10 flex items-center justify-center mx-1 rounded-xl ${currentPage === i ? 'pbgColor' : 'bg-white/20 hover:bg-[#e99700] hover:text-black text-white'}`}
                >
                    {i}
                </button>

            );
        }

        return pageNumbers;
    };

    const goToFirstPage = () => {
        handlePageChange(1);
    };

    const goToLastPage = () => {
        handlePageChange(maxPages);
    };

    return (
        <div className="flex justify-center mt-4">
            {currentPage > 1 && (
                <button
                    onClick={goToFirstPage}
                    className={`w-10 h-10 flex items-center justify-center mx-1 px-1 py-1 rounded-xl pbgColor text-black ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={currentPage === 1}
                >
                    <span className="text-2xl">{"\u00AB"}</span>
                </button>
            )}

            {renderPageNumbers()}

            {currentPage < maxPages && (
                <button
                    onClick={goToLastPage}
                    className={`w-10 h-10 flex items-center justify-center mx-1 px-1 py-1 rounded-xl pbgColor text-black ${currentPage === maxPages ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={currentPage === maxPages}
                >
                    <span className="text-2xl">{"\u00BB"}</span>
                </button>
            )}

        </div>
    );
};

export default Pagination;
