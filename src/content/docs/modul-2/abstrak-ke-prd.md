---
title: 2.1 Dari Abstrak ke PRD (Deep Think)
description: Mengubah ide abstrak menjadi spesifikasi teknis bulletproof menggunakan Gemini 3 Deep Think.
---

Developer sering kali terburu-buru. Punya ide aplikasi, langsung `npm init` dan coding. Akibatnya? *Feature creep*, logika bolong, dan proyek mangkrak.

Di era **Agentic AI**, kita tidak coding sebelum punya "Kitab Suci" (PRD). Dulu kita butuh prompt panjang untuk memaksa AI berperan sebagai Product Manager. Sekarang, kita gunakan **Gemini 3 Deep Think**.

## The Power of "System 2" Thinking

Gemini 3 Deep Think memiliki kemampuan *Test-Time Compute*. Artinya, model ini "berpikir" (menjalankan ribuan simulasi internal) sebelum menjawab.

*   **Model Biasa (System 1):** Menjawab instan berdasarkan pola statistik. Bagus untuk draft kasar.
*   **Deep Think (System 2):** Melakukan *self-correction*, mencari *edge cases*, dan merencanakan *long-horizon dependencies*.

## The Prompt: Deep Specification

Aktifkan mode **Deep Think** (atau set `thinking_level="high"` di AI Studio), lalu gunakan prompt ini. Kita tidak perlu lagi mendikte format terlalu kaku, karena Deep Think akan mencari struktur optimalnya sendiri.

:::tip[Copy Prompt Ini]
**Mode:** Deep Think (Activated)
**Goal:** Saya ingin membangun aplikasi Enterprise-grade bernama "[Nama Proyek]".
**Core Concept:** Aplikasi [Jelaskan ide dasar, misal: Manajemen Logistik Gudang dengan prediksi stok AI].

**Task:** Analisis dan buatkan **Product Requirement Document (PRD)** yang komprehensif.

**Requirements:**
1.  **Critical Analysis:** Identifikasi 3 risiko terbesar (teknis/bisnis) dari ide ini sebelum mulai merancang.
2.  **User Personas & Journeys:** Siapa usernya dan bagaimana alur kerja detailnya?
3.  **Feature Specs (P0/MVP only):** Fitur apa yang *absolut* harus ada. Buang yang tidak perlu.
4.  **Edge Cases:** Sebutkan skenario "unhappy path" yang sering terlewat (misal: koneksi putus saat scan barcode).
:::

## Mengapa Deep Think Berbeda?

Jika kamu menggunakan prompt di atas pada model standar, ia mungkin hanya memberikan list fitur generik.
**Gemini 3 Deep Think** akan memberikan output seperti:

> *"Warning: Ide penggunaan kamera web untuk scan barcode di gudang gelap memiliki risiko kegagalan tinggi. Saran: Tambahkan fitur input manual atau integrasi hardware scanner via USB."*

Ini adalah level "Partner Berpikir" yang menyelamatkanmu dari minggu-minggu pengembangan fitur yang sia-sia.

## Implementation: Dokumen Hidup

1.  Simpan output Deep Think ke file `PRD.md`.
2.  Ini adalah **Source of Truth**.
3.  Setiap kali kamu meminta Agent untuk menulis kode, Agent akan membaca file ini untuk memastikan kodenya sesuai spesifikasi, bukan halusinasi.
