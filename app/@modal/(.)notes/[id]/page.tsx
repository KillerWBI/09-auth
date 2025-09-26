// app/notes/[id]/page.tsx

import { getSingleNote } from "@/lib/api";
import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NotePreview.client";

type Props = {
   params: { id: string };
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = params;
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
