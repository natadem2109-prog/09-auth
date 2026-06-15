import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import { nextServer } from "./api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const getCookiesHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore.toString();
};

export async function fetchNotes(
  searchQuery: string,
  currentPage: number,
  searchTag?: string,
): Promise<FetchNotesResponse> {
  const { data } = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params: {
      search: searchQuery,
      page: currentPage,
      tag: searchTag,
    },
  });
  return data;
}
export const fetchNoteById = async (id: string) => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: await getCookiesHeader(),
    },
  });

  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
