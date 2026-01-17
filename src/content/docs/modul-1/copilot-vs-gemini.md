---
title: 1.3 Evolusi Interaksi: 3 Mode Agen
description: Memahami spektrum interaksi Ask, Agent, dan Auto-run Mode.
---

Dikotomi lama antara "Copilot" (Autocomplete) dan "Gemini" (Chat) sudah usang. Di Firebase Studio 2026, kita berinteraksi dengan AI melalui spektrum otonomi. Gemini kini hadir dalam **Tiga Mode Interaksi** yang berbeda.

Sebagai Vibe Coder, *skill* utamamu adalah tahu kapan harus berpindah gigi (shifting gears) antar mode ini.

## 1. Ask Mode (The Consultant)
Mode percakapan murni. Aman, pasif, dan tidak menyentuh kodemu.

*   **Fungsi:** Brainstorming, penjelasan konsep, pencarian dokumentasi.
*   **Perilaku:** AI hanya merespons di panel chat. Tidak ada file yang berubah.
*   **Kapan dipakai:**
    *   "Jelaskan perbedaan `useEffect` dan `useLayoutEffect`."
    *   "Apa strategi terbaik untuk migrasi dari NoSQL ke SQL?"
    *   "Buatkan rencana fitur untuk sistem notifikasi."

## 2. Agent Mode (The Collaborator)
Mode standar kolaborasi. AI mengusulkan perubahan, kamu yang menyetujui.

*   **Fungsi:** Refactoring, pembuatan fitur, debugging lintas file.
*   **Perilaku:**
    *   AI membaca prompt kamu.
    *   AI menampilkan *Diff View* (perubahan kode) di editor.
    *   Kamu harus klik **"Accept"** atau **"Reject"**.
*   **Kapan dipakai:**
    *   "Refactor komponen ini agar lebih modular."
    *   "Tambahkan error handling di semua fungsi API."
    *   "Perbaiki bug CSS di file ini."

## 3. Agent (Auto-run) Mode (The Autonomous Worker)
AI diberikan otonomi untuk menggunakan alat (terminal, file system) secara mandiri dalam loop tertutup.

*   **Fungsi:** Tugas repetitif, perbaikan error berantai, setup lingkungan.
*   **Perilaku:**
    *   AI bisa menjalankan perintah terminal (misal: `npm install`, `firebase deploy`).
    *   AI bisa membuat/mengedit file tanpa persetujuan per-file (hanya laporan akhir).
    *   AI bisa melakukan *Self-Correction* (jika command error, dia coba cara lain).
*   **Batasan:** Kamu menetapkan *Security Boundaries* (misal: "Jangan delete file database").
*   **Kapan dipakai:**
    *   "Upgrade semua dependensi package.json dan pastikan tidak ada breaking changes dengan menjalankan test."
    *   "Setup environment awal dan install semua library yang dibutuhkan."
    *   "Scan seluruh proyek untuk menemukan *unused imports* dan hapus mereka."

## Tabel Strategi Pemilihan Mode

| Kondisi | Mode yang Disarankan |
| :--- | :--- |
| Bingung konsep / Butuh ide | **Ask Mode** |
| Coding fitur spesifik / Refactoring | **Agent Mode** |
| Tugas housekeeping / Setup / Bulk Fixes | **Auto-run Mode** |

:::tip[Filosofi Vibe Coding]
Jangan gunakan *Ask Mode* untuk pekerjaan yang bisa diselesaikan *Auto-run Mode*.
Jangan biarkan *Auto-run Mode* menyentuh logika bisnis inti tanpa pengawasan (*Agent Mode*).
:::
