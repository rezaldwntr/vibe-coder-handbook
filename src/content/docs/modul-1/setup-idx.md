---
title: 1.1 Setting Up Project IDX
description: Cara setup environment menggunakan AI.
---

Project IDX bukan sekadar VS Code di browser; ini adalah environment yang dikelola oleh Nix. Sebagai vibe coder, kita minta AI melakukan setup untuk kita.

## Masalah Umum
Developer sering bingung menulis file konfigurasi `dev.nix` secara manual untuk menginstal tools spesifik (misal: Python versi tertentu, Firebase CLI, ekstensi).

## Solusi Vibe Coding: Instructional Prompting

Gunakan prompt ini di Gemini (panel kanan IDX) saat pertama kali membuat workspace.

### 🎯 The "Environment Architect" Prompt

:::tip[Copy Prompt Ini]
**Context:** Saya sedang setup workspace di Project IDX untuk aplikasi [Jenis Aplikasi] menggunakan [Tech Stack].

**Task:** Tolong buatkan konfigurasi file `dev.nix` yang lengkap.

**Requirements:**
1. Include packages: `python311`, `nodejs_20`, `firebase-tools`, dan `docker`.
2. Setup environment variables untuk port preview standar.
3. Tambahkan ekstensi VS Code yang relevan.
4. Buat hook `onStart` untuk otomatis install dependencies.

Berikan kodenya saja tanpa penjelasan panjang.
:::

### Implementasi
Copy output dari Gemini, paste ke file `.idx/dev.nix`, lalu klik tombol **"Rebuild Environment"**.