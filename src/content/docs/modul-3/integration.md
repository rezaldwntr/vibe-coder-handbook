---
title: Data Integration
description: Menghubungkan UI dengan Database menggunakan Few-Shot Prompting untuk konsistensi kode.
---

Sekarang kita punya UI yang cantik (Frontend) dan logika bisnis yang kuat (Backend). Saatnya menjahit keduanya.

Tantangan utama saat meminta AI menulis kode data fetching (misal: mengambil data dari Firestore) adalah **inkonsistensi gaya**.

## The Problem: "Code Salad"

Jika kamu meminta *"Buatkan fungsi untuk ambil data user"*, hari ini AI mungkin memberimu kode pakai `fetch()`, besok pakai `axios`, lusa pakai `onSnapshot` realtime, dan kadang lupa `unsubscribe` listener-nya.

Hasilnya? Projectmu jadi "Code Salad"—campur aduk berbagai gaya coding yang sulit di-maintain.

## The Vibe Solution: Few-Shot Prompting

LLM (Large Language Model) adalah peniru yang ulung. Jika kamu memberikan **satu contoh** (shot) kode yang *sempurna* menurut standarmu, ia akan menirunya dengan sangat presisi untuk kasus lain.

Ini disebut **Few-Shot Prompting**.

### 📸 Langkah 1: Tentukan "Golden Pattern"

Tentukan satu gaya coding yang kamu sukai. Misal, untuk Firestore di React, kita sepakat menggunakan pola **Custom Hook** dengan `onSnapshot` (realtime) dan state management sederhana.

**Contoh Pattern (simpan di `docs/patterns/firestore-hook.ts` jika perlu):**

```typescript
// Pattern: Realtime Document Fetch
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useUserData(userId: string) {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;
    const unsub = onSnapshot(doc(db, 'users', userId), 
      (doc) => {
        setData(doc.data() as User);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    return () => unsub(); // Cleanup is mandatory!
  }, [userId]);

  return { data, loading, error };
}
```

### 🎯 Langkah 2: The "Copycat" Prompt

Gunakan prompt ini untuk membuat hook data fetching fitur lain (misal: Transaksi).

:::tip[Copy Prompt Ini]
**Context:** Kita sedang mengintegrasikan data Firestore ke React.
**Style Guide:** Lihat kode berikut sebagai **Golden Pattern** kita:

```typescript
[PASTE KODE CONTOH DI ATAS DI SINI]
```

**Task:** Buatkan Custom Hook baru bernama `useActiveTransactions`.
**Logic:**
1.  Hook ini menerima `userId`.
2.  Query ke collection `transactions`.
3.  Filter di mana `status` == "pending".
4.  Order by `createdAt` desc.
5.  **WAJIB** ikuti struktur pattern di atas (gunakan `onSnapshot`, handle loading/error states, dan return function cleanup).

**Type Definition:** Asumsikan interface `Transaction` sudah ada.
:::

## Hasilnya? Konsistensi.

AI tidak akan "berkreasi" aneh-aneh. Ia akan melihat contohmu dan berpikir: *"Oke, user suka pakai `onSnapshot` di dalam `useEffect`, pakai state `loading` terpisah, dan return object. Aku akan buatkan persis seperti itu tapi query-nya diganti."*

## Mengapa Tidak Library Fetching (TanStack Query)?

Untuk pemula atau project skala kecil-menengah, `useEffect` + `onSnapshot` native Firebase seringkali cukup dan lebih mudah di-debug.

Namun, jika kamu menggunakan **TanStack Query (React Query)**, teknik Few-Shot ini justru **lebih penting**. Kode React Query punya banyak boilerplate. Berikan satu contoh konfigurasi query yang benar, dan AI akan men-generate query lain dengan setting cache/stale-time yang seragam.

> **Vibe Check:** Konsistensi kode > Kecanggihan kode. Lebih baik punya 10 file fetching yang "biasa saja" tapi polanya sama, daripada 10 file canggih tapi gayanya beda-beda.
