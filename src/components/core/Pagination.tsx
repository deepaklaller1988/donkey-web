import React from 'react';

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange, currentPage }) => {
    // Ensure the total pages do not exceed 500
    const maxPages = Math.min(totalPages, 500);

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pagesToShow = 5;
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        let endPage = Math.min(startPage + pagesToShow - 1, maxPages);

        // Adjust startPage if endPage is less than pagesToShow
        if (endPage - startPage + 1 < pagesToShow) {
            startPage = Math.max(1, endPage - pagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 rounded-xl px-5 py-1 ${currentPage === i ? 'pbgColor' : 'bg-white/20 hover:bg-[#e99700] hover:text-black text-white'}`}
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
                <button onClick={goToFirstPage} className={`mx-1 px-5 py-4 rounded-xl pbgColor`}>
                    <span style={{ fontSize: '1.5em' }}>{"\u00AB"}</span>
                </button>
            )}

            {renderPageNumbers()}

            {currentPage < maxPages && (
                <button onClick={goToLastPage} className={`mx-1 px-5 py-4 rounded-xl pbgColor`}>
                <span style={{ fontSize: '1.5em' }}>{"\u00BB"}</span>
            </button>
            )}
        </div>
    );
};

export default Pagination;
