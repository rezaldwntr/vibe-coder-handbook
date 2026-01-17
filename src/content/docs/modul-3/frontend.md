---
title: 3.3 Frontend (React 19 & Server Actions)
description: Membangun UI modern dengan React Server Components dan Server Actions.
---

Dunia React telah berubah drastis di versi 19.
Jika kamu masih menggunakan `useEffect` untuk fetch data saat komponen dimuat, kamu sedang menggunakan pola "Legacy".

Standar Vibe Coding 2026 adalah **React Server Components (RSC)** dan **Server Actions**.

## The Shift: Client vs Server

| Pola Lama (React 18-) | Pola Baru (React 19+) |
| :--- | :--- |
| **Fetch Data** | `useEffect` + `fetch()` di Client. | `async/await` langsung di Server Component. |
| **Loading State** | `useState(true)` manual. | `<Suspense>` boundary. |
| **Form Submit** | `onSubmit` + `e.preventDefault()`. | `action={serverAction}` di `<form>`. |
| **Feedback** | `useState` untuk success/error. | `useActionState` & `useOptimistic`. |

## The Problem: "Waterfall" Fetching

Pola lama sering menyebabkan "Waterfall": Component A loading -> selesai -> Component B loading -> selesai. UI terasa lambat dan *jumpy*.

## The Vibe Solution: RSC & Actions Prompting

Saat meminta Agent membuat komponen, kita harus eksplisit meminta pola React 19.

### 🎯 The "Modern React" Prompt

Gunakan prompt ini saat membuat halaman baru.

:::tip[Copy Prompt Ini]
**Context:** Aplikasi Next.js (App Router) dengan React 19.
**Task:** Buat halaman "Detail Produk" (`page.tsx`).

**Requirements:**
1.  **Data Fetching:** Halaman ini adalah **Server Component**. Fetch data produk langsung dari database (jangan pakai `useEffect`).
2.  **Interactive Action:** Tambahkan tombol "Add to Cart". Gunakan **Server Action** (`'use server'`) untuk logika backend-nya.
3.  **UX:** Gunakan hook `useOptimistic` agar UI keranjang update *seketika* saat tombol diklik (sebelum server merespon).
4.  **Pending State:** Gunakan `useActionState` untuk handle loading button saat submit.

**Stack:** Tailwind CSS untuk styling.
:::

### Contoh Hasil (Server Action Pattern)

Agent akan memisahkan logika menjadi dua bagian yang elegan:

**1. Server Action (`actions.ts`)**
```typescript
'use server'

export async function addToCart(productId: string) {
  // Langsung akses database aman di sini
  await db.cart.create({ data: { productId } });
  revalidatePath('/cart'); // Refresh cache otomatis
}
```

**2. Client Component (`AddToCartBtn.tsx`)**
```typescript
'use client'
import { useOptimistic } from 'react';
import { addToCart } from './actions';

export function AddToCartBtn({ productId }) {
  const [optimisticCart, addOptimistic] = useOptimistic(0, (state) => state + 1);

  return (
    <form action={async () => {
        addOptimistic(1); // Update UI instan!
        await addToCart(productId);
    }}>
      <button>Add to Cart ({optimisticCart})</button>
    </form>
  );
}
```

## Kenapa Ini Penting?

Dengan pola ini:
*   **Zero Bundle Size:** Kode fetch data tidak dikirim ke browser.
*   **No API Routes:** Tidak perlu bikin endpoint `/api/add-to-cart` manual.
*   **Instant UX:** User merasa aplikasi sangat cepat berkat Optimistic UI.

> **Vibe Check:** React 19 mengurangi kode boilerplate JavaScript yang harus ditulis secara drastis. Biarkan Agent menangani kompleksitas state, kamu fokus pada interaksi.
