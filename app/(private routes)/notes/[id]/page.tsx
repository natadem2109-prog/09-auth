import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import type { Metadata } from "next";
import { fetchNoteById } from "../../../../lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchNoteById(id);

  const title = `${note.title} | NoteHub`;
  const description = note.content.slice(0, 120);

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  try {
    const note = await queryClient.fetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });

    if (!note) {
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
