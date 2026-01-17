---
title: 3.4 Data Integration (Generated SDKs)
description: Menghubungkan Frontend dan Backend tanpa menulis fetch manual menggunakan Firebase Data Connect.
---

Salah satu sumber bug terbesar di aplikasi web adalah **Typo**.
Backend mengirim field `user_name`, tapi Frontend membaca `username`. `undefined` di mana-mana.

Dulu solusinya adalah menulis interface TypeScript manual dan berdoa agar sinkron.
Di 2026, solusinya adalah **Generated SDKs** dari Firebase Data Connect.

## The Problem: "Code Salad" & Type Mismatch

Menulis query manual (`fetch('/api/users')`) atau menggunakan `onSnapshot` mentah seringkali menghasilkan kode yang tidak konsisten dan tidak aman secara tipe (not type-safe).

## The Vibe Solution: Query-Driven Development

Dengan Data Connect, kita tidak menulis kode fetching. Kita menulis **Query (GraphQL)**, dan Firebase Studio otomatis membuatkan fungsi TypeScript yang siap pakai.

### Langkah 1: Tulis Query (Di file `.gql`)

Minta Agent untuk membuatkan query operasi data.

:::tip[Prompt Query]
"Buatkan query Data Connect untuk mengambil profil user beserta 5 transaksi terakhirnya."
:::

Agent akan menulis di `client/queries.gql`:
```graphql
query GetUserDashboard($uid: UUID!) {
  user(id: $uid) {
    name
    email
    transactions(limit: 5, orderBy: {createdAt: DESC}) {
      amount
      status
    }
  }
}
```

### Langkah 2: Auto-Generated SDK

Begitu file `.gql` disimpan, Firebase Data Connect (di latar belakang) men-generate SDK TypeScript.

### Langkah 3: Integrasi di Komponen (Tanpa Fetch Manual)

Sekarang, di komponen React kamu, cukup import fungsinya. Fungsinya sudah *Type-Safe*!

```typescript
import { getUserDashboard } from '@firebase/gen/my-app'; // Generated!

// Di Server Component
export default async function Dashboard({ params }) {
  const data = await getUserDashboard({ uid: params.id });
  
  // TypeScript tahu persis isi 'data'!
  // Jika kamu ketik 'data.user.addres', editor akan error (typo address).
  return <div>Hello {data.user.name}</div>;
}
```

## Keuntungan Generated SDKs

1.  **IntelliSense Sempurna:** Editor tahu persis field apa yang tersedia.
2.  **No More `any`:** Ucapkan selamat tinggal pada `const data: any`.
3.  **Refactoring Aman:** Jika kamu ubah nama field di database, kode frontend akan error *saat compile*, bukan saat dijalankan user.

## Mutasi Data (Writes)

Sama mudahnya. Definisikan mutasi di `.gql`:

```graphql
mutation CreateOrder($amount: Int!) {
  order_insert(data: {amount: $amount})
}
```

Lalu panggil di Server Action:

```typescript
import { createOrder } from '@firebase/gen/my-app';

async function buyAction(formData) {
  'use server';
  await createOrder({ amount: 50000 });
}
```

> **Vibe Check:** Jangan pernah menulis `fetch()` manual lagi untuk data inti. Biarkan mesin yang menjahit koneksi antara Frontend dan Backend.
