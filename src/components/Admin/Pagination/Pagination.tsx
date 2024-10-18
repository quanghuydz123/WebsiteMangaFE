import React from 'react';

interface PaginationProps {
  currentPage: number; // 当前页码
  totalPages: number;  // 总页数
  onPageChange: (page: number) => void; // 页码改变的回调函数
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 创建页码的数组
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 页码点击处理函数
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* 上一页按钮 */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-gray-500' : 'hover:bg-gray-300'}`}
      >
        Previous
      </button>

      {/* 页码按钮 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}`}
        >
          {page}
        </button>
      ))}

      {/* 下一页按钮 */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'text-gray-500' : 'hover:bg-gray-300'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
