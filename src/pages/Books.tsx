import { SpinnerButton } from "@/components/layouts/Loading";
import BooksCard from "@/components/module/BooksCard";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="lg: text-9xl font-bold text-red-400"><SpinnerButton></SpinnerButton></p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="lg: text-9xl font-bold text-red-400">
          Failed to load books.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="flex items-center justify-center mt-3 text-2xl font-semibold text-red-400 underline">
        Available Books
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5 mb-5 items-stretch p-5">
        {Array.isArray(data?.data) && data.data.length > 0 ? (
          data.data.map((book: IBook, index: number) => (
            <BooksCard key={book._id} book={book} index={index} />
          ))
        ) : (
          <p className="text-center text-gray-500">No books available</p>
        )}
      </div>
    </>
  );
};

export default Books;
