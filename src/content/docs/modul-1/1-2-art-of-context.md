---
title: 1.2 The Art of Context (MCP Era)
description: Menguasai Model Context Protocol untuk menghubungkan AI dengan seluruh sistem.
---

Selamat datang di era **Model Context Protocol (MCP)**.
Jika di masa lalu kita harus melakukan "Context Injection" secara manual (copy-paste file atau pakai `@file`), di tahun 2026 ini kita menggunakan standar industri baru: **MCP**.

## Apa itu MCP?

Bayangkan MCP sebagai **"USB-C untuk Aplikasi AI"**.
Ini adalah standar terbuka yang memungkinkan Gemini di Firebase Studio untuk terhubung ke sumber data eksternal secara *real-time* dan aman, tanpa kamu harus menyalin isinya ke chat window.

| Fitur | Context Injection Lama (`@file`) | Model Context Protocol (MCP) |
| :--- | :--- | :--- |
| **Cakupan** | File lokal di editor. | **Seluruh Sistem** (Database, Logs, Git, API Eksternal). |
| **Data** | Statis (Code snapshot). | **Dinamis & Real-time** (Live DB rows, Error Logs). |
| **Keamanan** | Risiko ekspos data sensitif jika di-paste. | **Terstandarisasi & Terkontrol** via server MCP. |

## Menghubungkan Firebase MCP Server

Firebase Studio memiliki dukungan *native* untuk MCP. Kamu bisa mengonfigurasi file `.idx/mcp.json` untuk memberi Gemini "mata" ke layanan Firebase produksimu.

### Konfigurasi Dasar `.idx/mcp.json`

```json
{
  "mcpServers": {
    "firebase-prod": {
      "command": "firebase",
      "args": ["mcp:start", "--project", "my-app-prod"],
      "capabilities": ["logging", "firestore", "hosting"]
    },
    "github-repo": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "..." 
      }
    }
  }
}
```

## Skenario Penggunaan: The "Omniscient" Debugging

Dengan MCP, kamu bisa memberikan perintah yang dulunya mustahil:

### 1. Analisis Crash Produksi
:::tip[Prompt dengan MCP]
"Analisis log error terakhir dari **Crashlytics** (via Firebase MCP) yang terjadi 5 menit lalu. Temukan baris kode di **Repo GitHub** ini yang menyebabkan error tersebut, dan sarankan perbaikan."
:::

Agen akan:
1.  Mengakses server MCP Firebase untuk baca log crash.
2.  Melihat stack trace.
3.  Mengakses server MCP GitHub untuk membaca versi kode yang sedang deploy.
4.  Memberikan solusi perbaikan di editor lokalmu.

### 2. Query Data Cerdas
:::tip[Prompt dengan MCP]
"Cek database **Firestore** (via MCP), apakah ada user dengan email duplicate yang mendaftar hari ini? Jika ada, buatkan script migrasi untuk membersihkannya."
:::

## Kesimpulan

Konsep "Konteks" bukan lagi sekadar "apa yang ada di layar editor saya".
Dengan MCP, Konteks adalah **apa yang terjadi di seluruh ekosistem aplikasimu**. Tugasmu sebagai Vibe Coder adalah memastikan saluran MCP ini terpasang dengan benar.
