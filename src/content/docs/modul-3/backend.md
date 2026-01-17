---
title: 3.2 Backend Logic (Genkit Flows)
description: Membangun logika bisnis cerdas dengan Firebase Genkit dan Zod Validation.
---

Menulis "Cloud Functions" mentah dengan validasi `if-else` manual adalah cara lama.
Standar industri 2026 untuk backend logic—terutama yang melibatkan AI—adalah **Firebase Genkit Flows**.

## Kenapa Genkit?

Genkit bukan sekadar library AI. Ini adalah framework untuk membangun backend yang:
1.  **Observable:** Otomatis punya tracing (bisa dilihat di Genkit Developer UI).
2.  **Type-Safe:** Input dan Output divalidasi ketat oleh schema `Zod`.
3.  **AI-Native:** Memanggil model Gemini semudah memanggil fungsi biasa.

## The Problem: "Spaghetti Logic" di Backend

Kode backend lama sering tercampur aduk: validasi input, logika bisnis, pemanggilan database, dan formatting response semua jadi satu fungsi raksasa. Susah di-test, susah di-debug.

## The Vibe Solution: Genkit Flow Definition

Kita meminta Agent untuk membuatkan **Genkit Flow**. Struktur ini memaksa kode kita modular dan aman.

### 🎯 The "Flow Architect" Prompt

:::tip[Copy Prompt Ini]
**Context:** Kita menggunakan Firebase Genkit (TypeScript).
**Task:** Buatkan Flow bernama `suggestMenuPlan`.

**Schema (Zod):**
*   **Input:** `{ userPreferences: string, caloriesLimit: number }`
*   **Output:** `{ breakfast: string, lunch: string, dinner: string, totalCalories: number }`

**Logic Requirements:**
1.  Gunakan `gemini-pro` untuk generate menu berdasarkan preferensi user.
2.  Pastikan total kalori mendekati limit (toleransi 10%).
3.  Format output JSON harus strik (gunakan `structuredOutput`).

**Code Structure:**
Gunakan `ai.defineFlow` dan sertakan schema Zod untuk input/output.
:::

### Contoh Output (Genkit Flow)

Agent akan menghasilkan kode yang bersih dan terstruktur:

```typescript
import { genkit, z } from 'genkit';
import { googleAI, geminiPro } from '@genkit-ai/googleai';

export const suggestMenuPlan = ai.defineFlow({
  name: 'suggestMenuPlan',
  inputSchema: z.object({
    userPreferences: z.string(),
    caloriesLimit: z.number().min(500),
  }),
  outputSchema: z.object({
    breakfast: z.string(),
    lunch: z.string(),
    dinner: z.string(),
    totalCalories: z.number(),
  }),
}, async (input) => {
  // Logic AI atau Database di sini
  const prompt = `Buatkan menu untuk ${input.userPreferences} max ${input.caloriesLimit} kalori...`;
  
  const response = await ai.generate({
    model: geminiPro,
    prompt: prompt,
    output: { format: 'json' } // Structured Output
  });

  return response.output();
});
```

## Testing di Genkit Developer UI

Keajaiban Genkit ada di tool testing-nya.
1.  Jalankan `npx genkit start`.
2.  Buka browser (biasanya `localhost:4000`).
3.  Kamu bisa menjalankan Flow `suggestMenuPlan` dengan input form visual.
4.  Lihat **Trace**: Berapa lama AI berpikir? Apa prompt persis yang dikirim? Berapa token yang dipakai?

> **Rule of Thumb:** Jangan tulis logika backend tanpa Schema. Dengan Genkit + Zod, kamu mencegah data sampah masuk ke sistemmu sejak pintu gerbang.
