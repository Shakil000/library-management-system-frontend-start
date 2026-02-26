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
  } | null;
};

const cardStyle = [
  "bg-gradient-to-l from-violet-200 to-violet-300 shadow-md rounded-lg p-5 border border-violet-200",
  "bg-gradient-to-r from-sky-100 to-sky-200 shadow-lg rounded-xl p-5 border border-sky-300",
  "bg-gradient-to-l from-yellow-100 to-yellow-200 shadow-lg rounded-xl p-5 border border-yellow-300",
];

const BorrowCard = ({
  item,
  index,
}: {
  item: BorrowBookItem;
  index: number;
}) => {
  const book = item.bookId;

  return (
    <div className={cardStyle[index % cardStyle.length]}>
      <div className="border rounded-lg p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{book?.title ? book.title : "Some One delete the book info"}</h2>
        </div>

        <p className="mt-2 text-gray-600">
          {book?.description ? book?.description : ""}
        </p>

        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-medium">Author:</span> {book?.author ? book.author : "N/A"}
          </p>
          <p>
            <span className="font-medium">ISBN:</span> {book?.isbn ? book.isbn : "N/A"}
          </p>
          <p>
            <span className="font-medium">Genre:</span>{" "}
            {book?.genre ? book.genre  : "N/A"}
          </p>
          <p className="text-red-600 font-semibold">
            Available Copies: {typeof book?.copies === "number" ? book?.copies : "N/A"}
          </p>
          <p>
            <span className="font-medium">Borrowed Quantity:</span> {item.quantity}
          </p>
          <p>
            <span className="font-medium">Due Date:</span>{" "}
            {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BorrowCard;
