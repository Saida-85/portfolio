# Saida Nosrat Orfa — Developer Portfolio

A responsive developer portfolio presenting my skills, selected projects, and ways to get in touch. Built with Next.js App Router, TypeScript, Tailwind CSS, and Three.js.

**Live site:** [portfolio-rosy-tau-92.vercel.app](https://portfolio-rosy-tau-92.vercel.app/)

## Highlights

- Single-page homepage with Home, About, Skills, Projects, and Contact sections.
- Responsive navigation with links to each section.
- Animated particle background and an interactive 3D skills globe built with Three.js.
- Expandable About Me section and project cards linking to dedicated detail pages.
- Project pages with technology stacks, features, challenges, future plans, live demos, and repository links.
- Social, email, phone, WhatsApp, and résumé links.

## Featured projects

| Project | Overview | Live demo | Source |
| --- | --- | --- | --- |
| [BazarDor 🛍️](https://portfolio-rosy-tau-92.vercel.app/projects/bazardor) | Full-stack marketplace with Better Auth, product management, MongoDB, and a responsive interface. | [Open BazarDor](https://bazardor-blue.vercel.app) | [Repository](https://github.com/Saida-85/bazardor.git) |
| [FitLog](https://portfolio-rosy-tau-92.vercel.app/projects/fitlog) | Workout library and daily plan manager with sorting, live metrics, and localStorage persistence. | [Open FitLog](https://assignment-6-gules-seven.vercel.app/) | [Repository](https://github.com/Saida-85/assignment-6.git) |
| [Dev Stack](https://portfolio-rosy-tau-92.vercel.app/projects/devstack) | Technology explorer for selecting a frontend, backend, database, and development tool stack. | [Open Dev Stack](https://dev-stack-sage.vercel.app/) | [Repository](https://github.com/Saida-85/assignment-5.git) |

## Portfolio tech stack

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS and custom CSS
- **3D effects:** Three.js
- **Icons:** React Icons
- **Deployment:** Vercel

The skills section also showcases HTML, CSS, Tailwind CSS, Node.js, TypeScript, React, Next.js, BetterAuth, and MongoDB.

## Run locally

Clone this repository and run the following commands from the project root:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To check the production build:

```bash
npm run build
npm run start
```

## Project structure

```text
public/
  bazardor.png
  fitLog.png
  devStack.png
  profile.jpeg
  resume.pdf
src/
  app/
    globals.css
    layout.tsx
    page.tsx
    projects/[id]/page.tsx
  components/
    About.tsx
    BackgroundMount.tsx
    Contact.tsx
    Footer.tsx
    Hero.tsx
    Navbar.tsx
    ParticleBackground.tsx
    Projects.tsx
    Skills.tsx
    SkillsGlobe.tsx
  data/
    projects.ts
```

Project information is maintained in `src/data/projects.ts` and shared by the homepage cards and detail pages. The images and résumé are served from `public/`. The Three.js background is mounted in the root layout so it appears across the site.

## Contact

- **Email:** [saidanosratorfa2000@gmail.com](mailto:saidanosratorfa2000@gmail.com)
- **LinkedIn:** [saidanosrat](https://www.linkedin.com/in/saidanosrat/)
- **GitHub:** [Saida-85](https://github.com/Saida-85)
- **WhatsApp:** [+8801879473659](https://wa.me/8801879473659)

---

© 2026 Saida Nosrat Orfa. Designed with care & creativity.
