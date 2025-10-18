import { fetchNotes } from "@/lib/api/clientApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({params}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
      title: `Filter:${slug[0]} | NoteHub`,
  description: `Browse all notes tagged with "${slug[0]}" in NoteHub.`,
  openGraph : {
    title: `Filter:${slug[0]} | NoteHub`,
    description: `Explore notes filtered by the "${slug[0]}" tag in NoteHub.`,
    url: 'https://08-zustand-wg99.vercel.app/filter/' + slug[0],
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
  }
}




export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const tag = slug?.[0] === "All" ? "" : slug?.[0] || "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, 1],
    queryFn: () => fetchNotes(tag, 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
