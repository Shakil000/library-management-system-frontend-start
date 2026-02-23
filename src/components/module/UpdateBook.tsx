import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hook";
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
import { addBook } from "@/redux/features/books/bookSlice";
import { useCreateBookMutation } from "@/redux/api/baseApi";

type UpdateBookProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function UpdateBook({ open, setOpen }: UpdateBookProps) {
  const form = useForm();
  const dispatch = useAppDispatch();

  const [createBook, { isLoading }] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    // copies/available ঠিক টাইপে পাঠানো (না হলে string হয়ে যাবে)
    const payload: IBook = {
      ...(formData as IBook),
      copies: Number(formData.copies),
      available:
        typeof formData.available === "boolean"
          ? formData.available
          : String(formData.available).toLowerCase() === "true",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      genre: String(formData.genre).toUpperCase() as any,
    };

    // Optional: local redux store update
    dispatch(addBook(payload));

    try {
      const result = await createBook(payload).unwrap();
      console.log("Book saved to DB:", result);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogDescription className="sr-only">
          Add book dialog
        </DialogDescription>

        <DialogHeader>
          <DialogTitle>Add Books</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <Controller
            name="title"
            control={form.control}
            rules={{ required: "Title is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
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
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
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
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
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
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
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
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="available"
            control={form.control}
            defaultValue={true}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Available</FieldLabel>
                <select
                  id={field.name}
                  value={String(field.value)}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  className="border rounded px-2 py-2 w-full"
                >
                  <option value="true">TRUE</option>
                  <option value="false">FALSE</option>
                </select>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
                  aria-invalid={fieldState.invalid}
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
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
