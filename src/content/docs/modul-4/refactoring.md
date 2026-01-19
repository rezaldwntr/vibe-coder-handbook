---
title: 4.3 The Refactoring Partner
description: Membersihkan kode spaghetti dan memecah "God Function" menjadi modul-modul kecil yang mudah dibaca.
---

Refactoring adalah bagian paling menakutkan dari memelihara kode legacy. "Kalau jalan, jangan disentuh!" adalah mantra yang berbahaya. Kode yang takut disentuh akan membusuk (code rot).

Di **Vibe Coding**, kita menggunakan AI sebagai "Ahli Bedah" yang memecah kode rumit menjadi potongan-potongan kecil yang aman, tanpa mengubah perilaku luarnya.

## The Problem: "The God Function"

Kamu menemukan fungsi bernama `processOrder()` yang panjangnya 600 baris. Di dalamnya ada validasi user, kalkulasi pajak, update stok gudang, kirim email, dan formatting PDF invoice.

Semua logika bertumpuk (nested) dalam 5 level `if-else`. Variabel `temp` dipakai ulang 3 kali untuk hal berbeda. Ini adalah bom waktu.

## The Vibe Solution: Surgical Refactoring

Jangan coba-coba rewrite manual dari nol (The Big Rewrite) karena risiko bug regresi sangat tinggi. Kita akan meminta AI melakukan refactoring bertahap.

### ✂️ Langkah 1: Identifikasi & Isolasi

Blok kode fungsi raksasa tersebut.

### 🧪 Langkah 2: The "Modularizer" Prompt

Tujuannya adalah memecah fungsi besar menjadi fungsi-fungsi kecil dengan nama deskriptif (Single Responsibility Principle).

:::tip[Copy Prompt Ini]
**Context:** Lihat fungsi `processOrder` di file yang saya highlight.
**Problem:** Fungsi ini terlalu panjang (Spaghetti Code) dan melanggar prinsip Single Responsibility.

**Task:** Refactor kode ini menjadi lebih modular.
1.  **Extract Method:** Pecah logika-logika terpisah menjadi *private helper functions* (misal: `validateStock`, `calculateTax`, `sendEmail`).
2.  **Keep Logic Intact:** Jangan ubah *business logic*-nya. Pastikan input dan output akhirnya tetap sama.
3.  **Clean Code:** Gunakan nama variabel yang lebih jelas. Ganti `x` dengan `totalPrice`.
4.  **Type Safety:** Tambahkan tipe data TypeScript yang eksplisit untuk setiap fungsi baru.

**Output:** Tampilkan kode lengkap hasil refactoring.
:::

## Langkah 3: The "Before vs After" Review

Seringkali kita ragu, "Apakah AI mengubah logikanya?". Minta AI membuktikan pekerjaannya.

:::tip[Prompt Audit]
**Context:** Bandingkan kode asli (Before) dengan kode hasil refactoringmu (After).

**Task:** Buatkan tabel **"Refactoring Report"**.
1.  Jelaskan perubahan struktur apa yang dilakukan.
2.  Apakah ada *edge case* di kode lama yang mungkin hilang di kode baru?
3.  Buktikan bahwa urutan eksekusinya masih sama.
:::

### Contoh Analisis AI

| Fitur | Kode Lama | Kode Baru (Refactored) |
| :--- | :--- | :--- |
| **Validasi** | Nested `if` di baris 10-50 | Function `validateOrderRequest()` |
| **Pajak** | Hardcoded `0.11` di tengah rumus | Constant `TAX_RATE` & function `getTax()` |
| **Flow** | Sulit dibaca (Linear panjang) | Mudah dibaca (Main function hanya memanggil sub-function) |

## Tips: Refactoring with Tests

Jika project lama punya Unit Test, jalankan testnya setelah AI me-refactor.

Jika **TIDAK** punya test (yang sering terjadi), minta AI buatkan test *sebelum* refactor.

:::tip[Safety Net Prompt]
"Sebelum kita refactor fungsi `calculateSalary` ini, tolong buatkan **Unit Test** (Jest/Vitest) yang mencakup semua skenario (Happy path & Error path) berdasarkan logika kode saat ini. Kita akan pakai test ini untuk memastikan refactoring nanti tidak merusak fitur."
:::

> **Vibe Check:** Refactoring bukan sekadar mempercantik kode. Ini tentang menurunkan **Cognitive Load**. Jika kamu bisa membaca fungsi utama dan paham alurnya dalam 5 detik tanpa scroll ke bawah, berarti refactoring berhasil.
