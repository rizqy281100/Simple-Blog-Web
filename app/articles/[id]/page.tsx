"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Edit2, Calendar, Clock } from "lucide-react";

export default function ViewArticle() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const article = useSelector((state: RootState) =>
    state.articles.articles.find((a) => a.id === id),
  );

  if (!article)
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-slate-600 mb-6">Artikel tidak ditemukan</p>
          <Link href="/articles">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              ← Kembali ke Daftar
            </Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8"
      suppressHydrationWarning
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigasi */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-slate-600 hover:text-slate-900 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Kembali
        </Button>

        {/* Kartu Artikel */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          {/* Gambar Hero */}
          {article.imageUrl && (
            <div className="relative w-full h-96 bg-slate-200">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src =
                    "https://via.placeholder.com/800x600?text=Foto+Tidak+Tersedia";
                }}
              />
            </div>
          )}

          {/* Konten */}
          <div className="p-8 md:p-12">
            {/* Judul & Meta */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(article.createdAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  Baca ±{Math.ceil(article.content.split(" ").length / 200)} min
                </span>
              </div>
            </div>

            {/* Pemisah */}
            <div className="border-t border-slate-200 my-8"></div>

            {/* Isi Artikel */}
            <div className="prose prose-lg max-w-none prose-slate">
              <p className="whitespace-pre-wrap text-slate-700 leading-8 text-lg">
                {article.content}
              </p>
            </div>

            {/* Pemisah */}
            <div className="border-t border-slate-200 my-8"></div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Kembali
              </Button>
              <Link href={`/articles/${article.id}/edit`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  <Edit2 size={18} />
                  Edit Artikel
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
