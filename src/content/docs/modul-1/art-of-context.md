---
title: 1.2 The Art of Context
description: Teknik memberikan konteks presisi untuk menghindari halusinasi AI di Project IDX.
---

Salah satu kesalahan pemula terbesar saat menggunakan AI Assistant adalah menganggap AI "maha tahu" seluruh kode kita secara magis. Di Project IDX, kemampuan AI hanya sebagus konteks yang kamu berikan. Tanpa konteks, AI akan **berhalusinasi**—mengarang nama fungsi, mengimpor library yang tidak ada, atau memberikan solusi usang.

## The Problem: "Magic Fix" Syndrome

Developer sering bertanya pada AI: *"Kenapa fungsi login saya error?"* tanpa memberikan detail file mana yang sedang dibahas.

Masalahnya:
1.  **Ambiguitas:** AI tidak tahu apakah kamu pakai Firebase Auth, Auth0, atau custom JWT.
2.  **Copy-Paste Fatigue:** Menyalin manual ratusan baris kode ke chat window itu melelahkan dan sering kali melupakan file dependensi (seperti `types.ts` atau `config.js`).
3.  **Halusinasi:** AI akan menebak-nebak implementasi, menghasilkan kode yang terlihat benar tapi gagal saat dijalankan.

## The Vibe Solution: Context Injection

Project IDX memiliki fitur native untuk menyuntikkan (inject) konteks secara presisi ke dalam Gemini. Alih-alih copy-paste, kita menggunakan fitur **Codebase Awareness**.

Kunci dari *Art of Context* adalah prinsip: **"Don't tell, Show."**
Jangan ceritakan errornya, tunjukkan filenya.

### Fitur Kunci di IDX:
*   **`@file` Reference:** Mengetik `@` di chat bar memungkinkan kamu memilih file spesifik agar AI "membaca" file tersebut sebelum menjawab.
*   **Selection Context:** Highlight/blok kode di editor sebelum membuka chat. Gemini otomatis tahu kamu bertanya tentang *potongan kode itu saja*.

## The Prompt: Debugging with Precision

Gunakan teknik ini saat kamu mengalami bug spesifik tetapi tidak paham letak kesalahannya.

### 🎯 The "Surgical Debugger" Prompt

Pilih file yang bermasalah (misal: `authController.ts`) atau highlight fungsi yang error, lalu gunakan prompt ini:

:::tip[Copy Prompt Ini]
**Context:** Saya sedang melihat file @authController.ts (atau code selection ini). Ini adalah fungsi login menggunakan Firebase Auth.

**Task:** Analisis kenapa fungsi `loginUser` mengembalikan error "undefined property" pada objek user.

**Requirements:**
1.  Jangan ubah struktur logika async/await yang sudah ada.
2.  Cek apakah ada kesalahan *destructuring* atau *typing* (TypeScript).
3.  Berikan kode perbaikan lengkap untuk fungsi tersebut saja.
4.  Jelaskan root cause dalam 1 kalimat singkat.
:::

## Implementation: Workflow di Project IDX

Berikut cara eksekusi "Vibe Coding" untuk konteks:

1.  **Buka Panel Gemini:** Tekan `Cmd+Shift+I` (Mac) atau `Ctrl+Shift+I` (Windows) atau klik ikon kilau di sidebar.
2.  **Inject File:** Ketik `@` lalu ketik nama file (contoh: `@dev.nix` atau `@package.json`). Ini wajib dilakukan jika pertanyaanmu menyangkut konfigurasi.
3.  **Cross-File Debugging:** Jika error mungkin disebabkan oleh file lain, masukkan keduanya.
    *   *Contoh:* "Cek konflik antara `@frontend/api.ts` dan `@backend/server.ts` mengenai format JSON response."

### Pro Tip: Menghindari "Context Overflow"
Jangan masukkan seluruh file proyek jika tidak perlu. AI memiliki batas "jendela memori" (token limit).
*   ❌ **Salah:** "Cek seluruh folder `src` saya."
*   ✅ **Benar:** "Cek `@Navbar.astro` dan `@global.css`, kenapa style-nya berantakan?"

Dengan menguasai *context injection*, kamu mengubah Gemini dari sekadar "chatbot" menjadi "Senior Pair Programmer" yang paham codebase-mu.
