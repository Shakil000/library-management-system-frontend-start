
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
    isBorrowed: string;
  } | null;
};

const cardStyle = [
  "bg-gradient-to-br from-violet-200 via-violet-100 to-white border-violet-200",
  "bg-gradient-to-br from-sky-200 via-sky-100 to-white border-sky-200",
  "bg-gradient-to-br from-yellow-200 via-yellow-100 to-white border-yellow-200",
];

const BorrowSummaryCard = ({
  item,
  index,
}: {
  item: BorrowBookItem;
  index: number;
}) => {
  const book = item.bookId;

  const due = item?.dueDate ? new Date(item.dueDate) : null;
  const isOverdue = due ? due.getTime() < Date.now() : false;

  return (
    <div
      className={`relative rounded-2xl border shadow-md overflow-hidden ${cardStyle[index % cardStyle.length]}`}
    >
      {/* Decorative corner */}
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-white/40 blur-xl" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-black/10 text-gray-800">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              Borrowed
            </p>

            <h2 className="mt-3 text-lg font-bold text-gray-900 wrap-break-words">
              {book?.title ? book.title : "Book info not found"}
            </h2>

            {book?.author ? (
              <p className="mt-1 text-sm text-gray-700">
                by <span className="font-medium">{book.author}</span>
              </p>
            ) : (
              <p className="mt-1 text-sm text-gray-600">
                Someone deleted the book info
              </p>
            )}
          </div>

          {/* Due Date Chip */}
          <div
            className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
              isOverdue ? "bg-red-500 text-white" : "bg-blue-500 text-white"
            }`}
            title="Due Date"
          >
            {due ? `Due: ${due.toLocaleDateString()}` : "Due: N/A"}
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-black/10" />

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/60 border border-white/70 p-4">
            <p className="text-xs text-gray-600">ISBN</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {book?.isbn ? book.isbn : "N/A"}
            </p>
          </div>

          <div className="rounded-xl bg-white/60 border border-white/70 p-4">
            <p className="text-xs text-gray-600">Borrowed Quantity</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {item.quantity}
            </p>
          </div>
        </div>

        {/* Warning if book missing */}
        {!book && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              This record exists, but the book has been deleted.
            </p>
            <p className="text-xs text-red-600 mt-1">
              ISBN and details may not be available anymore.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between text-xs text-gray-600">
          <p>
            Borrowed on:{" "}
            <span className="font-medium text-gray-800">
              {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
            </span>
          </p>

          <p className="font-medium text-gray-800">#{item._id.slice(-6)}</p>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummaryCard;