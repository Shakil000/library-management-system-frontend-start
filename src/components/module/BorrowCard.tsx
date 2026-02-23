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

const BorrowCard = ({ item }: { item: BorrowBookItem; index: number }) => {
  const book = item.bookId;

  return (
    <div className="border rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{book.title}</h2>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            book.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {/* {book.available ? "Available" : "Unavailable"} */}
        </span>
      </div>

      <p className="mt-2 text-gray-600">
        {book.description ? book.description : "No description"}
      </p>

      <div className="mt-4 text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Author:</span> {book.author}
        </p>
        <p>
          <span className="font-medium">ISBN:</span> {book.isbn}
        </p>
        <p>
          <span className="font-medium">Genre:</span> {book.genre || "Not specified"}
        </p>
        <p className="text-red-600 font-semibold">
          Copies: {typeof book.copies === "number" ? book.copies : "N/A"}
        </p>
        <p>
          <span className="font-medium">Quantity:</span> {item.quantity}
        </p>
        <p>
          <span className="font-medium">Due Date:</span>{" "}
          {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default BorrowCard;