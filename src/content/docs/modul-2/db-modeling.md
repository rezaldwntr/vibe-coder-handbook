---
title: 2.3 Modern Data Architecture (SQL is Back)
description: Memilih antara Data Connect (SQL) dan Firestore (NoSQL) di era Gemini 3.
---

Salah satu kesalahan terbesar tutorial Firebase lama adalah memaksakan **Cloud Firestore (NoSQL)** untuk *semua* jenis data.
Akibatnya? Developer pusing dengan "Denormalisasi", duplikasi data, dan query yang terbatas.

Di tahun 2026, **SQL kembali menjadi raja**.
Dengan peluncuran **Firebase Data Connect** (berbasis Cloud SQL PostgreSQL), kita kini memiliki kekuatan relasional SQL dengan kemudahan development a la Firebase.

## The Great Debate: Data Connect vs Firestore

Jangan bingung. Gunakan panduan sederhana ini:

| Fitur | **Firebase Data Connect (PostgreSQL)** | **Cloud Firestore (NoSQL)** |
| :--- | :--- | :--- |
| **Data Structure** | Relasional (Tabel, Foreign Keys). | Dokumen & Koleksi (JSON-like). |
| **Use Case** | Data bisnis kompleks, Inventaris, Transaksi Keuangan, ERP. | Chat apps, Live Collaboration, CMS konten sederhana, Notifikasi. |
| **Query Power** | Sangat Kuat (Joins, Aggregations, Vector Search). | Terbatas (No Joins, Index-based). |
| **AI Readiness** | **High** (Native Vector Search untuk RAG). | Medium. |

**Rekomendasi Vibe Coding 2026:**
Gunakan **Data Connect (SQL)** sebagai *default* untuk data inti aplikasi. Gunakan Firestore hanya untuk fitur spesifik yang butuh real-time sync ekstrim atau struktur dokumen yang sangat dinamis.

## Obsolescence of "Manual Tree of Thoughts"

Dulu, kita harus memandu AI pelan-pelan: *"Coba pikirkan opsi A, B, C untuk skema database..."*.
Sekarang, **Gemini 3 Deep Think** sudah melakukan percabangan pemikiran (*multi-path reasoning*) ini secara internal. Memintanya menuliskan opsi-opsi jelek di chat hanya membuang waktu.

Kita langsung minta hasil optimal dengan **Rationale** (alasan).

### 🎯 The "Data Architect" Prompt (New Standard)

Gunakan prompt ini untuk merancang skema PostgreSQL yang *robust*.

:::tip[Copy Prompt Ini]
**Mode:** Deep Think
**Context:** Lihat @PRD.md.
**Task:** Rancang skema database **PostgreSQL** untuk aplikasi ini (via Firebase Data Connect).

**Requirements:**
1.  **Entities & Relationships:** Tentukan tabel-tabel utama dan relasi (One-to-Many, Many-to-Many).
2.  **Schema Definition:** Tuliskan dalam format GraphQL SDL (standar Data Connect) atau SQL DDL.
3.  **Vector Search:** Jika ada fitur AI (misal: pencarian produk semantik), tambahkan kolom `vector` embedding.
4.  **Rationale:** Jelaskan kenapa kamu memilih struktur relasi tersebut. Kenapa bukan JSONB?

**Output:** Skema final dan penjelasan singkat.
:::

## Contoh Output AI (Data Connect SDL)

AI akan langsung memberikan skema yang siap dipakai di Firebase Studio:

```graphql
# Skema Order Management
type Order @table {
  id: UUID! @default(expr: "uuid_generate_v4()")
  userId: UUID!
  user: User! @relation(fields: ["userId"], references: ["id"])
  status: String!
  totalAmount: Decimal!
  items: [OrderItem!]!
}

type OrderItem @table {
  id: UUID!
  orderId: UUID!
  productId: UUID!
  quantity: Int!
  # AI Cerdas: Menambahkan snapshot harga saat beli
  priceAtPurchase: Decimal! 
}
```

### Validasi Skema
Deep Think akan menambahkan catatan kritis:
> *"Catatan: Saya menambahkan field `priceAtPurchase` di tabel `OrderItem`. Ini penting agar jika harga produk induk berubah di masa depan, history transaksi lama tidak ikut berubah (masalah klasik normalisasi)."*

Ini adalah detail arsitektur tingkat senior yang otomatis ditangani oleh AI. Simpan skema ini di `dataconnect/schema.gql` dan kamu siap melangkah ke tahap backend.
