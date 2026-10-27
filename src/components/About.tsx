"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const paragraphs = [
    "Hi, I'm a web developer with a passion for building modern, responsive, and user-friendly digital experiences. I enjoy combining technology and creativity to transform ideas into functional, visually appealing websites and applications. For me, development is more than writing code—it's about solving problems, exploring possibilities, and creating digital experiences that make a difference.",
    "My programming journey has been driven by curiosity and a genuine interest in understanding how things work behind the scenes. As I've explored web development, I've gained hands-on experience with technologies such as HTML, CSS, JavaScript, TypeScript, React, and Next.js, along with tools like Tailwind CSS and Git. Every project gives me an opportunity to strengthen my technical skills, explore new approaches, and turn what I learn into something practical.",
    "I particularly enjoy front-end development, where logic meets visual creativity. From building responsive layouts and interactive components to integrating APIs and refining user interfaces, I love the process of making websites both functional and visually engaging. I appreciate clean code, thoughtful design, attention to detail, and the small improvements that make a digital product feel polished. I also enjoy debugging, breaking down complex problems, and finding effective solutions rather than settling for the first approach.",
    "Beyond the screen, creativity is an important part of who I am. I enjoy DIY modern home décor projects and painting, where I can experiment with colors, textures, materials, and different design ideas. Whether I'm transforming simple materials into something beautiful or creating a painting from scratch, I love the satisfaction of making something with my own hands. These interests reflect the same qualities I bring to programming: patience, imagination, attention to detail, and a desire to turn ideas into reality.",
    "I'd describe myself as creative, curious, detail-oriented, and determined. I enjoy learning through experimentation, embracing challenges, and continuously improving the way I work. I believe that good development requires more than technical knowledge—it also takes problem-solving, adaptability, clear communication, and a willingness to consider different perspectives.",
    "My goal is to build meaningful digital products, contribute to collaborative projects, and continue developing solutions that combine reliable functionality with thoughtful design. I'm always interested in exploring new technologies, exchanging ideas, and taking on projects that challenge me to think differently.",
    "I believe the best things are built with both logic and imagination—and that's the mindset I bring to every project I work on.",
] as const;

export default function About() {
    const [expanded, setExpanded] = useState(false);

    return (
        <section id="about" className="section-space container-shell">
            <div className="glass-card reveal overflow-hidden rounded-[2rem]">
                <h2>
                    <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 p-6 text-left sm:p-9"
                        aria-expanded={expanded}
                        aria-controls="about-content"
                        onClick={() => setExpanded((open) => !open)}
                    >
                        <span>
                            <span className="section-label block">The Person Behind the Code</span>
                            <span className="section-heading block">About Me</span>
                            <span className="mt-3 block text-sm font-normal text-slate-400">
                                {expanded ? "Click to close" : "Click to read more"}
                            </span>
                        </span>
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-cyan-300">
                            <FiChevronDown
                                aria-hidden="true"
                                className={`text-xl transition-transform duration-300 ${expanded ? "rotate-180" : ""
                                    }`}
                            />
                        </span>
                    </button>
                </h2>

                <div
                    id="about-content"
                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                    aria-hidden={!expanded}
                >
                    <div className="overflow-hidden">
                        <div className="space-y-5 border-t border-white/10 px-6 pt-7 pb-9 text-[0.98rem] leading-8 text-slate-300 sm:px-9">
                            {paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}