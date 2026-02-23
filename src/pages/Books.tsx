import BooksCard from "@/components/module/BooksCard";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";

const Books = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading books...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load books.</p>;
  }

  return (
    <>
    <h1 className="flex items-center justify-center mt-3 text-2xl font-semibold">Available Books</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 mb-5">
      {Array.isArray(data?.data) && data.data.length > 0 ? (
        data.data.map((book: IBook, index: number) => (
          <BooksCard key={book.id} book={book} index={index} />
        ))
      ) : (
        <p className="text-center text-gray-500">No books available</p>
      )}
    </div>
    </>
  );
};

export default Books;