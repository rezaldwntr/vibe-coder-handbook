---
title: Backend Logic
description: Menulis Cloud Functions yang robust dengan Specification-Driven Prompting.
---

Frontend cantik tidak ada gunanya jika backend-nya rapuh. Di arsitektur Serverless (seperti Firebase), logika bisnis yang kompleks—seperti kalkulasi poin, pembayaran, atau validasi data sensitif—harus berjalan di **Cloud Functions**, bukan di browser user (client-side).

Namun, menulis Cloud Functions seringkali *tricky* karena sulit di-debug secara lokal tanpa setup emulator yang benar.

## The Problem: "Spaghetti Logic"

Developer sering menulis prompt naratif yang panjang:
*"Buatkan fungsi untuk menghitung total belanja, kalau user member diskon 10%, tapi kalau item promo tidak didiskon, terus kalau total di atas 100 ribu free ongkir..."*

Narasi ini membingungkan AI. Terlalu banyak klausa "jika-maka" yang ambigu. Hasilnya? Kode yang penuh bug logic.

## The Vibe Solution: Specification-Driven Prompting

Komputer (dan LLM) berbicara dalam bahasa data. Cara paling presisi untuk menjelaskan logika adalah dengan memberikan **Contoh Input (Request)** dan **Contoh Output (Response)**.

Jangan ceritakan logikanya. **Tunjukkan** datanya.

### 🎯 The "Unit Test" Prompt

Anggap kamu sedang menulis *test case* sebelum kodenya ada.

:::tip[Copy Prompt Ini]
**Context:** Kita menggunakan Firebase Cloud Functions (Gen 2) dengan TypeScript.
**Task:** Buatkan fungsi HTTPS callable bernama `calculateOrderTotal`.

**Logic Specs:**
Fungsi ini menerima daftar item belanja dan profil user, lalu mengembalikan total harga final.

**Scenario 1 (Input):**
```json
{
  "userTier": "gold", // Dapat diskon 10% global
  "items": [
    { "name": "Baju", "price": 50000, "isPromo": false },
    { "name": "Celana", "price": 100000, "isPromo": true } // Item promo TIDAK kena diskon tier
  ]
}
```

**Expected Output:**
```json
{
  "subtotal": 150000,
  "discountAmount": 5000, // 10% dari 50.000 (Baju saja)
  "finalTotal": 145000
}
```

**Requirement:**
1.  Implementasikan logika kalkulasi sesuai contoh data di atas.
2.  Validasi input menggunakan library `zod` jika memungkinkan.
3.  Throw `https.HttpsError` jika input tidak valid.
:::

## Kenapa Ini Berhasil?

Dengan memberikan JSON Input/Output:
1.  **Ambiguity Killer:** Tidak ada lagi debat tentang "apakah item promo kena diskon?". JSON input menunjukkan `isPromo: true` dan output menunjukkan kalkulasinya. AI "memahami" aturan dari contoh tersebut.
2.  **Test Ready:** Kamu bisa langsung menyalin JSON input tersebut ke Postman atau Firebase Emulator untuk mengetes fungsi yang dihasilkan.

## Handling Database Triggers

Selain HTTPS Callable (yang dipanggil langsung dari App), Cloud Functions sering berjalan otomatis saat database berubah (Triggers).

Gunakan pola **"Before & After"** untuk prompt Trigger.

:::tip[Prompt Firestore Trigger]
**Context:** Firestore Trigger `onDocumentCreated` di path `transactions/{trxId}`.
**Task:** Update saldo wallet user setelah transaksi dibuat.

**Data Change:**
*   **New Document (Transaction):** `{ "userId": "user_123", "amount": 50000, "type": "credit" }`
*   **Target Document (User Wallet):**
    *   *Before:* `{ "balance": 10000 }`
    *   *After (Expected):* `{ "balance": 60000 }`

**Requirement:**
Gunakan `admin.firestore().runTransaction` untuk atomic update agar saldo aman dari race condition.
:::

## Implementation: Testing di IDX

Project IDX memiliki integrasi Firebase Emulator.

1.  Jalankan emulator: `npm run serve` (atau command sesuai `package.json`).
2.  Buka tab **Firebase Emulator UI** (biasanya port 4000).
3.  Masuk ke tab **Functions**.
4.  Gunakan output AI tadi. Jika AI menggunakan `zod` untuk validasi, pastikan kamu menginstallnya: `npm install zod`.

> **Rule of Thumb:** Jika kamu tidak bisa menuliskan input dan output JSON-nya, berarti kamu belum paham logika bisnisnya. Jangan minta AI coding sampai kamu paham datanya.
