"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addArticle } from "@/store/articleSlice";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import Image from "next/image";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [altText, setAltText] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  // Fungsi untuk menangani upload file
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Fungsi validasi file
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("File size must be less than 2MB");
      return;
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file");
      return;
    }

    // Tampilkan preview
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

      setUploadedImageUrl(data.url);
      setUploadError("");
      setIsUploading(false);
    } catch {
      setUploadError("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !uploadedImageUrl || !altText) {
      alert("Semua field tidak boleh kosong!");
      return;
    }

    // Kirim data ke Redux
    dispatch(addArticle({ title, content, imageUrl: uploadedImageUrl }));
    // Pindah kembali ke halaman daftar artikel
    router.push("/articles");
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8"
      suppressHydrationWarning
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigasi */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-slate-600 hover:text-slate-900 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Kembali
        </Button>

        {/* Form Buat Artikel */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">
            Buat Artikel Baru
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Field Featured Image */}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-3">
                Featured Image *
              </label>

              {/* Area Upload */}
              <div className="mb-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
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
                        ? "Uploading..."
                        : "Klik atau drag file untuk upload"}
                    </span>
                    <span className="text-xs text-slate-500">Max 2MB</span>
                  </label>
                </div>

                {uploadError && (
                  <p className="text-xs text-red-600 mt-2">⚠️ {uploadError}</p>
                )}

                {uploadedImageUrl && (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Foto berhasil diupload
                  </p>
                )}
              </div>

              {/* Preview Gambar */}
              {(previewUrl || uploadedImageUrl) && (
                <div className="mb-4 relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden">
                  {previewUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {!previewUrl && uploadedImageUrl && (
                    <Image
                      src={uploadedImageUrl}
                      alt="Featured Image"
                      fill
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}

              {/* 2. Alt Image (Untuk SEO) */}
              <div className="mt-4">
                <label className="text-xs font-medium text-slate-600 block mb-2">
                  Alt Text untuk gambar
                </label>
                <Input
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Deskripsi singkat gambar untuk SEO"
                  className="border-slate-300 rounded-lg"
                />
              </div>
            </div>

            {/* 3. Title Field */}
            <div className="border-t border-slate-200 pt-6">
              <label className="text-sm font-semibold text-slate-700 block mb-3">
                Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul artikel"
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
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft size={18} className="mr-2" />
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus size={18} className="mr-2" />
                Publish
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
