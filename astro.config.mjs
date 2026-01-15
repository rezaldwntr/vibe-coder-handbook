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
						{ label: 'Filosofi Vibe Coding', link: '/pendahuluan/philosophy' },
                        { label: 'The Google Stack', link: '/pendahuluan/stack' },
					],
				},
				{
					label: 'Modul 1: Setup & Fundamentals',
					items: [
						{ label: '1.1 Setup Project IDX', link: '/modul-1/setup-idx' },
                        // FIX: Sebelumnya 'context', file aslinya 'art-of-context'
						{ label: '1.2 The Art of Context', link: '/modul-1/art-of-context' },
						{ label: '1.3 Copilot vs Gemini', link: '/modul-1/copilot-vs-gemini' },
					],
				},
                {
					label: 'Modul 2: Ideation to Blueprint',
					items: [
                        // FIX: Sebelumnya 'prd', file aslinya 'abstrak-ke-prd'
						{ label: '2.1 Abstrak ke PRD', link: '/modul-2/abstrak-ke-prd' },
                        // FIX: Sebelumnya 'database', file aslinya 'db-modeling'
						{ label: '2.2 Database Modeling', link: '/modul-2/db-modeling' },
                        { label: '2.3 System Architecture', link: '/modul-2/architecture' },
					],
				},
                {
					label: 'Modul 3: Zero to One Build',
					items: [
						{ label: '3.1 Scaffolding', link: '/modul-3/scaffolding' },
						{ label: '3.2 Frontend Vibe', link: '/modul-3/frontend' },
                        { label: '3.3 Backend Logic', link: '/modul-3/backend' },
                        { label: '3.4 Data Integration', link: '/modul-3/integration' },
					],
				},
                {
					label: 'Modul 4: Legacy & Refactoring',
					items: [
						{ label: '4.1 Code Archeology', link: '/modul-4/archeology' },
						{ label: '4.2 Bug Hunting', link: '/modul-4/debugging' },
                        { label: '4.3 Refactoring Partner', link: '/modul-4/refactoring' },
					],
				},
                {
					label: 'Modul 5: Deploy & Maintenance',
					items: [
						{ label: '5.1 Security Rules', link: '/modul-5/security' },
						{ label: '5.2 CI/CD Deployment', link: '/modul-5/cicd' },
                        { label: '5.3 Maintenance', link: '/modul-5/maintenance' },
					],
				},
			],
		}),
	],
});