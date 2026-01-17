---
title: 4.1 Code Archeology (Infinity Context)
description: Membedah arsitektur kode raksasa menggunakan Jendela Konteks 2 Juta Token.
---

Masuk ke project legacy ("warisan") dulu terasa seperti masuk hutan gelap dengan senter redup.
Kita harus menjalankan perintah `tree`, menebak struktur folder, dan membaca file satu per satu.

Di era **Gemini 3 Pro** dengan **2 Juta Token Context**, kita tidak butuh senter. Kita punya satelit.

## The Power of Infinity Context

Firebase Studio memungkinkan Gemini untuk "membaca" **seluruh repositori** sekaligus.
Bukan hanya potongan file, tapi setiap baris kode, setiap konfigurasi, dan setiap dokumentasi di dalam projectmu.

### Strategi Baru: The "Repository Mental Map"

Jangan lagi copy-paste output `tree`. Instruksikan AI untuk menelan semua konteks dan memuntahkan pemahaman arsitektural.

:::tip[Copy Prompt Ini]
**Target:** @repository (Seluruh Project)
**Task:** Buat "Peta Mental" arsitektur proyek ini.

**Analisis:**
1.  **Bird's Eye View:** Apa pola desain utama yang digunakan? (MVC, Clean Arch, Domain-Driven?).
2.  **Data Flow:** Lacak bagaimana data mengalir dari Frontend (UI) -> API -> Database. Tunjukkan file kuncinya.
3.  **Dependency Graph:** Identifikasi modul mana yang paling "berat" (banyak di-import file lain) dan paling rapuh.
4.  **Inconsistencies:** Temukan pola kode yang tidak konsisten (misal: ada yang pakai `axios`, ada yang pakai `fetch` di folder berbeda).
:::

## Deteksi "Time Bombs"

Kode legacy sering menyimpan bom waktu: dependensi sirkular, hardcoded secrets, atau logika bisnis yang duplikat.

Gunakan "Infinity Context" untuk menyisir ranjau ini.

:::tip[Prompt Deteksi Dini]
**Target:** @repository
**Task:** Audit kode ini untuk menemukan **Circular Dependencies** dan **Anti-Patterns**.

**Fokus:**
1.  Cek apakah ada *Utils* yang meng-import *Services* (seharusnya satu arah).
2.  Cek apakah ada *Hardcoded Secrets* (API Keys) yang terselip di file `.js` atau `.env` yang ter-commit.
3.  List 3 area kode yang paling sulit di-maintain (Cyclomatic Complexity tinggi) dan butuh refactoring segera.
:::

## The "Explain It To Me" Button

Di Firebase Studio, seringkali kamu menemukan fungsi `doMagic()` sepanjang 500 baris tanpa komentar.
Jangan buang waktu menelusuri variabel `x` dan `y`.

1.  **Highlight** seluruh fungsi.
2.  Klik **"Explain This"** (atau tanya di chat).
3.  Minta penjelasan dengan analogi bisnis: *"Jelaskan logic diskon ini dalam bahasa manusia, abaikan if-else teknisnya."*

> **Vibe Check:** Code Archeology bukan lagi tentang membaca kode. Ini tentang **menginterogasi** kode. Biarkan AI yang membaca 10.000 baris, kamu yang menyimpulkan artinya.
