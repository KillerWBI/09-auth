// app/notes/[id]/page.tsx
import { getSingleNote } from "@/lib/clientApi";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import NoteDetailsClient from "./NoteDetails.client";


type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const { id } = await params;
  const  note  = await getSingleNote(id);
   return {
    title: `${note.title} | NoteHub`,
    description: note.content
      ? `${note.content.slice(0, 100)}...`
      : "View note details in NoteHub.",
    openGraph: {
      title: `${note.title} | NoteHub`,
      description: note.content
        ? `${note.content.slice(0, 100)}...`
        : "View note details in NoteHub.",
      url: `https://08-zustand-wg99.vercel.app/notes/${note.id}`,
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
}

const NoteDetails = async ({ params }: Props) => {
    const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
