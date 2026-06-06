"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { deleteArticle } from "@/store/articleSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  Edit2,
  Trash2,
  Plus,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ARTICLES_PER_PAGE = 6;

export default function ArticleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const articles = useSelector((state: RootState) => state.articles.articles);
  const dispatch = useDispatch();

  // Hitung halaman
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIndex, endIndex);

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8"
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bagian Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              Baca Artikel Terupdate Disini
            </h1>
            <p className="text-slate-600">
              {articles.length} dari 6 artikel per halaman.
            </p>
          </div>
          <Link href="/articles/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
              <Plus size={20} />
              Buat Artikel Baru
            </Button>
          </Link>
        </div>

        {/* Status Kosong */}
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-slate-500 mb-6">
              Belum ada artikel. Mulai cerita Anda sekarang!
            </p>
            <Link href="/articles/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Buat Artikel Pertama
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Grid Artikel */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 group"
                >
                  {/* Kontainer Gambar */}
                  {article.imageUrl && (
                    <div className="relative w-full h-48 overflow-hidden bg-slate-200">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src =
                            "https://via.placeholder.com/800x600?text=Foto+Tidak+Tersedia";
                        }}
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}

                  {/* Kontainer Konten */}
                  <div className="flex flex-col grow p-5">
                    {/* Judul */}
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>

                    {/* Tanggal & Statistik */}
                    <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    {/* Preview Konten */}
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4 grow">
                      {article.content}
                    </p>
                  </div>

                  {/* Tombol Aksi - Tetap di Bawah */}
                  <div className="px-5 pb-5 border-t border-slate-200 pt-4">
                    <div className="flex gap-2 w-full">
                      <Link href={`/articles/${article.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-slate-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                        >
                          <Eye size={16} />
                        </Button>
                      </Link>
                      <Link
                        href={`/articles/${article.id}/edit`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-slate-300 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300"
                        >
                          <Edit2 size={16} />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Yakin ingin menghapus "${article.title}"?`,
                            )
                          ) {
                            dispatch(deleteArticle(article.id));
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Kontrol Paginasi */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </Button>

                {/* Nomor Halaman */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border-slate-300 hover:bg-slate-100"
                        }
                      >
                        {page}
                      </Button>
                    ),
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="border-slate-300 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}

            {/* Info Paginasi */}
            {totalPages > 1 && (
              <p className="text-center text-sm text-slate-500 mt-4">
                Halaman {currentPage} dari {totalPages}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
