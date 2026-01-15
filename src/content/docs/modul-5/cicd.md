---
title: CI/CD & Deployment
description: Otomatisasi proses deploy ke Firebase Hosting dengan GitHub Actions yang dirancang AI.
---

Coding selesai, fitur jalan, bug sudah dibasmi. Langkah terakhir adalah mempublikasikan karyamu ke dunia.

Di masa lalu, deploy itu menakutkan: FTP upload manual, SSH ke server, restart Nginx, dan berdoa server tidak down. Di era **Vibe Coding**, deploy harusnya semudah `git push`.

## The Problem: "It Works on My Machine"

Deploy manual (lewat command `firebase deploy` di laptop) itu berisiko:
1.  **Lingkungan Beda:** Node.js di laptopmu versi 20, di server versi 18. Error.
2.  **Lupa Build:** Kamu deploy folder `dist/` yang lama karena lupa jalanin `npm run build`.
3.  **Bus Factor:** Kalau cuma satu orang yang bisa deploy, project macet kalau dia sakit.

## The Vibe Solution: CI/CD Pipelines

Kita akan menggunakan **GitHub Actions** untuk otomatisasi. Setiap kali kamu push kode ke branch `main`, robot di GitHub akan:
1.  Install dependencies.
2.  Build project (memastikan tidak ada error compile).
3.  Deploy ke Firebase Hosting.

Tapi menulis file YAML untuk GitHub Actions itu rumit (indentasi salah sedikit, pipeline gagal). Biarkan AI yang menulisnya.

### 📝 Langkah 1: Konfigurasi `firebase.json`

Sebelum deploy, pastikan Firebase tahu cara melayani aplikasimu. Terutama untuk Single Page Application (SPA) seperti React, kita butuh aturan "Rewrites".

:::tip[Prompt Configurator]
**Context:** Project ini adalah SPA menggunakan React + Vite. Output build ada di folder `dist`.
**Task:** Buatkan konfigurasi `firebase.json` yang optimal.

**Requirements:**
1.  **Hosting:** Public folder adalah `dist`.
2.  **Rewrites:** Semua request ke URL manapun harus diarahkan ke `index.html` (agar React Router bekerja).
3.  **Headers:** Tambahkan header `Cache-Control` agresif untuk file statis (gambar/CSS) agar loading cepat, tapi `no-cache` untuk `index.html`.
4.  **Emulators:** Sertakan config port default untuk Auth, Firestore, dan Functions emulator.
:::

### 🚀 Langkah 2: The "DevOps Engineer" Prompt

Sekarang minta AI membuatkan workflow GitHub Actions.

:::tip[Prompt CI/CD]
**Context:** Saya ingin setup **Continuous Deployment** ke Firebase Hosting.
**Repo:** Project tersimpan di GitHub.
**Secret:** Saya akan menyimpan service account key di GitHub Secrets dengan nama `FIREBASE_SERVICE_ACCOUNT_MY_PROJECT`.

**Task:** Buatkan file workflow GitHub Actions (`.github/workflows/deploy.yml`).

**Steps:**
1.  **Trigger:** Jalan setiap ada `push` ke branch `main`.
2.  **Environment:** Gunakan `ubuntu-latest`.
3.  **Build:** Checkout code -> Install Node.js -> `npm ci` -> `npm run build`.
4.  **Deploy:** Gunakan action `FirebaseExtended/action-hosting-deploy` untuk deploy ke channel `live`.

**Output:** Kode YAML lengkap yang valid.
:::

## Setup Secrets

AI akan mengingatkanmu, tapi ini langkah manual yang wajib:

1.  Generate Service Account di Google Cloud Console (format JSON).
2.  Buka Repo GitHub -> Settings -> Secrets and variables -> Actions.
3.  Buat secret baru: `FIREBASE_SERVICE_ACCOUNT_MY_PROJECT`.
4.  Paste isi JSON service account di sana.

## Deployment Previews (Bonus)

Salah satu fitur terbaik Firebase adalah **Preview Channels**. Kamu bisa deploy setiap Pull Request ke URL sementara (misal: `pr-123--my-app.web.app`) untuk direview sebelum di-merge.

:::tip[Prompt Preview]
"Tolong modifikasi file YAML tadi. Tambahkan job agar kalau ada **Pull Request**, dia deploy ke **Preview Channel** (bukan live). Dan post URL preview-nya sebagai komentar di PR tersebut."
:::

## Monitor & Rollback

Setelah deploy otomatis berjalan:
*   Buka tab **Actions** di GitHub untuk melihat proses build (hijau = sukses, merah = gagal).
*   Jika deploy live merusak aplikasi, buka Firebase Console -> Hosting, lalu klik **Rollback** ke versi sebelumnya. Ini instan.

> **Vibe Check:** "Deploy on Friday?" Kenapa takut? Kalau kamu punya CI/CD yang solid dan Unit Test yang otomatis berjalan sebelum deploy, hari Jumat hanyalah hari biasa.
