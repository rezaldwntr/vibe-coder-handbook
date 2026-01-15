---
title: Frontend Vibe Coding
description: Mengubah sketsa coretan tangan menjadi UI React + Tailwind cantik dengan Multi-Modal Prompting.
---

Coding CSS dari nol itu *so last year*. Memindahkan pixel dari Figma ke CSS manual memakan waktu berjam-jam.

Di era **Vibe Coding**, mata uang utamanya adalah **Visual Context**. Gemini di Project IDX adalah model **Multi-Modal**, artinya ia bisa "melihat" gambar, bukan hanya membaca teks. Kita akan manfaatkan ini untuk fitur "Napkin Sketch to Code".

## The Problem: "Pixel Pushing" Fatigue

Biasanya alur frontend dev:
1.  Desainer buat mockup di Figma.
2.  Dev inspeksi elemen, copy hex code, ukur margin.
3.  Ketik `div className="flex justify-center..."`.
4.  Refresh browser. Salah margin. Ulangi.

Ini membosankan dan rentan kesalahan visual.

## The Vibe Solution: Image-to-Code

Alih-alih mendeskripsikan "Tombol merah di kanan atas", kita cukup **tunjukkan** gambarnya. Tidak perlu desain Figma High-Fidelity. Coretan tangan di kertas tisu pun cukup.

### 📸 Langkah 1: The "Napkin Sketch"

Ambil kertas dan pena. Gambar layout kasarmu.
*   Kotak untuk sidebar.
*   Garis-garis untuk list item.
*   Lingkaran untuk avatar user.
*   Tulis label penting (misal: "Saldo", "Riwayat").

Foto gambar tersebut dengan HP-mu.

### 📤 Langkah 2: Upload ke Gemini IDX

1.  Buka panel Gemini di IDX.
2.  Klik icon "Image" atau drag-and-drop foto sketsamu ke chat input.

### 🎯 Langkah 3: The "UI Converter" Prompt

Gunakan prompt ini bersamaan dengan upload gambar.

:::tip[Copy Prompt Ini]
**Context:** Lihat gambar sketsa UI yang saya upload. Ini adalah desain kasar untuk halaman **[Nama Halaman, misal: Dashboard Nasabah Bank Sampah]**.

**Task:** Konversikan desain visual ini menjadi kode **React Component (TSX)**.

**Tech Stack:**
*   Framework: React + Vite.
*   Styling: **Tailwind CSS** (Mobile-first approach).
*   Icons: Gunakan `lucide-react` (sebagai placeholder icon).

**Requirements:**
1.  **Structure:** Identifikasi komponen utama (Header, Sidebar, Cards, Table).
2.  **Aesthetics:** Buat terlihat modern dan bersih ("Clean SaaS look"). Gunakan skema warna: Background `slate-50`, Primary `emerald-600`.
3.  **Responsiveness:** Pastikan layout stack vertikal di mobile, dan side-by-side di desktop.
4.  **Mock Data:** Buat variable data dummy (array) agar UI langsung terlihat isinya, jangan kosong.

**Output:** Single file component code.
:::

## Iterasi Visual (Polishing)

Jarang sekali AI langsung 100% sempurna di percobaan pertama. Biasanya struktur benar, tapi warnanya aneh atau padding kekecilan.

Jangan edit CSS manual dulu! Lakukan **Iterative Prompting**.

*   *User:* "Bagus. Tapi tolong ubah kartu 'Saldo' agar ada shadow yang lembut (`shadow-lg`) dan sudutnya lebih membulat (`rounded-2xl`). Ganti warna tombol dari biru ke hijau gradasi."
*   *User:* "Di mode mobile, sidebar-nya sembunyikan dan ganti jadi Hamburger Menu icon."

## Tips: Shadcn/UI & Component Libraries

Jika kamu menggunakan library komponen seperti **shadcn/ui** atau **DaisyUI**, sebutkan secara eksplisit di prompt agar AI tidak menulis CSS native `border-radius` manual, melainkan menggunakan class utility library tersebut.

:::tip[Prompt Shadcn]
"...Gunakan komponen dari **shadcn/ui** (seperti `<Card>`, `<Button>`, `<Input>`) untuk elemen-elemennya. Asumsikan komponen tersebut sudah di-install di folder `@/components/ui`."
:::

> **Vibe Check:** Jangan terobsesi dengan pixel-perfect di tahap ini. Tujuannya adalah mendapatkan **struktur HTML & class Tailwind** yang 80% jadi dalam 30 detik. Sisa 20% (finishing touch) baru kamu kerjakan manual.
