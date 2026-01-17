---
title: 5.3 Documentation Agents & Starlight
description: Menggunakan Astro Starlight dan Agen Dokumentasi untuk README yang hidup.
---

Dokumentasi statis yang mati adalah musuh.
Di **Vibe Coding**, dokumentasi adalah makhluk hidup yang berevolusi bersama kode.

Kita menggunakan **Astro Starlight** sebagai platform, dan **Documentation Agents** sebagai penulisnya.

## Why Starlight?
Handbook ini sendiri dibuat dengan Astro Starlight. Kenapa?
1.  **Fast:** Dibangun di atas Astro, performanya luar biasa.
2.  **Content Collections:** Type-safe markdown. Kalau frontmatter salah, build error.
3.  **Component-Rich:** Bisa memasukkan komponen React/Vue interaktif di dalam dokumentasi.

## The Workflow: "Docs-as-Code"

Jangan pisahkan dokumentasi di Google Docs atau Notion. Dokumentasi harus hidup di repo yang sama dengan kode (`/src/content/docs`).

### 🤖 Langkah 1: The Documentation Agent

Kita tidak menulis dokumentasi manual setiap kali update fitur. Kita menugaskan **Agen**.

Di Firebase Studio, saat kamu selesai mengerjakan fitur besar (misal: "Fitur Checkout"), jangan langsung merge PR.

:::tip[Prompt Doc Agent]
**Context:** Saya baru saja menyelesaikan fitur Checkout di folder `src/features/checkout`.
**Task:** Update dokumentasi.

**Actions:**
1.  Baca semua file di folder tersebut.
2.  Update file `docs/features/checkout.md` (atau buat jika belum ada).
3.  Jelaskan alur data (Flow) dan cara penggunaan komponennya.
4.  Jika ada perubahan API, update `docs/api-reference.md`.
5.  Buat **Pull Request** terpisah untuk update dokumentasi ini.
:::

Agen akan:
*   Menganalisis kode barumu.
*   Menulis Markdown yang rapi sesuai format Starlight.
*   Menyiapkan PR untuk kamu review.

### 📝 Langkah 2: Auto-Generated Reference

Untuk referensi API atau SDK, gunakan tools seperti **TypeDoc** yang dikombinasikan dengan Starlight.
Minta Agent untuk konfigurasi pipeline-nya.

:::tip[Prompt Config]
"Bantu saya setup pipeline agar setiap kali `npm run build` dijalankan, komentar JSDoc di seluruh file `.ts` diekstrak menjadi file Markdown di folder `src/content/docs/reference`."
:::

## The "Explain" Component

Di Starlight, kita bisa membuat komponen interaktif.
Bayangkan dokumentasi di mana user bisa "Mencoba" API langsung di halaman tersebut.

Minta Agent membuatkan komponen ini.

:::tip[Prompt Interactive Docs]
"Buatkan komponen Astro `<ApiPlayground />`. Komponen ini harus menerima `endpoint` dan `method` sebagai props, lalu merender tombol 'Try It' yang melakukan fetch request sungguhan dan menampilkan respons JSON-nya."
:::

> **Vibe Check:** Dokumentasi yang baik adalah tanda developer yang peduli. Dengan bantuan Agen, tidak ada lagi alasan "tidak sempat nulis dokumentasi".
