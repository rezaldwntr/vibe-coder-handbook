---
title: 1.1 Setting Up Firebase Studio
description: Inisialisasi Environment tanpa kode menggunakan App Prototyping Agent.
---

Di era **Vibe Coding 2026**, kita tidak lagi berkutat dengan file konfigurasi manual di awal proyek. Teknik "Instructional Prompting" untuk menghasilkan file `dev.nix` sudah usang.

Sekarang, kita menggunakan **App Prototyping Agent** di Firebase Studio. Ini adalah alur kerja *No-Code Initialization* yang memungkinkanmu membangun fondasi aplikasi enterprise hanya dengan bahasa alami atau sketsa.

## Revolusi: Dari Manual ke Agentic Setup

| Cara Lama (2024) | Cara Baru (2026) |
| :--- | :--- |
| **Metode** | Menulis prompt untuk generate `dev.nix`. | **Visual & Natural Language Description**. |
| **Interaksi** | Copy-paste kode konfigurasi. | **Chat & Upload Sketsa**. |
| **Fokus** | Instalasi paket (`pkgs.nodejs`). | **Fitur Aplikasi** ("Buat Dashboard E-commerce"). |
| **Hasil** | Environment kosong siap coding. | **Prototipe Full-Stack** yang sudah berjalan. |

## Langkah 1: The Vision Prompt (Atau Upload Sketsa)

Saat membuka Firebase Studio, jangan langsung masuk ke editor kode. Gunakan panel **App Prototyping Agent** di halaman awal.

Kamu bisa mendeskripsikan aplikasi:

:::tip[Contoh Vision Prompt]
"Saya ingin membuat aplikasi **Inventaris Gudang** berbasis Next.js dan Firebase Data Connect. Fitur utamanya adalah scan barcode (menggunakan kamera), dashboard stok real-time, dan role management untuk admin/staff. Gunakan Tailwind CSS untuk styling yang bersih."
:::

Atau, jika kamu punya coretan di kertas/papan tulis, cukup **Upload Foto Sketsa** tersebut. Agen akan menganalisis layout visual dan struktur database yang tersirat dari gambar tersebut.

## Langkah 2: Visual Customization (Annotate & Select)

Setelah Agen menghasilkan struktur awal, kamu akan melihat *Live Preview*. Jangan edit kode dulu! Gunakan tools visual:

*   **Annotate:** Klik bagian UI yang kurang pas (misal: tombol terlalu kecil), lalu ketik instruksi perbaikan: *"Ubah warna ini jadi primary brand color dan buat lebih rounded."*
*   **Select:** Pilih komponen spesifik untuk diganti variannya.

Agen akan memodifikasi kode React dan CSS di latar belakang.

## Langkah 3: Advanced Config (Hanya Jika Perlu)

File `.idx/dev.nix` masih ada, tapi sekarang dikelola otomatis oleh Agen. Kamu hanya perlu menyentuhnya untuk kasus *advance*, seperti:
*   Menambah ekstensi VS Code yang sangat spesifik (bukan standar umum).
*   Mengubah konfigurasi port forwarding yang tidak standar.

### Otomatisasi Environment
Agen secara otomatis:
1.  Mendeteksi stack (Next.js, Python/Flask, Go, dll).
2.  Mengonfigurasi `services` di `dev.nix` (seperti Postgres atau Redis).
3.  Menjalankan `npm install` dan `firebase emulators:start` via hook `onStart`.

Dengan cara ini, kamu melompati fase "Setup Hell" dan langsung masuk ke fase "Vibe Coding" dalam hitungan menit.
