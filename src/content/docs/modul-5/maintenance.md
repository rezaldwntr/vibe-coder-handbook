---
title: Maintenance & Documentation
description: Teknik "Reverse Engineering" untuk membuat dokumentasi otomatis yang selalu up-to-date.
---

Dokumentasi adalah hal yang paling dibenci developer untuk ditulis, tapi paling dicintai saat harus dibaca.

Masalah utama dokumentasi manual adalah **"Drift"**: Kode berubah setiap hari, tapi dokumentasi hanya diupdate sebulan sekali (atau tidak sama sekali). Hasilnya? Dokumentasi menjadi kebohongan yang menyesatkan.

Di **Vibe Coding**, kita membalik prosesnya. Jangan tulis dokumentasi dulu baru coding. **Coding dulu, lalu biarkan AI menulis dokumentasinya.**

## The Problem: "The Ghost Town"

Kamu membuka `README.md` dan melihat instruksi instalasi yang merujuk ke library yang sudah dihapus 2 tahun lalu. Atau kamu melihat dokumentasi API yang bilang endpoint `/login` butuh parameter `username`, padahal di kode sudah diganti jadi `email`.

Dokumentasi usang lebih berbahaya daripada tidak ada dokumentasi sama sekali.

## The Vibe Solution: Reverse Engineering

Kita menggunakan AI untuk membaca *state* kode yang aktual saat ini, lalu men-generate dokumentasi yang merefleksikan kebenaran tersebut.

### 📄 Langkah 1: The "Auto-README" Prompt

Setiap repo butuh `README.md` yang bagus agar orang lain (dan dirimu di masa depan) paham cara menjalankannya.

:::tip[Prompt README Generator]
**Context:** Saya ingin membuat `README.md` untuk project ini.
**Input:** Lihat file:
1.  @package.json (untuk tahu dependencies dan script).
2.  @src/App.tsx (untuk tahu ini aplikasi apa).
3.  @firebase.json (untuk tahu deployment target).

**Task:** Buatkan konten `README.md` yang profesional.
**Sections:**
1.  **Project Title & Description:** Jelaskan singkat ini aplikasi apa.
2.  **Tech Stack:** List teknologi utama (React, Vite, Firebase, Tailwind).
3.  **Getting Started:** Step-by-step cara clone, install, dan run di local.
4.  **Project Structure:** Penjelasan singkat folder penting.
5.  **Scripts:** Penjelasan command `npm run dev`, `build`, dll.

**Tone:** Helpful & Developer-friendly.
:::

### 🔌 Langkah 2: The "API Documenter" Prompt

Jika kamu membuat Backend API (misal Cloud Functions), dokumentasi endpoint adalah harga mati. Jangan tulis di Notion manual. Minta AI generate tabel Markdown atau bahkan spesifikasi OpenAPI (Swagger).

:::tip[Prompt API Docs]
**Context:** Lihat file backend di @functions/src/index.ts (dan controller terkait).

**Task:** Buatkan dokumentasi API untuk endpoint yang ada di file tersebut.

**Format:** Tabel Markdown.
| Endpoint | Method | Params (Body/Query) | Auth Required? | Success Response |
| :--- | :--- | :--- | :--- | :--- |
| `/api/transaction` | POST | `{ amount: number }` | Yes | `200 OK` |

**Requirement:**
Analisis kode validator (zod/joi) untuk menentukan parameter yang wajib dan opsional secara akurat.
:::

## Self-Documenting Code (JSDoc)

Selain file terpisah, dokumentasi terbaik hidup *di dalam* kode itu sendiri (Comments). Tapi menulis JSDoc itu melelahkan.

:::tip[Prompt JSDoc]
**Context:** Lihat fungsi yang saya highlight.
**Task:** Tambahkan komentar **JSDoc** (atau TSDoc) di atas fungsi ini.
1.  Jelaskan apa yang fungsi ini lakukan.
2.  Jelaskan setiap parameter (`@param`) dan tipe datanya.
3.  Jelaskan nilai kembalian (`@returns`).
4.  Berikan satu contoh penggunaan (`@example`).
:::

### Hasilnya:

```typescript
/**
 * Menghitung total harga belanjaan termasuk pajak dan diskon.
 * 
 * @param {number} subtotal - Total harga barang sebelum pajak.
 * @param {string} userTier - Level user ('gold' | 'silver' | 'bronze').
 * @returns {number} Total harga final yang harus dibayar.
 * 
 * @example
 * const total = calculateFinalPrice(100000, 'gold'); // Returns 95000 (jika diskon 5%)
 */
export function calculateFinalPrice(subtotal: number, userTier: string): number {
  // ... implementation
}
```

Dengan cara ini, saat developer lain mengarahkan mouse ke fungsi tersebut di VS Code, pop-up penjelasan akan muncul otomatis.

> **Vibe Check:** Dokumentasi otomatis bukan alasan untuk malas. Review hasilnya. AI mungkin mendokumentasikan bug sebagai "fitur". Tugasmu adalah memverifikasi kebenarannya.
