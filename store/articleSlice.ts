import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Tipe data untuk 1 Artikel
export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  imageUrl?: string;
}

// Fungsi untuk membaca data dari LocalStorage saat web pertama kali dibuka
const loadState = (): Article[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("articles");
    if (saved) return JSON.parse(saved);
  }
  return []; // Kembalikan array kosong jika tidak ada data
};

// State awal
const initialState: { articles: Article[] } = {
  articles: loadState(),
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticle: (
      state,
      action: PayloadAction<{
        title: string;
        content: string;
        imageUrl?: string;
      }>,
    ) => {
      const newArticle: Article = {
        id: uuidv4(), // Generate ID unik
        title: action.payload.title,
        content: action.payload.content,
        imageUrl: action.payload.imageUrl,
        createdAt: new Date().toISOString(),
      };
      state.articles.push(newArticle);
      localStorage.setItem("articles", JSON.stringify(state.articles)); // Simpan ke storage
    },
    updateArticle: (state, action: PayloadAction<Article>) => {
      const index = state.articles.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.articles[index] = action.payload;
        localStorage.setItem("articles", JSON.stringify(state.articles));
      }
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter((a) => a.id !== action.payload);
      localStorage.setItem("articles", JSON.stringify(state.articles));
    },
  },
});

export const { addArticle, updateArticle, deleteArticle } =
  articleSlice.actions;
export default articleSlice.reducer;
