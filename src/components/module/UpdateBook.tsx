import { Button } from "@/components/ui/button";
import {
  Controller,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { IBook } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";
import { useUpdateBookMutation } from '@/redux/api/baseApi';

type UpdateBookProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  book: IBook;
};

export function UpdateBook({ open, setOpen, book }: UpdateBookProps) {
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      description: "",
      copies: 0,
      genre: "",
      available: true,
    },
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  // ✅ modal open হলে clicked book data form এ বসানো
  useEffect(() => {
    if (open && book) {
      form.reset({
        title: book.title ?? "",
        author: book.author ?? "",
        isbn: book.isbn ?? "",
        description: book.description ?? "",
        copies: typeof book.copies === "number" ? book.copies : 0,
        genre: book.genre ?? "",
        available: typeof book.available === "boolean" ? book.available : true,
      });
    }
  }, [open, book, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    // ✅ payload clean + correct type
    const payload: Partial<IBook> = {
      title: String(formData.title).trim(),
      author: String(formData.author).trim(),
      isbn: String(formData.isbn).trim(),
      description: String(formData.description ?? ""),
      copies: Number(formData.copies),
      available:
        typeof formData.available === "boolean"
          ? formData.available
          : String(formData.available).toLowerCase() === "true",
      // genre uppercase
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      genre: String(formData.genre).toUpperCase() as any,
    };

    // ✅ basic validation (extra safety)
    if (!book?._id) {
      toast.error("Book id missing!");
      return;
    }

    try {
      await updateBook({ id: book._id, payload }).unwrap();

      toast.success("Book updated successfully ✅");
      setOpen(false);
      form.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed ❌");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogDescription className="sr-only">
          Update book dialog
        </DialogDescription>

        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <Controller
            name="title"
            control={form.control}
            rules={{ required: "Title is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input {...field} id={field.name} autoComplete="off" />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="author"
            control={form.control}
            rules={{ required: "Author is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Author</FieldLabel>
                <Input {...field} id={field.name} autoComplete="off" />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="isbn"
            control={form.control}
            rules={{ required: "Isbn is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Isbn</FieldLabel>
                <Input {...field} id={field.name} autoComplete="off" />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            rules={{ required: "Description is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Input {...field} id={field.name} autoComplete="off" />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="copies"
            control={form.control}
            rules={{
              required: "Copies is required",
              validate: (v) =>
                Number.isInteger(Number(v)) && Number(v) >= 0
                  ? true
                  : "Copies must be a non-negative integer",
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Copies</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  min={0}
                  step={1}
                  autoComplete="off"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="available"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="available">Available</FieldLabel>
                <select
                  id="available"
                  value={String(field.value)}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  className="border rounded px-2 py-2 w-full"
                >
                  <option value="true">TRUE</option>
                  <option value="false">FALSE</option>
                </select>
              </Field>
            )}
          />

          <Controller
            name="genre"
            control={form.control}
            rules={{ required: "Genre is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Genre</FieldLabel>
                <select
                  {...field}
                  id={field.name}
                  className="border rounded px-2 py-2 w-full"
                >
                  <option value="">Select Genre</option>
                  <option value="FICTION">FICTION</option>
                  <option value="NON_FICTION">NON_FICTION</option>
                  <option value="SCIENCE">SCIENCE</option>
                  <option value="HISTORY">HISTORY</option>
                  <option value="BIOGRAPHY">BIOGRAPHY</option>
                  <option value="FANTASY">FANTASY</option>
                </select>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}