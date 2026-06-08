// import { NextRequest, NextResponse } from "next/server";
// import path from "path";
// import { put } from "@vercel/blob";

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
// const UPLOAD_DIR = "public/uploads";

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }

//     // Check file size
//     if (file.size > MAX_FILE_SIZE) {
//       return NextResponse.json(
//         {
//           error: `File size must be less than 2MB. Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
//         },
//         { status: 400 },
//       );
//     }

//     // Check tipe file
//     if (!file.type.startsWith("image/")) {
//       return NextResponse.json(
//         { error: "File must be an image" },
//         { status: 400 },
//       );
//     }

//     // Mengubah file menjadi buffer (untuk menyimpan file secara langsung tanpa manipulasi)
//     const buffer = await file.arrayBuffer();
//     const fileBuffer = Buffer.from(buffer);

//     // Membuat direktori upload jika belum ada
//     const uploadPath = path.join(process.cwd(), UPLOAD_DIR);
//     await fs.mkdir(uploadPath, { recursive: true });

//     // Menyimpan file dengan nama unik (menggunakan timestamp)
//     const timestamp = Date.now();
//     const originalName = file.name.split(".")[0];
//     const ext = file.name.split(".").pop();
//     const filename = `${originalName}-${timestamp}.${ext}`;
//     const filepath = path.join(uploadPath, filename);

//     // Simpan file ke disk
//     await fs.writeFile(filepath, fileBuffer);

//     // Return the public URL
//     const publicUrl = `/uploads/${filename}`;

//     return NextResponse.json(
//       {
//         success: true,
//         url: publicUrl,
//         message: "Image uploaded successfully",
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validasi ukuran file
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size must be less than 2MB. Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
        },
        { status: 400 },
      );
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 },
      );
    }

    // Upload ke Vercel Blob
    const blob = await put(`${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    return NextResponse.json(
      {
        success: true,
        url: blob.url,
        message: "Image uploaded successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      { status: 500 },
    );
  }
}
