import type { Metadata } from "next";

import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in your personal workspace with NoteHub.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Start writing a new note and organize your thoughts with NoteHub.",
    url: "https://08-zustand-wg99.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview image",
      },
    ],
  },
};



function CreateNotePage() {

  return  (
<main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm />
  </div>
</main>
  );

}
export default CreateNotePage;
