---
title: Bug Hunting & Fixing
description: Teknik debugging sistematis dengan Error Analysis Prompting. Jangan sekadar copy-paste error!
---

Debugging adalah momen di mana kesabaran developer diuji. Saat terminal merah membara dengan pesan error yang panjangnya 2 halaman, reaksi insting kita adalah langsung copy-paste semuanya ke chat AI dan berteriak *"FIX THIS!"*.

Ini disebut **Panic Pasting**. Dan ini cara yang buruk.

## The Problem: "Panic Pasting"

Jika kamu hanya melempar log error tanpa konteks, AI akan menebak-nebak. Ia mungkin memberimu solusi generik ("Coba restart server", "Coba install ulang node_modules") yang tidak relevan.

Lebih parah lagi, jika AI langsung memberimu kode "perbaikan", kamu mungkin langsung copas tanpa paham apa yang salah. Besok error yang sama muncul lagi, dan kamu bingung lagi.

## The Vibe Solution: Root Cause First

Di **Vibe Coding**, kita memperlakukan AI sebagai **Detektif Forensik**, bukan sekadar montir. Kita ingin tahu *siapa pelakunya* dan *apa motifnya* sebelum memenjarakannya.

### 📝 Langkah 1: Siapkan Barang Bukti

Jangan hanya copy pesan errornya ("Error: Cannot read properties of undefined"). Copy juga **Stack Trace**-nya (daftar file dan nomor baris yang error).

Jika error terjadi di UI, inspect element dan copy error dari Console Browser. Jika di backend, copy dari terminal.

### 🔍 Langkah 2: The "Error Analyst" Prompt

Gunakan prompt ini untuk memaksa AI menjelaskan masalahnya dulu.

:::tip[Copy Prompt Ini]
**Context:** Saya mendapatkan error saat menjalankan fungsi `submitTransaction` di file @TransactionPage.tsx.

**Error Log:**
```text
[PASTE FULL STACK TRACE DI SINI]
```

**Task:** Lakukan analisis mendalam (Root Cause Analysis).
1.  **Trace:** Di baris berapa tepatnya error ini meledak?
2.  **The "Why":** Jelaskan penyebab logisnya. Apakah ini masalah *Timing* (race condition), *Data Type* (string vs number), atau *Null Pointer* (undefined)?
3.  **Solution:** Berikan solusi kode yang defensif (mencegah error ini terjadi lagi di masa depan), bukan sekadar *hotfix*.
:::

## Contoh Analisis yang Baik

Jika promptmu benar, AI akan menjawab seperti ini:

> **Root Cause:** Error terjadi di baris 45: `user.wallet.balance`.
> Penyebabnya adalah variabel `user` masih `null` saat komponen pertama kali dirender. React mencoba membaca properti `wallet` dari null. Ini adalah masalah **Asynchronous Data Fetching**.
>
> **Solusi:** Kita perlu menambahkan *Optional Chaining* (`user?.wallet?.balance`) atau menampilkan *Loading State* jika data belum siap.

## Strategi Debugging Lainnya

### 1. "Rubber Ducking" dengan AI

Kadang kode tidak error, tapi hasilnya salah (Logic Bug). Ceritakan logikamu ke AI.

*   *"Saya ingin loop ini berjalan 5 kali, tapi kenapa cuma jalan 4 kali? Ini kodenya..."*
*   AI seringkali bisa melihat kesalahan "Off-by-one error" (< vs <=) yang terlewat oleh mata manusia.

### 2. Sanitize Log (Penting!)

Sebelum paste log ke AI, **HAPUS DATA SENSITIF**.
*   API Keys
*   Password / Token
*   Nama/Email asli user (jika data real)

> **Vibe Check:** Bug adalah guru terbaik. Jangan buru-buru menutup tiket bug. Pahami *kenapa* itu rusak, agar kamu tidak mengulangi kesalahan yang sama di fitur berikutnya.
