import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "../../../../../lib/api/serverApi";
import type { Metadata } from "next";

interface Props {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const filter = slug?.join("/") || "all";

  const title = `Notes filtered by: ${filter} | NoteHub`;
  const description = `View notes filtered by "${filter}". Browse and manage your notes based on selected category or filter.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${filter}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filter: ${filter}`,
        },
      ],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  const tag = slug?.[0];
  const actualTag = tag === "all" ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", actualTag],
    queryFn: () => fetchNotes("", 1, actualTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={actualTag} />
    </HydrationBoundary>
  );
}
