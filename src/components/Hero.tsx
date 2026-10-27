"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";
import { FiArrowDown, FiDownload } from "react-icons/fi";

const roles = [
    "Web Developer",
    "Next.js Developer",
] as const;

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/Saida-85",
        icon: FaGithub,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/saidanosrat/",
        icon: FaLinkedinIn,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/nusrat.saiida",
        icon: FaFacebookF,
    },
] as const;

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setRoleIndex((index) => (index + 1) % roles.length);
        }, 2800);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <section
            id="home"
            className="container-shell flex min-h-[calc(100svh-76px)] items-center py-16"
        >
            <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
                <div className="reveal order-2 lg:order-1">
                    <p className="section-label">Hi, I&apos;m</p>
                    <h1 className="gradient-text mt-4 max-w-[720px] text-[clamp(3rem,8vw,6.4rem)] leading-[1.02] font-black tracking-[-0.065em]">
                        Saida Nosrat Orfa
                    </h1>

                    <div className="mt-7 min-h-10 text-xl font-semibold text-slate-100 sm:text-2xl">
                        <span className="text-slate-400">I&apos;m a </span>
                        <span
                            key={roleIndex}
                            className="inline-block animate-[reveal-up_0.5s_ease_both] text-cyan-300"
                        >
                            {roles[roleIndex]}
                        </span>
                    </div>

                    <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                        I build modern, responsive, and user-friendly web experiences
                        that bring ideas to life through thoughtful design and clean code.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-3">
                        {socialLinks.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon-link"
                                aria-label={label}
                                title={label}
                            >
                                <Icon aria-hidden="true" />
                            </a>
                        ))}

                        {/* Add public/resume.pdf when your resume is ready. */}
                        <a
                            href="/resume.pdf"
                            download
                            className="primary-button ml-0 sm:ml-2"
                        >
                            <FiDownload aria-hidden="true" />
                            Download Resume
                        </a>
                    </div>

                    <Link
                        href="/#about"
                        className="mt-14 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-300"
                    >
                        Explore more <FiArrowDown aria-hidden="true" />
                    </Link>
                </div>

                <div className="reveal reveal-delay order-1 mx-auto w-full max-w-[310px] lg:order-2 lg:max-w-[430px]">
                    <div className="rounded-[2.5rem] bg-gradient-to-br from-violet-400 via-cyan-300 to-pink-400 p-[3px] shadow-[0_22px_75px_rgba(111,107,245,0.24)]">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2.5rem-3px)] bg-[#141d36]">
                            <Image
                                src="/profile.jpeg"
                                alt="Portrait of Saida Nosrat Orfa"
                                fill
                                priority
                                sizes="(max-width: 1024px) 310px, 430px"
                                className="object-cover"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1020]/35 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}