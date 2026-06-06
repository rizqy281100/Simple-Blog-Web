# Simple Blog Web Application

Pengumpulan Technical Test

Repositori:
https://github.com/rizqy281100/Simple-Web-Blog

---

## Gambaran Umum

Aplikasi Web Blog Sederhana ini dibangun menggunakan Next.js dan TypeScript.

Aplikasi ini menyediakan halaman profil perusahaan dan halaman artikel dengan basic CRUD (Create, Read, Update, Delete).

Proyek ini dikembangkan untuk mendemonstrasikan:

* Manajemen state menggunakan Redux Toolkit
* Implementasi CRUD
* Penyimpanan data di sisi klien (Client-side)

---

## Fitur

### Home Page

* Bagian tentang perusahaan
* Visi & Misi
* Landing page yang sederhana dan bersih

### Articles Page

* Melihat semua artikel
* Membuat artikel baru
* Mengedit artikel yang sudah ada
* Menghapus artikel
* Melihat detail artikel
* Upload Featured Image
* Menampilkan tanggal pembuatan

### CRUD

* Create (Membuat) Artikel
* Read (Membaca) Daftar Artikel
* Update (Memperbarui) Artikel
* Delete (Menghapus) Artikel

### Penyimpanan Data

* Data disimpan secara lokal menggunakan penyimpanan browser (Local Storage)
* Artikel tetap tersedia setelah halaman di-refresh

---

## Tech Stack

* Next.js 16
* React 19
* TypeScript
* Redux Toolkit
* React Redux
* Tailwind CSS
* Shadcn UI (Radix)
* Lucide React
* UUID

---

## Project Structure

```text
simple-blog-test/
├── app/
├── components/
├── lib/
├── public/
├── store/
├── package.json
```

---

## Routes

| Route          | Description          |
| -------------- | -------------------- |
| /              | Company Profile Page |
| /articles      | Article List         |
| /articles/new  | Create Article       |
| /articles/[id] | View/Edit Article    |

---

## Installation

Clone repository:

```bash
git clone https://github.com/rizqy281100/Simple-Web-Blog.git
```

Move to project directory:

```bash
cd Simple-Web-Blog/simple-blog-test
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Assumptions

* Tidak menggunakan API backend.
* Data artikel dikelola di sisi klien (client-side).
* Penyimpanan data menggunakan local storage bawaan browser.
* Autentikasi dan otorisasi berada di luar cakupan technical test ini.

---

## Future Improvements

* Integrasi API Backend
* Autentikasi pengguna
* Fitur pencarian dan filter
* Optimasi gambar
* Unit testing dan integration testing

---

## Author

Muhammad Rizqy Ramadhan
