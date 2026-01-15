---
title: Code Archeology
description: Teknik membedah kode warisan (legacy) tanpa rasa takut.
---

Masuk ke project yang sudah berjalan tahunan seringkali terasa seperti masuk ke hutan belantara tanpa peta. Variabel bernama `x`, fungsi 500 baris, dan komentar kode yang terakhir diupdate tahun 2019.

Di **Vibe Coding**, kita tidak membaca kode baris-demi-baris dari awal. Kita bertindak sebagai **Arkeolog Code** yang menggunakan AI untuk memetakan situs penggalian.

## The Problem: "Dokumentasi adalah Mitos"

Project lama jarang punya dokumentasi yang *up-to-date*. Developer aslinya mungkin sudah resign. Jika kamu mencoba memahami flow dengan cara "Trace manual" (`Ctrl+Click` satu per satu), kamu akan kehabisan "baterai mental" (cognitive load) sebelum menemukan bug-nya.

## The Vibe Solution: AI Tour Guide

Gemini di Project IDX memiliki keunggulan besar: **Context Window** yang besar. Ia bisa memuat banyak file sekaligus dan menjelaskan hubungannya.

### 🗺️ Langkah 1: The 10,000 Feet View

Sebelum menyentuh satu file pun, pahami dulu **peta wilayahnya**.

1.  Buka terminal IDX.
2.  Jalankan `tree src -L 2` (atau `find src -maxdepth 2`) untuk melihat struktur folder utama.
3.  Copy outputnya ke chat.

:::tip[Prompt Arsitek]
**Context:** Saya baru onboarding di project ini. Berikut adalah struktur foldernya:
```text
[PASTE OUTPUT TREE DI SINI]
```

**Task:** Analisis struktur proyek ini.
1.  **Architecture Pattern:** Apakah ini MVC, Clean Architecture, Feature-based, atau Spaghetti?
2.  **Key Directories:** Di mana kemungkinan besar *Business Logic* tersimpan? Di mana UI Components?
3.  **Entry Point:** Dari nama filenya, mana yang kemungkinan menjadi titik awal aplikasi berjalan?
:::

### 👶 Langkah 2: Explain Like I'm 5 (ELI5)

Kamu menemukan file bernama `TransactionController.ts` yang panjangnya 800 baris. Isinya penuh dengan `if-else` bersarang. Jangan baca manual dulu.

:::tip[Prompt ELI5]
**Context:** Lihat file @src/controllers/TransactionController.ts (ganti dengan file targetmu).
**Task:** Jelaskan apa yang dilakukan file ini dengan gaya **"Explain Like I'm 5"** (seperti menjelaskan ke anak 5 tahun).

**Questions:**
1.  **Big Picture:** Apa tanggung jawab utama file ini? (Misal: "Ini pak satpam yang ngecek tiket masuk").
2.  **The Flow:** Ceritakan alurnya seperti dongeng. "Pertama, data masuk... lalu dicek apakah..."
3.  **Red Flags:** Adakah bagian yang terlihat aneh, berisiko bug, atau *hardcoded*?

**Output:** Ringkasan bahasa manusia, hindari jargon teknis yang tidak perlu.
:::

### 🕸️ Langkah 3: Connecting the Dots

Kode legacy seringkali "melompat-lompat". Fungsi di file A memanggil fungsi di file B yang mewarisi class di file C.

Gunakan fitur **@mention** di IDX untuk memanggil beberapa file sekaligus.

:::tip[Prompt Detektif]
**Context:** Saya sedang menelusuri bug di fitur Diskon.
Lihat file:
1.  @src/services/DiscountService.ts
2.  @src/models/User.ts
3.  @src/utils/dateHelpers.ts

**Task:** Jelaskan hubungan ketiga file ini. Bagaimana `DiscountService` menggunakan data dari `User`? Apakah ada manipulasi tanggal menggunakan `dateHelpers` yang mencurigakan?
:::

## Archeology Log

Sama seperti arkeolog mencatat temuannya, kamu harus mendokumentasikan pemahamanmu.

*   Jangan simpan di otak.
*   Buat file `docs/legacy-notes.md`.
*   Copy penjelasan AI yang paling berguna ke sana.

> **Vibe Check:** Jangan menghina kode lama ("Siapa sih yang nulis sampah ini?"). Ingat, kode itu pernah menghasilkan uang dan berjalan di production. Hormati *history*-nya, tapi perbaiki masa depannya dengan AI.
