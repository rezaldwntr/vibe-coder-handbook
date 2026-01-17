---
title: 5.2 CI/CD: Firebase App Hosting
description: Deploy aplikasi Next.js/Angular serverless tanpa konfigurasi YAML rumit.
---

Lupakan menulis 100 baris YAML untuk GitHub Actions.
Lupakan konfigurasi CDN manual.
Lupakan setup Docker container.

Di 2026, standar deployment untuk framework modern (Next.js, Angular, React) adalah **Firebase App Hosting**.

## The Shift: Hosting vs App Hosting

| Fitur | Firebase Hosting (Lama) | Firebase App Hosting (Baru) |
| :--- | :--- | :--- |
| **Fokus** | Static Assets (HTML/CSS/JS). | **Full Stack Web Apps** (SSR/ISR). |
| **Backend** | Cloud Functions (terpisah). | **Cloud Run** (terintegrasi otomatis). |
| **Setup** | `firebase init` + GitHub Action YAML. | **Zero-Config** (Console Connect). |

## Langkah 1: Connect GitHub

1.  Push kodemu ke GitHub.
2.  Buka **Firebase Console** -> **App Hosting**.
3.  Klik **"Get Started"**.
4.  Pilih Repo GitHub kamu.
5.  Set branch utama (misal: `main`).

Itu saja.

Firebase akan otomatis mendeteksi:
*   "Oh, ini Next.js versi 15."
*   "Perlu Node.js versi 22."
*   "Build command-nya `npm run build`."

## Langkah 2: Environment Variables (Secrets)

Jangan simpan API Key di kode!
Di dashboard App Hosting, masuk ke tab **Settings** -> **Environment variables**.

Kamu bisa menyinkronkan secrets langsung dari **Google Cloud Secret Manager**.
*   `GEMINI_API_KEY`: (Secret)
*   `DATABASE_URL`: (Secret)

App Hosting akan menyuntikkan (inject) variabel ini saat *build time* dan *run time* secara aman.

## Langkah 3: Automatic Rollouts

Setiap kali kamu push ke `main`, App Hosting akan:
1.  Menarik kode baru.
2.  Membangun container image di Cloud Build.
3.  Melakukan **Traffic Splitting** (opsional) untuk rollout bertahap.
4.  Mengganti versi lama dengan zero-downtime.

### Preview Channels? Otomatis.
Setiap Pull Request (PR) di GitHub akan otomatis mendapatkan URL preview unik. Kamu bisa tes fitur baru di lingkungan yang 100% mirip produksi sebelum merge.

## Bagaimana jika Build Gagal?

Di sinilah peran **Vibe Coder**.
Jika build gagal, jangan panik baca log sendirian.

:::tip[Prompt DevOps Agent]
**Context:** Deployment App Hosting gagal.
**Log:** (Paste log error dari Firebase Console).

**Task:** Analisis penyebab kegagalan build.
1.  Apakah karena versi Node.js tidak cocok?
2.  Apakah ada Environment Variable yang kurang?
3.  Berikan solusi perbaikan di `package.json` atau `apphosting.yaml` (jika perlu config manual).
:::

> **Vibe Check:** Tugasmu adalah coding fitur, bukan mengurus server. Serahkan infrastruktur pada App Hosting.
