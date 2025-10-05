"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import { ValidationError } from "yup";
import { createNote } from "../../lib/api";
import { useNoteDraftStore } from "../../lib/store/noteStore";
import css from "./NoteForm.module.css";


interface NoteFormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | "";
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Обов'язкове поле"),
  content: Yup.string().max(500, "Максимум 500 символів"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Невірний тег")
    .required("Обов'язкове поле"),
});

export default function NoteForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: NoteFormValues) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  async function handleAction(formData: FormData) {
    const values: NoteFormValues = {
      title: (formData.get("title") as string) || "",
      content: (formData.get("content") as string) || "",
      tag: (formData.get("tag") as NoteFormValues["tag"]) || "",
    };

    try {
      await validationSchema.validate(values, { abortEarly: true });
      mutation.mutate(values);
    } catch (error) {
      if (error instanceof ValidationError) {
        alert(error.message);
      } else {
        console.error(error);
      }
    }
  }

 const { draft, setDraft, clearDraft } = useNoteDraftStore();
const router = useRouter();
const routerBack = router.back;


const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {

    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };



  return (
    <form action={handleAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" className={css.input} defaultValue={draft?.title} onChange={handleChange}/>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content} onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
          <option value="">Select tag</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={routerBack}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
