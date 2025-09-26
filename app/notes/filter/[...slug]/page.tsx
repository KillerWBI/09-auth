import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
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
