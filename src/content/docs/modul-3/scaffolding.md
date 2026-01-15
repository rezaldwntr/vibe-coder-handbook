---
title: Scaffolding & Boilerplate
description: Teknik inisialisasi project cepat tanpa konflik versi.
---

Memulai project baru seharusnya menyenangkan, bukan frustrasi karena *dependency hell* di 5 menit pertama.

Di Project IDX, kamu memiliki terminal Linux penuh. Namun, seringkali tutorial di internet sudah usang (outdated). Jika kamu copy-paste perintah instalasi dari blog tahun lalu, kemungkinan besar kamu akan bertemu error `E_RESOLVE` atau konflik peer dependency.

## The Problem: "Dependency Hell" Sejak Awal

Pernah mengalami ini? Kamu install React terbaru, lalu install library UI, dan tiba-tiba terminal merah semua karena versi React tidak cocok. Atau kamu lupa flag `--ts` saat init Vite sehingga project jadi JavaScript biasa padahal maunya TypeScript.

## The Vibe Solution: The "Safe Scaffolder" Prompt

Alih-alih mengetik perintah `npm create vite@latest` dan menebak-nebak opsi selanjutnya, biarkan AI meracik **urutan perintah yang pasti jalan** (compatible) untuk stack yang kamu pilih.

### 🎯 The "Safe Scaffolder" Prompt

Gunakan prompt ini di panel Chat Gemini.

:::tip[Copy Prompt Ini]
**Context:** Saya bekerja di terminal Linux (Project IDX).
**Goal:** Saya ingin menginisialisasi project baru dengan stack berikut:
1.  **Frontend:** React (Vite) + TypeScript.
2.  **Styling:** Tailwind CSS (setup lengkap dengan `postcss` dan `autoprefixer`).
3.  **Backend/Auth:** Firebase SDK (v10+).

**Task:** Berikan saya **urutan perintah terminal (bash commands)** langkah-demi-langkah untuk:
1.  Membuat project di folder saat ini (atau folder baru).
2.  Menginstall dependencies tanpa error versioning.
3.  Melakukan inisialisasi Tailwind (buat file config).
4.  Membuat file `firebase.ts` kosong di `src/`.

**Constraint:**
-   Jangan berikan kode file (seperti isi `App.tsx`). Cukup perintah terminal.
-   Gabungkan perintah yang aman digabung (misal: `npm install x y z`).
-   Pastikan versi library kompatibel satu sama lain.
:::

## Eksekusi di Terminal

Gemini akan memberikan output blok kode bash.

1.  Buka Terminal di IDX (`Ctrl + ` `).
2.  **Jangan copy-paste buta.** Baca sekilas.
3.  Copy per blok logis dan jalankan.

### Contoh Output AI (Simulasi)

```bash
# 1. Create Vite project
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2. Install dependencies (React + Firebase + Tailwind)
npm install firebase
npm install -D tailwindcss postcss autoprefixer

# 3. Init Tailwind
npx tailwindcss init -p

# 4. Create placeholder for Firebase config
touch src/firebase.ts
```

## Membersihkan Sampah (Cleaning Boilerplate)

Setelah project ter-install, biasanya banyak file sampah bawaan template (logo React berputar, file CSS default, contoh counter button).

Daripada menghapus manual satu-satu, minta AI melakukannya.

:::tip[Prompt Pembersih]
"Project sudah ter-install. Tolong berikan perintah terminal untuk **menghapus** file default yang tidak perlu (seperti `src/App.css`, `src/assets/react.svg`, `public/vite.svg`). Dan berikan konten minimal untuk `src/App.tsx` yang hanya menampilkan 'Hello World' agar tidak error saat dijalankan."
:::

> **Vibe Check:** Scaffolding yang baik adalah kanvas putih yang bersih. Jangan biarkan kode sampah dari template mengganggu fokusmu di awal.
