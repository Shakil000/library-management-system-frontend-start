import { useState } from "react";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import BooksCard from "@/components/module/BooksCard";
import { SpinnerButton } from "@/components/layouts/Loading";

const Home = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  if (isLoading) {
    return (
      <p className="text-center mt-10">
        <SpinnerButton></SpinnerButton>
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load books.</p>
    );
  }

  const books = data?.data || [];

  // ✅ pagination logic
  const totalPages = Math.ceil(books.length / booksPerPage);

  // currentPage safe রাখলাম (যাতে data কমে গেলে page out of range না হয়)
  const safePage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const indexOfLastBook = safePage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Available Books</h1>

      {/* ✅ 4 books in a row on large screen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {currentBooks.map((book, index) => (
          <div key={book._id} className="h-full">
            <BooksCard book={book} index={index} />
          </div>
        ))}
      </div>

      {/* ✅ Pagination (no overflow) */}
      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex flex-wrap justify-center gap-2 max-w-full px-2">
            {/* Prev Button */}
            <button
              disabled={safePage === 1}
              onClick={handlePrev}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {/* ✅ Show only 20 page buttons */}
            {Array.from(
              {
                length: Math.min(20, totalPages - (safePage - 1)),
              },
              (_, i) => safePage + i,
            )
              .filter((page) => page <= totalPages)
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    safePage === page ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}

            {/* Next Button */}
            <button
              disabled={safePage === totalPages}
              onClick={handleNext}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Page {safePage} of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
