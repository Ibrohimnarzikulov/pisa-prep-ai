# PISA Prep AI — Prototype

O'zbekiston maktab o'quvchilari uchun PISA o'qish savodxonligi platformasi prototipi.
React 18 + Vite + Tailwind CSS + shadcn/ui + lucide-react asosida qurilgan.

## Ishga tushirish

```bash
pnpm install   # yoki: npm install
pnpm dev       # yoki: npm run dev
```

Brauzerda `http://localhost:5173` manzilini oching.

## Production build

```bash
pnpm build     # yoki: npm run build
pnpm preview   # build natijasini ko'rish uchun
```

## Loyiha tuzilishi

- `src/App.jsx` — barcha ekranlar (Dashboard, Diagnostika, Mashg'ulot, O'qituvchi paneli) shu bitta faylda, bo'limlarga ajratilgan.
- `src/main.tsx` — ilova kirish nuqtasi.
- `src/index.css` — Tailwind + dizayn tokenlari.
- Chap paneldagi navigatsiya orqali barcha ekranlar o'rtasida o'tish mumkin (bu prototip uchun, real loyihada router bilan almashtiriladi).

## Eslatma

Bu — funksional prototip: real backend, autentifikatsiya yoki ma'lumotlar bazasi ulanmagan, barcha ma'lumotlar namunaviy (mock).
