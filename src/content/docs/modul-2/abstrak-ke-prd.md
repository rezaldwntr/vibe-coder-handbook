---
title: 2.1 Dari Abstrak ke PRD
description: Mengubah ide satu kalimat menjadi dokumen spesifikasi produk (PRD) yang solid.
---

Developer sering kali terburu-buru. Punya ide aplikasi, langsung `npm init` atau `npx create-astro`. Akibatnya? Di tengah jalan bingung fitur apa yang sebenarnya esensial, database berantakan, dan proyek mangkrak.

Dalam filosofi **Vibe Coding**, kita tidak coding sebelum punya peta. Tapi membuat peta (PRD) secara manual itu membosankan. Di sinilah kita memanfaatkan Gemini sebagai **Product Manager**.

## The Problem: The "Blank Canvas" Paralysis

Kamu punya ide: *"Aplikasi manajemen sampah untuk desa."*
Tapi detailnya?
*   Siapa usernya? Warga? Petugas? Admin?
*   Flow datanya bagaimana?
*   Fitur MVP (Minimum Viable Product) apa saja?

Tanpa PRD (Product Requirement Document), kamu akan mengalami *feature creep*—menambah fitur seenaknya tanpa arah yang jelas.

## The Vibe Solution: Role Prompting

Kita akan menggunakan teknik **Role Prompting**. Kita menginstruksikan Gemini untuk tidak berperan sebagai "Asisten AI", melainkan sebagai "Senior Product Manager" yang kritis.

Tujuannya adalah menghasilkan PRD yang berisi:
1.  **User Personas:** Siapa yang pakai.
2.  **User Stories:** Apa yang mereka lakukan.
3.  **Core Features:** Apa yang harus dibangun (Prioritas P0, P1, P2).
4.  **Tech Stack Recommendation:** Alat yang pas.

## The Prompt: The "Visionary PM"

Gunakan prompt ini di Gemini Chat Panel di awal proyek.

:::tip[Copy Prompt Ini]
**Context:** Saya ingin membangun aplikasi web bernama "[Nama Proyek, misal: EcoDesa]".
**Ide Dasar:** Aplikasi untuk manajemen bank sampah digital di tingkat RT/RW. Warga bisa setor sampah, dapat poin, dan tukar sembako.

**Role:** Bertindaklah sebagai **Senior Product Manager** yang berpengalaman di startup SaaS.

**Task:** Buatkan **Product Requirement Document (PRD)** ringkas untuk MVP (Minimum Viable Product).

**Requirements:**
1.  **User Personas:** Definisikan 2-3 role utama (misal: Nasabah, Pengepul, Admin).
2.  **User Stories:** Tulis 3 user story utama untuk setiap persona (Format: "Sebagai [role], saya ingin [fitur], agar [manfaat]").
3.  **Key Features (P0 - Critical):** List fitur yang WAJIB ada di versi pertama. Jangan masukkan fitur *nice-to-have*.
4.  **Database Entities:** Sebutkan entitas data utama yang dibutuhkan (hanya nama entitas, misal: `Users`, `Transactions`).
5.  **Tone:** Profesional, struktur jelas, gunakan bullet points.
:::

## Implementation: Dokumen Hidup

Setelah Gemini memberikan output, jangan biarkan hanya di chat.

1.  Buat file baru di root proyekmu: `PRD.md`.
2.  Salin hasil output Gemini ke file tersebut.
3.  Baca dan validasi. Hapus fitur yang menurutmu terlalu ambisius untuk tahap awal.

### Contoh Hasil (Cuplikan):

> **EcoDesa - MVP PRD**
>
> **1. User Personas**
> *   **Nasabah:** Warga yang menyetor sampah.
> *   **Admin Unit:** Pengurus bank sampah yang mencatat timbangan.
>
> **2. User Stories (P0)**
> *   *Sebagai Nasabah,* saya ingin melihat saldo poin saya saat ini, agar saya tahu kapan bisa menukar hadiah.
> *   *Sebagai Admin,* saya ingin menginput berat sampah per kategori, agar saldo nasabah otomatis bertambah.
>
> **3. Data Entities**
> *   `User` (Role, Saldo)
> *   `TrashCategory` (Jenis, Harga/kg)
> *   `Transaction` (Tanggal, Berat, Total Poin)

Sekarang, `PRD.md` ini akan menjadi **"Kitab Suci"** yang akan kamu referensikan (`@PRD.md`) di setiap prompt berikutnya saat meminta AI membuat kode. Ini menjaga AI tetap fokus pada spesifikasi yang sudah disepakati.
