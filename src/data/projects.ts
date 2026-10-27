export type Project = {
    id: "bazardor" | "fitlog" | "devstack";
    name: string;
    image: string;
    shortDescription: string;
    description: string;
    liveUrl: string;
    repositoryUrl: string;
    technologies: string[];
    features: { title: string; description: string }[];
    challenges: string[];
    futurePlans: string[];
};

export const projects: Project[] = [
    {
        id: "bazardor",
        name: "BazarDor 🛍️",
        image: "/bazardor.png",
        shortDescription:
            "A full-stack e-commerce marketplace for buyers and sellers.",
        description:
            "BazarDor (বাজার দর) is a modern, full-stack e-commerce and marketplace application designed to deliver a seamless shopping experience for buyers and sellers. It features full authentication workflows, interactive product management, dynamic updates, and a responsive design tailored for performance across all devices.",
        liveUrl: "https://bazardor-blue.vercel.app",
        // Replace this placeholder with the exact BazarDor repository URL.
        repositoryUrl: "https://github.com/Saida-85/bazardor.git",
        technologies: [
            "Next.js 15 (App Router)",
            "TypeScript",
            "Tailwind CSS",
            "MongoDB (official MongoDB Driver)",
            "Better Auth (Email/Password, Google OAuth, GitHub OAuth)",
            "Vercel (deployment & hosting)",
        ],
        features: [
            {
                title: "Multi-Method Authentication & Session Syncing",
                description:
                    "Secure sign-up and sign-in powered by Better Auth; supports Email/Password as well as one-click Social Logins (Google & GitHub).",
            },
            {
                title: "User Profile Management",
                description:
                    "Interactive user profile dashboard allowing members to view and update account information in real-time.",
            },
            {
                title: "Dynamic Marketplace & Product Management",
                description:
                    "Streamlined browsing and listing capabilities designed for high responsiveness and fast page loads.",
            },
            {
                title: "Fully Responsive & Modern UI",
                description:
                    "Beautifully styled interface built with Tailwind CSS, supporting seamless navigation across mobile, tablet, and desktop screens.",
            },
            {
                title: "Cloud Infrastructure & Serverless Integration",
                description:
                    "Hosted on Vercel with automated CI/CD pipeline linked directly to GitHub, using serverless API routes connected to MongoDB Atlas.",
            },
        ],
        challenges: [
            "Keeping email/password and OAuth sign-ins consistent with server-side session state across routes.",
            "Coordinating profile and marketplace updates with MongoDB while keeping the interface responsive.",
            "Designing product browsing and account screens that remain usable on narrow mobile displays.",
        ],
        futurePlans: [
            "Add a complete checkout and payment workflow.",
            "Introduce product reviews, seller ratings, and richer search filters.",
            "Expand seller analytics and order-management tools.",
        ],
    },
    {
        id: "fitlog",
        name: "FitLog — Workout Library & Plan Manager",
        image: "/fitLog.png",
        shortDescription:
            "A gym companion for exploring lifts and managing daily routines.",
        description:
            "FitLog is a modern gym companion web app built with Next.js and TypeScript. Explore a comprehensive lift library, manage daily routines, and track real-time metrics seamlessly.",
        liveUrl: "https://assignment-6-gules-seven.vercel.app/",
        // Replace this placeholder with the exact FitLog repository URL.
        repositoryUrl: "https://github.com/Saida-85/assignment-6.git",
        technologies: [
            "Next.js (App Router)",
            "Tailwind CSS & daisyUI",
            "Lucide React (icons)",
            "React Hot Toast (notifications)",
            "React Context API & localStorage (state & persistence)",
        ],
        features: [
            {
                title: "Dynamic Workout Library",
                description:
                    "Fetches and displays twelve specialized lifts covering every major muscle group in a responsive grid layout, complete with category tags, equipment lists, and stat badges.",
            },
            {
                title: "Interactive Detail Pages",
                description:
                    "Deep-dive two-column views featuring high-resolution illustrations, equipment specs, difficulty indicators, and ordered step-by-step instructions.",
            },
            {
                title: "Smart Today's Plan Management",
                description:
                    'Lock lifts into your daily routine with a built-in cap of 5 exercises, live-updating metrics for total minutes and calories, and a "Mark as Done" workflow.',
            },
            {
                title: "Advanced Sorting & Tabs",
                description:
                    'Toggle between "Today\'s Plan" and "Saved" lists, with custom sorting options for Duration, Calories, and Rating.',
            },
            {
                title: "Persistent State & Toasts",
                description:
                    "Fully synchronized with localStorage so plans and saved workouts survive page reloads, with instant toast feedback for every action.",
            },
        ],
        challenges: [
            "Keeping saved workouts, the five-exercise daily cap, and completed status synchronized in shared state.",
            "Reading persisted localStorage data safely in an App Router application.",
            "Updating duration and calorie totals immediately as the daily plan changes.",
        ],
        futurePlans: [
            "Add accounts and cloud synchronization across devices.",
            "Introduce progress history, workout schedules, and personal goals.",
            "Add more exercise filters and custom workout creation.",
        ],
    },
    {
        id: "devstack",
        name: "🚀 Dev Stack",
        image: "/devStack.png",
        shortDescription:
            "Explore technologies and build a personalized development stack.",
        description:
            "Dev Stack is a responsive web application that helps developers explore different technologies and build a suitable technology stack for their projects. Users can explore frontend, backend, database, and development tools in one place.",
        liveUrl: "https://dev-stack-sage.vercel.app/",
        // Replace this placeholder with the exact Dev Stack repository URL.
        repositoryUrl: "https://github.com/Saida-85/assignment-5.git",
        technologies: [
            "React.js",
            "JavaScript",
            "Tailwind CSS",
            "Vite",
            "React Icons",
            "Vercel",
        ],
        features: [
            {
                title: "Explore Technologies",
                description:
                    "Browse different frontend, backend, database, and development tool options.",
            },
            {
                title: "Build Your Stack",
                description:
                    "Select technologies and create a personalized technology stack for your project.",
            },
            {
                title: "Responsive Design",
                description:
                    "Works smoothly on desktop, tablet, and mobile devices.",
            },
        ],
        challenges: [
            "Organizing technology choices into clear categories without making the selection interface crowded.",
            "Keeping selected stack items and available options easy to understand across screen sizes.",
            "Designing a responsive layout that works for both short and long stack selections.",
        ],
        futurePlans: [
            "Save and share a selected stack with a link.",
            "Add comparison notes and suggested stacks for common project types.",
            "Offer export options and optional account-based synchronization.",
        ],
    },
];

export function getProjectById(id: string): Project | undefined {
    return projects.find((project) => project.id === id);
}