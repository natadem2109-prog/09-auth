import { nextServer } from "./api";
import type { Note } from "../../types/note";
import type { User } from "@/types/user";

export interface CreateNoteData {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
) => {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search,
      perPage: 12,
      ...(tag ? { tag } : {}),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteData) => {
  const { data } = await nextServer.post<Note>("/notes", note);
  return data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionResponse = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionResponse>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me", {
    withCredentials: true,
  });

  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateMe = async (data: { username: string }) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};
