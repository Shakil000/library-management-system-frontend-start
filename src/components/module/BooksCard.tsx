import { useState } from "react";
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
import {
  useBorrowBookMutation,
  useDeleteBookMutation,
} from "@/redux/api/baseApi";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface IProps {
  book: IBook;
  index: number;
}

const cardStyles = [
  "bg-gradient-to-l from-orange-100 to-orange-200 shadow-md rounded-lg p-5 border border-gray-200",
  "bg-gradient-to-r from-pink-100 to-pink-300 shadow-lg rounded-xl p-5 border border-pink-300",
  "bg-gradient-to-r from-green-100 to-green-300 shadow-lg rounded-xl p-5 border border-green-200",
];

const BooksCard = ({ book, index }: IProps) => {
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [borrowData, setBorrowData] = useState({ copies: 1, dueDate: "" });
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleBorrow = async () => {
    // ✅ validation
    if (!borrowData.dueDate) {
      toast.error("Please select a due date!");
      return;
    }

    if (borrowData.copies < 1) {
      toast.error("Copies must be at least 1!");
      return;
    }

    if (borrowData.copies > (book.copies ?? 0)) {
      toast.error("Not enough copies available!");
      return;
    }

    try {
      // ✅ payload: backend যা চায় সেই অনুযায়ী field নাম
      const payload = {
        bookId: book._id, // তোমার book object এ _id থাকলে সেটা
        quantity: borrowData.copies,
        dueDate: borrowData.dueDate,
      };

      console.log("BORROW PAYLOAD =>", payload); // ✅
      await borrowBook(payload).unwrap();

      toast.success("Borrowed successfully ✅");
      setOpen(false);

      // ✅ reset
      setBorrowData({ copies: 1, dueDate: "" });

      // ✅ go to borrow summary page (optional)
      navigate("/borrowed-book");
    } catch (err) {
      toast.error("Borrow failed ❌");
      console.error(err);
    }
  };

  return (
    <div className={`${cardStyles[index % cardStyles.length]} h-full flex flex-col justify-between`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          {book.title}
          <button onClick={() => setOpens(true)} className="p-2">
            <FaPenNib />
          </button>
          <UpdateBook open={opens} setOpen={setOpens} book={book} />
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
        <UpdateBook open={opens} setOpen={setOpens} book={book} />
        <button
          type="button"
          onClick={() => {
            if (book.isBorrowed === true) {
              toast.error("This book is borrowed. You can't delete it.");
              return;
            }
            setDeleteOpen(true);
          }}
          className={`px-3 py-1 text-sm text-white rounded ${
            book.isBorrowed
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
          title={book.isBorrowed ? "Borrowed book can't be deleted" : "Delete"}
        >
          Delete
        </button>

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this book?
              </AlertDialogTitle>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <button type="button" onClick={() => setDeleteOpen(false)}>
                  Cancel
                </button>
              </AlertDialogCancel>

              <AlertDialogAction
               
                onClick={async () => {
                  try {
                    await deleteBook(book._id).unwrap();
                    toast.success("Book deleted successfully ✅");
                    setDeleteOpen(false);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } catch (err: any) {
                    toast.error(err?.data?.message || "Delete failed ❌");
                  }
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
                  <Button onClick={handleBorrow} disabled={isBorrowing}>
                    {isBorrowing ? "Borrowing..." : "Confirm Borrow"}
                  </Button>
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
