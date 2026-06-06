"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ViewArticle() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const article = useSelector((state: RootState) =>
    state.articles.articles.find((a) => a.id === id),
  );

  if (!article)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 mb-4">Artikel tidak ditemukan</p>
        <Link href="/articles">
          <Button variant="outline">Kembali ke Daftar</Button>
        </Link>
      </div>
    );

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-3xl mb-2">{article.title}</CardTitle>
            <p className="text-xs text-gray-400">
              Dibuat: {new Date(article.createdAt).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {article.content}
          </p>
        </div>

        <div className="border-t pt-6 flex justify-between items-center">
          <Button variant="outline" onClick={() => router.back()}>
            ← Kembali
          </Button>
          <div className="flex gap-2">
            <Link href={`/articles/${article.id}/edit`}>
              <Button>Edit</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
