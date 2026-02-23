import { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import type { IBook } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPenNib } from "react-icons/fa6";
import { UpdateBook } from "./UpdateBook";

interface IProps {
  book: IBook;
  index: number;
}

const cardStyles = [
  "bg-white shadow-md rounded-lg p-5 border border-gray-200",
  "bg-gradient-to-r from-pink-100 to-pink-200 shadow-lg rounded-xl p-5 border border-pink-300",
  "bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-xl p-5 border border-green-300",
];

const BooksCard = ({ book, index }: IProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [borrowData, setBorrowData] = useState({ copies: 1, dueDate: "" });

  const handleBorrow = () => {
    dispatch({
      type: "books/borrow",
      payload: { id: book.id, ...borrowData },
    });
    setOpen(false);
  };

  return (
    <div className={cardStyles[index % cardStyles.length]}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          {book.title}
          <button onClick={() => setOpens(true)} className="p-2">
            <FaPenNib />
          </button>
          <UpdateBook open={opens} setOpen={setOpens} />
        </h2>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            book.available
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {book.available ? "Available" : "Unavailable"}
        </span>
      </div>

      <p className="text-gray-600 mb-3">
        {book.description || "No description"}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
        <span>Author: {book.author}</span>
        <span>ISBN: {book.isbn}</span>
      </div>

      <p className="text-gray-600 mb-3">
        Genre: {book.genre ? book.genre : "Not specified"}
      </p>

      <p
        className={`mb-3 px-2 py-1 rounded text-gray ${
          book.copies === 0
            ? "text-red-500 font-semibold"
            : "text-green-500 font-semibold"
        }`}
      >
        Copies: {book.copies !== undefined ? book.copies : "N/A"}
      </p>

      {/* Actions */}
      <div className="flex justify-end items-center gap-4">
        <button
          onClick={() => setOpens(true)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 p-2"
        >
          Update Book
        </button>
         <UpdateBook open={opens} setOpen={setOpens} />
        <button
          onClick={() => dispatch({ type: "books/delete", payload: book.id })}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>

        {book.available ? (
          <>
            <button
              onClick={() => setOpen(true)}
              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Borrow Book
            </button>

            {/* Borrow Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Borrow Book</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Copies</label>
                    <Input
                      type="number"
                      min={1}
                      max={book.copies}
                      value={borrowData.copies}
                      onChange={(e) =>
                        setBorrowData({
                          ...borrowData,
                          copies: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={borrowData.dueDate}
                      onChange={(e) =>
                        setBorrowData({
                          ...borrowData,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleBorrow}>Confirm Borrow</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <span className="text-red-500 text-sm">Not Available</span>
        )}
      </div>
    </div>
  );
};

export default BooksCard;
