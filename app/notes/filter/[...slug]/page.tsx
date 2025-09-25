import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: { slug?: string[] };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();


const tag = params.slug?.[0] === "All" ? "" : params.slug?.[0] || "";

  // Prefetch першої сторінки без пошуку
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1],
    queryFn: () => fetchNotes('', 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
}
