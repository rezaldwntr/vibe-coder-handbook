---
title: 3.1 Instant Scaffolding (No-Code Init)
description: Inisialisasi proyek full-stack tanpa menyentuh terminal menggunakan App Prototyping Agent.
---

Memulai proyek baru dulu identik dengan "Dependency Hell": versi Node tidak cocok, config Tailwind bentrok, atau TypeScript error di baris pertama.
Di **Firebase Studio 2026**, kita meninggalkan terminal bash untuk inisialisasi.

Kita menggunakan **App Prototyping Agent**.

## The Problem: Konfigurasi Manual itu Rapuh

Prompt lama seperti *"Berikan perintah bash untuk install React + Vite + Tailwind"* sudah usang. Mengapa?
1.  **Versi Berubah Cepat:** Jawaban AI tentang versi library sering kadaluarsa dalam hitungan minggu.
2.  **Human Error:** Salah copy-paste satu baris perintah bisa merusak environment.

## The Vibe Solution: Multimodal Agent Initialization

Sekarang, kita tidak meminta *resep* (kode bash), kita memesan *makanan jadi* (proyek yang sudah berjalan).

### 📸 Langkah 1: The "Vision" Prompt

Jangan hanya teks. Jika kamu punya sketsa di kertas atau screenshot aplikasi referensi, **upload** ke App Prototyping Agent.

:::tip[Copy Prompt Ini ke Agent]
**Context:** Saya ingin membangun aplikasi [Nama Aplikasi, misal: POS Cafe].
**Input:** Lihat gambar sketsa layout meja dan menu yang saya upload.

**Task:** Bangun scaffold proyek lengkap (Full Stack).
**Stack:**
*   **Frontend:** Next.js (App Router) + Tailwind CSS.
*   **Backend:** Firebase Data Connect (PostgreSQL) + Genkit.
*   **Auth:** Firebase Auth.

**Requirements:**
1.  Buat struktur folder yang rapi (`src/app`, `src/flows`, `dataconnect`).
2.  Install semua dependencies yang kompatibel.
3.  Siapkan dummy data di database agar preview tidak kosong.
4.  Jalankan server development segera.
:::

### 🛠️ Langkah 2: Visual Refinement

Dalam hitungan detik, Agent akan:
1.  Membuat struktur file.
2.  Menjalankan `npm install` di background.
3.  Membuka **Live Preview** di panel samping.

Di sini kamu bisa menggunakan fitur **Visual Editor** (Annotate/Select) untuk memperbaiki UI tanpa menyentuh kode CSS.
*"Geser tombol login ke tengah."*
*"Ubah tema warna jadi Dark Mode."*

Agent akan melakukan perubahan kode secara real-time.

## Membersihkan Boilerplate? Tidak Perlu.

Dulu kita harus menghapus file sampah (`favicon.ico`, `App.css`) manual.
Dengan App Prototyping Agent, proyek yang dihasilkan sudah **bersih** dan disesuaikan dengan prompt kamu. Tidak ada lagi logo React berputar yang tidak perlu.

> **Vibe Check:** Scaffolding modern bukan tentang seberapa cepat kamu mengetik di terminal, tapi seberapa akurat kamu mendeskripsikan hasil akhir ke Agent.
