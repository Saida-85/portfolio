"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
] as const;

export default function Navbar() {
    const [activeId, setActiveId] = useState<string>("home");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const updateScroll = () => setScrolled(window.scrollY > 12);
        updateScroll();

        window.addEventListener("scroll", updateScroll, { passive: true });
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    useEffect(() => {
        const sections = links
            .map(({ id }) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    );

                if (visible[0]) setActiveId(visible[0].target.id);
            },
            {
                rootMargin: "-110px 0px -55% 0px",
                threshold: 0,
            },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 h-[76px] border-b transition-all duration-300 ${scrolled || menuOpen
                ? "border-white/10 bg-[#0b1224]/85 shadow-lg shadow-black/10 backdrop-blur-xl"
                : "border-transparent bg-[#0b1224]/45 backdrop-blur-md"
                }`}
        >
            <nav
                className="container-shell flex h-full items-center justify-between gap-4"
                aria-label="Main navigation"
            >
                <Link
                    href="/#home"
                    className="max-w-[230px] text-base font-extrabold tracking-tight text-white sm:text-lg"
                    onClick={() => setMenuOpen(false)}
                >
                    Saida Nosrat Orfa<span className="text-cyan-300">.</span>
                </Link>

                <div className="hidden items-center gap-1 lg:flex">
                    {links.map(({ label, id }) => (
                        <Link
                            key={id}
                            href={`/#${id}`}
                            aria-current={activeId === id ? "page" : undefined}
                            className={`rounded-full px-3 py-2 text-sm transition-colors ${activeId === id
                                ? "bg-violet-400/15 text-cyan-200"
                                : "text-slate-300 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-xl text-white lg:hidden"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                </button>
            </nav>

            {menuOpen && (
                <div
                    id="mobile-navigation"
                    className="absolute inset-x-0 top-full border-b border-white/10 bg-[#0b1224]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
                >
                    <div className="container-shell grid gap-1">
                        {links.map(({ label, id }) => (
                            <Link
                                key={id}
                                href={`/#${id}`}
                                aria-current={activeId === id ? "page" : undefined}
                                className={`rounded-xl px-4 py-3 text-sm ${activeId === id
                                    ? "bg-violet-400/15 text-cyan-200"
                                    : "text-slate-200 hover:bg-white/5"
                                    }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}