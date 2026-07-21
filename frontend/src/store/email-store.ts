import { create } from "zustand";
import type { Category } from "@/types";
import { EMAIL_PAGE_SIZE_OPTIONS } from "@/constants/config";

interface EmailState {
  categoryFilter: Category | "All";
  searchQuery: string;
  pageSize: number;
  setCategoryFilter: (category: Category | "All") => void;
  setSearchQuery: (query: string) => void;
  setPageSize: (size: number) => void;
}

export const useEmailStore = create<EmailState>((set) => ({
  categoryFilter: "All",
  searchQuery: "",
  pageSize: EMAIL_PAGE_SIZE_OPTIONS[0],
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setPageSize: (pageSize) => set({ pageSize }),
}));
