---
title: 4.2 Debugging (Active Intervention)
description: Dari "Copy-Paste Log" manual menjadi "Active Agent Healing" dengan MCP.
---

Debugging cara lama:
1.  Error muncul di terminal.
2.  Block teks error.
3.  Copy.
4.  Paste ke ChatGPT.
5.  Baca jawaban, coba fix manual.

Ini lambat. Di **Vibe Coding 2026**, Agen AI melakukan intervensi aktif.

## The Shift: Passive vs Active

| Debugging Lama | Debugging Vibe (2026) |
| :--- | :--- |
| **Sumber Data** | Copy-paste teks manual. | **MCP (Model Context Protocol)** akses langsung ke Logs. |
| **Lingkup** | Lokal (apa yang di layar). | **Produksi** (Crashlytics, Cloud Logging). |
| **Tindakan** | AI memberi saran teks. | **AI melakukan patch kode** otomatis. |

## Skenario 1: Terminal Auto-Fix

Firebase Studio dan terminal modern memiliki fitur **Proactive Error Detection**.

Saat perintah `npm run build` gagal dengan warna merah membara:
1.  Jangan scroll panik mencari penyebabnya.
2.  Lihat tombol **"Fix with Gemini"** (atau icon kilau ✨) di samping pesan error terminal.
3.  **Klik.**

Agen akan:
*   Menganalisis output error.
*   Membaca file konfigurasi terkait (`package.json`, `vite.config.ts`).
*   Menawarkan perbaikan (diff).
*   Kamu tinggal klik **"Apply"**.

## Skenario 2: Production Debugging via MCP

Bagaimana jika error terjadi di HP user, bukan di laptopmu?
Gunakan integrasi **MCP Server** (seperti yang dibahas di Modul 1).

### 🎯 The "Forensic Agent" Prompt

:::tip[Copy Prompt Ini]
**Tools:** Gunakan `firebase-mcp-server`
**Task:** Investigasi lonjakan error di **Crashlytics** dalam 1 jam terakhir.

**Steps:**
1.  Ambil stack trace dari top issue.
2.  Cocokkan baris kode tersebut dengan **@repository** saat ini.
3.  Analisis kenapa crash terjadi (misal: Null Pointer di Android versi tertentu?).
4.  Buatkan **Fix** defensif di file terkait.
:::

Agen akan bekerja sendiri: menarik data log -> baca kode -> tulis patch.

## Skenario 3: The "Heal" Command

Untuk error logika yang *tricky* (tidak crash, tapi hasil salah), gunakan mode **Agent Auto-run**.

:::tip[Prompt Healing]
"Fungsi `calculateTax` di @TaxService.ts sepertinya salah hitung untuk user di area 'Bali'. Hasilnya 11% padahal harusnya 10%. Tolong buatkan **Unit Test** yang mereplikasi kasus ini (failing test), lalu perbaiki kodenya sampai test-nya pass (Green)."
:::

Ini adalah teknik **Test-Driven Debugging (TDD)** yang diotomatisasi. AI yang membuat test, AI yang memperbaiki kode, AI yang memverifikasi hasilnya.

> **Vibe Check:** Jangan menjadi kurir data (copy-paste error). Jadilah komandan yang memerintahkan agen untuk menyelidiki dan memperbaiki situasi.
