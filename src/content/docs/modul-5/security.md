---
title: Firestore Security Rules
description: Mengamankan database dengan teknik Adversarial Prompting.
---

Banyak developer pemula membiarkan Firestore Security Rules mereka dalam mode "Test Mode" (`allow read, write: if true;`) sampai aplikasi rilis. Ini sama saja dengan meninggalkan pintu rumah terbuka lebar. Siapapun yang punya Project ID kamu bisa menghapus seluruh database dalam hitungan detik.

Di **Vibe Coding**, keamanan bukan fitur tambahan. Itu adalah fondasi.

## The Problem: "It Works, Don't Touch It"

Menulis security rules itu membosankan. Sintaksnya unik (CEL - Common Expression Language) dan sulit di-debug.
*"Kalau saya kunci rules-nya, nanti frontend error semua. Mending dibuka dulu deh biar development lancar."*

Mentalitas ini berbahaya. Saat aplikasi sudah besar, menulis rules dari nol sangat sulit karena struktur datanya mungkin sudah tidak konsisten.

## The Vibe Solution: The "Hacker" Persona

Kita akan menggunakan AI untuk dua hal:
1.  **The Architect:** Menulis rules yang ketat.
2.  **The Hacker:** Mencoba menjebol rules tersebut.

### 🛡️ Langkah 1: The "Architect" Prompt

Berikan skema database (dari Bab 2.2) ke AI dan minta rules dasar.

:::tip[Copy Prompt Ini]
**Context:** Lihat file `docs/db-schema.md`.
**Task:** Buatkan `firestore.rules` untuk aplikasi ini.

**Policies:**
1.  **Users:** User hanya bisa baca/tulis profil mereka sendiri (`request.auth.uid == userId`).
2.  **Transactions:** User bisa `create` transaksi, tapi tidak bisa `update` atau `delete` setelah dibuat (Append Only).
3.  **Public Data:** Collection `products` bisa dibaca siapa saja, tapi hanya admin yang bisa tulis.
4.  **Validation:** Pastikan data yang masuk sesuai tipe datanya (misal: `amount` harus number > 0).

**Output:** Kode lengkap `firestore.rules`.
:::

### 😈 Langkah 2: The "Adversarial" Prompt

Setelah AI memberikan rules, jangan percaya 100%. Tantang AI untuk menemukan celah di kodenya sendiri. Ini disebut **Adversarial Prompting**.

:::tip[Prompt Hacker]
**Role:** Kamu adalah seorang **Black Hat Hacker** dan Security Researcher yang ahli dalam Firebase.
**Target:** Lihat kode `firestore.rules` di atas.

**Mission:** Temukan celah keamanan (Vulnerability Assessment).
1.  Bisakah user memanipulasi `amount` menjadi negatif untuk menambah saldo mereka?
2.  Bisakah user mengedit status transaksi dari "pending" menjadi "success" tanpa bayar?
3.  Apakah ada field sensitif (seperti `isAdmin`) yang lupa dilindungi sehingga user bisa menjadi admin sendiri?

**Output:** Jika ada celah, tunjukkan cara exploit-nya (simulasi kode JS), lalu berikan versi rules yang sudah diperbaiki (Patched).
:::

## Contoh Simulasi Serangan

AI mungkin akan menyadari:
*"Wait, di rules awal, kita mengizinkan `update` pada user profile. Tapi kita tidak membatasi field apa yang boleh diedit. User jahat bisa mengirim request update field `role: 'admin'`."*

**Exploit Code (ditemukan AI):**
```javascript
await updateDoc(doc(db, "users", "my_uid"), {
  role: "admin" // Escalation of Privilege!
});
```

**Patched Rules:**
```javascript
allow update: if request.auth.uid == userId 
              && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['role', 'walletBalance']);
```

## Testing Rules di IDX

Project IDX / Firebase Emulator memiliki fitur **"Requests Monitor"**.
1.  Jalankan emulator.
2.  Coba lakukan aksi di aplikasi (atau via script test).
3.  Lihat di dashboard Emulator: apakah request tersebut `Allowed` (Hijau) atau `Denied` (Merah).
4.  Klik request yang `Denied` untuk melihat baris mana di rules yang memblokirnya.

> **Vibe Check:** Keamanan terbaik berlapis. Jangan hanya andalkan validasi di Frontend (karena mudah di-bypass). Security Rules adalah benteng pertahanan terakhirmu sebelum data korup.
