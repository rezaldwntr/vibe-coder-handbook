---
title: Tech Stack & Database Modeling
description: Merancang arsitektur data scalable dengan teknik Tree of Thoughts.
---

Setelah **PRD (Product Requirement Document)** matang, langkah selanjutnya bukan langsung coding UI, melainkan **menentukan fondasi data**.

Di ekosistem Firebase/Project IDX, Firestore (NoSQL) adalah primadona. Namun, mendesain NoSQL sangat berbeda dengan SQL. Jika kamu salah desain di awal (misal: terlalu banyak nesting atau terlalu ternormalisasi), aplikasi akan lambat dan biaya membengkak saat user bertambah.

## The Problem: SQL Mindset di NoSQL

Developer sering meminta AI: *"Buatkan skema database untuk aplikasi ini."*
AI biasanya akan memberikan jawaban standar yang "aman" tapi tidak performant, seringkali meniru gaya SQL (banyak relasi) atau terlalu dalam nesting-nya (sub-collection yang sulit di-query group).

## The Vibe Solution: Tree of Thoughts (ToT)

Kita akan menggunakan teknik **Tree of Thoughts**. Kita tidak meminta **satu** jawaban. Kita meminta AI untuk:
1.  Berpikir ke **3 arah berbeda** (Skenario).
2.  Mengevaluasi **Pros & Cons** masing-masing.
3.  Memilih **pemenang** berdasarkan skalabilitas dan biaya (Read/Write ops).

### 🎯 The "Data Architect" Prompt

Pastikan kamu sudah memiliki file `PRD.md` di workspace-mu agar AI bisa membaca konteksnya.

:::tip[Copy Prompt Ini]
**Context:** Kita sedang membangun aplikasi berdasarkan spec di @PRD.md. Kita akan menggunakan **Cloud Firestore (NoSQL)**.

**Task:** Rancang struktur database (Schema Design). Gunakan metode **"Tree of Thoughts"** untuk mengevaluasi solusi terbaik.

**Steps:**
1.  **Brainstorming:** Buat 3 opsi struktur data JSON yang berbeda:
    *   **Opsi A (Nested/Hierarchical):** Memanfaatkan sub-collections secara agresif.
    *   **Opsi B (Flat/Root Collections):** Semua data di root, dihubungkan dengan ID (mirip SQL style).
    *   **Opsi C (Hybrid/Denormalized):** Kombinasi keduanya, duplikasi data seperlunya untuk optimasi *Read Performance* (sedikit write lebih mahal tidak masalah).
2.  **Evaluation:** Kritik setiap opsi berdasarkan:
    *   *Scalability:* Apa yang terjadi jika data mencapai 1 juta record?
    *   *Cost:* Mana yang paling hemat biaya Read?
    *   *Querying:* Mana yang paling mudah di-filter di frontend?
3.  **Recommendation:** Pilih satu pemenang dan berikan struktur JSON finalnya.

**Output Format:** Berikan analisis singkat, lalu struktur JSON final untuk opsi terbaik.
:::

## Menganalisis Output AI

AI akan memberikan output seperti ini (contoh kasus: Aplikasi Bank Sampah dari modul sebelumnya):

### Contoh Analisis AI (Simulasi)
*   **Opsi A (Nested):** `Users/{uid}/Transactions/{id}`.
    *   *Pros:* Data terisolasi rapi.
    *   *Cons:* Sulit membuat fitur "Leaderboard Transaksi Terbanyak se-Kecamatan" karena harus query ke semua sub-collection user.
*   **Opsi B (Flat):** `Users/{uid}` dan `Transactions/{id}` (ada field `userId`).
    *   *Pros:* Query fleksibel.
    *   *Cons:* Butuh 2x Read untuk mengambil profil user saat menampilkan list transaksi.
*   **Opsi C (Hybrid - Pemenang):** `Transactions` di root, tapi di dalam dokumen transaksi disimpan ringkasan data user (`userName`, `userAvatar`).
    *   *Pros:* 1x Read sudah dapat semua info untuk UI list. Sangat cepat.

### Contoh Struktur JSON Final

Ini adalah contoh struktur yang mungkin diberikan AI (Opsi C). Perhatikan adanya **Denormalisasi** (data user dicopy ke transaksi).

```json
{
  "users": {
    "user_123": {
      "name": "Budi Santoso",
      "role": "nasabah",
      "walletBalance": 50000,
      "createdAt": "Timestamp"
    }
  },
  "trashCategories": {
    "cat_A": {
      "name": "Plastik PET",
      "pricePerKg": 3000
    }
  },
  "transactions": {
    "trx_999": {
      "userId": "user_123",
      "userName": "Budi Santoso", // Denormalized data
      "categoryName": "Plastik PET", // Denormalized data
      "weightKg": 2.5,
      "totalAmount": 7500,
      "status": "completed",
      "timestamp": "Timestamp"
    }
  }
}
```

## Implementation: Kunci Skema

Jangan biarkan skema ini hilang di chat history.

1.  Buat file baru: `docs/db-schema.md` (atau `db-schema.json`).
2.  Copy output JSON final dari AI ke sana.
3.  **Commit file ini.**

Di langkah coding selanjutnya (Modul 3), kamu akan merujuk file ini agar AI membuat kode yang properti-nya **persis** sama dengan desain database.

> **Rule of Thumb:** "Coding frontend itu mudah jika struktur datanya sudah benar. Coding frontend itu neraka jika struktur datanya berubah-ubah."
