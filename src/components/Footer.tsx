import Link from "next/link";
import {
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const links = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/saidanosrat/",
        icon: FaLinkedinIn,
        external: true,
    },
    {
        label: "GitHub",
        href: "https://github.com/Saida-85",
        icon: FaGithub,
        external: true,
    },
    {
        label: "Email",
        href: "mailto:saidanosratorfa2000@gmail.com",
        icon: FiMail,
        external: false,
    },
] as const;

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#080d1b]/60">
            <div className="container-shell flex flex-col gap-7 py-9 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Link
                        href="/#home"
                        className="text-lg font-extrabold tracking-tight text-white"
                    >
                        Saida Nosrat Orfa<span className="text-cyan-300">.</span>
                    </Link>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                        Building ideas into digital experiences. © 2026 Saida Nosrat
                        Orfa. All rights reserved. Designed with care &amp; creativity.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {links.map(({ label, href, icon: Icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            className="icon-link"
                            aria-label={label}
                            title={label}
                        >
                            <Icon aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}