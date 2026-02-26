import { SpinnerButton } from "@/components/layouts/Loading";
import BorrowSummaryCard from "@/components/module/BorrowSummaryCard";
import { useGetBorrowBooksQuery } from "@/redux/api/baseApi";

type BorrowBookItem = {
  _id: string;
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  bookId: {
    _id: string;
    title: string;
    author: string;
    isbn: string;
    genre: string;
    copies: number;
    available: boolean;
    description?: string;
  };
};

type BorrowApiResponse = {
  success: boolean;
  message?: string;
  books: BorrowBookItem[];
};

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowBooksQuery(undefined) as {
    data?: BorrowApiResponse;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-4xl md:text-6xl font-bold text-red-400 text-center">
            <SpinnerButton></SpinnerButton>
          Loading Borrowed Books...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-4xl md:text-6xl font-bold text-red-400 text-center">
          Failed to load books.
        </p>
      </div>
    );
  }

  const borrowed = Array.isArray(data?.books) ? data!.books : [];

  return (
    <>
      <h1 className="flex items-center justify-center mt-3 text-2xl font-semibold text-red-400 underline">
        Borrowed Books Summary
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5 mb-5 p-5">
        {borrowed.length > 0 ? (
          borrowed.map((item, index) => (
            <BorrowSummaryCard key={item._id} item={item} index={index} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No books available
          </p>
        )}
      </div>
    </>
  );
};

export default BorrowSummary;