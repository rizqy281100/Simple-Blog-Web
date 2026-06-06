"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { updateArticle } from "@/store/articleSlice";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, X, Calendar, Upload } from "lucide-react";
import Image from "next/image";

export default function EditArticle() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const dispatch = useDispatch();

  const article = useSelector((state: RootState) =>
    state.articles.articles.find((a) => a.id === id),
  );

  const [title, setTitle] = useState(article?.title ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [imageUrl, setImageUrl] = useState(article?.imageUrl ?? "");
  const [altText, setAltText] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("File size must be less than 2MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploadError("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setUploadError(data.error || "Upload failed");
        setIsUploading(false);
        return;
      }

      setImageUrl(data.url);
      setUploadError("");
      setIsUploading(false);
    } catch {
      setUploadError("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  if (!article)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 mb-4">Artikel tidak ditemukan</p>
        <Button variant="outline" onClick={() => router.push("/articles")}>
          Kembali ke Daftar
        </Button>
      </div>
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Judul dan konten tidak boleh kosong!");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      dispatch(updateArticle({ ...article, title, content, imageUrl }));
      router.push(`/articles/${article.id}`);
      setIsSaving(false);
    }, 500);
  };

  const isModified =
    title !== article.title ||
    content !== article.content ||
    imageUrl !== article.imageUrl;

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8"
      suppressHydrationWarning
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-slate-600 hover:text-slate-900 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Kembali
        </Button>

        {/* Edit Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            ✏️ Edit Artikel
          </h1>
          <p className="text-sm text-slate-500 mb-6 flex items-center gap-2">
            <Calendar size={16} />
            Dibuat:{" "}
            {new Date(article.createdAt).toLocaleDateString("id-ID", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Featured Image Field */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-3">
                Featured Image *
              </label>

              {/* Upload Area */}
              <div className="mb-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isSaving || isUploading}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload size={32} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">
                      {isUploading
                        ? "⏳ Uploading..."
                        : "Click atau drag file untuk upload"}
                    </span>
                    <span className="text-xs text-slate-500">Max 2MB</span>
                  </label>
                </div>

                {uploadError && (
                  <p className="text-xs text-red-600 mt-2">{uploadError}</p>
                )}

                {imageUrl && (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Foto berhasil diupload
                  </p>
                )}
              </div>

              {/* Image Preview */}
              {(previewUrl || imageUrl) && (
                <div className="mb-4 relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden">
                  {previewUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {!previewUrl && imageUrl && (
                    <Image
                      src={imageUrl}
                      alt="Featured Image"
                      fill
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}

              {/* Alt Text Field */}
              <div className="mt-4">
                <label className="text-xs font-medium text-slate-600 block mb-2">
                  Alt Text untuk gambar
                </label>
                <Input
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Deskripsi singkat gambar untuk SEO"
                  disabled={isSaving}
                  className="border-slate-300 rounded-lg"
                />
              </div>

              {/* Delete Image Button */}
              {imageUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setImageUrl("");
                    setPreviewUrl("");
                  }}
                  disabled={isSaving}
                  className="mt-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X size={16} className="mr-1" />
                  Hapus Gambar
                </Button>
              )}
            </div>

            {/* 2. Title Field */}
            <div className="border-t border-slate-200 pt-6">
              <label className="text-sm font-semibold text-slate-700 block mb-3">
                Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul artikel"
                disabled={isSaving}
                className="border-slate-300 rounded-lg text-lg"
              />
            </div>

            {/* 3. Body Field */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-3">
                Body *
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis isi artikel di sini..."
                rows={12}
                disabled={isSaving}
                className="border-slate-300 rounded-lg resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                {content.split(" ").filter((w) => w.length > 0).length} kata
              </p>
            </div>

            {/* 4. Publish Button */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSaving}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft size={18} className="mr-2" />
                Batal
              </Button>
              <Button
                type="submit"
                disabled={!isModified || isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} className="mr-2" />
                {isSaving ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
