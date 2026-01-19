import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'The Vibe Coder Handbook', // Ganti nama jika mau
            description: 'Panduan Prompt Engineering untuk Modern Full-Stack Development',
			components: {
                Footer: './src/components/CustomFooter.astro',
            },
			social: [
				{
					label: 'GitHub',
					href: 'https://github.com/', // Masukkan link github mu jika ada
					icon: 'github',
				},
			],
			sidebar: [
                // PERBAIKAN: Link harus sama persis dengan nama file .md (tanpa ekstensi)
				{
					label: 'Pendahuluan',
					items: [
                        // Pastikan folder 'intro' dan file ini ada. Jika tidak, hapus bagian ini.
						{ label: 'Filosofi Vibe Coding Redefinisi di Era Agentic AI', link: '/pendahuluan/philosophy' },
                        { label: 'The Google Stack', link: '/pendahuluan/stack' },
					],
				},
				{
					label: 'Modul 1: Setup & Fundamentals',
					items: [
						{ label: '1.1 Setting Up Firebase Studio', link: '/modul-1/setup-idx' },
						{ label: '1.2 The Art of Context (MCP Era)', link: '/modul-1/1-2-art-of-context' },
						{ label: '1.3 Evolusi Interaksi', link: '/modul-1/1-3-copilot-vs-gemini' },
					],
				},
                {
					label: 'Modul 2: Ideation to Blueprint',
					items: [
                        // FIX: Sebelumnya 'prd', file aslinya 'abstrak-ke-prd'
						{ label: '2.1 Dari Abstrak ke PRD (Deep Think)', link: '/modul-2/abstrak-ke-prd' },
                        // FIX: Sebelumnya 'database', file aslinya 'db-modeling'
						{ label: '2.2 Designing System Architecture', link: '/modul-2/db-modeling' },
                        { label: '2.3 Modern Data Architecture (SQL is Back)', link: '/modul-2/architecture' },
					],
				},
                {
					label: 'Modul 3: Zero to One Build',
					items: [
						{ label: '3.1 Instant Scaffolding (No-Code Init)', link: '/modul-3/scaffolding' },
						{ label: '3.2 Backend Logic (Genkit Flows)', link: '/modul-3/backend' },
                        { label: '3.3 Frontend (React 19 & Server Actions)', link: '/modul-3/frontend' },
                        { label: '3.4 Data Integration (Generated SDKs)', link: '/modul-3/integration' },
					],
				},
                {
					label: 'Modul 4: Legacy & Refactoring',
					items: [
						{ label: '4.1 Code Archeology (Infinity Context)', link: '/modul-4/archeology' },
						{ label: '4.2 Debugging (Active Intervention)', link: '/modul-4/debugging' },
                        { label: '4.3 The Refactoring Partner', link: '/modul-4/refactoring' },
					],
				},
                {
					label: 'Modul 5: Deploy & Maintenance',
					items: [
						{ label: '5.1 Full-Stack Security (AI & Data)', link: '/modul-5/security' },
						{ label: '5.2 CI/CD Firebase App Hosting', link: '/modul-5/cicd' },
                        { label: '5.3 Documentation Agents & Starlight', link: '/modul-5/maintenance' },
					],
				},
			],
		}),
	],
});