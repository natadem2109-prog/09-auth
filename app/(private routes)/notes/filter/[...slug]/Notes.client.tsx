"use client";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../../../../lib/api/clientApi";
import Link from "next/link";
import css from "./Notes.client.module.css";
import NoteList from "../../../../../components/NoteList/NoteList";
import Pagination from "../../../../../components/Pagination/Pagination";
import SearchBox from "../../../../../components/SearchBox/SearchBox";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const handleChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data && data.notes.length === 0 ? (
        search ? (
          <p>No results for search</p>
        ) : (
          <p>No notes in this category</p>
        )
      ) : (
        <NoteList notes={data?.notes ?? []} />
      )}
    </div>
  );
}
